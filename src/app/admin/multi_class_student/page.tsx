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
   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
  {studentsData.length > 0
    ? Object.values(studentsData).map(
        (student: any, studentKey: number) => (
          <div
            key={studentKey}
            className="border border-stroke rounded shadow-md dark:border-strokedark bg-white flex flex-col h-auto sm:h-[400px] w-full dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white"
          >
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6 p-4">
              <div className="flex items-center gap-2">
                <h3 className="text-small font-semibold">
                  {student.firstname} {student.lastname} ({student.admission_no})
                </h3>
              </div>
              <button
                type="button"
                onClick={handleAddRow}
                className="btn-primary w-8 h-8 flex justify-center items-center rounded bg-blue-500 hover:bg-blue-600"
              >
                <Add className="text-white text-xs" />
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
            <div className="flex flex-col gap-4 max-w-full flex-grow overflow-y-auto p-4">
              {rows.map((row: any) => (
                <div
                  key={row.id}
                  className="flex items-center gap-4 w-full"
                >
                  <input
                    type="hidden"
                    name="row_count[]"
                    value={row.id}
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={`class_id_${row.id}`}
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                    >
                      Class
                    </label>
                    <select
                      value={selectedClass2 || ""}
                      onChange={handleClassChange2}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                    >
                      Section
                    </label>
                    <select
                      value={selectedSection2 || ""}
                      onChange={handleSectionChange2}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                  <div className="mt-8 flex items-center justify-center w-[5%]">
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveRow(rows[rows.length - 1]?.id)
                      }
                      className="btn-error py-2 rounded flex items-center"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Section */}
            <div className="text-left bg-[#C1C1C1] p-4 mt-auto bottom-0 w-full dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white">
              <button
                type="submit"
                className="text-white btn-primary flex items-center gap-1 rounded bg-blue-500 hover:bg-blue-600 py-2 px-4 text-sm"
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
