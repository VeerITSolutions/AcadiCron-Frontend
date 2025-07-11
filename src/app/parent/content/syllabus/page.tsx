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
  FileDownload,
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
import { fetchContentData, deleteContentData } from "@/services/ContentService";
import { useLoginDetails } from "@/store/logoStore";

const StudentDetails = () => {
  const getselectedUserData = useLoginDetails((state) => state.userData);
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
  const [colorMode, setColorMode] = useColorMode();
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();

  const columns = ["Content Title", "Type", "Date", "Avaliable For", "Action"];

  const options = {
    filterType: false,
    serverSide: true,
    responsive: "standard",
    search: false,
    selectableRows: "none", // Disable row selection
    filter: false, // Disable filter,
    viewColumns: false, // Disable view columns button
  };

  const formatStudentCategoryData = (students: any[]) => {
    if (!Array.isArray(students)) return []; // Fallback to an empty array if not an array

    return students.map((student: any) => [
      student.title || "N/A",
      student.type || "N/A",
      student.date || "N/A",
      student.class ? student.content_for_role : "All",

      <div key={student.id} className="flex items-center space-x-2">
        <IconButton
          onClick={() =>
            handleDownload(process.env.NEXT_PUBLIC_BASE_URL + student.file)
          }
          aria-label="download"
        >
          {student.file ? <FileDownload /> : ""}
        </IconButton>
      </div>,
    ]);
  };

  const handleDownload = (url: string) => {
    try {
      // Create an anchor element
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", "");

      // Append the link, trigger click, and clean up
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error initiating the download:", error);
    }
  };

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchContentData(
        currentPage + 1,
        rowsPerPage,
        "syllabus",
        getselectedUserData.class_id,
        getselectedUserData.section_id,
      );
      setTotalCount(result.totalCount);
      setData(formatStudentCategoryData(result.data));
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteContentData(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage]);

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
    fetchData(page, rowsPerPage);
  };

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      {loading ? (
        <Loader />
      ) : (
        <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
          <MUIDataTable
            title={"Syllabus List"}
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
