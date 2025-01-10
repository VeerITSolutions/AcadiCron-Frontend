"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import { deleteStudentBluk, fetchStudentData } from "@/services/studentService";
import styles from "./StudentDetails.module.css";
import Loader from "@/components/common/Loader";
import {
  fetchsectionByClassData,
  fetchsectionData,
} from "@/services/sectionsService";
import { getClasses } from "@/services/classesService";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import { useLoginDetails } from "@/store/logoStore";
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
import { usePathname } from "next/navigation"; 
import Link from "next/link";
import { fetchStudentCategoryData } from "@/services/studentCategoryService";

const StudentReport = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState<Array<Array<string>>>([]);
  const { themType, setThemType } = useGlobalState(); //
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [category, setCategory] = useState<Array<any>>([]);
  const [genderData, setGenderData] = useState<Array<any>>([]);
  const [rteData, setRteData] = useState<Array<any>>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();

  const columns = [
    "Section",
    "Admission No",
    "Student Name",
    "Father Name",
    "Date of Birth",
    "Gender",
    "Category",
    "Mobile Number",
    "Local Identification Number",
    "National Identification Number",
    "RTE"
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
    selectableRows: "none",
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

  const handleRowSelectionChange = (
    curRowSelected: { dataIndex: number; index: number }[],
    allRowsSelected: { dataIndex: number; index: number }[],
    rowsSelected: [],
  ) => {
    setSelectedRows(rowsSelected); // Update selected rows
  };
  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.section_name || "N/A",
      student.admission_no,
      `${student.firstname.trim()} ${student.lastname.trim()}`,
      student.father_name || "N/A",
      student.dob || "N/A",
      student.gender || "N/A",
      student.category || "N/A",
      student.mobileno || "N/A",
      student.local_identification_no || "N/A",
      student.national_identification_no || "N/A",
      student.rte || "N/A",
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
      
      const resultCategory = await fetchStudentCategoryData();
      const resultGender = await fetchStudentData();
      const resultRte = await fetchStudentData();
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
        setCategory(resultCategory.data);
        setGenderData(resultGender.data);
        setRteData(resultRte.data);
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
    setCategory([]);
    setGenderData([]);
    setRteData([]);
    setKeyword("");
  };

  const pathname = usePathname(); // Get the current path
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    if (pathname) {
      setActivePath(pathname); // Set the active path
    }
  }, [pathname]);

  // Links for the reports
  const reportLinks = [
    { href: "/admin/student/studentreport", label: "Student Report" },
    { href: "/admin/student/guardianreport", label: "Guardian Report" },
    { href: "/admin/users/admissionreport", label: "Student History" },
    { href: "/admin/users/logindetailreport", label: "Student Login Credential" },
    { href: "/admin/report/class_subject", label: "Class Subject Report" },
    { href: "/admin/report/admission_report", label: "Admission Report" },
    { href: "/admin/report/sibling_report", label: "Sibling Report" },
    { href: "/admin/report/student_profile", label: "Student Profile" },
    { href: "/admin/homework/evaluation_report", label: "Homework Evaluation Report" },
    { href: "/admin/report/boys_girls_ratio", label: "Student Gender Ratio Report" },
    { href: "/admin/report/student_teacher_ratio", label: "Student Teacher Ratio Report" },
  ];

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

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
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {reportLinks.map((link: any) => (
                <li key={link.href} className="col-lg-4 col-md-4 col-sm-6">
                   <Link
          href={link.href}
                 
                    className={`flex items-center font-medium hover:text-[#0070f3] ${
                      activePath === link.href
                        ? "bg-blue-100 dark:bg-blue-800 rounded-md p-2"
                        : "p-2"
                    }`}
                  >
                    <DescriptionIcon className="h-2 w-2 mr-2" />
                    {link.label}
                    </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>


<div className="box box-primary border-0 mb-8 bg-white shadow-md rounded-lg dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white">
      <div className={`${styles.filters} p-5`} >
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
          <label className={styles.label}>
          Category:
            <select
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            >
              <option value="">Select</option>
              {category.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category}
                </option>
              ))}
              
            </select>
          </label>
          <label className={styles.label}>
          Gender:
            <select
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            >
              <option value="">Select</option>
              {[...new Set(genderData.map((gen) => gen.gender))].map((gender) => (
              <option key={gender} value={gender}>
              {gender}
              </option>
              ))}
            </select>
          </label>
          <label className={styles.label}>
          RTE:
            <select
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            >
              <option value="">Select</option>
              {[...new Set(rteData.map((rte) => rte.rte))].map((rte) => (
              <option key={rte} value={rte}>
                {rte}
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
            title={"Student Report 2"}
            data={data}
            columns={columns}
            options={{
              ...options,
              count: totalCount,
              page: page,
              rowsPerPage: rowsPerPage,
              onChangePage: handlePageChange,
              onChangeRowsPerPage: handleRowsPerPageChange,
              onRowSelectionChange: handleRowSelectionChange, // Handle row selection
              onRowsDelete: handleDelete,
            }}
          />
        </ThemeProvider>
      )}
      </div>
    </DefaultLayout>
  );
};

export default StudentReport;
