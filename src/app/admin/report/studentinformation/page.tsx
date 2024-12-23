"use client";
import { useState, useEffect } from "react";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import styles from "./StudentDetails.module.css"; // Import CSS module
import Loader from "@/components/common/Loader";
import {
  fetchsectionByClassData,
  fetchsectionData,
} from "@/services/sectionsService"; // Import your section API service
import { getClasses } from "@/services/classesService"; // Import your classes API service
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import {
    Group as GroupIcon,
    Security as SecurityIcon,
    MenuBook as MenuBookIcon,
    Key as KeyIcon,
    Class as ClassIcon,
    Description as DescriptionIcon,
    PeopleAlt as PeopleAltIcon,
    AccountBox as AccountBoxIcon,
    AssignmentTurnedIn as AssignmentTurnedInIcon,
    Wc as WcIcon,
    Scale as ScaleIcon,
  } from '@mui/icons-material';



const AlumniReport = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [colorMode, setColorMode] = useColorMode();
  const [data, setData] = useState<Array<Array<string>>>([]);
  

 

  return (
    <DefaultLayout>
   <div className="col-md-12">
    <div className="box box-primary border-0 mb-8 bg-white shadow-md rounded-lg dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white">
        <div className="box-header border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="box-title text-2xl font-semibold text-gray-800 flex items-center !text-[1.25rem] !leading-[1.75rem] !font-[Satoshi] !font-semibold">
          <i className="fa fa-search mr-2 text-blue-600"></i> Student Information Report
        </h3>
        </div>
        <div className="p-5">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <li className="col-lg-4 col-md-4 col-sm-6">
        <a href="/admin/student/studentreport" className="flex items-center font-medium hover:text-[#0070f3]">
          <DescriptionIcon className="h-2 w-2 mr-2" /> Student Report
        </a>
      </li>
      <li className="col-lg-4 col-md-4 col-sm-6">
        <a href="/admin/student/guardianreport" className="flex items-center font-medium hover:text-[#0070f3]">
          <DescriptionIcon className="h-2 w-2 mr-2" /> Guardian Report
        </a>
      </li>
      <li className="col-lg-4 col-md-4 col-sm-6">
        <a href="/admin/users/admissionreport" className="flex items-center font-medium hover:text-[#0070f3]">
          <DescriptionIcon className="h-2 w-2 mr-2" /> Student History
        </a>
      </li>
      <li className="col-lg-4 col-md-4 col-sm-6">
        <a href="/admin/users/logindetailreport" className="flex items-center font-medium hover:text-[#0070f3]">
          <DescriptionIcon className="h-2 w-2 mr-2" /> Student Login Credential
        </a>
      </li>
      <li className="col-lg-4 col-md-4 col-sm-6">
        <a href="/admin/report/class_subject" className="flex items-center font-medium hover:text-[#0070f3]">
          <DescriptionIcon className="h-2 w-2 mr-2" /> Class Subject Report
        </a>
      </li>
      <li className="col-lg-4 col-md-4 col-sm-6">
        <a href="/admin/report/admission_report" className="flex items-center font-medium hover:text-[#0070f3]">
          <DescriptionIcon className="h-2 w-2 mr-2" /> Admission Report
        </a>
      </li>
      <li className="col-lg-4 col-md-4 col-sm-6">
        <a href="/admin/report/sibling_report" className="flex items-center font-medium hover:text-[#0070f3]">
          <DescriptionIcon className="h-2 w-2 mr-2" /> Sibling Report
        </a>
      </li>
      <li className="col-lg-4 col-md-4 col-sm-6">
        <a href="/admin/report/student_profile" className="flex items-center font-medium hover:text-[#0070f3]">
          <DescriptionIcon className="h-2 w-2 mr-2" /> Student Profile
        </a>
      </li>
      <li className="col-lg-4 col-md-4 col-sm-6">
        <a href="/admin/homework/evaluation_report" className="flex items-center font-medium hover:text-[#0070f3]">
          <DescriptionIcon className="h-2 w-2 mr-2" /> Homework Evaluation Report
        </a>
      </li>
      <li className="col-lg-4 col-md-4 col-sm-6">
        <a href="/admin/report/boys_girls_ratio" className="flex items-center font-medium hover:text-[#0070f3]">
          <DescriptionIcon className="h-2 w-2 mr-2" /> Student Gender Ratio Report
        </a>
      </li>
      <li className="col-lg-4 col-md-4 col-sm-6">
        <a href="/admin/report/student_teacher_ratio" className="flex items-center font-medium hover:text-[#0070f3]">
          <DescriptionIcon className="h-2 w-2 mr-2"/> Student Teacher Ratio Report
        </a>
      </li>
    </ul>

        </div>
    </div>
</div>


    </DefaultLayout>
  );
};

export default AlumniReport;
