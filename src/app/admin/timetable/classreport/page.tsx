"use client"; // Add this at the top of the file
import { useState, useContext } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";

const staffidcard = () => {
  return <>Hello</>;
};

<<<<<<< HEAD
const StudentDetails = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("authToken") || "";


const [classes, setClassessData] = useState<Array<any>>([]);
const [section, setSections] = useState<Array<any>>([]);
const [selectedClass, setSelectedClass] = useState<string | undefined>(
  undefined,
);
const [selectedSection, setSelectedSection] = useState<string | undefined>(
  undefined,
);
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

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    setPage(0); // Reset to first page on search
    fetchData(page, rowsPerPage, selectedClass, selectedSection, keyword);
  };
  const handleRefresh = () => {
    setSelectedClass("");
    setSelectedSection("");
    setKeyword("");
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  // const CustomHeader = () => (
  //   <div className="flex justify-between items-center">
  //     <h6>Weekly Timetable</h6>
  //     <div className="flex ml-auto">
  //       <a
  //         href="/admin/timetable/create"
  //         className="StudentDetails_searchButton__bCORU"
  //       >
  //         Add
  //       </a>
  //     </div>
      
  //   </div>

    
  // );

  return (
    <DefaultLayout>


<div className={styles.filters}>
<div className={styles.filterGroup}>
  <label className={styles.label}>
    Class:
    <select
      value={selectedClass || ""}
      onChange={handleClassChange}
      className={`${styles.select} dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark`}
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
      className={`${styles.select} dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark`}
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

<ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>


<div className="dark:bg-boxdark dark:drop-shadow-none dark:text-white dark:border-strokedark bg-[#F8F8F8] flex items-center justify-between pt-3 pb-3 px-4 shadow-sm border-b border-[#E0E0E0]">
  <div>
    <h6>Weekly Timetable</h6>
  </div>
  <div>
    <a
      href="/admin/timetable/create"
      className="StudentDetails_searchButton__bCORU"
    >
      Add
    </a>
  </div>
</div>



      <MUIDataTable
         title={''}
        data={data}
        columns={columns}
        options={options}
      />
      </ThemeProvider>
    </DefaultLayout>
  );
};

export default StudentDetails;
=======
export default staffidcard;
>>>>>>> aed60f00f072212c3627c639b7b696f157eb6155
