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
  amount_detail: string;
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

const FeeDetailsTable2: React.FC<Props> = ({
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
      <table className="table-striped table-hover border-gray-300 table w-full border text-sm">
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
            group.fees.map((fee: any, i) => {
              let deposits: FeeDeposit[] = [];

              try {
                const parsed = JSON.parse(fee.amount_detail || "{}");
                deposits = Object.values(parsed); // Convert object to array
              } catch {
                deposits = [];
              }

              const total_paid = deposits.reduce(
                (sum, d: any) => sum + parseFloat(d.amount || 0),
                0,
              );
              const total_discount = deposits.reduce(
                (sum, d: any) => sum + parseFloat(d.amount_discount || 0),
                0,
              );
              const total_fine = deposits.reduce(
                (sum, d: any) => sum + parseFloat(d.amount_fine || 0),
                0,
              );
              const balance =
                parseFloat(fee.amount || 0) - (total_paid + total_discount);

              const isUnpaid = balance > 0 && deposits.length === 0;

              // Totals
              totalAmount += parseInt(fee.amount as any, 10) || 0;
              totalDiscount += total_discount;
              totalPaid += total_paid;
              totalFine += total_fine;
              totalBalance += balance;

              return (
                <React.Fragment key={`${index}-${i}`}>
                  <tr
                    className={`${
                      isUnpaid ? "bg-red-100 text-red-900" : "bg-white"
                    }`}
                    style={{
                      backgroundColor:
                        balance === 0
                          ? "#f0fdf4" // green-50
                          : deposits.length > 0
                            ? "#fefce8" // yellow-50
                            : "#fee2e2", // red-100
                      color:
                        balance === 0
                          ? "#15803d" // green-700
                          : deposits.length > 0
                            ? "#854d0e" // yellow-800
                            : "#991b1b", // red-900
                    }}
                  >
                    <td className="p-2">{fee.name}</td>
                    <td className="p-2">{fee.code}</td>
                    <td className="whitespace-nowrap p-2">
                      {fee.due_date
                        ? dayjs(fee.due_date).format("DD-MM-YYYY")
                        : "-"}
                    </td>
                    <td
                      className={
                        balance === 0
                          ? "bg-green-50 p-2 text-green-700"
                          : deposits.length > 0
                            ? "bg-yellow-50 p-2 text-yellow-800"
                            : "bg-red-100 text-red-900 p-2"
                      }
                    >
                      {balance === 0 ? (
                        <span className="rounded bg-green-200 px-2 py-1 text-xs font-semibold text-green-800">
                          Paid
                        </span>
                      ) : deposits.length > 0 ? (
                        <span className="rounded bg-yellow-200 px-2 py-1 text-xs font-semibold text-yellow-900">
                          Partial
                        </span>
                      ) : (
                        <span className="bg-red-200 text-red-800 rounded px-2 py-1 text-xs font-semibold">
                          Unpaid
                        </span>
                      )}
                    </td>
                    <td className="p-2 text-right">
                      {fee.amount}{" "}
                      <span className="text-red-500">+ {fee.fine_amount}</span>
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

          <tr className="bg-gray-200 border-gray-400 border-t text-sm font-bold">
            <td colSpan={4} className="p-2 text-right font-bold">
              Totals
            </td>
            <td className="p-2 text-right font-bold">
              {Number(totalAmount).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
            <td colSpan={3}></td>
            <td className="p-2 text-right font-bold">
              {Number(totalDiscount).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
            <td className="p-2 text-right font-bold">
              {Number(totalFine).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
            <td className="p-2 text-right font-bold">
              {Number(totalPaid).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
            <td className="p-2 text-right font-bold">
              {Number(totalBalance).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FeeDetailsTable2;
