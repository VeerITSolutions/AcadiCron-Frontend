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
import { createStafftAttendencData } from "@/services/staffAttendence";
import { json } from "stream/consumers";
import { set } from "date-fns";

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
  const [holiday, setHoliday] = useState<boolean>(false);

  const [studentData, setStudentData] = useState<Array<Array<string>>>([]);
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
            className="peer hidden"
            checked={holiday} // Handles both 0/1 or true/false
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
          onClick={handleSaveAttendance}
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
    console.log(id, field, value);

    setStudentData((prevData: any) => {
      // Create a copy of the previous data
      const updatedData = [...prevData];

      // Find the student with the given id
      const studentIndex = updatedData.findIndex(
        (student) => student.id === id,
      );

      if (studentIndex !== -1) {
        // Update the student's field (attendance_note or attendance_type)
        updatedData[studentIndex] = {
          ...updatedData[studentIndex],
          [field]: value,
        };
      } else {
        // If the student is not found, add a new object with their id and field-value pair
        updatedData.push({ id, [field]: value });
      }

      // Remove duplicate entries for the same id and keep only unique ones
      const uniqueData = updatedData.filter(
        (student, index, self) =>
          index === self.findIndex((s) => s.id === student.id),
      );

      return uniqueData;
    });
  };

  const handleSaveAttendance = async () => {
    // Log the entire data (with any changes made by the user)
    const formData = {
      attendance_data: JSON.stringify(studentData),
      date: attendancedate,
      holiday: holiday,
    };
    const result = await createStafftAttendencData(formData);

    if (result.success) {
      toast.success("Added successfully");
      setStudentData([]); // Clear the student data after saving
      fetchData(page, rowsPerPage, selectedRole, selectedAttendacne, keyword);
    } else {
      toast.error("Failed to Add");
    }
  };
  const formatStudentData = (students?: any[]) => {
    students?.forEach((student: any) => {
      const today = new Date(); // Current date
      const attendanceDate = new Date(attendancedate); // Parse the attendance date

      // Check if today is a holiday
      if (holiday === true) {
        // Update student attendance type and note for a holiday
        updateStudent(student.id, "attendance_type", 5);
        updateStudent(student.id, "attendance_note", "");
      } else {
        // Check if attendance status is null and the attendance date is today or in the future
        if (
          student.attendance_status === null &&
          (attendanceDate.toDateString() === today.toDateString() ||
            attendanceDate > today)
        ) {
          // Update student attendance type and note
          updateStudent(student.id, "attendance_type", 1);
          updateStudent(student.id, "attendance_note", "");
        }
      }
    });
    return students?.map((student: any, rowIndex: number) => {
      // Determine the attendance status
      const today = new Date(); // Current date
      const attendanceDate = new Date(attendancedate); // Parsed attendance date

      // Determine the attendance status
      const student_attendance_status =
        student.attendance_status === null && attendanceDate > today
          ? 1
          : student.attendance_status;

      return [
        student.id,
        `${student.name} ${student.surname}`,
        student.user_type || "N/A",
        <div key={student.id} className="flex gap-2">
          {[
            { label: "Present", key: 1 },
            { label: "Late With Excuse", key: 2 },
            { label: "Late", key: 3 },
            { label: "Absent", key: 4 },
            { label: "Holiday", key: 5 },
            { label: "Half Day", key: 6 },
          ].map(({ label, key }) => (
            <label key={key} className="flex items-center gap-1">
              <input
                className="dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none"
                type="radio"
                name={`attendance-${rowIndex}`} // Grouping ensures only one is selected in this group
                defaultChecked={
                  Number(student_attendance_status) == Number(key)
                } // Set default checked status
                value={key} // Assign the key as the value
                onChange={(e) =>
                  updateStudent(student.id, "attendance_type", e.target.value)
                }
              />
              {label} {/* Display the label text */}
            </label>
          ))}
        </div>,
        <div key={student.id}>
          <input
            type="text"
            name={`attendance-note-${rowIndex}`} // Unique name for each student's note
            defaultValue={student.attendance_note || ""} // Set the initial value without controlling it
            className="border p-1 dark:border-strokedark dark:bg-boxdark dark:text-white"
            onChange={(e) =>
              updateStudent(student.id, "attendance_note", e.target.value)
            }
          />
        </div>,
        ,
      ];
    });
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
        setAttendance("");
        setData([]);
        setStudentData([]); // Clear the student data after saving

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

  useEffect(() => {
    fetchData(
      page,
      rowsPerPage,
      selectedRole,

      selectedAttendacne,
      keyword,
    );
  }, [
    page,
    rowsPerPage,
    selectedRole,
    selectedClass,
    selectedSection,
    attendancedate,
    keyword,
    holiday,
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
    setHoliday((prevValue) => !prevValue);
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
    setStudentData([]); // Clear the student data after saving
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
