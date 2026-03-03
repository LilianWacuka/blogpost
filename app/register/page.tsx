"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { Eye, EyeOff, Loader2 } from "lucide-react"; 

export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage("Registration successful!");
        // Log in user automatically after registration
        login(data.user.id);
        // Redirect to create post
        router.push('/post/new');
      } else {
        setMessage(data.error || "Registration failed");
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <Card className="p-6">
        <h1 className="text-2xl font-bold text-center text-black mb-6">Create an Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-black">Username</label>
            <Input 
              className="text-black"
              placeholder="johndoe"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-black text-sm font-medium">Email</label>
            <Input 
              className="text-black"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password with Eye Toggle */}
          <div className="space-y-1">
            <label className="text-black text-sm font-medium">Password</label>
            <div className="relative">
              <Input 
                className="text-black pr-10" // pr-10 leaves space for the icon
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...</>
            ) : (
              "Register"
            )}
          </Button>
        </form>

        <p className="text-sm text-center text-zinc-600 mt-6">
          Already have an account? {" "}
          <Link href="/login" className="font-semibold text-blue-600 hover:underline">
            Login
          </Link>
        </p>

        {message && (
          <p className={`mt-4 text-center text-sm ${message.includes("successful") ? "text-green-600" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </Card>
    </div>
  );
}