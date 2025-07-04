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
import {
  fetchPrintFeesByGroupData,
  fetchRestoreFeesByGroupData,
  fetchAddFeesByGroupData,
} from "@/services/studentFeesMasterService";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import "flatpickr/dist/flatpickr.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

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
  id?: number;
  amount: number;
  due_date: string | null;
  code: string;
  name: string;
  fine_amount: number;
  amount_detail: string;
  student_fees_deposite_id?: number;
  fee_session_group_id?: number;
  fee_groups_feetype_id?: number;
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

interface StudentDetails {
  firstname: any;
  lastname: any;
  class_name: any;
  section_name: any;
  father_name: any;
}

interface Props {
  student_details: any;
  student_due_fees: StudentDueFee[];
  student_discount_fees: Discount[];
  currency_symbol: string;
}

const FeeDetailsTable2: React.FC<Props> = ({
  student_details,
  student_due_fees,
  student_discount_fees,
  currency_symbol,
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [data, setData] = useState("");
  const getFeeRowId = (groupIdx: number, feeIdx: number) =>
    `${groupIdx}-${feeIdx}`;
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);
  const [pendingRestoreData, setPendingRestoreData] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  // Modal state for collecting all dynamic data
  const [modalFees, setModalFees] = useState<FeeItem[]>([]);
  const [modalDate, setModalDate] = useState<Date | null>(new Date());
  const [modalPaymentMode, setModalPaymentMode] = useState<string>("");
  const [modalNote, setModalNote] = useState<string>("");

  // This function is used to open the dialog and set editing mode to true.
  // It also sets the selected fees for the modal
  const handleOpen = (fees: FeeItem[]) => {
    setModalFees(fees);
    setOpen(true);
    setEditing(true);
    setModalDate(new Date());
    setModalPaymentMode("");
    setModalNote("");
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(false);
    setModalFees([]);
    setModalDate(null);
    setModalPaymentMode("");
    setModalNote("");
  };

  // Handle select all checkbox
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAll(checked);

    if (checked) {
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
      if (newSet.size !== getTotalFeeRows()) {
        setSelectAll(false);
      } else {
        setSelectAll(true);
      }
      return newSet;
    });
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
    alert(
      "Print selected fee rows: " +
        Array.from(selectedIds)
          .map((id) => id)
          .join(", "),
    );
  };

  // Function to handle print of a specific row's data by sending it to backend API
  const handleSelectRowPrint = async (fees_id: any, deposits_id: any) => {
    const result = await fetchRestoreFeesByGroupData(fees_id, deposits_id);

    if (result) {
      window.location.reload();
    }
  };

  if (student_due_fees.length === 0 && student_discount_fees.length === 0) {
    return <div className="alert alert-danger">No record found</div>;
  }

  let totalAmount = 0;
  let totalPaid = 0;
  let totalDiscount = 0;
  let totalFine = 0;
  let totalBalance = 0;

  // Helper: Map rowId ("groupIdx-feeIdx") to the actual fee object, including group name
  const getSelectedFees = () => {
    const selectedFees: (FeeItem & { groupName: string })[] = [];
    student_due_fees.forEach((group, groupIdx) => {
      group.fees.forEach((fee, feeIdx) => {
        const rowId = getFeeRowId(groupIdx, feeIdx);
        if (selectedIds.has(rowId)) {
          selectedFees.push({ ...fee, groupName: group.name });
        }
      });
    });
    return selectedFees;
  };

  // Helper: Get array of selected fee ids (for sending to backend)
  const getSelectedFeeIds = () => {
    const ids: (number | undefined)[] = [];
    student_due_fees.forEach((group, groupIdx) => {
      group.fees.forEach((fee, feeIdx) => {
        const rowId = getFeeRowId(groupIdx, feeIdx);
        if (selectedIds.has(rowId)) {
          ids.push(fee.id);
        }
      });
    });
    return ids.filter(Boolean);
  };

  const handleOpenFixed = (fees: FeeItem[]) => {
    setModalFees(fees);
    setOpen(true);
    setEditing(true);
    setModalDate(new Date());
    setModalPaymentMode("Cash"); // Set default to "Cash"
    setModalNote("");
  };

  const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();

    if (!modalDate || !modalPaymentMode || modalFees.length === 0) {
      return;
    }

    const student_session_id =
      student_details?.student_session_id ||
      student_details?.student_session_id;
    const guardian_phone =
      student_details?.guardian_phone ||
      student_details?.father_phone ||
      student_details?.mother_phone ||
      "";
    const guardian_email =
      student_details?.guardian_email || student_details?.email || "";
    const parent_app_key = student_details?.parent_app_key || "";

    const row_counter: number[] = [];
    const rawFormData: Record<string, any> = {};

    modalFees.forEach((fee, idx) => {
      const row = idx + 1;
      row_counter.push(row);
      rawFormData[`student_fees_master_id_${row}`] = fee.id;
      rawFormData[`fee_groups_feetype_id_${row}`] = fee.fee_groups_feetype_id;
      rawFormData[`fee_groups_feetype_fine_amount_${row}`] = fee.fine_amount;
      rawFormData[`fee_amount_${row}`] = fee.amount;
    });

    rawFormData["collected_date"] = dayjs(modalDate).format("YYYY-MM-DD");
    rawFormData["payment_mode_fee"] = modalPaymentMode;
    rawFormData["fee_gupcollected_note"] = modalNote;
    rawFormData["guardian_phone"] = guardian_phone;
    rawFormData["guardian_email"] = guardian_email;
    rawFormData["parent_app_key"] = parent_app_key;
    rawFormData["student_session_id"] = student_session_id;

    // ✅ Create FormData and append all
    const formData = new FormData();

    // Append dynamic row data
    Object.entries(rawFormData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append row_counter[] as array
    row_counter.forEach((row) => {
      formData.append("row_counter[]", row.toString());
    });

    console.log("Submitting fees collection payload:", formData);

    try {
      const result = await fetchAddFeesByGroupData(formData);
      if (result) {
        window.location.reload();
      }
      console.log("result", result);
    } catch (err) {
      console.error("Error submitting fees:", err);
    }
  };

  return (
    <div className="table-responsive mt-4">
      {/* Action buttons */}
      <div className="mb-2 flex gap-2">
        {/* <button
          className="rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]"
          onClick={handlePrintSelected}
        >
          Print Selected
        </button> */}
        <button
          className="m-2 rounded bg-[#1976D2] p-2 px-4 py-2 text-white hover:bg-[#155ba0]"
          onClick={() => {
            const selectedFees = getSelectedFees();
            const selectedFeeIds = getSelectedFeeIds();
            console.log("Selected rowIds:", Array.from(selectedIds));
            console.log("Selected fee ids to send:", selectedFeeIds);

            if (!selectedFees || selectedFees.length === 0) {
              alert("Please select at least one fee row to collect fees.");
              return;
            }

            // Use fixed handleOpen to set default payment mode
            handleOpenFixed(selectedFees);
          }}
        >
          Collect Selected
        </button>
      </div>
      <table className="table-striped table-hover border-gray-300 table w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">
              {/*  <input
                name="ids"
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                aria-label="Select all"
              />{" "} */}
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
                deposits = Object.values(parsed);
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
              const isPaid = balance === 0;

              totalAmount += parseInt(fee.amount as any, 10) || 0;
              totalDiscount += total_discount;
              totalPaid += total_paid;
              totalFine += total_fine;
              totalBalance += balance;

              const rowId = getFeeRowId(index, i);

              const handleRestoreClick = (fee: any, deposits: any) => {
                setPendingRestoreData({
                  fee_id: fee,
                  deposits_id: deposits,
                });
                setShowRestoreConfirm(true);
              };

              const handleSelectRowPrint2 = async (
                e: React.MouseEvent<HTMLButtonElement>,
                dataFeeMasterId: string,
                dataFeeSessionGroupId: string,
                dataFeeGroupsFeeTypeId: string,
                rowData: any,
                deposits: any,
              ) => {
                try {
                  const payload = {
                    name: rowData.name,
                    code: rowData.code,
                    due_date: rowData.due_date,
                    amount: rowData.amount,
                    discount: total_discount,
                    fine: total_fine,
                    paid: total_paid,
                    balance: balance,
                  };

                  const result = await fetchPrintFeesByGroupData(
                    dataFeeMasterId,
                    dataFeeSessionGroupId,
                    dataFeeGroupsFeeTypeId,
                    payload,
                    deposits,
                    student_details,
                  );

                  setData(result);

                  const printWindow = window.open(
                    "",
                    "_blank",
                    "width=900,height=700",
                  );
                  if (printWindow) {
                    printWindow.document.open();
                    printWindow.document.write(result);
                    printWindow.document.close();
                    printWindow.focus();
                    printWindow.print();
                  } else {
                    alert(
                      "Popup blocked! Please allow popups for this site to print.",
                    );
                  }
                } catch (error) {
                  console.error("Failed to fetch printable content:", error);
                }
              };

              return (
                <React.Fragment key={`${index}-${i}`}>
                  <tr
                    className={`${
                      isUnpaid ? "bg-red-100 text-red-900" : "bg-white"
                    }`}
                    style={{
                      backgroundColor:
                        balance === 0
                          ? "#f0fdf4"
                          : deposits.length > 0
                            ? "#fefce8"
                            : "#fee2e2",
                      color:
                        balance === 0
                          ? "#15803d"
                          : deposits.length > 0
                            ? "#854d0e"
                            : "#991b1b",
                    }}
                  >
                    <td className="p-2">
                      {!isPaid && (
                        <input
                          name="ids"
                          type="checkbox"
                          checked={selectedIds.has(rowId)}
                          onChange={(e) => handleSelectRow(e, rowId)}
                          aria-label={`Select fee row ${fee.name} ${fee.code}`}
                        />
                      )}{" "}
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
                          <IconButton
                            onClick={(e: any) =>
                              handleSelectRowPrint2(
                                e,
                                fee.id,
                                fee.fee_session_group_id,
                                fee.fee_groups_feetype_id,
                                fee,
                                deposits,
                              )
                            }
                            aria-label="Show"
                          >
                            <LocalPrintshop />
                          </IconButton>
                          {balance === 0 ? (
                            <IconButton
                              onClick={() =>
                                handleRestoreClick(
                                  fee.student_fees_deposite_id,
                                  deposits[0]?.inv_no,
                                )
                              }
                            >
                              <SettingsBackupRestore />
                            </IconButton>
                          ) : deposits.length > 0 ? (
                            <IconButton
                              onClick={(e: any) => handleSelectRow(e, rowId)}
                            >
                              <NoteAdd />
                            </IconButton>
                          ) : (
                            /*  <IconButton onClick={() => handleEdit(1)}>
                              <NoteAdd />
                            </IconButton> */
                            <></>
                          )}
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

      {showRestoreConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[90%] max-w-md rounded bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Confirm Restore</h2>
            <p>
              Are you sure you want to restore and print receipt for{" "}
              <strong>
                {pendingRestoreData.fee_id || "N/A"} /
                {pendingRestoreData.deposits_id || "N/A"}
              </strong>
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                className="bg-gray-300 rounded px-4 py-2"
                onClick={() => {
                  setShowRestoreConfirm(false);
                  setPendingRestoreData(null);
                }}
              >
                Cancel
              </button>
              <button
                className="rounded bg-green-500 px-4 py-2 text-white"
                onClick={async () => {
                  setShowRestoreConfirm(false);
                  if (pendingRestoreData) {
                    await handleSelectRowPrint(
                      pendingRestoreData.fee_id,
                      pendingRestoreData.deposits_id,
                    );
                  }
                  setPendingRestoreData(null);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent className="dark:bg-boxdark dark:drop-shadow-none">
          <div className="flex items-center justify-between border-b border-stroke px-4.5 py-4 dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none">
            <h3 className="font-medium text-black dark:text-white">
              {editing ? "Add" : "Collect Fees"}
            </h3>
            <svg
              onClick={handleClose}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="cursor-pointer text-black dark:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <div className="grid gap-5.5 p-4.5 dark:bg-boxdark dark:drop-shadow-none">
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Date
              </label>
              <div className="relative">
                <Flatpickr
                  options={{
                    dateFormat: "m/d/Y",
                  }}
                  value={modalDate}
                  onChange={(dates: Date[]) => setModalDate(dates[0] || null)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  placeholder="mm/dd/yyyy"
                />
                <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                      fill="#64748B"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Payment Mode
              </label>
              {["Cash", "Cheque", "DD", "bank_transfer", "upi", "card"].map(
                (mode) => (
                  <label
                    key={mode}
                    className="mr-4 inline-flex items-center dark:text-white"
                  >
                    <input
                      type="radio"
                      name="payment_mode_fee"
                      value={mode}
                      className="form-radio dark:text-white"
                      checked={modalPaymentMode === mode}
                      onChange={() => setModalPaymentMode(mode)}
                    />
                    <span className="ml-2 dark:text-white">
                      {mode === "bank_transfer"
                        ? "Bank Transfer"
                        : mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </span>
                  </label>
                ),
              )}
            </div>

            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Note
              </label>
              <input
                name="reason"
                type="text"
                value={modalNote}
                onChange={(e) => setModalNote(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <br />

            <ul className="fees-list fees-list-in-box">
              {modalFees.length === 0 ? (
                <li className="item text-gray-500">No fees selected.</li>
              ) : (
                modalFees.map((fee, idx) => (
                  <li className="item" key={fee.id || idx}>
                    <input
                      name={`student_fees_master_id_${idx + 1}`}
                      type="hidden"
                      value={fee.id}
                      readOnly
                    />
                    <input
                      name={`fee_groups_feetype_id_${idx + 1}`}
                      type="hidden"
                      value={fee.fee_groups_feetype_id}
                      readOnly
                    />
                    <input
                      name={`fee_groups_feetype_fine_amount_${idx + 1}`}
                      type="hidden"
                      value={fee.fine_amount}
                      readOnly
                    />
                    <input
                      name={`fee_amount_${idx + 1}`}
                      type="hidden"
                      value={fee.amount}
                      readOnly
                    />
                    <div className="product-info">
                      <div className="flex items-center justify-between">
                        <span className="product-title font-medium text-black dark:text-white">
                          {(fee as any).groupName
                            ? `${(fee as any).groupName} - ${fee.name}`
                            : fee.name}
                        </span>
                        <span className="pull-right font-semibold text-black dark:text-white">
                          ₹
                          {Number(fee.amount).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <span className="product-description text-gray-600 dark:text-gray-300 mt-1 block text-sm">
                        {fee.due_date
                          ? `Due: ${dayjs(fee.due_date).format("DD-MM-YYYY")}`
                          : ""}
                      </span>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="product-title text font-medium text-danger">
                          Fine
                        </span>
                        <span className="pull-right text-red-500 font-semibold">
                          ₹
                          {Number(fee.fine_amount).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
            {modalFees.length > 0 &&
              (() => {
                const totalAmount = modalFees.reduce(
                  (sum, fee) => sum + Number(fee.amount || 0),
                  0,
                );
                const totalFine = modalFees.reduce(
                  (sum, fee) => sum + Number(fee.fine_amount || 0),
                  0,
                );
                return (
                  <div className="mt-4 flex flex-col items-end">
                    <button
                      type="button"
                      className="rounded bg-green-600 px-4 py-2 font-semibold text-white shadow hover:bg-green-700 focus:outline-none"
                      disabled
                    >
                      Total Amount: ₹
                      {(totalAmount + totalFine).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </button>
                  </div>
                );
              })()}
            <br />

            <div className="dark:bg-boxdark dark:drop-shadow-none">
              <button
                onClick={handleSubmit}
                className="rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]"
                disabled={
                  !modalDate || !modalPaymentMode || modalFees.length === 0
                }
                type="button"
              >
                {editing ? "Pay" : "Pay"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeeDetailsTable2;
