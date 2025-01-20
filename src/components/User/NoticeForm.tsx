"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./User.module.css"; // Assuming this has your styles
import {
  createNotification,
  editNotificationData,
} from "@/services/notificationService";

// Dynamic import for ReactQuill

const NoticeForm = () => {
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

  // Quill editor modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  // Handling input changes (checkbox, text, file)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    /*  if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked
          ? [...(prevState[name] || []), value]
          : prevState[name].filter((item: string) => item !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    } */
  };

  // Handling file input change
  /* const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  }; */

  // Handle edit action
  const handleEdit = (
    id: number,
    title_value: string,
    publish_date: string,
    message: string,
    date: string,
  ) => {
    setIsEditing(true);
    setEditCategoryId(id);
    setFormData({
      ...formData,
      title: title_value,
      publish_date: publish_date,
      message: message,
      date: date,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    const formDataToSend = new FormData();

    // Map formData to your required structure

    formDataToSend.append("title", formData.title);
    formDataToSend.append("publish_date", formData.publish_date);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("message", value);

    try {
      // Check if editing or creating a new entry
      /* if (isEditing && editCategoryId !== null) {
        const result = await editNotificationData(
          editCategoryId,
          formDataToSend,
        );
        if (result.success) {
          toast.success("Notification updated successfully");
        } else {
          toast.error("Failed to update notification");
        }
      } else {
        const result = await createNotification(formDataToSend);
        if (result.success) {
          toast.success("Notification created successfully");
        } else {
          toast.error("Failed to create notification");
        }
      } */

      // Reset form and state after submission
      /*  setFormData({
        title: "",
        publish_date: "",
        date: "",
        message: "",

        file: null,
      }); */
      setValue("");
      setIsEditing(false);
      setEditCategoryId(null);
      /*   fetchData();  */ // Assuming this fetches fresh data
    } catch (error) {
      toast.error("An error occurred while saving the form");
      console.error("Submission error:", error);
    }
  };
  return (
    <>
      <div className="student_admission_form">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"></div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Student Details
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-6 pl-6 pr-6 pt-6">
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
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Message
                  </label>
                </div>

                <div className="field mb-6 pt-9">
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Upload File
                  </label>
                  <input
                    className="form-control mt-2 w-full"
                    type="file"
                    name="file"
                    /* onChange={handleFileChange} */
                  />
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
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Message To
                  </label>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="student"
                        name="message_to"
                        onChange={handleInputChange}
                      />{" "}
                      Student
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="parent"
                        name="message_to"
                        onChange={handleInputChange}
                      />{" "}
                      Parent
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="admin"
                        name="message_to"
                        onChange={handleInputChange}
                      />{" "}
                      Admin
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="teacher"
                        name="message_to"
                        onChange={handleInputChange}
                      />{" "}
                      Teacher
                    </label>
                  </div>
                </div>

                <div className="field mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Multiple Select
                  </label>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="class1"
                        name="classes"
                        onChange={handleInputChange}
                      />{" "}
                      Class 1 to 2
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="class2"
                        name="classes"
                        onChange={handleInputChange}
                      />{" "}
                      Class 3 to 4
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="class3"
                        name="classes"
                        onChange={handleInputChange}
                      />{" "}
                      Class 5 to 7
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="class4"
                        name="classes"
                        onChange={handleInputChange}
                      />{" "}
                      Class 8 to 9
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6.5 py-4">
              <button
                onClick={handleSubmit}
                className="flex justify-center rounded bg-primary p-2 font-semibold text-gray"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticeForm;
