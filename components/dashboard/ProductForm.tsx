"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { productSchema, ProductFormValues } from "@/lib/validations";
import { toast } from "sonner";

// Define the shape of product data coming from DB
interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  price: number;
  stock: number;
  imageUrl?: string | null;
  status: string;
  description?: string | null;
}

interface ProductFormProps {
  initialData?: Product | null; // Optional data for editing
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProductForm({ initialData, onSuccess, onCancel }: ProductFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      code: "",
      category: "",
      price: 0,
      stock: 0,
      status: "active" as const,
      imageUrl: "📦",
      description: ""
    },
  });

  // Effect: When initialData changes (user clicks edit), fill the form
  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        code: initialData.code,
        category: initialData.category,
        price: initialData.price,
        stock: initialData.stock,
        status: (initialData.status as "active" | "draft" | "inactive") || "active",
        imageUrl: initialData.imageUrl || "📦",
        description: initialData.description || ""
      });
    } else {
      // If no data (Add mode), reset to empty
      form.reset({
        name: "",
        code: "",
        category: "",
        price: 0,
        stock: 0,
        status: "active",
        imageUrl: "📦",
        description: ""
      });
    }
  }, [initialData, form]);

  async function onSubmit(data: ProductFormValues) {
    setLoading(true);
    try {
      if (initialData) {
        // EDIT MODE: PUT request
        await axios.put(`/api/products/${initialData.id}`, data);
        toast.success("Product updated successfully!");
      } else {
        // CREATE MODE: POST request
        await axios.post("/api/products", data);
        toast.success("Product created successfully!");
      }
      form.reset();
      onSuccess();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Product Name *</label>
        <Input {...form.register("name")} placeholder="Enter product name" />
        {form.formState.errors.name && <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Product Code *</label>
        <Input {...form.register("code")} placeholder="e.g. PHAR-2024-001" />
        {form.formState.errors.code && <p className="text-xs text-red-500">{form.formState.errors.code.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Category *</label>
        <Input {...form.register("category")} placeholder="Select category" />
        {form.formState.errors.category && <p className="text-xs text-red-500">{form.formState.errors.category.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Price (USD) *</label>
          <Input type="number" step="0.01" {...form.register("price")} placeholder="0.00" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Stock Quantity *</label>
          <Input type="number" {...form.register("stock")} placeholder="0" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <Textarea 
          {...form.register("description")} 
          placeholder="Enter product description" 
          className="resize-none" 
          rows={3} 
        /> 
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Product Image (Emoji/Icon)</label>
        <Input {...form.register("imageUrl")} placeholder="e.g. 📦" />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          {initialData ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
}