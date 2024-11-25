"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { fetchStaffData } from "@/services/staffService";
import styles from "./StudentDetails.module.css"; // Import CSS module
import Loader from "@/components/common/Loader";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { Search, AddCircleOutline } from '@mui/icons-material';

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
  filter: false, // Disable filter,
  viewColumns: false, // Disable view columns button
};
const StudentDetails = () => {
  const [activeTab, setActiveTab] = useState("list"); // "list" or "card"
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
      student.employee_id,
      `${student.name.trim()} ${student.surname.trim()}`,
      student.user_type || "N/A",
      student.department || "N/A",
      student.designation || "N/A",
      student.contact_no,
      <div key={student.id}>
        <IconButton onClick={() => handleEdit(student.id)} aria-label="Edit">
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => handleAddFees(student.id)}
          aria-label="Add Fee"
        >
          <AttachMoney />
        </IconButton>
      </div>,
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
      const result = await fetchStaffData(
        currentPage + 1,
        rowsPerPage,
        selectedClass,
        selectedSection,
        keyword,
        localStorage.getItem("selectedSessionId"),
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


  const handleEdit = (id: number) => {
    router.push(`/admin/staff/edit/${id}`);
  };
  const handleAddFees = (id: number) => {
    router.push(`/admin/staff/profile/${id}`);
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
              <option value="Class3">Accountant</option>
              <option value="Class4">Librarian</option>
              <option value="Class5">Receptionist</option>
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
              className={`${styles.searchInput} dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none`}
            />
            <button onClick={handleSearch} className={styles.searchButton}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white p-4.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Tab Navigation */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
  {/* Tabs */}
  <div className="flex gap-5 sm:gap-10">
    <a
      className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
        activeTab === "list" ? "border-primary text-primary" : "border-transparent"
      }`}
      href="#"
      onClick={() => setActiveTab("list")}
    >
      Card View
    </a>
    <a
      className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
        activeTab === "card" ? "border-primary text-primary" : "border-transparent"
      }`}
      href="#"
      onClick={() => setActiveTab("card")}
    >
      List View
    </a>
  </div>


  <button
      className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded focus:outline-none"
      onClick={() => router.push("/admin/staff/create")}
    >
      <PersonAdd className="text-white" />
      Add Staff
    </button>
