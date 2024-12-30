"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import { deleteStudentBluk, fetchStudentData } from "@/services/studentService";
import styles from "./StudentDetails.module.css"; // Import CSS module
import Loader from "@/components/common/Loader";
import {
  fetchsectionByClassData,
  fetchsectionData,
} from "@/services/sectionsService"; // Import your section API service
import { getClasses } from "@/services/classesService"; // Import your classes API service
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
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
import { useLoginDetails } from "@/store/logoStore";
import { viewCertificate } from "@/services/certificateService";

const columns = [
  "Student Id",
  "Admission No",
  "Student Name",
  "Class",
  "Date Of Birth",
  "Gender",
  "Category",
  "Mobile Number",
];

const options = {
  filterType: "checkbox",
  serverSide: true,
  pagination: false,
  responsive: "standard",
  search: false,
  filter: false,
  viewColumns: false,
  tableBodyMaxHeight: "500px",
};

const StudentDetails = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [colorMode, setColorMode] = useColorMode();
  const [data, setData] = useState<Array<Array<string>>>([]);
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
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const selectedData = selectedRows.map((rowIndex) => data[rowIndex]); // Map indices to data
      const idsToDelete = selectedData.map((row) => row[0]);

      const result = await viewCertificate(81);
      console.log(result.data);
      if (result.data) {
        const newTab = window.open();
        if (newTab) {
          newTab.document.write(result.data);
          newTab.document.close(); // Close the document to render the content
        }
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Failed to delete selected data.");
    }
  };

  const handleRowSelectionChange = (
    curRowSelected: { dataIndex: number; index: number }[],
    allRowsSelected: { dataIndex: number; index: number }[],
    rowsSelected: [],
  ) => {
    setSelectedRows(rowsSelected); // Update selected rows
  };
  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.id,
      student.admission_no,
      `${student.firstname.trim()} ${student.lastname.trim()}`,
      student.class_name || "N/A",
      student.dob || "N/A",
      student.gender || "N/A",
      student.category_id,
      student.mobileno,
    ]);
  };
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );

  const getselectedSessionId = useLoginDetails(
    (state) => state.selectedSessionId,
  );
  useEffect(() => {
    setSelectedSessionId(getselectedSessionId);
  }, []);
  const fetchData = async (
    selectedClass?: string,
    selectedSection?: string,
    keyword?: string,
  ) => {
    try {
      // Pass selectedClass and selectedSection as parameters to filter data
      if (selectedClass && selectedSection) {
        const result = await fetchStudentData(
          0,
          0,
          selectedClass,
          selectedSection,
          keyword,
          selectedSessionId,
          1,
        );
        setTotalCount(result.totalCount);
        const formattedData = formatStudentData(result.data);
        setData(formattedData);
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

  const handleSearch = () => {
    setPage(0);
    fetchData(selectedClass, selectedSection, keyword);
  };
  const handleRefresh = () => {
    setSelectedClass("");
    setSelectedSection("");
    setKeyword("");
  };

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>
            Class:
            <select
              value={selectedClass || ""}
              onChange={handleClassChange}
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            >
              <option value="">Select</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.class}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.label}>
            Section:
            <select
              value={selectedSection || ""}
              onChange={handleSectionChange}
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              disabled={!selectedClass}
            >
              <option value="">Select</option>
              {section.map((sec) => (
                <option key={sec.section_id} value={sec.section_id}>
                  {sec.section_name}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.searchGroup}>
            <button onClick={handleSearch} className={styles.searchButton}>
              Search
            </button>
            <button onClick={handleRefresh} className={styles.searchButton}>
              Reset
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
          <MUIDataTable
            title={"Generate Certificate"}
            data={data}
            columns={columns}
            options={{
              ...options,
              count: totalCount,
              page: page,
              rowsPerPage: rowsPerPage,
              onChangePage: handlePageChange,
              onChangeRowsPerPage: handleRowsPerPageChange,
              onRowSelectionChange: handleRowSelectionChange,
              selectableRows: "multiple",
              onRowsDelete: handleDelete,
            }}
          />
        </ThemeProvider>
      )}
    </DefaultLayout>
  );
};

export default StudentDetails;
