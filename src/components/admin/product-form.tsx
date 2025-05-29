"use client";

import React, { useState } from "react";
import { Brand, Category, CategoryWithRelations, DoorType, ProductWithRelations, SubCategory } from "@/types/index";

// ProductWithRelations is now imported from @/types/index

interface ProductFormProps {
  action: (formData: FormData) => Promise<void>;
  categories: Category[];
  brands: Brand[];
  doorTypes: DoorType[];
  initialData: ProductWithRelations | null;
}

export default function ProductForm({
  action,
  categories,
  brands,
  doorTypes,
  initialData,
}: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialData?.categoryId || ""
  );

  // Get subcategories for the selected category
  const subCategories = categories
    .find((category) => category.id === selectedCategory)
    ? (categories.find((category) => category.id === selectedCategory) as CategoryWithRelations)?.subCategories || []
    : [];

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      await action(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={initialData?.name || ""}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
              SKU *
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              required
              defaultValue={initialData?.sku || ""}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                step="0.01"
                required
                defaultValue={initialData?.price || ""}
                className="pl-7 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="stockQty" className="block text-sm font-medium text-gray-700">
              Stock Quantity *
            </label>
            <input
              type="number"
              id="stockQty"
              name="stockQty"
              min="0"
              required
              defaultValue={initialData?.stockQty || ""}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        
        {/* Categories and Brands */}
        <div className="space-y-4">
          <div>
            <label htmlFor="brandId" className="block text-sm font-medium text-gray-700">
              Brand *
            </label>
            <select
              id="brandId"
              name="brandId"
              required
              defaultValue={initialData?.brandId || ""}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled>Select a brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              id="categoryId"
              name="categoryId"
              required
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="subCategoryId" className="block text-sm font-medium text-gray-700">
              Sub Category
            </label>
            <select
              id="subCategoryId"
              name="subCategoryId"
              defaultValue={initialData?.subCategoryId || ""}
              disabled={!selectedCategory || subCategories.length === 0}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">None</option>
              {subCategories.map((subCategory: SubCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                id="isFeatured"
                name="isFeatured"
                type="checkbox"
                defaultChecked={initialData?.isFeatured || false}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                Featured Product
              </label>
            </div>
            
            {initialData && (
              <div className="flex items-center">
                <input
                  id="isArchived"
                  name="isArchived"
                  type="checkbox"
                  defaultChecked={initialData?.isArchived || false}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="isArchived" className="ml-2 block text-sm text-gray-700">
                  Archive Product
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          required
          defaultValue={initialData?.description || ""}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      
      {/* Compatibility Notes */}
      <div>
        <label htmlFor="compatibilityNotes" className="block text-sm font-medium text-gray-700">
          Compatibility Notes
        </label>
        <textarea
          id="compatibilityNotes"
          name="compatibilityNotes"
          rows={3}
          defaultValue={initialData?.compatibilityNotes || ""}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? "Saving..." : initialData ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
