import { useState, useEffect } from 'react';
import Link from 'next/link';
import { animate } from 'animejs';
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

    // 按鈕點擊動畫
    const handleButtonClick = (e) => {
        animate(e.currentTarget, {
            scale: [1, 0.95, 1],
            duration: 200,
            ease: 'outQuart'
        });
    };

    return (
        <div className="flex items-center space-x-2">
            {isLoggedIn ? (
                <>
                    <Link
                        href="/info"
                        className="px-4 py-2 text-sm font-medium text-mountbatten_pink-700 hover:text-redwood-600 hover:bg-peach-50/40 rounded-capsule transition-all duration-300 cursor-pointer"
                        onClick={handleButtonClick}
                    >
                        My information
                    </Link>
                    <button
                        onClick={(e) => {
                            handleButtonClick(e);
                            handleSignOut();
                        }}
                        className="px-4 py-2 text-sm font-medium bg-light_coral-500 text-white hover:bg-light_coral-600 rounded-capsule transition-all duration-300 shadow-soft hover:shadow-medium cursor-pointer"
                    >
                        Log out
                    </button>
                </>
            ) : (
                <>
                    <Link
                        href="/signin"
                        className="px-4 py-2 text-sm font-medium text-mountbatten_pink-700 hover:text-redwood-600 hover:bg-peach-50/40 rounded-capsule transition-all duration-300 cursor-pointer"
                        onClick={handleButtonClick}
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="px-4 py-2 text-sm font-medium bg-peach-500 text-white hover:bg-peach-600 rounded-capsule transition-all duration-300 shadow-soft hover:shadow-medium cursor-pointer"
                        onClick={handleButtonClick}
                    >
                        Register
                    </Link>
                </>
            )}
        </div>
    );
};

export default LogInOutButton;
