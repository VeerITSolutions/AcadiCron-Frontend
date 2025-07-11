"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import { assignStudentBluk, fetchStudentData } from "@/services/studentService";
import styles from "./StudentDetails.module.css"; // Import CSS module
import Loader from "@/components/common/Loader";
import { fetchsectionByClassData } from "@/services/sectionsService"; // Import your section API service
import { getClasses } from "@/services/classesService"; // Import your classes API service
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";

import { toast } from "react-toastify";
import { useLoginDetails } from "@/store/logoStore";
import { fetchStudentCategoryData } from "@/services/studentCategoryService";
import { fetchSchSetting } from "@/services/schSetting";
import { fetchStudentFeesSeesionByGroupSingleData } from "@/services/studentFeesSessionGroupService";
import SaveIcon from "@mui/icons-material/Save";
const columns = [
  "Studnet Session Id",
  "Admission No",
  "Student Name",
  "Class",
  "Father Name",
  "Category",
  "Gender",
];

const options = {
  filterType: "checkbox",
  serverSide: true,
  pagination: false,
  responsive: "standard",
  search: false,
  filter: false,
  viewColumns: false,
  tableBodyMaxHeight: "500px",
};

const StudentDetails = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [colorMode, setColorMode] = useColorMode();
  const [data, setData] = useState<Array<Array<string>>>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );
  const [selectedGender, setSelectedGender] = useState<string | undefined>(
    undefined,
  );

  const [selectedRTE, setSelectedRTE] = useState<string | undefined>(undefined);
  const { themType, setThemType } = useGlobalState(); //
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>("1");
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();
  const [category, setCategory] = useState<Array<any>>([]);
  const [feessessionbygroupiddata, setFeesSessionByGroupIdData] = useState<
    Array<any>
  >([]);
  const [dataSetting, setDataSetting] = useState<string | undefined>(undefined);

  const handleAssign = async () => {
    try {
      const selectedData = selectedRows.map((rowIndex) => data[rowIndex]); // Map indices to data

      const idsToDelete = selectedData.map((row) => row[0]);

      console.log(idsToDelete); // Handle response

      if (
        window.confirm("Are you sure you want to assign the selected items?")
      ) {
        try {
          const formData = new FormData();
          idsToDelete.forEach((id) => {
            formData.append("student_ids[]", id);
          });

          formData.append(
            "fee_session_group_id",
            feessessionbygroupiddata[0].fee_session_group_id,
          );
          formData.append(
            "fee_groups_id",
            feessessionbygroupiddata[0].fee_groups_id,
          );

          const response = await assignStudentBluk(formData);
          if (response.status === 200) {
            toast.success("Selected data assigned successfully.");
          }
          fetchData(
            selectedClass,
            selectedSection,
            keyword,
            selectedCategory,
            selectedGender,
            selectedRTE,
          );
        } catch (error) {
          console.error("Error assign data:", error);
          toast.error("Failed to assign selected data.");
          alert("Failed to assign selected data.");
        }
      }
    } catch (error) {
      console.error("Error assign data:", error);
      toast.error("Failed to assign selected data.");
    }
  };

  const handleRowSelectionChange = (
    curRowSelected: { dataIndex: number; index: number }[],
    allRowsSelected: { dataIndex: number; index: number }[],
    rowsSelected: [],
  ) => {
    setSelectedRows(rowsSelected); // Update selected rows
  };
  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.student_session_id,
      student.admission_no,
      `${student.firstname.trim()} ${student.lastname.trim()}`,
      student.class_name || "N/A",

      student.father_name || "N/A",
      student.category_name || "N/A",

      student.gender,
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
    selectedClass?: string,
    selectedSection?: string,
    keyword?: string,
    selectedCategory?: string,
    selectedGender?: string,
    selectedRTE?: string,
  ) => {
    try {
      setLoading(true);
      // Pass selectedClass and selectedSection as parameters to filter data
      if (selectedClass && selectedSection) {
        const result = await fetchStudentData(
          "",
          "",
          selectedClass,
          selectedSection,
          keyword,
          selectedSessionId,
          "",
          "",
          "",
          selectedCategory,
          selectedGender,
          selectedRTE,
        );

        const resultSetting = await fetchSchSetting();
        const getid = window.location.pathname.split("/").pop();

        const resultFetchSessionData =
          await fetchStudentFeesSeesionByGroupSingleData(getid);

        setTotalCount(result.totalCount);

        setFeesSessionByGroupIdData(resultFetchSessionData.data);
        const formattedData = formatStudentData(result.data);
        setData(formattedData);

        const currentDate = new Date();
        currentDate.setDate(
          currentDate.getDate() + resultSetting.data.fee_due_days,
        );

        // Format the new date as d-m-y
        const formattedDate = `${currentDate.getDate().toString().padStart(2, "0")}-${(currentDate.getMonth() + 1).toString().padStart(2, "0")}-${currentDate.getFullYear()}`;
        setDataSetting(formattedDate);
        setLoading(false);
      } else {
        setData([]);
        setLoading(false);
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchClassesAndSections = async () => {
    try {
      const classesResult = await getClasses();
      setClassessData(classesResult.data);

      // Fetch sections if a class is selected
      if (selectedClass) {
        const sectionsResult = await fetchsectionByClassData(selectedClass);
        setSections(sectionsResult.data);

        const resultCategory = await fetchStudentCategoryData();
        setCategory(resultCategory.data);
      } else {
        setSections([]);
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassesAndSections();
  }, [selectedClass]);

  useEffect(() => {
    fetchData(
      selectedClass,
      selectedSection,
      keyword,
      selectedCategory,
      selectedGender,
      selectedRTE,
    );
  }, [
    selectedClass,
    selectedSection,
    keyword,
    selectedCategory,
    selectedGender,
    selectedRTE,
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

  const handleSearch = () => {
    setPage(0);
    fetchData(
      selectedClass,
      selectedSection,
      keyword,
      selectedCategory,
      selectedGender,
      selectedRTE,
    );
  };
  const handleRefresh = () => {
    setSelectedClass("");
    setSelectedSection("");
    setSelectedCategory("");
    setSelectedGender("");
    setSelectedRTE("");
    setKeyword("");
    setSelectedRows([]);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGender(event.target.value);
  };

  const handleRTEChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRTE(event.target.value);
  };

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <div>
        {feessessionbygroupiddata.length > 0 && (
          <div className={styles.sessionInfo}>
            <p>Fees Group: {feessessionbygroupiddata[0].group_name || "N/A"}</p>
            <p>{feessessionbygroupiddata[0].feetype_name || "N/A"}</p>
            <p>
              Due Date:{" "}
              {feessessionbygroupiddata[0].due_date
                ? feessessionbygroupiddata[0].due_date
                : "N/A"}
            </p>
            <p>
              Amount : ₹{" "}
              {feessessionbygroupiddata[0].amount
                ? feessessionbygroupiddata[0].amount
                : "N/A"}
            </p>
          </div>
        )}
      </div>
      <hr />
      <br />
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>
            Class:
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
            Section:
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
            Category:
            <select
              value={selectedCategory || ""}
              onChange={handleCategoryChange}
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            >
              <option value="">Select</option>
              {category.map((sec: any) => (
                <option key={sec.id} value={sec.id}>
                  {sec.category}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.label}>
            Gender:
            <select
              value={selectedGender || ""}
              onChange={handleGenderChange}
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <label className={styles.label}>
            RTE
            <select
              value={selectedRTE || ""}
              onChange={handleRTEChange}
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
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

      {loading ? (
        <Loader />
      ) : (
        <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
          <MUIDataTable
            title={"Assign Fees Group"}
            data={data}
            columns={columns}
            options={{
              ...options,
              count: totalCount,
              page: page,
              rowsPerPage: rowsPerPage,
              onChangePage: handlePageChange,
              onChangeRowsPerPage: handleRowsPerPageChange,
              onRowSelectionChange: handleRowSelectionChange,
              selectableRows: "multiple",

              customToolbarSelect: (
                selectedRows: any,
                displayData: any,
                setSelectedRows: any,
              ) => {
                const selectedIndexes = selectedRows.data.map(
                  (d: any) => d.dataIndex,
                );
                const selectedStudentData = selectedIndexes.map(
                  (index: any) => data[index],
                );

                const handleCustomAssign = async () => {
                  // Dynamically get the selected student IDs
                  const idsToAssign = selectedStudentData.map(
                    (row: any) => row[0],
                  ); // student_session_id is at index 0

                  if (
                    window.confirm(
                      "Are you sure you want to assign the selected items?",
                    )
                  ) {
                    const formData = new FormData();

                    // Use the actual fee_session_group_id and fee_groups_id from feessessionbygroupiddata
                    if (
                      feessessionbygroupiddata &&
                      feessessionbygroupiddata.length > 0
                    ) {
                      formData.append(
                        "fee_session_group_id",
                        feessessionbygroupiddata[0].fee_session_group_id,
                      );
                      formData.append(
                        "fee_groups_id",
                        feessessionbygroupiddata[0].fee_groups_id,
                      );
                    }

                    // Append all selected student IDs
                    idsToAssign.forEach((id: string) => {
                      formData.append("student_ids[]", id);
                    });

                    try {
                      const response = await assignStudentBluk(formData);
                      if (response.status === 200) {
                        toast.success("Selected data assigned successfully.");
                        setSelectedRows([]); // clear selection
                      }
                    } catch (err) {
                      toast.error("Failed to assign selected data.");
                      console.error("Assign error:", err);
                    }
                  }
                };

                return (
                  <SaveIcon
                    onClick={handleCustomAssign}
                    style={{
                      cursor: "pointer",
                      color: "#2563eb",
                      marginRight: "16px",
                    }}
                    titleAccess="Assign Selected"
                  />
                );
              },
            }}
          />
        </ThemeProvider>
      )}
    </DefaultLayout>
  );
};

export default StudentDetails;
