import React from "react";
import dayjs from "dayjs";
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
  student_fees_deposite_id?: number;
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

  let totalAmount = 0;
  let totalPaid = 0;
  let totalDiscount = 0;
  let totalFine = 0;
  let totalBalance = 0;

  return (
    <div className="table-responsive mt-4">
      <table className="table-striped table-hover border-gray-200 table w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Fees Group</th>
            <th className="p-2 text-left">Fees Code</th>
            <th className="p-2 text-left">Due Date</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-right">Amount ({currency_symbol})</th>
            <th className="p-2 text-left">Payment ID</th>
            <th className="p-2 text-left">Mode</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-right">Discount</th>
            <th className="p-2 text-right">Fine</th>
            <th className="p-2 text-right">Paid</th>
            <th className="p-2 text-right">Balance</th>
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

              const total_paid = deposits.reduce(
                (sum, d) => sum + (d.amount || 0),
                0,
              );
              const total_discount = deposits.reduce(
                (sum, d) => sum + (d.amount_discount || 0),
                0,
              );
              const total_fine = deposits.reduce(
                (sum, d) => sum + (d.amount_fine || 0),
                0,
              );
              const balance = (fee.amount || 0) - (total_paid + total_discount);
              const isOverdue =
                fee.due_date && new Date(fee.due_date) < new Date();

              // Totals
              totalAmount += fee.amount || 0;
              totalDiscount += total_discount;
              totalPaid += total_paid;
              totalFine += total_fine;
              totalBalance += balance;

              return (
                <React.Fragment key={`${index}-${i}`}>
                  <tr
                    className={`${
                      isOverdue && balance > 0 ? "bg-red-50" : "bg-white"
                    }`}
                  >
                    <td className="p-2">{fee.name}</td>
                    <td className="p-2">{fee.code}</td>
                    <td className="whitespace-nowrap p-2">
                      {fee.due_date
                        ? dayjs(fee.due_date).format("DD-MM-YYYY")
                        : "-"}
                    </td>
                    <td className="p-2">
                      {balance === 0 ? (
                        <span className="font-medium text-green-600">Paid</span>
                      ) : deposits.length > 0 ? (
                        <span className="font-medium text-yellow-600">
                          Partial
                        </span>
                      ) : (
                        <span className="text-red-600 font-medium">Unpaid</span>
                      )}
                    </td>
                    <td className="p-2 text-right">
                      {Number(fee.amount || 0)}
                      {fee.fine_amount > 0 && (
                        <span className="text-red-500">
                          {" "}
                          + {Number(fee.fine_amount)}
                        </span>
                      )}
                    </td>
                    <td className="p-2"></td>
                    <td className="p-2"></td>
                    <td className="p-2"></td>
                    <td className="p-2 text-right">{total_discount}</td>
                    <td className="p-2 text-right">{total_fine}</td>
                    <td className="p-2 text-right">{total_paid}</td>
                    <td className="p-2 text-right">{balance}</td>
                  </tr>

                  {deposits.map((d, j) => (
                    <tr
                      className="bg-gray-50 text-xs"
                      key={`${index}-${i}-${j}`}
                    >
                      <td className="p-2"></td>
                      <td className="p-2"></td>
                      <td className="p-2"></td>
                      <td className="p-2"></td>
                      <td className="p-2 text-right">→</td>
                      <td className="p-2">
                        {fee.student_fees_deposite_id || "--"}/{d.inv_no}
                      </td>
                      <td className="p-2">{d.payment_mode}</td>
                      <td className="p-2">{d.date}</td>
                      <td className="p-2 text-right">{d.amount_discount}</td>
                      <td className="p-2 text-right">{d.amount_fine}</td>
                      <td className="p-2 text-right">{d.amount}</td>
                      <td></td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            }),
          )}

          <tr className="bg-gray-200 text-sm font-semibold">
            <td colSpan={4} className="p-2 text-right">
              Totals
            </td>
            <td className="p-2 text-right">{totalAmount}</td>
            <td colSpan={3}></td>
            <td className="p-2 text-right">{totalDiscount}</td>
            <td className="p-2 text-right">{totalFine}</td>
            <td className="p-2 text-right">{totalPaid}</td>
            <td className="p-2 text-right">{totalBalance}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FeeDetailsTable;
