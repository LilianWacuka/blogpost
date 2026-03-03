"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/authContext";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // Import icons

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Eye toggle state
    const [isLoading, setIsLoading] = useState(false); // Loading state
    
    const router = useRouter();
    const { isLoggedIn, login } = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/');
        }
    }, [isLoggedIn, router]);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', data.token);
                login(data.user.id);
                router.push('/');
            } else {
                alert(data.error || "Login Failed fundaa");
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <Card className="p-6">
                <form onSubmit={handleLogin} className="space-y-4">
                    <h1 className="text-xl font-bold text-center text-black mb-2">Welcome Back</h1>
                    
                    <div className="space-y-1">
                        <label className="text-black text-sm font-medium">Email</label>
                        <Input 
                            className="text-black border rounded-lg"
                            type="email"
                            placeholder="email@example.com"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-black text-sm font-medium">Password</label>
                        <div className="relative">
                            <Input 
                                className="text-black border rounded-lg pr-10" // pr-10 makes room for the eye
                                type={showPassword ? "text" : "password"} // Dynamic type
                                placeholder="password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {/* Eye Toggle Button */}
                            <Button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 focus:outline-none"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </Button>
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full flex justify-center items-center"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...</>
                        ) : (
                            "Login"
                        )}
                    </Button>
                </form>

                <p className="text-sm text-center text-zinc-600 mt-6">
                    Don't have an account? {" "}
                    <Link href="/register" className="text-blue-600 font-medium hover:underline">
                        Register
                    </Link>
                </p>
            </Card>
        </div>
    );
}