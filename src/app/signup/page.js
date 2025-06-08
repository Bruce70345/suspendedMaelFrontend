"use client"
import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { animate } from 'animejs';
import { useRouter } from 'next/navigation';
import { buildApiUrl, API_ENDPOINTS } from '../../config/api';
import useLoggedInStore from '@/stores/logInOut-store';
import Dialog from '../lib/Dialog';
import Footer from '../lib/Footer';
import Logo_Black from '../../../public/Logo_Black.png';

export default function SignUp() {
    const router = useRouter();
    const { logIn } = useLoggedInStore();
    const [isLoading, setIsLoading] = React.useState(false);
    const [dialog, setDialog] = React.useState({
        isOpen: false,
        type: 'info',
        title: '',
        message: '',
        onConfirm: null
    });

    const formRef = React.useRef(null);
    const titleRef = React.useRef(null);
    const logoRef = React.useRef(null);
    const inputRefs = React.useRef([]);
    const buttonRef = React.useRef(null);

    React.useEffect(() => {
        // Logo 入場動畫
        if (logoRef.current) {
            animate(logoRef.current, {
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 800,
                ease: 'outElastic(1, .8)',
                delay: 200
            });
        }

        // 標題入場動畫
        if (titleRef.current) {
            animate(titleRef.current, {
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 800,
                ease: 'outQuart',
                delay: 400
            });
        }

        // 表單卡片入場動畫
        if (formRef.current) {
            animate(formRef.current, {
                translateY: [50, 0],
                opacity: [0, 1],
                duration: 800,
                ease: 'outQuart',
                delay: 600
            });
        }

        // 輸入框依序入場
        const validInputs = inputRefs.current.filter(input => input !== null);
        if (validInputs.length > 0) {
            animate(validInputs, {
                translateX: [-30, 0],
                opacity: [0, 1],
                duration: 600,
                ease: 'outQuart',
                delay: (el, i) => 800 + (i * 100)
            });
        }

        // 按鈕入場動畫
        if (buttonRef.current) {
            animate(buttonRef.current, {
                scale: [0.9, 1],
                opacity: [0, 1],
                duration: 600,
                ease: 'outBack(1.7)',
                delay: 1500
            });
        }
    }, []);

    const showDialog = (type, title, message, onConfirm = null) => {
        setDialog({
            isOpen: true,
            type,
            title,
            message,
            onConfirm
        });
    };

    const closeDialog = () => {
        setDialog(prev => ({ ...prev, isOpen: false }));
    };

    const validateForm = (userData) => {
        const { name, email, password, address } = userData;

        if (!name || name.trim().length < 2) {
            return 'Store name must be at least 2 characters';
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return 'Please enter a valid email address';
        }

        if (!password || password.length < 6) {
            return 'Password must be at least 6 characters';
        }

        if (!address || address.trim().length < 5) {
            return 'Please enter a complete store address';
        }

        return null;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isLoading) return;

        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const userData = {
            name: formData.get('name'),
            address: formData.get('address'),
            password: formData.get('password'),
            secret: formData.get('secret'),
            email: formData.get('email'),
        };

        // 表單驗證
        const validationError = validateForm(userData);
        if (validationError) {
            setIsLoading(false);
            showDialog('error', 'Input error', validationError);
            return;
        }

        try {
            console.log('Submitting user data:', userData);

            // 第一步：註冊
            const registerResponse = await fetch(buildApiUrl(API_ENDPOINTS.USERS), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const registerResult = await registerResponse.json();

            if (!registerResponse.ok) {
                let errorMessage = 'Registration failed, please try again later';

                if (registerResponse.status === 409) {
                    errorMessage = 'This email has already been registered, please use another email';
                } else if (registerResponse.status === 400) {
                    errorMessage = registerResult.message || 'Input data format error, please check and re-enter';
                } else if (registerResponse.status >= 500) {
                    errorMessage = 'Server error, please try again later';
                } else if (registerResult.message) {
                    errorMessage = registerResult.message;
                }

                throw new Error(errorMessage);
            }

            // 註冊成功，顯示成功訊息
            showDialog('success', 'Registration successful', 'Registration completed! Logging you in automatically...', async () => {
                try {
                    // 第二步：使用相同資訊自動登入
                    const loginResponse = await fetch(buildApiUrl(API_ENDPOINTS.SIGNIN), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: userData.email,
                            password: userData.password
                        }),
                    });

                    const loginResult = await loginResponse.json();

                    if (!loginResponse.ok) {
                        throw new Error('Auto login failed, please login manually');
                    }

                    if (loginResult.success) {
                        // 儲存用戶資料到 localStorage
                        localStorage.setItem('user', JSON.stringify(loginResult));
                        // 更新 Zustand 登入狀態
                        logIn();

                        showDialog('success', 'Login successful', 'Welcome! Redirecting to your information page', () => {
                            router.push('/info');
                        });
                    } else {
                        throw new Error('Auto login failed, please login manually');
                    }

                } catch (loginError) {
                    console.error('Auto login failed:', loginError);
                    showDialog('warning', 'Registration successful', 'Registration completed, but auto login failed. Please login manually', () => {
                        router.push('/signin');
                    });
                }
            });

        } catch (error) {
            console.error('Registration failed:', error);

            // 網路錯誤處理
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                showDialog('error', 'Network error', 'Unable to connect to the server, please check your network connection');
            } else {
                showDialog('error', 'Registration failed', error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // 輸入框點擊動畫
    const handleInputFocus = (e) => {
        animate(e.currentTarget, {
            scale: [1, 1.02, 1],
            duration: 300,
            ease: 'outQuart'
        });
    };

    // 按鈕點擊動畫
    const handleButtonClick = (e) => {
        if (!isLoading) {
            animate(e.currentTarget, {
                scale: [1, 0.95, 1],
                duration: 200,
                ease: 'outQuart'
            });
        }
    };

    // Logo 點擊動畫
    const handleLogoClick = () => {
        if (logoRef.current) {
            animate(logoRef.current, {
                rotate: [0, 360],
                scale: [1, 1.1, 1],
                duration: 600,
                ease: 'outBack(1.7)'
            });
        }
    };

    return (
        <>
            <div className="page-container min-h-screen bg-gradient-to-br from-peach-50 via-desert_sand-50 to-old_rose-50 pt-32 p-6">
                <div className="max-w-md mx-auto">

                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block">
                            <div
                                ref={logoRef}
                                className="relative cursor-pointer"
                                onClick={handleLogoClick}
                            >
                                <div className="absolute inset-0 bg-peach-400/30 rounded-3xl blur-md"></div>
                                <Image
                                    src={Logo_Black}
                                    alt="Logo"
                                    className="relative h-16 w-16 rounded-3xl shadow-soft transition-transform duration-300 mx-auto"
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Title */}
                    <div
                        ref={titleRef}
                        className="text-center mb-8"
                    >
                        <h1 className="text-3xl font-bold text-redwood-700 mb-2">
                            Sign up as a Giver
                        </h1>
                        <div className="w-16 h-1 bg-peach-500 rounded-full mx-auto"></div>
                    </div>

                    {/* Registration Form */}
                    <div
                        ref={formRef}
                        className="bento-card p-8"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Store Name Input */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-redwood-700 mb-2">
                                    Store Name
                                </label>
                                <input
                                    ref={el => inputRefs.current[0] = el}
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    autoComplete="name"
                                    autoFocus
                                    disabled={isLoading}
                                    placeholder="Please enter the store name"
                                    onFocus={handleInputFocus}
                                    className="w-full px-4 py-3 bg-white/80 border border-peach-200/60 rounded-capsule text-redwood-600 placeholder:text-redwood-600 focus:outline-none focus:ring-2 focus:ring-peach-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-redwood-700 mb-2">
                                    Email
                                </label>
                                <input
                                    ref={el => inputRefs.current[1] = el}
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    autoComplete="email"
                                    disabled={isLoading}
                                    placeholder="Please enter your email"
                                    onFocus={handleInputFocus}
                                    className="w-full px-4 py-3 bg-white/80 border border-peach-200/60 rounded-capsule text-redwood-600 placeholder:text-redwood-600 focus:outline-none focus:ring-2 focus:ring-peach-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-redwood-700 mb-2">
                                    Password
                                </label>
                                <input
                                    ref={el => inputRefs.current[2] = el}
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    autoComplete="new-password"
                                    disabled={isLoading}
                                    placeholder="Please enter the password (at least 6 characters)"
                                    onFocus={handleInputFocus}
                                    className="w-full px-4 py-3 bg-white/80 border border-peach-200/60 rounded-capsule text-redwood-600 placeholder:text-redwood-600 focus:outline-none focus:ring-2 focus:ring-peach-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            {/* Address Input */}
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-redwood-700 mb-2">
                                    Store Address
                                </label>
                                <input
                                    ref={el => inputRefs.current[3] = el}
                                    type="text"
                                    id="address"
                                    name="address"
                                    required
                                    autoComplete="address"
                                    disabled={isLoading}
                                    placeholder="Please enter the complete store address"
                                    onFocus={handleInputFocus}
                                    className="w-full px-4 py-3 bg-white/80 border border-peach-200/60 rounded-capsule text-redwood-600 placeholder:text-redwood-600 focus:outline-none focus:ring-2 focus:ring-peach-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            {/* Secret Code Input */}
                            <div>
                                <label htmlFor="secret" className="block text-sm font-medium text-redwood-700 mb-2">
                                    Secret Code for Pickup
                                </label>
                                <input
                                    ref={el => inputRefs.current[4] = el}
                                    type="text"
                                    id="secret"
                                    name="secret"
                                    disabled={isLoading}
                                    placeholder="Set pickup password (optional)"
                                    onFocus={handleInputFocus}
                                    className="w-full px-4 py-3 bg-white/80 border border-peach-200/60 rounded-capsule text-redwood-600 placeholder:text-redwood-600 focus:outline-none focus:ring-2 focus:ring-peach-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                ref={buttonRef}
                                type="submit"
                                disabled={isLoading}
                                onClick={handleButtonClick}
                                className="w-full bg-peach-500 hover:bg-peach-600 disabled:bg-peach-300 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-capsule transition-all duration-300 shadow-medium hover:shadow-bento transform hover:scale-[1.02] cursor-pointer flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Registering...
                                    </>
                                ) : (
                                    'Sign up!'
                                )}
                            </button>

                            {/* Sign In Link */}
                            <div className="text-center pt-4">
                                <Link
                                    href="/signin"
                                    className="text-sm text-redwood-600 hover:text-peach-600 transition-colors duration-300 cursor-pointer"
                                >
                                    Already have an account? Please sign in
                                </Link>
                            </div>

                        </form>
                    </div>

                </div>
            </div>

            <Footer />

            {/* Dialog */}
            <Dialog
                isOpen={dialog.isOpen}
                onClose={closeDialog}
                type={dialog.type}
                title={dialog.title}
                message={dialog.message}
                onConfirm={dialog.onConfirm}
            />
        </>
    );
}