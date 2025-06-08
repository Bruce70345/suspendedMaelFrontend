import { useState, useEffect } from 'react';
import Link from 'next/link';
import useLoggedInStore from '@/stores/logInOut-store';

const LogInOutButton = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { isLoggedIn, logIn, logOut } = useLoggedInStore();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            logIn();
        }
    }, [logIn]);


    const handleSignOut = () => {
        // 清除本地存儲中的用戶信息
        localStorage.removeItem('user');
        alert('You have logged out');
        logOut();
    }

    return (
        <div className="flex items-center space-x-2">
            {isLoggedIn ? (
                <>
                    <Link
                        href="/info"
                        className="px-4 py-2 text-sm font-medium text-mountbatten_pink-700 hover:text-redwood-600 hover:bg-peach-50/40 rounded-capsule transition-all duration-300"
                    >
                        My information
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-light_coral-500 to-coral_pink-500 text-white hover:from-light_coral-600 hover:to-coral_pink-600 rounded-capsule transition-all duration-300 shadow-soft hover:shadow-medium hover:scale-105"
                    >
                        Log out
                    </button>
                </>
            ) : (
                <>
                    <Link
                        href="/signin"
                        className="px-4 py-2 text-sm font-medium text-mountbatten_pink-700 hover:text-redwood-600 hover:bg-peach-50/40 rounded-capsule transition-all duration-300"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-peach-500 to-coral_pink-500 text-white hover:from-peach-600 hover:to-coral_pink-600 rounded-capsule transition-all duration-300 shadow-soft hover:shadow-medium hover:scale-105"
                    >
                        Register
                    </Link>
                </>
            )}
        </div>
    );
};

export default LogInOutButton;
