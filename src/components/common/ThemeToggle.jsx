import { Moon, SunMoon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(
        () => localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        const theme = isDarkMode ? 'business' : 'corporate';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [isDarkMode]);

    return (
        <label className='relative inline-flex items-center cursor-pointer'>
            <input
                type='checkbox'
                className='peer sr-only'
                checked={isDarkMode}
                onChange={() => setIsDarkMode(!isDarkMode)}
            />
            <div className='w-13 h-7 bg-white border border-primary rounded-full transition-colors duration-300'></div>

            <div className='absolute left-1 w-6 h-6 flex items-center text-primary justify-center text-sm transition-all duration-300 transform peer-checked:translate-x-6'>
                {isDarkMode ? <Moon size={18} /> : <SunMoon size={18} />}
            </div>
        </label>
    );
};

export default ThemeToggle;
