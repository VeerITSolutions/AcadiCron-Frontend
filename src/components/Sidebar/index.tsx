"use client";

import React, { memo, useEffect, useRef, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { fetchSchSetting } from "@/services/schSetting";
import { fetchSession } from "@/services/session";
import { useLoginDetails, useLogoStore } from "@/store/logoStore";
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}
interface Session {
  id: string; // or whatever type 'id' should be
  session: string; // or whatever type 'session' should be
}

const Sidebar = memo(({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const logoUrl = useLogoStore((state) => state.logoUrl); // Access lo

  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
  const getselectedSessionId = useLoginDetails(
    (state) => state.selectedSessionId,
  );

  const [defaultSessionYear, setDefaultSessionYear] = useState("");

  const [allSession, setAllSession] = useState<Session[]>([]);

  const StudentDetails = React.lazy(
    () => import("../../app/admin/student_details/page"),
  );

  /*  const [sidebarOpen, setSidebarOpen] = useState(false); */
  const [modalOpen, setModalOpen] = useState(false);
  const getselectedSessionYear = useLoginDetails(
    (state) => state.selectedSessionName,
  );
  const [savedSessionstate, setSavedSession] = useState(getselectedSessionYear);
  const [getRoleId, SetGetRoleId] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const initialize = async () => {
      // Check if role_id and session data are already available
      const roleId = localStorage.getItem("role_id");
      if (roleId) {
        SetGetRoleId(roleId);
      }

      const savedSession = localStorage.getItem("selectedSessionYear");
      if (savedSession) {
        setSavedSession(savedSession);
      }

      // Fetch classes and sections only if required data is not present
      const adminLogo = localStorage.getItem("admin_logo");
      const sessionYear = localStorage.getItem("selectedSessionYear");
      const sessionId = localStorage.getItem("selectedSessionId");

      if (!adminLogo || !sessionYear || !sessionId) {
        await fetchClassesAndSections();
      }
    };

    initialize();
  }, []);

  const fetchClassesAndSections = async () => {
    try {
      const response = await fetchSchSetting();

      // Cache the admin logo
      const adminLogo = response.data.admin_logo;
      localStorage.setItem("admin_logo", adminLogo);
      setImage(
        `${process.env.NEXT_PUBLIC_BASE_URL}uploads/school_content/admin_logo/${adminLogo}`,
      );

      // Cache session year and session ID if not already set
      const sessionYear = localStorage.getItem("selectedSessionYear");
      if (!sessionYear) {
        localStorage.setItem("selectedSessionYear", response.data.session_year);
        setDefaultSessionYear(response.data.session_year);
        setSavedSession(response.data.session_year);
      }

      const sessionId = localStorage.getItem("selectedSessionId");
      if (!sessionId) {
        localStorage.setItem("selectedSessionId", response.data.session_id);
      }
    } catch (error: any) {
      console.error("Error fetching school settings:", error);
    }
  };

  const fetchSessionData = async () => {
    try {
      const classesResult = await fetchSession();
      setAllSession(classesResult.data);
    } catch (error: any) {
      console.error("Error fetching sessions:", error);
    }
  };
  const ChangeFunction = async () => {
    fetchSessionData();
    setModalOpen(true);
  };

  const handleSessionChange = (value: string) => {
    if (value) {
      // Find session by ID
      const result = allSession.find((session: any) => session.id == value);

      // Check if result is not undefined
      if (result) {
        localStorage.setItem("selectedSessionId", value);
        localStorage.setItem("selectedSessionYear", result.session);

        setSavedSession(result.session);

        setModalOpen(false);
        window.location.reload();
      } else {
        // Handle case where no matching session was found, if needed
        console.error("Session not found");
      }
    }
  };

  let menuGroups: any[] = [];
  if (getRoleId === "7") {
    menuGroups = [
      {
        name: "",
        menuItems: [
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 12l10 5 10-5-10-5-10 5zm0 6l10 5 10-5-10-5-10 5z" />
              </svg>
            ),
            label: "Student Information",
            route: "#",
            children: [
              {
                label: "Student Details",
                route: "/admin/student_details",
                component: StudentDetails,
              },
              { label: "Student Admission", route: "/admin/student_admission" },
              { label: "Disabled Students", route: "/admin/disabled_students" },
              {
                label: "Multi Class Student",
                route: "/admin/multi_class_student",
              },
              { label: "Bulk Delete", route: "/admin/bulk_delete" },
              {
                label: "Student Categories",
                route: "/admin/student_categories",
              },
              { label: "Student House", route: "/admin/student_house" },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 1v22M5 10h14M5 14h14M12 7h.01M12 17h.01" />
              </svg>
            ),
            label: "Fees Collection",
            route: "#",
            children: [
              { label: "Collect Fees", route: "/admin/collect_fees" },
              /*  {
                label: "Search Fees Payment",
                route: "/admin/search_fees_payment",
              }, */
              /*  { label: "Search Due Fees", route: "/admin/search_due_fees" }, */
              { label: "Fees Master", route: "/admin/fees_master" },
              { label: "Fees Group", route: "/admin/fees_group" },
              { label: "Fees Type", route: "/admin/fees_type" },
              { label: "Fees Discount", route: "/admin/fees_discount" },
              {
                label: "Fees Carry Forward",
                route: "/admin/fees_carry_forward",
              },
              { label: "Fees Reminder", route: "/admin/fees_reminder" },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20" />
                <path d="M5 10l7-7 7 7" />
                <path d="M9 15h6a2 2 0 0 1 0 4h-6a2 2 0 0 1 0-4z" />
              </svg>
            ),

            label: "Income",
            route: "#",
            children: [
              {
                label: "Add Income",
                route: "/admin/income",
              },
              { label: "Search Income", route: "/admin/income_search" },
              { label: "Income Head", route: "/admin/income_head" },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16v16H4z" />
                <path d="M12 8v8" />
                <path d="M9 10h6" />
                <path d="M16 16l4 4M16 20l4-4" />
              </svg>
            ),
            label: "Expenses",
            route: "#",
            children: [
              {
                label: "Add Expense",
                route: "/admin/expense",
              },
              { label: "Search Expense", route: "/admin/expense_search" },
              { label: "Expense Head", route: "/admin/expense_head" },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 2h16M4 6h16M4 10h16M4 14h16M4 18h16M10 6v12M14 6v12" />
                <path d="M16 17l2 2 4-4" />
              </svg>
            ),
            label: "Attendance",
            route: "#",
            children: [
              {
                label: "Student Attendance",
                route: "/admin/student_attendance",
              },
              /* {
                label: "Attendance By Date",
                route: "/admin/attendance_by_date",
              }, */
              { label: "Approve Leave", route: "/admin/approve_leave" },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="14" rx="2" ry="2" />
                <path d="M10 9l5 3-5 3V9z" />
                <path d="M2 20h20" />
              </svg>
            ),
            label: "Online Courses",
            route: "/admin/online_course_login",
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 2h16M4 6h16M4 10h16M4 14h16M4 18h16M10 6v12M14 6v12" />

                <path d="M16 17l2 2 4-4" />

                <rect x="3" y="3" width="6" height="9" rx="1" />
                <path d="M4 5h4M4 7h4M4 9h2" />
                <path d="M15 3l4 4m-4 0 4-4" />
              </svg>
            ),
            label: "Examinations",
            route: "#",
            children: [
              { label: "Exam Schedule", route: "/admin/exam_schedule" },
              { label: "Exam Result", route: "/admin/examresult" },
              { label: "Design Admit Card", route: "/admin/admitcard" },
              {
                label: "Print Admit Card",
                route: "/admin/examresult/admitcard",
              },
              { label: "Design Marksheet", route: "/admin/marksheet" },
              {
                label: "Print Marksheet",
                route: "/admin/examresult/marksheet",
              },
              { label: "Marks Grade", route: "/admin/grade" },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="14" rx="2" ry="2" />
                <path d="M8 20h8M10 16v4M14 16v4" />

                <rect x="6" y="6" width="12" height="8" rx="1" />
                <path d="M8 8h8M8 10h5" />

                <path d="M16 11l1 1 2-2" />
              </svg>
            ),
            label: "Online Examinations",
            route: "#",
            children: [
              { label: "Online Exam", route: "/admin/onlineexam" },
              { label: "Question Bank", route: "/admin/question" },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18M3 10h18M3 14h18M3 18h18" />
                <path d="M16 16l4 4M16 20l4-4M12 12h6M12 16h6" />
                <path d="M6 3v2M10 3v2" />
              </svg>
            ),
            label: "Lesson Plan",
            route: "#",
            children: [
              { label: "Manage Lesson Plan", route: "/admin/syllabus" },
              {
                label: "Manage Syllabus Status",
                route: "/admin/syllabus/status",
              },
              { label: "Lesson", route: "/admin/lessonplan/lesson" },
              { label: "Topic", route: "/admin/lessonplan/topic" },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12l-10-6-10 6 10 6 10-6zM12 6v12M5 13l7 7 7-7" />
              </svg>
            ),
            label: "Academics",
            route: "#",
            children: [
              {
                label: "Class Timetable",
                route: "/admin/timetable/classreport",
              },
              {
                label: "Teachers Timetable",
                route: "/admin/timetable/mytimetable",
              },
              {
                label: "Assign Class Teacher",
                route: "/admin/teacher/assign_class_teacher",
              },
              { label: "Promote Students", route: "/admin/stdtransfer" },
              { label: "Subject Group", route: "/admin/subjectgroup" },
              { label: "Subjects", route: "/admin/subject" },
              { label: "Class", route: "/admin/classes_section" },
              { label: "Sections", route: "/admin/sections" },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="7" r="4" />
                <path d="M5.5 21c0-4 4-7 6.5-7s6.5 3 6.5 7" />
                <path d="M16 21h2" />
                <path d="M6 21h2" />
              </svg>
            ),
            label: "Human Resource",
            route: "#",
            children: [
              { label: "Staff Directory", route: "/admin/staff" },
              { label: "Staff Attendance", route: "/admin/staffattendance" },
              { label: "Payroll", route: "/admin/payroll" },
              {
                label: "Approve Leave Request",
                route: "/admin/leaverequest/leaverequest",
              },
              /*   { label: "Apply Leave", route: "/admin/staff/leaverequest" }, */
              { label: "Leave Type", route: "/admin/leavetypes" },

              { label: "Department", route: "/admin/department/department" },
              { label: "Designation", route: "/admin/designation/designation" },
              {
                label: "Disabled Staff",
                route: "/admin/staff/disablestafflist",
              },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4zM3 6h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
              </svg>
            ),
            label: "Communicate",
            route: "#",
            children: [
              { label: " Notice Board", route: "/admin/notic_board" },
              {
                label: "Ecampus Circular Board",
                route: "/admin/notic_ecampus_cicular_board",
              },
              {
                label: "Ecampus Message Board",
                route: "/admin/notic_ecampus_message_board",
              },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z" />
                <path d="M12 16v-4M12 8l-4 4M12 8l4 4" />
              </svg>
            ),
            label: "Download Center",
            route: "#",
            children: [
              { label: "Upload Content", route: "/admin/content_section" },
              {
                label: "Assignments",
                route: "/admin/content_section/assignment",
              },
              {
                label: "Study Material",
                route: "/admin/content_section/studymaterial",
              },
              { label: "Syllabus", route: "/admin/content_section/syllabus" },
              {
                label: "Other Downloads",
                route: "/admin/content_section/other_section",
              },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" />
                <path d="M12 5v14M5 12h14" />
                <path d="M9 18l3-3 3 3" />
              </svg>
            ),
            label: "Homework",
            route: "#",
            children: [
              { label: " Add Homework", route: "/admin/add_homework" },
              { label: " Add Class Work", route: "/admin/add_classwork" },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <path d="M7 10h10M7 14h10M7 18h10" />
                <path d="M3 7h18" />
              </svg>
            ),
            label: "Inventory",
            route: "#",
            children: [
              { label: "Issue Item", route: "/admin/issueitem" },
              { label: "Add Item Stock", route: "/admin/itemstock" },
              { label: "Add Item", route: "/admin/item" },
              { label: "Item Category", route: "/admin/itemcategory" },
              { label: "Item Store", route: "/admin/itemstore" },
              { label: "Item Supplier", route: "/admin/itemsupplier" },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 10h16M5 15h14M5 19h14M6 9h12M9 3h6v4h-6z" />
                <circle cx="7" cy="19" r="2" />
                <circle cx="17" cy="19" r="2" />
              </svg>
            ),
            label: "Transport",
            route: "#",
            children: [
              { label: "Routes", route: "/admin/route" },
              { label: "Vehicles", route: "/admin/vehicle" },
              { label: "Assign Vehicle", route: "/admin/vehroute" },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="5" width="16" height="14" rx="2" />
                <path d="M4 10h16M9 5v-2h6v2M7 15h10M9 12h6" />
                <circle cx="7" cy="17" r="1" />
                <circle cx="17" cy="17" r="1" />
              </svg>
            ),
            label: "Hostel",
            route: "#",
            children: [
              { label: "Hostel Rooms", route: "/admin/hostelroom" },
              { label: "Room Type", route: "/admin/roomtype" },
              { label: "Hostel", route: "/admin/hostel" },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4z" />
                <path d="M3 7h18v6H3V7z" />
                <path d="M12 12l-4 4 4 4 4-4-4-4z" />
                <path d="M7 21h10" />
              </svg>
            ),
            label: "Certificate",
            route: "#",
            children: [
              {
                label: "Student Certificate",
                route: "/admin/certificate_section",
              },
              {
                label: "Generate Certificate",
                route: "/admin/generatecertificate",
              },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M3 9h18M7 3v6M17 3v6" />
                <path d="M10 14l2 2 4-4" />
              </svg>
            ),
            label: "Front CMS",
            route: "#",
            children: [
              {
                label: "Event",
                route: "/admin/front/events",
              },
              {
                label: "Gallery",
                route: "/admin/front/gallery",
              },

              {
                label: "News",
                route: "/admin/front/notice",
              },
              {
                label: "Media Manager",
                route: "/admin/front/media",
              },
              {
                label: "Pages",
                route: "/admin/front/page",
              },
              {
                label: "Menus",
                route: "/admin/front/menus",
              },
              {
                label: "Banner Images",
                route: "/admin/front/banner",
              },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9 15l3-3 3 3" />
                <path d="M9 9l3 3 3-3" />
              </svg>
            ),
            label: "Alumni",
            route: "#",
            children: [
              {
                label: "Manage Alumni",
                route: "/admin/alumni/alumnilist",
              },
              {
                label: "Events",
                route: "/admin/alumni/events",
              },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4z" />
                <path d="M3 7h18v6H3V7z" />
                <path d="M12 12l-4 4 4 4 4-4-4-4z" />
                <path d="M7 21h10" />
              </svg>
            ),
            label: "Reports",
            route: "#",
            children: [
              {
                label: "Student Information",
                route: "/admin/report/studentinformation",
              },
              { label: "Finance", route: "/admin/report/finance" },
              { label: "Attendance", route: "/admin/report/attendance" },
              { label: "Examinations", route: "/admin/report/examinations" },
              {
                label: "Online Examinations",
                route: "/admin/onlineexam/report",
              },
              { label: "Lesson Plan", route: "/admin/report/lesson_plan" },
              { label: "Human Resource", route: "/admin/report/staff_report" },
              { label: "Library", route: "/admin/report/library" },
              { label: "Inventory", route: "/admin/report/inventory" },
              {
                label: "Transport",
                route: "/admin/route/studenttransportdetails",
              },
              {
                label: "Hostel",
                route: "/admin/hostelroom/studenthosteldetails",
              },
              { label: "Alumni", route: "/admin/report/alumnireport" },
              { label: "User Log", route: "/admin/userlog" },
              { label: "Audit Trail Report", route: "/admin/audit" },
            ],
          },
        ],
      },
    ];
  }
  /* teacher */
  if (getRoleId === "2") {
    menuGroups = [
      {
        name: "",
        menuItems: [
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 3.68 5 7 7 7s7-3.32 7-7c0-3.87-3.13-7-7-7zM12 14c-5 0-9 3.58-9 7v1h18v-1c0-3.42-4-7-9-7z" />
              </svg>
            ),
            label: "Teacher Information",
            route: "/teacher/student/search",
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3h18v18H3z" />
                <path d="M3 7h18M3 11h18M3 15h18" />
                <path d="M9 3v18" />
                <path d="M15 3v18" />
              </svg>
            ),
            label: "Attendance",
            route: "#",
            children: [
              {
                label: "Student Attendance",
                route: "/teacher/admin/stuattendence",
              },
              /* {
                label: "Attendance By Date",
                route: "/teacher/admin/stuattendence/attendencereport",
              }, */
              {
                label: "Approve Leave",
                route: "/teacher/admin/approve_leave",
              },
            ],
          },

          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                <path d="M6 2v20" />
                <path d="M18 2v20" />
                <path d="M6 8h12" />
                <path d="M6 12h12" />
                <path d="M6 16h12" />
              </svg>
            ),
            label: "Lesson Plan",
            route: "#",
            children: [
              { label: "Manage Lesson Plan", route: "/teacher/syllabus" },
              {
                label: "Manage Syllabus Status",
                route: "/teacher/syllabus/status",
              },
              {
                label: " Lesson",
                route: "/teacher/lessonplan/lesson",
              },
              {
                label: "  Topic",
                route: "/teacher/lessonplan/topic",
              },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2l8 4-8 4-8-4 8-4z" />
                <path d="M4 10v10l8 4 8-4V10" />
                <path d="M12 12v6" />
                <path d="M9 12h6" />
              </svg>
            ),
            label: "Academics",
            route: "#",
            children: [
              {
                label: "Class Timetable",
                route: "/teacher/timetable/classreport",
              },
              {
                label: "Teachers Timetable",
                route: "/teacher/timetable/mytimetable",
              },
            ],
          },

          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4zM3 6h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
              </svg>
            ),
            label: "Communicate",
            route: "#",
            children: [
              { label: " Notice Board", route: "/teacher/notic_board" },
              {
                label: "Ecampus Circular Board",
                route: "/teacher/notic_ecampus_cicular_board",
              },
              {
                label: "Ecampus Message Board",
                route: "/teacher/notic_ecampus_message_board",
              },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z" />
                <path d="M12 16v-4M12 8l-4 4M12 8l4 4" />
              </svg>
            ),
            label: "Download Center",
            route: "#",
            children: [
              { label: "Upload Content", route: "/teacher/content_section" },
              {
                label: "Assignments",
                route: "/teacher/content_section/assignment",
              },
              {
                label: "Study Material",
                route: "/teacher/content_section/studymaterial",
              },
              { label: "Syllabus", route: "/teacher/content_section/syllabus" },
              {
                label: "Other Downloads",
                route: "/teacher/content_section/other_section",
              },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" />
                <path d="M12 5v14M5 12h14" />
                <path d="M9 18l3-3 3 3" />
              </svg>
            ),
            label: "Homework",
            route: "#",
            children: [
              { label: " Add Homework", route: "/teacher/add_homework" },
              { label: " Add Class Work", route: "/teacher/add_classwork" },
            ],
          },
        ],
      },
    ];
  }
  if (getRoleId === "10" || getRoleId === "11") {
    menuGroups = [
      {
        name: "",
        menuItems: [
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                <path d="M4 20c0-2.21 1.79-4 4-4h8c2.21 0 4 1.79 4 4" />
              </svg>
            ),
            label: "My Profile",
            route: "/parent/user/user/dashboard",
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 11h6M12 8v6M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
              </svg>
            ),
            label: "Fees",
            route: "/parent/user/getfees/1",
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
                <path d="M8 14h2v2H8zM14 14h2v2h-2zM8 18h2v2H8zM14 18h2v2h-2z" />
              </svg>
            ),
            label: "Class Timetable",
            route: "/parent/timetable",
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 2h6a2 2 0 0 1 2 2v1H7V4a2 2 0 0 1 2-2z" />
                <path d="M9 12l2 2 4-4M9 20h6M9 16h6M5 6h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
              </svg>
            ),
            label: "Lesson Plan",
            route: "/parent/syllabus",
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                <path d="M8 10h8M8 14h6M9 18l2-2 4 4M8 6h8" />
              </svg>
            ),
            label: "Syllabus Status",
            route: "/parent/syllabus/status",
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
              </svg>
            ),
            label: "Homework",
            route: "/parent/homework",
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <path d="M16 2v4M8 2v4M3 10h18M9 15l2 2 4-4" />
              </svg>
            ),
            label: "Apply Leave",
            route: "/parent/apply_leave",
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v15M9 12l3 3 3-3" />
                <path d="M20 17h-5v2h5a2 2 0 0 0 2-2v-5h-2v5z" />
                <path d="M4 17h5v2H4a2 2 0 0 1-2-2v-5h2v5z" />
                <path d="M20 4h-5V2h5a2 2 0 0 1 2 2v5h-2V4z" />
                <path d="M4 4h5V2H4a2 2 0 0 0-2 2v5h2V4z" />
              </svg>
            ),
            label: "Download Center",
            route: "#",
            children: [
              { label: "Assignments", route: "/parent/content/assignment" },
              {
                label: "Study Material",
                route: "/parent/content/studymaterial",
              },
              { label: "Syllabus", route: "/parent/content/syllabus" },
              {
                label: " Other Downloads",
                route: "/parent/content/other",
              },
            ],
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3h18v18H3z" />
                <path d="M9 7h6M9 11h6M9 15h6" />
                <path d="M7 7H5v2h2V7zM7 11H5v2h2v-2zM7 15H5v2h2v-2z" />
                <circle cx="12" cy="3" r="1" />
              </svg>
            ),
            label: "Attendance",
            route: "/parent/attendance",
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
                <path d="M4 7h16M4 11h16M4 15h16" />
                <path d="M4 7l1 1M20 7l-1 1M4 11l1 1M20 11l-1 1M4 15l1 1M20 15l-1 1" />
              </svg>
            ),
            label: "Notice Board",
            route: "/parent/notification",
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="M21 12V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8" />
                <path d="M16 4l-4 4-4-4M12 14h1.5M10.5 14H12" />
                <path d="M9 19l-2-2 2-2" />
                <path d="M20 16l-2-2-2 2" />
              </svg>
            ),
            label: "Teachers Reviews",
            route: "/parent/teacher",
          },
        ],
      },
    ];
  }

  return (
    <>
      <ClickOutside onClick={() => setSidebarOpen(false)}>
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col
          overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark
          lg:translate-x-0`}
        >
          {/* SIDEBAR HEADER */}
          <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
            <Link prefetch={true} href="/">
              <Image
                width={160}
                height={28}
                src={logoUrl ? logoUrl : image}
                alt="Logo"
                priority
              />
            </Link>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-controls="sidebar"
              className="block lg:hidden"
            >
              <svg
                className="fill-current"
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                  fill=""
                />
              </svg>
            </button>
          </div>
          {/* SIDEBAR HEADER */}

          <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
            {/* Sidebar Menu */}
            <nav className="mt-5 px-4 lg:px-6">
              <button
                className="mb-4 text-white" // Adjust mb-4 to your desired spacing value
                onClick={() => ChangeFunction()}
              >
                Current Session: {savedSessionstate}
              </button>

              <hr />
              {menuGroups?.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                    {group.name}
                  </h3>

                  <ul className="mb-6 flex flex-col gap-1.5">
                    {group.menuItems.map((menuItem: any, menuIndex: any) => (
                      <SidebarItem
                        key={menuIndex}
                        item={menuItem}
                        pageName={pageName}
                        setPageName={setPageName}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
            {/* Sidebar Menu */}
          </div>
        </aside>
      </ClickOutside>

      {/* Button to open modal */}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 ">
          <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-2xl dark:border-strokedark dark:bg-boxdark md:max-w-2xl">
            <div className="mb-6 flex items-center justify-between border-b pb-4 ">
              <h2 className="text-gray-800 text-2xl font-bold ">
                Select Session
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setModalOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <label
                className="text-gray-700 mb-2 block text-lg font-medium"
                htmlFor="session"
              >
                Choose a Session
              </label>
              <select
                id="session"
                className="border-gray-300 w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none dark:border-strokedark dark:bg-boxdark"
                value={getselectedSessionId ?? ""} // Bind the select value to savedSessionstate
                onChange={(e) => handleSessionChange(e.target.value)} // Call function when session changes
              >
                {allSession?.map((cls: any) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.session}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-600 rounded-lg px-6 py-3 font-medium text-white transition"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
Sidebar.displayName = "Sidebar";
export default memo(Sidebar);
