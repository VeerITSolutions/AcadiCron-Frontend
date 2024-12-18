"use client";
import { useState, useEffect } from "react";
import React from "react";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import { fetchTimeTableData } from "@/services/timeTableService";
import Loader from "@/components/common/Loader";
import { toast } from "react-toastify";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";

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
  filter: false, // Disable filter
  search: false, // Disable search
  pagination: false, // Disable pagination
  sort: false, // Disable sorting
  selectableRows: "none", // Disable row selection
  download: false, // Disable download button
  print: false, // Disable print button
  viewColumns: false, // Disable view columns button
  responsive: "standard", // Customize responsiveness if needed
};

const StudentDetails = () => {
  const [data, setData] = useState<any[]>([]);
  const { themType, setThemType } = useGlobalState(); // A
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [colorMode, setColorMode] = useColorMode();

  // Format the data for the week-wise view
  const formatTimetableData = (timetableData: any) => {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const rowData = [];

    // Loop through the day-wise data
    const maxSubjectsPerDay = Math.max(
      ...daysOfWeek.map((day) => timetableData[day]?.length || 0),
    );

    // For each subject time slot (row) add the data for each day
    for (let i = 0; i < maxSubjectsPerDay; i++) {
      const row = daysOfWeek.map((day) => {
        const dayData = timetableData[day]?.[i];
        if (dayData) {
          return `${dayData.time_from} - ${dayData.time_to} (Room ${dayData.room_no})`;
        }
        return "N/A";
      });
      rowData.push(row);
    }
    return rowData;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await fetchTimeTableData(); // Assuming token is passed for authorization
      if (result && result.success) {
        const formattedData = formatTimetableData(result.data);
        setData(formattedData);
      } else {
        setError("Failed to load timetable data.");
      }
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* if (loading) return <Loader />; */
  if (error) return <div>{error}</div>;

  return (
    <DefaultLayout>
      <div className="mx-auto mt-8 max-w-7xl rounded-lg bg-white p-6 shadow-lg dark:bg-boxdark">
        <h1 className="text-gray-900 mb-8 text-2xl font-semibold dark:text-white">
          Teacher Time Table
        </h1>

        <div className="mb-4 flex items-center space-x-4">
          <div className="field">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Teachers <span className="required">*</span>
            </label>
            <select
              id="teachers"
              name="teachers"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="">Select</option>
              <option value="1">Priya Ronghe (19001)</option>
              <option value="2">Harshalata Khante (19002)</option>
              <option value="3">Rushali Patil (19003)</option>
            </select>
          </div>
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="mt-6 rounded-md bg-blue-600 px-6 py-3 font-medium text-white shadow-md hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
            <MUIDataTable
              title={""}
              data={data}
              columns={columns}
              options={options}
            />
          </ThemeProvider>
        )}
      </div>
    </DefaultLayout>
  );
};

export default StudentDetails;
