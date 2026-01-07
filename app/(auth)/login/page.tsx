"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Login Schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Welcome back!");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#f5f7fa]">
      {/* 2026 Mesh Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-300/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-300/30 blur-[120px]" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 mx-4 bg-white/80 backdrop-blur-xl rounded-[25px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white shadow-lg mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Portal</h1>
          <p className="text-gray-500 mt-2">Enter your credentials to continue</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                {...form.register("email")}
                type="email"
                placeholder="admin@example.com"
                className="pl-12 h-12 bg-white/50 border-gray-200 rounded-xl focus:ring-[#667eea]"
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-xs text-red-500 ml-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                {...form.register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-12 h-12 bg-white/50 border-gray-200 rounded-xl focus:ring-[#667eea]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {form.formState.errors.password && (
              <p className="text-xs text-red-500 ml-1">{form.formState.errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-lg font-bold rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90 transition-all shadow-lg shadow-indigo-200"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Sign In"}
          </Button>

          <div className="text-center mt-6">
            <a href="#" className="text-sm font-medium text-[#667eea] hover:underline">
              Forgot password?
            </a>
          </div>
        </form>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 text-center w-full text-gray-400 text-sm">
        &copy; 2026 Admin Dashboard Boilerplate. All rights reserved.
      </div>
    </div>
  );
}