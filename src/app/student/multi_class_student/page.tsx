"use client"; // Add this at the top of the file
import { useState } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import styles from "./MultiClass.module.css"; // Import CSS module

import MUIDataTable from "mui-datatables";

const columns = [
  "Admission No",
  "Student Name",
  "Class",

  "Category",
  "Mobile Number",
  "Action",
];

const data = [
  ["A12345", "Alice Smith", "10A", "OBC", "+1-555-123-4567", "View"],
  ["B67890", "Bob Johnson", "10B", "General", "+1-555-234-5678", "View"],
  ["C13579", "Charlie Brown", "11A", "SC", "+1-555-345-6789", "View"],
  ["D24680", "Daisy White", "11B", "ST", "+1-555-456-7890", "View"],
  ["A12345", "Alice Smith", "10A", "OBC", "+1-555-123-4567", "View"],
  ["B67890", "Bob Johnson", "10B", "General", "+1-555-234-5678", "View"],
  ["C13579", "Charlie Brown", "11A", "SC", "+1-555-345-6789", "View"],
  ["D24680", "Daisy White", "11B", "ST", "+1-555-456-7890", "View"],

  ["A12345", "Alice Smith", "10A", "OBC", "+1-555-123-4567", "View"],
  ["B67890", "Bob Johnson", "10B", "General", "+1-555-234-5678", "View"],
  ["C13579", "Charlie Brown", "11A", "SC", "+1-555-345-6789", "View"],
  ["D24680", "Daisy White", "11B", "ST", "+1-555-456-7890", "View"],

  ["A12345", "Alice Smith", "10A", "OBC", "+1-555-123-4567", "View"],
  ["B67890", "Bob Johnson", "10B", "General", "+1-555-234-5678", "View"],
  ["C13579", "Charlie Brown", "11A", "SC", "+1-555-345-6789", "View"],
  ["D24680", "Daisy White", "11B", "ST", "+1-555-456-7890", "View"],

  ["A12345", "Alice Smith", "10A", "OBC", "+1-555-123-4567", "View"],
  ["B67890", "Bob Johnson", "10B", "General", "+1-555-234-5678", "View"],
  ["C13579", "Charlie Brown", "11A", "SC", "+1-555-345-6789", "View"],
  ["D24680", "Daisy White", "11B", "ST", "+1-555-456-7890", "View"],

  ["A12345", "Alice Smith", "10A", "OBC", "+1-555-123-4567", "View"],
  ["B67890", "Bob Johnson", "10B", "General", "+1-555-234-5678", "View"],
  ["C13579", "Charlie Brown", "11A", "SC", "+1-555-345-6789", "View"],
  ["D24680", "Daisy White", "11B", "ST", "+1-555-456-7890", "View"],

  ["A12345", "Alice Smith", "10A", "OBC", "+1-555-123-4567", "View"],
  ["B67890", "Bob Johnson", "10B", "General", "+1-555-234-5678", "View"],
  ["C13579", "Charlie Brown", "11A", "SC", "+1-555-345-6789", "View"],
  ["D24680", "Daisy White", "11B", "ST", "+1-555-456-7890", "View"],
];

const options = {
  filterType: "checkbox",
  filter: false, // Disable filter,
  viewColumns: false, // Disable view columns button
};
const multi_class_student = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <DefaultLayout>
      <MUIDataTable
        title={"Multi Class Student List"}
        className={`rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${styles["miui-box-shadow"]}`}
        data={data}
        columns={columns}
        options={options}
      />
    </DefaultLayout>
  );
};

export default multi_class_student;