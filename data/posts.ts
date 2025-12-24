export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  writtenBy: string;
}
let posts: Post[] =[];

 export function getPosts(){
    return posts;
 }

 export function getPostsById(id: string){
    return posts.find(post => post.id === id);
 }

 export function addPost(post: Post){
    posts.push(post);
 }

 export function updatePost(id: string, data: Partial<Post>){
    posts = posts.map((post) =>
        post.id === id ? { ...post, ...data} : post);
 }

 export function deletePost (id: string){
    posts = posts.filter((post)=> post.id !== id);
 }