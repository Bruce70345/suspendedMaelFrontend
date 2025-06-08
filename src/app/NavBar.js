'use client'
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LogInOutButton from '@/app/lib/Maps/LogInOutButton';
import Logo_Black from '../../public/Logo_Black.png';

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-6 pt-4">
            {/* Capsule NavBar */}
            <nav className={`
                mx-auto max-w-7xl rounded-capsule transition-all duration-500 ease-out
                ${isScrolled
                    ? 'bg-white/85 backdrop-blur-xl shadow-capsule border border-desert_sand-300/40'
                    : 'bg-white/95 shadow-capsule-hover border border-desert_sand-200/30'
                }
            `}>
                <div className="px-8 py-4">
                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-4 group">
                                <div className="relative">
                                    <Image
                                        src={Logo_Black}
                                        alt="Logo"
                                        className="h-12 w-12 rounded-3xl shadow-soft group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-peach-400/20 to-coral_pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="hidden sm:block">
                                    <span className="text-xl font-bold bg-gradient-to-r from-redwood-600 via-mountbatten_pink-600 to-old_rose-600 bg-clip-text text-transparent">
                                        Free Meal Finder
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
                                href="/about"
                                className="relative px-6 py-3 text-mountbatten_pink-700 hover:text-redwood-600 font-medium transition-all duration-300 rounded-capsule hover:bg-peach-50/40 group"
                            >
                                About us
                                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-peach-500 to-coral_pink-500 rounded-full group-hover:w-6 transition-all duration-300"></div>
                            </Link>

                            <div className="ml-4">
                                <LogInOutButton />
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center space-x-3">
                            <LogInOutButton />
                            <button
                                onClick={handleToggleMenu}
                                className="p-3 rounded-capsule bg-gradient-to-br from-peach-100 to-desert_sand-100 text-redwood-600 hover:from-peach-200 hover:to-desert_sand-200 transition-all duration-300 shadow-soft hover:shadow-medium hover:scale-105"
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
                                href="/about"
                                onClick={handleCloseMenu}
                                className="block px-6 py-4 text-mountbatten_pink-700 hover:text-redwood-600 hover:bg-gradient-to-r hover:from-peach-50/60 hover:to-desert_sand-50/60 rounded-3xl font-medium transition-all duration-300"
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
