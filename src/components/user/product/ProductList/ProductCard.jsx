import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPriceVND } from '../../../../utils/myUtils';

const ProductCard = ({ product }) => {
    const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/storage/product`;
    return (
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow'>
            <Link to={`/products/${product.id}`}>
                <div className=' overflow-hidden flex items-center justify-center p-2'>
                    <img
                        src={`${baseUrl}/${product.thumbnailUrl}`}
                        className='h-52 w-52 object-cover rounded-lg'
                        alt={product.name}
                    />
                </div>
            </Link>

            <div className='p-4'>
                <Link to={`/products/${product.id}`}>
                    <h3 className='font-medium text-gray-900 mb-1 line-clamp-2 min-h-[3.25rem]'>
                        {product.name}
                    </h3>
                </Link>

                <p className='text-sm text-gray-600 mb-2'>
                    Category: {product.categoryName}
                </p>
                <p className='text-sm text-gray-600 mb-2'>
                    Brand: {product.brandName || 'Unknown Brand'}
                </p>

                <div className='flex items-center justify-between'>
                    <span className='text-lg font-semibold text-red-600'>
                        {formatPriceVND(product.minPrice) || 'N/A'}
                    </span>

                    <button className='bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors cursor-pointer'>
                        <ShoppingCart className='w-4 h-4' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
