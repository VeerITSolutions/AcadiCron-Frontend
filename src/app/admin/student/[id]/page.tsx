"use client"; // Add this at the top of the file
import { useState } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import User from "@/components/User/User";
import Image from "next/image";

const StudentDetails = () => {
  const router = useRouter();
  /* const { id } = useParams(); */

  const [activeTab, setActiveTab] = useState("activity");

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleButtonClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <DefaultLayout>
      <div className="flex flex-wrap">
        {/* Profile Sidebar */}
        <div className="w-full p-2 md:w-1/4">
          <div className="rounded-lg bg-white p-4 shadow-lg dark:bg-boxdark dark:drop-shadow-none">
            <div className="text-center">
              <img
                src="https://erp.erabesa.co.in/uploads/student_images/default_female.jpg"
                alt="User Profile"
                className="mx-auto h-24 w-24 rounded-full"
              />
              <h3 className="mt-2 text-[20px] font-bold">Aarohi Dani</h3>
            </div>

            <ul className="mt-4 list-none border-stroke p-0 dark:border-strokedark">
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Admission No</b> <span className="text-aqua">0698</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Roll Number</b> <span className="text-aqua"></span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Class</b>{" "}
                <span className="text-aqua">Class 2 (2024-25)</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Section</b> <span className="text-aqua">Bright</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>RTE</b> <span className="text-aqua">No</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Gender</b> <span className="text-aqua">Female</span>
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
                className={`mr-6 cursor-pointer px-4 py-2 ${activeTab === "fee" ? "border-b-2 border-blue-500" : ""}`}
                onClick={() => setActiveTab("fee")}
              >
                Fees
              </li>
              <li
                className={`mr-6 cursor-pointer px-4 py-2 ${activeTab === "exam" ? "border-b-2 border-blue-500" : ""}`}
                onClick={() => setActiveTab("exam")}
              >
                Exam
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
                                Admission Date
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 col-md-5 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                05-06-2023
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Date of Birth
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                23-11-2017
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Category
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Open
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Mobile Number
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                9970521533
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Caste
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Brahmin
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Religion
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Hindu
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Email
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white"></td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Place of Birth
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white"></td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Nationality
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white"></td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Mother Tongue
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white"></td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                TC Number
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white"></td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                StudentID CBSE
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
                            {/* <thead>
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-black dark:text-white border-b border-stroke">
              Label
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-black dark:text-white border-b border-stroke">
              Details
            </th>
          </tr>
        </thead> */}
                            <tbody>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Current Address
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  Bhagwan Nagar, Nagpur
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Permanent Address
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
                          Parent / Guardian Details
                        </h3>
                      </div>
                      <div className="grid gap-5.5">
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white dark:bg-boxdark dark:drop-shadow-none">
                            <tbody>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Father Name
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  Sameer Dani
                                </td>
                                <td className="px-6 py-4">
                                  <img
                                    className="h-[100px] w-[100px] rounded-full border border-stroke"
                                    src="https://erp.erabesa.co.in/uploads/student_images/no_image.png"
                                    alt="Profile"
                                  />
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Father Phone
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  9970521533
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Father Occupation
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white"></td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Mother Name
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  Sheetal S. Dani
                                </td>
                                <td className="px-6 py-4">
                                  <img
                                    className="h-[100px] w-[100px] rounded-full border border-stroke"
                                    src="https://erp.erabesa.co.in/uploads/student_images/no_image.png"
                                    alt="Profile"
                                  />
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Mother Phone
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  9922964043
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Mother Occupation
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white"></td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Guardian Name
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  Sameer Dani
                                </td>
                                <td className="px-6 py-4">
                                  <img
                                    className="h-[100px] w-[100px] rounded-full border border-stroke"
                                    src="https://erp.erabesa.co.in/uploads/student_images/no_image.png"
                                    alt="Profile"
                                  />
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Guardian Email
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white"></td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Guardian Relation
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  Father
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Guardian Phone
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  9970521533
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Guardian Occupation
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white"></td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Guardian Address
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
                          Miscellaneous Details
                        </h3>
                      </div>
                      <div className="grid gap-5.5">
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white dark:bg-boxdark dark:drop-shadow-none">
                            <tbody>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Blood Group
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white"></td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Student House
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white"></td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Height
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white"></td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Weight
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white"></td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  As on Date
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  05-07-2023
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Previous School Details
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white"></td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  National Identification Number
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white"></td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Local Identification Number
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white"></td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Bank Account Number
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white"></td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Bank Name
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white"></td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  IFSC Code
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white"></td>
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
            {activeTab === "fee" && (
              <div>
                <div className="tab-content mx-auto max-w-screen-2xl p-4">
                  <div
                    className="tab-pane active flex flex-col gap-9"
                    id="activity"
                  >
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="grid gap-5.5">
                        <div className="overflow-x-auto">
                          <table className="min-w-full border-separate border-spacing-0 bg-white dark:bg-boxdark dark:drop-shadow-none">
                            <thead>
                              <tr className="bg-gray-100 text-left">
                                <th className="col-md-4 col-md-4 col-md-4 border-b border-stroke px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Fees Group
                                </th>
                                <th className="col-md-4 col-md-4 col-md-4 border-b border-stroke px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Fees Code
                                </th>
                                <th className="col-md-4 col-md-4 col-md-4 border-b border-stroke px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Due Date
                                </th>
                                <th className="col-md-4 col-md-4 col-md-4 border-b border-stroke px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Status
                                </th>
                                <th className="col-md-4 col-md-4 col-md-4 border-b border-stroke px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Amount <span>(₹)</span>
                                </th>
                                <th className="col-md-4 col-md-4 col-md-4 border-b border-stroke px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Payment Id
                                </th>
                                <th className="col-md-4 col-md-4 col-md-4 border-b border-stroke px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Mode
                                </th>
                                <th className="col-md-4 col-md-4 col-md-4 border-b border-stroke px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Date
                                </th>
                                <th className="col-md-4 col-md-4 col-md-4 border-b border-stroke px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Discount <span>(₹)</span>
                                </th>
                                <th className="col-md-4 col-md-4 col-md-4 border-b border-stroke px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Fine <span>(₹)</span>
                                </th>
                                <th className="col-md-4 col-md-4 col-md-4 border-b border-stroke px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Paid <span>(₹)</span>
                                </th>
                                <th className="col-md-4 col-md-4 col-md-4 border-b border-stroke px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Balance
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-stroke">
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Class 3 - I Installment
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  at the time of Admission
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  30-06-2024
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 bg-red-100 text-red-800 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  <span className="bg-red-200 rounded-full px-2 py-1">
                                    Unpaid
                                  </span>
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  10000.00{" "}
                                  <span className="text-red-600">+ 0.00</span>
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  10000.00
                                </td>
                              </tr>

                              <tr className="border-b border-stroke">
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Class 3 - II Installment
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Before 30 Aug 2024
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 bg-red-100 text-red-800 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  <span className="bg-red-200 rounded-full px-2 py-1">
                                    Unpaid
                                  </span>
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  10000.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  10000.00
                                </td>
                              </tr>

                              <tr className="border-b border-stroke">
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Class 2- I Installment
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  at the time of Admission
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  30-06-2024
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 bg-red-100 text-red-800 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  <span className="bg-red-200 rounded-full px-2 py-1">
                                    Unpaid
                                  </span>
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  10000.00{" "}
                                  <span className="text-red-600">+ 0.00</span>
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  10000.00
                                </td>
                              </tr>

                              <tr className="border-b border-stroke">
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Class 2- II Installment
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Before 30 Aug 2024
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 bg-red-100 text-red-800 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  <span className="bg-red-200 rounded-full px-2 py-1">
                                    Unpaid
                                  </span>
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  10000.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  10000.00
                                </td>
                              </tr>

                              <tr className="border-b border-stroke">
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Class 2 - III Installment D
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Before 30 Nov 2024
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  30-11-2024
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 bg-red-100 text-red-800 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  <span className="bg-red-200 rounded-full px-2 py-1">
                                    Unpaid
                                  </span>
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  6200.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  6200.00
                                </td>
                              </tr>

                              <tr className="border-b border-stroke">
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Class 2 - IV Installment E
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Before 30 Jan 2025
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  30-01-2025
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 bg-red-100 text-red-800 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  <span className="bg-red-200 rounded-full px-2 py-1">
                                    Unpaid
                                  </span>
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  6200.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  6200.00
                                </td>
                              </tr>

                              <tr className="bg-gray-200 font-bold">
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  Discount
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  dis 200
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-left text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  <a
                                    href="#"
                                    className="text-blue-600 hover:underline"
                                  >
                                    Discount of ₹1000.00 Applied : 33//1
                                  </a>
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                              </tr>

                              <tr className="bg-gray-100 font-bold">
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  {" "}
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  ₹52400.00
                                  <span className="text-red-600"> +0.00</span>
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white"></td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  ₹0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  ₹0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  ₹0.00
                                </td>
                                <td className="col-md-4 col-md-4 col-md-4 px-4 py-2 text-right text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black dark:text-white dark:text-white dark:text-white">
                                  ₹52400.00
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
            {activeTab === "exam" && (
              <div>
                <h2 className="text-xl font-semibold">Exam Results</h2>
                <div className="alert alert-danger">No Record Found</div>
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
                                <h2 className="mb-4 text-lg font-semibold">
                                  Upload Documents
                                </h2>
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
                                      Document:
                                    </label>
                                    <input
                                      className="form-control mt-2 w-full"
                                      type="file"
                                      name="document_file"
                                    />
                                  </div>
                                  <div className="flex justify-end">
                                    <button
                                      type="submit"
                                      className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-600"
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </>
                        )}

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
                            onClick={handleButtonClick}
                            className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-600"
                          >
                            {isFormVisible ? "Close Form" : "Add"}
                          </button>
                        </div>

                        {/* Modal Popup */}
                        {isFormVisible && (
                          <>
                            {/* Modal Overlay */}
                            <div
                              className="fixed inset-0 z-40 bg-black bg-opacity-50"
                              onClick={handleButtonClick} // Closes modal when clicking outside
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
                                <h2 className="mb-4 text-lg font-semibold">
                                  Add Timeline
                                </h2>
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
                                        Document:
                                      </label>
                                      <input
                                        className="form-control mt-2 w-full"
                                        id="document_file"
                                        type="file"
                                        name="document_file"
                                      />
                                    </div>
                                  </div>

                                  <div className="mt-4 flex justify-end">
                                    <button
                                      type="submit"
                                      className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-600"
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </>
                        )}

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
    </DefaultLayout>
  );
};

export default StudentDetails;
