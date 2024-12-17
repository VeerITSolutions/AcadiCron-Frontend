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
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import { fetchRoleData } from "@/services/roleService";
import { fetchStaffData } from "@/services/staffService";
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
  responsive: "standard",
  filter: false, // Disable filter,
  viewColumns: false, // Disable view columns button
};

const StudentDetails = () => {
  const [data, setData] = useState<Array<Array<string>>>([]);
  const { themType, setThemType } = useGlobalState(); //
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [roledata, setRoleData] = useState<Array<Array<string>>>([]);
  const [colorMode, setColorMode] = useColorMode();
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined,
  );
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();

  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.employee_id,
      // `${student.name.trim()} ${student.surname.trim()}`,

      <span
        key={student.id}
        onClick={() => router.push(`/admin/staff/profile/${student.id}`)}
        className="cursor-pointer text-blue-500 hover:text-blue-700"
      >
        {`${student.name.trim()} ${student.surname.trim()}`}
      </span>,
      student.user_type || "N/A",
      student.department || "N/A",
      student.designation || "N/A",
      student.contact_no,
      <div key={student.id} className="flex">
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

  const handleDelete = async (id: number) => {
    // Assuming id is the student_id
    router.push(`/admin/student/${id}`);
  };

  const handleAddFees = (id: number) => {
    router.push(`/admin/staff/profile/${id}`);
  };

  useEffect(() => {
    fetchData(page, rowsPerPage, selectedRole, keyword);
  }, [page, rowsPerPage, selectedRole, keyword]);

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

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    setPage(0); // Reset to first page on search
    fetchData(page, rowsPerPage, selectedRole, keyword);
  };
  const handleRefresh = () => {
    setSelectedRole("");
    setKeyword("");
  };

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <div className={styles.filters}>
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

          <div className={styles.searchGroup}>
            <input
              type="text"
              placeholder="Search By Keyword"
              value={keyword}
              onChange={handleKeywordChange}
              className={`${styles.searchInput} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
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
      {loading ? (
        <Loader />
      ) : (
        <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
          <MUIDataTable
            title={"Disable Staff List"}
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
    </DefaultLayout>
  );
};

export default StudentDetails;
