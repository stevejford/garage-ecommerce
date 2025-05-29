import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import ProductForm from "@/components/admin/product-form";

export default async function NewProductPage() {
  // Fetch categories and brands for the form
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const brands = await db.brand.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const doorTypes = await db.doorType.findMany({
    orderBy: {
      name: "asc",
    },
  });

  // Create a new product
  async function createProduct(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const sku = formData.get("sku") as string;
    const price = parseFloat(formData.get("price") as string);
    const stockQty = parseInt(formData.get("stockQty") as string);
    const description = formData.get("description") as string;
    const brandId = formData.get("brandId") as string;
    const categoryId = formData.get("categoryId") as string;
    const subCategoryId = formData.get("subCategoryId") as string || undefined;
    const compatibilityNotes = formData.get("compatibilityNotes") as string || undefined;
    const isFeatured = formData.get("isFeatured") === "on";
    
    // Create the product
    await db.product.create({
      data: {
        name,
        sku,
        price,
        stockQty,
        description,
        brandId,
        categoryId,
        subCategoryId: subCategoryId || null,
        compatibilityNotes,
        isFeatured,
      },
    });

    // Redirect to the products list
    redirect("/admin/products");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add New Product</h1>
        <Link 
          href="/admin/products" 
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <ProductForm 
          action={createProduct}
          categories={categories}
          brands={brands}
          doorTypes={doorTypes}
          initialData={null}
        />
      </div>
    </div>
  );
}
