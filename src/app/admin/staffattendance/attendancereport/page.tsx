"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import { fetchStaffData } from "@/services/staffService";
import styles from "./StudentDetails.module.css"; // Import CSS module
import Loader from "@/components/common/Loader";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { Search, AddCircleOutline } from "@mui/icons-material";
import { Description as DescriptionIcon} from '@mui/icons-material';
import { usePathname } from "next/navigation"; 

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
import { fetchRoleData } from "@/services/roleService";
import { useLoginDetails } from "@/store/logoStore";
const columns = [
  "Staff ID",
  "Name",
  "Role",
  "Department",
  "Designation",
  "Mobile Number",
  "Action",
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


const StudentDetails = () => {
  const [activeTab, setActiveTab] = useState("list"); // "list" or "card"
  const [data, setData] = useState<Array<Array<string>>>([]);
  const { themType, setThemType } = useGlobalState(); //
  const [roledata, setRoleData] = useState<Array<Array<string>>>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();
  const [colorMode, setColorMode] = useColorMode();

  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.employee_id,
      `${student.name.trim()} ${student.surname.trim()}`,
      student.user_type || "N/A",
      student.department || "N/A",
      student.designation || "N/A",
      student.contact_no,
      <div key={student.id} className="flex">
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
    selectedRole?: string,
    selectedSection?: string,
    keyword?: string,
  ) => {
    try {
      const result = await fetchStaffData(
        currentPage + 1,
        rowsPerPage,
        selectedRole,
        selectedSection,
        keyword,
        selectedSessionId,
      );
      setTotalCount(result.totalCount);
      const formattedData = formatStudentData(result.data);
      setData(formattedData);

      const roleresult = await fetchRoleData();
      setRoleData(roleresult.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/staff/edit/${id}`);
  };
  const handleAddFees = (id: number) => {
    router.push(`/admin/staff/profile/${id}`);
  };

  useEffect(() => {
    fetchData(page, rowsPerPage, selectedRole, selectedSection, keyword);
  }, [page, rowsPerPage, selectedRole, selectedSection, keyword]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
    console.log("selectedRole", selectedRole);
  };


  const handleSearch = () => {
    setPage(0); // Reset to first page on search
    fetchData(page, rowsPerPage, selectedClass, selectedSection, keyword);
  };
  const handleRefresh = () => {
    setSelectedRole("");
    setKeyword("");
  };

  const pathname = usePathname(); 
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    if (pathname) {
      setActivePath(pathname);
    }
  }, [pathname]);

  const reportLinks = [
    { href: "/admin/student_attendance/classattendencereport", label: "Attendance Report" },
    { href: "/admin/report/attendancereport", label: "Student Attendance Type Report" },
    { href: "/admin/staffattendance/attendancereport", label: "Staff Attendance Report" },
    { href: "/admin/report/daily_attendance_report", label: "Daily Attendance Report" },
  ];

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <div className="col-md-12">
      <div className="box box-primary border-0 mb-8 bg-white shadow-md rounded-lg dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white">
        <div className="box-header border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="box-title text-2xl font-semibold text-gray-800 flex items-center !text-[1.25rem] !leading-[1.75rem] !font-[Satoshi] !font-semibold">
            <i className="fa fa-search mr-2 text-blue-600"></i> Finance
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
                      ? "bg-blue-100 dark:bg-blue-800 rounded-md p-2"
                      : "p-2"
                  }`}
                >
                  <DescriptionIcon className="h-2 w-2 mr-2" />
                  {link.label}
                </a>
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
            Role:
            <select
              value={selectedRole || ""}
              onChange={handleRoleChange}
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            >
              <option value="">Select</option>
              {roledata.map((cls: any) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.label}>
          Month:
            <select
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            >
              <option value="">Select</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </label>
          <label className={styles.label}>
          Year:
            <select
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            >
              <option value="">Select</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
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
            />
          </ThemeProvider>
        )}
    
      </div>
    </DefaultLayout>
  );
};

export default StudentDetails;
