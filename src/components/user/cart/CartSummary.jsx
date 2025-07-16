import { ShoppingCart, CreditCard } from 'lucide-react';
import { formatPriceVND } from '../../../utils/myUtils';
import { Link } from 'react-router-dom';

const CartSummary = ({ totalPrice, disabled }) => {
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
                    Tóm tắt đơn hàng
                </h3>
            </div>

            {/* Order details */}
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

                {/* Tax */}
                <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                    <span className='text-gray-600 font-medium'>Thuế:</span>
                    <span className='text-gray-800 font-semibold'>
                        {formatPriceVND(0)}
                    </span>
                </div>

                {/* totalPrice */}
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

            {/* Checkout button */}
            <Link to={`/orders`}>
                <button
                    className={`
          w-full mt-6 py-4 px-6 rounded-xl font-bold text-lg
          flex items-center justify-center gap-3
          transition-all duration-300 transform cursor-pointer
          ${
              disabled
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 hover:scale-105 hover:shadow-lg hover:shadow-blue-200/50 active:scale-95'
          }
        `}
                    disabled={disabled}
                >
                    <CreditCard size={24} />
                    {disabled ? 'Giỏ hàng trống' : 'Tiến hành thanh toán'}
                </button>
            </Link>
            {/* Security notice */}
            <div className='mt-4 text-center'>
                <p className='text-xs text-gray-500 flex items-center justify-center gap-1'>
                    <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                    Thanh toán an toàn & bảo mật
                </p>
            </div>

            {/* Hover effect line */}
            <div className='absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full'></div>
        </div>
    );
};

export default CartSummary;
