"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { fetchStudentData } from "@/services/studentService";
import styles from "./StudentDetails.module.css"; // Import CSS module
import Loader from "@/components/common/Loader";
import { getClasses } from "@/services/classesService";
import { fetchsectionByClassData } from "@/services/sectionsService";
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
  "Father Name",
  "Date of Birth",
  "Current Result",
  "Next Session Status",
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
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();

  const token = localStorage.getItem("authToken") || "";

  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.admission_no,
      `${student.firstname.trim()} ${student.lastname.trim()}`,
      student.class || "N/A",
      student.category_id,
      student.mobileno,
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
    fetchData(page, rowsPerPage, selectedClass, selectedSection, keyword);
  }, [page, rowsPerPage, token, selectedClass, selectedSection, keyword]);

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
  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <div className={styles.filters}>
      <div><h6 className="MuiTypography-root MuiTypography-h6 tss-hj53wm-MUIDataTableToolbar-titleText css-2ulfj5-MuiTypography-root"> Select Criteria </h6></div> 
        <div className={styles.filterGroup}>
        <label className={styles.label}>
                        Class:
                     
                      <select
                        value={selectedClass || ""}
                        onChange={handleClassChange}
                        className={styles.select}
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
                        className={styles.select}
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
          
        </div>
        {/*  <div className={styles.searchGroup}>

        </div> */}
      </div>
      <div className={styles.filters}>
     <div><h6 className="MuiTypography-root MuiTypography-h6 tss-hj53wm-MUIDataTableToolbar-titleText css-2ulfj5-MuiTypography-root"> Promote Students In Next Session </h6></div> 
      
        <div className={styles.filterGroup}>
       
        <label className={styles.label}>
        Promote In Session:
            <select
              value={selectedClass || ""}
              onChange={handleClassChange}
              className={styles.select}
            >
              <option value="">Select</option>
              <option value="Class1">2017-18</option>
              <option value="Class2">2018-19</option>
              {/* Add more class options here */}
            </select>
          </label>
      
        <label className={styles.label}>
                        Class:
                     
                      <select
                        value={selectedClass || ""}
                        onChange={handleClassChange}
                        className={styles.select}
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
                        className={styles.select}
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
      <MUIDataTable
        title={" Student List "}
        data={data}
        className={`rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${styles["miui-box-shadow"]}`}
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
    </DefaultLayout>
  );
};

export default StudentDetails;