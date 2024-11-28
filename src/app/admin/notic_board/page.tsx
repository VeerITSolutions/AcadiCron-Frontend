"use client"; // Add this at the top of the file
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import { fetchNotificationData } from "@/services/notificationService";
import React from "react";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
const StudentDetails = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [data, setData] = useState<Array<Array<string>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    fetchData(page, rowsPerPage, selectedClass, selectedSection, keyword);
  }, [page, rowsPerPage, selectedClass, selectedSection, keyword]);
  console.log(data);
  const notices = [
    {
      id: 1,
      title: "Independence day celebration",
      publishDate: "13-08-2024",
      noticeDate: "12-08-2024",
      createdBy: "Super Admin",
      messageTo: "Student",
    },
    {
      id: 2,
      title: "Independence day celebration",
      publishDate: "13-08-2024",
      noticeDate: "12-08-2024",
      createdBy: "Super Admin",
      messageTo: "Student",
    },
  ];

  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.id,
      student.title || "N/A",
      student.publish_date,
      student.date,
      student.created_by,
      student.visible_student,
      student.visible_staff,
      student.visible_parent,
    ]);
  };

  const fetchData = async (
    currentPage: number,
    rowsPerPage: number,
    selectedClass?: string,
    selectedSection?: string,
    keyword?: string,
  ) => {
    try {
      const result = await fetchNotificationData(
        currentPage + 1,
        rowsPerPage,
      );
      setTotalCount(result.totalCount);
      const formattedData = formatStudentData(result.data);
      setData(result.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <DefaultLayout>
      <section className="content py-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg bg-white shadow-lg">
            <div className="flex items-center justify-between bg-blue-500 p-4 text-white">
              <h3 className="flex items-center text-lg font-bold">
                <i className="fa fa-commenting-o mr-2" />
                Notice Board
              </h3>
              <Link href="/admin/notic_board/add">
                <button className="btn btn-primary rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                  <i className="fa fa-plus mr-2" />
                  Post New Message
                </button>
              </Link>
            </div>

            <div className="p-4 dark:bg-boxdark dark:drop-shadow-none">
              {data.map((notice: any, index) => (
                <div key={notice.id} className="mb-4 rounded-lg border border-stroke bg-transparent text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark">
                  <div
                    className="bg-gray-200 flex cursor-pointer items-center justify-between p-4 dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h4 className="font-medium text-black dark:text-white ">{notice.title}</h4>
                    <div className="space-x-4 dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white">
                      <Link href={`/admin/notification/edit/${notice.id}`}>
                        <i
                          className="fa fa-pencil text-blue-500 hover:text-blue-700 dark:text-white"
                          title="Edit"
                        />
                      </Link>
                      <Link href={`/admin/notification/delete/${notice.id}`}>
                        <i
                          className="fa fa-remove text-red-500 hover:text-red-700 dark:text-white"
                          title="Delete"
                          onClick={(e) => {
                            if (!confirm("Delete Confirm?")) e.preventDefault();
                          }}
                        />
                      </Link>
                    </div>
                  </div>
                  {activeIndex === index && (
                    <div className="p-4 border-t border-stroke dark:border-strokedark ">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white">
                      {/* Left Column */}
                      <div>
                        <p>{notice.title}</p>
                      </div>

                      {/* Right Column */}
                      <div className="col-span-1">
                        <div className="rounded border p-4 border-stroke dark:border-strokedark">
                          <ul className="space-y-2">
                            <li>
                              <i className="fa fa-calendar-check-o mr-2 dark:text-white" />
                              Publish Date: {notice.publish_date}
                            </li>
                            <li>
                              <i className="fa fa-calendar mr-2 dark:text-white" />
                              Notice Date: {notice.date}
                            </li>
                            <li>
                              <i className="fa fa-user mr-2 dark:text-white" />
                              Created By: {notice.created_by}
                            </li>
                          </ul>
                          <h4 className="mt-4 text-blue-500 dark:text-white">Message To</h4>
                          <ul className="space-y-2 dark:text-white">
                            <li>
                              <i className="fa fa-user mr-2 dark:text-white" />
                              {notice.id}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default StudentDetails;
