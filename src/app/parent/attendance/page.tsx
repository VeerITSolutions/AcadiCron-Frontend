"use client"; // Add this at the top of the file
import { useState, useContext, useEffect, use } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ThemeProvider } from "@mui/material/styles";

import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import { useGlobalState } from "@/context/GlobalContext";
import { fetchStudentAttendencData } from "@/services/studentAttendence";
import { useLoginDetails } from "@/store/logoStore";

const staffidcard = () => {
  const { themType, setThemType } = useGlobalState(); //
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Array<Array<string>>>([]);
  const [userDataIds, setUserDataIds] = useState<Array<Array<string>>>([]);
  const events = [
    { title: "Present", start: "2025-02-01", color: "green" },
    { title: "Absent", start: "2025-02-02", color: "red" },
  ];

  const getselectedSessionId = useLoginDetails(
    (state) => state.selectedSessionId,
  );

  const userId = useLoginDetails((state) => state.userId);

  const [error, setError] = useState<string | null>(null);
  const fetchData = async () => {
    try {
      const getformData = {
        session_id: getselectedSessionId,
        student_id: userId,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      };
      const result = await fetchStudentAttendencData(getformData);

      setData(result.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
        <DefaultLayout>
          <div className="calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              height="auto"
              aspectRatio={1.5}
            />
            {/*  <div className="legend">
              <span
                className="legend-item"
                style={{ backgroundColor: "green" }}
              >
                Present
              </span>
              <span className="legend-item" style={{ backgroundColor: "red" }}>
                Absent
              </span>
              <span
                className="legend-item"
                style={{ backgroundColor: "orange" }}
              >
                Late
              </span>
              <span className="legend-item" style={{ backgroundColor: "blue" }}>
                Representative
              </span>
            </div> */}
          </div>
          <style jsx>{`
            .calendar-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              height: 80vh;
              width: 100%;
              padding: 20px;
            }
            .legend {
              display: flex;
              gap: 10px;
              margin-top: 10px;
            }
            .legend-item {
              padding: 5px 10px;
              border-radius: 5px;
              color: white;
              font-weight: bold;
            }
            :global(.fc) {
              max-width: 800px;
              width: 100%;
              background: white;
              border-radius: 10px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              padding: 10px;
            }
          `}</style>
        </DefaultLayout>
      </ThemeProvider>
    </>
  );
};

export default staffidcard;
