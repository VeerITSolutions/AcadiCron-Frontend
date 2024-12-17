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
  responsive: "standard",
  filter: false, // Disable filter,
  viewColumns: false, // Disable view columns button
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

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    setPage(0); // Reset to first page on search
    fetchData(page, rowsPerPage, selectedClass, selectedSection, keyword);
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

      <div className="">
        {/* Tab Navigation */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-5 sm:gap-10">
          {/* Tabs */}

          <button
            className="ml-auto rounded bg-blue-500 px-4 py-2 text-white"
            onClick={() => router.push("/admin/staff/create")}
          >
            <PersonAdd className="text-white" />
            Add Staff
          </button>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
            <MUIDataTable
              title={"Staff List"}
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
