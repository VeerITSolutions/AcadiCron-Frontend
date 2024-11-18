"use client"; // Add this at the top of the file
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import styles from "./MultiClass.module.css"; // Import CSS module
import { fetchStudentDisabledData } from "@/services/studentDisabledService";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import { getClasses } from "@/services/classesService";
import { fetchsectionByClassData } from "@/services/sectionsService";



const columns = [
  "Admission No",
  "Student Name",
  "Class",

  "Category",
  "Mobile Number",
  "Action",
];

const data = [
  ["A12345", "Alice Smith", "10A", "OBC", "+1-555-123-4567", "View"],
  ["B67890", "Bob Johnson", "10B", "General", "+1-555-234-5678", "View"],
  ["C13579", "Charlie Brown", "11A", "SC", "+1-555-345-6789", "View"],
  ["D24680", "Daisy White", "11B", "ST", "+1-555-456-7890", "View"],
  ["A12345", "Alice Smith", "10A", "OBC", "+1-555-123-4567", "View"],
  ["B67890", "Bob Johnson", "10B", "General", "+1-555-234-5678", "View"],
  ["C13579", "Charlie Brown", "11A", "SC", "+1-555-345-6789", "View"],
  ["D24680", "Daisy White", "11B", "ST", "+1-555-456-7890", "View"],

  ["A12345", "Alice Smith", "10A", "OBC", "+1-555-123-4567", "View"],
  ["B67890", "Bob Johnson", "10B", "General", "+1-555-234-5678", "View"],
  ["C13579", "Charlie Brown", "11A", "SC", "+1-555-345-6789", "View"],
  ["D24680", "Daisy White", "11B", "ST", "+1-555-456-7890", "View"],

  ["A12345", "Alice Smith", "10A", "OBC", "+1-555-123-4567", "View"],
  ["B67890", "Bob Johnson", "10B", "General", "+1-555-234-5678", "View"],
  ["C13579", "Charlie Brown", "11A", "SC", "+1-555-345-6789", "View"],
  ["D24680", "Daisy White", "11B", "ST", "+1-555-456-7890", "View"],

  ["A12345", "Alice Smith", "10A", "OBC", "+1-555-123-4567", "View"],
  ["B67890", "Bob Johnson", "10B", "General", "+1-555-234-5678", "View"],
  ["C13579", "Charlie Brown", "11A", "SC", "+1-555-345-6789", "View"],
  ["D24680", "Daisy White", "11B", "ST", "+1-555-456-7890", "View"],

  ["A12345", "Alice Smith", "10A", "OBC", "+1-555-123-4567", "View"],
  ["B67890", "Bob Johnson", "10B", "General", "+1-555-234-5678", "View"],
  ["C13579", "Charlie Brown", "11A", "SC", "+1-555-345-6789", "View"],
  ["D24680", "Daisy White", "11B", "ST", "+1-555-456-7890", "View"],

  ["A12345", "Alice Smith", "10A", "OBC", "+1-555-123-4567", "View"],
  ["B67890", "Bob Johnson", "10B", "General", "+1-555-234-5678", "View"],
  ["C13579", "Charlie Brown", "11A", "SC", "+1-555-345-6789", "View"],
  ["D24680", "Daisy White", "11B", "ST", "+1-555-456-7890", "View"],
];




const options = {
  filterType: "checkbox",
  filter: false, // Disable filter,
  viewColumns: false, // Disable view columns button
};

const StudentDetails = () => {
  const [colorMode, setColorMode] = useColorMode();
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
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();


  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    setPage(0);
  };
  const handleSearch = () => {
    setPage(0); // Reset to first page on search
    fetchData(page, rowsPerPage, selectedClass, selectedSection, keyword);
  };
  
  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
    setPage(0);
  };
  
  const handleRefresh = () => {
    setSelectedClass("");
    setSelectedSection("");
    setKeyword("");
  };
  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.admission_no,
      `${student.firstname.trim()} ${student.lastname.trim()}`,
      student.class || "N/A",
      student.father_name || "N/A",
      "N/A",
      student.gender || "N/A",
      student.mobileno,
    ]);
  };

  useEffect(() => {
    fetchClassesAndSections(); // Fetch classes and sections on initial render
  }, [selectedClass]);
  
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
  


  const fetchData = async (
    currentPage: number,
    rowsPerPage: number,
    selectedClass?: string,
    selectedSection?: string,
    keyword?: string,
  ) => {
    try {
      // Pass selectedClass and selectedSection as parameters to filter data
      const result = await fetchStudentDisabledData(
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

  return (
    <DefaultLayout>
 <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>
            Class:
            <select
              value={selectedClass || ""}
              onChange={handleClassChange}
              className={`${styles.select} dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none`}
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
              className={`${styles.select} dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none`}
              disabled={!selectedClass} // Disable section dropdown if no class is selected
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
            <input
              type="text"
              placeholder="Search By Keyword"
              value={keyword}
              onChange={handleKeywordChange}
              className={`${styles.searchInput} dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none`}
            />
             <button onClick={handleSearch} className={styles.searchButton}>
              Search
            </button>
            <button onClick={handleRefresh} className={styles.searchButton}>
              Reset
            </button>
          </div>
        </div>
        {/*  <div className={styles.searchGroup}>

        </div> */}
      </div>

      <ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
      <MUIDataTable
        title={"Multi Class Student List"}
        data={data}
        columns={columns}
        options={options}
      />
      </ThemeProvider>
    </DefaultLayout>
  );
};

export default StudentDetails;
