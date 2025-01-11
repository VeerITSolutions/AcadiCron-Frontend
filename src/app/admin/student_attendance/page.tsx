"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import { fetchStudentData } from "@/services/studentService";
import styles from "./StudentDetails.module.css"; // Import CSS module
import Loader from "@/components/common/Loader";
import { getClasses } from "@/services/classesService";
import { fetchsectionByClassData } from "@/services/sectionsService";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { useLoginDetails } from "@/store/logoStore";
import { fetchStudentAttendencData } from "@/services/studentAttendence";

const StudentDetails = () => {
  const [data, setData] = useState<Array<Array<string>>>([]);
  const { themType, setThemType } = useGlobalState(); //
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedClass, setSelectedClass] = useState<string | undefined>("1");
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    "1",
  );
  const [keyword, setKeyword] = useState<string>("");
  const getDefaultDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const router = useRouter();
  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [attendancedate, setattendancedate] =
    useState<string>(getDefaultDate());
  const [colorMode, setColorMode] = useColorMode();

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );

  const getselectedSessionId = useLoginDetails(
    (state) => state.selectedSessionId,
  );

  // Function to format the student data, with a default attendance value
  const formatStudentData = (students: any[]) => {
    return students?.map((student: any) => [
      student.admission_no,

      student.roll_no || "N/A",
      `${student.firstname.trim()} ${student.lastname.trim()}`,
      "Present", // Default attendance to "Present"
      student.note || "",
    ]);
  };

  // Define columns, including a custom render for "Attendance"
  const columns = [
    "Admission No",
    "Roll Number",
    "Name",
    {
      name: "Attendance",
      options: {
        customBodyRender: (
          value: string,
          tableMeta: any,
          updateData: (value: string) => void,
        ) => {
          const { rowIndex } = tableMeta;
          const attendance = value || "Present"; // Default value is "Present"
          return (
            <div className="flex gap-2">
              {["Present", "Late", "Absent", "Halfday"].map((status) => (
                <label key={status} className="flex items-center gap-1">
                  <input
                    className="dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none"
                    type="radio"
                    name={`attendance-${rowIndex}`}
                    value={status}
                    checked={attendance === status}
                    onChange={() => updateData(status)} // Update the attendance when radio button is clicked
                  />
                  {status}
                </label>
              ))}
            </div>
          );
        },
      },
    },
    {
      name: "Note",
      options: {
        customBodyRender: (
          value: string,
          tableMeta: any,
          updateData: (value: string) => void,
        ) => {
          const { rowIndex } = tableMeta;
          return (
            <input
              type="text"
              value={value || ""} // Use the note if available or empty string
              onChange={(e) => updateData(e.target.value)} // Update the note when the input changes
              className="w-full rounded border-[1.5px] border-stroke bg-transparent bg-transparent p-1.5 outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:text-white dark:drop-shadow-none dark:focus:border-primary"
            />
          );
        },
      },
    },
  ];

  // Define options for MUIDataTable
  const options = {
    filter: false,
    search: false,
    pagination: false,
    sort: false,
    selectableRows: "none",
    download: false,
    print: false,
    viewColumns: false,
    responsive: "standard",

    customToolbar: () => (
      <div className="flex justify-end gap-2">
        <button
          className="mr-4 rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]"
          onClick={() => console.log("Mark As Holiday clicked")}
        >
          Mark As Holiday
        </button>
        <button
          className="mr-4 rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]"
          onClick={() => console.log("Save Attendance clicked")}
        >
          Save Attendance
        </button>
      </div>
    ),
  };

  // Function to fetch student data
  const fetchData = async (
    currentPage: number,
    rowsPerPage: number,
    selectedClass?: string,
    selectedSection?: string,
    selectedSubjectGroup?: string,
    keyword?: string,
  ) => {
    try {
      const result = await fetchStudentAttendencData(
        selectedClass,
        selectedSection,
        selectedSubjectGroup,
        selectedSessionId,
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

  useEffect(() => {
    fetchData(page, rowsPerPage, selectedClass, selectedSection, keyword);
  }, [page, rowsPerPage, selectedClass, selectedSection, keyword]);
  useEffect(() => {
    setSelectedSessionId(getselectedSessionId);
  }, []);

  useEffect(() => {
    fetchClassesAndSections(); // Fetch classes and sections on initial render
  }, [selectedClass]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    setPage(0); // Reset to first page on search
    fetchData(page, rowsPerPage, selectedClass, selectedSection, keyword);
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    setPage(0);
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
    setPage(0);
  };

  const handleAttendancedateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setattendancedate(event.target.value);
  };

  const handleRefresh = () => {
    setSelectedClass("1");
    setSelectedSection("1");

    setattendancedate(getDefaultDate());
  };

  // Fetch classes and sections from the service
  const fetchClassesAndSections = async () => {
    try {
      const classesResult = await getClasses();
      setClassessData(classesResult.data);

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
                <option key={sec.id} value={sec.id}>
                  {sec.section_name}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.label}>
            Date:
            <input
              type="date"
              value={attendancedate}
              onChange={handleAttendancedateChange}
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            />
          </label>

          <div className={styles.searchGroup}>
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
            title={"Student List"}
            data={data}
            columns={columns}
            options={{
              ...options,

              onChangePage: handlePageChange,
              onChangeRowsPerPage: handleRowsPerPageChange,
            }}
          />
        </ThemeProvider>
      )}
    </DefaultLayout>
  );
};

export default StudentDetails;
