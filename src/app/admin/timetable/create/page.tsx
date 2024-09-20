"use client";
import { useState, useEffect } from "react";
import React from "react";
import MUIDataTable from "mui-datatables";
import { fetchtimeTableData } from "@/services/timeTableService";
import Loader from "@/components/common/Loader";
import { toast } from "react-toastify";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Tabs from '@mui/material/Tabs';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState("1"); // Initialize tab value

  const token = localStorage.getItem("authToken") || "";

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
      ...daysOfWeek.map((day) => timetableData[day]?.length || 0)
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
      const result = await fetchtimeTableData(token); // Assuming token is passed for authorization
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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue); // Set the tab value when user selects a new tab
  };

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <DefaultLayout>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Monday" value="Monday" />
            <Tab label="Tuseday" value="Tuseday" />
            <Tab label="Wednesday" value="Wednesday" />
            <Tab label="Thursday" value="Thursday" />
            <Tab label="Friday" value="Friday" />
            <Tab label="Saturday" value="Saturday" />
            <Tab label="Sunday" value="Sunday" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {/* Example Tab 1 Content */}
          <MUIDataTable
            title={"Weekly Timetable"}
            data={data}
            columns={columns}
            options={options}
          />
        </TabPanel>
        <TabPanel value="2">Tab 2 Content</TabPanel>
        <TabPanel value="3">Tab 3 Content</TabPanel>
      </TabContext>
    </DefaultLayout>
  );
};

export default StudentDetails;
