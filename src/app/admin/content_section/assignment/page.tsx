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
  FileDownload,
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
import { fetchContentData } from "@/services/ContentService";
const columns = ["Content Title", "Type", "Date", "Avaliable For", "Action"];

const options = {
  filterType: false,
  serverSide: true,
  responsive: "standard",
  filter: false, // Disable filter,
  viewColumns: false, // Disable view columns button

  selectableRows: "none", // Disable row selection
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
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();

  const [colorMode, setColorMode] = useColorMode();

  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.admission_no,
      `${student.firstname.trim()} ${student.lastname.trim()}`,
      student.class || "N/A",
      student.category_id,
      student.mobileno,
    ]);
  };
  const handleDownload = (url: string) => {
    try {
      // Create an anchor element
      const link = document.createElement("a");
      link.href = url;

      // Set the 'download' attribute to trigger the file download
      // This forces the file to be downloaded rather than displayed in the browser
      link.setAttribute("download", "");

      // Append the link, trigger click, and clean up
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error initiating the download:", error);
    }
  };
  const formatStudentCategoryData = (students: any[]) => {
    if (!Array.isArray(students)) return []; // Fallback to an empty array if not an array

    return students.map((student: any) => [
      student.title || "N/A",
      student.type || "N/A",
      student.date || "N/A",
      student.class ? student.content_for_role : "All",
      `${student.class ?? ""} ${student.section ? `(${student.section})` : "-"}` ||
        "N/A",

      <div key={student.id}>
        <IconButton
          onClick={() =>
            handleDownload(process.env.NEXT_PUBLIC_BASE_URL + student.file)
          }
          aria-label="edit"
        >
          {student.file ? <FileDownload /> : ""}
        </IconButton>
        <IconButton
          onClick={() => handleDelete(student.id)}
          aria-label="delete"
        >
          <Delete />
        </IconButton>
      </div>,
    ]);
  };

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchContentData(currentPage + 1, rowsPerPage);
      setTotalCount(result.totalCount);
      setData(formatStudentCategoryData(result.data));
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
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage, selectedClass, selectedSection, keyword]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleSearch = () => {
    setPage(0); // Reset to first page on search
    fetchData(page, rowsPerPage);
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
        <MUIDataTable
          title={"Assignment List"}
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
