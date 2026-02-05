"use client";
import { useState , useEffect} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function loginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    useEffect(() =>{
        const token = localStorage.getItem('token');
        if(token){
            router.push('/');
        }
    })
      

 async function handleLogin(e: React.FormEvent){
    e.preventDefault();
    
    const response = await fetch('/api/login',{
        method: 'POST',
        headers: { 'content-type': 'application/json'},
        body: JSON.stringify({ email, password}),
    });
    const data = await response.json();
    if(response.ok){
        localStorage.setItem('token', data.token);
        router.push('/')
    } else {
        alert(data.error || "Login Failed fundaa")
    }
 }
 return(
    <div className="max-w-md mx-auto mt-10">
        <Card>
            <form onSubmit={handleLogin} className="space-y-4 p-4">
                <Input className="border rounded-lg"
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <Input className="border rounded-lg"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" className="item-center">Login</Button>
            </form>
            <p className="text-sm text-center text-zinc-600 mt-4"> Don't have an account? 
                <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
            </p>
        </Card>
        {/* {message && <p className="mt-4 text-red-500">{message}</p>} */}

    </div>
 )
}