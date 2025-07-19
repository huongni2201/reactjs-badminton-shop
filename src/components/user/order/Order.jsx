import { CreditCard, User, MapPin } from 'lucide-react';
import OrderSummary from './OrderSummary';
import useOrder from './useOrder';
import AlertMessage from '../../common/AlertMessage';
import Loading from '../../common/Loading';

const Order = () => {
    const {
        isLoading,
        orderItems,
        totalPrice,
        customerInfo,
        formErrors,
        paymentMethod,
        showSuccessMessage,
        setShowSuccessMessage,
        setPaymentMethod,
        handleInputChange,
        handleSubmitOrder,
        handleSuccessMessage,
        baseUrl
    } = useOrder();

    return (
        <>
            {isLoading && (
                <Loading fullScreen message='Đang xử lý đơn hàng...' />
            )}

            <div className='max-w-7xl mx-auto px-4 py-8'>
                <div className='flex items-center gap-2 text-2xl font-bold text-primary mb-8 border-b border-gray-300 pb-4'>
                    <CreditCard />
                    <h2>Đặt hàng</h2>
                </div>

                <form onSubmit={handleSubmitOrder}>
                    <div className='grid lg:grid-cols-12 gap-8'>
                        {/* Customer Information */}
                        <div className='lg:col-span-8 space-y-6'>
                            {/* Personal Information */}
                            <div className='group relative bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/60 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300'>
                                <div className='absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>

                                <div className='flex items-center gap-3 mb-6'>
                                    <div className='p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl'>
                                        <User
                                            size={20}
                                            className='text-white'
                                        />
                                    </div>
                                    <h3 className='text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
                                        Thông tin khách hàng
                                    </h3>
                                </div>

                                <div className='grid md:grid-cols-2 gap-4'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            Họ và tên{' '}
                                            <span className='text-red-500'>
                                                (*)
                                            </span>
                                        </label>
                                        <input
                                            type='text'
                                            name='fullName'
                                            value={customerInfo.fullName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border ${
                                                formErrors.fullName
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
                                            } rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200`}
                                            placeholder='Nhập họ và tên'
                                            required
                                        />
                                        {formErrors.fullName && (
                                            <p className='text-red-500 text-sm mt-1'>
                                                {formErrors.fullName}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            Số điện thoại{' '}
                                            <span className='text-red-500'>
                                                (*)
                                            </span>
                                        </label>
                                        <input
                                            type='tel'
                                            name='phone'
                                            value={customerInfo.phone}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border ${
                                                formErrors.phone
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
                                            } rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200`}
                                            placeholder='Nhập số điện thoại'
                                            required
                                        />
                                        {formErrors.phone && (
                                            <p className='text-red-500 text-sm mt-1'>
                                                {formErrors.phone}
                                            </p>
                                        )}
                                    </div>
                                    <div className='md:col-span-2'>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            Email
                                        </label>
                                        <input
                                            type='email'
                                            name='email'
                                            value={customerInfo.email}
                                            onChange={handleInputChange}
                                            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200'
                                            placeholder='Nhập email'
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className='group relative bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/60 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300'>
                                <div className='absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>

                                <div className='flex items-center gap-3 mb-6'>
                                    <div className='p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl'>
                                        <MapPin
                                            size={20}
                                            className='text-white'
                                        />
                                    </div>
                                    <h3 className='text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
                                        Địa chỉ giao hàng
                                    </h3>
                                </div>

                                <div className='mb-4'>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Địa chỉ cụ thể{' '}
                                        <span className='text-red-500'>
                                            (*)
                                        </span>
                                    </label>
                                    <input
                                        type='text'
                                        name='address'
                                        value={customerInfo.address}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border ${
                                            formErrors.address
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        } rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200`}
                                        placeholder='Số nhà, tên đường...'
                                        required
                                    />
                                    {formErrors.address && (
                                        <p className='text-red-500 text-sm mt-1'>
                                            {formErrors.address}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Ghi chú đơn hàng
                                    </label>
                                    <textarea
                                        name='note'
                                        value={customerInfo.note}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200'
                                        placeholder='Ghi chú thêm về đơn hàng (tùy chọn)'
                                    />
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className='group relative bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/60 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300'>
                                <div className='absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>

                                <div className='flex items-center gap-3 mb-6'>
                                    <div className='p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl'>
                                        <CreditCard
                                            size={20}
                                            className='text-white'
                                        />
                                    </div>
                                    <h3 className='text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
                                        Phương thức thanh toán
                                    </h3>
                                </div>

                                <div className='space-y-3'>
                                    {['COD', 'BANK', 'MOMO'].map(method => (
                                        <div
                                            key={method}
                                            className='flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:border-red-300 transition-colors'
                                        >
                                            <input
                                                type='radio'
                                                id={method}
                                                name='payment'
                                                value={method}
                                                checked={
                                                    paymentMethod === method
                                                }
                                                onChange={e =>
                                                    setPaymentMethod(
                                                        e.target.value
                                                    )
                                                }
                                                className='w-4 h-4 text-red-600 focus:ring-red-500'
                                            />
                                            <label
                                                htmlFor={method}
                                                className='flex-1 cursor-pointer'
                                            >
                                                <div className='font-medium text-gray-800'>
                                                    {method === 'COD'
                                                        ? 'Thanh toán khi nhận hàng (COD)'
                                                        : method === 'BANK'
                                                        ? 'Chuyển khoản ngân hàng'
                                                        : 'Ví MoMo'}
                                                </div>
                                                <div className='text-sm text-gray-500'>
                                                    {method === 'COD'
                                                        ? 'Thanh toán bằng tiền mặt khi nhận hàng'
                                                        : method === 'BANK'
                                                        ? 'Chuyển khoản qua tài khoản ngân hàng'
                                                        : 'Thanh toán qua ví điện tử MoMo'}
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                {paymentMethod === 'BANK' && (
                                    <div className='mt-4 p-4 bg-gray-50 border border-gray-200 rounded-xl'>
                                        <h4 className='text-lg font-semibold text-gray-800 mb-4'>
                                            Thông tin chuyển khoản ngân hàng
                                        </h4>

                                        <div className='flex justify-between space-x-4 mb-4'>
                                            <div className='space-y-2 text-gray-700 text-sm'>
                                                <p>
                                                    <strong>Ngân hàng:</strong>{' '}
                                                    Vietcombank (VCB)
                                                </p>
                                                <p>
                                                    <strong>
                                                        Số tài khoản:
                                                    </strong>{' '}
                                                    0123456789
                                                </p>
                                                <p>
                                                    <strong>
                                                        Chủ tài khoản:
                                                    </strong>{' '}
                                                    NGUYEN VAN A
                                                </p>
                                                <p>
                                                    <strong>Số tiền:</strong>{' '}
                                                    <span className='text-red-600 font-semibold'>
                                                        {totalPrice.toLocaleString()}
                                                        đ
                                                    </span>
                                                </p>
                                                <p>
                                                    <strong>
                                                        Nội dung chuyển khoản:
                                                    </strong>{' '}
                                                    <span className='text-blue-600 font-semibold'>
                                                        DH
                                                        {customerInfo.phone?.slice(
                                                            -4
                                                        )}
                                                        -
                                                        {Math.floor(totalPrice)}
                                                    </span>
                                                </p>
                                            </div>

                                            <div className='mt-4'>
                                                <h5 className='font-medium mb-2'>
                                                    Quét mã QR để chuyển khoản
                                                    nhanh:
                                                </h5>
                                                <img
                                                    src={`https://img.vietqr.io/image/VCB-0123456789-compact2.png?amount=${totalPrice}&addInfo=DH${customerInfo.phone?.slice(
                                                        -4
                                                    )}-${Math.floor(
                                                        totalPrice
                                                    )}`}
                                                    alt='QR Chuyển khoản'
                                                    className='w-56 h-auto rounded-lg border'
                                                />
                                                <p className='text-xs text-gray-500 mt-2'>
                                                    * Quét bằng app ngân hàng
                                                    hoặc ví điện tử
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className='lg:col-span-4'>
                            <OrderSummary
                                orderItems={orderItems}
                                totalPrice={totalPrice}
                                onSubmit={handleSubmitOrder}
                                baseUrl={baseUrl}
                            />
                        </div>
                    </div>
                </form>

                {showSuccessMessage && (
                    <AlertMessage
                        isVisible={showSuccessMessage}
                        onClose={() => handleSuccessMessage()}
                        type='success'
                        title='🎉 Đặt hàng thành công!'
                        message='Đơn hàng của bạn đã được xác nhận'
                        showThankYou
                    />
                )}
            </div>
        </>
    );
};

export default Order;
