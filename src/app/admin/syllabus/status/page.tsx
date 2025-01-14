"use client";
import { useState, useEffect } from "react";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import "flatpickr/dist/themes/material_blue.css"; // Import the Flatpickr theme
import "flatpickr/dist/flatpickr.css"; // You can use other themes too
import { getClasses } from "@/services/classesService";
import { fetchsectionByClassData } from "@/services/sectionsService";
import { fetchHomeWorkData } from "@/services/homeworkServices";
import { fetchSubjectGroupData } from "@/services/subjectGroupService";
import { fetchSubjectData } from "@/services/subjectsService";
import styles from "./StudentDetails.module.css"; // Import CSS module
import Loader from "@/components/common/Loader";
import { getLessonBySubjectId } from "@/services/lessonService";
import { useLoginDetails } from "@/store/logoStore";

const StudentDetails = () => {
  const [data, setData] = useState<Array<Array<string>>>([]);
  const { themType, setThemType } = useGlobalState(); //

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [subjectGroup, setSubjectGroup] = useState<Array<any>>([]);
  const [subject, setSubject] = useState<Array<any>>([]);

  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [selectedSubjectGroup, setSelectedSubjectGroup] = useState<
    string | undefined
  >(undefined);
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>(
    undefined,
  );
  const [enabled, setEnabled] = useState(false);

  const handleToggleChange = (index: number) => {
    const updatedStates = [...toggleStates];
    updatedStates[index] = !updatedStates[index];
    setToggleStates(updatedStates);
  };
  const [keyword, setKeyword] = useState<string>("");
  const getselectedSessionId = useLoginDetails(
    (state) => state.selectedSessionId,
  );
  const columns = [
    "#",
    "Lesson - Topic",
    "Topic Completion Date",
    "Status",
    "Action",
  ];

  const options = {
    filterType: false,
    serverSide: true,
    pagination: false,
    responsive: "standard",
    search: false,
    selectableRows: "none",
    filter: false,
    viewColumns: false,
  };

  /* use Effect  */

  useEffect(() => {
    fetchData(
      page,
      rowsPerPage,
      selectedClass,
      selectedSection,
      selectedSubjectGroup,
      selectedSubject,
      keyword,
    );
  }, [
    page,
    rowsPerPage,
    selectedClass,
    selectedSection,
    selectedSubjectGroup,
    selectedSubject,
    keyword,
  ]);

  useEffect(() => {
    fetchClassesAndSections(); // Fetch classes and sections on initial render
  }, [selectedClass]);

  /* use effect End  */
  const [toggleStates, setToggleStates] = useState(
    data.map(() => false), // Initialize all toggles to `false`
  );

  const formatStudentData = (students: any[]) => {
    return students.map((student: any, index: number) => [
      index + 1, // Incrementing the index to start from 1 instead of 0
      student.name,
      "",
      "",
      <div key={`toggle-${index}`}>
        <label
          htmlFor={`toggle-${index}`}
          className="flex select-none items-center"
        >
          <div className="relative">
            <input
              id={`toggle-${index}`} // Dynamic id
              type="checkbox"
              className="sr-only"
              checked={toggleStates[index]} // Bind to the current student's toggle state
              onChange={() => handleToggleChange(index)} // Update state for this toggle
            />
            {/* Toggle Background */}
            <div
              className={`h-5 w-14 cursor-pointer rounded-full shadow-inner transition ${
                toggleStates[index]
                  ? "bg-green-500"
                  : "bg-meta-9 dark:bg-[#5A616B]"
              }`}
            ></div>
            {/* Toggle Handle */}
            <div
              className={`absolute -top-1 left-0 h-7 w-7 transform cursor-pointer rounded-full bg-white shadow-switch-1 transition ${
                toggleStates[index]
                  ? "translate-x-full bg-primary dark:bg-white"
                  : ""
              }`}
            ></div>
          </div>
        </label>
      </div>,
    ]);
  };

  const fetchData = async (
    currentPage: number,
    rowsPerPage: number,
    selectedClass?: string,
    selectedSection?: string,
    selectedSubjectGroup?: string,
    selectedSubject?: string,
    keyword?: string,
  ) => {
    try {
      const result = await getLessonBySubjectId(selectedClass, selectedSection);
      setTotalCount(result.totalCount);
      const formattedData = formatStudentData(result.data);
      setData(formattedData);

      const classesResult = await getClasses();
      setClassessData(classesResult.data);

      /* call condtion wise  */
      if (selectedClass && selectedSection) {
        const subjectgroupresult = await fetchSubjectGroupData(
          "",
          "",
          selectedClass,
          selectedSection,
          getselectedSessionId,
        );

        setSubjectGroup(subjectgroupresult.data);
      }
      if (selectedSubjectGroup) {
        const subjectresult = await fetchSubjectData(
          "",
          "",
          selectedSubjectGroup,
          getselectedSessionId,
        );
        setSubject(subjectresult.data);
      }

      /* call condtin wise end  */

      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
    setPage(0);
  };

  const handleSubjectGroupChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedSubjectGroup(event.target.value);
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(event.target.value);
  };

  const handleSearch = () => {
    setPage(0); // Reset to first page on search
    fetchData(
      page,
      rowsPerPage,
      selectedClass,
      selectedSection,
      selectedSubjectGroup,
      selectedSubject,
      keyword,
    );
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    setPage(0);
  };

  const handleRefresh = () => {
    setSelectedClass("");
    setSelectedSubject("");
    setSelectedSection("");
    setSelectedSubjectGroup("");
    setKeyword("");
  };

  const fetchClassesAndSections = async () => {
    try {
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

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>
            Class
            <select
              value={selectedClass || ""}
              onChange={handleClassChange}
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
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
            Section
            <select
              value={selectedSection || ""}
              onChange={handleSectionChange}
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              disabled={!selectedClass}
            >
              <option value="">Select</option>
              {section.map((sec) => (
                <option key={sec.section_id} value={sec.section_id}>
                  {sec.section_name}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.label}>
            Subject Group
            <select
              value={selectedSubjectGroup || ""}
              onChange={handleSubjectGroupChange}
              disabled={!selectedClass || !selectedSection}
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            >
              <option value="">Select</option>
              {subjectGroup.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.label}>
            Subject
            <select
              value={selectedSubject || ""}
              onChange={handleSubjectChange}
              disabled={
                !selectedClass || !selectedSection || !selectedSubjectGroup
              }
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            >
              <option value="">Select</option>
              {subject.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.searchGroup}>
            <button onClick={handleSearch} className={styles.searchButton}>
              Search
            </button>
            <button onClick={handleRefresh} className={styles.searchButton}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation4 tss-11quiee-MUIDataTable-paper tss-1x5mjc5-MUIDataTable-root StudentDetails_miui-box-shadow__1DvBS css-11mde6h-MuiPaper-root rounded-sm border border-stroke bg-[#F8F8F8] shadow-default dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none ">
        {loading ? (
          <Loader />
        ) : (
          <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
            <MUIDataTable
              title={`Syllabus Status `} /* For: ${selectedSubject} */
              data={data}
              className={`rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${styles["miui-box-shadow"]}`}
              columns={columns}
              options={{
                ...options,

                onChangePage: handlePageChange,
                onChangeRowsPerPage: handleRowsPerPageChange,
              }}
            />
          </ThemeProvider>
        )}
      </div>
    </DefaultLayout>
  );
};

export default StudentDetails;
