"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import PostForm from "@/components/PostForm"
import { useAuth } from "@/context/authContext"
import { v4 as uuidv4 } from 'uuid';

export default function NewPostPage(){
    const router = useRouter();
    const { userId, isLoggedIn } = useAuth();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    function handleCreate({ title, content }: { title: string; content: string }) {
        if (!userId) {
            alert('You must be logged in to create a post');
            return;
        }

        const post = {
            id: uuidv4(),
            title,
            content,
            userId, // Associate post with current user
            createdAt: new Date().toISOString(),
        };

        try {
            const raw = localStorage.getItem('posts');
            const arr = raw ? JSON.parse(raw) : [];
            arr.unshift(post);
            localStorage.setItem('posts', JSON.stringify(arr));
        } catch (e) {
            console.error('Failed to save post to localStorage', e);
        }

        router.push('/');
    }

    if (!isLoggedIn) {
        return <div className="text-white">Redirecting to login...</div>;
    }

    return (
        <>
        <h1 className="text-4xl font-bold mb-4 text-white-800">Create New Post</h1>
        <PostForm onSubmit={handleCreate} />
        </>
    );
}