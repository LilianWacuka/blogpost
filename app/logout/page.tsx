"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LogoutPage(){
    const router = useRouter();
    const handleLogout = async() => {
        await fetch('/api/logout', {method: 'POST'});
        router.push('/login');
    }
    return(
        <Button onClick={handleLogout}> Logout</Button>
    )
}