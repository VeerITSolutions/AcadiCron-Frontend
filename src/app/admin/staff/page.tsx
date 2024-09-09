"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { fetchStudentData } from "@/services/studentService";
import styles from "./StudentDetails.module.css"; // Import CSS module
import Loader from "@/components/common/Loader";
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
  "Staff ID",
  "Name",
  "Role",
  "Department",
  "Designation",
  "Mobile Number",
  "Action",
];


const options = {
  filterType: false,
  serverSide: true,
  responsive: "standard",
 
  selectableRows: "none", // Disable row selection

};
const StudentDetails = () => {
  const [activeTab, setActiveTab] = useState('list'); // "list" or "card"
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
              className={styles.select}
            >
              <option value="">Select</option>
              <option value="Class1">Admin</option>
              <option value="Class2">Teacher</option>
              <option value="Class3">Accountant</option>
              <option value="Class4">Librarian</option>
              <option value="Class5">Receptionist</option>
              {/* Add more class options here */}
            </select>
            
          </label>
          <button onClick={handleSearch} className={styles.searchButton}>
              Search
            </button>
          
          <div className={styles.searchGroup}>
          <input
              type="text"
              placeholder="Search By Keyword"
              value={keyword}
              onChange={handleKeywordChange}
              className={styles.searchInput}
            />
            <button onClick={handleSearch} className={styles.searchButton}>
              Search
            </button>
          </div>
        </div>
        {/*  <div className={styles.searchGroup}>

        </div> */}
      </div>





      <div className="rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Tab Navigation */}
      <div className="mb-6 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
        <a
          className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
            activeTab === 'card' ? 'text-primary border-primary' : 'border-transparent'
          }`}
          href="#"
          onClick={() => setActiveTab('card')}
        >
          Card View
        </a>
        <a
          className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
            activeTab === 'list' ? 'text-primary border-primary' : 'border-transparent'
          }`}
          href="#"
          onClick={() => setActiveTab('list')}
        >
          List View
        </a>
      </div>

      {/* Content Rendering Based on Active Tab */}
      <div>
        {activeTab === 'card' && (
          <div className="leading-relaxed">
            {/* Card view content goes here */}
            <p>Card View Content. You can render your card components here.</p>
          </div>
        )}

        {activeTab === 'list' && (
          <div className="leading-relaxed">
            {/* List view with MUIDataTable */}
            <MUIDataTable
              title={"Staff List"}
              data={data}
              className={`rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
              columns={columns}
              options={{
                count: totalCount,
                page: page,
                rowsPerPage: rowsPerPage,
                onChangePage: handlePageChange,
                onChangeRowsPerPage: handleRowsPerPageChange,
              }}
            />
          </div>
        )}
      </div>
    </div>
      
    
    </DefaultLayout>
  );
};

export default StudentDetails;
