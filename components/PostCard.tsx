import Link from "next/link";
import {Post} from "@/data/posts";
import { Card, CardContent} from "@/components/ui/card";
export default function PostCard ({ post }: { post: Post}) {
    return (
        <Card className="mb-4">
            <CardContent className="p-4">
                <h2 className="text-xl font text-semibold">{post.title}</h2>
                <p className="text-sm text-gray-500">
                    By {post.writtenBy} on {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <Link href={`/posts/${post.id}`}
                className="text-blue-600 underline mt-2 inline-block">Read more</Link>
            </CardContent>
        </Card>
    );
}