"use client"; // Add this at the top of the file
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import User from "@/components/User/User";
import Image from "next/image";
import { fetchStudentSingleData } from "@/services/studentService";
import 'font-awesome/css/font-awesome.min.css';


const StudentDetails = () => {
  const router = useRouter();
  /* const { id } = useParams(); */

  const [activeTab, setActiveTab] = useState("activity");

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormVisible2, setIsFormVisible2] = useState(false);

  const handleButtonClick = () => {
    setIsFormVisible(!isFormVisible);
  };
  const handleButtonClick2 = () => {
    setIsFormVisible2(!isFormVisible2);
  };
  const [formData, setFormData] = useState<Record<string, any>>({
    class_name: "",
    section_name: "",
    parent_id: "",
    admission_no: "",
    roll_no: "",
    admission_date: "",
    firstname: "",
    middlename: "",
    lastname: "",
    rte: "",
    image: "",
    mobileno: "",
    email: "",
    state: "",
    city: "",
    pincode: "",
    religion: "",
    cast: "",
    dob: "",
    gender: "",
    current_address: "",
    permanent_address: "",
    category_id: "",
    route_id: "",
    school_house_id: "",
    blood_group: "",
    vehroute_id: "",
    hostel_room_id: "",
    adhar_no: "",
    samagra_id: "",
    bank_account_no: "",
    bank_name: "",
    ifsc_code: "",
    guardian_is: "",
    father_name: "",
    father_phone: "",
    father_occupation: "",
    mother_name: "",
    mother_phone: "",
    mother_occupation: "",
    guardian_name: "",
    guardian_relation: "",
    guardian_phone: "",
    guardian_occupation: "",
    guardian_address: "",
    guardian_email: "",
    father_pic: "",
    mother_pic: "",
    guardian_pic: "",
    is_active: "",
    previous_school: "",
    height: "",
    weight: "",
    measurement_date: "",
    dis_reason: "",
    note: "",
    dis_note: "",
    app_key: "",
    parent_app_key: "",
    disable_at: "",
    section_id: "",
    notes: "",
    first_title: "",
    first_doc: "",
    second_title: "",
    third_title: "",
    fourth_title: "",
    category_name: "",
    // Add other initial fields as needed
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = window.location.pathname.split("/").pop();
      if (id) {
        const getData = async () => {
          try {
            const data = await fetchStudentSingleData(id);
            console.log("data", data);
            setFormData({
              class_name: data.data.class_name,

              section_name: data.data.section_name,
              parent_id: data.data.parent_id,
              admission_no: data.data.admission_no,
              roll_no: data.data.roll_no,
              admission_date: data.data.admission_date,
              firstname: data.data.firstname,
              middlename: data.data.middlename,
              lastname: data.data.lastname,
              rte: data.data.rte,
              image: data.data.image,
              mobileno: data.data.mobileno,
              email: data.data.email,
              state: data.data.state,
              city: data.data.city,
              pincode: data.data.pincode,
              religion: data.data.religion,
              cast: data.data.cast,
              dob: data.data.dob,
              gender: data.data.gender,
              current_address: data.data.current_address,
              permanent_address: data.data.permanent_address,
              category_id: data.data.category_id,
              route_id: data.data.route_id,
              school_house_id: data.data.school_house_id,
              blood_group: data.data.blood_group,
              vehroute_id: data.data.vehroute_id,
              hostel_room_id: data.data.hostel_room_id,
              adhar_no: data.data.adhar_no,
              samagra_id: data.data.samagra_id,
              bank_account_no: data.data.bank_account_no,
              bank_name: data.data.bank_name,
              ifsc_code: data.data.ifsc_code,
              guardian_is: data.data.guardian_is,
              father_name: data.data.father_name,
              father_phone: data.data.father_phone,
              father_occupation: data.data.father_occupation,
              mother_name: data.data.mother_name,
              mother_phone: data.data.mother_phone,
              mother_occupation: data.data.mother_occupation,
              guardian_name: data.data.guardian_name,
              guardian_relation: data.data.guardian_relation,
              guardian_phone: data.data.guardian_phone,
              guardian_occupation: data.data.guardian_occupation,
              guardian_address: data.data.guardian_address,
              guardian_email: data.data.guardian_email,
              father_pic: data.data.father_pic,
              mother_pic: data.data.mother_pic,
              guardian_pic: data.data.guardian_pic,
              is_active: data.data.is_active,
              previous_school: data.data.previous_school,
              height: data.data.height,
              weight: data.data.weight,
              measurement_date: data.data.measurement_date,
              dis_reason: data.data.dis_reason,
              note: data.data.note,
              dis_note: data.data.dis_note,
              app_key: data.data.app_key,
              parent_app_key: data.data.parent_app_key,
              disable_at: data.data.disable_at,
              section_id: data.data.section_id,
              notes: "", // Add other fields as needed
              first_title: "",
              first_doc: "",
              second_title: "",
              third_title: "",
              fourth_title: "",
              category_name: data.data.category_name,
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
              />
              <h3 className="mt-2 text-[20px] font-bold">
                {formData.firstname} {formData.lastname}
              </h3>
            </div>

            <ul className="mt-4 list-none border-stroke p-0 dark:border-strokedark">
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Staff ID</b>{" "}
                <span className="text-aqua">{formData.admission_no}</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Role</b>{" "}
                <span className="text-aqua"> {formData.roll_no || "N/A"}</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Designation</b>{" "}
                <span className="text-aqua">
                  {formData.class_name} (2024-25)
                </span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Department</b>{" "}
                <span className="text-aqua">{formData.section_name}</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>EPF No</b> <span className="text-aqua">{formData.rte}</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Basic Salary</b>{" "}
                <span className="text-aqua">{formData.gender}</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Contract Type</b>{" "}
                <span className="text-aqua">{formData.gender}</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Work Shift</b>{" "}
                <span className="text-aqua">{formData.gender}</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Location</b>{" "}
                <span className="text-aqua">{formData.gender}</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Date Of Joining</b>{" "}
                <span className="text-aqua">{formData.gender}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Profile Content */}
        <div className="w-full p-2 md:w-3/4">
          <div className="rounded-lg bg-white p-4 shadow-lg dark:bg-boxdark dark:drop-shadow-none">
            <ul className="mb-4 flex border-b border-stroke dark:border-strokedark">
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
                                {formData.Phone}
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                              Emergency Contact Number
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.category_name}
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
                                {formData.mobileno}
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                              Father Name
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.cast}
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                              Mother Name
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.religion}
                              </td>
                            </tr>
                           
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                              Qualification
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white"></td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                              Work Experience
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white"></td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                              Note
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white"></td>
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
                                  {formData.current_address}
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
                                  {formData.father_name}
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.father_phone}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                Bank Name
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.father_phone}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                Bank Branch Name
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.father_occupation}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                Bank Account Number
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.mother_phone}
                                </td>
                              </tr>
                             
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                IFSC Code
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.mother_phone}
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
                                  {formData.blood_group}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                Twitter URL
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.school_house_id}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                Linkedin URL
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.height}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                Instagram URL
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.weight}
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

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-5 dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white">
  {/* Total Net Salary Paid */}
  <div className="flex flex-col items-center bg-white p-2 rounded-lg shadow-md dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white">
    <h5 className="text-sm text-gray-600">Total Net Salary Paid</h5>
    <h4 className="text-xl font-semibold text-gray-900">₹0.00</h4>
    <div className="mt-2 text-4xl text-green-500">
      <i className="fa fa-money"></i>
    </div>
  </div>

  {/* Total Gross Salary */}
  <div className="flex flex-col items-center bg-white p-2 rounded-lg shadow-md dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white">
    <h5 className="text-sm text-gray-600">Total Gross Salary</h5>
    <h4 className="text-xl font-semibold text-gray-900">₹0.00</h4>
    <div className="mt-2 text-4xl text-blue-500">
      <i className="fa fa-money"></i>
    </div>
  </div>

  {/* Total Earning */}
  <div className="flex flex-col items-center bg-white p-2 rounded-lg shadow-md dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white">
    <h5 className="text-sm text-gray-600">Total Earning</h5>
    <h4 className="text-xl font-semibold text-gray-900">₹0.00</h4>
    <div className="mt-2 text-4xl text-yellow-500">
      <i className="fa fa-money"></i>
    </div>
  </div>

  {/* Total Deduction */}
  <div className="flex flex-col items-center bg-white p-2 rounded-lg shadow-md dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white">
    <h5 className="text-sm text-gray-600">Total Deduction</h5>
    <h4 className="text-xl font-semibold text-gray-900">₹0.00</h4>
    <div className="mt-2 text-4xl text-red-500">
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
                <div className="tab-pane active flex flex-col gap-9" id="activity">
               
                
                <div className="flex flex-wrap">
    <div className="w-full sm:w-1/2 lg:w-1/4 p-2 dark:bg-boxdark dark:drop-shadow-none dark:text-white dark:border-strokedark">
        <div className="bg-white shadow-lg rounded-lg p-4 dark:bg-boxdark dark:drop-shadow-none dark:text-white dark:border-strokedark">
            <div className="flex justify-between items-center dark:bg-boxdark dark:drop-shadow-none dark:text-white dark:border-strokedark">
                <div>
                    <h5 className="text-gray-500">Total Present</h5>
                    <h4 className="text-2xl font-bold text-gray-800">0</h4>
                </div>
                <div className="icon">
                    <i className="fa fa-check-square-o text-green-500 text-3xl"></i>
                </div>
            </div>
        </div>
    </div>
    <div className="w-full sm:w-1/2 lg:w-1/4 p-2 dark:bg-boxdark dark:drop-shadow-none dark:text-white dark:border-strokedark">
        <div className="bg-white shadow-lg rounded-lg p-4 dark:bg-boxdark dark:drop-shadow-none dark:text-white dark:border-strokedark">
            <div className="flex justify-between items-center dark:bg-boxdark dark:drop-shadow-none dark:text-white dark:border-strokedark">
                <div>
                    <h5 className="text-gray-500">Total Late</h5>
                    <h4 className="text-2xl font-bold text-gray-800">0</h4>
                </div>
                <div className="icon">
                    <i className="fa fa-check-square-o text-yellow-500 text-3xl"></i>
                </div>
            </div>
        </div>
    </div>
    <div className="w-full sm:w-1/2 lg:w-1/4 p-2 dark:bg-boxdark dark:drop-shadow-none dark:text-white dark:border-strokedark">
        <div className="bg-white shadow-lg rounded-lg p-4 dark:bg-boxdark dark:drop-shadow-none dark:text-white dark:border-strokedark">
            <div className="flex justify-between items-center dark:bg-boxdark dark:drop-shadow-none dark:text-white dark:border-strokedark">
                <div>
                    <h5 className="text-gray-500">Total Absent</h5>
                    <h4 className="text-2xl font-bold text-gray-800">0</h4>
                </div>
                <div className="icon">
                    <i className="fa fa-check-square-o text-red-500 text-3xl"></i>
                </div>
            </div>
        </div>
    </div>
    <div className="w-full sm:w-1/2 lg:w-1/4 p-2 dark:bg-boxdark dark:drop-shadow-none dark:text-white dark:border-strokedark">
        <div className="bg-white shadow-lg rounded-lg p-4 dark:bg-boxdark dark:drop-shadow-none dark:text-white dark:border-strokedark">
            <div className="flex justify-between items-center dark:bg-boxdark dark:drop-shadow-none dark:text-white dark:border-strokedark">
                <div>
                    <h5 className="text-gray-500">Total Half Day</h5>
                    <h4 className="text-2xl font-bold text-gray-800">0</h4>
                </div>
                <div className="icon">
                    <i className="fa fa-check-square-o text-orange-500 text-3xl"></i>
                </div>
            </div>
        </div>
    </div>
    <div className="w-full sm:w-1/2 lg:w-1/4 p-2 dark:bg-boxdark dark:drop-shadow-none dark:text-white dark:border-strokedark">
        <div className="bg-white shadow-lg rounded-lg p-4 dark:bg-boxdark dark:drop-shadow-none dark:text-white dark:border-strokedark">
            <div className="flex justify-between items-center dark:bg-boxdark dark:drop-shadow-none dark:text-white dark:border-strokedark">
                <div>
                    <h5 className="text-gray-500">Total Holiday</h5>
                    <h4 className="text-2xl font-bold text-gray-800">0</h4>
                </div>
                <div className="icon">
                    <i className="fa fa-check-square-o text-blue-500 text-3xl"></i>
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
    </DefaultLayout>
  );
};

export default StudentDetails;
