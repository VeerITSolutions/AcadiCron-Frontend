"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
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
const columns = [
  "#", 
  "Staff ID",
  "Name",
  "Role",
  {
    name: "Attendance", 
    options: {
      customBodyRender: (value: string, tableMeta: any, updateData: (value: string) => void) => {
        const { rowIndex } = tableMeta;
        const attendance = value || "Present"; // Default value is "Present"
        return (
          <div className="flex gap-2">
            {["Present", "Late", "Absent", "Halfday"].map((status) => (
              <label key={status} className="flex items-center gap-1">
                <input
                className="dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white"
                  type="radio"
                  name={`attendance-${rowIndex}`}
                  value={status}
                  checked={attendance === status}
                  onChange={() => updateData(status)} // Update the attendance when radio button is clicked
                />
                {status}
              </label>
            ))}
          </div>
        );
      }
    }
  }, 
  {
    name: "Note",
    options: {
      customBodyRender: (value: string, tableMeta: any, updateData: (value: string) => void) => {
        const { rowIndex } = tableMeta;
        return (
          <input
            type="text"
            value={value || ""} // Use the note if available or empty string
            onChange={(e) => updateData(e.target.value)} // Update the note when the input changes
            className="w-full p-1 border rounded dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white"
          />
        );
      }
    }
  }];

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
      <div className="flex gap-2 justify-end">
        <button
          className="rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]"
          onClick={() => console.log("Mark As Holiday clicked")}
        >
          Mark As Holiday
        </button>
        <button
          className="rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0] focus:ring-opacity-50"
          onClick={() => console.log("Save Attendance clicked")}
        >
          Save Attendance
        </button>
      </div>
    ),
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
  const [colorMode, setColorMode] = useColorMode();
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();

  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.admission_no,
      `${student.firstname.trim()} ${student.lastname.trim()}`,
      student.staff_id || "N/A",
      student.class || "N/A",
      student.remark || "N/A",
      student.staff_attendance_type_id || "N/A",,
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

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>
            Role:
            <select
              value={selectedClass || ""}
              onChange={handleClassChange}
              className={`${styles.select} dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none`}
            >
              <option value="">Select</option>
              <option value="Class1">Admin</option>
              <option value="Class2">Teacher</option>
              <option value="Class2">Accountant</option>
              <option value="Class2">Librarian</option>
              {/* Add more class options here */}
            </select>
          </label>
        
          <label className={styles.label}>
            Attendance Date:
            <input
              type="date"
              className={`${styles.select} dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none`}
            />
          </label>
          <div className={styles.searchGroup}>
            <button onClick={handleSearch} className={styles.searchButton}>
              Search
            </button>
          </div>
        </div>
        
      </div>
      <ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
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
    </DefaultLayout>
  );
};

export default StudentDetails;
