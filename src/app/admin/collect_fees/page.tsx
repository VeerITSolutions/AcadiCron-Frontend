"use client"; // Add this at the top of the file
import { useState } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";

import DefaultLayout from "@/components/Layouts/DefaultLayout";

const collect_fees = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return <DefaultLayout>collect_fees</DefaultLayout>;
};

export default collect_fees;
