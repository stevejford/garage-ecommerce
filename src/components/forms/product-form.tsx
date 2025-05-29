import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CustomUploader } from "@/components/ui/custom-uploader";

// Define the form schema using Zod
const productFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  brandId: z.string().min(1, "Brand is required"),
  categoryId: z.string().min(1, "Category is required"),
  subCategoryId: z.string().optional(),
  doorTypes: z.array(z.string()).min(1, "At least one door type is required"),
  sku: z.string().min(1, "SKU is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  compatibilityNotes: z.string().optional(),
  price: z.coerce.number().positive("Price must be positive"),
  stockQty: z.coerce.number().int().nonnegative("Stock quantity must be non-negative"),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().default(false),
  isArchived: z.boolean().default(false),
  images: z.array(z.string()).default([]),
  manuals: z.array(z.string()).default([]),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  initialData?: Partial<ProductFormValues>;
  brands: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  subCategories: { id: string; name: string; categoryId: string }[];
  doorTypes: { id: string; name: string }[];
  // Using a more specific type for onSubmit
  onSubmit: (data: Record<string, any>) => void;
}

// This is the main form component - no "use client" directive here
export function ProductForm({
  initialData,
  brands,
  categories,
  subCategories,
  doorTypes,
  onSubmit,
}: ProductFormProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    initialData?.categoryId || ""
  );

  const filteredSubCategories = subCategories.filter(
    (subCategory) => subCategory.categoryId === selectedCategoryId
  );

  // Create default values with all required fields
  const defaultValues = {
    name: "",
    brandId: "",
    categoryId: "",
    subCategoryId: "",
    doorTypes: [] as string[],
    sku: "",
    description: "",
    compatibilityNotes: "",
    price: 0,
    stockQty: 0,
    tags: [] as string[],
    isFeatured: false,
    isArchived: false,
    images: [] as string[],
    manuals: [] as string[],
  };

  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialData ? { ...defaultValues, ...initialData } : defaultValues,
  });

  // Create a type-safe submit handler
  const onFormSubmit = form.handleSubmit((data) => {
    // Convert the data to a plain object before passing it to onSubmit
    const serializedData = JSON.parse(JSON.stringify(data));
    onSubmit(serializedData);
  });

  return (
    <form onSubmit={onFormSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              id="name"
              type="text"
              {...form.register("name")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {form.formState.errors.name && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
              SKU
            </label>
            <input
              id="sku"
              type="text"
              {...form.register("sku")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {form.formState.errors.sku && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.sku.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="brandId" className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <select
              id="brandId"
              {...form.register("brandId")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select a brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {form.formState.errors.brandId && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.brandId.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="categoryId"
              {...form.register("categoryId")}
              onChange={(e) => {
                form.setValue("categoryId", e.target.value);
                form.setValue("subCategoryId", "");
                setSelectedCategoryId(e.target.value);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {form.formState.errors.categoryId && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.categoryId.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="subCategoryId" className="block text-sm font-medium text-gray-700">
              Sub-Category
            </label>
            <select
              id="subCategoryId"
              {...form.register("subCategoryId")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={!selectedCategoryId}
            >
              <option value="">Select a sub-category</option>
              {filteredSubCategories.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Door Types
            </label>
            <div className="space-y-2">
              {doorTypes.map((doorType) => (
                <div key={doorType.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`doorType-${doorType.id}`}
                    value={doorType.id}
                    onChange={(e) => {
                      const currentDoorTypes = form.getValues("doorTypes") || [];
                      if (e.target.checked) {
                        form.setValue("doorTypes", [...currentDoorTypes, doorType.id]);
                      } else {
                        form.setValue(
                          "doorTypes",
                          currentDoorTypes.filter((id) => id !== doorType.id)
                        );
                      }
                    }}
                    checked={(form.getValues("doorTypes") || []).includes(doorType.id)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`doorType-${doorType.id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {doorType.name}
                  </label>
                </div>
              ))}
            </div>
            {form.formState.errors.doorTypes && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.doorTypes.message}</p>
            )}
          </div>
        </div>

        {/* Pricing and Inventory */}
        <div className="space-y-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price ($)
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              {...form.register("price")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {form.formState.errors.price && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.price.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="stockQty" className="block text-sm font-medium text-gray-700">
              Stock Quantity
            </label>
            <input
              id="stockQty"
              type="number"
              min="0"
              step="1"
              {...form.register("stockQty")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {form.formState.errors.stockQty && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.stockQty.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                id="isFeatured"
                type="checkbox"
                {...form.register("isFeatured")}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isFeatured" className="ml-2 text-sm text-gray-700">
                Featured Product
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="isArchived"
                type="checkbox"
                {...form.register("isArchived")}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isArchived" className="ml-2 text-sm text-gray-700">
                Archived
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              {...form.register("description")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {form.formState.errors.description && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="compatibilityNotes" className="block text-sm font-medium text-gray-700">
              Compatibility Notes
            </label>
            <textarea
              id="compatibilityNotes"
              rows={3}
              {...form.register("compatibilityNotes")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Images and Manuals */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Product Images</h3>
          <CustomUploader
            endpoint="productImage"
            value={form.getValues("images") || []}
            onValueChange={(urls: string[]) => form.setValue("images", urls)}
            maxFiles={5}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Product Manuals</h3>
          <CustomUploader
            endpoint="productManual"
            value={form.getValues("manuals") || []}
            onValueChange={(urls: string[]) => form.setValue("manuals", urls)}
            maxFiles={3}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          {initialData ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
