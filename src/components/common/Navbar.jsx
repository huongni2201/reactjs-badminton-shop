import { Armchair, Heart, Search, ShoppingCart, User } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useState, useRef, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useCart } from '../../context/CartContext';

import logo from '../../assets/logo.svg';

const Navbar = () => {
    const { userInfo, logout } = useUser();
    const { cartItems, setCartItems } = useCart();
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const userDropdownRef = useRef(null);

    const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/storage/avatar`;

    useEffect(() => {
        const handleClickOutside = event => {
            if (
                userDropdownRef.current &&
                !userDropdownRef.current.contains(event.target)
            ) {
                setIsUserDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setCartItems(null);
    };

    return (
        <div className='sticky top-0 z-50'>
            {/* Top Navbar */}
            <div className='bg-white glass-effect navbar-shadow border-b border-red-100'>
                <div className='max-w-7xl mx-auto px-6 py-4'>
                    <div className='flex items-center justify-between'>
                        {/* Logo */}
                        <div className='logo_wrapper'>
                            <Link
                                to='/'
                                className='text-3xl font-bold text-red-600 hover:text-red-700 transition-colors duration-300 flex items-center gap-3 group'
                            >
                                <figure className='w-12 h-12 flex items-center justify-center'>
                                    <img src={logo}></img>
                                </figure>
                                <span className='bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent'>
                                    VnbShop
                                </span>
                            </Link>
                        </div>

                        {/* Search Bar */}
                        <div className='flex-1 max-w-xl mx-6'>
                            <form className='relative group'>
                                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                    <Search
                                        size={20}
                                        className='text-red-400 group-focus-within:text-red-600 transition-colors'
                                    />
                                </div>
                                <input
                                    type='text'
                                    placeholder='Tìm kiếm sản phẩm...'
                                    className='w-full h-12 pl-12 pr-4 text-gray-700 bg-white border-2 border-red-100 rounded-2xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 placeholder:text-gray-400'
                                />
                            </form>
                        </div>

                        {/* Right Section */}
                        <div className='flex items-center gap-6'>
                            <ThemeToggle />

                            {/* Cart Button with Hover Preview */}
                            <div className='relative'>
                                <Link to='/carts' className='relative group'>
                                    <div className='p-2 bg-red-50 rounded-xl hover:bg-red-100 transition-all duration-300 hover-lift group-hover:shadow-lg group-hover:shadow-red-100'>
                                        <ShoppingCart
                                            size={24}
                                            className='text-red-600 group-hover:text-red-700'
                                        />
                                        <span className='absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse-soft'>
                                            {cartItems?.length
                                                ? cartItems?.length
                                                : 0}
                                        </span>
                                    </div>
                                </Link>
                            </div>

                            {/* Wishlist Button */}
                            <button className='p-2 bg-red-50 rounded-xl hover:bg-red-100 transition-all duration-300 hover-lift hover:shadow-lg hover:shadow-red-100 group'>
                                <Heart
                                    size={24}
                                    className='text-red-600 group-hover:text-red-700 transition-transform'
                                />
                            </button>

                            {/* User Section */}
                            <div className='relative' ref={userDropdownRef}>
                                {!userInfo ? (
                                    <div className='flex items-center gap-3'>
                                        <Link to='/login'>
                                            <button className='cursor-pointer px-4 py-2 bg-red-50 rounded-xl hover:bg-red-100 text-red-600 font-medium transition-all duration-300 hover-lift hover:shadow-lg hover:shadow-red-100'>
                                                Đăng nhập
                                            </button>
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        <button
                                            onClick={() =>
                                                setIsUserDropdownOpen(
                                                    !isUserDropdownOpen
                                                )
                                            }
                                            className='flex items-center gap-2 cursor-pointer rounded-full hover:bg-red-100 transition-all duration-300'
                                        >
                                            <img
                                                src={
                                                    `${baseUrl}/${userInfo.avatar}` ||
                                                    'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
                                                }
                                                alt={userInfo.fullName}
                                                className='w-10 h-10 rounded-full object-cover border border-red-200'
                                            />
                                        </button>

                                        {isUserDropdownOpen && (
                                            <div className='absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden z-50 animate-fade-in'>
                                                <div className='py-2'>
                                                    <Link
                                                        to='/user/info'
                                                        className='block px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200'
                                                        onClick={() =>
                                                            setIsUserDropdownOpen(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        Tài khoản
                                                    </Link>
                                                    {userInfo.role.name ===
                                                        'USER' && (
                                                        <Link
                                                            to='/user/my-orders'
                                                            className='block px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200'
                                                            onClick={() =>
                                                                setIsUserDropdownOpen(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            Đơn hàng
                                                        </Link>
                                                    )}
                                                    {userInfo.role.name !==
                                                        'USER' && (
                                                        <Link
                                                            to='/admin/dashboard'
                                                            className='block px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200'
                                                            onClick={() =>
                                                                setIsUserDropdownOpen(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            Dashboard
                                                        </Link>
                                                    )}
                                                    <Link
                                                        to='/settings'
                                                        className='block px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200'
                                                        onClick={() =>
                                                            setIsUserDropdownOpen(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        Cài đặt
                                                    </Link>
                                                    <hr className='my-2 border-red-100' />
                                                    <button
                                                        onClick={() => {
                                                            handleLogout();
                                                            setIsUserDropdownOpen(
                                                                false
                                                            );
                                                        }}
                                                        className='w-full text-left px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200'
                                                    >
                                                        Đăng xuất
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className='bg-red-500 gradient-red shadow-lg'>
                <div className='max-w-7xl mx-auto px-6'>
                    <div className='flex items-center justify-between h-14'>
                        {/* Navigation Links */}
                        <nav className='flex items-center space-x-8'>
                            {[
                                { path: '/', label: 'Trang chủ' },
                                { path: '/products', label: 'Sản phẩm' },
                                { path: '/about', label: 'Giới thiệu' },
                                { path: '/contact', label: 'Liên hệ' },
                                { path: '/blog', label: 'Blog' }
                            ].map(item => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `relative px-4 py-2 text-white font-medium transition-all duration-300 hover:text-red-100 group ${
                                            isActive ? 'text-red-100' : ''
                                        }`
                                    }
                                >
                                    {item.label}
                                    <span className='absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0' />
                                </NavLink>
                            ))}
                        </nav>

                        {/* Contact Info */}
                        <div className='flex items-center gap-2 text-white'>
                            <span className='text-sm font-medium'>
                                Hotline:
                            </span>
                            <a
                                href='tel:888-555-0111'
                                className='text-sm font-bold hover:text-red-100 transition-colors duration-300'
                            >
                                (888) 555-0111
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
