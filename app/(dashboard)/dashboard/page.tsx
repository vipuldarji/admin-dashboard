"use client";

import { 
  Package, ClipboardList, MessageSquare, Users, 
  Plus, FileText, Mail, BarChart, Search, 
  Eye, Pencil, Trash2, Loader2 
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/hooks/useProducts";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"; // Import Dialog
import ProductForm from "@/components/dashboard/ProductForm";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  price: number;
  stock: number;
  imageUrl?: string | null;
  status: string;
}

export default function DashboardPage() {
  const { data: products, isLoading, isError, refetch } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper to close modal and refresh data
  const handleSuccess = () => {
    setIsModalOpen(false);
    refetch(); // Reload the table data!
  };

  return (
    <div className="space-y-8">
      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Products" value={isLoading ? "..." : products?.length || 0} icon={Package} iconGradient="bg-gradient-to-br from-[#667eea] to-[#764ba2]" />
        <StatsCard title="Active Orders" value="89" icon={ClipboardList} iconGradient="bg-gradient-to-br from-[#11998e] to-[#38ef7d]" />
        <StatsCard title="New Inquiries" value="34" icon={MessageSquare} iconGradient="bg-gradient-to-br from-[#f093fb] to-[#f5576c]" />
        <StatsCard title="Total Customers" value="1,247" icon={Users} iconGradient="bg-gradient-to-br from-[#4facfe] to-[#00f2fe]" />
      </div>

      {/* 2. Quick Actions */}
      <div className="bg-white p-6 rounded-[15px] shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        <h2 className="text-xl font-bold text-[#333] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Quick Action: Add Product (Opens Modal) */}
          <div onClick={() => setIsModalOpen(true)} className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#667eea] bg-[#667eea]/5 rounded-xl cursor-pointer hover:bg-[#667eea]/10 hover:-translate-y-1 transition-all duration-300 group h-full">
            <Plus className="w-6 h-6 text-[#667eea] mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-[#667eea] text-sm md:text-base text-center">Add New Product</span>
          </div>

          {[
            { label: "Create Blog Post", icon: FileText },
            { label: "Send Newsletter", icon: Mail },
            { label: "View Reports", icon: BarChart },
          ].map((action, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#667eea] bg-[#667eea]/5 rounded-xl cursor-pointer hover:bg-[#667eea]/10 hover:-translate-y-1 transition-all duration-300 group h-full">
              <action.icon className="w-6 h-6 text-[#667eea] mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-[#667eea] text-sm md:text-base text-center">{action.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Recent Products Table */}
      <div className="bg-white p-6 rounded-[15px] shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-[#333]">Recent Products</h2>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search products..." className="pl-10 border-2 border-[#e8ecf1] rounded-xl focus-visible:ring-[#667eea]" />
            </div>
            
            <Button className="bg-[#f5f7fa] text-gray-700 hover:bg-gray-200 border-none rounded-xl font-semibold">Filter</Button>
            
            {/* Primary Add Button (Opens Modal) */}
            <Button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90 text-white border-none rounded-xl font-semibold shadow-lg shadow-indigo-200">
              + Add Product
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#f5f7fa] text-left">
                <th className="p-4 rounded-l-lg font-semibold text-sm text-gray-600">Product</th>
                <th className="p-4 font-semibold text-sm text-gray-600">Category</th>
                <th className="p-4 font-semibold text-sm text-gray-600">Stock</th>
                <th className="p-4 font-semibold text-sm text-gray-600">Price</th>
                <th className="p-4 font-semibold text-sm text-gray-600">Status</th>
                <th className="p-4 rounded-r-lg font-semibold text-sm text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading && (
                <tr><td colSpan={6} className="p-8 text-center text-gray-500"><div className="flex items-center justify-center gap-2"><Loader2 className="w-5 h-5 animate-spin text-[#667eea]" /> Loading Data...</div></td></tr>
              )}
              {products?.map((item: Product) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-[50px] h-[50px] rounded-lg bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-xl text-white shadow-sm">{item.imageUrl || "📦"}</div>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{item.category}</td>
                  <td className="p-4 text-sm text-gray-600 font-medium">{item.stock} units</td>
                  <td className="p-4 font-bold text-gray-800">${item.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${item.stock === 0 ? 'bg-[#f8d7da] text-[#721c24]' : item.stock < 20 ? 'bg-[#fff3cd] text-[#856404]' : 'bg-[#d4edda] text-[#155724]'}`}>
                      {item.stock === 0 ? 'Out of Stock' : item.stock < 20 ? 'Low Stock' : 'Active'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 bg-gray-50 hover:bg-gray-200 rounded-lg text-gray-600 transition-all hover:scale-110"><Pencil className="w-4 h-4" /></button>
                      <button className="p-2 bg-gray-50 hover:bg-gray-200 rounded-lg text-gray-600 transition-all hover:scale-110"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 bg-gray-50 hover:bg-red-100 rounded-lg text-red-500 transition-all hover:scale-110"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* THE MODAL */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Add New Product</DialogTitle>
          </DialogHeader>
          <ProductForm onSuccess={handleSuccess} onCancel={() => setIsModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}