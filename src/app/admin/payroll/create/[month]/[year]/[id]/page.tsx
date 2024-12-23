"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { Delete, Edit, Add, Remove, Calculate } from "@mui/icons-material";  // Import Calculate icon
import { fetchStaffSingleData } from "@/services/staffService";

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
              department_name:data.data.department_name || "",
    designation_name:data.data.designation_name || "",
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

              staff_leave_details : data.data.staff_leave_details,


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
    const totalAllowance = allowances.reduce((acc, curr) => acc + Number(curr.amount), 0);
    const totalDeduction = deductions.reduce((acc, curr) => acc + Number(curr.amount), 0);
    const grossSalary = Number(salary.basic) + totalAllowance;

    // Set both gross and net salary to the same value
    const netSalary = grossSalary;  // Net Salary is same as Gross Salary
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
      setAllowances((prevAllowances) => [...prevAllowances, { type: "", amount: 0 }]);
    } else if (type === "deduction") {
      setDeductions((prevDeductions) => [...prevDeductions, { type: "", amount: 0 }]);
    }
  };

  const handleRemoveRow = (index: any, type: any) => {
    if (type === "allowance") {
      setAllowances((prevAllowances) => prevAllowances.filter((_, i) => i !== index));
    } else if (type === "deduction") {
      setDeductions((prevDeductions) => prevDeductions.filter((_, i) => i !== index));
    }
  };

  const handleChange = (e: any, index: any, type: any) => {
    const { name, value } = e.target;

    if (type === "allowance") {
      setAllowances((prevAllowances) => {
        const updatedAllowances = [...prevAllowances];
        updatedAllowances[index] = { ...updatedAllowances[index], [name]: value };
        return updatedAllowances;
      });
    } else if (type === "deduction") {
      setDeductions((prevDeductions) => {
        const updatedDeductions = [...prevDeductions];
        updatedDeductions[index] = { ...updatedDeductions[index], [name]: value };
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
        <div className="bg-white flex flex-wrap lg:flex-nowrap justify-between items-center p-6 pb-0 dark:bg-boxdark dark:drop-shadow-none">
          <h2 className="text-lg font-bold dark:text-white">Staff Details</h2>
          <a href="/admin/payroll" className="btn-primary text-xs flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
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

        <div className="bg-white p-6 rounded dark:bg-boxdark dark:drop-shadow-none dark:text-white dark:border-strokedark grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
  <div className="border border-stroke p-4 rounded dark:border-strokedark xl:col-span-2 md:col-span-2">
    <div className="flex flex-wrap bg-gray-100 h-full dark:bg-boxdark dark:drop-shadow-none dark:text-white dark:border-strokedark">
      <div className="w-full sm:w-1/4 flex items-center justify-center mb-4 sm:mb-0">
        <img
          src={imageUrl || defaultImage}
          className="rounded-lg w-28 h-28 object-cover"
          alt="No Image"
        />
      </div>
      <div className="w-full sm:w-3/4 pl-0 sm:pl-4">
        <table className="table-auto w-full text-sm text-gray-600">
          <tbody>
            <tr className="border-b border-stroke dark:border-strokedark">
              <th className="text-left pr-4 py-2 font-bold dark:text-white">Name</th>
              <td className="py-2 dark:text-white">{formData.name} {formData.surname}</td>
              <th className="text-left pr-4 py-2 font-bold dark:text-white">Staff ID</th>
              <td className="py-2 dark:text-white">{formData.employee_id}</td>
            </tr>
            <tr className="border-b border-stroke dark:border-strokedark">
              <th className="text-left pr-4 py-2 font-bold dark:text-white">Phone</th>
              <td className="py-2 dark:text-white">{formData.contact_no}</td>
              <th className="text-left pr-4 py-2 font-bold dark:text-white">Email</th>
              <td className="py-2 dark:text-white whitespace-nowrap overflow-hidden truncate sm:overflow-ellipsis">{formData.email}</td>
            </tr>
            <tr className="border-b border-stroke dark:border-strokedark">
              <th className="text-left pr-4 py-2 font-bold dark:text-white">EPF No</th>
              <td className="py-2 dark:text-white">{formData.epf_no}</td>
              <th className="text-left pr-4 py-2 font-bold dark:text-white">Role</th>
              <td className="py-2 dark:text-white">{formData.user_type}</td>
            </tr>
            <tr className="border-b border-stroke dark:border-strokedark">
              <th className="text-left pr-4 py-2 font-bold dark:text-white">Department</th>
              <td className="py-2 dark:text-white">{formData.department_name}</td>
              <th className="text-left pr-4 py-2 font-bold dark:text-white">Designation</th>
              <td className="py-2 dark:text-white">{formData.designation_name}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div className="border border-stroke p-4 rounded dark:border-strokedark xl:col-span-1 md:col-span-1 w-full lg:w-full xl:w-full">
    <div className="bg-gray-100 h-full dark:border-strokedark">
      <table className="table-auto w-full text-sm text-gray-600 overflow-x-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-left py-2 px-2 font-medium">Month</th>
            <th className="text-left py-2 px-2 font-medium">P</th>
            <th className="text-left py-2 px-2 font-medium">L</th>
            <th className="text-left py-2 px-2 font-medium">A</th>
            <th className="text-left py-2 px-2 font-medium">F</th>
            <th className="text-left py-2 px-2 font-medium">H</th>
            <th className="text-left py-2 px-2 font-medium">V</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-stroke dark:border-strokedark">
            <td className="py-2 px-2">January</td>
            <td className="py-2 px-2">0</td>
            <td className="py-2 px-2">0</td>
            <td className="py-2 px-2">0</td>
            <td className="py-2 px-2">0</td>
            <td className="py-2 px-2">0</td>
            <td className="py-2 px-2">0</td>
          </tr>
          <tr className="border-t border-stroke dark:border-strokedark">
            <td className="py-2 px-2">December</td>
            <td className="py-2 px-2">0</td>
            <td className="py-2 px-2">0</td>
            <td className="py-2 px-2">0</td>
            <td className="py-2 px-2">0</td>
            <td className="py-2 px-2">0</td>
            <td className="py-2 px-2">0</td>
          </tr>
          <tr className="border-t border-stroke dark:border-strokedark">
            <td className="py-2 px-2">November</td>
            <td className="py-2 px-2">0</td>
            <td className="py-2 px-2">0</td>
            <td className="py-2 px-2">0</td>
            <td className="py-2 px-2">0</td>
            <td className="py-2 px-2">0</td>
            <td className="py-2 px-2">0</td>
          </tr>
          <tr className="border-t border-stroke dark:border-strokedark">
            <td className="py-2 px-2">October</td>
            <td className="py-2 px-2">0</td>
            <td className="py-2 px-2">0</td>
            <td className="py-2 px-2">0</td>
            <td className="py-2 px-2">0</td>
            <td className="py-2 px-2">0</td>
            <td className="py-2 px-2">0</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>





        <div className="bg-white p-6 shadow-md rounded dark:bg-boxdark dark:drop-shadow-none dark:text-white dark:border-strokedark">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
  <div className="border border-stroke p-4 rounded shadow-md dark:border-strokedark">
    <div className="flex justify-between items-center mb-5">
      <h3 className="text-md font-bold">Earnings</h3>
      <button
        className="btn-primary w-5 h-5 flex justify-center items-center rounded bg-blue-500 hover:bg-blue-600"
        onClick={() => handleAddRow("allowance")}
      >
        <Add className="text-white" />
      </button>
    </div>

    {allowances.map((item, index) => (
      <div key={index} className="flex items-center mb-3 space-x-4">
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
          className="w-16 px-3 py-3 rounded-md border border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />

        {index > 0 && (
          <button
            className="btn-error py-2 rounded flex items-center"
            onClick={() => handleRemoveRow(index, "allowance")}
          >
            <DeleteIcon className="mr-2" />
          </button>
        )}
      </div>
    ))}
  </div>

  <div className="border border-stroke p-4 rounded shadow-md dark:border-strokedark">
    <div className="flex justify-between items-center mb-5">
      <h3 className="text-md font-bold">Deductions</h3>
      <button
        className="btn-primary w-5 h-5 flex justify-center rounded items-center bg-blue-500 hover:bg-blue-600"
        onClick={() => handleAddRow("deduction")}
      >
        <Add className="text-white" />
      </button>
    </div>

    {deductions.map((item, index) => (
      <div key={index} className="flex items-center mb-3 space-x-4">
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
          className="w-16 px-3 py-3 rounded-md border border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        {index > 0 && (
          <button
            className="btn-error py-2 rounded flex items-center"
            onClick={() => handleRemoveRow(index, "deduction")}
          >
            <DeleteIcon className="mr-2" />
          </button>
        )}
      </div>
    ))}
  </div>

  <div className="border border-stroke p-4 rounded shadow-md dark:border-strokedark">
    <div className="flex justify-between items-center mb-5">
      <h3 className="text-md font-bold">Payroll Summary</h3>
      <button
        className="btn-primary flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-teal-500 hover:to-blue-500 shadow-lg transform hover:scale-105 transition-all duration-300 py-2 px-4"
        onClick={calculateTotal}
      >
        <Calculate className="text-white text-xl" />
        <span className="text-white font-medium">Calculate</span>
      </button>
    </div>

    <div className="mb-5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Basic Salary</label>
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
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Total Allowances</label>
                <input
                  type="number"
                  name="totalAllowance"
                  value={salary.totalAllowance}
                  readOnly
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Total Deductions</label>
                <input
                  type="number"
                  name="totalDeduction"
                  value={salary.totalDeduction}
                  readOnly
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Gross Salary</label>
                <input
                  type="number"
                  name="gross"
                  value={salary.gross}
                  readOnly
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Tax</label>
                <input
                  type="number"
                  name="tax"
                  value={salary.tax}
                  onChange={handleSalaryChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Net Salary</label>
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
          className="flex justify-end items-center gap-2 ml-auto rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
        >
          Save
        </button>

        </div>
      </div>
    </DefaultLayout>
  );
};

export default StudentDetails;
