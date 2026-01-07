"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { productSchema, ProductFormValues } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ProductFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProductForm({ onSuccess, onCancel }: ProductFormProps) {
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
      description: "" // Added description
    },
  });

  async function onSubmit(data: ProductFormValues) {
    setLoading(true);
    try {
      await axios.post("/api/products", data);
      toast.success("Product created successfully!");
      form.reset(); // Clear form
      onSuccess(); // Close modal
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      
      {/* Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Product Name *</label>
        <Input {...form.register("name")} placeholder="Enter product name" />
        {form.formState.errors.name && <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>}
      </div>

      {/* Code */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Product Code *</label>
        <Input {...form.register("code")} placeholder="e.g. PHAR-2024-001" />
        {form.formState.errors.code && <p className="text-xs text-red-500">{form.formState.errors.code.message}</p>}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Category *</label>
        <Input {...form.register("category")} placeholder="Select category" />
        {form.formState.errors.category && <p className="text-xs text-red-500">{form.formState.errors.category.message}</p>}
      </div>

      {/* Price & Stock Row */}
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

      {/* Description */}
<div className="space-y-2">
  <label className="text-sm font-medium text-gray-700">Description</label>
  {/* Switch Input to Textarea here */}
  <Textarea 
    {...form.register("description")} 
    placeholder="Enter product description" 
    className="resize-none" // Optional: prevents user from resizing it
    rows={4}
  /> 
</div>

      {/* Image (Visual only for now) */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Product Image (Emoji/Icon)</label>
        <Input {...form.register("imageUrl")} placeholder="e.g. 📦" />
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Add Product
        </Button>
      </div>
    </form>
  );
}