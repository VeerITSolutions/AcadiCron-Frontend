"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./User.module.css"; // Assuming this has your styles
import { createNotification, editNotificationData, fetchNotificationData, deleteNotificationData } from "@/services/notificationService";

import "react-quill/dist/quill.snow.css";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

// Dynamic import for ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const NoticeForm = () => {
  // Quill editor modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
  
    if (type === "checkbox") {
      if (name === "classes") {
        // Update the selectedClassId state with the checked value
        setSelectedClassId(checked ? value : null);
      } else if (name === "sections") {
        // Update the selectedSectionId state with the checked value
        setSelectedSectionId(checked ? value : null);
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [name]: checked
            ? [...(prevState[name] || []), value]
            : prevState[name].filter((item: string) => item !== value),
        }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  
  // Handling file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };


  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<any>>>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [value, setValue] = useState<string>(""); // State for message content
  const [formData, setFormData] = useState({
    title: "",
    publish_date: "",
    date: "",
    message: "",
    message_to: [],
    path: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const token = localStorage.getItem("authToken") || "";

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchNotificationData(currentPage + 1, rowsPerPage);
      setTotalCount(result.totalCount);
      setData(formatStudentCategoryData(result.data));
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };


  const handleDelete = async (id: number) => {
    try {
      await deleteNotificationData(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  // Handle edit action
  const handleEdit = (id: number, title_value: string, publish_date: string, message: string, date:string, message_to:string) => {
    setIsEditing(true);
    setEditCategoryId(id);
    setFormData({ ...formData, title: title_value, publish_date: publish_date, message: message, date: date, message_to: message_to});
  };

  const formatStudentCategoryData = (students: any[]) => {
    return students.map((student: any) => [
      student.title || "N/A",
      student.publish_date || "N/A",
     

    

      <div key={student.id}>
        <IconButton onClick={() => handleEdit(student.title, student.publish_date, student.date, student.message, student.message_to)} aria-label="Edit">
          <Edit />
        </IconButton>
        <IconButton onClick={() => handleDelete(student.id)} aria-label="delete">
          <Delete />
        </IconButton>
      </div>,
    ]);
  };

  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage, token]);

  
  const handleSubmit = async () => {
    try {
      // Fetch the user ID from local storage
      const userId = localStorage.getItem("userId");
  
      // Generate a random notification ID (you can adjust this logic based on your requirements)
      const sendNotificationId = Math.random().toString(36).substr(2, 9);
  
      // Ensure the message from ReactQuill is included in the formData
      setFormData((prevState) => ({
        ...prevState,
        message: value,  // The value from ReactQuill
        created_by: userId,  // Assuming userId is the logged-in user
        created_id: userId,  // Assuming this is also the userId
        class_id: selectedClassId,  // Use the selectedClassId from state
        secid: selectedSectionId,  // Use the selectedSectionId from state
        send_notification_id: sendNotificationId,  // Generate a unique ID for the notification
        roles: formData.message_to,  // Assuming the 'roles' are based on the 'message_to' field
      }));
  
      let result;
  
      // If editing, call the update function
      if (isEditing && editCategoryId !== null) {
        result = await editNotificationData(
          editCategoryId,
          formData.title,
          formData.publish_date,
          formData.date,
          formData.message,
          formData.message_to,
          formData.created_by,
          formData.created_id,
          formData.class_id,
          formData.secid,
          formData.send_notification_id,
          formData.roles
        );
      } else {
        // Otherwise, call the create function
        result = await createNotification(
          formData.title,
          formData.publish_date,
          formData.date,
          formData.message,
          formData.message_to,
          formData.created_by,
          formData.created_id,
          formData.class_id,
          formData.secid,
          formData.send_notification_id,
          formData.roles
        );
      }
  
      if (result.success) {
        toast.success(isEditing ? "Notification updated successfully" : "Notification created successfully");
        setFormData({
          title: "",
          publish_date: "",
          date: "",
          message: "",
          message_to: [],
          path: null,
        });
        setIsEditing(false);
        setEditCategoryId(null);
        fetchData(page, rowsPerPage);  // Refresh data after submission
      } else {
        // Handle errors returned from the API
        const errorMessage = result.message || "An error occurred";
        const errors = result.errors || {};
        toast.error(errorMessage);
  
        if (errors.message) {
          toast.error(`Message: ${errors.message.join(", ")}`);
        }
        if (errors.created_by) {
          toast.error(`Created By: ${errors.created_by.join(", ")}`);
        }
        if (errors.class_id) {
          toast.error(`Class ID: ${errors.class_id.join(", ")}`);
        }
        if (errors.secid) {
          toast.error(`Section ID: ${errors.secid.join(", ")}`);
        }
        if (errors.roles) {
          toast.error(`Roles: ${errors.roles.join(", ")}`);
        }
      }
    } catch (error) {
      console.error("An error occurred", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };
  
  



  return (
  
  
    <DefaultLayout>
     
      <div className="student_admission_form">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"></div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Student Details</h3>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-6 pr-6 pl-6">
              {/* First Column */}
              <div className="col-span-2">
                <div className="field mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Title <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="field mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">Message</label>
                  <ReactQuill value={value} onChange={setValue} modules={modules} style={{ height: "300px" }} />
                </div>

                <div className="field mb-6 pt-9">
                  <label className="block text-sm font-medium text-black dark:text-white">Upload File</label>
                  <input className="form-control mt-2 w-full" type="file" name="file" onChange={handleFileChange} />
                </div>
              </div>

              {/* Second Column */}
              <div className="col-span-1">
              <div className="field mb-6">
  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
    Notice Date <span className="required">*</span>
  </label>
  <input
    id="date"
    name="date"
    value={formData.date}
    onChange={handleInputChange}
    type="date" // Changed from 'text' to 'date'
    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
  />
</div>

<div className="field mb-6">
  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
    Publish On
  </label>
  <input
    id="publish_date"
    name="publish_date"
    value={formData.publish_date}
    onChange={handleInputChange}
    type="date" // Changed from 'text' to 'date'
    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
  />
</div>


                <div className="field mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">Message To</label>
                  <div>
                    <label className="radio-inline">
                      <input type="checkbox" value="student" name="message_to" onChange={handleInputChange} /> Student
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input type="checkbox" value="parent" name="message_to" onChange={handleInputChange} /> Parent
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input type="checkbox" value="admin" name="message_to" onChange={handleInputChange} /> Admin
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input type="checkbox" value="teacher" name="message_to" onChange={handleInputChange} /> Teacher
                    </label>
                  </div>
                </div>

                <div className="field mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">Multiple Select</label>
                  <div>
                    <label className="radio-inline">
                      <input type="checkbox" value="class1" name="classes" onChange={handleInputChange} /> Class 1 to 2
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input type="checkbox" value="class2" name="classes" onChange={handleInputChange} /> Class 3 to 4
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input type="checkbox" value="class3" name="classes" onChange={handleInputChange} /> Class 5 to 7
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input type="checkbox" value="class4" name="classes" onChange={handleInputChange} /> Class 8 to 9
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6.5 py-4">
              <button onClick={handleSubmit} className="flex justify-center rounded bg-primary p-2 font-semibold text-gray">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      </DefaultLayout>
    
  );
};

export default NoticeForm;
