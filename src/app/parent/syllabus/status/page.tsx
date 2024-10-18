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
const columns = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const options = {
  filterType: "checkbox",
  serverSide: true,
  responsive: "standard",
  selectableRows: "none", // Disable row selection
  filter: false, // Disable filter,
  viewColumns: false, // Disable view columns button
};

const StudentDetails = () => {
  const [colorMode, setColorMode] = useColorMode();
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

  const token = localStorage.getItem("authToken") || "";

  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.admission_no,
      `${student.firstname.trim()} ${student.lastname.trim()}`,
      student.class || "N/A",
      student.category_id,
      student.mobileno,
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
  }, [page, rowsPerPage, token, selectedClass, selectedSection, keyword]);

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

  const subjectsData = [
    { subject: "Maths", id: 1, percentage: 33 },
    { subject: "English", id: 2, percentage: 0 },
    { subject: "Hindi", id: 3, percentage: 0 },
    { subject: "Arts & Craft", id: 5, percentage: 0 },
    { subject: "EVS", id: 6, percentage: 0 },
    { subject: "General Knowledge", id: 7, percentage: 0 },
    { subject: "Computer", id: 8, percentage: 0 },
    { subject: "Marathi", id: 9, percentage: 0 },
    { subject: "Sanskrit", id: 10, percentage: 0 },
    { subject: "SST", id: 11, percentage: 0 },
    { subject: "Science", id: 12, percentage: 0 },
  ];
  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
     


    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Syllabus Status</h2>
      <div className="grid grid-cols-3 gap-6 md:grid-cols-6 lg:grid-cols-6">
        {subjectsData.map((subject) => (
          <div key={subject.id} className="flex flex-col items-center">
            <div className="w-20 h-20">
              <CircularProgressbar
                value={subject.percentage}
                text={`${subject.percentage}%`}
                styles={{
                  path: { stroke: subject.percentage > 0 ? "green" : "#d6d6d6" },
                  text: { fill: subject.percentage > 0 ? "green" : "#000000" },
                }}
              />
            </div>
            <p className="mt-2 text-center text-lg">{subject.subject}</p>
            <p className="text-sm text-center text-black font-bold">
              Complete {subject.percentage} %
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-lg">
        <p>33% Complete</p>
      </div>
    </div>

    <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Subject - Lesson - Topic Status</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Subject</th>
                <th className="border px-4 py-2">Total Lessons</th>
                <th className="border px-4 py-2">Completed Lessons</th>
                <th className="border px-4 py-2">Completion %</th>
              </tr>
            </thead>
            <tbody>
              {subjectsData.map((subject) => (
                <tr key={subject.id} className="text-center">
                  <td className="border px-4 py-2">{subject.subject}</td>
                  <td className="border px-4 py-2">{subject.lessons}</td>
                  <td className="border px-4 py-2">{subject.completed}</td>
                  <td className="border px-4 py-2">{subject.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </DefaultLayout>
  );
};

export default StudentDetails;
