"use client";

import { Bell, Search, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export default function Header() {
  return (
    <header className="h-[72px] bg-white border-b flex items-center justify-between px-4 md:px-8 shadow-sm sticky top-0 z-40">
      {/* Left: Mobile Toggle & Title */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Overview</h1>
        </div>
      </div>

      {/* Right: Search, Icons, Profile */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Search Bar (Hidden on mobile) */}
        <div className="hidden md:flex relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search..." 
            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl" 
          />
        </div>

        {/* Notification Icon */}
        <button className="relative p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 border-l pl-4 md:pl-6">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-700">Admin User</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar className="h-10 w-10 border-2 border-purple-100 cursor-pointer hover:opacity-80 transition-opacity">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white">AD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}