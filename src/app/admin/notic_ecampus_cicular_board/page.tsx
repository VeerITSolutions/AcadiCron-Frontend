"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

import {
  fetchNotificationEcampusCircularData,
  deleteNotificationEcampusCircularData,
} from "@/services/notificationEcampusCircularService";
import React from "react";
import toast from "react-hot-toast";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import {
  Edit,
  Delete,
  Visibility,
  TextFields,
  AttachMoney,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useGlobalState } from "@/context/GlobalContext";
import Image from "next/image";
const StudentDetails = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [data, setData] = useState<Array<Array<string>>>([]);
  const { themType, setThemType } = useGlobalState(); //
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
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage]);
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

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteNotificationEcampusCircularData(id);

      if (response.status == 200) {
        toast.success("Delete successful");
      } else {
        toast.error("Error Delete ");
      }
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/notic_ecampus_cicular_board/edit/${id}`);
  };

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchNotificationEcampusCircularData(
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
  return (
    <DefaultLayout>
      <section className="content py-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg bg-white shadow-lg">
            <div className="flex items-center justify-between bg-[#4a5f87] p-4 text-white">
              <h3 className="flex items-center text-lg font-bold">
                <i className="fa fa-commenting-o mr-2" />
                Ecampus Circular Board
              </h3>
              <Link href="/admin/notic_ecampus_cicular_board/add">
                <button className="btn btn-primary rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                  <i className="fa fa-plus mr-2" />
                  Post New Message
                </button>
              </Link>
            </div>

            <div className="p-4 dark:bg-boxdark dark:drop-shadow-none">
              {data.map((notice: any, index) => (
                <div
                  key={notice.id}
                  className="mb-4 rounded-lg border border-stroke bg-transparent text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark"
                >
                  <div className="bg-gray-200 flex items-center justify-between p-3 dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
                    <div
                      className="cursor-pointer"
                      onClick={() => toggleAccordion(index)}
                    >
                      <h4 className="font-medium text-black dark:text-white ">
                        {notice.title}
                      </h4>
                    </div>

                    <div key={notice.id}>
                      <IconButton
                        className="dark:text-white"
                        onClick={() => handleEdit(notice.id)}
                        aria-label="Edit"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        className="dark:text-white"
                        onClick={() => handleDelete(notice.id)}
                        aria-label="delete"
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  </div>

                  {activeIndex === index && (
                    <div className="border-t border-stroke p-4 dark:border-strokedark ">
                      <div className="grid grid-cols-1 gap-4 dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none md:grid-cols-2">
                        {/* Left Column */}
                        <div>
                          <p>{notice.title}</p>
                          {notice.path ? (
                            <Image
                              src={
                                process.env.NEXT_PUBLIC_BASE_URL + notice.path
                              }
                              className="h-28 w-28 rounded-lg object-cover"
                              alt="No Image"
                            />
                          ) : (
                            ""
                          )}
                        </div>

                        {/* Right Column */}
                        <div className="col-span-1">
                          <div className="rounded border border-stroke p-4 dark:border-strokedark">
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
                            <h4 className="mt-4 text-blue-500 dark:text-white">
                              Message To
                            </h4>
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
