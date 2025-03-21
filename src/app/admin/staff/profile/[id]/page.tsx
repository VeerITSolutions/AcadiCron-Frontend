"use client"; // Add this at the top of the file
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import User from "@/components/User/User";
import Image from "next/image";
import styled from "styled-components";
import { toast } from "react-toastify";
import {
  createStaffDisable,
  fetchStaffLoginDetails,
  fetchStaffSingleData,
  createStaffPasswordChange,
  fetchStaffData,
} from "@/services/staffService";
import { useLoginDetails } from "@/store/logoStore";
import {
  ArrowDropUpTwoTone,
  AttachMoney,
  Edit,
  Key,
  ThumbDown,
  ThumbUp,
  Visibility,
} from "@mui/icons-material";
import { fetchRoleData } from "@/services/roleService";
/* import 'font-awesome/css/font-awesome.min.css'; */

const StaffDetails = () => {
  const router = useRouter();
  /* const { id } = useParams(); */
  const getselectedSessionId = useLoginDetails(
    (state) => state.selectedSessionId,
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roleResult, setRoleResult] = useState(null);
  const [roledata, setRoleData] = useState<Array<Array<string>>>([]);
  const [activeTab, setActiveTab] = useState("activity");
  const [activeTabOne, setActiveTabOne] = useState("admin");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormVisible2, setIsFormVisible2] = useState(false);
  const [passwordModel, setIsPasswordModel] = useState(false);
  const [getactivestatus, setIsgetactivestatus] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingstaffdetails, setloadingstaffdetails] = useState(true);
  const [setisdisablestudentmodel, setIsDisableStudentModel] = useState(false);
  const [partentdata, setParentData] = useState<any>(null);
  const [staffData, setStaffData] = useState<any>(null);
  const [getId, setgetId] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [success, setSuccess] = useState("");

  const [data2, setData2] = useState<Array<Array<string>>>([]);
  const handleButtonClick = () => {
    setIsFormVisible(!isFormVisible);
  };
  const handleButtonClick2 = () => {
    setIsFormVisible2(!isFormVisible2);
  };
  const [formDataDisable, setFormDataDisable] = useState<Record<string, any>>({
    id: getId,
    date: new Date().toISOString().split("T")[0],
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
      console.log("id", id);
      if (id) {
        console.log("here");
        const getData = async () => {
          try {
            const data = await fetchStaffSingleData(id);
            console.log("data", data);

            if (data && data.data) {
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
              setIsgetactivestatus(data.data.is_active);
            }
          } catch (error) {
            console.error("Error fetching staff data:", error);
          }
        };
        getData();
      }
    }
  }, []); // No dependencies needed for initial fetch

  const fetchData = async () => {
    try {
      const roleresult = await fetchRoleData();
      setRoleData(roleresult.data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (activeTabOne) {
      const getSidebarData = async () => {
        try {
          const responsedata2 = await fetchStaffData(
            "",
            "",
            "",
            "",
            "",
            getselectedSessionId,
          );
          setData2(responsedata2.data);
        } catch (error) {
          console.error("Error fetching sidebar data:", error);
        }
      };
      getSidebarData();
    }
  }, [activeTabOne, getselectedSessionId]); // Dependencies updated for sidebar data

  console.log("formdata", formData);
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

  const handleDisableStaffModel = () => {
    setFormDataDisable({
      id: getId,
      date: new Date().toISOString().split("T")[0],
    });
    setIsDisableStudentModel(!setisdisablestudentmodel);
  };
  const getselectedUserData = useLoginDetails((state) => state.userData);

  const handleDisableInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormDataDisable((prevData) => ({
      ...prevData,
      [name]: value, // For regular inputs like text or selects
    }));
  };

  const handleSaveDisableStaff = async () => {
    try {
      setLoading(true);
      let id = window.location.pathname.split("/").pop();
      const data = {
        ...formDataDisable,
        id,
        status: 0,
      };

      const response2 = await createStaffDisable(data);

      if (response2.success) {
        setFormDataDisable({
          id,
          date: new Date().toISOString().split("T")[0],
        });

        if (typeof window !== "undefined") {
          const id = window.location.pathname.split("/").pop();
          if (id) {
            const getData = async () => {
              try {
                setLoading(true);
                const data = await fetchStaffSingleData(id);
                setgetId(data.data.id);
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

                setIsgetactivestatus(data.data.is_active);

                setLoading(false);
              } catch (error) {
                console.error("Error fetching staff data:", error);
              }
            };
            getData();
          }
        }
        if (response2.message == "Staff disabled successfully.") {
          handleDisableStaffModel();
        } else {
        }
        toast.success(response2.message);
      } else {
        toast.error("Error Add data");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEnableStaff = async () => {
    try {
      setLoading(true);
      let id = window.location.pathname.split("/").pop();
      const data = {
        ...formDataDisable,
        id,
        status: 1,
      };

      const response2 = await createStaffDisable(data);

      if (response2.success) {
        setFormDataDisable({
          id,
          date: new Date().toISOString().split("T")[0],
        });

        if (typeof window !== "undefined") {
          const id = window.location.pathname.split("/").pop();
          if (id) {
            const getData = async () => {
              try {
                setLoading(true);
                const data = await fetchStaffSingleData(id);
                setgetId(data.data.id);
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

                setIsgetactivestatus(data.data.is_active);

                setLoading(false);
              } catch (error) {
                console.error("Error fetching staff data:", error);
              }
            };
            getData();
          }
        }

        toast.success(response2.message);
      } else {
        toast.error("Error Add data");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    const roleData = async () => {
      try {
        const resultTab = await fetchRoleData(); // make sure this function is defined and imported
        return resultTab;
      } catch (error) {
        console.error("Error fetching role data:", error);
        return null;
      }
    };

    if (activeTabOne === "admin") {
      roleData();
    }
  }, [activeTabOne]);

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "password") {
      setPassword(value);
    } else if (name === "confirm_password") {
      setConfirmPassword(value);
    }

    // Check if passwords match
    if (name === "confirm_password" || name === "password") {
      if (
        value &&
        (name === "password" ? confirmPassword : password) &&
        value !== (name === "password" ? confirmPassword : password)
      ) {
        setError("Passwords do not match");
      } else {
        setError("");
      }
    }
  };

  const handleChangePasswordSubmit = async () => {
    try {
      setLoading(true);
      let id = window.location.pathname.split("/").pop();
      const response = await createStaffPasswordChange({
        id,
        password,
        confirm_password: confirmPassword,
      });
      if (response.status === 200) {
        handlePasswordModel();
        setPassword("");
        setConfirmPassword("");
        toast.success("Password changed successfully");
      } else {
        toast.error("Error updating password");
      }
    } catch (error: any) {
      setError(error.message);
      toast.error("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-wrap">
        {/* Profile Sidebar */}
        <div className="w-full p-2 md:w-1/4">
          <div
            className={`rounded-lg p-4 shadow-lg dark:bg-boxdark dark:drop-shadow-none ${
              Number(getactivestatus) === 0 ? "bg-[#f0dddd]" : "bg-white"
            }`}
          >
            <div className="text-center">
              <Image
                src={imageUrl || defaultImage}
                alt="Staff Profile"
                width={200}
                height={200}
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
              <div className="mb-4 flex">
                <ul className="flex border-b border-stroke dark:border-strokedark">
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

                {Number(getactivestatus) === 0 ? (
                  <ul className="flex border-b border-stroke dark:border-strokedark">
                    <li className="cursor-pointer px-4 py-2">
                      <ThumbUp
                        onClick={handleSaveEnableStaff}
                        className="cursor-pointer text-green-500"
                      />
                    </li>
                  </ul>
                ) : (
                  <ul className="flex border-b border-stroke dark:border-strokedark">
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
                    <li className="cursor-pointer px-4 py-2">
                      <span
                        className="fill-red-500 cursor-pointer"
                        onClick={handleDisableStaffModel}
                      >
                        <ThumbDown />
                      </span>
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
          className={`fixed right-0 top-17 z-50 h-full w-72 bg-white shadow-lg transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between bg-[#1c2434] p-4 text-white">
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

          <div className="">
            <div className="w-full overflow-x-auto">
              <div className="flex justify-between border-b border-stroke dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
                <ul className="flex h-12 items-center">
                  {roledata.map((role: any) => (
                    <li
                      key={role.id}
                      className={`mr-4 cursor-pointer px-2 py-2 ${
                        activeTabOne === role.name.toLowerCase()
                          ? "border-b-2 border-blue-500"
                          : ""
                      }`}
                      onClick={() => {
                        console.log("Clicked Role:", role.name); // Debugging
                        setActiveTabOne(role.name.toLowerCase());
                      }}
                    >
                      {role.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {activeTabOne === "admin" && (
              <div className="tab-content mx-auto max-w-screen-2xl p-4">
                <div
                  className="tab-pane active flex flex-col gap-9"
                  id="activity"
                >
                  <div className="rounded-sm bg-white shadow-default">
                    {data2.map((cls: any) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.id}
                      </option>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTabOne === "receptionist" && (
              <div>
                <div className="tab-content mx-auto max-w-screen-2xl p-4">
                  <div
                    className="tab-pane active flex flex-col gap-9"
                    id="activity"
                  >
                    <h2>Receptionist List</h2>
                  </div>
                </div>
              </div>
            )}

            {activeTabOne === "librarian" && (
              <div>
                <div className="tab-content mx-auto max-w-screen-2xl p-4">
                  <div
                    className="tab-pane active flex flex-col gap-9"
                    id="activity"
                  >
                    <h2>Librarian List</h2>
                  </div>
                </div>
              </div>
            )}
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
          <div className="fixed inset-0 z-50 mt-20 flex items-center justify-center">
            <div className="relative w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg dark:bg-boxdark dark:drop-shadow-none">
              {/* Close Button */}
              <button
                onClick={handlePasswordModel}
                className="text-gray-500 hover:text-gray-700 absolute right-2 top-2 text-2xl"
              >
                &times;
              </button>

              {/* Modal Header */}
              {/* <h2 className="mb-4 text-center font-black text-[18px] text-[rgb(16,137,211)]">
                Login Details
              </h2> */}

              {/* Table Content */}
              <>
                <p className="lead mb-4 text-center text-xl font-medium">
                  {formData.name} {formData.surname}
                </p>
                {loadingstaffdetails ? (
                  <>
                    {/* {[...Array(2)].map((_, index) => (
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
                    ))} */}
                  </>
                ) : (
                  <table className="border-gray-200 w-full table-auto border text-sm ">
                    {/* <thead>
                      <tr className="bg-gray-100 text-gray-700 border-[1.5px] border-stroke bg-transparent px-5 py-3 text-left text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                        <th className="px-4 py-2">User Type</th>
                        <th className="px-4 py-2 text-center">Username</th>
                        <th className="px-4 py-2 text-center">Password</th>
                      </tr>
                    </thead> */}
                    <tbody>
                      {/* Student Row */}
                      {/* {staffData && (
                        <tr className="border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                          <td className="px-4 py-2 font-bold">Staff</td>
                          <td className="px-4 py-2 text-center">
                            {staffData.username}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {staffData.password}
                          </td>
                        </tr>
                      )} */}
                    </tbody>
                  </table>
                )}

                <div className="mt-2 grid grid-cols-1 gap-4">
                  <h2 className="mb-2 text-[18px] font-black text-[rgb(16,137,211)]">
                    Change password
                  </h2>

                  <div className="field">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Password: <span className="required">*</span>
                    </label>
                    <input
                      id="password"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChangePassword}
                    />
                  </div>

                  <div className="field">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Confirm Password: <span className="required">*</span>
                    </label>
                    <input
                      id="confirm_password"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                      type="password"
                      name="confirm_password"
                      value={confirmPassword}
                      onChange={handleChangePassword}
                    />
                  </div>

                  {error && <p style={{ color: "red" }}>{error}</p>}

                  <span className="agreement">
                    Login URL:{" "}
                    <a
                      href={`${window.location.origin}/login`}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`${window.location.origin}/login`}
                    </a>
                  </span>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                      disabled={!password || !confirmPassword}
                      onClick={handleChangePasswordSubmit}
                    >
                      Save
                    </button>
                  </div>
                </div>

                {/* <StyledWrapper>
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
    </StyledWrapper> */}
              </>
            </div>
          </div>
        </>
      )}

      {setisdisablestudentmodel && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={handleDisableStaffModel}
          ></div>

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-boxdark dark:drop-shadow-none">
              <button
                onClick={handleDisableStaffModel}
                className="text-gray-500 hover:text-gray-700 absolute right-2 top-2 text-2xl"
              >
                &times;
              </button>

              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-boxdark dark:drop-shadow-none">
                  {/* Close Button */}
                  <button
                    onClick={handleDisableStaffModel}
                    className="text-gray-500 hover:text-gray-700 absolute right-2 top-2 text-2xl"
                  >
                    &times;
                  </button>
                  <h2 className="mb-4 text-lg font-semibold">Disable Staff</h2>

                  <div className="grid grid-cols-1 gap-4 ">
                    <div className="field">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Date: <span className="required">*</span>
                      </label>

                      <input
                        aria-invalid="false"
                        id="date"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                        type="date"
                        name="date"
                        value={
                          formDataDisable.date ||
                          new Date().toISOString().split("T")[0]
                        } // Default to today's date
                        onChange={handleDisableInputChange}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveDisableStaff}
                      className="rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DefaultLayout>
  );
};

export default StaffDetails;
