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
} from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { useLoginDetails } from "@/store/logoStore";

const HumanResourceReport = () => {
  const [data, setData] = useState<Array<Array<string>>>([]);
  const { themType, setThemType } = useGlobalState(); //
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedClass, setSelectedClass] = useState<string | undefined>("1");
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [colorMode, setColorMode] = useColorMode();

  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();

  const columns = [
    "Staff ID",
    "Role",
    "Designation",
    "Department",
    "Name",
    "Father Name",
    "Mother Name",
    "Email",
    "Gender",
    "Date of Birth",
    "Date Of Joining",
    "Phone",
    "Emergency Contact Number",
    "Marital Status",
    "Current Address",
    "Permanent Address",
    "Qualification",
    "Work Experience",
    "Note",
    "EPF No",
    "Basic Salary",
    "Contract Type",
    "Work Shift",
    "Location",
    "Leaves",
    "Account Title",
    "Bank Account Number",
    "Bank Name",
    "IFSC Code",
    "Bank Branch Name",
    "Social Media Link",
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

  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.staff_id || "N/A",
      `${student.firstname.trim()} ${student.lastname.trim()}`,
      student.role || "N/A",
      student.designation || "N/A",
      student.department || "N/A",
      student.father_name || "N/A",
      student.mother_name || "N/A",
      student.email || "N/A",
      student.gender || "N/A",
      student.date_of_birth || "N/A",
      student.date_of_joining || "N/A",
      student.phone || "N/A",
      student.emergency_contact || "N/A",
      student.marital_status || "N/A",
      student.current_address || "N/A",
      student.permanent_address || "N/A",
      student.qualification || "N/A",
      student.work_experience || "N/A",
      student.note || "N/A",
      student.epf_no || "N/A",
      student.basic_salary || "N/A",
      student.contract_type || "N/A",
      student.work_shift || "N/A",
      student.location || "N/A",
      student.leaves || "N/A",
      student.account_title || "N/A",
      student.bank_account_number || "N/A",
      student.bank_name || "N/A",
      student.ifsc_code || "N/A",
      student.bank_branch_name || "N/A",
      student.social_media_link || "N/A",
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

  const pathname = usePathname();
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    if (pathname) {
      setActivePath(pathname);
    }
  }, [pathname]);

  const reportLinks = [
    { href: "/admin/report/staff_report", label: "Staff Report" },
    { href: "/admin/payroll/payrollreport", label: "Payroll Report" },
  ];
  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <div className="col-md-12">
        <div className="box box-primary mb-8 rounded-lg border-0 bg-white shadow-md dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
          <div className="box-header border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="box-title text-gray-800 flex items-center !font-[Satoshi] !text-[1.25rem] text-2xl !font-semibold font-semibold !leading-[1.75rem]">
              <i className="fa fa-search mr-2 text-blue-600"></i> Human Resource
              Report
            </h3>
          </div>
          <div className="p-5">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {reportLinks.map((link) => (
                <li key={link.href} className="col-lg-4 col-md-4 col-sm-6">
                  <a
                    href={link.href}
                    className={`flex items-center hover:text-[#0070f3] ${
                      activePath === link.href
                        ? "rounded-md bg-blue-100 p-2 dark:bg-blue-800"
                        : "p-2"
                    }`}
                  >
                    <DescriptionIcon className="mr-2 h-2 w-2" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="box box-primary mb-8 rounded-lg border-0 bg-white shadow-md dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
        <div className={`${styles.filters} p-5`}>
          <div className={styles.filterGroup}>
            <label className={styles.label}>
              Search Type (By Date Of Joining):
              <select
                className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              >
                <option value="">Select</option>
                <option value="today">Today</option>
                <option value="this_week">This Week</option>
                <option value="last_week">Last Week</option>
                <option value="this_month">This Month</option>
                <option value="last_month">Last Month</option>
                <option value="last_3_month">Last 3 Months</option>
                <option value="last_6_month">Last 6 Months</option>
                <option value="last_12_month">Last 12 Months</option>
                <option value="this_year">This Year</option>
                <option value="last_year">Last Year</option>
                <option value="period">Period</option>
              </select>
            </label>
            <label className={styles.label}>
              Status:
              <select
                className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              >
                <option value="">Select</option>
                <option value="1">Active</option>
                <option value="2">Disabled</option>
              </select>
            </label>
            <label className={styles.label}>
              Role:
              <select
                value={selectedClass || ""}
                onChange={handleClassChange}
                className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              >
                <option value="">Select</option>
                <option value="1">Admin</option>
              </select>
            </label>
            <label className={styles.label}>
              Designation:
              <select
                value={selectedClass || ""}
                onChange={handleClassChange}
                className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              >
                <option value="">Select</option>
                <option value="1">Principal</option>
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
              title={" Human Resource Report List "}
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
        )}
      </div>
    </DefaultLayout>
  );
};

export default HumanResourceReport;
