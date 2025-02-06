"use client"; // Add this at the top of the file
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import User from "@/components/User/User";
import Image from "next/image";
import styled from 'styled-components';
import {
  fetchStaffLoginDetails,
  fetchStaffSingleData,
} from "@/services/staffService";
import {
  ArrowDropUpTwoTone,
  AttachMoney,
  Edit,
  Key,
  ThumbDown,
  ThumbUp,
  Visibility,
} from "@mui/icons-material";
/* import 'font-awesome/css/font-awesome.min.css'; */

const StudentDetails = () => {
  const router = useRouter();
  /* const { id } = useParams(); */

  const [activeTab, setActiveTab] = useState("activity");
  const [activeTabOne, setActiveTabOne] = useState("activity");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormVisible2, setIsFormVisible2] = useState(false);
  const [passwordModel, setIsPasswordModel] = useState(false);
  const [loadingstaffdetails, setloadingstaffdetails] = useState(true);
  const [setisdisablestudentmodel, setIsDisableStudentModel] = useState(false);
  const [partentdata, setParentData] = useState<any>(null);
  const [staffData, setStaffData] = useState<any>(null);
  const [getId, setgetId] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const StyledWrapper = styled.div`
  

  .container {
    max-width: 680px;
    background: #F8F9FD;
    background: #fff;
    /* border-radius: 40px; */
    padding: 25px 35px;
    border: 5px solid rgb(255, 255, 255);
    /* box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px; */
    margin-top: 40px;
    margin: 0 auto;
}

  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 18px;
    color: rgb(16, 137, 211);
  }

  .form {
    margin-top: 20px;
  }

  .form .input {
    width: 100%;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
  }

  .form .input::-moz-placeholder {
    color: rgb(170, 170, 170);
  }

  .form .input::placeholder {
    color: rgb(170, 170, 170);
  }

  .form .input:focus {
    outline: none;
    border-inline: 2px solid #12B1D1;
  }


  .form .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
    color: white;
    padding-block: 15px;
    margin: 20px auto;
    border-radius: 20px;
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
  }

  .form .login-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
  }

  .form .login-button:active {
    transform: scale(0.95);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
  }

  .agreement {
    display: block;
    text-align: center;
    margin-top: 15px;
  }

  .agreement a {
    text-decoration: none;
    color: #0099ff;
    font-size: 12px;
  }`;

  const handleButtonClick = () => {
    setIsFormVisible(!isFormVisible);
  };
  const handleButtonClick2 = () => {
    setIsFormVisible2(!isFormVisible2);
  };
  const [formDataDisable, setFormDataDisable] = useState<Record<string, any>>({
    id: getId,
    reason: "",
    date: "",
    note: "",
    status: "",
  });

  const [formDataDoc, setFormDataDoc] = useState<Record<string, any>>({
    id: getId,
    title: "",
    doc: "",
  });
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
    disable_at: "",
    role_id: "",
    user_type: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = window.location.pathname.split("/").pop();
      if (id) {
        const getData = async () => {
          try {
            const data = await fetchStaffSingleData(id);
            console.log("data", data);
            setFormData({
              employee_id: data.data.employee_id || "",
              lang_id: data.data.lang_id || "",
              department: data.data.department || "",
              designation: data.data.designation || "",
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

  let defaultFatherImage = "/images/user/default_male.jpg";

  let defaultFemalImage = "/images/user/default_female.jpg";

  /* let defaultImage = "/images/user/default_male.jpg";

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
    defaultImage = `${process.env.NEXT_PUBLIC_BASE_URL}${formData?.image}`;
  } */

  const handleEdit = (id: number) => {
    router.push(`/admin/staff/edit/${id}`);
  };

  const handleAddFees = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };
  

  const handlePasswordModel = async () => {
    setIsPasswordModel(!passwordModel);
    setloadingstaffdetails(true);
    const staffLoginDetails = await fetchStaffLoginDetails({ id: getId });
    if (staffLoginDetails.data.length > 0) {
      setloadingstaffdetails(false);
    } else {
      setloadingstaffdetails(false);
    }

    
    staffLoginDetails.data.forEach((user: any) => {
      if (user.role === "staff") {
        setStaffData(user); // Set the staff data
      }
    });
    
  };

  const sendStaffPassword = () => {
    alert("Staff password has been sent!");
    // Add your logic here
  };

 

  return (
    <DefaultLayout>
      <div className="flex flex-wrap">
        {/* Profile Sidebar */}
        <div className="w-full p-2 md:w-1/4">
          <div className="rounded-lg bg-white p-4 shadow-lg dark:bg-boxdark dark:drop-shadow-none">
            <div className="text-center">
              <img
                src={imageUrl || defaultImage}
                alt="Staff Profile"
                className="mx-auto h-24 w-24 rounded-full"
                onError={(e) =>
                  ((e.target as HTMLImageElement).outerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" class="mx-auto h-24 w-24 rounded-full">
      <circle cx="12" cy="8" r="4" />
      <path d="M2 20c0-4.42 3.58-8 8-8h4c4.42 0 8 3.58 8 8v1H2v-1z" />
    </svg>
  `)
                }
              />
              <h3 className="mt-2 text-[20px] font-bold">
                {formData.firstname} {formData.lastname}
              </h3>
            </div>

            <ul className="mt-4 list-none border-stroke p-0 dark:border-strokedark">
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Staff ID</b>{" "}
                <span className="text-aqua">{formData.employee_id}</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Role</b>{" "}
                <span className="text-aqua">
                  {" "}
                  {formData.user_type || "N/A"}
                </span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Designation</b>{" "}
                <span className="text-aqua">
                  {formData.designation} (2024-25)
                </span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Department</b>{" "}
                <span className="text-aqua">{formData.department}</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>EPF No</b>{" "}
                <span className="text-aqua">{formData.epf_no}</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Basic Salary</b>{" "}
                <span className="text-aqua">{formData.basic_salary}</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Contract Type</b>{" "}
                <span className="text-aqua">{formData.contract_type}</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Work Shift</b>{" "}
                <span className="text-aqua">{formData.shift}</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Location</b>{" "}
                <span className="text-aqua">{formData.location}</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Date Of Joining</b>{" "}
                <span className="text-aqua">{formData.date_of_joining}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Profile Content */}
        <div className="w-full p-2 md:w-3/4">
          <div className="rounded-lg bg-white p-4 shadow-lg dark:bg-boxdark dark:drop-shadow-none">
          <div className="w-full overflow-x-auto">
          <div className="mb-4 flex justify-between border-b border-stroke dark:border-strokedark">
              <ul className="flex">
                <li
                  className={`mr-6 cursor-pointer px-4 py-2 ${activeTab === "activity" ? "border-b-2 border-blue-500" : ""}`}
                  onClick={() => setActiveTab("activity")}
                >
                  Profile
                </li>
                <li
                  className={`mr-6 cursor-pointer px-4 py-2 ${activeTab === "payroll" ? "border-b-2 border-blue-500" : ""}`}
                  onClick={() => setActiveTab("payroll")}
                >
                  Payroll
                </li>
                <li
                  className={`mr-6 cursor-pointer px-4 py-2 ${activeTab === "leaves" ? "border-b-2 border-blue-500" : ""}`}
                  onClick={() => setActiveTab("leaves")}
                >
                  Leaves
                </li>
                <li
                  className={`mr-6 cursor-pointer px-4 py-2 ${activeTab === "attendance" ? "border-b-2 border-blue-500" : ""}`}
                  onClick={() => setActiveTab("attendance")}
                >
                  Attendance
                </li>
                <li
                  className={`mr-6 cursor-pointer px-4 py-2 ${activeTab === "documents" ? "border-b-2 border-blue-500" : ""}`}
                  onClick={() => setActiveTab("documents")}
                >
                  Documents
                </li>
                <li
                  className={`mr-6 cursor-pointer px-4 py-2 ${activeTab === "timelineh" ? "border-b-2 border-blue-500" : ""}`}
                  onClick={() => setActiveTab("timelineh")}
                >
                  Timeline
                </li>
              </ul>

              <ul className="flex">
                <li className="cursor-pointer px-4 py-2">
                  <Edit onClick={() => handleEdit(getId)} />
                </li>
                
                <li className="cursor-pointer px-4 py-2">
                  <Key
                    onClick={() => handlePasswordModel()}
                    className="cursor-pointer text-green-500"
                  />
                </li>

              <li className="cursor-pointer px-4 py-2">
                <Visibility onClick={handleAddFees} />
              </li>
              </ul>
            </div>


            <div className="relative">
              {isOpen && (
                <ul className="border-gray-300 animate-fade-in absolute right-0 z-10 mt-2 w-56 rounded-lg border bg-white shadow-md">
                  <li
                    onClick={sendStaffPassword}
                    className="text-gray-700 hover:bg-gray-50 flex cursor-pointer items-center gap-3 px-4 py-2 text-sm transition-all duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11V6a1 1 0 10-2 0v1a1 1 0 002 0zm0 6a1 1 0 10-2 0v2a1 1 0 102 0v-2z" />
                    </svg>
                    Send Staff Password
                  </li>
                
                </ul>
              )}
            </div>
</div>



   
            {/* Tab Content */}
            {activeTab === "activity" && (
              <div>
                <div className="tab-content mx-auto max-w-screen-2xl p-4">
                  <div
                    className="tab-pane active flex flex-col gap-9"
                    id="activity"
                  >
                    <div className="tshadow mb25 bozero rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-boxdark dark:drop-shadow-none">
                          <tbody>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Phone
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 col-md-5 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.contact_no}
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Emergency Contact Number
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.emergency_contact_no}
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Email
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.email}
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Gender
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.gender}
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Date of Birth
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.dob}
                              </td>
                            </tr>

                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Marital Status
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.marital_status}
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Father Name
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.father_name}
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Mother Name
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.mother_name}
                              </td>
                            </tr>

                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Qualification
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.qualification}
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Work Experience
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.work_exp}
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Note
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.note}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Address
                        </h3>
                      </div>
                      <div className="grid gap-5.5">
                        <div className="overflow-x-auto">
                          <table className="min-w-full border-b border-stroke bg-white dark:bg-boxdark">
                            <tbody>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Current Address
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.local_address}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Permanent Address
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  {formData.permanent_address}
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white"></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Bank Account Details
                        </h3>
                      </div>
                      <div className="grid gap-5.5">
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white dark:bg-boxdark dark:drop-shadow-none">
                            <tbody>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Account Title
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.account_title}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Bank Name
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.bank_name}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Bank Branch Name
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.bank_branch}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Bank Account Number
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.bank_account_no}
                                </td>
                              </tr>

                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  IFSC Code
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.ifsc_code}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Social Media Link
                        </h3>
                      </div>
                      <div className="grid gap-5.5">
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white dark:bg-boxdark dark:drop-shadow-none">
                            <tbody>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Facebook URL
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.facebook}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Twitter URL
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.twitter}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Linkedin URL
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.linkedin}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Instagram URL
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.instagram}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "payroll" && (
              <div className="tab-content mx-auto max-w-screen-2xl">
                <div className="mb-5 grid grid-cols-1 gap-6 dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none sm:grid-cols-2 md:grid-cols-4">
                  {/* Total Net Salary Paid */}
                  <div className="flex flex-col items-center rounded-lg bg-white p-2 shadow-md dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
                    <h5 className="text-gray-600 text-sm">
                      Total Net Salary Paid
                    </h5>
                    <h4 className="text-gray-900 text-xl font-semibold">
                      ₹0.00
                    </h4>
                    <div className="mt-2 text-4xl text-green-500">
                      <i className="fa fa-money"></i>
                    </div>
                  </div>

                  {/* Total Gross Salary */}
                  <div className="flex flex-col items-center rounded-lg bg-white p-2 shadow-md dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
                    <h5 className="text-gray-600 text-sm">
                      Total Gross Salary
                    </h5>
                    <h4 className="text-gray-900 text-xl font-semibold">
                      ₹0.00
                    </h4>
                    <div className="mt-2 text-4xl text-blue-500">
                      <i className="fa fa-money"></i>
                    </div>
                  </div>

                  {/* Total Earning */}
                  <div className="flex flex-col items-center rounded-lg bg-white p-2 shadow-md dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
                    <h5 className="text-gray-600 text-sm">Total Earning</h5>
                    <h4 className="text-gray-900 text-xl font-semibold">
                      ₹0.00
                    </h4>
                    <div className="mt-2 text-4xl text-yellow-500">
                      <i className="fa fa-money"></i>
                    </div>
                  </div>

                  {/* Total Deduction */}
                  <div className="flex flex-col items-center rounded-lg bg-white p-2 shadow-md dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
                    <h5 className="text-gray-600 text-sm">Total Deduction</h5>
                    <h4 className="text-gray-900 text-xl font-semibold">
                      ₹0.00
                    </h4>
                    <div className="text-red-500 mt-2 text-4xl">
                      <i className="fa fa-money"></i>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane active flex flex-col gap-9"
                  id="activity"
                >
                  <div className="grid gap-5.5">
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-separate border-spacing-0 bg-white dark:bg-boxdark dark:drop-shadow-none">
                        <thead>
                          <tr className="bg-gray-100 text-left">
                            {[
                              "Payslip #",
                              "Month - Year",
                              "Date",
                              "Mode",
                              "Status",
                              "Net Salary",
                              "Action",
                            ].map((header) => (
                              <th
                                key={header}
                                className="border-b border-stroke px-4 py-2 text-sm font-medium text-black dark:text-white"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-stroke">
                            <td className="px-4 py-2">
                              Class 3 - I Installment
                            </td>
                            <td className="px-4 py-2">
                              at the time of Admission
                            </td>
                            <td className="px-4 py-2">30-06-2024</td>
                            <td className="px-4 py-2">
                              <span className="bg-red-200 text-red-800 rounded-full px-2 py-1">
                                Unpaid
                              </span>
                            </td>
                            <td className="px-4 py-2 text-right">
                              10000.00{" "}
                              <span className="text-red-600">+ 0.00</span>
                            </td>

                            <td className="px-4 py-2 text-right">10000.00</td>
                          </tr>
                          {/* Additional rows */}
                          <tr className="border-b border-stroke">
                            <td className="px-4 py-2">
                              Class 3 - I Installment
                            </td>
                            <td className="px-4 py-2">
                              at the time of Admission
                            </td>
                            <td className="px-4 py-2">30-06-2024</td>
                            <td className="px-4 py-2">
                              <span className="bg-red-200 text-red-800 rounded-full px-2 py-1">
                                Unpaid
                              </span>
                            </td>
                            <td className="px-4 py-2 text-right">
                              10000.00{" "}
                              <span className="text-red-600">+ 0.00</span>
                            </td>

                            <td className="px-4 py-2 text-right">10000.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "leaves" && (
              <div className="tab-content mx-auto max-w-screen-2xl">
                <div
                  className="tab-pane active flex flex-col gap-9"
                  id="activity"
                >
                  <div className="grid gap-5.5">
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-separate border-spacing-0 bg-white dark:bg-boxdark dark:drop-shadow-none">
                        <thead>
                          <tr className="bg-gray-100 text-left">
                            {[
                              "Leave Type",
                              "Leave Date",
                              "Date",
                              "Apply Date",
                              "Status",
                              "Action",
                            ].map((header) => (
                              <th
                                key={header}
                                className="border-b border-stroke px-4 py-2 text-sm font-medium text-black dark:text-white"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-stroke">
                            <td className="px-4 py-2">
                              Class 3 - I Installment
                            </td>
                            <td className="px-4 py-2">
                              at the time of Admission
                            </td>
                            <td className="px-4 py-2">30-06-2024</td>
                            <td className="px-4 py-2">
                              <span className="bg-red-200 text-red-800 rounded-full px-2 py-1">
                                Unpaid
                              </span>
                            </td>
                            <td className="px-4 py-2 text-right">
                              10000.00{" "}
                              <span className="text-red-600">+ 0.00</span>
                            </td>

                            <td className="px-4 py-2 text-right">10000.00</td>
                          </tr>
                          {/* Additional rows */}
                          <tr className="border-b border-stroke">
                            <td className="px-4 py-2">
                              Class 3 - I Installment
                            </td>
                            <td className="px-4 py-2">
                              at the time of Admission
                            </td>
                            <td className="px-4 py-2">30-06-2024</td>
                            <td className="px-4 py-2">
                              <span className="bg-red-200 text-red-800 rounded-full px-2 py-1">
                                Unpaid
                              </span>
                            </td>
                            <td className="px-4 py-2 text-right">
                              10000.00{" "}
                              <span className="text-red-600">+ 0.00</span>
                            </td>

                            <td className="px-4 py-2 text-right">10000.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "attendance" && (
              <div className="tab-content mx-auto max-w-screen-2xl">
                <div
                  className="tab-pane active flex flex-col gap-9"
                  id="activity"
                >
                  <div className="flex flex-wrap">
                    <div className="w-full p-2 dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none sm:w-1/2 lg:w-1/4">
                      <div className="rounded-lg bg-white p-4 shadow-lg dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
                        <div className="flex items-center justify-between dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
                          <div>
                            <h5 className="text-gray-500">Total Present</h5>
                            <h4 className="text-gray-800 text-2xl font-bold">
                              0
                            </h4>
                          </div>
                          <div className="icon">
                            <i className="fa fa-check-square-o text-3xl text-green-500"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full p-2 dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none sm:w-1/2 lg:w-1/4">
                      <div className="rounded-lg bg-white p-4 shadow-lg dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
                        <div className="flex items-center justify-between dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
                          <div>
                            <h5 className="text-gray-500">Total Late</h5>
                            <h4 className="text-gray-800 text-2xl font-bold">
                              0
                            </h4>
                          </div>
                          <div className="icon">
                            <i className="fa fa-check-square-o text-3xl text-yellow-500"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full p-2 dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none sm:w-1/2 lg:w-1/4">
                      <div className="rounded-lg bg-white p-4 shadow-lg dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
                        <div className="flex items-center justify-between dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
                          <div>
                            <h5 className="text-gray-500">Total Absent</h5>
                            <h4 className="text-gray-800 text-2xl font-bold">
                              0
                            </h4>
                          </div>
                          <div className="icon">
                            <i className="fa fa-check-square-o text-red-500 text-3xl"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full p-2 dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none sm:w-1/2 lg:w-1/4">
                      <div className="rounded-lg bg-white p-4 shadow-lg dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
                        <div className="flex items-center justify-between dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
                          <div>
                            <h5 className="text-gray-500">Total Half Day</h5>
                            <h4 className="text-gray-800 text-2xl font-bold">
                              0
                            </h4>
                          </div>
                          <div className="icon">
                            <i className="fa fa-check-square-o text-3xl text-orange-500"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full p-2 dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none sm:w-1/2 lg:w-1/4">
                      <div className="rounded-lg bg-white p-4 shadow-lg dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
                        <div className="flex items-center justify-between dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
                          <div>
                            <h5 className="text-gray-500">Total Holiday</h5>
                            <h4 className="text-gray-800 text-2xl font-bold">
                              0
                            </h4>
                          </div>
                          <div className="icon">
                            <i className="fa fa-check-square-o text-3xl text-blue-500"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-5.5">
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-separate border-spacing-0 bg-white dark:bg-boxdark dark:drop-shadow-none">
                        <thead>
                          <tr className="bg-gray-100 text-left">
                            {[
                              "Date | Month",
                              "January",
                              "February",
                              "March",
                              "April",
                              "May",
                              "June",
                              "July",
                              "August",
                              "September",
                              "October",
                              "November",
                              "December",
                            ].map((header) => (
                              <th
                                key={header}
                                className="border-b border-stroke px-4 py-2 text-sm font-medium text-black dark:text-white"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-stroke">
                            <td className="px-4 py-2">
                              Class 3 - I Installment
                            </td>
                            <td className="px-4 py-2">
                              at the time of Admission
                            </td>
                            <td className="px-4 py-2">30-06-2024</td>
                            <td className="px-4 py-2">
                              <span className="bg-red-200 text-red-800 rounded-full px-2 py-1">
                                Unpaid
                              </span>
                            </td>
                            <td className="px-4 py-2 text-right">
                              10000.00{" "}
                              <span className="text-red-600">+ 0.00</span>
                            </td>
                            <td className="px-4 py-2 text-right">00</td>
                            <td className="px-4 py-2 text-right">00</td>
                            <td className="px-4 py-2 text-right">00</td>
                            <td className="px-4 py-2 text-right">00</td>
                            <td className="px-4 py-2 text-right">00</td>
                            <td className="px-4 py-2 text-right">00</td>
                            <td className="px-4 py-2 text-right">00</td>
                            <td className="px-4 py-2 text-right">10000.00</td>
                          </tr>
                          {/* Additional rows */}
                          <tr className="border-b border-stroke">
                            <td className="px-4 py-2">
                              Class 3 - I Installment
                            </td>
                            <td className="px-4 py-2">
                              at the time of Admission
                            </td>
                            <td className="px-4 py-2">30-06-2024</td>
                            <td className="px-4 py-2">
                              <span className="bg-red-200 text-red-800 rounded-full px-2 py-1">
                                Unpaid
                              </span>
                            </td>
                            <td className="px-4 py-2 text-right">
                              10000.00{" "}
                              <span className="text-red-600">+ 0.00</span>
                            </td>
                            <td className="px-4 py-2 text-right">00</td>
                            <td className="px-4 py-2 text-right">00</td>
                            <td className="px-4 py-2 text-right">00</td>
                            <td className="px-4 py-2 text-right">00</td>
                            <td className="px-4 py-2 text-right">00</td>
                            <td className="px-4 py-2 text-right">00</td>
                            <td className="px-4 py-2 text-right">00</td>
                            <td className="px-4 py-2 text-right">10000.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div>
                <div className="tab-content mx-auto max-w-screen-2xl p-4">
                  <div
                    className="tab-pane active flex flex-col gap-9"
                    id="activity"
                  >
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="p-6">
                        <div className="mb-4 flex justify-end">
                          <button
                            onClick={handleButtonClick}
                            className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-600"
                          >
                            {isFormVisible ? "Close Form" : "Upload Documents"}
                          </button>
                        </div>

                        {/* Table */}
                        <table className="min-w-full border-b border-stroke bg-white dark:bg-boxdark dark:drop-shadow-none">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="border-b border-stroke px-4 py-2 text-left text-sm font-medium dark:border-strokedark">
                                Title
                              </th>
                              <th className="border-b border-stroke px-4 py-2 text-left text-sm font-medium dark:border-strokedark">
                                Name
                              </th>
                              <th className="border-b border-stroke px-4 py-2 text-right text-sm font-medium dark:border-strokedark">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td
                                className="text-red-600 py-4 text-center"
                                colSpan={3}
                              >
                                No Record Found
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "timelineh" && (
              <div>
                <div className="tab-content mx-auto max-w-screen-2xl p-4">
                  <div
                    className="tab-pane active flex flex-col gap-9"
                    id="activity"
                  >
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="p-6">
                        <div className="mb-4 flex justify-end">
                          <button
                            onClick={handleButtonClick2}
                            className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-600"
                          >
                            {isFormVisible ? "Close Form" : "Add"}
                          </button>
                        </div>

                        {/* Table */}
                        <table className="mt-6 min-w-full border-b border-stroke bg-white dark:bg-boxdark dark:drop-shadow-none">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="border-b border-stroke px-4 py-2 text-left text-sm font-medium">
                                Title
                              </th>
                              <th className="border-b border-stroke px-4 py-2 text-left text-sm font-medium">
                                Name
                              </th>
                              <th className="border-b border-stroke px-4 py-2 text-right text-sm font-medium">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td
                                className="text-red-600 py-4 text-center"
                                colSpan={3}
                              >
                                No Record Found
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


      <div>
      {/* Sidebar */}
      <aside
        className={`fixed top-17 right-0 w-72 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-50 
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 bg-[#1c2434] text-white flex justify-between items-center">
          <div className="flex items-center">
            <p className="classtap text-lg">Staff</p>
            {/* Close Button */}
            <button
              onClick={handleCloseSidebar}
              className="text-gray-500 hover:text-gray-700 absolute right-4 top-3 text-2xl"
            >
              &times; {/* Close icon */}
            </button>
          </div>
        </div>
     
          <div>
          <div className="w-full overflow-x-auto">
          <div className="flex justify-between border-b border-stroke dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none dark:text-white">
                <ul className="flex items-center h-12">
                  <li
                    className={`mr-4 cursor-pointer px-2 py-2 ${activeTabOne === "admin" ? "border-b-2 border-blue-500" : ""}`}
                    onClick={() => setActiveTabOne("admin")}
                  >
                    Admin
                  </li>
                  <li
                    className={`mr-4 cursor-pointer px-2 py-2 ${activeTabOne === "teacher" ? "border-b-2 border-blue-500" : ""}`}
                    onClick={() => setActiveTabOne("teacher")}
                  >
                    Teacher
                  </li>
                  <li
                    className={`mr-4 cursor-pointer px-2 py-2 ${activeTabOne === "receptionist" ? "border-b-2 border-blue-500" : ""}`}
                    onClick={() => setActiveTabOne("receptionist")}
                  >
                    Receptionist
                  </li>
                  <li
                    className={`mr-4 cursor-pointer px-2 py-2 ${activeTabOne === "librarian" ? "border-b-2 border-blue-500" : ""}`}
                    onClick={() => setActiveTabOne("librarian")}
                  >
                    Librarian
                  </li>
                  <li
                    className={`mr-4 cursor-pointer px-2 py-2 ${activeTabOne === "receptionist" ? "border-b-2 border-blue-500" : ""}`}
                    onClick={() => setActiveTabOne("receptionist")}
                  >
                    Receptionist
                  </li>
                  <li
                    className={`mr-4 cursor-pointer px-2 py-2 ${activeTabOne === "superadmin" ? "border-b-2 border-blue-500" : ""}`}
                    onClick={() => setActiveTabOne("superadmin")}
                  >
                    SuperAdmin
                  </li>
                </ul>  
          </div>

          {activeTabOne === "admin" && (
              <div>
                <div className="tab-content mx-auto max-w-screen-2xl p-4">
                  <div
                    className="tab-pane active flex flex-col gap-9"
                    id="activity"
                  >
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="p-6">
                        <div className="mb-4 flex justify-end">
                          <button
                            onClick={handleButtonClick2}
                            className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-600"
                          >
                            {isFormVisible ? "Close Form" : "Add"}
                          </button>
                        </div>

                        {/* Table */}
                        <table className="mt-6 min-w-full border-b border-stroke bg-white dark:bg-boxdark dark:drop-shadow-none">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="border-b border-stroke px-4 py-2 text-left text-sm font-medium">
                                Title
                              </th>
                              <th className="border-b border-stroke px-4 py-2 text-left text-sm font-medium">
                                Name
                              </th>
                              <th className="border-b border-stroke px-4 py-2 text-right text-sm font-medium">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td
                                className="text-red-600 py-4 text-center"
                                colSpan={3}
                              >
                                No Record Found
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

           {activeTabOne === "teacher" && (
              <div>
                <div className="tab-content mx-auto max-w-screen-2xl p-4">
                  <div className="tab-pane active flex flex-col gap-9" id="activity">
                    
                  </div>
                </div>
              </div>
            )}

           {activeTabOne === "receptionist" && (
              <div>
                <div className="tab-content mx-auto max-w-screen-2xl p-4">
                  <div className="tab-pane active flex flex-col gap-9" id="activity">
                    
                  </div>
                </div>
              </div>
            )}

           {activeTabOne === "librarian" && (
              <div>
                <div className="tab-content mx-auto max-w-screen-2xl p-4">
                  <div className="tab-pane active flex flex-col gap-9" id="activity">
                    
                  </div>
                </div>
              </div>
            )}
        </div>
        </div>
      </aside>
    </div>



    
      {/* Modal */}
      {isFormVisible && (
        <>
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={handleButtonClick}
          ></div>

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-boxdark dark:drop-shadow-none">
              {/* Close Button */}
              <button
                onClick={handleButtonClick}
                className="text-gray-500 hover:text-gray-700 absolute right-2 top-2 text-2xl"
              >
                &times;
              </button>

              {/* Form Content */}
              <h2 className="mb-4 text-lg font-semibold">Upload Documents</h2>
              <form className="rounded-md border border-stroke bg-white p-4 shadow-md dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none">
                <div className="mb-4">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Title:
                  </label>
                  <input
                    aria-invalid="false"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                    type="text"
                    name="title"
                  />
                </div>
                <div className="mb-4">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Document
                  </label>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    name="image"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Modal Popup */}
      {isFormVisible2 && (
        <>
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={handleButtonClick2} // Closes modal when clicking outside
          ></div>

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-boxdark dark:drop-shadow-none">
              {/* Close Button */}
              <button
                onClick={handleButtonClick2}
                className="text-gray-500 hover:text-gray-700 absolute right-2 top-2 text-2xl"
              >
                &times;
              </button>

              {/* Form Content */}
              <h2 className="mb-4 text-lg font-semibold">Add Timeline</h2>
              <form className="rounded-md border border-stroke bg-white p-4 shadow-md dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="field">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Title:
                    </label>
                    <input
                      aria-invalid="false"
                      id="title"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                      type="text"
                      name="title"
                    />
                  </div>

                  <div className="field">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Date <span className="required">*</span>
                    </label>
                    <input
                      id="date"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                      type="text"
                      name="dob"
                    />
                  </div>

                  <div className="field">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Description:
                    </label>
                    <input
                      aria-invalid="false"
                      id="description"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                      type="text"
                      name="description"
                    />
                  </div>
                  <div className="field">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Document
                    </label>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      name="image"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Modal Popup */}
      {passwordModel && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={handlePasswordModel}
          ></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg dark:bg-boxdark dark:drop-shadow-none">
              {/* Close Button */}
              <button
                onClick={handlePasswordModel}
                className="text-gray-500 hover:text-gray-700 absolute right-2 top-2 text-2xl"
              >
                &times;
              </button>

              {/* Modal Header */}
              <h2 className="mb-4 text-center font-black text-[18px] text-[rgb(16,137,211)]">
                Login Details
              </h2>

              {/* Table Content */}
              <>
                <p className="lead mb-4 text-center text-xl font-medium">
                  {formData.firstname} {formData.middlename} {formData.lastname}
                </p>
                {loadingstaffdetails ? (
                  <>
                    {[...Array(2)].map((_, index) => (
                      <table
                        key={index}
                        className="border-gray-200 w-full table-auto border text-sm"
                      >
                        <thead></thead>
                        <tr
                          key={index}
                          className="animate-pulse border-[1.5px] border-t border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        >
                          <td className="px-4 py-2 font-bold">
                            <div className="bg-gray-200 h-4 w-20 rounded"></div>
                          </td>
                          <td className="px-4 py-2 text-center">
                            <div className="bg-gray-200 mx-auto h-4 w-32 rounded"></div>
                          </td>
                          <td className="px-4 py-2 text-center">
                            <div className="bg-gray-200 mx-auto h-4 w-32 rounded"></div>
                          </td>
                        </tr>
                      </table>
                    ))}
                  </>
                ) : (
                  <table className="border-gray-200 w-full table-auto border text-sm ">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700 border-[1.5px] border-stroke bg-transparent px-5 py-3 text-left text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                        <th className="px-4 py-2">User Type</th>
                        <th className="px-4 py-2 text-center">Username</th>
                        <th className="px-4 py-2 text-center">Password</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Student Row */}
                      {staffData && (
                        <tr className="border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                          <td className="px-4 py-2 font-bold">Staff</td>
                          <td className="px-4 py-2 text-center">
                            {staffData.username}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {staffData.password}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}

                <StyledWrapper>
      <div className="container">
        <div className="heading">Change Password</div>
        <form className="form">
          <input required className="input" type="text" name="password" id="password" placeholder="Password " />
          <input required className="input" type="text" name="confirm_password" id="confirm_password" placeholder="Confirm Password" />
         
          <button type="submit" className="login-button"> Save </button>
         
        </form>
      
        <span className="agreement">  Login URL:{" "}  <a
                    href={`${window.location.origin}/login`}
                    className="text-blue-500 underline"
                    target="_blank"
                  >
                    {`${window.location.origin}/login`}
                  </a></span>
      </div>
    </StyledWrapper>
               

                
              </>
            </div>
          </div>
         
        </>
      )}
    </DefaultLayout>
  );
};

export default StudentDetails;
