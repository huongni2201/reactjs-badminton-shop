import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    User,
    Package,
    ShoppingCart,
    Menu,
    X
} from 'lucide-react';
import AdminNavbar from '../components/admin/AdminNavbar';
import ThemeToggle from '../components/common/ThemeToggle';
import { usePermission } from '../hooks/usePermission';

import logo from '../assets/logo.svg';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { hasPermission } = usePermission();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/storage/avatar`;

    const menuItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Quản lý User', href: '/admin/users', icon: User },
        {
            name: 'Quản lý Sản phẩm',
            href: '/admin/products',
            icon: Package
        },
        {
            name: 'Quản lý Đơn hàng',
            href: '/admin/orders',
            icon: ShoppingCart
        },
        {
            name: 'Quản lý Danh mục',
            href: '/admin/categories',
            icon: ShoppingCart
        },
        {
            name: 'Quản lý Thương hiệu',
            href: '/admin/brands',
            icon: ShoppingCart
        }
    ];

    const isActive = href => location.pathname === href;

    return (
        <div className='drawer lg:drawer-open'>
            <input
                id='drawer-toggle'
                type='checkbox'
                className='drawer-toggle'
                checked={sidebarOpen}
                onChange={() => setSidebarOpen(!sidebarOpen)}
            />

            <div className='drawer-content flex flex-col'>
                <div className='drawer-content flex flex-col'>
                    {/* Mobile Navbar */}
                    <AdminNavbar
                        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    />

                    {/* Page Content */}
                    <main className='flex-1 p-4 lg:p-8 bg-base-200 min-h-screen'>
                        <Outlet />
                    </main>
                </div>
            </div>

            {/* Sidebar */}
            <div className='drawer-side'>
                <label
                    htmlFor='drawer-toggle'
                    className='drawer-overlay'
                ></label>
                <aside className='min-h-full bg-base-100 shadow-xl'>
                    {/* Logo & Close Button */}
                    <div className='p-6 border-b border-base-200'>
                        <div className='flex items-center justify-between'>
                            {/* Logo */}
                            <div className='logo_wrapper px-4'>
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
                            <button
                                className='btn btn-ghost btn-sm lg:hidden'
                                onClick={() => setSidebarOpen(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className='flex justify-between items-center mt-3'>
                            <p className='text-sm text-base-content/70'>
                                Admin Dashboard
                            </p>

                            <div className='theme_toggle flex items-center'>
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <nav className='p-4'>
                        <ul className='menu menu-lg w-full '>
                            {menuItems.map((item, index) => (
                                <li key={index} className='mb-1'>
                                    <Link
                                        to={item.href}
                                        className={`flex items-center gap-4 p-3 rounded-lg duration-200 ${
                                            isActive(item.href)
                                                ? 'bg-primary text-primary-content shadow-lg'
                                                : 'hover:bg-base-200 text-base-content'
                                        }`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <item.icon size={20} />
                                        <span className='text-sm'>
                                            {item.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* User Info */}
                    <div className='absolute bottom-0 left-0 right-0 p-3 border-t border-base-200'>
                        <div className='flex items-center gap-3 p-3 bg-base-200 rounded-lg'>
                            <div className='avatar placeholder'>
                                <div className='bg-primary text-primary-content rounded-full w-10'>
                                    <img
                                        src={
                                            `${baseUrl}/${userInfo.avatar}` ||
                                            'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
                                        }
                                        alt={userInfo.fullName}
                                        className='w-10 h-10 rounded-full object-cover border border-red-200'
                                    />
                                </div>
                            </div>
                            <div>
                                <p className='font-medium text-sm'>
                                    {userInfo?.fullName || 'Admin User'}
                                </p>
                                <p className='text-xs text-base-content/70'>
                                    {userInfo?.email || ''}
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default DashboardLayout;
