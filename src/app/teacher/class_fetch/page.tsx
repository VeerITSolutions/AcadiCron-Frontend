// components/ClassSectionSelector.js
"use client";
import { useEffect, useState } from "react";
import { classesApi, sectionsApi } from "../../../js/fakeApi"; // Adjust the import path as necessary

const ClassSectionSelector = () => {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [filteredSections, setFilteredSections] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const classesData = await classesApi();
      setClasses(classesData);
    };

    const fetchSections = async () => {
      const sectionsData = await sectionsApi();
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

  const handleClassChange = (event) => {
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
