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
  filter: false, // Disable filter,
  viewColumns: false, // Disable view columns button

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
      <div className="mb-6 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10"> <a
          className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
            activeTab === 'list' ? 'text-primary border-primary' : 'border-transparent'
          }`}
          href="#"
          onClick={() => setActiveTab('list')}
        >
          Card View
        </a>
        <a
          className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
            activeTab === 'card' ? 'text-primary border-primary' : 'border-transparent'
          }`}
          href="#"
          onClick={() => setActiveTab('card')}
        >
          List View
        </a>
       
      </div>

      {/* Content Rendering Based on Active Tab */}
      <div>
        {activeTab === 'list' && (
          <div className="leading-relaxed">
            {/* Card view content goes here */}
            <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-4">
 
  <div className="flex items-center justify-between p-4.5 hover:bg-[#F9FAFB] dark:hover:bg-meta-4">
    <div className="flex items-center">
      <div className="mr-4 h-[80px] w-[80px] overflow-hidden rounded-full">
        <img alt="user" loading="lazy" width="80" height="80" className="rounded-full object-cover object-center" src="https://erp.erabesa.co.in/uploads/staff_images/1.png" />
      </div>
      <div>
        <h4 className="text-base font-medium text-black dark:text-white">Rushali Patil</h4>
        <p className="text-sm">19003</p>
        <p className="text-sm">8446643818</p>
      </div>
    </div>
    <div className="relative flex">
      <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded">
        {/* SVG Icon for three dots */}
        <svg className="fill-current text-gray-600" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5326 16.0338C12.5326 15.1133 11.7864 14.3671 10.8659 14.3671C9.94541 14.3671 9.19922 15.1133 9.19922 16.0338C9.19922 16.9542 9.94541 17.7004 10.8659 17.7004C11.7864 17.7004 12.5326 16.9542 12.5326 16.0338Z" fill="currentColor"></path>
          <path d="M12.5326 10.2005C12.5326 9.28005 11.7864 8.53385 10.8659 8.53385C9.94541 8.53385 9.19922 9.28005 9.19922 10.2005C9.19922 11.121 9.94541 11.8672 10.8659 11.8672C11.7864 11.8672 12.5326 11.121 12.5326 10.2005Z" fill="currentColor"></path>
          <path d="M12.5326 4.36702C12.5326 3.44655 11.7864 2.70036 10.8659 2.70036C9.94541 2.70036 9.19922 3.44655 9.19922 4.36703C9.19922 5.2875 9.94541 6.03369 10.8659 6.03369C11.7864 6.03369 12.5326 5.2875 12.5326 4.36702Z" fill="currentColor"></path>
        </svg>
      </button>
      {/* Edit/Delete Menu */}
      <div className="absolute right-0 top-full z-40 w-37.5 space-y-1 rounded bg-white p-2 shadow-card dark:bg-boxdark-2 hidden">
        <button className="w-full rounded px-3 py-1.5 text-left text-sm hover:bg-gray-2 dark:hover:bg-graydark">Edit</button>
        <button className="w-full rounded px-3 py-1.5 text-left text-sm hover:bg-gray-2 dark:hover:bg-graydark">Delete</button>
      </div>
    </div>
  </div>


    <div className="flex items-center justify-between p-4.5 hover:bg-[#F9FAFB] dark:hover:bg-meta-4">
    <div className="flex items-center">
      <div className="mr-4 h-[80px] w-[80px] overflow-hidden rounded-full">
        <img alt="user" loading="lazy" width="80" height="80" className="rounded-full object-cover object-center" src="https://erp.erabesa.co.in/uploads/staff_images/default_female.jpg" />
      </div>
      <div>
        <h4 className="text-base font-medium text-black dark:text-white">Priya Ronghe</h4>
        <p className="text-sm">19001</p>
        <p className="text-sm">9130683314</p>
      </div>
    </div>
    <div className="relative flex">
      <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded">
        {/* SVG Icon for three dots */}
        <svg className="fill-current text-gray-600" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5326 16.0338C12.5326 15.1133 11.7864 14.3671 10.8659 14.3671C9.94541 14.3671 9.19922 15.1133 9.19922 16.0338C9.19922 16.9542 9.94541 17.7004 10.8659 17.7004C11.7864 17.7004 12.5326 16.9542 12.5326 16.0338Z" fill="currentColor"></path>
          <path d="M12.5326 10.2005C12.5326 9.28005 11.7864 8.53385 10.8659 8.53385C9.94541 8.53385 9.19922 9.28005 9.19922 10.2005C9.19922 11.121 9.94541 11.8672 10.8659 11.8672C11.7864 11.8672 12.5326 11.121 12.5326 10.2005Z" fill="currentColor"></path>
          <path d="M12.5326 4.36702C12.5326 3.44655 11.7864 2.70036 10.8659 2.70036C9.94541 2.70036 9.19922 3.44655 9.19922 4.36703C9.19922 5.2875 9.94541 6.03369 10.8659 6.03369C11.7864 6.03369 12.5326 5.2875 12.5326 4.36702Z" fill="currentColor"></path>
        </svg>
      </button>
      {/* Edit/Delete Menu */}
      <div className="absolute right-0 top-full z-40 w-37.5 space-y-1 rounded bg-white p-2 shadow-card dark:bg-boxdark-2 hidden">
        <button className="w-full rounded px-3 py-1.5 text-left text-sm hover:bg-gray-2 dark:hover:bg-graydark">Edit</button>
        <button className="w-full rounded px-3 py-1.5 text-left text-sm hover:bg-gray-2 dark:hover:bg-graydark">Delete</button>
      </div>
    </div>
  </div>


    <div className="flex items-center justify-between p-4.5 hover:bg-[#F9FAFB] dark:hover:bg-meta-4">
    <div className="flex items-center">
      <div className="mr-4 h-[80px] w-[80px] overflow-hidden rounded-full">
        <img alt="user" loading="lazy" width="80" height="80" className="rounded-full object-cover object-center" src="https://erp.erabesa.co.in/uploads/staff_images/5.jpg" />
      </div>
      <div>
        <h4 className="text-base font-medium text-black dark:text-white">Harshalata Khante</h4>
        <p className="text-sm">19002</p>
        <p className="text-sm">9623783502</p>
      </div>
    </div>
    <div className="relative flex">
      <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded">
        {/* SVG Icon for three dots */}
        <svg className="fill-current text-gray-600" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5326 16.0338C12.5326 15.1133 11.7864 14.3671 10.8659 14.3671C9.94541 14.3671 9.19922 15.1133 9.19922 16.0338C9.19922 16.9542 9.94541 17.7004 10.8659 17.7004C11.7864 17.7004 12.5326 16.9542 12.5326 16.0338Z" fill="currentColor"></path>
          <path d="M12.5326 10.2005C12.5326 9.28005 11.7864 8.53385 10.8659 8.53385C9.94541 8.53385 9.19922 9.28005 9.19922 10.2005C9.19922 11.121 9.94541 11.8672 10.8659 11.8672C11.7864 11.8672 12.5326 11.121 12.5326 10.2005Z" fill="currentColor"></path>
          <path d="M12.5326 4.36702C12.5326 3.44655 11.7864 2.70036 10.8659 2.70036C9.94541 2.70036 9.19922 3.44655 9.19922 4.36703C9.19922 5.2875 9.94541 6.03369 10.8659 6.03369C11.7864 6.03369 12.5326 5.2875 12.5326 4.36702Z" fill="currentColor"></path>
        </svg>
      </button>
      {/* Edit/Delete Menu */}
      <div className="absolute right-0 top-full z-40 w-37.5 space-y-1 rounded bg-white p-2 shadow-card dark:bg-boxdark-2 hidden">
        <button className="w-full rounded px-3 py-1.5 text-left text-sm hover:bg-gray-2 dark:hover:bg-graydark">Edit</button>
        <button className="w-full rounded px-3 py-1.5 text-left text-sm hover:bg-gray-2 dark:hover:bg-graydark">Delete</button>
      </div>
    </div>
  </div>

 
  <div className="flex items-center justify-between p-4.5 hover:bg-[#F9FAFB] dark:hover:bg-meta-4">
    <div className="flex items-center">
      <div className="mr-4 h-[80px] w-[80px] overflow-hidden rounded-full">
        <img alt="user" loading="lazy" width="80" height="80" className="rounded-full object-cover object-center"
          src="https://erp.erabesa.co.in/uploads/staff_images/6.jpg" />
      </div>
      <div>
        <h4 className="text-base font-medium text-black dark:text-white">Rushali Patil</h4>
        <p className="text-sm">19003</p>
        <p className="text-sm">8446643818</p>
      </div>
    </div>
    <div className="relative flex">
      <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded">
        {/* SVG Icon for three dots */}
        <svg className="fill-current text-gray-600" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5326 16.0338C12.5326 15.1133 11.7864 14.3671 10.8659 14.3671C9.94541 14.3671 9.19922 15.1133 9.19922 16.0338C9.19922 16.9542 9.94541 17.7004 10.8659 17.7004C11.7864 17.7004 12.5326 16.9542 12.5326 16.0338Z" fill="currentColor"></path>
          <path d="M12.5326 10.2005C12.5326 9.28005 11.7864 8.53385 10.8659 8.53385C9.94541 8.53385 9.19922 9.28005 9.19922 10.2005C9.19922 11.121 9.94541 11.8672 10.8659 11.8672C11.7864 11.8672 12.5326 11.121 12.5326 10.2005Z" fill="currentColor"></path>
          <path d="M12.5326 4.36702C12.5326 3.44655 11.7864 2.70036 10.8659 2.70036C9.94541 2.70036 9.19922 3.44655 9.19922 4.36703C9.19922 5.2875 9.94541 6.03369 10.8659 6.03369C11.7864 6.03369 12.5326 5.2875 12.5326 4.36702Z" fill="currentColor"></path>
        </svg>
      </button>
      {/* Edit/Delete Menu */}
      <div className="absolute right-0 top-full z-40 w-37.5 space-y-1 rounded bg-white p-2 shadow-card dark:bg-boxdark-2 hidden">
        <button className="w-full rounded px-3 py-1.5 text-left text-sm hover:bg-gray-2 dark:hover:bg-graydark">Edit</button>
        <button className="w-full rounded px-3 py-1.5 text-left text-sm hover:bg-gray-2 dark:hover:bg-graydark">Delete</button>
      </div>
    </div>
  </div>

  <div className="flex items-center justify-between p-4.5 hover:bg-[#F9FAFB] dark:hover:bg-meta-4">
    <div className="flex items-center">
      <div className="mr-4 h-[80px] w-[80px] overflow-hidden rounded-full">
        <img alt="user" loading="lazy" width="80" height="80" className="rounded-full object-cover object-center" src="https://erp.erabesa.co.in/uploads/staff_images/8.jpg" />
      </div>
      <div>
        <h4 className="text-base font-medium text-black dark:text-white">Tabassum Firdous</h4>
        <p className="text-sm">19005</p>
        <p className="text-sm">7843079790</p>
      </div>
    </div>
    <div className="relative flex">
      <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded">
        {/* SVG Icon for three dots */}
        <svg className="fill-current text-gray-600" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5326 16.0338C12.5326 15.1133 11.7864 14.3671 10.8659 14.3671C9.94541 14.3671 9.19922 15.1133 9.19922 16.0338C9.19922 16.9542 9.94541 17.7004 10.8659 17.7004C11.7864 17.7004 12.5326 16.9542 12.5326 16.0338Z" fill="currentColor"></path>
          <path d="M12.5326 10.2005C12.5326 9.28005 11.7864 8.53385 10.8659 8.53385C9.94541 8.53385 9.19922 9.28005 9.19922 10.2005C9.19922 11.121 9.94541 11.8672 10.8659 11.8672C11.7864 11.8672 12.5326 11.121 12.5326 10.2005Z" fill="currentColor"></path>
          <path d="M12.5326 4.36702C12.5326 3.44655 11.7864 2.70036 10.8659 2.70036C9.94541 2.70036 9.19922 3.44655 9.19922 4.36703C9.19922 5.2875 9.94541 6.03369 10.8659 6.03369C11.7864 6.03369 12.5326 5.2875 12.5326 4.36702Z" fill="currentColor"></path>
        </svg>
      </button>
      {/* Edit/Delete Menu */}
      <div className="absolute right-0 top-full z-40 w-37.5 space-y-1 rounded bg-white p-2 shadow-card dark:bg-boxdark-2 hidden">
        <button className="w-full rounded px-3 py-1.5 text-left text-sm hover:bg-gray-2 dark:hover:bg-graydark">Edit</button>
        <button className="w-full rounded px-3 py-1.5 text-left text-sm hover:bg-gray-2 dark:hover:bg-graydark">Delete</button>
      </div>
    </div>
  </div>

  <div className="flex items-center justify-between p-4.5 hover:bg-[#F9FAFB] dark:hover:bg-meta-4">
    <div className="flex items-center">
      <div className="mr-4 h-[80px] w-[80px] overflow-hidden rounded-full">
        <img alt="user" loading="lazy" width="80" height="80" className="rounded-full object-cover object-center" src="https://erp.erabesa.co.in/uploads/staff_images/9.jpg" />
      </div>
      <div>
        <h4 className="text-base font-medium text-black dark:text-white">Kalpana Kharabe</h4>
        <p className="text-sm">19006</p>
        <p className="text-sm">8317255143</p>
      </div>
    </div>
    <div className="relative flex">
      <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded">
        {/* SVG Icon for three dots */}
        <svg className="fill-current text-gray-600" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5326 16.0338C12.5326 15.1133 11.7864 14.3671 10.8659 14.3671C9.94541 14.3671 9.19922 15.1133 9.19922 16.0338C9.19922 16.9542 9.94541 17.7004 10.8659 17.7004C11.7864 17.7004 12.5326 16.9542 12.5326 16.0338Z" fill="currentColor"></path>
          <path d="M12.5326 10.2005C12.5326 9.28005 11.7864 8.53385 10.8659 8.53385C9.94541 8.53385 9.19922 9.28005 9.19922 10.2005C9.19922 11.121 9.94541 11.8672 10.8659 11.8672C11.7864 11.8672 12.5326 11.121 12.5326 10.2005Z" fill="currentColor"></path>
          <path d="M12.5326 4.36702C12.5326 3.44655 11.7864 2.70036 10.8659 2.70036C9.94541 2.70036 9.19922 3.44655 9.19922 4.36703C9.19922 5.2875 9.94541 6.03369 10.8659 6.03369C11.7864 6.03369 12.5326 5.2875 12.5326 4.36702Z" fill="currentColor"></path>
        </svg>
      </button>
      {/* Edit/Delete Menu */}
      <div className="absolute right-0 top-full z-40 w-37.5 space-y-1 rounded bg-white p-2 shadow-card dark:bg-boxdark-2 hidden">
        <button className="w-full rounded px-3 py-1.5 text-left text-sm hover:bg-gray-2 dark:hover:bg-graydark">Edit</button>
        <button className="w-full rounded px-3 py-1.5 text-left text-sm hover:bg-gray-2 dark:hover:bg-graydark">Delete</button>
      </div>
    </div>
  </div>

  <div className="flex items-center justify-between p-4.5 hover:bg-[#F9FAFB] dark:hover:bg-meta-4">
    <div className="flex items-center">
      <div className="mr-4 h-[80px] w-[80px] overflow-hidden rounded-full">
        <img alt="user" loading="lazy" width="80" height="80" className="rounded-full object-cover object-center" src="https://erp.erabesa.co.in/uploads/staff_images/10.jpg" />
      </div>
      <div>
        <h4 className="text-base font-medium text-black dark:text-white">Priyanka Rathod</h4>
        <p className="text-sm">19007</p>
        <p className="text-sm">9730081571</p>
      </div>
    </div>
    <div className="relative flex">
      <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded">
        {/* SVG Icon for three dots */}
        <svg className="fill-current text-gray-600" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5326 16.0338C12.5326 15.1133 11.7864 14.3671 10.8659 14.3671C9.94541 14.3671 9.19922 15.1133 9.19922 16.0338C9.19922 16.9542 9.94541 17.7004 10.8659 17.7004C11.7864 17.7004 12.5326 16.9542 12.5326 16.0338Z" fill="currentColor"></path>
          <path d="M12.5326 10.2005C12.5326 9.28005 11.7864 8.53385 10.8659 8.53385C9.94541 8.53385 9.19922 9.28005 9.19922 10.2005C9.19922 11.121 9.94541 11.8672 10.8659 11.8672C11.7864 11.8672 12.5326 11.121 12.5326 10.2005Z" fill="currentColor"></path>
          <path d="M12.5326 4.36702C12.5326 3.44655 11.7864 2.70036 10.8659 2.70036C9.94541 2.70036 9.19922 3.44655 9.19922 4.36703C9.19922 5.2875 9.94541 6.03369 10.8659 6.03369C11.7864 6.03369 12.5326 5.2875 12.5326 4.36702Z" fill="currentColor"></path>
        </svg>
      </button>
      {/* Edit/Delete Menu */}
      <div className="absolute right-0 top-full z-40 w-37.5 space-y-1 rounded bg-white p-2 shadow-card dark:bg-boxdark-2 hidden">
        <button className="w-full rounded px-3 py-1.5 text-left text-sm hover:bg-gray-2 dark:hover:bg-graydark">Edit</button>
        <button className="w-full rounded px-3 py-1.5 text-left text-sm hover:bg-gray-2 dark:hover:bg-graydark">Delete</button>
      </div>
    </div>
  </div>


  <div className="flex items-center justify-between p-4.5 hover:bg-[#F9FAFB] dark:hover:bg-meta-4">
    <div className="flex items-center">
      <div className="mr-4 h-[80px] w-[80px] overflow-hidden rounded-full">
        <img alt="user" loading="lazy" width="80" height="80" className="rounded-full object-cover object-center" src="https://erp.erabesa.co.in/uploads/staff_images/11.jpg" />
      </div>
      <div>
        <h4 className="text-base font-medium text-black dark:text-white">Rucha Kale</h4>
        <p className="text-sm">19008</p>
        <p className="text-sm">9730081571</p>
      </div>
    </div>
    <div className="relative flex">
      <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded">
        {/* SVG Icon for three dots */}
        <svg className="fill-current text-gray-600" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5326 16.0338C12.5326 15.1133 11.7864 14.3671 10.8659 14.3671C9.94541 14.3671 9.19922 15.1133 9.19922 16.0338C9.19922 16.9542 9.94541 17.7004 10.8659 17.7004C11.7864 17.7004 12.5326 16.9542 12.5326 16.0338Z" fill="currentColor"></path>
          <path d="M12.5326 10.2005C12.5326 9.28005 11.7864 8.53385 10.8659 8.53385C9.94541 8.53385 9.19922 9.28005 9.19922 10.2005C9.19922 11.121 9.94541 11.8672 10.8659 11.8672C11.7864 11.8672 12.5326 11.121 12.5326 10.2005Z" fill="currentColor"></path>
          <path d="M12.5326 4.36702C12.5326 3.44655 11.7864 2.70036 10.8659 2.70036C9.94541 2.70036 9.19922 3.44655 9.19922 4.36703C9.19922 5.2875 9.94541 6.03369 10.8659 6.03369C11.7864 6.03369 12.5326 5.2875 12.5326 4.36702Z" fill="currentColor"></path>
        </svg>
      </button>
      {/* Edit/Delete Menu */}
      <div className="absolute right-0 top-full z-40 w-37.5 space-y-1 rounded bg-white p-2 shadow-card dark:bg-boxdark-2">
        <button className="w-full rounded px-3 py-1.5 text-left text-sm hover:bg-gray-2 dark:hover:bg-graydark">Edit</button>
        <button className="w-full rounded px-3 py-1.5 text-left text-sm hover:bg-gray-2 dark:hover:bg-graydark">Delete</button>
      </div>
    </div>
  </div>

</div>
          </div>
        )}

        {activeTab === 'card' && (
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
