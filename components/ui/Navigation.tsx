"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';

export default function Navbar(){
    const { isLoggedIn, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return(
      <nav className='flex justify-between items-center p-4 border-b bg-rgb(248, 240, 231)'>
        <Link href='/' className='text-lg font-bold'>
        <Button>My Posts</Button>
        </Link>
        <div className='flex gap-4'>
            {!isLoggedIn && (
                <Link href='/login' className='hover:underline'>
                <Button>Login</Button>
                </Link>
            )}

            {isLoggedIn && (
                <>
                    <Button onClick={handleLogout}>
                        Logout
                    </Button>

                    <Link href='/post/new'>
                        <Button>Create Post</Button>
                    </Link>
                </>
            )}
        </div>
      </nav>  
  
    )

}