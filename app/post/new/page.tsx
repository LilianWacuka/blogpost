"use client"
import { useRouter } from "next/navigation"
import PostForm from "@/components/PostForm"
import { v4 as uuidv4 } from 'uuid';
export default function NewPostPage(){
    const router = useRouter();

  function handleCreate({ title, content }: { title: string; content: string }) {
                const post = {
                        id: uuidv4(),
                        title,
                        content,
                        createdAt: new Date().toISOString(),
                };

                // persist to localStorage so client can read it on the homepage
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
    return (
        <>
        <h1 className="text-4xl font-bold mb-4 text-white-800">Create New Post</h1>
        <PostForm onSubmit={handleCreate} />
        </>
    );
}