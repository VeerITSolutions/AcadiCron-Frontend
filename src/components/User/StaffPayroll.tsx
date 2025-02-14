"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxFive from "@/components/Checkboxes/CheckboxFive";
import CheckboxFour from "@/components/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import SwitcherFour from "@/components/Switchers/SwitcherFour";
import SwitcherOne from "@/components/Switchers/SwitcherOne";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import SwitcherTwo from "@/components/Switchers/SwitcherTwo";
import DatePickerTwo from "@/components/FormElements/DatePicker/DatePickerTwo";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import MultiSelect from "@/components/FormElements/MultiSelect";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import styles from "./User.module.css";
import { useState } from "react";
import Image from "next/image";

const StaffPayroll = () => {
  // State to manage form data
  const [earnings, setEarnings] = useState([{ type: "", amount: 0 }]);
  const [deductions, setDeductions] = useState([{ type: "", amount: 0 }]);
  const [basicSalary, setBasicSalary] = useState(13060);
  const [totalAllowance, setTotalAllowance] = useState(0);
  const [totalDeduction, setTotalDeduction] = useState(0);
  const [grossSalary, setGrossSalary] = useState(0);
  const [tax, setTax] = useState(0);
  const [netSalary, setNetSalary] = useState(0);

  // Add new earning field
  const addMoreEarnings = () => {
    setEarnings([...earnings, { type: "", amount: 0 }]);
  };

  // Remove an earning field
  /*  const removeEarning = (index) => {
      const newEarnings = earnings.filter((_, i) => i !== index);
      setEarnings(newEarnings);
    }; */

  // Add new deduction field
  const addMoreDeductions = () => {
    setDeductions([...deductions, { type: "", amount: 0 }]);
  };

  // Remove a deduction field
  /* const removeDeduction = (index) => {
      const newDeductions = deductions.filter((_, i) => i !== index);
      setDeductions(newDeductions);
    }; */

  // Update earnings and deductions
  /* const handleEarningChange = (index, field, value) => {
      const newEarnings = earnings.map((earning, i) =>
        i === index ? { ...earning, [field]: value } : earning
      );
      setEarnings(newEarnings);
    }; */

  /*  const handleDeductionChange = (index, field, value) => {
      const newDeductions = deductions.map((deduction, i) =>
        i === index ? { ...deduction, [field]: value } : deduction
      );
      setDeductions(newDeductions);
    }; */

  // Calculate Payroll
  const calculatePayroll = () => {
    const totalEarnings = earnings.reduce(
      (sum, item) => sum + Number(item.amount),
      0,
    );
    const totalDeductions = deductions.reduce(
      (sum, item) => sum + Number(item.amount),
      0,
    );

    setTotalAllowance(totalEarnings);
    setTotalDeduction(totalDeductions);

    const calculatedGrossSalary = basicSalary + totalEarnings - totalDeductions;
    setGrossSalary(calculatedGrossSalary);

    const calculatedNetSalary = calculatedGrossSalary - tax;
    setNetSalary(calculatedNetSalary);
  };
  return (
    <>
      {/* <Breadcrumb pageName="FormElements" /> */}
      <div className="w-full">
        <div className="rounded-md bg-white shadow-md">
          <div className="border-gray-300 border-b p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">Staff Details</h3>
              </div>
              <div className="flex">
                <a
                  href="https://erp.erabesa.co.in/admin/payroll"
                  className="rounded-md bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
                >
                  <i className="fa fa-arrow-left"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Image
                    className="h-28 w-28 rounded-md"
                    src="https://erp.erabesa.co.in/uploads/staff_images/no_image.png"
                    alt="No Image"
                  />
                  <div className="ml-4">
                    <table className="table-auto text-sm">
                      <tbody>
                        <tr>
                          <th className="pr-4">Name:</th>
                          <td>Priya Ronghe</td>
                        </tr>
                        <tr>
                          <th className="pr-4">Staff ID:</th>
                          <td>19001</td>
                        </tr>
                        <tr>
                          <th className="pr-4">Phone:</th>
                          <td>9130683314</td>
                        </tr>
                        <tr>
                          <th className="pr-4">Email:</th>
                          <td>priyahemants@gmail.com</td>
                        </tr>
                        <tr>
                          <th className="pr-4">EPF No:</th>
                          <td>NA</td>
                        </tr>
                        <tr>
                          <th className="pr-4">Role:</th>
                          <td>Teacher</td>
                        </tr>
                        <tr>
                          <th className="pr-4">Department:</th>
                          <td>Teaching</td>
                        </tr>
                        <tr>
                          <th className="pr-4">Designation:</th>
                          <td>Principal</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div>
                <div className="relative rounded-md border p-4">
                  <div className="absolute left-0 top-0 bg-blue-500 p-1 text-white">
                    Attendance
                  </div>
                  <table className="mt-4 w-full table-auto text-sm">
                    <thead>
                      <tr>
                        <th className="border px-2 py-1">Month</th>
                        <th className="border px-2 py-1">P</th>
                        <th className="border px-2 py-1">L</th>
                        <th className="border px-2 py-1">A</th>
                        <th className="border px-2 py-1">F</th>
                        <th className="border px-2 py-1">H</th>
                        <th className="border px-2 py-1">V</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-2 py-1">January</td>
                        <td className="border px-2 py-1">0</td>
                        <td className="border px-2 py-1">0</td>
                        <td className="border px-2 py-1">0</td>
                        <td className="border px-2 py-1">0</td>
                        <td className="border px-2 py-1">0</td>
                        <td className="border px-2 py-1">0</td>
                      </tr>
                      {/* Additional months */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <hr className="my-4" />
          </div>

          <div className="p-4">
            {/* Earnings */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <h3 className="mb-2 text-lg font-semibold">Earning</h3>
                <button
                  type="button"
                  onClick={addMoreEarnings}
                  className="mb-2 text-blue-500 hover:text-blue-700"
                >
                  <i className="fa fa-plus"></i> Add
                </button>

                {earnings.map((earning, index) => (
                  <div key={index} className="mb-2 flex space-x-2">
                    <input
                      type="text"
                      value={earning.type}
                      /*   onChange={(e) => handleEarningChange(index, 'type', e.target.value)} */
                      className="w-full rounded border px-2 py-1"
                      placeholder="Type"
                    />
                    <input
                      type="number"
                      value={earning.amount}
                      /*   onChange={(e) => handleEarningChange(index, 'amount', e.target.value)} */
                      className="w-full rounded border px-2 py-1"
                      placeholder="Amount"
                    />
                    <button
                      type="button"
                      /*   onClick={() => removeEarning(index)} */
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>

              {/* Deductions */}
              <div>
                <h3 className="mb-2 text-lg font-semibold">Deduction</h3>
                <button
                  type="button"
                  onClick={addMoreDeductions}
                  className="mb-2 text-blue-500 hover:text-blue-700"
                >
                  <i className="fa fa-plus"></i> Add
                </button>

                {deductions.map((deduction, index) => (
                  <div key={index} className="mb-2 flex space-x-2">
                    <input
                      type="text"
                      value={deduction.type}
                      /* onChange={(e) => handleDeductionChange(index, 'type', e.target.value)} */
                      className="w-full rounded border px-2 py-1"
                      placeholder="Type"
                    />
                    <input
                      type="number"
                      value={deduction.amount}
                      /*  onChange={(e) => handleDeductionChange(index, 'amount', e.target.value)} */
                      className="w-full rounded border px-2 py-1"
                      placeholder="Amount"
                    />
                    <button
                      type="button"
                      /*  onClick={() => removeDeduction(index)} */
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>

              {/* Payroll Summary */}
              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  Payroll Summary (₹)
                </h3>
                <button
                  type="button"
                  onClick={calculatePayroll}
                  className="mb-2 text-green-500 hover:text-green-700"
                >
                  <i className="fa fa-calculator"></i> Calculate
                </button>

                <div className="mt-2 space-y-2">
                  <div>
                    <label className="block text-sm">Basic Salary</label>
                    <input
                      type="number"
                      value={basicSalary}
                      onChange={(e) => setBasicSalary(Number(e.target.value))}
                      className="w-full rounded border px-2 py-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Earning</label>
                    <input
                      type="number"
                      value={totalAllowance}
                      readOnly
                      className="w-full rounded border px-2 py-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Deduction</label>
                    <input
                      type="number"
                      value={totalDeduction}
                      readOnly
                      className="text-red-500 w-full rounded border px-2 py-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Gross Salary</label>
                    <input
                      type="number"
                      value={grossSalary}
                      readOnly
                      className="w-full rounded border px-2 py-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Tax</label>
                    <input
                      type="number"
                      value={tax}
                      onChange={(e) => setTax(Number(e.target.value))}
                      className="text-red-500 w-full rounded border px-2 py-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Net Salary</label>
                    <input
                      type="number"
                      value={netSalary}
                      readOnly
                      className="w-full rounded border px-2 py-1 text-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-right">
              <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffPayroll;
