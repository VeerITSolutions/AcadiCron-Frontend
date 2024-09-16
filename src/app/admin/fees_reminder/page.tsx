"use client"; // Add this at the top of the file
import { useState } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";

import DefaultLayout from "@/components/Layouts/DefaultLayout";

const fees_reminder = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return <DefaultLayout>
  


<div className="student_admission_form ">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
         
        </div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
              Fees Reminder
              </h3>
            </div>
            <div className="w-full p-6.5">
              <div className="field">
              <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reminder Type</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <label className="inline-flex items-center">
          <input type="checkbox" name="isactive_1" value="1" defaultChecked className="form-checkbox h-4 w-4 text-blue-600" />
          <span className="ml-2 text-sm text-gray-900">Active</span>
        </label>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input type="hidden" name="ids[]" value="1" />
        <span className="text-sm text-gray-900">Before</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input type="number" name="days1" defaultValue="2" className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </td>
    </tr>

    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <label className="inline-flex items-center">
          <input type="checkbox" name="isactive_2" value="1" defaultChecked className="form-checkbox h-4 w-4 text-blue-600" />
          <span className="ml-2 text-sm text-gray-900">Active</span>
        </label>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input type="hidden" name="ids[]" value="2" />
        <span className="text-sm text-gray-900">Before</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input type="number" name="days2" defaultValue="5" className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </td>
    </tr>

    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <label className="inline-flex items-center">
          <input type="checkbox" name="isactive_3" value="1" defaultChecked className="form-checkbox h-4 w-4 text-blue-600" />
          <span className="ml-2 text-sm text-gray-900">Active</span>
        </label>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input type="hidden" name="ids[]" value="3" />
        <span className="text-sm text-gray-900">After</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input type="number" name="days3" defaultValue="2" className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </td>
    </tr>

    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <label className="inline-flex items-center">
          <input type="checkbox" name="isactive_4" value="1" defaultChecked className="form-checkbox h-4 w-4 text-blue-600" />
          <span className="ml-2 text-sm text-gray-900">Active</span>
        </label>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input type="hidden" name="ids[]" value="4" />
        <span className="text-sm text-gray-900">After</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input type="number" name="days4" defaultValue="5" className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </td>
    </tr>
  </tbody>
</table>


              </div>
              
           

            </div>
          </div>
          

          <div className="flex">
            <button className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80">
              Save
            </button>
          </div>
        </div>
      </div>

  </DefaultLayout>;
};

export default fees_reminder;
