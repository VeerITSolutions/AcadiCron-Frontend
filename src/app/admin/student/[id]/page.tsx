"use client"; // Add this at the top of the file
import { useState } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import User from "@/components/User/User";
import Image from 'next/image';


const student = () => {
  const router = useRouter();
  const { id } = useParams(); // `id` will be

  const [activeTab, setActiveTab] = useState('activity');

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleButtonClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <DefaultLayout>
       <div className="flex flex-wrap">
      {/* Profile Sidebar */}
      <div className="w-full md:w-1/4 p-2">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="text-center">
                <img 
            src="https://erp.erabesa.co.in/uploads/student_images/default_female.jpg" 
            alt="User Profile" 
            className="w-24 h-24 rounded-full mx-auto" 
          />
           <h3 className="text-[20px] font-bold mt-2">Aarohi Dani</h3>

          </div>

          <ul className="list-none p-0 mt-4 border-stroke">
            <li className="flex justify-between border-b py-2 border-stroke">
              <b>Admission No</b> <span className="text-aqua">0698</span>
            </li>
            <li className="flex justify-between border-b py-2 border-stroke">
              <b>Roll Number</b> <span className="text-aqua"></span>
            </li>
            <li className="flex justify-between border-b py-2 border-stroke">
              <b>Class</b> <span className="text-aqua">Class 2 (2024-25)</span>
            </li>
            <li className="flex justify-between border-b py-2 border-stroke">
              <b>Section</b> <span className="text-aqua">Bright</span>
            </li>
            <li className="flex justify-between border-b py-2 border-stroke">
              <b>RTE</b> <span className="text-aqua">No</span>
            </li>
            <li className="flex justify-between border-b py-2 border-stroke">
              <b>Gender</b> <span className="text-aqua">Female</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Profile Content */}
      <div className="w-full md:w-3/4 p-2">
        <div className="bg-white p-4 rounded-lg shadow-lg">
        <ul className="flex border-b mb-4 border-stroke">
  <li
    className={`mr-6 px-4 py-2 cursor-pointer ${activeTab === 'activity' ? 'border-b-2 border-blue-500' : ''}`}
    onClick={() => setActiveTab('activity')}
  >
    Profile
  </li>
  <li
    className={`mr-6 px-4 py-2 cursor-pointer ${activeTab === 'fee' ? 'border-b-2 border-blue-500' : ''}`}
    onClick={() => setActiveTab('fee')}
  >
    Fees
  </li>
  <li
    className={`mr-6 px-4 py-2 cursor-pointer ${activeTab === 'exam' ? 'border-b-2 border-blue-500' : ''}`}
    onClick={() => setActiveTab('exam')}
  >
    Exam
  </li>
  <li
    className={`mr-6 px-4 py-2 cursor-pointer ${activeTab === 'documents' ? 'border-b-2 border-blue-500' : ''}`}
    onClick={() => setActiveTab('documents')}
  >
    Documents
  </li>
  <li
    className={`mr-6 px-4 py-2 cursor-pointer ${activeTab === 'timelineh' ? 'border-b-2 border-blue-500' : ''}`}
    onClick={() => setActiveTab('timelineh')}
  >
    Timeline
  </li>
