"use client"; // Enable client-side rendering

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For navigation in the app directory
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetchStudentDisabledData } from "@/services/studentDisabledService";
import { getClasses } from "@/services/classesService";
import { fetchsectionByClassData } from "@/services/sectionsService";
import styles from "./StudentDetails.module.css";
import DeleteIcon from '@mui/icons-material/Delete';
import {Add, Remove, Calculate } from "@mui/icons-material";  // Import Calculate icon

const StudentDetails = () => {
  const [studentsData, setStudentsData] = useState<Array<Array<string>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [classes, setClassesData] = useState<Array<any>>([]);
  const [sections, setSectionsData] = useState<Array<any>>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>("");
  const [selectedSection, setSelectedSection] = useState<string | undefined>("");
  const [keyword, setKeyword] = useState<string>("");

  const router = useRouter();

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    setPage(0);
  };

  const handleSearch = () => {
    setPage(0);
    fetchData(0, rowsPerPage, selectedClass, selectedSection, keyword);
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
    setPage(0);
  };

  const handleRefresh = () => {
    setSelectedClass("");
    setSelectedSection("");
    setKeyword("");
    fetchData(0, rowsPerPage);
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.admission_no,
      `${student.firstname.trim()} ${student.lastname.trim()}`,
      student.class || "N/A",
      student.father_name || "N/A",
      student.gender || "N/A",
      student.mobileno,
    ]);
  };

  useEffect(() => {
    fetchClassesAndSections();
  }, [selectedClass]);

  const fetchClassesAndSections = async () => {
    try {
      const classesResult = await getClasses();
      setClassesData(classesResult.data);

      if (selectedClass) {
        const sectionsResult = await fetchsectionByClassData(selectedClass);
        setSectionsData(sectionsResult.data);
      } else {
        setSectionsData([]);
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchData = async (
    currentPage: number,
    rowsPerPage: number,
    selectedClass?: string,
    selectedSection?: string,
    keyword?: string
  ) => {
    try {
      const result = await fetchStudentDisabledData(
        currentPage + 1,
        rowsPerPage,
        selectedClass,
        selectedSection,
        keyword
      );
      setTotalCount(result.totalCount);
      const formattedData = formatStudentData(result.data);
      setStudentsData(formattedData);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const [rows, setRows] = useState(() => {
    // Initialize with one row only
    return [{ id: 1, classId: "", sectionId: "" }];
  });

  const classOptions = [
    { id: 1, name: "Class 1" },
    { id: 2, name: "Class 2" },
    { id: 3, name: "Class 3" },
  ];

  const sectionOptions = [
    { id: 1, name: "Bright" },
    { id: 2, name: "Brilliant" },
    { id: 3, name: "Brainy" },
  ];

  // Save rows to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("rows", JSON.stringify(rows));
    }
  }, [rows]);

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, classId: "", sectionId: "" },
    ]);
  };

  const handleRemoveRow = (id: any) => {
    const updatedRows = rows.filter((row: any) => row.id !== id);
    setRows(updatedRows.length > 0 ? updatedRows : [{ id: 1, classId: "", sectionId: "" }]);
  };

  const handleChange = (id: any, field: any, value: any) => {
    setRows(
      rows.map((row: any) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  return (
    <DefaultLayout>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>
            Class:
            <select
              value={selectedClass || ""}
              onChange={handleClassChange}
              className={`${styles.select} dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none`}
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
              className={`${styles.select} dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none`}
              disabled={!selectedClass}
            >
              <option value="">Select</option>
              {sections.map((sec) => (
                <option key={sec.section_id} value={sec.section_id}>
                  {sec.section_name}
                </option>
              ))}
            </select>
          </label>
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
            <button onClick={handleRefresh} className={styles.searchButton}>
              Reset
            </button>
          </div>
        </div>
      </div>

   
      <div className="grid grid-cols-2 gap-6 mb-6 ">
    
      <form
  action="https://erp.erabesa.co.in/student/savemulticlass"
  method="POST"
  className="border border-stroke rounded shadow-md dark:border-strokedark bg-white flex flex-col h-[400px] dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white" 
>
  <div className="flex flex-col justify-between p-4 h-[400px]"> 
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <h3 className="text-small font-semibold">Aaradhya Korde (794)</h3>
      </div>
      <button
        type="button"
        onClick={handleAddRow}
        className="btn-primary w-5 h-5 flex justify-center items-center rounded bg-blue-500 hover:bg-blue-600"
      >
        <Add className="text-white text-xs" />
      </button>
    </div>

    <input type="hidden" name="student_id" value="993" />
    <input type="hidden" name="nxt_row" className="nxt_row" value={rows.length} />

    <div className="flex flex-col gap-4 max-w-full flex-grow overflow-y-auto">
      {rows.map((row: any) => (
        <div key={row.id} className="flex items-center gap-4 w-full">
          <input type="hidden" name="row_count[]" value={row.id} />
          <div className="flex-1">
            <label
              htmlFor={`class_id_${row.id}`}
              className="mb-3 block text-sm font-medium text-black dark:text-white"
            >
              Class
            </label>
            <select
              id={`class_id_${row.id}`}
              name={`class_id_${row.id}`}
              value={row.classId}
              onChange={(e) => handleChange(row.id, 'classId', e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="">Select</option>
              {classOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor={`section_id_${row.id}`}
              className="mb-3 block text-sm font-medium text-black dark:text-white"
            >
              Section
            </label>
            <select
              id={`section_id_${row.id}`}
              name={`section_id_${row.id}`}
              value={row.sectionId}
              onChange={(e) => handleChange(row.id, 'sectionId', e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="">Select</option>
              {sectionOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-8 flex items-center justify-center w-[5%]">
            <button
              type="button"
              onClick={() => handleRemoveRow(rows[rows.length - 1]?.id)}
              className="btn-error py-2 rounded flex items-center"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  <div className="text-left bg-[#C1C1C1] p-4 mt-auto bottom-0 w-full dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white">
  <button
    type="submit"
    className="text-white btn-primary flex items-center gap-1 rounded bg-blue-500 hover:bg-blue-600 py-2 px-4 text-sm"
  >
    Update
  </button>
</div>

</form>




<form
  action="https://erp.erabesa.co.in/student/savemulticlass"
  method="POST"
  className="border border-stroke rounded shadow-md dark:border-strokedark bg-white flex flex-col h-[400px] dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white" 
>
  <div className="flex flex-col justify-between p-4 h-[400px]"> 
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <h3 className="text-small font-semibold">Tejasvi Bhendarkar (792)</h3>
      </div>
      <button
        type="button"
        onClick={handleAddRow}
        className="btn-primary w-5 h-5 flex justify-center items-center rounded bg-blue-500 hover:bg-blue-600"
      >
        <Add className="text-white text-xs" />
      </button>
    </div>

    <input type="hidden" name="student_id" value="993" />
    <input type="hidden" name="nxt_row" className="nxt_row" value={rows.length} />

    <div className="flex flex-col gap-4 max-w-full flex-grow overflow-y-auto">
      {rows.map((row: any) => (
        <div key={row.id} className="flex items-center gap-4 w-full">
          <input type="hidden" name="row_count[]" value={row.id} />
          <div className="flex-1">
            <label
              htmlFor={`class_id_${row.id}`}
              className="mb-3 block text-sm font-medium text-black dark:text-white"
            >
              Class
            </label>
            <select
              id={`class_id_${row.id}`}
              name={`class_id_${row.id}`}
              value={row.classId}
              onChange={(e) => handleChange(row.id, 'classId', e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="">Select</option>
              {classOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor={`section_id_${row.id}`}
              className="mb-3 block text-sm font-medium text-black dark:text-white"
            >
              Section
            </label>
            <select
              id={`section_id_${row.id}`}
              name={`section_id_${row.id}`}
              value={row.sectionId}
              onChange={(e) => handleChange(row.id, 'sectionId', e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="">Select</option>
              {sectionOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-8 flex items-center justify-center w-[5%]">
            <button
              type="button"
              onClick={() => handleRemoveRow(rows[rows.length - 1]?.id)}
              className="btn-error py-2 rounded flex items-center"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  <div className="text-left bg-[#C1C1C1] p-4 mt-auto bottom-0 w-full dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white">
  <button
    type="submit"
    className="text-white btn-primary flex items-center gap-1 rounded bg-blue-500 hover:bg-blue-600 py-2 px-4 text-sm"
  >
    Update
  </button>
</div>
</form>
</div>

    </DefaultLayout>
  );
};

export default StudentDetails;
