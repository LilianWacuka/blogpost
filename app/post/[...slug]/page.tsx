import { getPostsById, deletePost } from "@/data/posts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound, redirect } from "next/navigation";

export default function PostPage({ params }: { params: { id: string } }) {
  const post = getPostsById(params.id);

  if (!post) return notFound();
  async function handleDelete() {
    "use server";
    deletePost(params.id);
    redirect("/");
  }

  return (
    <>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-500 mb-4">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <p className="mb-6">{post.content}</p>

      <div className="flex gap-3">
        <Link href={`/post/${post.id}/edit`}>
          <Button variant="outline">Edit</Button>
        </Link>

        <form action={handleDelete}>
          <Button variant="destructive">Delete</Button>
        </form>
      </div>
    </>
  );
}
