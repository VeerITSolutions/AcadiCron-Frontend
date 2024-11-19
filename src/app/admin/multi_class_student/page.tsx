"use client"; // Enable client-side rendering

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For navigation in the app directory
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetchStudentDisabledData } from "@/services/studentDisabledService";
import { getClasses } from "@/services/classesService";
import { fetchsectionByClassData } from "@/services/sectionsService";
import styles from "./StudentDetails.module.css";

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


      <div className="container mx-auto dark:bg-boxdark dark:drop-shadow-none">
        <h1>addd</h1>
      </div>
     
    </DefaultLayout>
  );
};

export default StudentDetails;
