"use client";
import { useState, useEffect } from "react";
import React from "react";
import MUIDataTable from "mui-datatables";
import { fetchtimeTableData } from "@/services/timeTableService";
import Loader from "@/components/common/Loader";
import { toast } from "react-toastify";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Tabs from "@mui/material/Tabs";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";

const columns = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const options = {
  filter: false,
  search: false,
  pagination: false,
  sort: false,
  selectableRows: "none",
  download: false,
  print: false,
  viewColumns: false,
  responsive: "standard",
};

const StudentDetails = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState("Monday");
  const [rows, setRows] = useState<{ [key: string]: any[] }>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  const token = localStorage.getItem("authToken") || "";

  const addRow = (day: string) => {
    setRows({
      ...rows,
      [day]: [
        ...rows[day],
        { subject: "", teacher: "", timeFrom: "", timeTo: "", roomNo: "" },
      ],
    });
  };

  const handleInputChange = (day: string, index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedRows = [...rows[day]];
    updatedRows[index][name] = value;
    setRows({ ...rows, [day]: updatedRows });
  };

  const removeRow = (day: string, index: number) => {
    const updatedRows = rows[day].filter((_, i) => i !== index);
    setRows({ ...rows, [day]: updatedRows });
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await fetchtimeTableData(token);
      if (result && result.success) {
        setData(result.data);
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
    setValue(newValue);
  };

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <DefaultLayout>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="Timetable Tabs" variant="scrollable" scrollButtons="auto">
            {columns.map((day) => (
              <Tab key={day} label={day} value={day} />
            ))}
          </TabList>
        </Box>

        {columns.map((day) => (
          <TabPanel key={day} value={day}>
            <div className="container mx-auto mt-8">
              <Button
                variant="contained"
                color="primary"
                onClick={() => addRow(day)}
                sx={{ mb: 2 }}
              >
                Add Row
              </Button>

              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Subject</th>
                    <th className="border px-4 py-2">Teacher</th>
                    <th className="border px-4 py-2">Time From</th>
                    <th className="border px-4 py-2">Time To</th>
                    <th className="border px-4 py-2">Room No</th>
                    <th className="border px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows[day].map((row, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">
                        <TextField
                          variant="outlined"
                          size="small"
                          name="subject"
                          value={row.subject}
                          onChange={(e) => handleInputChange(day, index, e)}
                          fullWidth
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <TextField
                          variant="outlined"
                          size="small"
                          name="teacher"
                          value={row.teacher}
                          onChange={(e) => handleInputChange(day, index, e)}
                          fullWidth
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <TextField
                          variant="outlined"
                          type="time"
                          size="small"
                          name="timeFrom"
                          value={row.timeFrom}
                          onChange={(e) => handleInputChange(day, index, e)}
                          fullWidth
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <TextField
                          variant="outlined"
                          type="time"
                          size="small"
                          name="timeTo"
                          value={row.timeTo}
                          onChange={(e) => handleInputChange(day, index, e)}
                          fullWidth
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <TextField
                          variant="outlined"
                          size="small"
                          name="roomNo"
                          value={row.roomNo}
                          onChange={(e) => handleInputChange(day, index, e)}
                          fullWidth
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <IconButton color="error" onClick={() => removeRow(day, index)}>
                          <DeleteIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>
        ))}
      </TabContext>
    </DefaultLayout>
  );
};

export default StudentDetails;
