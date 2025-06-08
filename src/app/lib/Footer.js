import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-transparent backdrop-blur-md border-desert_sand-200/40 mt-16">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="text-center">
                    <p className="text-sm text-redwood-600">
                        © {currentYear} Suspended Meal Finder. All rights reserved.
                    </p>
                </div>
            </div>
        </footer >
    );
};

export default Footer; 