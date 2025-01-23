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
import { toast } from "react-toastify";

const MultiClassStudent = () => {
  const [activeStudent, setActiveStudent] = useState<string | null>(null);
  const [studentRows, setStudentRows] = useState<Record<string, any>>({});
  const [classSectionMapping, setClassSectionMapping] = useState<{
    [admissionNo: string]: {
      selectedClass: string;
      selectedSection: string;
      sections: any[];
    };
  }>({});
  const [studentsData, setStudentsData] = useState<any[]>([]);
  const [updateData, setUpdateData] = useState<any[]>([]);
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

  const handleClassChange2 = async (
    admissionNo: string,
    rowId: number,
    value: string,
  ) => {
    const sectionsResult = value
      ? await fetchsectionByClassData(value)
      : { data: [] };

    setStudentRows((prevState) => ({
      ...prevState,
      [admissionNo]: prevState[admissionNo].map((row: any) =>
        row.id === rowId
          ? {
              ...row,
              selectedClass2: value,
              selectedSection2: "",
              sections: sectionsResult.data,
            }
          : row,
      ),
    }));
  };

  const handleSectionChange2 = (
    admissionNo: string,
    rowId: number,
    value: string,
  ) => {
    setStudentRows((prevState) => ({
      ...prevState,
      [admissionNo]: prevState[admissionNo].map((row: any) =>
        row.id === rowId ? { ...row, selectedSection2: value } : row,
      ),
    }));
  };

  const handleSearch = () => {
    fetchData(selectedClass, selectedSection, keyword);
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
    if (studentsData.length > 0) {
      const initialRows = studentsData.reduce((acc: any, student: any) => {
        acc[student.admission_no] = [
          {
            id: 1,
            selectedClass2: selectedClass,
            selectedSection2: selectedSection,
            sections: sections,
          },
        ];
        return acc;
      }, {});
      setStudentRows(initialRows);
    }
  }, [studentsData]);

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
  const handleEdit = async (student_session_id: any) => {
    try {
      const result = await fetchUpdatetMultiClass(student_session_id);
      setUpdateData(result.data);
    } catch (error: any) {
      console.error("Fetch error:", error);
      setError(error.message);
      setLoading(false);
    }
  };
  const fetchData = async (
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

  const handleAddRow = (studentId: string) => {
    setStudentRows((prev) => ({
      ...prev,
      [studentId]: [
        ...(prev[studentId] || []),
        {
          id: (prev[studentId]?.length || 0) + 1,
          class_id: "",
          section_id: "",
        },
      ],
    }));
  };

  const handleRemoveRow = (studentId: string, rowId: number) => {
    setStudentRows((prev) => {
      const updatedRows = (prev[studentId] || []).filter(
        (row: any) => row.id !== rowId,
      );
      return {
        ...prev,
        [studentId]:
          updatedRows.length > 0
            ? updatedRows
            : [{ id: 1, class_id: "", section_id: "" }],
      };
    });
  };

  const handleChange = (id: any, field: any, value: any) => {
    setRows(
      rows.map((row: any) =>
        row.id === id ? { ...row, [field]: value } : row,
      ),
    );
  };

  const handleUpdate = async (admissionNo: string) => {
    const studentData = studentRows[admissionNo]?.map((row: any) => ({
      id: row.id,
      selectedClass: row.selectedClass2,
      selectedSection: row.selectedSection2,
    }));

    const formData = {
      student_data: JSON.stringify(studentData),
      student_id: admissionNo,
      session_id: getselectedSessionId,
    };
    const result = await fetchUpdatetMultiClass(formData);

    if (result.success) {
      toast.success("Added successfully");
    } else {
      toast.error("Failed to Add");
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
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {studentsData.length > 0 &&
          Object.values(studentsData).map((student: any) => (
            <div
              key={student.admission_no}
              className="flex h-auto w-full flex-col rounded border border-stroke bg-white shadow-md dark:border-strokedark dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none sm:h-[400px]"
            >
              {/* Header Section */}
              <div className="mb-6 flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-small font-semibold">
                    {student.firstname} {student.lastname} (
                    {student.admission_no})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddRow(student.admission_no)}
                  className="btn-primary flex h-8 w-8 items-center justify-center rounded bg-blue-500 hover:bg-blue-600"
                >
                  <Add className="text-xs text-white" />
                </button>
              </div>

              {/* Dynamic Rows Section */}
              <div className="flex max-w-full flex-grow flex-col gap-4 overflow-y-auto p-4">
                <>
                  {(studentRows[student.admission_no] || []).map((row: any) => (
                    <div
                      key={row.id}
                      className="flex w-full items-center gap-4"
                    >
                      <div className="flex-1">
                        <label
                          htmlFor={`class_id_${student.admission_no}_${row.id}`}
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                        >
                          Class
                        </label>
                        <select
                          value={row.selectedClass2 || ""}
                          onChange={(e) =>
                            handleClassChange2(
                              student.admission_no,
                              row.id,
                              e.target.value,
                            )
                          }
                          name="classStudent[]"
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
                          htmlFor={`section_id_${student.admission_no}_${row.id}`}
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                        >
                          Section
                        </label>
                        <select
                          value={row.selectedSection2 || ""}
                          onChange={(e) =>
                            handleSectionChange2(
                              student.admission_no,
                              row.id,
                              e.target.value,
                            )
                          }
                          name="sectionStudent[]"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          disabled={!row.selectedClass2}
                        >
                          <option value="">Select</option>
                          {(row.sections || []).map((sec: any) => (
                            <option key={sec.section_id} value={sec.section_id}>
                              {sec.section_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mt-8 flex w-[5%] items-center justify-center">
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveRow(student.admission_no, row.id)
                          }
                          className="btn-error flex items-center rounded py-2"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => handleUpdate(student.admission_no)}
                      className="btn-primary rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      Update
                    </button>
                  </div>
                </>
              </div>
            </div>
          ))}
      </div>
    </DefaultLayout>
  );
};

export default MultiClassStudent;
