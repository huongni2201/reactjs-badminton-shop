import React from 'react';
import {
    ArrowRight,
    Award,
    Shield,
    Truck,
    Users,
    Star,
    Play,
    ChevronDown,
    Target,
    Trophy,
    Zap,
    Heart
} from 'lucide-react';
import votImg from '../assets/vot_cau_long.webp';
import giayImg from '../assets/giay_cau_long.webp';
import quanImg from '../assets/quan_cau_long.webp';
import vayImg from '../assets/vay_cau_long.webp';
import tuiImg from '../assets/tui_cau_long.webp';
import baloImg from '../assets/balo_cau_long.webp';
import phuKienImg from '../assets/phu_kien_cau_long.webp';
import aoImg from '../assets/ao_cau_long.webp';

import Banner from '../components/common/Banner';
import { Link, useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate();

    const handleViewMore = category => {
        const params = new URLSearchParams();
        if (category) {
            const filterValue = `category.name in ['${category}']`;
            params.set('filter', filterValue);
        }
        navigate(`/products?${params.toString()}`);
    };

    const categoriesList = [
        {
            title: 'Vợt Cầu Lông',
            description: 'Vợt chính hãng từ các thương hiệu hàng đầu',
            image: votImg,
            category: ['Vợt cầu lông']
        },
        {
            title: 'Giày Cầu Lông',
            description: 'Giày chuyên dụng cho sân cầu lông',
            image: giayImg,
            category: ['Giày cầu lông']
        },
        {
            title: 'Quần Cầu Lông',
            description: 'Trang phục thể thao chuyên nghiệp',
            image: quanImg,
            category: ['Quần cầu lông']
        },
        {
            title: 'Áo Cầu Lông',
            description: 'Trang phục thể thao chuyên nghiệp',
            image: aoImg,
            category: ['Áo cầu lông']
        },
        {
            title: 'Váy Cầu Lông',
            description: 'Trang phục thể thao chuyên nghiệp',
            image: vayImg,
            category: ['Váy cầu lông']
        },
        {
            title: 'Balo Cầu Lông',
            description: 'Đựng vợt, quần áo và phụ kiện',
            image: baloImg,
            category: ['Balo cầu lông']
        },
        {
            title: 'Túi Cầu Lông',
            description: 'Đựng vợt và trang phục khi thi đấu',
            image: tuiImg,
            category: ['Túi cầu lông']
        },
        {
            title: 'Phụ Kiện Cầu Lông',
            description: 'Băng cổ tay, bọc cán, dây,...',
            image: phuKienImg,
            category: ['Phụ kiện cầu lông']
        }
    ];

    return (
        <div className='min-h-screen'>
            {/* Hero Carousel Section */}
            <Banner />

            {/* Compact Features Section */}
            <section className='py-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
                    <div className='flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg border-1 border-gray-300 transition-all duration-300'>
                        <div className='w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0'>
                            <Truck className='text-white' size={24} />
                        </div>
                        <div>
                            <h3 className='font-bold text-orange-600 text-sm'>
                                Vận chuyển TOÀN QUỐC
                            </h3>
                            <p className='text-gray-600 text-xs'>
                                Thanh toán khi nhận hàng
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg border-1 border-gray-300 transition-all duration-300'>
                        <div className='w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0'>
                            <Shield className='text-white' size={24} />
                        </div>
                        <div>
                            <h3 className='font-bold text-orange-600 text-sm'>
                                Bảo đảm chất lượng
                            </h3>
                            <p className='text-gray-600 text-xs'>
                                Sản phẩm bảo đảm chất lượng.
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg border-1 border-gray-300 transition-all duration-300'>
                        <div className='w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0'>
                            <Award className='text-white' size={24} />
                        </div>
                        <div>
                            <h3 className='font-bold text-orange-600 text-sm'>
                                Tiện hành THANH TOÁN
                            </h3>
                            <p className='text-gray-600 text-xs'>
                                Với nhiều PHƯƠNG THỨC
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg border-1 border-gray-300 transition-all duration-300'>
                        <div className='w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0'>
                            <Users className='text-white' size={24} />
                        </div>
                        <div>
                            <h3 className='font-bold text-orange-600 text-sm'>
                                Đổi sản phẩm mới
                            </h3>
                            <p className='text-gray-600 text-xs'>
                                nếu sản phẩm lỗi
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className='py-12 bg-white'>
                <div className='max-w-7xl mx-auto px-4'>
                    <div className='text-center mb-16'>
                        <h2 className='text-3xl py-2 lg:text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-1'>
                            Sản phẩm cầu lông
                        </h2>
                        <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                            Khám phá bộ sưu tập đa dạng của chúng tôi
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {categoriesList.map((item, index) => (
                            <div
                                key={index}
                                className='relative card bg-white shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group cursor-pointer'
                                onClick={() => handleViewMore(item.category)}
                            >
                                <figure className='px-0 pt-0 relative'>
                                    <div className='w-full h-64 bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center relative overflow-hidden'>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                                        />
                                        <div className='absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 group-hover:from-red-600/30 group-hover:to-orange-600/30 transition-all duration-300'></div>
                                    </div>
                                </figure>
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <h3 className='text-xl bg-orange-500 px-5 py-2 font-extrabold text-white drop-shadow-lg transform -rotate-8 transition-all duration-300'>
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Performance Section */}
            <section className='py-20 bg-gradient-to-br from-red-50 to-orange-50'>
                <div className='max-w-7xl mx-auto px-4'>
                    <div className='text-center mb-16'>
                        <h2 className='text-3xl py-2 lg:text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-1'>
                            Nâng Cao Hiệu Suất
                        </h2>
                        <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                            Với những công nghệ tiên tiến và thiết kế tối ưu
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        <div className='text-center group'>
                            <div className='w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300'>
                                <Target className='text-white' size={36} />
                            </div>
                            <h3 className='text-xl font-bold text-gray-800 mb-2'>
                                Độ Chính Xác
                            </h3>
                            <p className='text-gray-600'>
                                Thiết kế tối ưu cho độ chính xác tuyệt đối
                            </p>
                        </div>

                        <div className='text-center group'>
                            <div className='w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300'>
                                <Zap className='text-white' size={36} />
                            </div>
                            <h3 className='text-xl font-bold text-gray-800 mb-2'>
                                Tốc Độ
                            </h3>
                            <p className='text-gray-600'>
                                Công nghệ tiên tiến cho tốc độ vượt trội
                            </p>
                        </div>

                        <div className='text-center group'>
                            <div className='w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300'>
                                <Trophy className='text-white' size={36} />
                            </div>
                            <h3 className='text-xl font-bold text-gray-800 mb-2'>
                                Chiến Thắng
                            </h3>
                            <p className='text-gray-600'>
                                Được tin dùng bởi các VĐV hàng đầu
                            </p>
                        </div>

                        <div className='text-center group'>
                            <div className='w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300'>
                                <Heart className='text-white' size={36} />
                            </div>
                            <h3 className='text-xl font-bold text-gray-800 mb-2'>
                                Đam Mê
                            </h3>
                            <p className='text-gray-600'>
                                Thể hiện tình yêu với môn cầu lông
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className='py-20 bg-white'>
                <div className='max-w-7xl mx-auto px-4'>
                    <div className='text-center mb-16'>
                        <h2 className='text-3xl py-2 lg:text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-1'>
                            Khách Hàng Nói Gì?
                        </h2>
                        <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                            Hàng nghìn khách hàng đã tin tưởng và hài lòng với
                            dịch vụ của chúng tôi
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        <div className='card bg-white shadow-xl hover:shadow-2xl transition-all duration-300'>
                            <div className='card-body p-8'>
                                <div className='flex items-center mb-4'>
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className='text-yellow-400 fill-current'
                                            size={20}
                                        />
                                    ))}
                                </div>
                                <p className='text-gray-700 mb-6 italic'>
                                    "Sản phẩm chất lượng tuyệt vời, dịch vụ
                                    chuyên nghiệp. Tôi rất hài lòng với trải
                                    nghiệm mua sắm tại đây."
                                </p>
                                <div className='flex items-center'>
                                    <div className='avatar'>
                                        <div className='w-12 h-12 rounded-full bg-gradient-to-r from-red-400 to-orange-500 flex items-center justify-center text-white font-bold'>
                                            A
                                        </div>
                                    </div>
                                    <div className='ml-4'>
                                        <div className='font-bold text-gray-800'>
                                            Anh Tuấn
                                        </div>
                                        <div className='text-gray-600'>
                                            VĐV Cầu lông
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='card bg-white shadow-xl hover:shadow-2xl transition-all duration-300'>
                            <div className='card-body p-8'>
                                <div className='flex items-center mb-4'>
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className='text-yellow-400 fill-current'
                                            size={20}
                                        />
                                    ))}
                                </div>
                                <p className='text-gray-700 mb-6 italic'>
                                    "Giao hàng nhanh, đóng gói cẩn thận. Vợt
                                    mình mua rất ưng ý, chất lượng như mong
                                    đợi."
                                </p>
                                <div className='flex items-center'>
                                    <div className='avatar'>
                                        <div className='w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold'>
                                            M
                                        </div>
                                    </div>
                                    <div className='ml-4'>
                                        <div className='font-bold text-gray-800'>
                                            Chị Mai
                                        </div>
                                        <div className='text-gray-600'>
                                            Khách hàng thân thiết
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='card bg-white shadow-xl hover:shadow-2xl transition-all duration-300'>
                            <div className='card-body p-8'>
                                <div className='flex items-center mb-4'>
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className='text-yellow-400 fill-current'
                                            size={20}
                                        />
                                    ))}
                                </div>
                                <p className='text-gray-700 mb-6 italic'>
                                    "Nhân viên tư vấn nhiệt tình, am hiểu sản
                                    phẩm. Sẽ tiếp tục ủng hộ cửa hàng!"
                                </p>
                                <div className='flex items-center'>
                                    <div className='avatar'>
                                        <div className='w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-red-500 flex items-center justify-center text-white font-bold'>
                                            H
                                        </div>
                                    </div>
                                    <div className='ml-4'>
                                        <div className='font-bold text-gray-800'>
                                            Anh Hùng
                                        </div>
                                        <div className='text-gray-600'>
                                            HLV Cầu lông
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='py-20 bg-gradient-to-r from-red-500 to-orange-500'>
                <div className='max-w-7xl mx-auto px-4 text-center'>
                    <h2 className='text-4xl lg:text-5xl font-bold text-white mb-6'>
                        Sẵn Sàng Nâng Tầm Cuộc Chơi Của Bạn?
                    </h2>
                    <p className='text-xl text-red-100 mb-8 max-w-2xl mx-auto'>
                        Khám phá bộ sưu tập độc quyền và nhận ưu đãi đặc biệt
                        dành riêng cho bạn
                    </p>
                    <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                        <Link to='/products'>
                            <button className='btn btn-lg px-8 py-4 bg-white text-red-600 hover:bg-gray-100 border-none font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'>
                                Mua Sắm Ngay{' '}
                                <ArrowRight className='ml-2' size={20} />
                            </button>
                        </Link>
                        <button className='btn btn-outline btn-lg px-8 py-4 text-white border-white hover:bg-white hover:text-red-600 font-semibold text-lg transition-all duration-300'>
                            Liên Hệ Tư Vấn
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Homepage;
