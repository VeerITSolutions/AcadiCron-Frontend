"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import { getClasses } from "@/services/classesService";
import { fetchsectionByClassData } from "@/services/sectionsService";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import {
  fetchItemStock,
  createItemStock,
  deleteItemStock,
  editItemStock,
} from "@/services/ItemStockService";

import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./User.module.css";
import { fetchIteamCategory } from "@/services/ItemCategoryService";
import { fetchItemData } from "@/services/ItemService";
import { fetchItemSupplier } from "@/services/ItemSupplierService";
import { fetchItemStore } from "@/services/ItemStoreService";

const ItemStock = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<any>>([]);
  const [categoryData, setCategoryData] = useState<Array<any>>([]);
  const [ItemData, setItemData] = useState<Array<any>>([]);
  const [supplierData, setSupplierData] = useState<Array<any>>([]);
  const [storeData, setStoreData] = useState<Array<any>>([]);

   const [selectedItemCategoryId, setSelectedItemCategoryId] = useState<string | undefined>(
      undefined,
    );
    const [selectedItemId, setSelectedItemId] = useState<string | undefined>(
      undefined,
    );
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [colorMode, setColorMode] = useColorMode();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const [savedSessionstate, setSavedSession] = useState("");
  const { themType, setThemType } = useGlobalState(); // A

  const [formData, setFormData] = useState({
    item_id: "",
    supplier_id: "",
    symbol: "",
    store_id: "",
    quantity: "",
    purchase_price: "",
    date: "",
    attachment: "",
    description: "",
    is_active: false,
  });

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchItemStock(currentPage + 1, rowsPerPage);

      const resultCategory = await fetchIteamCategory("", "");
      const resultItem = await fetchItemData("", "", "","",selectedItemCategoryId);
      const resultSupplier = await fetchItemSupplier("", "");
      const resultStore = await fetchItemStore("", "");

      setTotalCount(result.total);
      setData(formatSubjectData(result.data));
      setCategoryData(resultCategory.data);
      setItemData(resultItem.data);
      setSupplierData(resultSupplier.data);
      setStoreData(resultStore.data);

      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteItemStock(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      toast.error("Delete failed");
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (id: number, subject: any) => {
    setIsEditing(true);
    setEditCategoryId(id);
  
    setFormData({
      item_id: subject?.item_id || "",
      supplier_id: subject?.supplier_id || "",
      symbol: subject?.symbol || "",
      store_id: subject?.store_id || "",
      quantity: subject?.quantity || "",
      purchase_price: subject?.purchase_price || "",
      date: subject?.date || "",
      attachment: subject?.attachment || "",
      description: subject?.description || "",
      is_active: subject?.is_active || false, // Assuming `false` as default for boolean
    });
    
  };
  

  const handleCancel = () => {
    setFormData({
      item_id: "",
      supplier_id: "",
      symbol: "",
      store_id: "",
      quantity: "",
      purchase_price: "",
      date: "",
      attachment: "",
      description: "",
      is_active: false,
     
    });
    setIsEditing(false);
    setEditCategoryId(null);
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

  const formatSubjectData = (subjects: any[]) => {
    return subjects.map((subject: any) => [
      subject.item_name || "N/A",
      subject.item_category || "N/A",
      subject.supplier_name || "N/A",
      subject.store_name || "N/A",
      subject.quantity || "N/A",
      subject.purchase_price || "N/A",
      subject.date || "N/A",
      <div key={subject.id} className="flex">
        <IconButton
          onClick={() => handleEdit(subject.id, subject)}
          aria-label="edit"
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(subject.id)}
          aria-label="delete"
        >
          <Delete />
        </IconButton>
      </div>,
    ]);
  };

  useEffect(() => {
    fetchData(page, rowsPerPage,);
  }, [page, rowsPerPage, selectedItemCategoryId, selectedItemId]);

  useEffect(() => {
    const savedSession = localStorage.getItem("selectedSessionId");
    if (savedSession) {
      setSavedSession(savedSession);
      // Use this value in your logic
    }
  }, []);

  const handleSubmit = async () => {
    try {
      if (isEditing && editCategoryId !== null) {
        const result = await editItemStock(editCategoryId, formData);
        if (result.success) {
          toast.success("Updated successfully");
        } else {
          toast.error("Failed to update");
        }
      } else {
        const data = {...formData, selectedItemCategoryId: selectedItemCategoryId, item_id: selectedItemId};
        const result = await createItemStock(data);

        setFormData({
          item_id: "",
          supplier_id: "",
          symbol: "",
          store_id: "",
          quantity: "",
          purchase_price: "",
          date: "",
          attachment: "",
          description: "",
          is_active: false,
       
        });

       

        if (result.success) {
          toast.success("Created successfully");
        } else {
          toast.error("Failed to create expenses");
        }
      }
      // Reset form after successful action
      setFormData({
        item_id: "",
        supplier_id: "",
        symbol: "",
        store_id: "",
        quantity: "",
        purchase_price: "",
        date: "",
        attachment: "",
        description: "",
        is_active: false,
      
      });

      setIsEditing(false);
      setEditCategoryId(null);
      fetchData(page, rowsPerPage); // Refresh data after submit
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleItemCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItemCategoryId(event.target.value);
    
  };
  
  const handleItemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItemId(event.target.value);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditCategoryId(null);
    // Clear the input field
  };

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;


  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));
  };


  const columns = [
    "Name", 
    "Category", 
    "Supplier",
    "Store",
    "Quantity",
    "Purchase Price(₹)",
    "Date",
    "Action",
];
  const options = {
    filterType: "checkbox",
    serverSide: true,
    responsive: "standard",
    search: false,
    count: totalCount,
    page,
    rowsPerPage,
    selectableRows: "none", 

    onChangePage: handlePageChange,
    onChangeRowsPerPage: handleRowsPerPageChange,
    filter: false,
    viewColumns: false,
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {isEditing ? "Edit Add Expense" : "Add Item Stock"}
              </h3>
            </div>

            
              <div className="flex flex-col gap-5.5 p-6.5">
              <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Item Category <span className="required">*</span>
                  </label>
                  <select
                  name="item_category_id"
                  value={selectedItemCategoryId || ""}
                  onChange={handleItemCategoryChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  
                  >
                    <option value="">Select</option>
                    {categoryData.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.item_category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Item <span className="required">*</span>
                  </label>
                  <select
                  name="item_id"
                   value={selectedItemId || ""}
                   onChange={handleItemChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select</option>
                    {ItemData.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                 Supply <span className="required">*</span>
                  </label>
                  <select
                  name="supplier_id"
                  value={formData.supplier_id}
                   onChange={handleInputChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select</option>
                    {supplierData.map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.item_supplier}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Store <span className="required">*</span>
                  </label>
                  <select
                  name="store_id"
                  value={formData.store_id}
                  onChange={handleInputChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select</option>
                    {storeData.map((store) => (
                      <option key={store.id} value={store.id}>
                        {store.item_store}
                      </option>
                    ))}
                  </select>
                </div>
               
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Quantity<span className="required">*</span>
                  </label>
                  <input
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    type="Number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Price<span className="required">*</span>
                  </label>
                  <input
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    type="text"
                    name="purchase_price"
                    value={formData.purchase_price}
                    onChange={handleInputChange}
                  />
                </div>
            
                <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Date <span className="required">*</span>
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
           
                <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Attach Document
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="attachment"
                  onChange={handleFileChange}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>

              <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Description
            </label>
            <textarea
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                  onClick={(e) => {
                    e.preventDefault(); 
                    handleSubmit();
                  }}
                >
                  {isEditing ? "Update" : "Save"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                )}
              </div>
              </div>
           
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {loading ? (
            <Loader />
          ) : (
            <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
              <MUIDataTable
                title={"Item Stock List"}
                data={data}
                columns={columns}
                options={options}
              />
            </ThemeProvider>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ItemStock;
