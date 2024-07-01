import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { FaSun, FaMoon } from 'react-icons/fa';
import './Navbar.css';
import { DarkModeContext } from '../../context/DarkModeContext'; 
import { AuthContext } from '../../context/AuthContext';

const NavBar = () => {
    const [isUserMenuOpen, setUserMenuOpen] = useState(false);
    const navItemsRef = useRef([]);
    const sectionsRef = useRef([]);
    const { darkMode, toggle } = useContext(DarkModeContext);
    const { currentUser, logout } = useContext(AuthContext);  

    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navItemsRef.current.forEach((item) => {
                        if (item.getAttribute('aria-label') === entry.target.id) {
                            item.classList.add('text-yellow-500');
                        } else {
                            item.classList.remove('text-yellow-500');
                        }
                    });
                }
            });
        };

        const observer = new IntersectionObserver(callback, {
            root: null,
            rootMargin: '0px',
            threshold: 0.3,
        });

        sectionsRef.current.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleUserMenu = () => {
        setUserMenuOpen(!isUserMenuOpen);
    };

    const navItems = [
        {
            title: 'Drivers',
            label: 'drivers',
            url: '/drivers',
        },
        {
            title: 'Clientes',
            label: 'clientes',
            url: '/clients',
        },
        {
            title: 'Carreras',
            label: 'carreras',
            url: '/racing',
            activePaths: ['/racing', '/races',]
        },
    ];

    const isActive = (url, activePaths) => {
        if (currentPath === url) return true;
        return activePaths.some(path => currentPath.startsWith(path));
    };

    return (
        <header className="fixed top-0 z-10 flex items-center justify-center w-full mx-auto mt-2">
            <nav className="flex px-3 text-sm font-medium rounded-full text-gray-600 dark:text-gray-200  justify-center items-center animate-nav-shadow">
                {navItems.map((link) => (
                    <Link
                        key={link.label}
                        ref={(el) => navItemsRef.current.push(el)}
                        className={`relative block px-2 py-2 transition hover:text-green-500 dark:hover:text-green-400 ${
                            isActive(link.url, link.activePaths || []) ? 'font-bold border-b-2 border-green-600 text-green-500 dark:border-green-400 dark:text-green-400'  : ''
                        }`}
                        aria-label={link.label}
                        to={link.url}
                    >
                        {link.title}
                    </Link>
                ))}
                <button 
                    type="button"
                    onClick={toggle}
                    className="flex text-sm  rounded-full md:me-0 focus:ring-0 dark:focus:ring-gray-600 relative z-10 mx-2"
                >
                    {darkMode ? <FaSun className="text-gray-200 w-5 h-5" /> : <FaMoon className="text-gray-600 w-5 h-5" />}
                </button>
                <button
                    type="button"
                    onClick={toggleUserMenu}
                    className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 relative z-10 mx-2"
                    aria-expanded={isUserMenuOpen ? 'true' : 'false'}
                > 
                    <img
                        className="w-8 h-8 rounded-full"
                        src={currentUser?.profilePic || 'https://cdn-icons-png.flaticon.com/256/14663/14663189.png'}
                        alt="user photo"
                    />
                </button>
                <div
                    className={`absolute right-0 top-12 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900 ${
                        isUserMenuOpen ? 'block' : 'hidden'
                    }`}
                    id="user-dropdown"
                >
                    <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">
                            {currentUser?.name || 'Guest'}
                        </span>
                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                            {currentUser?.email || 'email@example.com'}
                        </span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                            <Link to="/settings"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                Settings
                            </Link>
                        </li>
                        <li>
                            <button onClick={logout}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                Sign out
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;