</div>



        <div>
          {activeTab === "list" && (
            <div className="leading-relaxed">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 lg:grid-cols-4">

             <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
  <div className="flex items-center relative group w-full">
    <div className="mr-4 h-[80px] w-[80px] overflow-hidden rounded-full border-2 border-gray-300 dark:border-gray-600">
      <img
        alt="user"
        loading="lazy"
        width="80"
        height="80"
        className="rounded-full object-cover object-center"
        src="https://erp.erabesa.co.in/uploads/staff_images/1.png" // Replace with the actual image source
      />
    </div>

    <div className="flex-1">
      <h4 className="text-base font-medium text-black dark:text-white">
        Rashmi Shrivastav
      </h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">ID: 9000</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">8668338370</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        <span data-toggle="tooltip" title="Role" className="cursor-pointer mr-2 bg-blue-100 dark:bg-blue-400 p-1 rounded mt-1 mb-1">
          SuperAdmin
        </span>
      </p>
    </div>

  
    <div className="absolute left-1/2 top-1/2 hidden group-hover:flex space-x-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform">
      <IconButton
        className="text-sm px-4 py-2 text-gray-700 bg-blue-100 hover:bg-blue-200 dark:text-gray-200 dark:bg-blue-800 dark:hover:bg-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150"
        aria-label="View"
      >
        <Visibility className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </IconButton>

      <IconButton
        className="text-sm px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150"
        aria-label="Edit"
      >
        <Edit className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </IconButton>
    </div>
  </div>
</div>


<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
  <div className="flex items-center relative group w-full">
    <div className="mr-4 h-[80px] w-[80px] overflow-hidden rounded-full border-2 border-gray-300 dark:border-gray-600">
      <img
        alt="user"
        loading="lazy"
        width="80"
        height="80"
        className="rounded-full object-cover object-center"
        src="https://erp.erabesa.co.in/uploads/staff_images/default_female.jpg" // Replace with the actual image source
      />
    </div>

    <div className="flex-1">
      <h4 className="text-base font-medium text-black dark:text-white">
        Priya Ronghe
      </h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">ID: 19001</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">9130683314</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <span data-toggle="tooltip" title="Location" className="cursor-pointer mr-2">
         NA,
        </span>
        <span data-toggle="tooltip" title="Department" className="cursor-pointer">
         Teaching
        </span>
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        <span data-toggle="tooltip" title="Role" className="cursor-pointer mr-2 bg-blue-100 dark:bg-blue-400 p-1 rounded mt-1 mb-1">
          Teacher
        </span>
        <span data-toggle="tooltip" title="Designation" className="cursor-pointer bg-blue-100 dark:bg-blue-400 p-1 rounded mt-1 mb-1">
          Principal
        </span>
      </p>
    </div>

    <div className="absolute left-1/2 top-1/2 hidden group-hover:flex space-x-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform">
      <IconButton
        className="text-sm px-4 py-2 text-gray-700 bg-blue-100 hover:bg-blue-200 dark:text-gray-200 dark:bg-blue-800 dark:hover:bg-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150"
        aria-label="View"
      >
        <Visibility className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </IconButton>

      <IconButton
        className="text-sm px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150"
        aria-label="Edit"
      >
        <Edit className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </IconButton>
    </div>
  </div>
</div>


<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
  <div className="flex items-center relative group w-full">
    <div className="mr-4 h-[80px] w-[80px] overflow-hidden rounded-full border-2 border-gray-300 dark:border-gray-600">
      <img
        alt="user"
        loading="lazy"
        width="80"
        height="80"
        className="rounded-full object-cover object-center"
        src="https://erp.erabesa.co.in/uploads/staff_images/5.jpg" // Replace with the actual image source
      />
    </div>

    <div className="flex-1">
      <h4 className="text-base font-medium text-black dark:text-white">
        Harshalata Khante
      </h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">ID: 19002</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">9623783502</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <span data-toggle="tooltip" title="Location" className="cursor-pointer mr-2">
         NA,
        </span>
        <span data-toggle="tooltip" title="Department" className="cursor-pointer">
         Teaching
        </span>
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        <span data-toggle="tooltip" title="Role" className="cursor-pointer mr-2 bg-blue-100 dark:bg-blue-400 p-1 rounded mt-1 mb-1">
          Teacher
        </span>
        <span data-toggle="tooltip" title="Designation" className="cursor-pointer bg-blue-100 dark:bg-blue-400 p-1 rounded mt-1 mb-1">
          Faculty
        </span>
      </p>
    </div>

    <div className="absolute left-1/2 top-1/2 hidden group-hover:flex space-x-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform">
      <IconButton
        className="text-sm px-4 py-2 text-gray-700 bg-blue-100 hover:bg-blue-200 dark:text-gray-200 dark:bg-blue-800 dark:hover:bg-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150"
        aria-label="View"
      >
        <Visibility className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </IconButton>

      <IconButton
        className="text-sm px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150"
        aria-label="Edit"
      >
        <Edit className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </IconButton>
    </div>
  </div>
</div>


<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
  <div className="flex items-center relative group w-full">
    <div className="mr-4 h-[80px] w-[80px] overflow-hidden rounded-full border-2 border-gray-300 dark:border-gray-600">
      <img
        alt="user"
        loading="lazy"
        width="80"
        height="80"
        className="rounded-full object-cover object-center"
        src="https://erp.erabesa.co.in/uploads/staff_images/6.jpg" // Replace with actual image source
      />
    </div>

    <div className="flex-1">
      <h4 className="text-base font-medium text-black dark:text-white">
        Rushali Patil
      </h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">ID: 19003</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">8446643818</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <span data-toggle="tooltip" title="Location" className="cursor-pointer mr-2">
         NA,
        </span>
        <span data-toggle="tooltip" title="Department" className="cursor-pointer">
         Teaching
        </span>
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        <span data-toggle="tooltip" title="Role" className="cursor-pointer mr-2 bg-blue-100 dark:bg-blue-400 p-1 rounded mt-1 mb-1">
          Teacher
        </span>
        <span data-toggle="tooltip" title="Designation" className="cursor-pointer bg-blue-100 dark:bg-blue-400 p-1 rounded mt-1 mb-1">
          Faculty
        </span>
      </p>
    </div>

    <div className="absolute left-1/2 top-1/2 hidden group-hover:flex space-x-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform">
      <IconButton
        className="text-sm px-4 py-2 text-gray-700 bg-blue-100 hover:bg-blue-200 dark:text-gray-200 dark:bg-blue-800 dark:hover:bg-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150"
        aria-label="View"
      >
        <Visibility className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </IconButton>

      <IconButton
        className="text-sm px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150"
        aria-label="Edit"
      >
        <Edit className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </IconButton>
    </div>
  </div>
</div>


<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
  <div className="flex items-center relative group w-full">
    <div className="mr-4 h-[80px] w-[80px] overflow-hidden rounded-full border-2 border-gray-300 dark:border-gray-600">
      <img
        alt="user"
        loading="lazy"
        width="80"
        height="80"
        className="rounded-full object-cover object-center"
        src="https://erp.erabesa.co.in/uploads/staff_images/8.jpg" // Replace with actual image source
      />
    </div>

    <div className="flex-1">
      <h4 className="text-base font-medium text-black dark:text-white">
        Tabassum Firdous
      </h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">ID: 19005</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">7843079790</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <span data-toggle="tooltip" title="Location" className="cursor-pointer mr-2">
         NA,
        </span>
        <span data-toggle="tooltip" title="Department" className="cursor-pointer">
         Teaching
        </span>
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        <span data-toggle="tooltip" title="Role" className="cursor-pointer mr-2 bg-blue-100 dark:bg-blue-400 p-1 rounded mt-1 mb-1">
          Teacher
        </span>
        <span data-toggle="tooltip" title="Designation" className="cursor-pointer bg-blue-100 dark:bg-blue-400 p-1 rounded mt-1 mb-1">
          Faculty
        </span>
      </p>
    </div>

    <div className="absolute left-1/2 top-1/2 hidden group-hover:flex space-x-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform">
      <IconButton
        className="text-sm px-4 py-2 text-gray-700 bg-blue-100 hover:bg-blue-200 dark:text-gray-200 dark:bg-blue-800 dark:hover:bg-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150"
        aria-label="View"
      >
        <Visibility className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </IconButton>

      <IconButton
        className="text-sm px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150"
        aria-label="Edit"
      >
        <Edit className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </IconButton>
    </div>
  </div>
</div>


<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
  <div className="flex items-center relative group w-full">
    <div className="mr-4 h-[80px] w-[80px] overflow-hidden rounded-full border-2 border-gray-300 dark:border-gray-600">
      <img
        alt="user"
        loading="lazy"
        width="80"
        height="80"
        className="rounded-full object-cover object-center"
        src="https://erp.erabesa.co.in/uploads/staff_images/9.jpg" // Replace with actual image source
      />
    </div>

    <div className="flex-1">
      <h4 className="text-base font-medium text-black dark:text-white">
        Kalpana Kharabe
      </h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">ID: 19006</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">8317255143</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <span data-toggle="tooltip" title="Location" className="cursor-pointer mr-2">
         NA,
        </span>
        <span data-toggle="tooltip" title="Department" className="cursor-pointer">
         Teaching
        </span>
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        <span data-toggle="tooltip" title="Role" className="cursor-pointer mr-2 bg-blue-100 dark:bg-blue-400 p-1 rounded mt-1 mb-1">
          Teacher
        </span>
        <span data-toggle="tooltip" title="Designation" className="cursor-pointer bg-blue-100 dark:bg-blue-400 p-1 rounded mt-1 mb-1">
          Faculty
        </span>
      </p>
    </div>

    <div className="absolute left-1/2 top-1/2 hidden group-hover:flex space-x-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform">
      <IconButton
        className="text-sm px-4 py-2 text-gray-700 bg-blue-100 hover:bg-blue-200 dark:text-gray-200 dark:bg-blue-800 dark:hover:bg-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150"
        aria-label="View"
      >
        <Visibility className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </IconButton>

      <IconButton
        className="text-sm px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150"
        aria-label="Edit"
      >
        <Edit className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </IconButton>
    </div>
  </div>
</div>


 <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
  <div className="flex items-center relative group w-full">
    <div className="mr-4 h-[80px] w-[80px] overflow-hidden rounded-full border-2 border-gray-300 dark:border-gray-600">
      <img
        alt="user"
        loading="lazy"
        width="80"
        height="80"
        className="rounded-full object-cover object-center"
        src="https://erp.erabesa.co.in/uploads/staff_images/10.jpg"
      />
    </div>

    <div className="flex-1">
      <h4 className="text-base font-medium text-black dark:text-white">
        Priyanka Rathod
      </h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">ID: 19007</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">9730081571</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <span data-toggle="tooltip" title="Location" className="cursor-pointer mr-2">
         NA,
        </span>
        <span data-toggle="tooltip" title="Department" className="cursor-pointer">
         Teaching
        </span>
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        <span data-toggle="tooltip" title="Role" className="cursor-pointer mr-2 bg-blue-100 dark:bg-blue-400 p-1 rounded mt-1 mb-1">
          Teacher
        </span>
        <span data-toggle="tooltip" title="Designation" className="cursor-pointer bg-blue-100 dark:bg-blue-400 p-1 rounded mt-1 mb-1">
          Faculty
        </span>
      </p>
    </div>

    <div className="absolute left-1/2 top-1/2 hidden group-hover:flex space-x-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform">
      <IconButton
        className="text-sm px-4 py-2 text-gray-700 bg-blue-100 hover:bg-blue-200 dark:text-gray-200 dark:bg-blue-800 dark:hover:bg-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150"
        aria-label="View"
      >
        <Visibility className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </IconButton>

      <IconButton
        className="text-sm px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150"
        aria-label="Edit"
      >
        <Edit className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </IconButton>
    </div>
  </div>
</div>


<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
  <div className="flex items-center relative group w-full">
    <div className="mr-4 h-[80px] w-[80px] overflow-hidden rounded-full border-2 border-gray-300 dark:border-gray-600">
    <img
                        alt="user"
                        loading="lazy"
                        width="80"
                        height="80"
                        className="rounded-full object-cover object-center"
                        src="https://erp.erabesa.co.in/uploads/staff_images/11.jpg"
                      />
    </div>

    <div className="flex-1">
    <h4 className="text-base font-medium text-black dark:text-white">
                        Rucha Kale
    </h4>
                      <p className="text-sm">19008</p>
                      <p className="text-sm">9730081571</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <span data-toggle="tooltip" title="Location" className="cursor-pointer mr-2">
         NA,
        </span>
        <span data-toggle="tooltip" title="Department" className="cursor-pointer">
         Teaching
        </span>
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        <span data-toggle="tooltip" title="Role" className="cursor-pointer mr-2 bg-blue-100 dark:bg-blue-400 p-1 rounded mt-1 mb-1">
          Teacher
        </span>
        <span data-toggle="tooltip" title="Designation" className="cursor-pointer bg-blue-100 dark:bg-blue-400 p-1 rounded mt-1 mb-1">
          Faculty
        </span>
      </p>
    </div>

    <div className="absolute left-1/2 top-1/2 hidden group-hover:flex space-x-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform">
      <IconButton
        className="text-sm px-4 py-2 text-gray-700 bg-blue-100 hover:bg-blue-200 dark:text-gray-200 dark:bg-blue-800 dark:hover:bg-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150"
        aria-label="View"
      >
        <Visibility className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </IconButton>

      <IconButton
        className="text-sm px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150"
        aria-label="Edit"
      >
        <Edit className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </IconButton>
    </div>
  </div>
</div>



              </div>
            </div>
          )}

          {activeTab === "card" && (
            <div className="leading-relaxed">
              {/* List view with MUIDataTable */}
              <ThemeProvider
                theme={colorMode === "dark" ? darkTheme : lightTheme}
              >
                <MUIDataTable
                  title={"Staff List"}
                  data={data}
                  columns={columns}
                  options={{
                    selectableRows: "none", // Disable row selection

                    count: totalCount,
                    page: page,
                    rowsPerPage: rowsPerPage,
                    onChangePage: handlePageChange,
                    onChangeRowsPerPage: handleRowsPerPageChange,
                  }}
                />
              </ThemeProvider>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default StudentDetails;
