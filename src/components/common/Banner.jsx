import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { ChevronRight, ChevronLeft } from 'lucide-react';

import bannerFirst from '../../assets/banner_first.webp';
import bannerSecond from '../../assets/banner_second.webp';
import bannerThird from '../../assets/banner_third.webp';

function CustomNextArrow(props) {
    const { className, style, onClick } = props;

    return (
        <div
            className={`!w-[40px] !h-[40px] absolute right-8 top-1/2 -translate-y-1/2 z-10
                        flex items-center justify-center bg-transparent text-white
                        hover:bg-primary/90 rounded-full transition-all duration-300`}
            style={{
                ...style,
                display: 'flex'
            }}
            onClick={onClick}
        >
            <ChevronRight size={24} />
        </div>
    );
}

function CustomPrevArrow(props) {
    const { className, style, onClick } = props;

    return (
        <div
            className={`!w-[40px] !h-[40px] absolute left-8 top-1/2 -translate-y-1/2 z-10
                        flex items-center justify-center bg-transparent text-white
                        hover:bg-primary/90 rounded-full transition-all duration-300`}
            style={{
                ...style,
                display: 'flex'
            }}
            onClick={onClick}
        >
            <ChevronLeft size={24} />
        </div>
    );
}

const Banner = () => {
    const products = [
        {
            id: 1,
            image: bannerFirst
        },
        {
            id: 2,
            image: bannerSecond
        },
        {
            id: 3,
            image: bannerThird
        }
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />
    };

    return (
        <div className='w-full'>
            <Slider {...settings}>
                {products?.map(product => (
                    <div key={product?.id} className='relative w-screen'>
                        <img
                            src={product?.image}
                            alt=''
                            className='w-full max-h-[640px] object-cover'
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Banner;
