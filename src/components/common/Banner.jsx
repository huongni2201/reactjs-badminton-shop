import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { ChevronRight, ChevronLeft } from 'lucide-react';

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
            name: 'Product 1',
            image: 'https://img.freepik.com/free-psd/badminton-template-design_23-2151464881.jpg?semt=ais_hybrid&w=740',
            price: 100
        },
        {
            id: 2,
            name: 'Product 1',
            image: 'https://img.freepik.com/free-psd/badminton-template-design_23-2151464881.jpg?semt=ais_hybrid&w=740',
            price: 100
        },
        {
            id: 3,
            name: 'Product 1',
            image: 'https://img.freepik.com/free-psd/badminton-template-design_23-2151464881.jpg?semt=ais_hybrid&w=740',
            price: 100
        },
        {
            id: 4,
            name: 'Product 1',
            image: 'https://img.freepik.com/free-psd/badminton-template-design_23-2151464881.jpg?semt=ais_hybrid&w=740',
            price: 100
        },
        {
            id: 5,
            name: 'Product 1',
            image: 'https://img.freepik.com/free-psd/badminton-template-design_23-2151464881.jpg?semt=ais_hybrid&w=740',
            price: 100
        }
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
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
                            className='w-full max-h-[500px] object-cover'
                        />
                        <h2 className='text-2xl font-bold mb-4 absolute top-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded'>
                            {product?.name}
                        </h2>
                        <p className='text-lg text-gray-700 absolute bottom-4 left-4 bg-white bg-opacity-80 p-2 rounded'>
                            Price: ${product?.price}
                        </p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Banner;
