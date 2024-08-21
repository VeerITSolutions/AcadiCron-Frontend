"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { fetchStudentData } from "@/services/studentService"; // Import the updated service

const columns = [
  "Admission No",
  "Student Name",
  "Class",
  "Category",
  "Mobile Number",
  "Action",
];

const options = {
  filterType: "checkbox",
  serverSide: true,
  responsive: "standard",
};

const student_details = () => {
  const [data, setData] = useState<Array<Array<string>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0); // Tracks current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Tracks rows per page
  const router = useRouter();

  const token = localStorage.getItem("authToken") || ""; // Token retrieval

  const formatStudentData = (paginatedData: any) => {
    const students = paginatedData.data || [];
    return students.map((student: any) => [
      student.admission_no,
      `${student.firstname.trim()} ${student.lastname.trim()}`,
      student.class || "N/A",
      student.category_id,
      student.mobileno,
      "View",
    ]);
  };

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchStudentData(currentPage + 1, rowsPerPage); // Adjust for 0-based index
      const formattedData = formatStudentData(result.data);
      setData(formattedData);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage, token]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to first page on rows per page change
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <MUIDataTable
        title={"Student List"}
        data={data}
        columns={columns}
        options={{
          ...options,
          count: 100, // Total number of records (can be dynamic)
          page: page,
          rowsPerPage: rowsPerPage,
          onChangePage: handlePageChange,
          onChangeRowsPerPage: handleRowsPerPageChange,
        }}
      />
    </DefaultLayout>
  );
};

export default student_details;
