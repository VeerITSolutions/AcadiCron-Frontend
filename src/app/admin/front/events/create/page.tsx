"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./User.module.css"; // Assuming this has your styles

import {
  createFrontEventData,
  deleteFrontEventData,
  editFrontEventData,
  fetchFrontEventData,
} from "@/services/frontEventService";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { IconButton, Switch, Button, Modal, Box } from "@mui/material"; // Import Box for modal styling
import { Delete, Edit } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useLoginDetails } from "@/store/logoStore";
import { useGlobalState } from "@/context/GlobalContext";
import { Editor } from "@tinymce/tinymce-react";

const FrontAdd = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [roleId, setRoleId] = useState("");
  const [data, setData] = useState<Array<Array<any>>>([]);
  const { themType, setThemType } = useGlobalState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [roleName, setRoleName] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [value, setValue] = useState<string>(""); // State for message content
  const [formData, setFormData] = useState({
    title: "",
    venue: "",
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0],
    description: "",
    event_type: "events", // Initialize description as an empty string
    enableSwitch: false,
    feature_image: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
  });
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const handleEditorChange = (newContent: any) => {
    setContent(newContent);
    setFormData((prevData) => ({
      ...prevData,
      description: newContent, // Update description in formData with editor content
    }));
    console.log("Content was updated:", newContent);
  };

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchFrontEventData(currentPage + 1, rowsPerPage);
      setTotalCount(result.totalCount);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  let roleIdget = useLoginDetails((state) => state.roleId);
  let username = useLoginDetails((state) => state.username);
  let surname = useLoginDetails((state) => state.surname);
  let roleNameget = useLoginDetails((state) => state.roleName);
  let isSuperAdmin = useLoginDetails((state) => state.isSuperAdmin);
  let selectedSessionId = useLoginDetails((state) => state.selectedSessionId);

  useEffect(() => {
    if (roleNameget) {
      setRoleName(roleNameget);
    }
    if (roleIdget) {
      setRoleId(roleIdget);
    }

    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const data = {
        ...formData,
        created_by: roleName,
        created_id: roleId,
      };

      const response = await createFrontEventData(data);

      if (response.status == 200) {
        toast.success("Added successful");
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

  const openGallery = () => {
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  const selectImage = (image: string) => {
    setSelectedImage(image);
    setContent(
      (prevContent) => `${prevContent}<img src="${image}" alt="Selected" />`,
    );
    closeGallery();
  };

  return (
    <DefaultLayout>
      <div className="student_admission_form">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"></div>
        <div className="flex flex-col gap-9">
          <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Add Event
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-6 p-6">
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
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="flex">
                  <div className="field mb-6">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Venue<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      className="mr-3 rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="field mb-6">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Event Start
                    </label>
                    <input
                      id="start_date"
                      name="start_date"
                      value={
                        formData.start_date ||
                        new Date().toISOString().split("T")[0]
                      }
                      onChange={handleInputChange}
                      type="date"
                      className="mr-3 rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="field mb-6">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Event End
                    </label>
                    <input
                      id="end_date"
                      name="end_date"
                      value={
                        formData.end_date ||
                        new Date().toISOString().split("T")[0]
                      }
                      onChange={handleInputChange}
                      type="date"
                      className="rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="field mb-6 pt-9" style={{ marginTop: "10px" }}>
                  <Button variant="outlined" onClick={openGallery}>
                    Open Gallery
                  </Button>
                  <br />
                </div>

                <div className="field mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Description
                  </label>

                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_API_TINYMCE} // Replace with your TinyMCE API key
                    initialValue=""
                    value={content}
                    onEditorChange={handleEditorChange}
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help",
                    }}
                  />
                </div>
              </div>

              {/* Second Column */}
              <div className="col-span-1">
                <div className="field mb-6 flex pt-9">
                  <Switch
                    id="enableSwitch"
                    className="gap-6"
                    checked={formData.enableSwitch || false}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        enableSwitch: event.target.checked,
                      })
                    }
                  />
                  <label className="ml-2 block text-sm font-medium text-black dark:text-white">
                    Sidebar Setting
                  </label>
                </div>
                <div className="field mb-6 pt-9">
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Featured Image
                  </label>
                  <input
                    className="form-control mt-2 w-full"
                    type="file"
                    accept="image/*"
                    name="feature_image"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="field mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="meta_title"
                    value={formData.meta_title || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="field mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Meta Description
                  </label>
                  <textarea
                    name="meta_description"
                    value={formData.meta_description || ""}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

                <MetaKeywordsInput
                  metaKeywords={formData.meta_keywords}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="px-6.5 py-4">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <Modal open={galleryOpen} onClose={closeGallery}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2>Select an Image</h2>
            {/* Placeholder for gallery images */}
            <div className="gallery">
              <img
                src="https://erp.educron.com/uploads/gallery/media/board-361516_640.jpg"
                alt="Placeholder"
                onClick={() => {
                  selectImage(
                    "https://erp.educron.com/uploads/gallery/media/board-361516_640.jpg",
                  );
                  closeGallery();
                }}
              />
              {/* Add more images as needed */}
            </div>
            <Button onClick={closeGallery}>Close</Button>
          </Box>
        </Modal>
      </div>
    </DefaultLayout>
  );
};

const MetaKeywordsInput = ({ metaKeywords, onChange }: any) => (
  <div className="field mb-6">
    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
      Meta Keywords{" "}
      <span className="text-gray-500 text-xs">(Comma-separated)</span>
    </label>
    <input
      type="text"
      name="meta_keywords"
      value={metaKeywords || ""}
      onChange={onChange}
      placeholder="event,school,notice,announcement"
      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    />
  </div>
);

export default FrontAdd;
