import { useEffect, useState } from "react";
import apiClient from "@/services/apiClient";
import {
  fetchsectionByClassData,
  fetchsectionData,
} from "@/services/sectionsService";
import { getClasses } from "@/services/classesService";
import styles from "./User.module.css";
import { createStudent } from "@/services/studentService";

const User = () => {
  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State to hold all form inputs as a single object
  const [formData, setFormData] = useState<Record<string, any>>({
    admission_no: "",
    roll_number: "",
    // Add other initial fields as needed
  });

  const fetchClassesAndSections = async () => {
    try {
      const classesResult = await getClasses();
      setClassessData(classesResult.data);

      if (selectedClass) {
        const sectionsResult = await fetchsectionByClassData(selectedClass);
        setSections(sectionsResult.data);
      } else {
        setSections([]);
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const data = {
        ...formData,
        class_id: selectedClass,
        section_id: selectedSection,
      };

      const response = await createStudent(data);

      if (response.status === 200) {
        alert("Data saved successfully");
      } else {
        alert("Error saving data");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassesAndSections();
  }, [selectedClass]);

  return (
    <div className="student_admission_form">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Student Admission
        </h2>
      </div>
      <div className="flex flex-col gap-9">
        <div className="field">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Admission No <span className="required">*</span>
          </label>
          <input
            type="text"
            name="admission_no"
            value={formData.admission_no}
            onChange={handleInputChange}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="field">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Roll Number
          </label>
          <input
            type="text"
            name="roll_number"
            value={formData.roll_number}
            onChange={handleInputChange}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        {/* Add more fields dynamically as needed */}
        <div className="flex">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
