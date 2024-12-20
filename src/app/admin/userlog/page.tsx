"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import { deleteStudentBluk, fetchStudentData } from "@/services/studentService";
import Loader from "@/components/common/Loader";
import {
  fetchsectionByClassData,
  fetchsectionData,
} from "@/services/sectionsService"; // Import your section API service
import { getClasses } from "@/services/classesService"; // Import your classes API service
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import { Tabs, Tab } from "@mui/material"; // Import tabs
import { toast } from "react-toastify";
import { useLoginDetails } from "@/store/logoStore";

// Column definitions for each tab
const columnsTab1 = [
  "Users",
  "Role",
  "Classs",
  "IP Address",
  "Login Time",
  "User Agent",
];

const columnsTab2 = [
  "Users",
  "Role",
  "IP Address",
  "Login Time",
  "User Agent",
];

const columnsTab3 = [
  "Users",
  "Role",
  "Class",
  "IP Address",
  "Login Time",
  "User Agent",
];

const columnsTab4 = [
  "Users",
  "Role",
  "IP Address",
  "Login Time",
  "User Agent",
];

const options = {
  serverSide: true,
  pagination: false,
  responsive: "standard",
  search: false,
  filter: false,
  viewColumns: false,
  tableBodyMaxHeight: "500px",
  selectableRows: false,
};

const ReportsAudit = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [colorMode, setColorMode] = useColorMode();
  const [data, setData] = useState<Array<Array<string>>>([]);
  const { themType, setThemType } = useGlobalState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined
  );
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined
  );
  const [keyword, setKeyword] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState(0); // State for selected tab
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );
  const router = useRouter();

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
          toast.success("Items deleted successfully.");
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
    rowsSelected: []
  ) => {
    setSelectedRows(rowsSelected); // Update selected rows
  };

  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.id,
      student.users || "N/A",
      student.ip_address || "N/A",
      student.action || "N/A",
      student.platform || "N/A",
      student.agent || "N/A",
      student.date_time,
    ]);
  };

  const getColumnsForTab = () => {
    if (selectedTab === 0) {
      return columnsTab1;
    } else if (selectedTab === 1) {
      return columnsTab2;
    } else if (selectedTab === 2) {
      return columnsTab3;
    } else if (selectedTab === 3) {
      return columnsTab4;
    }
    return [];
  };

  const fetchData = async (
    selectedClass?: string,
    selectedSection?: string,
    keyword?: string
  ) => {
    try {
      if (selectedClass && selectedSection) {
        const result = await fetchStudentData(
          0,
          0,
          selectedClass,
          selectedSection,
          keyword,
          selectedSessionId,
          1
        );
        setTotalCount(result.totalCount);
        const formattedData = formatStudentData(result.data);
        setData(formattedData);
        setLoading(false);
      } else {
        setData([]);
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

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
      <Tabs
      value={selectedTab}
      onChange={(e, newValue) => setSelectedTab(newValue)}
      className="bg-[#f8f8f8]"
    >
      <Tab label="All Users" />
      <Tab label="Staff" />
      <Tab label="Students" />
      <Tab label="Parents" />
    </Tabs>


        <MUIDataTable
          title={"User Log"}
          data={data}
          columns={getColumnsForTab()} // Dynamically set columns based on tab
          options={{
            ...options,
            count: totalCount,
            page: page,
            rowsPerPage: rowsPerPage,
            onChangePage: handlePageChange,
            onChangeRowsPerPage: handleRowsPerPageChange,
            onRowSelectionChange: handleRowSelectionChange,
            onRowsDelete: handleDelete,
          }}
        />
      </ThemeProvider>
    </DefaultLayout>
  );
};

export default ReportsAudit;
