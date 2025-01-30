"use client"; // Add this at the top of the file
import { useState, useContext } from "react";
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

const staffidcard = () => {
  const { themType, setThemType } = useGlobalState(); //
  const events = [
    { title: "Present", start: "2025-02-01", color: "green" },
    { title: "Absent", start: "2025-02-02", color: "red" },
  ];

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
