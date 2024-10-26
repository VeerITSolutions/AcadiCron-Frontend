"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { fetchStudentDisabledData } from "@/services/studentDisabledService";
import styles from "./StudentDetails.module.css"; // Import CSS module
import Loader from "@/components/common/Loader";
import { fetchsectionByClassData } from "@/services/sectionsService"; // Import your section API service
import { getClasses } from "@/services/classesService"; // Import your classes API service
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import {
  Edit,
  Delete,
  Visibility,
  AttachMoney,
  ListAlt, // Import List View icon
  Info,    // Import Details View icon
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { Tabs, Tab, Box } from "@mui/material"; // Import Tabs and Tab
import { toast } from "react-toastify";

const columns = [
  "Admission No",
  "Student Name",
  "Class",
  "Father Name",
  "Disable Reason",
  "Gender",
  "Mobile Number",
  "Action",
];

const detailsColumns = [
  "Field",
  "Value",
];

const options = {
  filter: false, // Disable filter
  search: false, // Disable search
  pagination: false, // Disable pagination
  sort: false, // Disable sorting
  selectableRows: "none", // Disable row selection
  download: false, // Disable download button
  print: false, // Disable print button
  viewColumns: false, // Disable view columns button
  responsive: "standard", // Customize responsiveness if needed
};

const StudentDetails = () => {
  const [colorMode] = useColorMode();
  const [data, setData] = useState<Array<Array<string>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(undefined);
  const [selectedSection, setSelectedSection] = useState<string | undefined>(undefined);
  const [keyword, setKeyword] = useState<string>("");
  const [activeTab, setActiveTab] = useState(0); // State for active tab
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null); // Store selected student details
  const router = useRouter();

  const token = localStorage.getItem("authToken") || "";

  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.admission_no,
      `${student.firstname.trim()} ${student.lastname.trim()}`,
      student.class || "N/A",
      student.father_name || "N/A",
      "N/A" || "N/A",
      student.gender || "N/A",
      student.mobileno,
      <div key={student.id}>
        <IconButton onClick={() => handleDelete(student.id)} aria-label="Show">
          <Visibility />
        </IconButton>
        <IconButton onClick={() => handleEdit(student.id)} aria-label="Edit">
          <Edit />
        </IconButton>
        <IconButton onClick={() => handleAddFees(student.id)} aria-label="Add Fee">
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
    router.push(`/admin/student/${id}`);
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/student/edit/${id}`);
  };

  const handleAddFees = (id: number) => {
    router.push(`/admin/student/fees/${id}`);
  };

  const handleViewDetails = (student: any) => {
    setSelectedStudent(student);
    setActiveTab(1); // Switch to details view
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
    setPage(0); 
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
            Class:
            <select
              value={selectedClass || ""}
              onChange={handleClassChange}
              className={`${styles.select} dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark`}
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
              className={`${styles.select} dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark`}
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
            <input
              type="text"
              placeholder="Search By Keyword"
              value={keyword}
              onChange={handleKeywordChange}
              className={`${styles.searchInput} dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark`}
            />
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
        <Box >
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} className="dark:text-white">
            <Tab 
              icon={<ListAlt />} 
              label="List View" 
              iconPosition="start" 
              className="dark:text-white"
            />
            <Tab 
              icon={<Info />} 
              label="Details View" 
              iconPosition="start" 
              className="dark:text-white"
            />
          </Tabs>

      
          {activeTab === 0 && (
            <MUIDataTable
              title={""} 
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
              onRowClick={(rowData) => handleViewDetails(rowData)}
            />
          )}

        
{activeTab === 1 && (
  <Box sx={{ width: '100%' }}>
    {selectedStudent ? (
      <MUIDataTable
        title={"Student Details"} 
        data={[
          ["Admission No", selectedStudent[0]],
          ["Student Name", selectedStudent[1]],
          ["Class", selectedStudent[2]],
          ["Father Name", selectedStudent[3]],
          ["Address", selectedStudent.address || "N/A"], 
          ["Email", selectedStudent.email || "N/A"], 
          ["Disable Reason", "N/A"],
          ["Gender", selectedStudent[5]],
          ["Mobile Number", selectedStudent[6]],
        ]}
        columns={detailsColumns}
        options={{
          filter: false,
          viewColumns: false,
          download: false,
          print: false,
          pagination: false,
        }}
      />
    ) : (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
      
        <p className="dark:text-white">No record found</p>
        </div>
    )}
  </Box>
)}

        </Box>
      </ThemeProvider>
    </DefaultLayout>
  );
};

export default StudentDetails;
