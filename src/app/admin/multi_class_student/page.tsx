"use client"; // Enable client-side rendering

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For navigation in the app directory
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getClasses } from "@/services/classesService";
import { fetchsectionByClassData } from "@/services/sectionsService";
import styles from "./StudentDetails.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add, Remove, Calculate } from "@mui/icons-material"; // Import Calculate icon
import {
  fetchStudentMultiClassData,
  fetchUpdatetMultiClass,
} from "@/services/studentMultiClassService";
import { useLoginDetails } from "@/store/logoStore";
import LoaderSpiner from "@/components/common/LoaderSpiner";

const MultiClassStudent = () => {
  // const [studentsData, setStudentsData] = useState<Array<Array<string>>>([]);
  const [studentsData, setStudentsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [classes, setClassesData] = useState<Array<any>>([]);
  const [sections, setSectionsData] = useState<Array<any>>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>("");
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    "",
  );
  const [keyword, setKeyword] = useState<string>("");
  const [selectedClass2, setSelectedClass2] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection2, setSelectedSection2] = useState<string | undefined>(
    undefined,
  );
  const [classes2, setClassesData2] = useState<Array<any>>([]);
  const [section2, setSections2] = useState<Array<any>>([]);

  const router = useRouter();

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    setPage(0);
  };
  const getselectedSessionId = useLoginDetails(
    (state) => state.selectedSessionId,
  );
  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
    setPage(0);
  };

  const handleClassChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass2(event.target.value);
  };

  const handleSectionChange2 = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedSection2(event.target.value);
  };

  const handleSearch = () => {
    setPage(0);
    fetchData(0, rowsPerPage, selectedClass, selectedSection, keyword);
  };

  const handleRefresh = () => {
    setSelectedClass("");
    setSelectedSection("");
    setSelectedClass2("");
    setSelectedSection2("");
    setKeyword("");

    setStudentsData([]);
  };

  useEffect(() => {
    fetchClassesAndSections();
  }, [selectedClass, selectedSection]);

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

  useEffect(() => {
    fetchClassesAndSections2();
  }, [selectedClass2, selectedSection2]);

  const fetchClassesAndSections2 = async () => {
    try {
      const classesResult = await getClasses();
      setClassesData2(classesResult.data);

      if (selectedClass2) {
        const sectionsResult = await fetchsectionByClassData(selectedClass2);
        setSections2(sectionsResult.data);
      } else {
        setSections2([]);
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
    keyword?: string,
  ) => {
    try {
      if (selectedSection && selectedClass) {
        setLoading(true);
        const result = await fetchStudentMultiClassData(
          selectedClass,
          selectedSection,
          getselectedSessionId,
          keyword,
        );

        setTotalCount(result.totalCount);

        setStudentsData(result.data);
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Fetch error:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const [rows, setRows] = useState(() => {
    // Initialize with one row only
    return [{ id: 1, selectedClass2: "", selectedSection2: "" }];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("rows", JSON.stringify(rows));
    }
  }, [rows]);

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, selectedClass2: "", selectedSection2: "" },
    ]);
  };

  const handleRemoveRow = (id: any) => {
    const updatedRows = rows.filter((row: any) => row.id !== id);
    setRows(
      updatedRows.length > 0
        ? updatedRows
        : [{ id: 1, selectedClass2: "", selectedSection2: "" }],
    );
  };

  const handleChange = (id: any, field: any, value: any) => {
    setRows(
      rows.map((row: any) =>
        row.id === id ? { ...row, [field]: value } : row,
      ),
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
              {sections.map((sec) => (
                <option key={sec.section_id} value={sec.section_id}>
                  {sec.section_name}
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
      {loading ? <LoaderSpiner /> : ""}
      <div className="grid grid-cols-1 gap-6 dark:border-strokedark dark:bg-boxdark sm:grid-cols-2 lg:grid-cols-3 ">
        {studentsData.length > 0
          ? Object.values(studentsData).map(
              (student: any, studentKey: number) => (
                <div
                  key={studentKey}
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 flex flex-col rounded-lg border bg-white p-6 shadow-lg"
                >
                  {/* Header Section */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-gray-800 text-lg font-semibold dark:text-white">
                        {student.firstname} {student.lastname}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddRow}
                      className="btn-primary flex h-8 w-8 items-center justify-center rounded bg-blue-500 hover:bg-blue-600"
                    >
                      <Add className="text-xs text-white" />
                    </button>
                  </div>

                  {/* Hidden Inputs */}
                  <input type="hidden" name="student_id" value="993" />
                  <input
                    type="hidden"
                    name="nxt_row"
                    className="nxt_row"
                    value={rows.length}
                  />

                  {/* Dynamic Rows Section */}
                  <div className="flex max-w-full flex-grow flex-col gap-4 overflow-y-auto">
                    {rows.map((row: any) => (
                      <div
                        key={row.id}
                        className="flex w-full items-center gap-4 border-b pb-4"
                      >
                        <input
                          type="hidden"
                          name="row_count[]"
                          value={row.id}
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={`class_id_${row.id}`}
                            className="text-gray-700 dark:text-gray-300 mb-2 block text-sm font-medium"
                          >
                            Class
                          </label>
                          <select
                            value={selectedClass2 || ""}
                            onChange={handleClassChange2}
                            className="border-gray-300 text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 w-full rounded-lg border bg-transparent px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          >
                            <option value="">Select</option>
                            {classes2.map((cls) => (
                              <option key={cls.id} value={cls.id}>
                                {cls.class}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex-1">
                          <label
                            htmlFor={`section_id_${row.id}`}
                            className="text-gray-700 dark:text-gray-300 mb-2 block text-sm font-medium"
                          >
                            Section
                          </label>
                          <select
                            value={selectedSection2 || ""}
                            onChange={handleSectionChange2}
                            className="border-gray-300 text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 w-full rounded-lg border bg-transparent px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            disabled={!selectedClass2}
                          >
                            <option value="">Select</option>
                            {section2.map((sec) => (
                              <option
                                key={sec.section_id}
                                value={sec.section_id}
                              >
                                {sec.section_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mt-6 flex w-[5%] items-center justify-center">
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveRow(rows[rows.length - 1]?.id)
                            }
                            className="btn-error bg-red-500 hover:bg-red-600 flex items-center justify-center rounded p-2 text-white"
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer Section */}
                  <div className="bg-gray-100 dark:bg-gray-700 mt-auto w-full p-4 text-right">
                    <button
                      type="submit"
                      className="btn-primary rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ),
            )
          : ""}
      </div>
    </DefaultLayout>
  );
};

export default MultiClassStudent;
