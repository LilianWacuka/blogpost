"use client";

import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import { Post } from '@/data/posts';

export default function PostsClient() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('posts');
      if (raw) {
        setPosts(JSON.parse(raw));
      } else {
        setPosts([]);
      }
    } catch (e) {
      setPosts([]);
    }
  }, []);

  if (!posts || posts.length === 0) {
    return (
      <p className="font-bold text-center text-white">Yooh! No posts. Create one.</p>
    );
  }

  function handleDelete(id: string) {
    const next = posts.filter((p) => p.id !== id);
    setPosts(next);
    try {
      localStorage.setItem('posts', JSON.stringify(next));
    } catch (e) {
      console.error('Failed to update localStorage', e);
    }
  }

  return (
    <div className="container mx-auto p-4 flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onDelete={handleDelete} showActions />
      ))}
    </div>
  );
}
