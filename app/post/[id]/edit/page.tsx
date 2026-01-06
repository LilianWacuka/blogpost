"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import PostForm from "@/components/PostForm";
import { Post } from "@/data/posts";

export default function EditPostPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("posts");
      const arr: Post[] = raw ? JSON.parse(raw) : [];
      const found = arr.find((p) => p.id === id) ?? null;
      setPost(found);
    } catch (e) {
      setPost(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  function handleSubmit({ title, content }: { title: string; content: string }) {
    if (!post) return;
    const updated: Post = { ...post, title, content };
    try {
      const raw = localStorage.getItem("posts");
      const arr: Post[] = raw ? JSON.parse(raw) : [];
      const next = arr.map((p) => (p.id === id ? updated : p));
      localStorage.setItem("posts", JSON.stringify(next));
    } catch (e) {
      console.error("Failed to save post", e);
    }
    // go back to home where client list reads localStorage
    router.push('/');
  }

  if (loading) return <p>Loading…</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <PostForm
        initialTitle={post.title}
        initialContent={post.content}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
