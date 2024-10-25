"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { fetchStudentData } from "@/services/studentService";
import styles from "./StudentDetails.module.css"; // Import CSS module
import Loader from "@/components/common/Loader";
import { getClasses } from "@/services/classesService";
import { fetchsectionByClassData } from "@/services/sectionsService";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'; // Import close icon

const columns = [
  "Student Name",
  "Class",
  "Section",
  "Apply Date",
  "From Date",
  "To Date",
  "Status",
  "Approve By",
  "Action",
];

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
};

const StudentDetails = () => {
  const [data, setData] = useState<Array<Array<string>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(undefined);
  const [selectedSection, setSelectedSection] = useState<string | undefined>(undefined);
  const [keyword, setKeyword] = useState<string>("");
  const [classes, setClassesData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [colorMode] = useColorMode();

  // New state for the dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

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

  const fetchData = async (currentPage: number, rowsPerPage: number, selectedClass?: string, selectedSection?: string, keyword?: string) => {
    try {
      const result = await fetchStudentData(currentPage + 1, rowsPerPage, selectedClass, selectedSection, keyword);
      setTotalCount(result.totalCount);
      const formattedData = formatStudentData(result.data);
      setData(formattedData);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleAddStudent = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    // Reset form fields
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic (e.g., API call)
    console.log("Contact Name:", contactName);
    console.log("Contact Email:", contactEmail);
    console.log("Contact Message:", contactMessage);
    // Optionally close the dialog after submission
    handleCloseDialog();
  };

  useEffect(() => {
    fetchData(page, rowsPerPage, selectedClass, selectedSection, keyword);
  }, [page, rowsPerPage, token, selectedClass, selectedSection, keyword]);

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

  const handleRefresh = () => {
    setSelectedClass("");
    setSelectedSection("");
    setKeyword("");
  };

  useEffect(() => {
    fetchClassesAndSections(); // Fetch classes and sections on initial render
  }, [selectedClass]);

  const fetchClassesAndSections = async () => {
    try {
      const classesResult = await getClasses();
      setClassesData(classesResult.data);
      // Fetch sections if a class is selected
      if (selectedClass) {
        const sectionsResult = await fetchsectionByClassData(selectedClass);
        setSections(sectionsResult.data);
      } else {
        setSections([]); // Clear sections if no class is selected
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>
            Class:
            <select
              value={selectedClass || ""}
              onChange={handleClassChange}
              className={styles.select}
            >
              <option value="">Select</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.class}
                </option>
              ))}
            </select>
          </label>
          
          <label className={styles.label}>
            Section:
            <select
              value={selectedSection || ""}
              onChange={handleSectionChange}
              className={styles.select}
              disabled={!selectedClass} // Disable section dropdown if no class is selected
            >
              <option value="">Select</option>
              {section.map((sec) => (
                <option key={sec.section_id} value={sec.section_id}>
                  {sec.section_name}
                </option>
              ))}
            </select>
          </label>

          {/* Attendance Date field */}
          <label className={styles.label}>
            Attendance Date:
            <input
              type="date"
              className={styles.select}
            />
          </label>

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
            <button onClick={handleRefresh} className={styles.searchButton}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="dark:bg-boxdark dark:drop-shadow-none dark:text-white dark:border-strokedark bg-[#F8F8F8]" style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 14px',
 
 
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}} >
 <h6 style={{
  margin: 0,
  fontSize: '1.25rem',
  lineHeight: '1.75rem',
  fontFamily: 'Satoshi',
  fontWeight: 600,
}}>
  Approve Leave List
</h6>

  <button onClick={handleAddStudent} className="StudentDetails_searchButton__UQjAD">
    Add
  </button>
