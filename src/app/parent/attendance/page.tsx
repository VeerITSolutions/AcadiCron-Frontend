"use client"; // Add this at the top of the file
import { useState } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import User from "@/components/User/User";
import Image from 'next/image';


const student = () => {
  const router = useRouter();
  const { id } = useParams(); // `id` will be

  const [activeTab, setActiveTab] = useState('activity');

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleButtonClick = () => {
    setIsFormVisible(!isFormVisible);
  };


  return (
    <DefaultLayout>
     
     <div className="p-6 bg-white shadow-md rounded-lg">
   
      <div className="flex justify-between items-center mb-4">
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
          <span className="glyphicon glyphicon-chevron-left" />
        </button>
        <span className="text-lg font-semibold">November 2024</span>
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
          <span className="glyphicon glyphicon-chevron-right" />
        </button>
      </div>
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Mon</th>
            <th className="p-2">Tue</th>
            <th className="p-2">Wed</th>
            <th className="p-2">Thu</th>
            <th className="p-2">Fri</th>
            <th className="p-2">Sat</th>
            <th className="p-2">Sun</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }, (_, weekIndex) => (
            <tr key={weekIndex}>
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const dayNumber = weekIndex * 7 + dayIndex + 1;
                return (
                  <td key={dayIndex} className="border p-4">
                    <div
                      className={`day ${dayNumber <= 30 ? 'text-gray-800' : 'text-gray-400'}`}
                    >
                      {dayNumber <= 30 ? dayNumber : ''}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex flex-wrap">
        <div className="flex items-center mr-4">
          <div className="event-styled grade-1 w-4 h-4 bg-red-500 mr-2" />
          <span>Absent</span>
        </div>
        <div className="flex items-center mr-4">
          <div className="event-styled grade-4 w-4 h-4 bg-green-500 mr-2" />
          <span>Present</span>
        </div>
        <div className="flex items-center mr-4">
          <div className="event-styled grade-3 w-4 h-4 bg-yellow-500 mr-2" />
          <span>Late</span>
        </div>
        <div className="flex items-center mr-4">
          <div className="event-styled grade-2 w-4 h-4 bg-blue-500 mr-2" />
          <span>Half Day</span>
        </div>
        <div className="flex items-center mr-4">
          <div className="event-styled grade-5 w-4 h-4 bg-gray-300 mr-2" />
          <span>Holiday</span>
        </div>
      </div>
    </div>

    </DefaultLayout>
  );
};

export default student;
