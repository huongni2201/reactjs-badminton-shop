import { Minus, Plus, X } from 'lucide-react';
import { formatPriceVND } from '../../../utils/myUtils';

const CartItem = ({ cartItem, onChangeQuantity, onRemove, baseUrl }) => {
    return (
        <div className='group relative bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/60 rounded-2xl p-3 hover:shadow-xl hover:shadow-red-100/30 transition-all duration-300 hover:-translate-y-1'>
            {/* Gradient border effect */}
            <div className='absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>

            <div className='flex flex-col sm:flex-row gap-6'>
                {/* Product Image */}
                <div className='relative w-full sm:w-32 h-32 flex-shrink-0'>
                    <div className='absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl'></div>
                    <img
                        src={`${baseUrl}/${cartItem.productImage}`}
                        alt={cartItem.productName}
                        className='relative w-full h-full object-cover rounded-xl border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-300'
                    />
                    {cartItem.category && (
                        <div className='absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-md'>
                            {cartItem.category}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className='flex-1 flex flex-col justify-between'>
                    <div className='space-y-3'>
                        <div>
                            <h3 className='text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-red-700 transition-colors'>
                                {cartItem.productName}
                            </h3>
                            <div className='flex items-center gap-2 mt-2'>
                                <span className='text-sm text-gray-500'>
                                    Đơn giá:
                                </span>
                                <span className='text-base font-semibold text-gray-700'>
                                    {formatPriceVND(cartItem.unitPrice)}
                                </span>
                                <span className='text-gray-500'>|</span>
                                <span className='text-base text-gray-500'>
                                    {cartItem.variantAttributeValues.color} -{' '}
                                    {cartItem.variantAttributeValues.size}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className='flex items-center justify-between mt-2 pt-2 border-t border-gray-100'>
                        {/* Quantity Controls */}
                        <div className='flex items-center gap-3'>
                            <span className='text-sm font-medium text-gray-600'>
                                Số lượng:
                            </span>
                            <div className='flex items-center bg-gray-50 rounded-full p-1 border border-gray-200'>
                                <button
                                    className='w-8 h-8 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all duration-200 active:scale-95'
                                    onClick={() =>
                                        onChangeQuantity(
                                            cartItem.cartItemId,
                                            -1
                                        )
                                    }
                                    disabled={cartItem.quantity <= 1}
                                >
                                    <Minus size={14} />
                                </button>
                                <span className='w-12 text-center text-lg font-bold text-gray-800'>
                                    {cartItem.quantity}
                                </span>
                                <button
                                    className='w-8 h-8 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50 transition-all duration-200 active:scale-95'
                                    onClick={() =>
                                        onChangeQuantity(cartItem.cartItemId, 1)
                                    }
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Total Price and Remove */}
                        <div className='flex items-center gap-4'>
                            <div className='text-right'>
                                <div className='text-sm text-gray-500'>
                                    Thành tiền
                                </div>
                                <div className='text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
                                    {formatPriceVND(
                                        cartItem.unitPrice * cartItem.quantity
                                    )}
                                </div>
                            </div>
                            <button
                                className='w-10 h-10 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group/remove'
                                onClick={() => onRemove(cartItem.cartItemId)}
                            >
                                <X
                                    size={18}
                                    className='group-hover/remove:rotate-90 transition-transform duration-200'
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Ribbon góc phải */}
                {/* Ribbon góc trên bên phải */}
                <div className='absolute top-0 right-0 z-10'>
                    <div className='relative w-20 h-20 overflow-hidden'>
                        <div className='absolute top-[2px] right-[-8px] rotate-30 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-semibold tracking-wide py-[3px] px-2 text-center shadow-md'>
                            <div className='flex items-center justify-center gap-1'>
                                <span>HOT</span>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-3 w-3'
                                    fill='white'
                                    viewBox='0 0 24 24'
                                    stroke='none'
                                >
                                    <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover effect line */}
            <div className='absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full'></div>
        </div>
    );
};

export default CartItem;
