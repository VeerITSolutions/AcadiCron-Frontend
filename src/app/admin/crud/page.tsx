"use client";
import React, { useEffect, useState } from "react";
import { useCrudStore } from "../../../store/useCrudStore";

const CategoryManagement = () => {
  const {
    items,
    fetchCategories,
    createCategoryAndAddItem,
    deleteCategoryAndRemoveItem,
    editCategoryAndUpdateItem,
  } = useCrudStore();

  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState({ id: 0, name: "" });

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories(1, 10); // Fetch first page with 10 items per page
  }, []);

  const handleCreate = async () => {
    if (newCategory.trim()) {
      await createCategoryAndAddItem(newCategory);
      setNewCategory("");
    }
  };

  const handleDelete = async (id: number) => {
    await deleteCategoryAndRemoveItem(id);
  };

  const handleEdit = async () => {
    if (editCategory.name.trim()) {
      await editCategoryAndUpdateItem(editCategory.id, editCategory.name);
      setEditCategory({ id: 0, name: "" });
    }
  };

  return (
    <div>
      <h1>Categories</h1>

      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Enter new category"
      />
      <button onClick={handleCreate}>Add Category</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.category}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
            <button onClick={() => setEditCategory(item)}>Edit</button>
          </li>
        ))}
      </ul>

      {editCategory.id > 0 && (
        <div>
          <input
            type="text"
            value={editCategory.name}
            onChange={(e) =>
              setEditCategory({ ...editCategory, name: e.target.value })
            }
            placeholder="Edit category name"
          />
          <button onClick={handleEdit}>Save</button>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
