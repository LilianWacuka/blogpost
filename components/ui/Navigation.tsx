import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navbar(){
    return(
    <nav className='flex justify-between items-center p-4 border-b'>
        <Link href='/' className='text-lg font-bold'>My Posts</Link>
        <div className='flex gap-4'>
            <Link href='/' className='hover:underline'>Home</Link>
            <Link href='/posts/new'>
                <Button>Create Post</Button>
            </Link>
        </div>
    </nav>  
    )

}