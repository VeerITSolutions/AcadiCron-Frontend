"use client";
import { useState, useEffect } from "react";
import React from "react";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
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
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import {
  fetchsectionByClassData,
  fetchsectionData,
} from "@/services/sectionsService"; // Import your section API service
import { getClasses } from "@/services/classesService"; // Import your classes API service
import styles from "./StudentDetails.module.css"; // Import CSS module

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
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState<string>("");
  const [colorMode, setColorMode] = useColorMode();
  const { themType, setThemType } = useGlobalState(); // A

  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );

  const [rows, setRows] = useState<{ [key: string]: any[] }>({
    Monday: [
      { subject: "", teacher: "", timeFrom: "", timeTo: "", roomNo: "" },
    ],
    Tuesday: [
      { subject: "", teacher: "", timeFrom: "", timeTo: "", roomNo: "" },
    ],
    Wednesday: [
      { subject: "", teacher: "", timeFrom: "", timeTo: "", roomNo: "" },
    ],
    Thursday: [
      { subject: "", teacher: "", timeFrom: "", timeTo: "", roomNo: "" },
    ],
    Friday: [
      { subject: "", teacher: "", timeFrom: "", timeTo: "", roomNo: "" },
    ],
    Saturday: [
      { subject: "", teacher: "", timeFrom: "", timeTo: "", roomNo: "" },
    ],
    Sunday: [
      { subject: "", teacher: "", timeFrom: "", timeTo: "", roomNo: "" },
    ],
  });

  useEffect(() => {
    fetchClassesAndSections(); // Fetch classes and sections on initial render
  }, [selectedClass]);

  const fetchClassesAndSections = async () => {
    try {
      const classesResult = await getClasses();
      setClassessData(classesResult.data);

      // Fetch sections if a class is selected
      if (selectedClass) {
        const sectionsResult = await fetchsectionByClassData(selectedClass);
        setSections(sectionsResult.data);
      } else {
        setSections([]); // Clear sections if no class is selected
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    setPage(0);
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
    setPage(0);
  };

  // const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setKeyword(event.target.value);
  // };

  const handleSave = (day: string) => {
    const timetableData = {
      classId: selectedClass,
      sectionId: selectedSection,
      day,
      rows: rows[day],
    };

    // Store in local storage
    localStorage.setItem(`timetable_${day}`, JSON.stringify(timetableData));

    console.log(`Saving data for ${day}:`, timetableData);
    toast.success(`Data for ${day} saved successfully!`);
  };
  const handleSearch = () => {
    setPage(0); // Reset to first page on search
    fetchData();
  };
  const handleRefresh = () => {
    setSelectedClass("");
    setSelectedSection("");
    setKeyword("");
  };

  const addRow = (day: string) => {
    setRows({
      ...rows,
      [day]: [
        ...rows[day],
        { subject: "", teacher: "", timeFrom: "", timeTo: "", roomNo: "" },
      ],
    });
  };

  const handleInputChange = (
    day: string,
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
      const result = await fetchtimeTableData();
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
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>
            Class:
            <select
              value={selectedClass || ""}
              onChange={handleClassChange}
              className={styles.select}
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
              className={styles.select}
              disabled={!selectedClass} // Disable section dropdown if no class is selected
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
            Subject Group:
            <select
              // value={selectedSection || ""}
              // onChange={handleSectionChange}
              className={styles.select}
              disabled={!selectedClass} // Disable section dropdown if no class is selected
            >
              <option value="">Select</option>
              {/* {section.map((sec) => (
        <option key={sec.section_id} value={sec.section_id}>
          {sec.section_name}
        </option>
      ))} */}
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
      <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="Timetable Tabs"
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none", // Optional: Remove uppercase
                  fontWeight: 400, // Default font weight
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "lightblue !important", // Active tab indicator color
                },
              }}
            >
              {columns.map((day) => (
                <Tab key={day} label={day} value={day} />
              ))}
            </TabList>
          </Box>

          {columns.map((day) => (
            <TabPanel key={day} value={day}>
              <div className="container mx-auto">
                {/* Add Row Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => addRow(day)}
                    className="rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                  >
                    Add Row
                  </button>
                </div>

                {/* Timetable */}
                <table className="mb-5 mt-5 min-w-full table-auto border-collapse shadow">
                  <thead className="bg-gray-200 text-gray-700">
                    <tr>
                      <th className="px-4 py-4 text-left font-semibold">
                        Subject
                      </th>
                      <th className="px-4 py-4 text-left font-semibold">
                        Teacher
                      </th>
                      <th className="px-4 py-4 text-left font-semibold">
                        Time From
                      </th>
                      <th className="px-4 py-4 text-left font-semibold">
                        Time To
                      </th>
                      <th className="px-4 py-4 text-left font-semibold">
                        Room No
                      </th>
                      <th className="px-4 py-4 text-left font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows[day].map((row, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-100 transition duration-200 ease-in-out"
                      >
                        {/* Subject */}
                        <td className="px-4 py-3">
                          <TextField
                            variant="outlined"
                            size="small"
                            name="subject"
                            className="dark:border-form-strokedark dark:text-white"
                            value={row.subject}
                            onChange={(e: any) =>
                              handleInputChange(day, index, e)
                            }
                            fullWidth
                          />
                        </td>
                        {/* Teacher */}
                        <td className="px-4 py-3">
                          <TextField
                            variant="outlined"
                            size="small"
                            name="teacher"
                            value={row.teacher}
                            onChange={(e: any) =>
                              handleInputChange(day, index, e)
                            }
                            fullWidth
                          />
                        </td>
                        {/* Time From */}
                        <td className="px-4 py-3">
                          <TextField
                            variant="outlined"
                            type="time"
                            size="small"
                            name="timeFrom"
                            value={row.timeFrom}
                            onChange={(e: any) =>
                              handleInputChange(day, index, e)
                            }
                            fullWidth
                          />
                        </td>
                        {/* Time To */}
                        <td className="px-4 py-3">
                          <TextField
                            variant="outlined"
                            type="time"
                            size="small"
                            name="timeTo"
                            value={row.timeTo}
                            onChange={(e: any) =>
                              handleInputChange(day, index, e)
                            }
                            fullWidth
                          />
                        </td>
                        {/* Room No */}
                        <td className="px-4 py-3">
                          <TextField
                            variant="outlined"
                            size="small"
                            name="roomNo"
                            value={row.roomNo}
                            onChange={(e: any) =>
                              handleInputChange(day, index, e)
                            }
                            fullWidth
                          />
                        </td>
                        {/* Action */}
                        <td className="px-4 py-3">
                          <IconButton
                            color="error"
                            onClick={() => removeRow(day, index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Save Button */}
                <button
                  onClick={() => handleSave(day)}
                  className={`rounded px-4.5 py-2 font-medium hover:bg-opacity-80 ${
                    selectedClass && selectedSection
                      ? "bg-primary text-white"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed border-[1.5px] border-stroke bg-transparent dark:border-form-strokedark"
                  }`}
                  disabled={!selectedClass || !selectedSection}
                >
                  Save
                </button>
              </div>
            </TabPanel>
          ))}
        </TabContext>
      </ThemeProvider>
    </DefaultLayout>
  );
};

export default StudentDetails;
