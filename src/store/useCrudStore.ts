
import { create } from "zustand";
import {

  fetchStudentCategoryData,
  deleteStudentCategoryData,
  editStudentCategoryData,
} from "../services/studentCategoryService";
import {

    createCategory
  } from "../services/categoryService";
type Item = {
  id: number;
  name: string;
  category: string,
};

type CrudStore = {
  items: Item[];
  fetchCategories: (page?: number, perPage?: number) => Promise<void>;
  addItem: (item: Item) => void;
  updateItem: (id: number, updatedItem: Item) => void;
  deleteItem: (id: number) => void;
  createCategoryAndAddItem: (category: string) => Promise<void>;
  deleteCategoryAndRemoveItem: (id: number) => Promise<void>;
  editCategoryAndUpdateItem: (id: number, category: string) => Promise<void>;
};

export const useCrudStore = create<CrudStore>((set) => ({
  items: [],

  // Fetch categories from the API
  fetchCategories: async (page?: number, perPage?: number) => {
    try {
      const data = await fetchStudentCategoryData(page, perPage);
      set(() => ({
        items: data.data || [], // Ensure API response format matches
      }));
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  },

  // Add an item to the store
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  // Update an existing item in the store
  updateItem: (id, updatedItem) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? updatedItem : item)),
    })),

  // Delete an item from the store
  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  // Create a category and add it to the store
  createCategoryAndAddItem: async (category: string) => {
    try {
      const response = await createCategory(category);
      const newItem: Item = { id: response.id, name: response.name , category: response.category};
      set((state) => ({
        items: [...state.items, newItem],
      }));
    } catch (error) {
      console.error("Failed to create category:", error);
      throw error;
    }
  },

  // Delete a category and remove it from the store
  deleteCategoryAndRemoveItem: async (id: number) => {
    try {
      await deleteStudentCategoryData(id);
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete category:", error);
      throw error;
    }
  },

  // Edit a category and update it in the store
  editCategoryAndUpdateItem: async (id: number, category: string) => {
    try {
      const response = await editStudentCategoryData(id, category);
      const updatedItem: Item = { id: response.id, name: response.name ,category: response.category };
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? updatedItem : item
        ),
      }));
    } catch (error) {
      console.error("Failed to edit category:", error);
      throw error;
    }
  },
}));
