import { getPosts } from "@/data/posts";
import PostCard from "@/components/PostCard";

export default function HomePage(){
  const posts = getPosts();
  if (posts.length === 0){
    return<p>Yooh! No posts.Create one.</p>;
  }
  return (
    <div className="container mx-auto p-4 flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}