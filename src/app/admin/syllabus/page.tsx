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
import { fetchStaffData } from "@/services/staffService";
import { fetchSyllabusHTMLData } from "@/services/syllabusService";
const columns = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const options = {
  filterType: "checkbox",
  serverSide: true,
  responsive: "standard",
  search: false,
  selectableRows: "none", // Disable row selection
  filter: false, // Disable filter,
  viewColumns: false, // Disable view columns button
};

const StudentDetails = () => {
  const [colorMode, setColorMode] = useColorMode();
  const [data, setData] = useState<Array<Array<string>>>([]);
  const { themType, setThemType } = useGlobalState(); //
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
    null,
  );
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormVisibleHtml, setIsFormVisibleHtml] = useState<string>("");
  const [isFormVisibleHtmlId, setIsFormVisibleHtmlId] = useState<string>("");

  const getselectedSessionId = useLoginDetails(
    (state) => state.selectedSessionId,
  );

  const getStartOfWeekDate = (currentDate: any) => {
    const dayOfWeek = currentDate.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ...)
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Calculate difference to Monday
    const startOfWeek = new Date(currentDate); // Clone the current date
    startOfWeek.setDate(currentDate.getDate() + diffToMonday); // Adjust to the start of the week

    // Format the date as dd-mm-yyyy
    const formattedDate = [
      String(startOfWeek.getDate()).padStart(2, "0"), // Day
      String(startOfWeek.getMonth() + 1).padStart(2, "0"), // Month
      startOfWeek.getFullYear(), // Year
    ].join("-");

    return formattedDate;
  };
  useEffect(() => {
    setSelectedSessionId(getselectedSessionId);
  }, []);
  const fetchData = async (
    currentPage: any,
    rowsPerPage: any,
    selectedTeacherId?: any,
  ) => {
    try {
      if (data.length === 0) {
        const result = await fetchStaffData("", "", "", "", "", "", 2);
        setTotalCount(result.totalCount);
        setData(result.data);
        setLoading(false);
      }
      if (selectedTeacherId) {
        const currentDate = new Date(); // Current date
        const weekStartDate = getStartOfWeekDate(currentDate);

        const result = await fetchSyllabusHTMLData(
          "current_week",
          weekStartDate,
          selectedTeacherId,
        );

        setIsFormVisible((prev) => !prev); // Toggle modal state
        setIsFormVisibleHtml(result);
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };
  const handleDelete = async (id: number) => {
    // Assuming id is the student_id
    router.push(`/admin/student/${id}`);
  };

  useEffect(() => {
    fetchData(page, rowsPerPage, selectedTeacherId);
  }, [page, rowsPerPage, selectedClass, selectedSection, keyword]);

  const handleTeacherChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    fetchData(page, rowsPerPage, event.target.value);

    setSelectedTeacherId(event.target.value);
  };

  const handleRefresh = () => {
    setSelectedTeacherId("");
    setIsFormVisibleHtml("");
  };

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>
            Teachers:
            <select
              value={selectedTeacherId || ""}
              onChange={handleTeacherChange}
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            >
              <option value="">Select</option>
              {data.map((staff: any) => (
                <option key={staff.id} value={staff.id}>
                  {staff.name} {staff.surname} ({staff.employee_id})
                </option>
              ))}
            </select>
          </label>

          <div className={styles.searchGroup}>
            <button onClick={handleRefresh} className={styles.searchButton}>
              Reset
            </button>
          </div>
        </div>
      </div>
      <div
        className="w-full"
        dangerouslySetInnerHTML={{ __html: isFormVisibleHtml }}
      />
    </DefaultLayout>
  );
};

export default StudentDetails;
