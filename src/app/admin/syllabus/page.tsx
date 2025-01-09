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
  const [isFormVisibleHtml, setIsFormVisibleHtml] = useState<
    Array<Array<string>>
  >([]);
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
        setIsFormVisibleHtml(result.data.timetable);
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
  const today = new Date(); // Get today's date
  const [weekStart, setWeekStart] = useState(getWeekStart(today));
  const [weekEnd, setWeekEnd] = useState(getWeekEnd(weekStart));

  // Function to calculate the start of the week
  function getWeekStart(date: any) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(date.setDate(diff));
  }

  // Function to calculate the end of the week
  function getWeekEnd(startDate: any) {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    return endDate;
  }

  // Handle date change
  const handleDateChange = (direction: any) => {
    const newStartDate = new Date(weekStart);
    if (direction === "pre_week") {
      newStartDate.setDate(newStartDate.getDate() - 7);
    } else if (direction === "next_week") {
      newStartDate.setDate(newStartDate.getDate() + 7);
    }
    setWeekStart(newStartDate);
    setWeekEnd(getWeekEnd(newStartDate));
  };
  const handleRefresh = () => {
    setSelectedTeacherId("");
    setIsFormVisibleHtml([]);
  };
  // In your Next.js component
  const getWeekDates = async (status: any, date: any, staff_id: any) => {
    try {
      const res = await fetch("/api/get-weekdates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, date, staff_id }),
      });

      const data = await res.json();

      // Handle the data (for example, updating the page content)
      /* document.getElementById('weekdates_result').innerHTML = data.join('<br/>'); */
    } catch (error) {
      console.error("Error fetching week dates:", error);
    }
  };

  const weekdays = [
    { name: "Monday", date: "06-01-2025" },
    { name: "Tuesday", date: "07-01-2025" },
    { name: "Wednesday", date: "08-01-2025" },
    { name: "Thursday", date: "09-01-2025" },
    { name: "Friday", date: "10-01-2025" },
    { name: "Saturday", date: "11-01-2025" },
    { name: "Sunday", date: "12-01-2025" },
  ];

  const schedule = [
    "Math Class at 9 AM",
    "Science Workshop at 10 AM",
    "History Lecture at 11 AM",
    "Art Session at 2 PM",
    "PE Class at 3 PM",
    "Music Rehearsal at 4 PM",
    "Library Time at 5 PM",
  ];

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
      {isFormVisibleHtml ? (
        <>
          <div className="box-header text-center">
            <button
              className="fa fa-angle-left datearrow btn btn-primary"
              onClick={() => handleDateChange("pre_week")}
            >
              Previous Week
            </button>

            <h3 className="box-title bmedium">
              {weekStart.toLocaleDateString()} to {weekEnd.toLocaleDateString()}
            </h3>

            <button
              className="fa fa-angle-right datearrow btn btn-primary"
              onClick={() => handleDateChange("next_week")}
            >
              Next Week
            </button>

            <input
              type="hidden"
              id="this_week_start"
              value={weekStart.toISOString().split("T")[0]}
            />
          </div>

          {/* Schedule Table */}
          <div className="table-responsive">
            <table className="table-bordered table">
              <thead>
                <tr>
                  {Object.entries(isFormVisibleHtml).map(([day, status]) => (
                    <th key={day} className="text text-center">
                      {day}
                      <br />
                      <span className="bmedium">{status}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Object.entries(isFormVisibleHtml).map(([day, status]) => (
                    <td key={day} className="text text-center">
                      <div className="attachment-block clearfix">
                        <b className="text text-center">{day}</b>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        ""
      )}

      {/* Responsive Styles */}
      <style jsx>{`
        .box-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px;

          border: 1px solid #dee2e6;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .box-header button {
          padding: 10px 15px;
          border-radius: 5px;
          font-size: 14px;
          color: white;
          background-color: #007bff;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .box-header button:hover {
          background-color: #0056b3;
        }
        .box-header h3 {
          font-size: 18px;
          font-weight: bold;
          margin: 0;
          text-align: center;
        }
        @media (max-width: 768px) {
          .box-header {
            flex-direction: column;
            gap: 10px;
          }
          .box-header button {
            width: 100%;
          }
          .box-header h3 {
            font-size: 16px;
          }
        }
        .table-responsive {
          overflow-x: auto;
          display: block;
          width: 100%;
        }
        .box-header {
          margin-bottom: 1rem;
        }
        @media (max-width: 768px) {
          .table-responsive th,
          .table-responsive td {
            font-size: 12px;
            padding: 8px;
          }
        }
        .table {
          border-collapse: collapse;
          width: 100%;
          margin-top: 20px;
        }
        .table-bordered th,
        .table-bordered td {
          border: 1px solid #dee2e6;
          padding: 10px;
          text-align: center;
        }
        .table-bordered th {
          background-color: #f8f9fa;
          font-weight: bold;
        }
        .table-bordered tbody tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .attachment-block {
          padding: 5px;
        }
        .table-responsive {
          overflow-x: auto;
        }
      `}</style>
    </DefaultLayout>
  );
};

export default StudentDetails;
