"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import { fetchStudentData } from "@/services/studentService";
import styles from "./StudentDetails.module.css";
import Loader from "@/components/common/Loader";
import { getClasses } from "@/services/classesService";
import { fetchsectionByClassData } from "@/services/sectionsService";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import { usePathname } from "next/navigation"; 
import {
  Group as GroupIcon,
  Security as SecurityIcon,
  MenuBook as MenuBookIcon,
  Key as KeyIcon,
  Class as ClassIcon,
  Description as DescriptionIcon,
  PeopleAlt as PeopleAltIcon,
  AccountBox as AccountBoxIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Wc as WcIcon,
  Scale as ScaleIcon,
} from '@mui/icons-material';
import { useLoginDetails } from "@/store/logoStore";
import { fetchSubjectGroupData } from "@/services/subjectGroupService";
import { fetchHomeWorkData, fetchSearchHomeWorkData } from "@/services/homeworkServices";
import { fetchSubjectData } from "@/services/subjectsService";
import Link from "next/link";



const EvaluationReport = () => {
  const [data, setData] = useState<Array<Array<string>>>([]);
  const { themType, setThemType } = useGlobalState(); //
  const [dataleavetype, setLeaveTypeData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [subjectGroup, setSubjectGroup] = useState<Array<any>>([]);
  const [subject, setSubject] = useState<Array<any>>([]);
  const [classes2, setClassessData2] = useState<Array<any>>([]);
  const [section2, setSections2] = useState<Array<any>>([]);
  const [subjectGroup2, setSubjectGroup2] = useState<Array<any>>([]);
  const [subject2, setSubject2] = useState<Array<any>>([]);
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
  const [selectedClass2, setSelectedClass2] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection2, setSelectedSection2] = useState<string | undefined>(
    undefined,
  );
  const [selectedSubjectGroup2, setSelectedSubjectGroup2] = useState<
    string | undefined
  >(undefined);
  const [keyword, setKeyword] = useState<string>("");
  const pathname = usePathname();
  const [activePath, setActivePath] = useState("");
  const [open, setOpen] = useState(false);

  
  const columns = [
    "Subject",
    "Homework Date",
    "Submission Date",
    "Complete/Incomplete",
    "Complete%"
  ];
  
  const options = {
    filterType: false,
    serverSide: true,
    selectableRows: "none",
    responsive: "standard",
    search: false,
    filter: false, 
    viewColumns: false, 
  };

  /* use Effect  */
    useEffect(() => {
      if (pathname) {
        setActivePath(pathname); 
      }
    }, [pathname]);

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
    selectedSection2,
    selectedSubjectGroup,
    selectedSubjectGroup2,
    selectedSubject,
    keyword,
  ]);

  useEffect(() => {
    fetchClassesAndSections();
  }, [selectedClass]);

  useEffect(() => {
    fetchClassesAndSections2(); 
  }, [selectedClass2, selectedSection2]);



  const formatDate = (dateString: any) => {
    if (!dateString) return "N/A"; 
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A"; 
    return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
      date,
    );
  };

  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.subject_name || "N/A",
      formatDate(student.homework_date) || "N/A",
      formatDate(student.submit_date) || "N/A",
      `${student.report?.completed || 0}/${(student.report?.total || 0) - (student.report?.completed || 0)}`, // Completed/Incomplete
      `${student.report?.percentage || 0}%`, // Percentage
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
      const result = await fetchSearchHomeWorkData(
        currentPage + 1,
        rowsPerPage,
        selectedClass,
        selectedSection,
        selectedSubjectGroup,
        selectedSubject,
        keyword,
      );
      setTotalCount(result.totalCount);
      const formattedData = formatStudentData(result.data);
      setData(formattedData);

      const classesResult = await getClasses();
      setClassessData(classesResult.data);

      setClassessData2(classesResult.data);

      /* call condtion wise  */
      if (selectedClass && selectedSection) {
        const subjectgroupresult = await fetchSubjectGroupData(
          "",
          "",
          selectedClass,
          selectedSection,
        );

        setSubjectGroup(subjectgroupresult.data);
      }
      if (selectedSubjectGroup) {
        const subjectresult = await fetchSubjectData(
          "",
          "",
          selectedSubjectGroup,
        );
        setSubject(subjectresult.data);
      }

      if (selectedSubjectGroup2) {
        const subjectresult2 = await fetchSubjectData(
          "",
          "",
          selectedSubjectGroup2,
        );
        setSubject2(subjectresult2.data);
      }

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
    setPage(0);
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
    setSelectedSection("");
    setSelectedSubjectGroup("");
    setSelectedSubject("");
    setKeyword("");
  };

  const fetchClassesAndSections = async () => {
    try {
      if (selectedClass) {
        const sectionsResult = await fetchsectionByClassData(selectedClass);
        setSections(sectionsResult.data);
      } else {
        setSections([]);
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchClassesAndSections2 = async () => {
    try {
      if (selectedClass2) {
        const sectionsResult = await fetchsectionByClassData(selectedClass2);
        setSections2(sectionsResult.data);
      } else {
        setSections2([]); 
      }
      if (selectedClass2 && selectedSection2) {
        const subjectgroupresult = await fetchSubjectGroupData(
          "",
          "",
          selectedClass2,
          selectedSection2,
        );

        setSubjectGroup2(subjectgroupresult.data);
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

   // Links for the reports
   const reportLinks = [
    { href: "/admin/student/studentreport", label: "Student Report" },
    { href: "/admin/student/guardianreport", label: "Guardian Report" },
    { href: "/admin/users/admissionreport", label: "Student History" },
    { href: "/admin/users/logindetailreport", label: "Student Login Credential" },
    { href: "/admin/report/class_subject", label: "Class Subject Report" },
    { href: "/admin/report/admission_report", label: "Admission Report" },
    { href: "/admin/report/sibling_report", label: "Sibling Report" },
    { href: "/admin/report/student_profile", label: "Student Profile" },
    { href: "/admin/homework/evaluation_report", label: "Homework Evaluation Report" },
    { href: "/admin/report/boys_girls_ratio", label: "Student Gender Ratio Report" },
    { href: "/admin/report/student_teacher_ratio", label: "Student Teacher Ratio Report" },
  ];

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>


<div className="col-md-12">
<div className="box box-primary border-0 mb-8 bg-white shadow-md rounded-lg dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white">
  <div className="box-header border-b border-stroke px-6.5 py-4 dark:border-strokedark">
    <h3 className="box-title text-2xl font-semibold text-gray-800 flex items-center !text-[1.25rem] !leading-[1.75rem] !font-[Satoshi] !font-semibold">
      <i className="fa fa-search mr-2 text-blue-600"></i> Student Information Report
    </h3>
  </div>
  <div className="p-5">
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {reportLinks.map((link) => (
        <li key={link.href} className="col-lg-4 col-md-4 col-sm-6">
           <Link
            href={link.href}
            className={`flex items-center hover:text-[#0070f3] ${
              activePath === link.href
                ? "bg-blue-100 dark:bg-blue-800 rounded-md p-2"
                : "p-2"
            }`}
          >
            <DescriptionIcon className="h-2 w-2 mr-2" />
            {link.label}
            </Link>
        </li>
      ))}
    </ul>
  </div>
</div>
</div>

<div className="box box-primary border-0 mb-8 bg-white shadow-md rounded-lg dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white">
<div className={`${styles.filters} p-5`} >
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
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              disabled={!selectedClass || !selectedSection}
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
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              disabled={
                !selectedClass || !selectedSection || !selectedSubjectGroup
              }
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
        {/*  <div className={styles.searchGroup}>

        </div> */}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
          <MUIDataTable
            title={"Homework Evaluation Report"}
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
      </div>
    </DefaultLayout>
  );
};

export default EvaluationReport;
