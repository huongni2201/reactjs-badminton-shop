import { Heart, Plus, Minus } from 'lucide-react';
import { formatPriceVND } from '../../../../utils/myUtils';

const ProductInfoSection = ({
    product,
    selectedVariant,
    setSelectedVariant,
    quantity,
    setQuantity,
    wishlist,
    setWishlist,
    handleAddToCart
}) => {
    const renderStars = rating => {
        return Array.from({ length: 5 }, (_, i) => (
            <span
                key={i}
                className={`text-lg ${
                    i < rating ? 'text-orange-400' : 'text-gray-300'
                }`}
            >
                ★
            </span>
        ));
    };

    const getVariantLabel = variant => {
        if (!variant.attributeValues || variant.attributeValues.length === 0)
            return 'Mặc định';
        return variant.attributeValues.map(attr => attr.value).join(' - ');
    };

    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-bold text-neutral'>{product?.name}</h1>
            <p className='text-gray-600'>{product?.description}</p>

            <div className='flex items-center space-x-2'>
                <div className='flex'>{renderStars(5)}</div>
                <span className='text-neutral-600'>(75 Review)</span>
            </div>

            <div className='text-3xl font-bold text-primary'>
                {selectedVariant
                    ? formatPriceVND(selectedVariant.price)
                    : 'Chọn phân loại để xem giá'}
            </div>

            <div className='space-y-2'>
                <div className='flex'>
                    <span className='w-20 text-neutral-600'>Brand</span>
                    <span className='mx-4'>:</span>
                    <span className='text-gray-800'>{product?.brandName}</span>
                </div>
                <div className='flex'>
                    <span className='w-20 text-neutral-600'>Category</span>
                    <span className='mx-4'>:</span>
                    <span className='text-gray-800'>
                        {product?.categoryName}
                    </span>
                </div>
                <div className='flex'>
                    <span className='w-20 text-neutral-600'>Stock</span>
                    <span className='mx-4'>:</span>
                    <span className='text-gray-800'>
                        {selectedVariant?.stockQuantity || 0} items
                    </span>
                </div>
                <div className='flex'>
                    <span className='w-20 text-neutral-600'>SKU</span>
                    <span className='mx-4'>:</span>
                    <span className='text-gray-800'>
                        {selectedVariant?.sku || '---'}
                    </span>
                </div>
            </div>

            {/* 👇 Gộp các thuộc tính thành nút chọn tổ hợp */}
            <div className='mb-4'>
                <span className='text-neutral-600 mb-2 block'>Phân loại:</span>
                <div className='flex flex-wrap gap-2'>
                    {product.variants.map(variant => {
                        const label = getVariantLabel(variant);
                        const isSelected = selectedVariant?.id === variant.id;

                        return (
                            <button
                                key={variant.id}
                                onClick={() => setSelectedVariant(variant)}
                                className={`px-3 py-1 rounded text-sm ${
                                    isSelected
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className='flex items-center space-x-4 py-2'>
                {selectedVariant?.stockQuantity === 0 ? (
                    <button
                        className='btn mt-2 bg-primary text-white rounded-lg'
                        onClick={() =>
                            handleAddToCart(product, selectedVariant, quantity)
                        }
                        disabled
                    >
                        Hết hàng
                    </button>
                ) : (
                    <>
                        <div className='flex items-center space-x-2'>
                            <button
                                onClick={() =>
                                    setQuantity(Math.max(1, quantity - 1))
                                }
                                className='btn mt-2 bg-base-200 text-black border-none rounded-lg'
                            >
                                <Minus className='w-4 h-4' />
                            </button>
                            <span className='w-8 text-center'>{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className='btn mt-2 bg-base-200 text-black border-none rounded-lg'
                            >
                                <Plus className='w-4 h-4' />
                            </button>
                        </div>

                        <button
                            className='btn mt-2 bg-primary text-white rounded-lg'
                            onClick={() =>
                                handleAddToCart(
                                    product,
                                    selectedVariant,
                                    quantity
                                )
                            }
                        >
                            Add To Cart
                        </button>

                        <button
                            className={`btn mt-2 border-none rounded-lg ${
                                wishlist
                                    ? 'bg-primary text-white'
                                    : 'bg-base-200 text-black'
                            }`}
                            onClick={() => setWishlist(!wishlist)}
                        >
                            <Heart className='w-4 h-4' />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductInfoSection;
