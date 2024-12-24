"use client";

import { useEffect, useState } from "react";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { usePathname } from "next/navigation"; // Import usePathname for the current path
import {
  Description as DescriptionIcon,
} from "@mui/icons-material";

const Finance = () => {
  const pathname = usePathname(); // Get the current path
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    if (pathname) {
      setActivePath(pathname); // Set the active path
    }
  }, [pathname]);

  // Links for the reports
  const reportLinks = [
    { href: "/admin/studentfee/reportbyname", label: "Fees Statement" },
    { href: "/admin/transaction/studentacademicreport", label: "Balance Fees Report" },
    { href: "/admin/studentfee/collection_report", label: "Fees Collection Report" },
    { href: "/admin/report/onlinefees_report", label: "Online Fees Collection Report" },
    { href: "/admin/report/income", label: "Income Report" },
    { href: "/admin/report/expense", label: "Expense Report" },
    { href: "/admin/report/payroll", label: "Payroll Report" },
    { href: "/admin/report/incomegroup", label: "Income Group Report" },
    { href: "/admin/report/expensegroup", label: "Expense Group Report" },
  ];

  return (
    <DefaultLayout>
      <div className="col-md-12">
        <div className="box box-primary border-0 mb-8 bg-white shadow-md rounded-lg dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark dark:text-white">
          <div className="box-header border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="box-title text-2xl font-semibold text-gray-800 flex items-center !text-[1.25rem] !leading-[1.75rem] !font-[Satoshi] !font-semibold">
              <i className="fa fa-search mr-2 text-blue-600"></i> Finance
            </h3>
          </div>
          <div className="p-5">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportLinks.map((link) => (
                <li key={link.href} className="col-lg-4 col-md-4 col-sm-6">
                  <a
                    href={link.href}
                    className={`flex items-center font-medium hover:text-[#0070f3] ${
                      activePath === link.href
                        ? "bg-blue-100 dark:bg-blue-800 rounded-md p-2"
                        : ""
                    }`}
                  >
                    <DescriptionIcon className="h-2 w-2 mr-2" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Finance;
