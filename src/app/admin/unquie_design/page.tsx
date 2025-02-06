"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import {
  deleteStudentBluk,
  fetchStudentCalculateData,
  fetchStudentData,
} from "@/services/studentService";
import styles from "./StudentDetails.module.css"; // Import CSS module
import Loader from "@/components/common/Loader";
import { format } from "date-fns";
import { fetchsectionByClassData } from "@/services/sectionsService"; // Import your section API service
import { getClasses } from "@/services/classesService"; // Import your classes API service
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";

import { useLoginDetails } from "@/store/logoStore";
import { fetchSchSetting } from "@/services/schSetting";
import router from "next/router";
import styled from "styled-components";
const StudentDetails = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [colorMode, setColorMode] = useColorMode();
  const [data, setData] = useState<Array<Array<string>>>([]);
  const [dataSetting, setDataSetting] = useState<string | undefined>(undefined);
  const { themType, setThemType } = useGlobalState(); //
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [keyword, setKeyword] = useState<string>("");
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );
  const [editedData, setEditedData] = useState(data);

  const getselectedSessionId = useLoginDetails(
    (state) => state.selectedSessionId,
  );
  console.log(getselectedSessionId);

  const columns = [
    "Class",
    "Section",
    "Admission No",
    "Student Name",
    "Father Name",
    "Date Of Birth",
    "Phone",
    "Action",
  ];

  const options = {
    filterType: "checkbox",
    serverSide: true,
    pagination: false,
    responsive: "standard",
    search: false,
    selectableRows: "none", // Disable row selection
    filter: false,
    viewColumns: false,
    tableBodyMaxHeight: "500px",
  };

  const handleDelete = async () => {
    try {
      const selectedData = selectedRows.map((rowIndex) => data[rowIndex]); // Map indices to data

      const idsToDelete = selectedData.map((row) => row[0]);

      console.log(idsToDelete); // Handle response

      if (
        window.confirm("Are you sure you want to delete the selected items?")
      ) {
        try {
          const response = await deleteStudentBluk(idsToDelete);
        } catch (error) {
          console.error("Error deleting data:", error);
          alert("Failed to delete selected data.");
        }
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Failed to delete selected data.");
    }
  };
  const router = useRouter();
  const handleRowSelectionChange = (
    curRowSelected: { dataIndex: number; index: number }[],
    allRowsSelected: { dataIndex: number; index: number }[],
    rowsSelected: [],
  ) => {
    setSelectedRows(rowsSelected); // Update selected rows
  };
  const handleAddFees = (id: number) => {
    router.push(`/admin/student/fees/${id}`);
  };
  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.class_name,
      student.section_name,
      student.admission_no,
      `${student.firstname.trim()} ${student.lastname.trim()}`,
      student.father_name || "N/A",
      student.dob || "N/A",

      student.mobileno,
      <div key={student.id} className="flex items-center space-x-2">
        <button
          onClick={() => handleAddFees(student.id)}
          aria-label="Add Fee"
          className="flex flex-nowrap items-center gap-2 whitespace-nowrap rounded bg-[#0070f3] px-2 py-2 font-medium text-white hover:bg-[#005bb5]"
        >
          Collect Fees
        </button>
      </div>,
    ]);
  };

  useEffect(() => {
    setSelectedSessionId(getselectedSessionId);
  }, []);
  const fetchData = async (
    selectedClass?: string,
    selectedSection?: string,
    keyword?: string,
  ) => {
    try {
      setLoading(true);
      // Pass selectedClass and selectedSection as parameters to filter data
      if (selectedClass && selectedSection) {
        const result = await fetchStudentData(
          "",
          "",

          selectedClass,
          selectedSection,
          keyword,
          selectedSessionId,
        );

        const resultSetting = await fetchSchSetting();

        setTotalCount(result.totalCount);
        const formattedData = formatStudentData(result.data);
        setData(formattedData);

        const currentDate = new Date();
        currentDate.setDate(
          currentDate.getDate() + resultSetting.data.fee_due_days,
        );

        // Format the new date as d-m-y
        const formattedDate = `${currentDate.getDate().toString().padStart(2, "0")}-${(currentDate.getMonth() + 1).toString().padStart(2, "0")}-${currentDate.getFullYear()}`;
        setDataSetting(formattedDate);
        setLoading(false);
      } else {
        setData([]);
        setLoading(false);
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchClassesAndSections = async () => {
    try {
      const classesResult = await getClasses();
      setClassessData(classesResult.data);

      // Fetch sections if a class is selected
      if (selectedClass) {
        const sectionsResult = await fetchsectionByClassData(selectedClass);
        setSections(sectionsResult.data);
      } else {
        setSections([]);
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassesAndSections();
  }, [selectedClass]);

  useEffect(() => {
    fetchData(selectedClass, selectedSection, keyword);
  }, [selectedClass, selectedSection, keyword]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    setPage(0);
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
    setPage(0);
  };
  const StyledWrapper = styled.div`
    .button {
      --h-button: 48px;
      --w-button: 102px;
      --round: 0.75rem;
      cursor: pointer;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      transition: all 0.25s ease;
      background: radial-gradient(
          65.28% 65.28% at 50% 100%,
          rgba(223, 113, 255, 0.8) 0%,
          rgba(223, 113, 255, 0) 100%
        ),
        linear-gradient(0deg, #7a5af8, #7a5af8);
      border-radius: var(--round);
      border: none;
      outline: none;
      padding: 12px 18px;
    }
    .button::before,
    .button::after {
      content: "";
      position: absolute;
      inset: var(--space);
      transition: all 0.5s ease-in-out;
      border-radius: calc(var(--round) - var(--space));
      z-index: 0;
    }
    .button::before {
      --space: 1px;
      background: linear-gradient(
        177.95deg,
        rgba(255, 255, 255, 0.19) 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }
    .button::after {
      --space: 2px;
      background: radial-gradient(
          65.28% 65.28% at 50% 100%,
          rgba(223, 113, 255, 0.8) 0%,
          rgba(223, 113, 255, 0) 100%
        ),
        linear-gradient(0deg, #7a5af8, #7a5af8);
    }
    .button:active {
      transform: scale(0.95);
    }

    .fold {
      z-index: 1;
      position: absolute;
      top: 0;
      right: 0;
      height: 1rem;
      width: 1rem;
      display: inline-block;
      transition: all 0.5s ease-in-out;
      background: radial-gradient(
        100% 75% at 55%,
        rgba(223, 113, 255, 0.8) 0%,
        rgba(223, 113, 255, 0) 100%
      );
      box-shadow: 0 0 3px black;
      border-bottom-left-radius: 0.5rem;
      border-top-right-radius: var(--round);
    }
    .fold::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 150%;
      height: 150%;
      transform: rotate(45deg) translateX(0%) translateY(-18px);
      background-color: #e8e8e8;
      pointer-events: none;
    }
    .button:hover .fold {
      margin-top: -1rem;
      margin-right: -1rem;
    }

    .points_wrapper {
      overflow: hidden;
      width: 100%;
      height: 100%;
      pointer-events: none;
      position: absolute;
      z-index: 1;
    }

    .points_wrapper .point {
      bottom: -10px;
      position: absolute;
      animation: floating-points infinite ease-in-out;
      pointer-events: none;
      width: 2px;
      height: 2px;
      background-color: #fff;
      border-radius: 9999px;
    }
    @keyframes floating-points {
      0% {
        transform: translateY(0);
      }
      85% {
        opacity: 0;
      }
      100% {
        transform: translateY(-55px);
        opacity: 0;
      }
    }
    .points_wrapper .point:nth-child(1) {
      left: 10%;
      opacity: 1;
      animation-duration: 2.35s;
      animation-delay: 0.2s;
    }
    .points_wrapper .point:nth-child(2) {
      left: 30%;
      opacity: 0.7;
      animation-duration: 2.5s;
      animation-delay: 0.5s;
    }
    .points_wrapper .point:nth-child(3) {
      left: 25%;
      opacity: 0.8;
      animation-duration: 2.2s;
      animation-delay: 0.1s;
    }
    .points_wrapper .point:nth-child(4) {
      left: 44%;
      opacity: 0.6;
      animation-duration: 2.05s;
    }
    .points_wrapper .point:nth-child(5) {
      left: 50%;
      opacity: 1;
      animation-duration: 1.9s;
    }
    .points_wrapper .point:nth-child(6) {
      left: 75%;
      opacity: 0.5;
      animation-duration: 1.5s;
      animation-delay: 1.5s;
    }
    .points_wrapper .point:nth-child(7) {
      left: 88%;
      opacity: 0.9;
      animation-duration: 2.2s;
      animation-delay: 0.2s;
    }
    .points_wrapper .point:nth-child(8) {
      left: 58%;
      opacity: 0.8;
      animation-duration: 2.25s;
      animation-delay: 0.2s;
    }
    .points_wrapper .point:nth-child(9) {
      left: 98%;
      opacity: 0.6;
      animation-duration: 2.6s;
      animation-delay: 0.1s;
    }
    .points_wrapper .point:nth-child(10) {
      left: 65%;
      opacity: 1;
      animation-duration: 2.5s;
      animation-delay: 0.2s;
    }

    .inner {
      z-index: 2;
      gap: 6px;
      position: relative;
      width: 100%;
      color: white;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 500;
      line-height: 1.5;
      transition: color 0.2s ease-in-out;
    }

    .inner svg.icon {
      width: 18px;
      height: 18px;
      transition: fill 0.1s linear;
    }

    .button:focus svg.icon {
      fill: white;
    }
    .button:hover svg.icon {
      fill: transparent;
      animation:
        dasharray 1s linear forwards,
        filled 0.1s linear forwards 0.95s;
    }
    @keyframes dasharray {
      from {
        stroke-dasharray: 0 0 0 0;
      }
      to {
        stroke-dasharray: 68 68 0 0;
      }
    }
    @keyframes filled {
      to {
        fill: white;
      }
    }
  `;
  const handleSearch = () => {
    setPage(0);
    fetchData(selectedClass, selectedSection, keyword);
  };
  const handleRefresh = () => {
    setSelectedClass("");
    setSelectedSection("");
    setKeyword("");
  };

  // Save changes to API
  const handleSave = async () => {
    try {
      // const response = await axios.post(apiEndpoint, editedData);
      // console.log("Saved successfully:", response.data);
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save changes.");
    }
  };

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <StyledWrapper>
        <button type="button" className="button">
          <span className="fold" />
          <div className="points_wrapper">
            <i className="point" />
            <i className="point" />
            <i className="point" />
            <i className="point" />
            <i className="point" />
            <i className="point" />
            <i className="point" />
            <i className="point" />
            <i className="point" />
            <i className="point" />
          </div>
          <span className="inner">
            <svg
              className="icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            >
              <polyline points="13.18 1.37 13.18 9.64 21.45 9.64 10.82 22.63 10.82 14.36 2.55 14.36 13.18 1.37" />
            </svg>
            Credits
          </span>
        </button>
      </StyledWrapper>
    </DefaultLayout>
  );
};

export default StudentDetails;
