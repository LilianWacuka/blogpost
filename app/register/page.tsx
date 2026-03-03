"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/authContext";

export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

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
      // redirect to create post
      router.push('/post/new')
    } else {
      setMessage(data.error || "Registration failed");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
     <Card>
      <form onSubmit={handleSubmit} className="space-y-4 p-2">
        <Input className="text-2xl font-bold text-black"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <Input className="text-2xl font-bold text-black"
          type="email"
          placeholder="Email"
          value= {email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input className="text-2xl font-bold text-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button 
        type="submit">Register</Button>
      </form>
      <p className="text-sm text-center text-zinc-600 mt-4"> Already have an account? 
                <Link href="/login" className="font-semibold text-blue-600 hover:underline">Login</Link>
            </p>
      {message && <p className="mt-4 text-red-500">{message}</p>}
     </Card>
    </div>
  );
}