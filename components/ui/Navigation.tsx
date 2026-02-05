import Link from 'next/link';
import { Button } from '@/components/ui/button';


export default function Navbar(){
    return(

      <nav className='flex justify-between items-center p-4 border-b bg-rgb(248, 240, 231)'>
        <Link href='/' className='text-lg font-bold'>
        <Button>My Posts</Button>
        </Link>
        <div className='flex gap-4'>
            <Link href='/login' className='hover:underline'>
            <Button>Login</Button>
            </Link>
            <Link href='/post/new'>
                <Button>Create Post</Button>
            </Link>
        </div>
      </nav>  
  
    )

}