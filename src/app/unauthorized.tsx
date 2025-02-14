"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import "./not-found.css";

import { useGlobalState } from "@/context/GlobalContext";

export default function Unauthorized() {
  const { themType, setThemType } = useGlobalState(); //

  /* themType === "dark" ? darkTheme : lightTheme */
  return (
    <>
      <section
        className={`page_404 ${themType === "dark" ? "dark-theme" : ""}`}
      >
        <div>
          <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-red-500 text-2xl font-bold">
              Unauthorized Access
            </h1>
            <p className="text-gray-600">
              You do not have permission to access this page.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
