"use client"; // Add this at the top of the file
import { useState } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";
import styles from "./StudentDetails.module.css"; // Import CSS module
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import User from "@/components/User/User";

const StudentAdmission = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return <DefaultLayout>Hello </DefaultLayout>;
};

export default StudentAdmission;
