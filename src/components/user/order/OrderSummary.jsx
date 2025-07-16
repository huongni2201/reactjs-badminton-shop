import { ShoppingCart, CreditCard } from 'lucide-react';
import { formatPriceVND } from '../../../utils/myUtils';

const OrderSummary = ({ orderItems, totalPrice, onSubmit, baseUrl }) => {
    return (
        <div className='group relative bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/60 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300 sticky top-8'>
            {/* Gradient border effect */}
            <div className='absolute inset-0 bg-gradient-to-r from-red-500/20 via-red-500/20 to-orange-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>

            {/* Header */}
            <div className='flex items-center gap-3 mb-6'>
                <div className='p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl'>
                    <ShoppingCart size={20} className='text-white' />
                </div>
                <h3 className='text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
                    Chi tiết đơn hàng
                </h3>
            </div>

            {/* Order Items */}
            <div className='space-y-3 mb-6'>
                {orderItems?.map(item => (
                    <div
                        key={item.cartItemId}
                        className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl'
                    >
                        <img
                            src={`${baseUrl}/${item.productImage}`}
                            alt={item.productName}
                            className='w-12 h-12 object-cover rounded-lg border border-gray-200'
                        />
                        <div className='flex-1'>
                            <h4 className='font-medium text-gray-800 text-sm line-clamp-1'>
                                {item.productName}
                            </h4>
                            <p className='text-xs text-gray-500'>
                                {item.variantAttributeValues.color} -{' '}
                                {item.variantAttributeValues.size}
                            </p>
                            <div className='flex justify-between items-center mt-1'>
                                <span className='text-xs text-gray-600'>
                                    SL: {item.quantity}
                                </span>
                                <span className='text-sm font-semibold text-gray-800'>
                                    {formatPriceVND(
                                        item.unitPrice * item.quantity
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Order summary */}
            <div className='space-y-4'>
                {/* Subtotal */}
                <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                    <span className='text-gray-600 font-medium'>Tạm tính:</span>
                    <span className='text-gray-800 font-semibold'>
                        {formatPriceVND(totalPrice)}
                    </span>
                </div>

                {/* Shipping */}
                <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                    <span className='text-gray-600 font-medium'>
                        Phí vận chuyển:
                    </span>
                    <span className='text-gray-800 font-semibold'>
                        {0 === 0 ? (
                            <span className='text-green-600 font-bold'>
                                Miễn phí
                            </span>
                        ) : (
                            formatPriceVND(0)
                        )}
                    </span>
                </div>

                {/* Total */}
                <div className='bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 mt-4'>
                    <div className='flex justify-between items-center'>
                        <span className='text-lg font-bold text-gray-800'>
                            Tổng cộng:
                        </span>
                        <span className='text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent'>
                            {formatPriceVND(totalPrice)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Order button */}
            <button
                type='submit'
                onClick={onSubmit}
                className='w-full mt-6 py-4 px-6 rounded-xl font-bold text-lg
                         flex items-center justify-center gap-3
                         bg-gradient-to-r from-red-500 to-orange-500 text-white
                         hover:from-red-600 hover:to-orange-600 hover:scale-105
                         hover:shadow-lg hover:shadow-red-200/50 active:scale-95
                         transition-all duration-300 transform cursor-pointer'
            >
                <CreditCard size={24} />
                Đặt hàng ngay
            </button>

            {/* Security notice */}
            <div className='mt-4 text-center'>
                <p className='text-xs text-gray-500 flex items-center justify-center gap-1'>
                    <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                    Đặt hàng an toàn & bảo mật
                </p>
            </div>

            {/* Hover effect line */}
            <div className='absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full'></div>
        </div>
    );
};

export default OrderSummary;
