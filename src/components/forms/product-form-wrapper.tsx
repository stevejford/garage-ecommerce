"use client";

import { ProductForm } from "./product-form";
import type { ProductFormValues } from "./product-form";

interface ProductFormWrapperProps {
  initialData?: Partial<ProductFormValues>;
  brands: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  subCategories: { id: string; name: string; categoryId: string }[];
  doorTypes: { id: string; name: string }[];
}

export function ProductFormWrapper({
  initialData,
  brands,
  categories,
  subCategories,
  doorTypes,
}: ProductFormWrapperProps) {
  const handleSubmit = (data: Record<string, any>) => {
    // Handle the form submission here
    console.log("Form submitted:", data);
    
    // You can add your submission logic here
    // For example, sending data to an API endpoint
    // fetch('/api/products', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
  };

  return (
    <ProductForm
      initialData={initialData}
      brands={brands}
      categories={categories}
      subCategories={subCategories}
      doorTypes={doorTypes}
      onSubmit={handleSubmit}
    />
  );
}