</ul>


          {/* Tab Content */}
          {activeTab === 'activity' && (
            <div>
              <div className="tab-content mx-auto max-w-screen-2xl p-4">

<div className="tab-pane active flex flex-col gap-9"  id="activity">

  <div className="tshadow mb25 bozero rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

  <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <tbody>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4">
              Admission Date
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white col-md-5">
              05-06-2023
            </td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Date of Birth
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white">
              23-11-2017
            </td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Category
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white">
              Open
            </td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Mobile Number
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white">
              9970521533
            </td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Caste
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white">
              Brahmin
            </td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Religion
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white">
              Hindu
            </td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Email
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Place of Birth
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Nationality
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Mother Tongue
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              TC Number
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              StudentID CBSE
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Student Aadhar
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Last School Attended
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Date of Admission in School Class
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Class in which Pupil Last Studied
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Subject Studied
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Whether Qualified
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Promoted to Class
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Month Upto Pupil Paid Fees
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Total Working Days
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Total Present Days
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Whether NCC Scout
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Games Played Other Activity
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              General Conduct
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Certificate Issue Date
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Reason for Leaving School
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Any Other Remarks
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white">
              Note
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm text-black dark:text-white"></td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>

  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Address</h3>
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
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
              Current Address
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white">
              Bhagwan Nagar, Nagpur
            </td>
          </tr>
          <tr className="border-b border-stroke">
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
        <h3 className="font-medium text-black dark:text-white">Parent / Guardian Details</h3>
      </div>
      <div className="grid gap-5.5">
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-boxdark">
        <tbody>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white col-md-4">
              Father Name
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white col-md-5">
              Sameer Dani
            </td>
            <td className="px-6 py-4">
              <img
                className="w-[100px] h-[100px] rounded-full border border-stroke"
                src="https://erp.erabesa.co.in/uploads/student_images/no_image.png"
                alt="Profile"
              />
            </td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
              Father Phone
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white">
              9970521533
            </td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
              Father Occupation
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
              Mother Name
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white">
              Sheetal S. Dani
            </td>
            <td className="px-6 py-4">
              <img
                className="w-[100px] h-[100px] rounded-full border border-stroke"
                src="https://erp.erabesa.co.in/uploads/student_images/no_image.png"
                alt="Profile"
              />
            </td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
              Mother Phone
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white">
              9922964043
            </td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
              Mother Occupation
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
              Guardian Name
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white">
              Sameer Dani
            </td>
            <td className="px-6 py-4">
              <img
                className="w-[100px] h-[100px] rounded-full border border-stroke"
                src="https://erp.erabesa.co.in/uploads/student_images/no_image.png"
                alt="Profile"
              />
            </td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
              Guardian Email
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
              Guardian Relation
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white">
              Father
            </td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
              Guardian Phone
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white">
              9970521533
            </td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
              Guardian Occupation
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white"></td>
          </tr>
          <tr className="border-b border-stroke">
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
        <h3 className="font-medium text-black dark:text-white">Miscellaneous Details</h3>
      </div>
      <div className="grid gap-5.5">
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <tbody>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white col-md-4">
              Blood Group
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white col-md-5"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white col-md-4">
              Student House
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white col-md-5"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white col-md-4">
              Height
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white col-md-5"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white col-md-4">
              Weight
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white col-md-5"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white col-md-4">
              As on Date
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white col-md-5">
              05-07-2023
            </td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white col-md-4">
              Previous School Details
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white col-md-5"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white col-md-4">
              National Identification Number
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white col-md-5"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white col-md-4">
              Local Identification Number
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white col-md-5"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white col-md-4">
              Bank Account Number
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white col-md-5"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white col-md-4">
              Bank Name
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white col-md-5"></td>
          </tr>
          <tr className="border-b border-stroke">
            <td className="px-6 py-4 text-sm font-medium text-black dark:text-white col-md-4">
              IFSC Code
            </td>
            <td className="px-6 py-4 text-sm text-black dark:text-white col-md-5"></td>
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
          {activeTab === 'fee' && (
            <div>
              <div className="tab-content mx-auto max-w-screen-2xl p-4">
                 <div className="tab-pane active flex flex-col gap-9"  id="activity">
                 <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  
                  <div className="grid gap-5.5">
                  <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-separate border-spacing-0">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 border-b border-stroke">Fees Group</th>
            <th className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 border-b border-stroke">Fees Code</th>
            <th className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 border-b border-stroke">Due Date</th>
            <th className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 border-b border-stroke">Status</th>
            <th className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 border-b border-stroke text-right">Amount <span>(₹)</span></th>
            <th className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 border-b border-stroke">Payment Id</th>
            <th className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 border-b border-stroke">Mode</th>
            <th className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 border-b border-stroke">Date</th>
            <th className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 border-b border-stroke text-right">Discount <span>(₹)</span></th>
            <th className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 border-b border-stroke text-right">Fine <span>(₹)</span></th>
            <th className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 border-b border-stroke text-right">Paid <span>(₹)</span></th>
            <th className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 border-b border-stroke text-right">Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4">Class 3 - I Installment</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4">at the time of Admission</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4">30-06-2024</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 bg-red-100 text-red-800">
              <span className="bg-red-200 px-2 py-1 rounded-full">Unpaid</span>
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">
              10000.00 <span className="text-red-600">+ 0.00</span>
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">10000.00</td>
          </tr>

          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4">Class 3 - II Installment</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4">Before 30 Aug 2024</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 bg-red-100 text-red-800">
              <span className="bg-red-200 px-2 py-1 rounded-full">Unpaid</span>
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">10000.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">10000.00</td>
          </tr>

          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4">Class 2- I Installment</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4">at the time of Admission</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4">30-06-2024</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 bg-red-100 text-red-800">
              <span className="bg-red-200 px-2 py-1 rounded-full">Unpaid</span>
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">
              10000.00 <span className="text-red-600">+ 0.00</span>
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">10000.00</td>
          </tr>

          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4">Class 2- II Installment</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4">Before 30 Aug 2024</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 bg-red-100 text-red-800">
              <span className="bg-red-200 px-2 py-1 rounded-full">Unpaid</span>
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">10000.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">10000.00</td>
          </tr>

          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4">Class 2 - III Installment D</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4">Before 30 Nov 2024</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4">30-11-2024</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 bg-red-100 text-red-800">
              <span className="bg-red-200 px-2 py-1 rounded-full">Unpaid</span>
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">6200.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">6200.00</td>
          </tr>

          <tr className="border-b border-stroke">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4">Class 2 - IV Installment E</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4">Before 30 Jan 2025</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4">30-01-2025</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 bg-red-100 text-red-800">
              <span className="bg-red-200 px-2 py-1 rounded-full">Unpaid</span>
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">6200.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">6200.00</td>
          </tr>

          <tr className="bg-gray-200 font-bold">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4">Discount</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4">dis 200</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-left">
              <a href="#" className="text-blue-600 hover:underline">
                Discount of ₹1000.00 Applied : 33//1
              </a>
            </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
          </tr>

          <tr className="bg-gray-100 font-bold">
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right"> </td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">₹52400.00<span className="text-red-600"> +0.00</span></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4"></td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">₹0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">₹0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">₹0.00</td>
            <td className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right">₹52400.00</td>
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
          {activeTab === 'exam' && (
            <div>
              <h2 className="text-xl font-semibold">Exam Results</h2>
              <div className="alert alert-danger">No Record Found</div>
            </div>
          )}
          {activeTab === 'documents' && (
            <div>
              
              <div className="tab-content mx-auto max-w-screen-2xl p-4">
                 <div className="tab-pane active flex flex-col gap-9"  id="activity">
                 <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                 <div className="p-6">
    
      <div className="flex justify-end mb-4">
        <button
          onClick={handleButtonClick}
          className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          {isFormVisible ? 'Close Form' : 'Upload Documents'}
        </button>
      </div>

    
      {isFormVisible && (
        <div className="mb-6">
          <form className="bg-white p-4 rounded-md shadow-md border border-stroke">
            <h2 className="text-lg font-semibold mb-4">Upload Documents</h2>
            <div className="mb-4">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">Title:</label>
              <input aria-invalid="false" id=":rh:" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" type="text" value="" name="title" />
            </div>
            <div className="mb-4">
            <div className="field"><label className="mb-3 block text-sm font-medium text-black dark:text-white">Document</label><input className="form-control mt-2 w-full undefined" id="document_file" type="file" name="document_file" />
            </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <table className="min-w-full bg-white border-b border-stroke">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-left border-b border-stroke">Title</th>
            <th className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-left border-b border-stroke">Name</th>
            <th className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right border-b border-stroke">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center py-4 text-red-600">No Record Found</td>
          </tr>
        </tbody>
      </table>
    </div>
                  </div>
                  </div>
              </div>
              
            </div>
          )}
          {activeTab === 'timelineh' && (
            <div>
              {/* <h2 className="text-xl font-semibold">Timeline</h2> */}
              <div className="tab-content mx-auto max-w-screen-2xl p-4">
                 <div className="tab-pane active flex flex-col gap-9"  id="activity">
                 <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                 <div className="p-6">
    
      <div className="flex justify-end mb-4">
        <button
          onClick={handleButtonClick}
          className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          {isFormVisible ? 'Close Form' : 'Add'}
        </button>
      </div>

    
      {isFormVisible && (
        <div className="mb-6 ">
         <form className="bg-white p-4 rounded-md shadow-md border border-stroke">
  <h2 className="text-lg font-semibold mb-4">Add Timeline</h2>
  
 
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="field">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">Title:</label>
      <input
        aria-invalid="false"
        id="title"
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        type="text"
        name="title"
      />
    </div>

    <div className="field">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">Date <span className="required">*</span></label>
      <input
        id="date"
        placeholder=""
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        type="text"
        name="dob"
      />
    </div>

    <div className="field">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">Description:</label>
      <input
        aria-invalid="false"
        id="description"
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        type="text"
        name="description"
      />
    </div>

    <div className="field">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">Document:</label>
      <input
        className="form-control mt-2 w-full"
        id="document_file"
        type="file"
        name="document_file"
      />
    </div>
  </div>


  <div className="flex justify-end mt-4">
    <button
      type="submit"
      className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
    >
      Submit
    </button>
  </div>
</form>

        </div>
      )}

      {/* Table */}
      <table className="min-w-full bg-white border-b border-stroke">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-left border-b border-stroke">Title</th>
            <th className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-left border-b border-stroke">Name</th>
            <th className="px-4 py-2 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-sm font-medium text-black dark:text-white col-md-4 text-right border-b border-stroke">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center py-4 text-red-600">No Record Found</td>
          </tr>
        </tbody>
      </table>
    </div>
                  </div>
                  </div>
              </div>
              
              {/* Add timeline content here */}
            </div>
          )}
        </div>
      </div>
    </div>
    </DefaultLayout>
  );
};

export default student;
