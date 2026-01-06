import Link from "next/link";
import { Post } from "@/data/posts";
import { Card, CardContent } from "@/components/ui/card";

export default function PostCard({
    post,
    onDelete,
    showActions = false,
}: {
    post: Post;
    onDelete?: (id: string) => void;
    showActions?: boolean;
}) {
    return (
        <Card className="mb-4">
            <CardContent className="p-4">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-white-400">{post.content}</p>
                <p className="text-sm text-blue-800">
                    on {new Date(post.createdAt).toLocaleDateString()}
                </p>

                <div className="mt-2">
                    {/* <Link href={`/post/${post.id}`} className="text-blue-600 underline mr-4">
                        Read more
                    </Link> */}

                    {showActions && (
                        <span className="inline-flex items-center gap-3">
                            <Link href={`/post/${post.id}/edit`} className="text-sm text-gray-700 hover:underline">
                                Edit
                            </Link>
                            <button
                                type="button"
                                onClick={() => onDelete && onDelete(post.id)}
                                className="text-sm text-red-600 hover:underline"
                            >
                                Delete
                            </button>
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}