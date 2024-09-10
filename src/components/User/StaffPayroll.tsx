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

const StaffPayroll = () => {
  return (
    <>
      {/* <Breadcrumb pageName="FormElements" /> */}
      <div className="w-full">
      <div className="bg-white shadow-md rounded-md">
        <div className="p-4 border-b border-gray-300">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">Staff Details</h3>
            </div>
            <div className="flex">
              <a href="https://erp.erabesa.co.in/admin/payroll" className="btn btn-primary text-xs text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-md">
                <i className="fa fa-arrow-left"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center">
                <img
                  className="w-28 h-28 rounded-md"
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
              <div className="relative border p-4 rounded-md">
                <div className="absolute top-0 left-0 p-1 bg-blue-500 text-white">Attendance</div>
                <table className="table-auto w-full text-sm mt-4">
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

          <form className="grid grid-cols-1 md:grid-cols-3 gap-4" action="https://erp.erabesa.co.in/admin/payroll/payslip" method="POST">
            {/* Earning */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Earning</h3>
              <button
                type="button"
                onClick={() => addMoreEarnings()}
                className="text-blue-500 hover:text-blue-700"
              >
                <i className="fa fa-plus"></i> Add
              </button>
              <div className="space-y-2 mt-2">
                <input
                  type="text"
                  name="allowance_type[]"
                  className="w-full border px-2 py-1 rounded"
                  placeholder="Type"
                />
                <input
                  type="text"
                  name="allowance_amount[]"
                  className="w-full border px-2 py-1 rounded"
                  value="0"
                />
              </div>
            </div>

            {/* Deduction */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Deduction</h3>
              <button
                type="button"
                onClick={() => addMoreDeductions()}
                className="text-blue-500 hover:text-blue-700"
              >
                <i className="fa fa-plus"></i> Add
              </button>
              <div className="space-y-2 mt-2">
                <input
                  type="text"
                  name="deduction_type[]"
                  className="w-full border px-2 py-1 rounded"
                  placeholder="Type"
                />
                <input
                  type="text"
                  name="deduction_amount[]"
                  className="w-full border px-2 py-1 rounded"
                  value="0"
                />
              </div>
            </div>

            {/* Payroll Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Payroll Summary (₹)</h3>
              <button
                type="button"
                onClick={() => calculatePayroll()}
                className="text-green-500 hover:text-green-700"
              >
                <i className="fa fa-calculator"></i> Calculate
              </button>
              <div className="space-y-2 mt-2">
                <div>
                  <label className="block text-sm">Basic Salary</label>
                  <input
                    type="text"
                    name="basic"
                    className="w-full border px-2 py-1 rounded"
                    value="13060"
                  />
                </div>
                <div>
                  <label className="block text-sm">Earning</label>
                  <input
                    type="text"
                    name="total_allowance"
                    className="w-full border px-2 py-1 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm">Deduction</label>
                  <input
                    type="text"
                    name="total_deduction"
                    className="w-full border px-2 py-1 rounded text-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm">Gross Salary</label>
                  <input
                    type="text"
                    name="gross_salary"
                    className="w-full border px-2 py-1 rounded"
                    value="0"
                  />
                </div>
                <div>
                  <label className="block text-sm">Tax</label>
                  <input
                    type="text"
                    name="tax"
                    className="w-full border px-2 py-1 rounded text-red-500"
                    value="0"
                  />
                </div>
              </div>
            </div>
          </form>

          <div className="mt-4 text-right">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
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