</div>


      <ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
        <MUIDataTable
          title={""} // You can leave this empty since you have a custom title above
          data={data}
          columns={columns}
          options={{
            ...options,
            count: totalCount,
            page: page,
            rowsPerPage: rowsPerPage,
            onChangePage: setPage,
            onChangeRowsPerPage: setRowsPerPage,
          }}
        />
      </ThemeProvider>

      {/* Dialog for Contact Form */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} className="dark:bg-boxdark dark:drop-shadow-none">
        <DialogTitle className="dark:bg-boxdark dark:drop-shadow-none dark:text-white">
        Add Leave
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="dark:bg-boxdark dark:drop-shadow-none">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-5 p-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Class Dropdown */}
        <div>
            <label htmlFor="class" className="mb-3 block text-sm font-medium text-black dark:text-white">
                Class<span className="ml-1 req">*</span>
            </label>
            <select
                        value={selectedClass || ""}
                        onChange={handleClassChange}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        <option value="">Select</option>
                        {classes.map((cls) => (
                          <option key={cls.id} value={cls.id}>
                            {cls.class}
                          </option>
                        ))}
                      </select>
        </div>

        {/* Section Dropdown */}
        <div>
            <label htmlFor="section_id" className="mb-3 block text-sm font-medium text-black dark:text-white">
                Section<span className="ml-1 req">*</span>
            </label>
            <select
                        value={selectedSection || ""}
                        onChange={handleSectionChange}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        disabled={!selectedClass} // Disable section dropdown if no class is selected
                      >
                        <option value="">Select</option>
                        {section.map((sec) => (
                          <option key={sec.section_id} value={sec.section_id}>
                            {sec.section_name}
                          </option>
                        ))}
                      </select>
        </div>

        {/* Student Dropdown */}
        <div>
            <label htmlFor="student" className="mb-3 block text-sm font-medium text-black dark:text-white">
                Student<span className="ml-1 req">*</span>
            </label>
            <select
                name="student"
                id="student"
                className="w-full rounded border-[1.5px] border-stroke px-5 py-3 font-normal bg-transparent dark:border-form-strokedark dark:bg-form-input focus:border-primary dark:focus:border-primary dark:text-white"
            >
                <option value="">Select</option>
                {/* Dynamically populated options */}
            </select>
        </div>

        {/* Apply Date Field */}
        <div>
            <label htmlFor="apply_date" className="mb-3 block text-sm font-medium text-black dark:text-white">
                Apply Date<span className="ml-1 req">*</span>
            </label>
            <input
                type="text"
                name="apply_date"
                id="apply_date"
                className="form-datepicker w-full rounded border-[1.5px] border-stroke px-5 py-3 font-normal bg-transparent dark:border-form-strokedark dark:bg-form-input focus:border-primary dark:focus:border-primary dark:text-white"
                placeholder="mm-dd-yyyy"
            />
        </div>

        {/* From Date Field */}
        <div>
            <label htmlFor="from_date" className="mb-3 block text-sm font-medium text-black dark:text-white">
                From Date<span className="ml-1 req">*</span>
            </label>
            <input
                type="text"
                name="from_date"
                id="from_date"
                className="form-datepicker w-full rounded border-[1.5px] border-stroke px-5 py-3 font-normal bg-transparent dark:border-form-strokedark dark:bg-form-input focus:border-primary dark:focus:border-primary dark:text-white"
                placeholder="mm-dd-yyyy"
            />
        </div>

        {/* To Date Field */}
        <div>
            <label htmlFor="to_date" className="mb-3 block text-sm font-medium text-black dark:text-white">
                To Date<span className="ml-1 req">*</span>
            </label>
            <input
                type="text"
                name="to_date"
                id="to_date"
                className="form-datepicker w-full rounded border-[1.5px] border-stroke px-5 py-3 font-normal bg-transparent dark:border-form-strokedark dark:bg-form-input focus:border-primary dark:focus:border-primary dark:text-white"
                placeholder="mm-dd-yyyy"
            />
        </div>

        {/* Reason Field */}
        <div className="md:col-span-3">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Reason</label>
      <input
        name="reason"
        type="text"
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    
      />
        </div>

        {/* Document Upload Field */}
        <div className="md:col-span-3">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Attach Document</label>
      <input
        className="dark:text-white"
        type="file"
        name="document_file"
        id="document_file"
      />
        </div>
    </div>

    {/* Save Button */}
    <div className="flex justify-end mt-6">
        <button
            type="submit"
            className="bg-[#1976D2] text-white py-2 px-4 rounded hover:bg-[#155ba0] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
            Save
        </button>
    </div>
</div>
</div>

        </DialogContent>
      </Dialog>
    </DefaultLayout>
  );
};

export default StudentDetails;
