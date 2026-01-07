"use client";

import ProductForm from "@/components/dashboard/ProductForm";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
        <p className="text-gray-500 text-sm">Create a new item in your inventory</p>
      </div>
      
      {/* Fix: Pass the required props */}
      <ProductForm 
        onSuccess={() => router.push('/dashboard')} 
        onCancel={() => router.back()} 
      />
    </div>
  );
}