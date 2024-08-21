"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { fetchStudentData } from "@/services/studentService";

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
  const router = useRouter();

  const token = localStorage.getItem("authToken") || "";

  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.admission_no,
      `${student.firstname.trim()} ${student.lastname.trim()}`,
      student.class || "N/A",
      student.category_id,
      student.mobileno,
      "View",
    ]);
  };

  const fetchData = async (
    currentPage: number,
    rowsPerPage: number,
    selectedClass?: string,
    selectedSection?: string,
  ) => {
    try {
      const result = await fetchStudentData(
        currentPage + 1,
        rowsPerPage,
        selectedClass,
        selectedSection,
      );
      setTotalCount(result.totalCount); // Assuming result includes totalCount
      const formattedData = formatStudentData(result.data);
      setData(formattedData);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, rowsPerPage, selectedClass, selectedSection);
  }, [page, rowsPerPage, token, selectedClass, selectedSection]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    setPage(0); // Reset to first page on filter change
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
    setPage(0); // Reset to first page on filter change
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <div>
        <label>
          Class:
          <select value={selectedClass || ""} onChange={handleClassChange}>
            <option value="">All Classes</option>
            <option value="Class1">Class 1</option>
            <option value="Class2">Class 2</option>
            {/* Add more class options here */}
          </select>
        </label>
        <label>
          Section:
          <select value={selectedSection || ""} onChange={handleSectionChange}>
            <option value="">All Sections</option>
            <option value="SectionA">Section A</option>
            <option value="SectionB">Section B</option>
            {/* Add more section options here */}
          </select>
        </label>
      </div>
      <MUIDataTable
        title={"Student List"}
        data={data}
        columns={columns}
        options={{
          ...options,
          count: totalCount, // Use dynamic total count
          page: page,
          rowsPerPage: rowsPerPage,
          onChangePage: handlePageChange,
          onChangeRowsPerPage: handleRowsPerPageChange,
        }}
      />
    </DefaultLayout>
  );
};

export default StudentDetails;
