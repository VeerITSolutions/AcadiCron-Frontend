"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 12l10 5 10-5-10-5-10 5zm0 6l10 5 10-5-10-5-10 5z" />
          </svg>
        ),
        label: "Student Information",
        route: "#",
        children: [
          { label: "Student Details", route: "/admin/student_details" },
          { label: "Student Admission", route: "/admin/student_admission" },
          { label: "Disabled Students", route: "/admin/disabled_students" },
          { label: "Multi Class Student", route: "/admin/multi_class_student" },
          { label: "Bulk Delete", route: "/admin/bulk_delete" },
          { label: "Student Categories", route: "/admin/student_categories" },
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 1v22M5 10h14M5 14h14M12 7h.01M12 17h.01" />
          </svg>
        ),
        label: "Fees Collection",
        route: "#",
        children: [
          { label: "Collect Fees", route: "/admin/collect_fees" },
          { label: "Search Fees Payment", route: "/admin/search_fees_payment" },
          { label: "Search Due Fees", route: "/admin/search_due_fees" },
          { label: "Fees Master", route: "/admin/fees_master" },
          { label: "Fees Group", route: "/admin/fees_group" },
          { label: "Fees Type", route: "/admin/fees_type" },
          { label: "Fees Discount", route: "/admin/fees_discount" },
          { label: "Fees Carry Forward", route: "/admin/fees_carry_forward" },
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 2h16M4 6h16M4 10h16M4 14h16M4 18h16M10 6v12M14 6v12" />
            <path d="M16 17l2 2 4-4" />
          </svg>
        ),
        label: "Attendance",
        route: "#",
        children: [
          { label: "Student Attendance", route: "/admin/student_attendance" },
          { label: "Attendance By Date", route: "/admin/attendance_by_date" },
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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
          { label: "Manage Syllabus Status", route: "/admin/syllabus/status" },
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M22 12l-10-6-10 6 10 6 10-6zM12 6v12M5 13l7 7 7-7" />
          </svg>
        ),
        label: "Academics",
        route: "#",
        children: [
          { label: "Class Timetable", route: "/admin/timetable/classreport" },
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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
          { label: "Apply Leave", route: "/admin/staff/leaverequest" },
          { label: "Leave Type", route: "/admin/leavetypes" },
          {
            label: "Teachers Rating",
            route: "/admin/staff/rating",
            hidden: true,
          }, // Added hidden property for display:none
          { label: "Department", route: "/admin/department/department" },
          { label: "Designation", route: "/admin/designation/designation" },
          { label: "Disabled Staff", route: "/admin/staff/disablestafflist" },
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 15a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4zM3 6h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
          </svg>
        ),
        label: "Communicate",
        route: "#",
        children: [{ label: " Notice Board", route: "/admin/notic_board" }],
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 21H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z" />
            <path d="M12 16v-4M12 8l-4 4M12 8l4 4" />
          </svg>
        ),
        label: "Download Center",
        route: "#",
        children: [
          { label: "Upload Content", route: "/admin/content_section" },
          { label: "Assignments", route: "/admin/content_section/assignment" },
          {
            label: "Study Material",
            route: "/admin/content_section/studymaterial",
          },
          { label: "Syllabus", route: "/admin/content_section/syllabus" },
          { label: "Other Downloads", route: "/admin/content_section/other_section" },
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" />
            <path d="M12 5v14M5 12h14" />
            <path d="M9 18l3-3 3 3" />
          </svg>
        ),
        label: "Homework",
        route: "#",
        children: [{ label: " Add Homework", route: "/admin/add_homework" }],
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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
          { label: "Student Certificate", route: "/admin/certificate_section" },
          {
            label: "Generate Certificate",
            route: "/admin/generatecertificate",
          },
          {
            label: "Student ID Card",
            route: "/admin/studentidcard",
            hidden: true,
          }, // Added hidden property for display:none
          {
            label: "Generate ID Card",
            route: "/admin/generateidcard/search",
            hidden: true,
          }, // Added hidden property for display:none
          { label: "Staff ID Card", route: "/admin/staffidcard", hidden: true }, // Added hidden property for display:none
          {
            label: "Generate Staff ID Card",
            route: "/admin/generatestaffidcard",
            hidden: true,
          }, // Added hidden property for display:none
        ],
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col
          overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark
        lg:translate-x-0`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/">
            <Image
              width={176}
              height={32}
              src={"/images/logo/logo.svg"}
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
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
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
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
