"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import { fetchStudentData } from "@/services/studentService";
import styles from "./StudentDetails.module.css"; // Import CSS module
import Loader from "@/components/common/Loader";
import { getClasses } from "@/services/classesService";
import { fetchsectionByClassData } from "@/services/sectionsService";
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
import { useLoginDetails } from "@/store/logoStore";
import { fetchSession } from "@/services/session";
import { set } from "date-fns";
const columns = [
  "Admission No",
  "Student Name",
  "Father Name",
  "Date of Birth",
  "Current Result",
  "Next Session Status",
];

const options = {
  filterType: "checkbox",
  serverSide: true,
  responsive: "standard",
  search: false,

  filter: false, // Disable filter,
  viewColumns: false, // Disable view columns button
};

const StudentDetails = () => {
  const [data, setData] = useState<Array<Array<string>>>([]);
  const { themType, setThemType } = useGlobalState(); //
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [allSession, setAllSession] = useState<Array<any>>([]);

  const [promotedsession, setPromotedSession] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );

  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);

  const [selectedClass2, setSelectedClass2] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection2, setSelectedSection2] = useState<string | undefined>(
    undefined,
  );
  const [classes2, setClassessData2] = useState<Array<any>>([]);
  const [section2, setSections2] = useState<Array<any>>([]);

  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();
  const [colorMode, setColorMode] = useColorMode();

  const [studentData, setStudentData] = useState<Array<Array<string>>>([]);
  const updateStudent = (id: any, field: any, value: any) => {
    console.log(id, field, value);

    setStudentData((prevData: any) => {
      // Create a copy of the previous data
      const updatedData = [...prevData];

      // Find the student with the given id
      const studentIndex = updatedData.findIndex(
        (student) => student.id === id,
      );

      if (studentIndex !== -1) {
        // Update the student's field (attendance_note or attendance_type)
        updatedData[studentIndex] = {
          ...updatedData[studentIndex],
          [field]: value,
        };
      } else {
        // If the student is not found, add a new object with their id and field-value pair
        updatedData.push({ id, [field]: value });
      }

      // Remove duplicate entries for the same id and keep only unique ones
      const uniqueData = updatedData.filter(
        (student, index, self) =>
          index === self.findIndex((s) => s.id === student.id),
      );

      return uniqueData;
    });
  };
  const formatStudentData = (students: any[]) => {
    return students.map((student: any, rowIndex: number) => [
      student.admission_no,
      `${student.firstname.trim()} ${student.lastname.trim()}`,
      student.father_name || "N/A",
      student.dob || "N/A",
      <div className="flex gap-2">
        {[
          { label: "Pass", key: 1 },
          { label: "Fail", key: 2 },
        ].map(({ label, key }) => (
          <label key={key} className="flex items-center gap-1">
            <input
              className="dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none"
              type="radio"
              name={`current-result-${rowIndex}`} // Grouping ensures only one is selected in this group
              defaultChecked={student.attendance_status == key} // Set default checked status
              value={key} // Assign the key as the value
              onChange={(e) =>
                updateStudent(student.id, "current_result", e.target.value)
              }
            />
            {label} {/* Display the label text */}
          </label>
        ))}
      </div>,
      <div className="flex gap-2">
        {[
          { label: "Continue", key: 1 },
          { label: "Leave", key: 2 },
        ].map(({ label, key }) => (
          <label key={key} className="flex items-center gap-1">
            <input
              className="dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none"
              type="radio"
              name={`next-session-status-${rowIndex}`} // Grouping ensures only one is selected in this group
              defaultChecked={student.attendance_status == key} // Set default checked status
              value={key} // Assign the key as the value
              onChange={(e) =>
                updateStudent(student.id, "next_session_status", e.target.value)
              }
            />
            {label} {/* Display the label text */}
          </label>
        ))}
      </div>,
    ]);
  };
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );

  const getselectedSessionId = useLoginDetails(
    (state) => state.selectedSessionId,
  );
  useEffect(() => {
    setSelectedSessionId(getselectedSessionId);
  }, []);
  const fetchData = async (
    currentPage: number,
    rowsPerPage: number,
    selectedClass?: string,
    selectedSection?: string,
    keyword?: string,
  ) => {
    if (allSession.length == 0) {
      try {
        const classesResult = await fetchSession();
        setAllSession(classesResult.data);
      } catch (error: any) {
        console.error("Error fetching sessions:", error);
      }
    }
    if (
      selectedClass &&
      selectedSection &&
      promotedsession &&
      selectedClass2 &&
      selectedSection2
    ) {
      try {
        const result = await fetchStudentData(
          currentPage + 1,
          rowsPerPage,
          selectedClass,
          selectedSection,
          keyword,
          selectedSessionId,
        );
        setTotalCount(result.totalCount);
        const formattedData = formatStudentData(result.data);
        setData(formattedData);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
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
  }, [
    page,
    rowsPerPage,
    selectedClass,
    selectedSection,
    keyword,
    promotedsession,
    selectedClass2,
    selectedSection2,
  ]);

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

  const handleClassChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass2(event.target.value);
    setPage(0);
  };

  const handleSectionChange2 = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedSection2(event.target.value);
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
    setPromotedSession("");
    setSelectedClass2("");
    setSelectedSection2("");
    setData([]);
  };

  useEffect(() => {
    fetchClassesAndSections(); // Fetch classes and sections on initial render
  }, [selectedClass, selectedClass2]);
  const handleSessionChange = (value: string) => {
    setPromotedSession(value);
  };
  const fetchClassesAndSections = async () => {
    try {
      const classesResult = await getClasses();
      setClassessData(classesResult.data);

      setClassessData2(classesResult.data);

      // Fetch sections if a class is selected
      if (selectedClass) {
        const sectionsResult = await fetchsectionByClassData(selectedClass);
        setSections(sectionsResult.data);
      } else {
        setSections([]); // Clear sections if no class is selected
      }

      if (selectedClass2) {
        const sectionsResult = await fetchsectionByClassData(selectedClass2);
        setSections2(sectionsResult.data);
      } else {
        setSections2([]); // Clear sections if no class is selected
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
      <div className="dark:bg-form-dark mb-5 bg-white p-4 dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
        <div className={styles.filters}>
          <div>
            <h6 className="font-satoshi text-[1.25rem] font-semibold leading-[1.75rem] dark:text-white">
              {" "}
              Select Criteria{" "}
            </h6>
          </div>
          <div className="flex w-full gap-4">
            <label className={`${styles.label} w-1/2`}>
              Class:
              <select
                value={selectedClass || ""}
                onChange={handleClassChange}
                className={`border-gray-300 w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none dark:border-strokedark dark:bg-boxdark`}
              >
                <option value="">Select</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.class}
                  </option>
                ))}
              </select>
            </label>
            <label className={`${styles.label} w-1/2`}>
              Section:
              <select
                value={selectedSection || ""}
                onChange={handleSectionChange}
                className={`border-gray-300 w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none dark:border-strokedark dark:bg-boxdark`}
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
          </div>

          {/*  <div className={styles.searchGroup}>

        </div> */}
        </div>

        <div className={`${styles.filters} mt-6`}>
          <div>
            <h6 className="font-satoshi text-[1.25rem] font-semibold leading-[1.75rem] dark:text-white">
              Promote Students In Next Session
            </h6>
          </div>
          <div className="flex flex-wrap items-center gap-4 lg:flex-nowrap">
            <label className={`${styles.label} flex flex-col lg:w-1/5`}>
              Promote In Session:
              <select
                id="session"
                className="border-gray-300 w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none dark:border-strokedark dark:bg-boxdark"
                value={promotedsession}
                onChange={(e) => handleSessionChange(e.target.value)} // Call function when session changes
              >
                <option value="">Select</option>
                {allSession?.map((cls: any) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.session}
                  </option>
                ))}
              </select>
            </label>

            <label className={`${styles.label} flex flex-col lg:w-1/5`}>
              Class:
              <select
                value={selectedClass2 || ""}
                onChange={handleClassChange2}
                className={`border-gray-300 w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none dark:border-strokedark dark:bg-boxdark`}
              >
                <option value="">Select</option>
                {classes2.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.class}
                  </option>
                ))}
              </select>
            </label>

            <label className={`${styles.label} flex flex-col lg:w-1/5`}>
              Section:
              <select
                value={selectedSection2 || ""}
                onChange={handleSectionChange2}
                className={`border-gray-300 w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none dark:border-strokedark dark:bg-boxdark`}
                disabled={!selectedClass2} // Disable section dropdown if no class is selected
              >
                <option value="">Select</option>
                {section2.map((sec) => (
                  <option key={sec.section_id} value={sec.section_id}>
                    {sec.section_name}
                  </option>
                ))}
              </select>
            </label>

            {/* Adjusting the Search and Reset buttons */}
            <div className={`${styles.searchGroup} flex gap-2 pt-0 lg:pt-7`}>
              <button
                onClick={handleSearch}
                className={`${styles.searchButton} hover:bg-primary-dark rounded-lg bg-primary px-4 py-2 text-white transition`}
              >
                Search
              </button>
              <button
                onClick={handleRefresh}
                className={`${styles.searchButton} hover:bg-secondary-dark rounded-lg bg-secondary px-4 py-2 text-white transition`}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      {data.length > 0 ? (
        <>
          {loading ? (
            <Loader />
          ) : (
            <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
              <MUIDataTable
                title={"Student List"}
                data={data}
                columns={columns}
                options={{
                  ...options,
                  count: totalCount,
                  page: page,
                  rowsPerPage: rowsPerPage,
                  onChangePage: handlePageChange,
                  onChangeRowsPerPage: handleRowsPerPageChange,
                }}
              />
            </ThemeProvider>
          )}
        </>
      ) : (
        ""
      )}
    </DefaultLayout>
  );
};

export default StudentDetails;
