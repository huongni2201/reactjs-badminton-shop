import React from 'react';
import {
    Phone,
    Mail,
    MapPin,
    Facebook,
    Instagram,
    Youtube
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'>
            <div className='max-w-7xl mx-auto px-4 py-16'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {/* Company Info */}
                    <div className='space-y-4'>
                        <div className='flex items-center gap-2'>
                            <div className='w-10 h-10 bg-gradient-red-orange rounded-lg flex items-center justify-center'>
                                <span className='text-white font-bold text-lg'>
                                    B
                                </span>
                            </div>
                            <h3 className='text-2xl font-bold gradient-text'>
                                BadmintonShop
                            </h3>
                        </div>
                        <p className='text-gray-300 leading-relaxed'>
                            Chuyên cung cấp đồ cầu lông chính hãng từ các thương
                            hiệu hàng đầu thế giới. Chất lượng cao, giá cả hợp
                            lý, dịch vụ tận tâm.
                        </p>
                        <div className='flex space-x-4'>
                            <a
                                href='#'
                                className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors'
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href='#'
                                className='w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors'
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href='#'
                                className='w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors'
                            >
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Product Categories */}
                    <div className='space-y-4'>
                        <h4 className='text-xl font-semibold text-orange-400'>
                            Sản Phẩm
                        </h4>
                        <ul className='space-y-2'>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-300 hover:text-orange-400 transition-colors'
                                >
                                    Vợt Cầu Lông
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-300 hover:text-orange-400 transition-colors'
                                >
                                    Giày Cầu Lông
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-300 hover:text-orange-400 transition-colors'
                                >
                                    Quần Áo Cầu Lông
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-300 hover:text-orange-400 transition-colors'
                                >
                                    Cầu Lông
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-300 hover:text-orange-400 transition-colors'
                                >
                                    Phụ Kiện
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-300 hover:text-orange-400 transition-colors'
                                >
                                    Túi Vợt
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className='space-y-4'>
                        <h4 className='text-xl font-semibold text-orange-400'>
                            Hỗ Trợ Khách Hàng
                        </h4>
                        <ul className='space-y-2'>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-300 hover:text-orange-400 transition-colors'
                                >
                                    Hướng Dẫn Mua Hàng
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-300 hover:text-orange-400 transition-colors'
                                >
                                    Chính Sách Đổi Trả
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-300 hover:text-orange-400 transition-colors'
                                >
                                    Bảo Hành Sản Phẩm
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-300 hover:text-orange-400 transition-colors'
                                >
                                    Phương Thức Thanh Toán
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-300 hover:text-orange-400 transition-colors'
                                >
                                    Vận Chuyển
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-300 hover:text-orange-400 transition-colors'
                                >
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className='space-y-4'>
                        <h4 className='text-xl font-semibold text-orange-400'>
                            Liên Hệ
                        </h4>
                        <div className='space-y-3'>
                            <div className='flex items-center gap-3'>
                                <MapPin
                                    size={18}
                                    className='text-orange-400 flex-shrink-0'
                                />
                                <span className='text-gray-300'>
                                    123 Đường Cầu Lông, Quận 1, TP.HCM
                                </span>
                            </div>
                            <div className='flex items-center gap-3'>
                                <Phone
                                    size={18}
                                    className='text-orange-400 flex-shrink-0'
                                />
                                <span className='text-gray-300'>
                                    0123 456 789
                                </span>
                            </div>
                            <div className='flex items-center gap-3'>
                                <Mail
                                    size={18}
                                    className='text-orange-400 flex-shrink-0'
                                />
                                <span className='text-gray-300'>
                                    info@badmintonshop.vn
                                </span>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className='mt-6'>
                            <h5 className='font-semibold mb-2 text-orange-400'>
                                Đăng Ký Nhận Tin
                            </h5>
                            <div className='flex'>
                                <input
                                    type='email'
                                    placeholder='Email của bạn'
                                    className='flex-1 px-1 py-2 bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none focus:border-orange-400 text-white'
                                />
                                <button className='px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-r-lg hover:from-red-600 hover:to-orange-600 transition-all cursor-pointer'>
                                    Đăng Ký
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className='border-t border-gray-700'>
                <div className='max-w-7xl mx-auto px-4 py-6'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                        <p className='text-gray-400 text-sm'>
                            © 2024 BadmintonShop. Tất cả quyền được bảo lưu.
                        </p>
                        <div className='flex space-x-6 text-sm'>
                            <a
                                href='#'
                                className='text-gray-400 hover:text-orange-400 transition-colors'
                            >
                                Điều Khoản Sử Dụng
                            </a>
                            <a
                                href='#'
                                className='text-gray-400 hover:text-orange-400 transition-colors'
                            >
                                Chính Sách Bảo Mật
                            </a>
                            <a
                                href='#'
                                className='text-gray-400 hover:text-orange-400 transition-colors'
                            >
                                Sitemap
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
