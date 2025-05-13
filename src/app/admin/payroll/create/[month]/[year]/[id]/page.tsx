"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import { Delete, Edit, Add, Remove, Calculate } from "@mui/icons-material"; // Import Calculate icon
import { fetchStaffSingleData } from "@/services/staffService";
import Image from "next/image";

const StudentDetails = () => {
  const router = useRouter();

  // Salary state
  const [allowances, setAllowances] = useState([{ type: "", amount: 0 }]);
  const [deductions, setDeductions] = useState([{ type: "", amount: 0 }]);
  const [formData, setFormData] = useState<Record<string, any>>({
    employee_id: "",
    lang_id: "",
    department: "",
    designation: "",
    qualification: "",
    work_exp: "",
    name: "",
    surname: "",
    father_name: "",
    mother_name: "",
    contact_no: "",
    emergency_contact_no: "",
    email: "",
    dob: "",
    marital_status: "",
    date_of_joining: "",
    date_of_leaving: "",
    local_address: "",
    permanent_address: "",
    note: "",
    image: "",
    password: "",
    gender: "",
    account_title: "",
    bank_account_no: "",
    bank_name: "",
    ifsc_code: "",
    bank_branch: "",
    payscale: "",
    basic_salary: "",
    epf_no: "",
    contract_type: "",
    shift: "",
    location: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    resume: "",
    joining_letter: "",
    resignation_letter: "",
    other_document_name: "",
    other_document_file: "",
    user_id: "",
    is_active: "",
    verification_code: "",
    department_name: "",
    designation_name: "",
    disable_at: "",
    role_id: "",
    user_type: "",
  });
  const [salary, setSalary] = useState({
    basic: 0,
    totalAllowance: 0,
    totalDeduction: 0,
    gross: 0,
    net: 0,
    tax: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = window.location.pathname.split("/").pop();
      if (id) {
        const getData = async () => {
          try {
            const data = await fetchStaffSingleData(id);

            setFormData({
              id: data.data.id,
              employee_id: data.data.employee_id || "",
              lang_id: data.data.lang_id || "",
              department: data.data.department || "",
              designation: data.data.designation || "",
              department_name: data.data.department_name || "",
              designation_name: data.data.designation_name || "",
              qualification: data.data.qualification || "",
              work_exp: data.data.work_exp || "",
              name: data.data.name || "",
              surname: data.data.surname || "",
              father_name: data.data.father_name || "",
              mother_name: data.data.mother_name || "",
              contact_no: data.data.contact_no || "",
              emergency_contact_no: data.data.emergency_contact_no || "",
              email: data.data.email || "",
              dob: data.data.dob || "",
              marital_status: data.data.marital_status || "",
              date_of_joining: data.data.date_of_joining || "",
              date_of_leaving: data.data.date_of_leaving || "",
              local_address: data.data.local_address || "",
              permanent_address: data.data.permanent_address || "",
              note: data.data.note || "",
              image: data.data.image || "",
              password: data.data.password || "",
              gender: data.data.gender || "",
              account_title: data.data.account_title || "",
              bank_account_no: data.data.bank_account_no || "",
              bank_name: data.data.bank_name || "",
              ifsc_code: data.data.ifsc_code || "",
              bank_branch: data.data.bank_branch || "",
              payscale: data.data.payscale || "",
              basic_salary: data.data.basic_salary || "",
              epf_no: data.data.epf_no || "",
              contract_type: data.data.contract_type || "",
              shift: data.data.shift || "",
              location: data.data.location || "",
              facebook: data.data.facebook || "",
              twitter: data.data.twitter || "",
              linkedin: data.data.linkedin || "",
              instagram: data.data.instagram || "",
              resume: data.data.resume || "",
              joining_letter: data.data.joining_letter || "",
              resignation_letter: data.data.resignation_letter || "",
              other_document_name: data.data.other_document_name || "",
              other_document_file: data.data.other_document_file || "",
              user_id: data.data.user_id || "",
              is_active: data.data.is_active || "",
              verification_code: data.data.verification_code || "",
              disable_at: data.data.disable_at || "",
              role_id: data.data.role_id || "",
              user_type: data.data.user_type || "",

              staff_leave_details: data.data.staff_leave_details,
            });
          } catch (error) {
            console.error("Error fetching student data:", error);
          }
        };
        getData();
      }
    }
  }, []);

  let defaultImage = "/images/user/default_male.jpg";
  let id = window.location.pathname.split("/").pop();
  // Check for gender and default image conditions
  if (
    formData?.gender === "Female" &&
    formData?.image === "uploads/student_images/default_female.jpg"
  ) {
    defaultImage = "/images/user/default_female.jpg";
  } else if (
    formData?.gender === "Male" &&
    formData?.image === "uploads/student_images/default_male.jpg"
  ) {
    defaultImage = "/images/user/default_male.jpg";
  } else {
    defaultImage = `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/staff_documents/${id}/${formData?.image}`;
  }

  // Dynamically construct the image URL
  const imageUrl = `${defaultImage}`;
  // Calculating total salary components
  const calculateTotal = () => {
    const totalAllowance = allowances.reduce(
      (acc, curr) => acc + Number(curr.amount),
      0,
    );
    const totalDeduction = deductions.reduce(
      (acc, curr) => acc + Number(curr.amount),
      0,
    );
    const grossSalary = Number(salary.basic) + totalAllowance;

    // Set both gross and net salary to the same value
    const netSalary = grossSalary; // Net Salary is same as Gross Salary
    setSalary((prev) => ({
      ...prev,
      totalAllowance,
      totalDeduction,
      gross: grossSalary,
      net: netSalary, // Assign the same value to Net Salary
    }));
  };

  // Handling row addition and removal for allowances and deductions
  const handleAddRow = (type: any) => {
    if (type === "allowance") {
      setAllowances((prevAllowances) => [
        ...prevAllowances,
        { type: "", amount: 0 },
      ]);
    } else if (type === "deduction") {
      setDeductions((prevDeductions) => [
        ...prevDeductions,
        { type: "", amount: 0 },
      ]);
    }
  };

  const handleRemoveRow = (index: any, type: any) => {
    if (type === "allowance") {
      setAllowances((prevAllowances) =>
        prevAllowances.filter((_, i) => i !== index),
      );
    } else if (type === "deduction") {
      setDeductions((prevDeductions) =>
        prevDeductions.filter((_, i) => i !== index),
      );
    }
  };

  const handleChange = (e: any, index: any, type: any) => {
    const { name, value } = e.target;

    if (type === "allowance") {
      setAllowances((prevAllowances) => {
        const updatedAllowances = [...prevAllowances];
        updatedAllowances[index] = {
          ...updatedAllowances[index],
          [name]: value,
        };
        return updatedAllowances;
      });
    } else if (type === "deduction") {
      setDeductions((prevDeductions) => {
        const updatedDeductions = [...prevDeductions];
        updatedDeductions[index] = {
          ...updatedDeductions[index],
          [name]: value,
        };
        return updatedDeductions;
      });
    }
  };

  // Salary and tax input changes
  const handleSalaryChange = (e: any) => {
    const { name, value } = e.target;
    setSalary((prev) => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto dark:bg-boxdark dark:drop-shadow-none">
        <div className="flex flex-wrap items-center justify-between bg-white p-6 pb-0 dark:bg-boxdark dark:drop-shadow-none lg:flex-nowrap">
          <h2 className="text-lg font-bold dark:text-white">Staff Details</h2>
          <a
            href="/admin/payroll"
            className="btn-primary flex items-center text-xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 12H5m7-7l-7 7 7 7"
              />
            </svg>
            Back
          </a>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 rounded bg-white p-6 dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded border border-stroke p-4 dark:border-strokedark md:col-span-2 xl:col-span-2">
            <div className="bg-gray-100 flex h-full flex-wrap dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
              <div className="mb-4 flex w-full items-center justify-center sm:mb-0 sm:w-1/4">
                <Image
                  src={imageUrl || defaultImage}
                  className="h-28 w-28 rounded-lg object-cover"
                  alt="No Image"
                  
                />
              </div>
              <div className="w-full pl-0 sm:w-3/4 sm:pl-4">
                <table className="text-gray-600 w-full table-auto text-sm">
                  <tbody>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <th className="py-2 pr-4 text-left font-bold dark:text-white">
                        Name
                      </th>
                      <td className="py-2 dark:text-white">
                        {formData.name} {formData.surname}
                      </td>
                      <th className="py-2 pr-4 text-left font-bold dark:text-white">
                        Staff ID
                      </th>
                      <td className="py-2 dark:text-white">
                        {formData.employee_id}
                      </td>
                    </tr>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <th className="py-2 pr-4 text-left font-bold dark:text-white">
                        Phone
                      </th>
                      <td className="py-2 dark:text-white">
                        {formData.contact_no}
                      </td>
                      <th className="py-2 pr-4 text-left font-bold dark:text-white">
                        Email
                      </th>
                      <td className="overflow-hidden truncate whitespace-nowrap py-2 dark:text-white sm:overflow-ellipsis">
                        {formData.email}
                      </td>
                    </tr>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <th className="py-2 pr-4 text-left font-bold dark:text-white">
                        EPF No
                      </th>
                      <td className="py-2 dark:text-white">
                        {formData.epf_no}
                      </td>
                      <th className="py-2 pr-4 text-left font-bold dark:text-white">
                        Role
                      </th>
                      <td className="py-2 dark:text-white">
                        {formData.user_type}
                      </td>
                    </tr>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <th className="py-2 pr-4 text-left font-bold dark:text-white">
                        Department
                      </th>
                      <td className="py-2 dark:text-white">
                        {formData.department_name}
                      </td>
                      <th className="py-2 pr-4 text-left font-bold dark:text-white">
                        Designation
                      </th>
                      <td className="py-2 dark:text-white">
                        {formData.designation_name}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="w-full rounded border border-stroke p-4 dark:border-strokedark md:col-span-1 lg:w-full xl:col-span-1 xl:w-full">
            <div className="bg-gray-100 h-full dark:border-strokedark">
              <table className="text-gray-600 w-full table-auto overflow-x-auto text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-2 py-2 text-left font-medium">Month</th>
                    <th className="px-2 py-2 text-left font-medium">P</th>
                    <th className="px-2 py-2 text-left font-medium">L</th>
                    <th className="px-2 py-2 text-left font-medium">A</th>
                    <th className="px-2 py-2 text-left font-medium">F</th>
                    <th className="px-2 py-2 text-left font-medium">H</th>
                    <th className="px-2 py-2 text-left font-medium">V</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-stroke dark:border-strokedark">
                    <td className="px-2 py-2">January</td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">0</td>
                  </tr>
                  <tr className="border-t border-stroke dark:border-strokedark">
                    <td className="px-2 py-2">December</td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">0</td>
                  </tr>
                  <tr className="border-t border-stroke dark:border-strokedark">
                    <td className="px-2 py-2">November</td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">0</td>
                  </tr>
                  <tr className="border-t border-stroke dark:border-strokedark">
                    <td className="px-2 py-2">October</td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="rounded bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded border border-stroke p-4 shadow-md dark:border-strokedark">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-md font-bold">Earnings</h3>
                <button
                  className="btn-primary flex h-5 w-5 items-center justify-center rounded bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleAddRow("allowance")}
                >
                  <Add className="text-white" />
                </button>
              </div>

              {allowances.map((item, index) => (
                <div key={index} className="mb-3 flex items-center space-x-4">
                  <input
                    type="text"
                    name="type"
                    value={item.type}
                    placeholder="Type"
                    onChange={(e) => handleChange(e, index, "allowance")}
                    className="w-40 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <input
                    type="number"
                    name="amount"
                    value={item.amount}
                    onChange={(e) => handleChange(e, index, "allowance")}
                    className="w-16 rounded-md border border-stroke px-3 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />

                  {index > 0 && (
                    <button
                      className="btn-error flex items-center rounded py-2"
                      onClick={() => handleRemoveRow(index, "allowance")}
                    >
                      <DeleteIcon className="mr-2" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="rounded border border-stroke p-4 shadow-md dark:border-strokedark">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-md font-bold">Deductions</h3>
                <button
                  className="btn-primary flex h-5 w-5 items-center justify-center rounded bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleAddRow("deduction")}
                >
                  <Add className="text-white" />
                </button>
              </div>

              {deductions.map((item, index) => (
                <div key={index} className="mb-3 flex items-center space-x-4">
                  <input
                    type="text"
                    name="type"
                    value={item.type}
                    placeholder="Type"
                    onChange={(e) => handleChange(e, index, "deduction")}
                    className="w-40 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <input
                    type="number"
                    name="amount"
                    value={item.amount}
                    onChange={(e) => handleChange(e, index, "deduction")}
                    className="w-16 rounded-md border border-stroke px-3 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {index > 0 && (
                    <button
                      className="btn-error flex items-center rounded py-2"
                      onClick={() => handleRemoveRow(index, "deduction")}
                    >
                      <DeleteIcon className="mr-2" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="rounded border border-stroke p-4 shadow-md dark:border-strokedark">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-md font-bold">Payroll Summary</h3>
                <button
                  className="btn-primary flex transform items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 px-4 py-2 shadow-lg transition-all duration-300 hover:scale-105 hover:from-teal-500 hover:to-blue-500"
                  onClick={calculateTotal}
                >
                  <Calculate className="text-xl text-white" />
                  <span className="font-medium text-white">Calculate</span>
                </button>
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Basic Salary
                </label>
                <input
                  type="number"
                  name="basic"
                  value={salary.basic}
                  onChange={handleSalaryChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  placeholder="Enter basic salary"
                />
              </div>
              <div className="mb-5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Total Allowances
                </label>
                <input
                  type="number"
                  name="totalAllowance"
                  value={salary.totalAllowance}
                  readOnly
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Total Deductions
                </label>
                <input
                  type="number"
                  name="totalDeduction"
                  value={salary.totalDeduction}
                  readOnly
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Gross Salary
                </label>
                <input
                  type="number"
                  name="gross"
                  value={salary.gross}
                  readOnly
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Tax
                </label>
                <input
                  type="number"
                  name="tax"
                  value={salary.tax}
                  onChange={handleSalaryChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Net Salary
                </label>
                <input
                  type="number"
                  name="net"
                  value={salary.net}
                  readOnly
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="ml-auto flex items-center justify-end gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
          >
            Save
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default StudentDetails;
