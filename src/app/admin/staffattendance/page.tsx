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
import { Span } from "next/dist/trace";
import { fetchRoleData } from "@/services/roleService";
import { fetchStaffData } from "@/services/staffService";

const StudentDetails = () => {
  const [data, setData] = useState<Array<Array<string>>>([]);
  const { themType, setThemType } = useGlobalState(); //
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [roledata, setRoleData] = useState<Array<Array<string>>>([]);

  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [holiday, setHoliday] = useState<number>(0);

  const columns = ["Staff ID", "Name", "Role", "Attendance", "Note"];

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
        <label className="flex cursor-pointer items-center space-x-2">
          <input
            type="checkbox"
            value={holiday}
            className="peer hidden"
            onChange={handleHolidayChange}
          />
          <div className="border-gray-400 flex h-6 w-6 items-center justify-center rounded border-2 peer-checked:border-[#1976D2] peer-checked:bg-[#1976D2]">
            <svg
              className="hidden h-4 w-4 text-white peer-checked:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-gray-700">Mark As Holiday</span>
        </label>
        <button
          className="rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0] focus:ring-opacity-50"
          /* onClick={updateStudent} */
        >
          Save Attendance
        </button>
      </div>
    ),
  };

  const getDefaultDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [attendancedate, setattendancedate] =
    useState<string>(getDefaultDate());

  const [selectedAttendacne, setAttendance] = useState<string | undefined>(
    undefined,
  );
  const [colorMode, setColorMode] = useColorMode();
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSelectedSessionId(localStorage.getItem("selectedSessionId"));
    }
  }, []);
  const updateStudent = (id: any, field: any, value: any) => {
    setData((prevStudents: any) =>
      prevStudents.map((student: any) =>
        student.id === id ? { ...student, [field]: value } : student,
      ),
    );
  };
  const formatStudentData = (
    students?: any[],
    updateStudent?: (id: any, field: any, value: any) => void,
    status?: any,
  ) => {
    return students?.map((student: any, rowIndex: number) => [
      student.id,
      `${student.name} ${student.surname}`,
      student.user_type || "N/A",

      <div className="flex gap-2">
        {["Present", "Late", "Absent", "Halfday"].map((statusOption) => (
          <label key={statusOption} className="flex items-center gap-1">
            <input
              className="dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none"
              type="radio"
              name={`attendance-${rowIndex}`} // Grouping by rowIndex to ensure only one can be selected per student
              value={statusOption}
              checked={student.attendance_status === statusOption} // Only select if the status matches
              onChange={() => {
                if (updateStudent) {
                  updateStudent(student.id, "attendance_status", statusOption); // Update the student's status
                }
              }}
            />
            {statusOption}
          </label>
        ))}
      </div>,

      <input
        type="text"
        value={student.attendance_note || ""} // Display existing note or empty string
        onChange={(e) => {
          if (updateStudent) {
            updateStudent(student.id, "attendance_note", e.target.value); // Update the note for the student
          }
        }}
        className="border p-1 dark:border-strokedark dark:bg-boxdark dark:text-white"
        
      />,
    ]);
  };

  const fetchData = async (
    currentPage: number,
    rowsPerPage: number,
    selectedRole?: string,
    selectedAttendacne?: string,
    keyword?: string,
  ) => {
    try {
      if (roledata.length === 0) {
        const roleresult = await fetchRoleData();
        setRoleData(roleresult.data);
      }

      setLoading(false);
      if (selectedRole) {
        const result = await fetchStaffData(
          currentPage + 1,
          rowsPerPage,
          selectedRole,
          selectedSection,
          keyword,
          selectedSessionId,
          "",
          "",
          1,
          attendancedate,
        );
        setTotalCount(result.totalCount);
        const formattedData = formatStudentData(result.data);

        setData(formattedData || []);
      }
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
    fetchData(page, rowsPerPage, selectedRole, selectedAttendacne, keyword);
  }, [
    page,
    rowsPerPage,
    selectedRole,
    selectedClass,
    selectedSection,
    keyword,
  ]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };
  const handleHolidayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHoliday(Number(event.target.value));
  };
  const handleAttendanceChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setAttendance(event.target.value);
  };

  const handleSearch = () => {
    setPage(0); // Reset to first page on search
    fetchData(page, rowsPerPage, selectedRole, selectedAttendacne, keyword);
  };

  const handleAttendancedateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setattendancedate(event.target.value);
  };

  const handleRefresh = () => {
    setSelectedRole("");
    setAttendance("");
    setData([]);
    setattendancedate(getDefaultDate());
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

          <label className={styles.label}>
            Attendance Date:
            <input
              type="date"
              value={attendancedate}
              onChange={handleAttendancedateChange}
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            />
          </label>
          <div className={styles.searchGroup}>
            <button onClick={handleSearch} className={styles.searchButton}>
              Search
            </button>
          </div>
          <div className={styles.searchGroup}>
            <button onClick={handleRefresh} className={styles.searchButton}>
              Reset
            </button>
          </div>
        </div>
      </div>
      {selectedRole ? (
        <>
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
        </>
      ) : (
        ""
      )}
    </DefaultLayout>
  );
};

export default StudentDetails;
