import React from "react";

interface FeeDeposit {
  amount: number;
  amount_discount: number;
  amount_fine: number;
  inv_no: string;
  description: string;
  payment_mode: string;
  date: string;
}

interface FeeItem {
  amount: number;
  due_date: string | null;
  code: string;
  name: string;
  fine_amount: number;
  amount_detail: string; // JSON string
}

interface StudentDueFee {
  name: string;
  fees: FeeItem[];
}

interface Discount {
  code: string;
  status: string;
  amount: number;
  payment_id: string;
  student_fees_discount_description: string;
}

interface Props {
  student_due_fees: StudentDueFee[];
  student_discount_fees: Discount[];
  currency_symbol: string;
}

const FeeDetailsTable: React.FC<Props> = ({
  student_due_fees,
  student_discount_fees,
  currency_symbol,
}) => {
  if (student_due_fees.length === 0 && student_discount_fees.length === 0) {
    return <div className="alert alert-danger">No record found</div>;
  }

  return (
    <div className="table-responsive mt-4">
      <table className="table-hover table-striped table text-sm">
        <thead>
          <tr>
            <th>Fees Group</th>
            <th>Fees Code</th>
            <th>Due Date</th>
            <th>Status</th>
            <th className="text-right">Amount ({currency_symbol})</th>
            <th>Payment ID</th>
            <th>Mode</th>
            <th>Date</th>
            <th className="text-right">Discount</th>
            <th className="text-right">Fine</th>
            <th className="text-right">Paid</th>
            <th className="text-right">Balance</th>
          </tr>
        </thead>
        <tbody>
          {student_due_fees.map((group, index) =>
            group.fees.map((fee, i) => {
              let deposits: FeeDeposit[] = [];
              try {
                const parsed = JSON.parse(fee.amount_detail || "[]");
                deposits = Array.isArray(parsed) ? parsed : [];
              } catch {
                deposits = [];
              }

              const total_paid = deposits.reduce((sum, d) => sum + d.amount, 0);
              const total_discount = deposits.reduce(
                (sum, d) => sum + d.amount_discount,
                0,
              );
              const total_fine = deposits.reduce(
                (sum, d) => sum + d.amount_fine,
                0,
              );
              const balance =
                parseFloat(fee.amount.toString()) -
                (total_paid + total_discount);
              const isOverdue =
                fee.due_date && new Date(fee.due_date) < new Date();

              return (
                <React.Fragment key={`${index}-${i}`}>
                  <tr className={isOverdue && balance > 0 ? "bg-red-100" : ""}>
                    <td>{fee.name}</td>
                    <td>{fee.code}</td>
                    <td>{fee.due_date || "-"}</td>
                    <td>
                      {balance === 0 ? (
                        <span className="text-green-600">Paid</span>
                      ) : deposits.length > 0 ? (
                        <span className="text-yellow-600">Partial</span>
                      ) : (
                        <span className="text-red-600">Unpaid</span>
                      )}
                    </td>
                    <td className="text-right">{fee.amount}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="text-right">{total_discount.toFixed(2)}</td>
                    <td className="text-right">{total_fine.toFixed(2)}</td>
                    <td className="text-right">{total_paid.toFixed(2)}</td>
                    <td className="text-right">{balance.toFixed(2)}</td>
                  </tr>

                  {deposits.map((d, j) => (
                    <tr
                      className="bg-gray-50 text-xs"
                      key={`${index}-${i}-${j}`}
                    >
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="text-right">→</td>
                      <td>
                        {fee?.student_fees_deposite_id}/{d.inv_no}
                      </td>
                      <td>{d.payment_mode}</td>
                      <td>{d.date}</td>
                      <td className="text-right">
                        {d.amount_discount.toFixed(2)}
                      </td>
                      <td className="text-right">{d.amount_fine.toFixed(2)}</td>
                      <td className="text-right">{d.amount.toFixed(2)}</td>
                      <td></td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            }),
          )}

          {student_discount_fees.map((discount, dIndex) => (
            <tr key={`discount-${dIndex}`} className="bg-slate-100">
              <td>Discount</td>
              <td>{discount.code}</td>
              <td></td>
              <td>
                {discount.status === "applied" ? (
                  <>
                    Discount of {currency_symbol}
                    {discount.amount} applied: {discount.payment_id}
                  </>
                ) : (
                  `Discount of ${currency_symbol}${discount.amount} ${discount.status}`
                )}
              </td>
              <td colSpan={8}></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeeDetailsTable;
