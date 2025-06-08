'use client'
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { animate } from 'animejs';
import LogInOutButton from '@/app/lib/Maps/LogInOutButton';
import Logo_Black from '../../public/Logo_Black.png';

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const navRef = React.useRef(null);
    const logoRef = React.useRef(null);
    const menuItemsRef = React.useRef([]);
    const mobileMenuRef = React.useRef(null);
    const logoGlowRef = React.useRef(null);

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 初始化動畫
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

        // 導航項目依序入場
        const validMenuItems = menuItemsRef.current.filter(item => item !== null);
        if (validMenuItems.length > 0) {
            animate(validMenuItems, {
                translateY: [-20, 0],
                opacity: [0, 1],
                duration: 600,
                ease: 'outQuart',
                delay: (el, i) => 400 + (i * 100)
            });
        }

        // Logo 光暈循環動畫
        if (logoGlowRef.current) {
            animate(logoGlowRef.current, {
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
                duration: 3000,
                ease: 'inOutSine',
                loop: true
            });
        }
    }, []);

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // 手機選單動畫 - 使用 useEffect 監聽 isMenuOpen 變化
    React.useEffect(() => {
        if (isMenuOpen && mobileMenuRef.current) {
            animate(mobileMenuRef.current, {
                translateX: [-30, 0],
                opacity: [0, 1],
                duration: 400,
                ease: 'outQuart'
            });
        }
    }, [isMenuOpen]);

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    // Logo 點擊動畫 - 適合手機觸控
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

    // 導航項目點擊動畫
    const handleNavItemClick = (e) => {
        animate(e.currentTarget, {
            scale: [1, 0.95, 1],
            duration: 200,
            ease: 'outQuart'
        });
    };

    // 手機選單按鈕動畫
    const handleMenuButtonClick = (e) => {
        animate(e.currentTarget, {
            scale: [1, 0.9, 1],
            rotate: [0, 180, 0],
            duration: 300,
            ease: 'outQuart'
        });
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 px-6 pt-4">
            {/* Capsule NavBar */}
            <nav
                ref={navRef}
                className={`
                    mx-auto max-w-7xl rounded-capsule transition-all duration-500 ease-out
                    ${isScrolled
                        ? 'bg-white/85 backdrop-blur-xl shadow-capsule border border-desert_sand-300/40'
                        : 'bg-white/95 shadow-capsule-hover border border-desert_sand-200/30'
                    }
                `}
            >
                <div className="px-8 py-4">
                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-4 group">
                                <div className="relative">
                                    {/* Logo 光暈效果 */}
                                    <div
                                        ref={logoGlowRef}
                                        className="absolute inset-0 bg-peach-400/30 rounded-3xl blur-md"
                                    ></div>
                                    <div
                                        ref={logoRef}
                                        className="relative cursor-pointer"
                                        onClick={handleLogoClick}
                                    >
                                        <Image
                                            src={Logo_Black}
                                            alt="Logo"
                                            className="h-12 w-12 rounded-3xl shadow-soft transition-transform duration-300"
                                        />
                                    </div>
                                </div>
                                <div className="hidden sm:block">
                                    <span className="text-xl font-bold text-redwood-600">
                                        Suspended Meal Finder
                                    </span>
                                    <div className="text-xs text-mountbatten_pink-600 font-medium tracking-wide">
                                        Community Support
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-2">
                            <Link
                                ref={el => menuItemsRef.current[0] = el}
                                href="/about"
                                className="relative px-6 py-3 text-mountbatten_pink-700 hover:text-redwood-600 font-medium transition-all duration-300 rounded-capsule hover:bg-peach-50/40 group cursor-pointer"
                                onClick={handleNavItemClick}
                            >
                                About us
                                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-peach-500 rounded-full group-hover:w-6 transition-all duration-300"></div>
                            </Link>

                            <div
                                ref={el => menuItemsRef.current[1] = el}
                                className="ml-4"
                            >
                                <LogInOutButton />
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center space-x-3">
                            <LogInOutButton />
                            <button
                                onClick={(e) => {
                                    handleMenuButtonClick(e);
                                    handleToggleMenu();
                                }}
                                className="p-3 rounded-capsule bg-peach-100 text-redwood-600 hover:bg-peach-200 transition-all duration-300 shadow-soft hover:shadow-medium cursor-pointer"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden mt-2 mx-auto max-w-7xl animate-slide-down">
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-capsule border border-desert_sand-300/40 p-4">
                        <div className="space-y-2">
                            <Link
                                ref={mobileMenuRef}
                                href="/about"
                                onClick={(e) => {
                                    handleNavItemClick(e);
                                    handleCloseMenu();
                                }}
                                className="block px-6 py-4 text-mountbatten_pink-700 hover:text-redwood-600 hover:bg-peach-50/60 rounded-3xl font-medium transition-all duration-300 cursor-pointer"
                            >
                                About us
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NavBar;
