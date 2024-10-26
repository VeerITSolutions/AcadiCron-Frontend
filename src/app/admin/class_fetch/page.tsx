// components/ClassSectionSelector.tsx
"use client";
import { useEffect, useState } from "react";
import { classesApi, sectionsApi } from "../../../js/fakeApi"; // Adjust the import path as necessary

interface Class {
  id: number;
  name: string;
}

interface Section {
  id: number;
  name: string;
  class_id: number; // Assuming that each section has a `class_id` property
}

const ClassSectionSelector = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [filteredSections, setFilteredSections] = useState<Section[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const classesData: Class[] = await classesApi();
      setClasses(classesData);
    };

    const fetchSections = async () => {
      const sectionsData: Section[] = await sectionsApi();
      setSections(sectionsData);
    };

    fetchClasses();
    fetchSections();
  }, []);

  useEffect(() => {
    if (selectedClassId) {
      const filtered = sections.filter(
        (section) => section.class_id === parseInt(selectedClassId),
      );
      setFilteredSections(filtered);
    } else {
      setFilteredSections([]);
    }
  }, [selectedClassId, sections]);

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClassId(event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="class-select">Select Class:</label>
        <select
          id="class-select"
          onChange={handleClassChange}
          value={selectedClassId}
        >
          <option value="">Select a class</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="section-select">Select Section:</label>
        <select id="section-select" disabled={!selectedClassId}>
          <option value="">Select a section</option>
          {filteredSections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ClassSectionSelector;
