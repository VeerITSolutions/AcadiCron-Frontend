"use client"; // Add this at the top of the file
import { useState } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
const notic_board = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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

            <div className="p-4">
              {notices.map((notice, index) => (
                <div key={notice.id} className="mb-4 rounded-lg border">
                  <div
                    className="bg-gray-200 flex cursor-pointer items-center justify-between p-4"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h4 className="text-md font-semibold">{notice.title}</h4>
                    <div className="space-x-4">
                      <Link href={`/admin/notification/edit/${notice.id}`}>
                        <i
                          className="fa fa-pencil text-blue-500 hover:text-blue-700"
                          title="Edit"
                        />
                      </Link>
                      <Link href={`/admin/notification/delete/${notice.id}`}>
                        <i
                          className="fa fa-remove text-red-500 hover:text-red-700"
                          title="Delete"
                          onClick={(e) => {
                            if (!confirm("Delete Confirm?")) e.preventDefault();
                          }}
                        />
                      </Link>
                    </div>
                  </div>
                  {activeIndex === index && (
                    <div className="p-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                          <p>{notice.title}</p>
                        </div>
                        <div className="col-span-1 md:col-span-1">
                          <div className="rounded border p-4">
                            <ul className="space-y-2">
                              <li>
                                <i className="fa fa-calendar-check-o mr-2" />
                                Publish Date: {notice.publishDate}
                              </li>
                              <li>
                                <i className="fa fa-calendar mr-2" />
                                Notice Date: {notice.noticeDate}
                              </li>
                              <li>
                                <i className="fa fa-user mr-2" />
                                Created By: {notice.createdBy}
                              </li>
                            </ul>
                            <h4 className="mt-4 text-blue-500">Message To</h4>
                            <ul className="space-y-2">
                              <li>
                                <i className="fa fa-user mr-2" />
                                {notice.messageTo}
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

export default notic_board;
