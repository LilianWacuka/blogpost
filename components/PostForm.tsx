"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (payload: { title: string; content: string }) => void;
};

export default function PostForm({
  initialTitle = "",
  initialContent = "",
  onSubmit,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ title, content });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="post content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}