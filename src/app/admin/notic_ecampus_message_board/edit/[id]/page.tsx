"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./User.module.css"; // Assuming this has your styles

import {
  editNotificationEcampusMessageData,
  deleteNotificationEcampusMessageData,
  fetchNotificationEcampusMessageData,
} from "@/services/notificationEcampusMessageService";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";

const NoticeForm = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({
    id: "",
    title: "",
    publish_date: "",
    date: "",
    message: "",
    message_to: [],
    path: null,
  });

  const [token, setToken] = useState<string>("");

  // Quill editor modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };
  const router = useRouter();
  const handleInputChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      | { target: { name: string; value: string } }, // Extend type to include Quill's custom events
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files ? files[0] : null;

    if (file && name) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: file, // Dynamically set the file in formData using the input's name attribute
      }));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const data = {
        ...formData,
      };
      const response = await editNotificationEcampusMessageData(
        formData.id,
        data,
      );

      if (response.status == 200) {
        toast.success("Edit successful");
        router.push(`/admin/notic_board`);
      } else {
        toast.error("Error Edit data");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if window object is available (for server-side rendering compatibility)
    if (typeof window !== "undefined") {
      let id = window.location.pathname.split("/").pop();

      if (id) {
        const getData = async () => {
          try {
            const result = await fetchNotificationEcampusMessageData(
              "",
              "",
              id,
            );

            setFormData(result.data);
            setLoading(false);
          } catch (error: any) {
            setError(error.message);
            setLoading(false);
          }
        };

        getData();
      }
    }
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteNotificationEcampusMessageData(id);
      toast.success("Delete successful");
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <DefaultLayout>
      <div className="student_admission_form">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"></div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Edit Message
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
                    accept="image/*"
                    name="path"
                    onChange={handleFileChange}
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
                    type="date"
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
                    type="date"
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
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="accountant"
                        name="message_to"
                        onChange={handleInputChange}
                      />{" "}
                      Accountant
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="librarian"
                        name="message_to"
                        onChange={handleInputChange}
                      />{" "}
                      Librarian
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="receptionist"
                        name="message_to"
                        onChange={handleInputChange}
                      />{" "}
                      Receptionist
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
                onClick={handleSave}
                className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
              >
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
