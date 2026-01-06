import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  className?: string;
  iconGradient: string; // We will pass the specific gradient class here
}

export default function StatsCard({ title, value, icon: Icon, iconGradient }: StatsCardProps) {
  return (
    <Card className="p-6 rounded-[15px] border-none shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_5px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-between bg-white">
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <div className="text-2xl font-bold text-[#333]">{value}</div>
      </div>
      <div className={cn("w-[60px] h-[60px] rounded-xl flex items-center justify-center text-white text-2xl shadow-sm", iconGradient)}>
        <Icon className="w-7 h-7" />
      </div>
    </Card>
  );
}