"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, FileText, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Products", icon: Package, href: "/products" },
  { title: "Orders", icon: ShoppingCart, href: "/orders" },
  { title: "Customers", icon: Users, href: "/customers" },
  { title: "Inquiries", icon: FileText, href: "/inquiries" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-[260px] h-screen fixed left-0 top-0 bg-sidebar-gradient text-white z-50 overflow-y-auto transition-all">
      {/* Logo */}
      <div className="p-6 border-b border-white/20 mb-4">
        <h2 className="text-2xl font-bold tracking-wide">Admin Panel</h2>
        <p className="text-xs opacity-80 mt-1">Management System</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        <p className="px-4 text-xs font-semibold uppercase opacity-70 mb-2 mt-4">Main Menu</p>
        
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "bg-white/15 border-l-4 border-white font-medium" 
                  : "hover:bg-white/10 border-l-4 border-transparent hover:border-white/50"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-white/80")} />
              <span>{item.title}</span>
            </Link>
          );
        })}

        <p className="px-4 text-xs font-semibold uppercase opacity-70 mb-2 mt-8">Settings</p>
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all border-l-4 border-transparent"
        >
          <Settings className="w-5 h-5 text-white/80" />
          <span>Settings</span>
        </Link>
      </nav>

      {/* Footer / Logout */}
      <div className="p-6 border-t border-white/20">
        <button className="flex items-center gap-3 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity w-full">
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}