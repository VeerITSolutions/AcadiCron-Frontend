"use client"; // Add this at the top of the file
import { useState } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Create from "@/components/User/Create";

const StudentAdmission = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <DefaultLayout>
      <Create />
    </DefaultLayout>
  );
};

export default StudentAdmission;
