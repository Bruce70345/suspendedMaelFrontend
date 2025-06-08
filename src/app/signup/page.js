"use client"
import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { animate } from 'animejs';
import { redirect } from 'next/navigation'
import { buildApiUrl, API_ENDPOINTS } from '../../config/api';
import Logo_Black from '../../../public/Logo_Black.png';

export default function SignUp() {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const userData = {
            name: formData.get('name'),
            address: formData.get('address'),
            password: formData.get('password'),
            secret: formData.get('secret'),
            email: formData.get('email'),
        };

        try {
            console.log(userData)
            const response = await fetch(buildApiUrl(API_ENDPOINTS.USERS), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Failed to register user');
            }

            alert('Registration successful');
            redirect('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed, please try again later.');
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
        animate(e.currentTarget, {
            scale: [1, 0.95, 1],
            duration: 200,
            ease: 'outQuart'
        });
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
        <div className="min-h-screen bg-gradient-to-br from-peach-50 via-desert_sand-50 to-old_rose-50 pt-32 p-6">
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
                    <h1 className="text-3xl font-bold text-redwood-600 mb-2">
                        Sign up as a Giver
                    </h1>
                    <div className="w-16 h-1 bg-peach-500 rounded-full mx-auto"></div>
                </div>

                {/* Registration Form */}
                <div
                    ref={formRef}
                    className="bg-white/95 backdrop-blur-xl rounded-6xl p-8 shadow-bento border border-desert_sand-200/40"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Store Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-mountbatten_pink-700 mb-2">
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
                                onFocus={handleInputFocus}
                                className="w-full px-4 py-3 bg-white/80 border border-peach-200/60 rounded-capsule text-mountbatten_pink-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-peach-500 focus:border-transparent transition-all duration-300"
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-mountbatten_pink-700 mb-2">
                                Email
                            </label>
                            <input
                                ref={el => inputRefs.current[1] = el}
                                type="email"
                                id="email"
                                name="email"
                                required
                                autoComplete="email"
                                onFocus={handleInputFocus}
                                className="w-full px-4 py-3 bg-white/80 border border-peach-200/60 rounded-capsule text-mountbatten_pink-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-peach-500 focus:border-transparent transition-all duration-300"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-mountbatten_pink-700 mb-2">
                                Password
                            </label>
                            <input
                                ref={el => inputRefs.current[2] = el}
                                type="password"
                                id="password"
                                name="password"
                                required
                                autoComplete="new-password"
                                onFocus={handleInputFocus}
                                className="w-full px-4 py-3 bg-white/80 border border-peach-200/60 rounded-capsule text-mountbatten_pink-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-peach-500 focus:border-transparent transition-all duration-300"
                            />
                        </div>

                        {/* Address Input */}
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-mountbatten_pink-700 mb-2">
                                店家地址
                            </label>
                            <input
                                ref={el => inputRefs.current[3] = el}
                                type="text"
                                id="address"
                                name="address"
                                required
                                autoComplete="address"
                                onFocus={handleInputFocus}
                                className="w-full px-4 py-3 bg-white/80 border border-peach-200/60 rounded-capsule text-mountbatten_pink-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-peach-500 focus:border-transparent transition-all duration-300"
                            />
                        </div>

                        {/* Secret Code Input */}
                        <div>
                            <label htmlFor="secret" className="block text-sm font-medium text-mountbatten_pink-700 mb-2">
                                Secret Code for Pickup
                            </label>
                            <input
                                ref={el => inputRefs.current[4] = el}
                                type="text"
                                id="secret"
                                name="secret"
                                onFocus={handleInputFocus}
                                className="w-full px-4 py-3 bg-white/80 border border-peach-200/60 rounded-capsule text-mountbatten_pink-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-peach-500 focus:border-transparent transition-all duration-300"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            ref={buttonRef}
                            type="submit"
                            onClick={handleButtonClick}
                            className="w-full bg-peach-500 hover:bg-peach-600 text-white font-medium py-4 px-6 rounded-capsule transition-all duration-300 shadow-medium hover:shadow-bento transform hover:scale-[1.02] cursor-pointer"
                        >
                            Sign up!
                        </button>

                        {/* Sign In Link */}
                        <div className="text-center pt-4">
                            <Link
                                href="/signin"
                                className="text-sm text-mountbatten_pink-600 hover:text-peach-600 transition-colors duration-300 cursor-pointer"
                            >
                                Already have an account? Please sign in
                            </Link>
                        </div>

                    </form>
                </div>

                {/* Copyright */}
                <div className="text-center mt-8">
                    <p className="text-xs text-mountbatten_pink-500">
                        © 2024 Free Meal Finder. All rights reserved.
                    </p>
                </div>

            </div>
        </div>
    );
}