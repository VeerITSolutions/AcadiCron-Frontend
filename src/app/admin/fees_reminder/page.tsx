"use client"; // Add this at the top of the file
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";

import {
  createFeesReminder,
  fetchStudentFeesReminderData,
} from "@/services/studentFeesReminderService";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useGlobalState } from "@/context/GlobalContext";

const StudentDetails = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<string>>>([]);
  const { themType, setThemType } = useGlobalState(); //
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();
  const [formData, setFormData] = useState(
    data.map((section: any) => ({
      id: section.id,
      is_active: section.is_active,
      reminder_type: section.reminder_type,
      day: section.day,
    })),
  );
  const fetchData = async (
    currentPage: number,
    rowsPerPage: number,
    selectedClass?: string,
    selectedSection?: string,
    keyword?: string,
  ) => {
    try {
      // Pass selectedClass and selectedSection as parameters to filter data
      const result = await fetchStudentFeesReminderData(
        currentPage + 1,
        rowsPerPage,
      );
      setTotalCount(result.totalCount);

      setData(result.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Handle changes in the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) =>
      prevData.map((section) =>
        section.id === id
          ? {
              ...section,
              [name]: type === "checkbox" ? checked : value,
            }
          : section,
      ),
    );
  };

  // Handle form submission (API request)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await createFeesReminder(formData);

      if (response.ok) {
        alert("Data saved successfully!");
      } else {
        alert("Failed to save data.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data.");
    }
  };

  useEffect(() => {
    fetchData(page, rowsPerPage, selectedClass, selectedSection, keyword);
  }, [page, rowsPerPage, selectedClass, selectedSection, keyword]);
  return (
    <DefaultLayout>
      <div className="student_admission_form ">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"></div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke  shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Fees Reminder
              </h3>
            </div>
            <div className="w-full p-6.5">
              <div className="field">
                <form onSubmit={handleSubmit}>
                  <table className="divide-gray-200 min-w-full divide-y">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Action
                        </th>
                        <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Reminder Type
                        </th>
                        <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Days
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-gray-200 divide-y ">
                      {data.map((section: any) => (
                        <tr key={section.id}>
                          <td className="whitespace-nowrap px-6 py-4">
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                name={"isactive_" + section.id}
                                value={section.is_active}
                                defaultChecked
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-4 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              />
                              <span className="text-gray-900 ml-2 text-sm">
                                {section.is_active ? "Active" : "Inactive"}
                              </span>
                            </label>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <input
                              type="hidden"
                              name="ids[]"
                              value={section.id}
                              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-4 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            <span className="text-gray-900 text-sm">
                              {" "}
                              {section.reminder_type}{" "}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <input
                              type="number"
                              name={"days" + section.id}
                              value={section.day}
                              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-4 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default StudentDetails;
