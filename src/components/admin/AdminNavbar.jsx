// src/components/common/AdminNavbar.jsx
import { Menu } from 'lucide-react';

const AdminNavbar = ({ onToggleSidebar }) => {
    return (
        <div className='navbar bg-base-100 shadow-lg lg:hidden'>
            <div className='flex-none'>
                <button
                    onClick={onToggleSidebar}
                    className='btn btn-square btn-ghost'
                >
                    <Menu size={20} />
                </button>
            </div>
            <div className='flex-1'>
                <h1 className='text-xl font-bold text-primary'>
                    Badminton Store Admin
                </h1>
            </div>
        </div>
    );
};

export default AdminNavbar;
