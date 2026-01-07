"use client";

import { Package, Tag, BadgeDollarSign, Layers, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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

export default function ProductView({ product }: { product: Product }) {
  return (
    <div className="space-y-6 py-4">
      {/* Header Info */}
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-4xl text-white shadow-lg">
          {product.imageUrl || "📦"}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-sm text-gray-500 font-medium">{product.code}</p>
          <div className="mt-2">
             <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize 
                ${product.stock === 0 ? 'bg-red-100 text-red-700' : 
                  product.stock < 20 ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-green-100 text-green-700'}`}>
                {product.stock === 0 ? 'Out of Stock' : product.stock < 20 ? 'Low Stock' : 'Active'}
              </span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Tag className="w-5 h-5" /></div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase">Category</p>
            <p className="text-sm font-bold text-gray-700">{product.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-lg text-green-600"><BadgeDollarSign className="w-5 h-5" /></div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase">Price</p>
            <p className="text-sm font-bold text-gray-700">${product.price.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Layers className="w-5 h-5" /></div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase">Current Stock</p>
            <p className="text-sm font-bold text-gray-700">{product.stock} Units</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><Info className="w-5 h-5" /></div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase">Product ID</p>
            <p className="text-[10px] font-mono text-gray-500">{product.id}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
        <p className="text-xs text-gray-400 font-semibold uppercase mb-2">Description</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {product.description || "No description provided for this product."}
        </p>
      </div>
    </div>
  );
}