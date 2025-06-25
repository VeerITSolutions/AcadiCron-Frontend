import React, { useState } from "react";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import {
  Edit,
  LocalPrintshop,
  NoteAdd,
  SettingsBackupRestore,
  Visibility,
} from "@mui/icons-material";
import apiClient from "@/services/apiClient";
import axios from "axios";
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
  // State to manage selected fee row ids
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  // Helper to get a unique id for each fee row
  const getFeeRowId = (groupIdx: number, feeIdx: number) =>
    `${groupIdx}-${feeIdx}`;

  // Handle select all checkbox
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAll(checked);

    if (checked) {
      // Select all fee rows
      const allIds = new Set<string>();
      student_due_fees.forEach((group, groupIdx) => {
        group.fees.forEach((fee, feeIdx) => {
          allIds.add(getFeeRowId(groupIdx, feeIdx));
        });
      });
      setSelectedIds(allIds);
    } else {
      setSelectedIds(new Set());
    }
  };
  const handleView = async (id: number) => {
    // Assuming id is the student_id
    /* router.push(`/admin/student/${id}`); */
  };

  const handleEdit = (id: number) => {
    /* router.push(`/admin/student/edit/${id}`); */
  };

  // Handle individual row checkbox
  const handleSelectRow = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowId: string,
  ) => {
    const checked = e.target.checked;
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(rowId);
      } else {
        newSet.delete(rowId);
      }
      // If not all are checked, uncheck selectAll
      if (newSet.size !== getTotalFeeRows()) {
        setSelectAll(false);
      } else {
        setSelectAll(true);
      }
      return newSet;
    });
  };

  const handleSelectRowPrint = async (
    e: React.MouseEvent<HTMLButtonElement>,
    dataFeeMasterId: string,
    dataFeeSessionGroupId: string,
    dataFeeGroupsFeeTypeId: string,
  ) => {
    try {
      // Use POST request with data in the body, not query params
      const postData = {
        fee_groups_feetype_id: dataFeeGroupsFeeTypeId,
        fee_master_id: dataFeeMasterId,
        fee_session_group_id: dataFeeSessionGroupId,
      };

      const response = await axios.post(
        `https://erp.erabesa.co.in/studentfee/printFeesByGroup`,
        postData,
        {
          headers: {
            Accept: "text/html", // Make sure your backend sends HTML
          },
        },
      );

      const popupWindow = window.open("", "_blank", "width=800,height=600");
      if (popupWindow) {
        popupWindow.document.open();
        popupWindow.document.write(response.data); // Assuming response.data is HTML string
        popupWindow.document.close();

        popupWindow.focus();
        popupWindow.print();
      } else {
        console.error("Popup blocked!");
      }
    } catch (error) {
      console.error("Failed to fetch printable content:", error);
    }
  };
  // Helper to get total number of fee rows
  const getTotalFeeRows = () => {
    let count = 0;
    student_due_fees.forEach((group) => {
      count += group.fees.length;
    });
    return count;
  };

  // Print Selected handler
  const handlePrintSelected = () => {
    if (selectedIds.size === 0) {
      alert("Please select at least one fee row to print.");
      return;
    }
    // For demo, just alert the selected row ids
    alert(
      "Print selected fee rows: " +
        Array.from(selectedIds)
          .map((id) => id)
          .join(", "),
    );
    // Here you would implement actual print logic
  };

  // Collect Selected handler
  const handleCollectSelected = () => {
    if (selectedIds.size === 0) {
      alert("Please select at least one fee row to collect fees.");
      return;
    }
    // For demo, just alert the selected row ids
    alert(
      "Collect fees for selected rows: " +
        Array.from(selectedIds)
          .map((id) => id)
          .join(", "),
    );
    // Here you would implement actual collect logic
  };

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
      {/* Action buttons */}
      <div className="mb-2 flex gap-2">
        <button
          className="rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]"
          onClick={handlePrintSelected}
        >
          Print Selected
        </button>
        <button
          className="rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]"
          onClick={handleCollectSelected}
        >
          Collect Selected
        </button>
      </div>
      <table className="table-striped table-hover border-gray-300 table w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">
              <input
                name="ids"
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                aria-label="Select all"
              />{" "}
            </th>
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
            <th className="p-2 text-right">Action</th>
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

              const rowId = getFeeRowId(index, i);

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
                    <td className="p-2">
                      <input
                        name="ids"
                        type="checkbox"
                        checked={selectedIds.has(rowId)}
                        onChange={(e) => handleSelectRow(e, rowId)}
                        aria-label={`Select fee row ${fee.name} ${fee.code}`}
                      />{" "}
                    </td>
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
                    <td width="">
                      <div className="">
                        <div className="pull-right flex ">
                          {/* <button
                            type="button"
                            className="btn btn-xs btn-default myCollectFeeBtn flex items-center gap-1"
                            title="Add Fees"
                            onClick={() => {
                              if (!selectedIds.has(rowId)) {
                                setSelectedIds((prev) => {
                                  const newSet = new Set(prev);
                                  newSet.add(rowId);
                                  return newSet;
                                });
                              }
                              alert(
                                `Collect fee for: ${fee.name} (${fee.code}) [rowId: ${rowId}]`,
                              );
                              // Here you would open your collect fee modal or logic
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={selectedIds.has(rowId)}
                              onChange={(e) => handleSelectRow(e, rowId)}
                              className="mr-1"
                              aria-label={`Select for Add Fees ${fee.name} ${fee.code}`}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <i className="fa fa-plus"></i>
                          </button>

                          <button
                            className="btn btn-xs btn-default printInv flex items-center gap-1"
                            title="Print"
                            onClick={() => {
                              if (!selectedIds.has(rowId)) {
                                setSelectedIds((prev) => {
                                  const newSet = new Set(prev);
                                  newSet.add(rowId);
                                  return newSet;
                                });
                              }
                              alert(
                                `Print for: ${fee.name} (${fee.code}) [rowId: ${rowId}]`,
                              );
                              // Here you would implement print logic for this row
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={selectedIds.has(rowId)}
                              onChange={(e) => handleSelectRow(e, rowId)}
                              className="mr-1"
                              aria-label={`Select for Print ${fee.name} ${fee.code}`}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <i className="fa fa-print"></i>
                          </button> */}

                          {balance === 0 ? (
                            <IconButton onClick={() => handleEdit(1)}>
                              <SettingsBackupRestore />
                            </IconButton>
                          ) : deposits.length > 0 ? (
                            <IconButton
                              onClick={(e: any) => handleSelectRow(e, rowId)}
                            >
                              <NoteAdd />
                            </IconButton>
                          ) : (
                            <IconButton onClick={() => handleEdit(1)}>
                              <NoteAdd />
                            </IconButton>
                          )}

                          <IconButton
                            onClick={(e: any) =>
                              handleSelectRowPrint(
                                e,
                                fee.id,
                                fee.fee_session_group_id,
                                fee.fee_groups_feetype_id,
                              )
                            }
                            aria-label="Show"
                          >
                            <LocalPrintshop />
                          </IconButton>
                        </div>
                      </div>
                    </td>
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
            <td></td>

            <td colSpan={4} className="p-2 text-right font-bold">
              Grant Total
            </td>
            <td className="p-2 text-right font-bold">
              {currency_symbol}
              {Number(totalAmount).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
            <td colSpan={3}></td>
            <td className="p-2 text-right font-bold">
              {currency_symbol}
              {Number(totalDiscount).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
            <td className="p-2 text-right font-bold">
              {currency_symbol}
              {Number(totalFine).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
            <td className="p-2 text-right font-bold">
              {currency_symbol}
              {Number(totalPaid).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
            <td className="p-2 text-right font-bold">
              {currency_symbol}
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
