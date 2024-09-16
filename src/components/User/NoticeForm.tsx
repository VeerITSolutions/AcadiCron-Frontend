"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import dynamic from "next/dynamic";
import { useState } from "react";
import styles from "./User.module.css";
import {
  createNotification,
  editNotificationData,
} from "@/services/notificationService";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const NoticeForm = () => {
  const [value, setValue] = useState("");
  const [formData, setFormData] = useState({
    department_name: "",
    publishon: "",
    message_to: [],
    classes: [],
    file: null,
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

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
      // Handle checkboxes
      const arrayName =
        name === "message_to" || name.startsWith("class") ? name : "";
      setFormData((prevState) => ({
        ...prevState,
        [arrayName]: checked
          ? [...(prevState[arrayName] || []), value]
          : prevState[arrayName].filter((item: string) => item !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleEdit = (id: number, department_name_value: string) => {
    setIsEditing(true);
    setEditCategoryId(id);
    setFormData({
      ...formData,
      department_name: department_name_value,
    });
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("department_name", formData.department_name);
    formDataToSend.append("message", value);
    formDataToSend.append("publishon", formData.publishon);
    formDataToSend.append("message_to", JSON.stringify(formData.message_to));
    formDataToSend.append("classes", JSON.stringify(formData.classes));

    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

    try {
      if (isEditing && editCategoryId !== null) {
        const result = await editNotificationData(
          editCategoryId,
          formDataToSend,
        );
        if (result.success) {
          toast.success("Department updated successfully");
        } else {
          toast.error("Failed to update Department");
        }
      } else {
        const result = await createNotification(formDataToSend);
        if (result.success) {
          toast.success("Department saved successfully");
        } else {
          toast.error("Failed to save Department");
        }
      }

      // Reset form and state
      setFormData({
        department_name: "",
        publishon: "",
        message_to: [],
        classes: [],
        file: null,
      });
      setValue("");
      setIsEditing(false);
      setEditCategoryId(null);
      fetchData(); // Refresh data after submit
    } catch (error) {
      toast.error("An error occurred");
      console.error("An error occurred", error);
    }
  };

  return (
    <>
      {/* <Breadcrumb pageName="FormElements" /> */}
      <div className="student_admission_form ">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"></div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Student Details
              </h3>
            </div>
            <div className="grid gap-5.5 p-6.5 sm:grid-cols-2">
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="department_name"
                  value={formData.department_name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Publish On
                </label>
                <input
                  id="publishon"
                  name="publishon"
                  value={formData.publishon}
                  onChange={handleInputChange}
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Message
                </label>

                <ReactQuill
                  value={value}
                  onChange={setValue}
                  modules={modules}
                  style={{ height: "300px" }}
                />
              </div>

              <div className="grid gap-6">
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Message To <span className="required">*</span>
                  </label>
                  <label className="radio-inline">
                    <input
                      type="checkbox"
                      value="student"
                      name="message_to"
                      onChange={handleInputChange}
                    />{" "}
                    Student
                  </label>
                  <label className="radio-inline">
                    <input
                      type="checkbox"
                      value="parent"
                      name="message_to"
                      onChange={handleInputChange}
                    />{" "}
                    Parent
                  </label>
                  <label className="radio-inline">
                    <input
                      type="checkbox"
                      value="admin"
                      name="message_to"
                      onChange={handleInputChange}
                    />{" "}
                    Admin
                  </label>
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

                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Multiple Select <span className="required">*</span>
                  </label>
                  <label className="radio-inline">
                    <input
                      type="checkbox"
                      value="class1"
                      name="classes"
                      onChange={handleInputChange}
                    />{" "}
                    Class 1 to 2
                  </label>
                  <label className="radio-inline">
                    <input
                      type="checkbox"
                      value="class2"
                      name="classes"
                      onChange={handleInputChange}
                    />{" "}
                    Class 3 to 4
                  </label>
                  <label className="radio-inline">
                    <input
                      type="checkbox"
                      value="class3"
                      name="classes"
                      onChange={handleInputChange}
                    />{" "}
                    Class 5 to 7
                  </label>
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

              <div className="field pt-5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Upload File
                </label>
                <input
                  className={`form-control mt-2 w-full ${styles["f-13"]}`}
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="px-6.5 py-4">
              <button
                onClick={handleSubmit}
                className="flex w-full justify-center rounded bg-primary p-2 font-semibold text-gray"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticeForm;
