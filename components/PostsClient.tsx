"use client";
import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import { Post } from '@/data/posts';
import { useAuth } from '@/context/authContext';

export default function PostsClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { userId, isLoggedIn } = useAuth();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('posts');
      let allPosts: Post[] = [];
      if (raw) {
        allPosts = JSON.parse(raw);
      }
      
      // Filter posts to show only user's own posts if logged in
      if (isLoggedIn && userId) {
        allPosts = allPosts.filter(post => post.userId === userId);
      } else {
        // If not logged in, show no posts (or you could show all posts)
        allPosts = [];
      }
      
      setPosts(allPosts);
    } catch (e) {
      setPosts([]);
    }
  }, [userId, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className='container mx-auto px-4 py-12'>
        <h1 className="text-2xl font-bold text-center text-white">Welcome to your blog.</h1>
        <p className="font-bold text-center text-white"> 
          Please log in to view your posts.</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className='container mx-auto px-4 py-12'>
        <h1 className="text-2xl font-bold text-center text-white">Welcome to your blog.</h1>
        <p className="font-bold text-center text-white"> 
          A simple, beautiful blog. Yooh! No posts. Create one.</p>

      </div>
    );
  }

  function handleDelete(id: string) {
    const next = posts.filter((p) => p.id !== id);
    setPosts(next);
    try {
      const raw = localStorage.getItem('posts');
      if (raw) {
        const allPosts: Post[] = JSON.parse(raw);
        const updated = allPosts.filter(p => p.id !== id);
        localStorage.setItem('posts', JSON.stringify(updated));
      }
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
