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



const AlumniReport = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [colorMode, setColorMode] = useColorMode();
  const [data, setData] = useState<Array<Array<string>>>([]);

 

  return (
    <DefaultLayout>
   <div className="col-md-12">
    <div className="box box-primary border-0 mb-8 bg-white shadow-md rounded-lg dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white">
        <div className="box-header with-border p-5 border-b">
        <h3 className="box-title text-2xl font-semibold text-gray-800 flex items-center !text-[1.25rem] !leading-[1.75rem] !font-[Satoshi] !font-semibold">
          <i className="fa fa-search mr-2 text-blue-600"></i> Student Information Report
        </h3>
        </div>
        <div className="p-5">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <li className="col-lg-4 col-md-4 col-sm-6">
                    <a href="/student/studentreport" className="block p-4 bg-blue-100 hover:bg-blue-200 rounded-lg shadow-md flex items-center text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                        <i className="fa fa-file-text-o mr-3 text-xl"></i> Student Report
                    </a>
                </li>
                <li className="col-lg-4 col-md-4 col-sm-6">
                    <a href="/student/guardianreport" className="block p-4 bg-blue-100 hover:bg-blue-200 rounded-lg shadow-md flex items-center text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                        <i className="fa fa-file-text-o mr-3 text-xl"></i> Guardian Report
                    </a>
                </li>
                <li className="col-lg-4 col-md-4 col-sm-6">
                    <a href="/admin/users/admissionreport" className="block p-4 bg-blue-100 hover:bg-blue-200 rounded-lg shadow-md flex items-center text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                        <i className="fa fa-file-text-o mr-3 text-xl"></i> Student History
                    </a>
                </li>
                <li className="col-lg-4 col-md-4 col-sm-6">
                    <a href="/admin/users/logindetailreport" className="block p-4 bg-blue-100 hover:bg-blue-200 rounded-lg shadow-md flex items-center text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                        <i className="fa fa-file-text-o mr-3 text-xl"></i> Student Login Credential
                    </a>
                </li>
                <li className="col-lg-4 col-md-4 col-sm-6">
                    <a href="/report/class_subject" className="block p-4 bg-blue-100 hover:bg-blue-200 rounded-lg shadow-md flex items-center text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                        <i className="fa fa-file-text-o mr-3 text-xl"></i> Class Subject Report
                    </a>
                </li>
                <li className="col-lg-4 col-md-4 col-sm-6">
                    <a href="/report/admission_report" className="block p-4 bg-blue-100 hover:bg-blue-200 rounded-lg shadow-md flex items-center text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                        <i className="fa fa-file-text-o mr-3 text-xl"></i> Admission Report
                    </a>
                </li>
                <li className="col-lg-4 col-md-4 col-sm-6">
                    <a href="/report/sibling_report" className="block p-4 bg-blue-100 hover:bg-blue-200 rounded-lg shadow-md flex items-center text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                        <i className="fa fa-file-text-o mr-3 text-xl"></i> Sibling Report
                    </a>
                </li>
                <li className="col-lg-4 col-md-4 col-sm-6">
                    <a href="/report/student_profile" className="block p-4 bg-blue-100 hover:bg-blue-200 rounded-lg shadow-md flex items-center text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                        <i className="fa fa-file-text-o mr-3 text-xl"></i> Student Profile
                    </a>
                </li>
                <li className="col-lg-4 col-md-4 col-sm-6">
                    <a href="/homework/evaluation_report" className="block p-4 bg-blue-100 hover:bg-blue-200 rounded-lg shadow-md flex items-center text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                        <i className="fa fa-file-text-o mr-3 text-xl"></i> Homework Evaluation Report
                    </a>
                </li>
                <li className="col-lg-4 col-md-4 col-sm-6">
                    <a href="/report/boys_girls_ratio" className="block p-4 bg-blue-100 hover:bg-blue-200 rounded-lg shadow-md flex items-center text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                        <i className="fa fa-file-text-o mr-3 text-xl"></i> Student Gender Ratio Report
                    </a>
                </li>
                <li className="col-lg-4 col-md-4 col-sm-6">
                    <a href="/report/student_teacher_ratio" className="block p-4 bg-blue-100 hover:bg-blue-200 rounded-lg shadow-md flex items-center text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                        <i className="fa fa-file-text-o mr-3 text-xl"></i> Student Teacher Ratio Report
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
