"use client"; // Add this at the top of the file
import { useState } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import User from "@/components/User/User";

const Fees = () => {
  const router = useRouter();
  const { id } = useParams(); // `id` will be

  return (
    <DefaultLayout>
      <div>Fees ID: {id}</div>
    </DefaultLayout>
  );
};

export default Fees;