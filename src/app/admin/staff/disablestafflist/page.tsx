"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { fetchStudentData } from "@/services/studentService";
import styles from "./StudentDetails.module.css"; // Import CSS module
import Loader from "@/components/common/Loader";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import {
  fetchsectionByClassData,
  fetchsectionData,
} from "@/services/sectionsService"; // Import your section API service
import { getClasses } from "@/services/classesService"; // Import your classes API service

import {
  Edit,
  Delete,
  Visibility,
  TextFields,
  AttachMoney,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";

const columns = [
  "Admission No",
  "Student Name",
  "Class",
  "Category",
  "Mobile Number",
  "Action",
];

const options = {
  filterType: "checkbox",
  serverSide: true,
  responsive: "standard",
  filter: false, // Disable filter,
  viewColumns: false, // Disable view columns button
};

const StudentDetails = () => {
  const [data, setData] = useState<Array<Array<string>>>([]);
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
  const [colorMode, setColorMode] = useColorMode();
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();

  const token = localStorage.getItem("authToken") || "";

  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.admission_no,
      `${student.firstname.trim()} ${student.lastname.trim()}`,
      student.class_name || "N/A",
      student.category_id,
      student.mobileno,
      <div key={student.id}>
        <IconButton onClick={() => handleDelete(student.id)} aria-label="Show">
          <Visibility />
        </IconButton>
        <IconButton onClick={() => handleEdit(student.id)} aria-label="Edit">
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => handleAddFees(student.id)}
          aria-label="Add Fee"
        >
          <AttachMoney />
        </IconButton>
      </div>,
    ]);
  };

  const fetchData = async (
    currentPage: number,
    rowsPerPage: number,
    selectedClass?: string,
    selectedSection?: string,
    keyword?: string,
  ) => {
    try {
      // Pass selectedClass and selectedSection as parameters to filter data
      const result = await fetchStudentData(
        currentPage + 1,
        rowsPerPage,
        selectedClass,
        selectedSection,
        keyword,
      );
      setTotalCount(result.totalCount);
      const formattedData = formatStudentData(result.data);
      setData(formattedData);
      setLoading(false);
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
        setSections([]); // Clear sections if no class is selected
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    // Assuming id is the student_id
    router.push(`/admin/student/${id}`);
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/student/edit/${id}`);
  };

  const handleAddFees = (id: number) => {
    router.push(`/admin/student/fees/${id}`);
  };

  useEffect(() => {
    fetchClassesAndSections(); // Fetch classes and sections on initial render
  }, [selectedClass]);

  useEffect(() => {
    fetchData(page, rowsPerPage, selectedClass, selectedSection, keyword);
  }, [page, rowsPerPage, selectedClass, selectedSection, keyword]);

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

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    setPage(0); // Reset to first page on search
    fetchData(page, rowsPerPage, selectedClass, selectedSection, keyword);
  };
  const handleRefresh = () => {
    setSelectedClass("");
    setSelectedSection("");
    setKeyword("");
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>
            Role:
            <select
              value={selectedClass || ""}
              onChange={handleClassChange}
              className={`${styles.select} dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark`}
            >
              <option value="">Select</option>
              <option value="1">Admin</option>
              <option value="2">Teacher</option>
              <option value="3">Accountant</option>
              <option value="4">Librarian</option>
              <option value="6">Receptionist</option>
              <option value="7">Super Admin</option>
            </select>
          </label>

          <div className={styles.searchGroup}>
            <label className={styles.label}>
              Search By Keyword
              <input
                type="text"
                placeholder="Search By Student Name, Roll Number, Enroll Number, National Id, Local Id Etc."
                value={keyword}
                onChange={handleKeywordChange}
               
                className={`${styles.searchInput} dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark`}
              />
            </label>
            <button onClick={handleSearch} className={styles.searchButton}>
              Search
            </button>
            <button onClick={handleRefresh} className={styles.searchButton}>
              Reset
            </button>
          </div>
        </div>
      </div>
      <ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
      <MUIDataTable
        title={"Student Details"}
        data={data}
        columns={columns}
        options={{
          ...options,
          count: totalCount,
          page: page,
          rowsPerPage: rowsPerPage,
          onChangePage: handlePageChange,
          onChangeRowsPerPage: handleRowsPerPageChange,
        }}
      />
      </ThemeProvider>
    </DefaultLayout>
  );
};

export default StudentDetails;
