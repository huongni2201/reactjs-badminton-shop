import { useNavigate, useParams } from 'react-router-dom';
import useMyOrders from '../myOrders/useMyOrders';
import {
    ArrowLeft,
    Calendar,
    CreditCard,
    MapPin,
    Package,
    User
} from 'lucide-react';
import { formatDate, formatPriceVND } from '../../../../utils/myUtils';
import { PRODUCT_IMAGE_URL } from '../../../../utils/constants';

const MyOrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        orders,
        isLoading,
        getOrderStatusIcon,
        getOrderStatusColor,
        getPaymentMethod
    } = useMyOrders();

    if (isLoading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4'></div>
                    <p className='text-gray-600'>
                        Đang tải chi tiết đơn hàng...
                    </p>
                </div>
            </div>
        );
    }

    console.log(orders);

    console.log(id);

    const order = orders.find(o => o.orderId === Number(id));

    if (!order) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <Package size={64} className='mx-auto text-gray-400 mb-4' />
                    <h3 className='text-xl font-medium text-gray-600 mb-2'>
                        Không tìm thấy đơn hàng
                    </h3>
                    <p className='text-gray-500 mb-6'>
                        Đơn hàng #{order.orderId} không tồn tại hoặc đã bị xóa
                    </p>
                    <button
                        onClick={() => navigate('/user/my-orders')}
                        className='bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300'
                    >
                        Quay lại danh sách đơn hàng
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto px-4 py-8'>
            {/* Header */}
            <div className='flex items-center gap-4 mb-8'>
                <button
                    onClick={() => navigate('/user/my-orders')}
                    className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                >
                    <ArrowLeft size={24} />
                </button>
                <div className='flex items-center gap-3'>
                    <div className='p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl'>
                        <Package size={20} className='text-white' />
                    </div>
                    <div>
                        <h1 className='text-2xl font-bold text-gray-800'>
                            Chi tiết đơn hàng #{order?.orderId}
                        </h1>
                        <div className='flex items-center gap-2 mt-1'>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(
                                    order.orderStatus
                                )}`}
                            >
                                {order?.orderStatus}
                            </span>
                            <span className='text-sm text-gray-500 flex items-center gap-1'>
                                <Calendar size={14} />
                                {formatDate(order?.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='grid lg:grid-cols-3 gap-8'>
                {/* Main Content */}
                <div className='lg:col-span-2 space-y-6'>
                    {/* Customer Information */}
                    <div className='group relative bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/60 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300'>
                        <div className='absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>

                        <div className='flex items-center gap-3 mb-4'>
                            <div className='p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl'>
                                <User size={20} className='text-white' />
                            </div>
                            <h3 className='text-lg font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
                                Thông tin khách hàng
                            </h3>
                        </div>
                        <div className='grid md:grid-cols-2 gap-4'>
                            <div>
                                <p className='text-sm text-gray-600 mb-1'>
                                    <strong>Họ và tên:</strong>
                                </p>
                                <p className='text-gray-800'>
                                    {order.fullName}
                                </p>
                            </div>
                            <div>
                                <p className='text-sm text-gray-600 mb-1'>
                                    <strong>Số điện thoại:</strong>
                                </p>
                                <p className='text-gray-800'>{order.phone}</p>
                            </div>
                            {order.email && (
                                <div className='md:col-span-2'>
                                    <p className='text-sm text-gray-600 mb-1'>
                                        <strong>Email:</strong>
                                    </p>
                                    <p className='text-gray-800'>
                                        {order.email}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className='group relative bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/60 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300'>
                        <div className='absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>

                        <div className='flex items-center gap-3 mb-4'>
                            <div className='p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl'>
                                <MapPin size={20} className='text-white' />
                            </div>
                            <h3 className='text-lg font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
                                Địa chỉ giao hàng
                            </h3>
                        </div>
                        <p className='text-gray-700 leading-relaxed'>
                            {order.address}
                        </p>
                        {order.note && (
                            <div className='mt-4 p-3 bg-gray-50 rounded-xl'>
                                <p className='text-sm text-gray-600 mb-1'>
                                    <strong>Ghi chú:</strong>
                                </p>
                                <p className='text-gray-700'>{order.note}</p>
                            </div>
                        )}
                    </div>

                    {/* Payment Method */}
                    <div className='group relative bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/60 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300'>
                        <div className='absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>

                        <div className='flex items-center gap-3 mb-4'>
                            <div className='p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl'>
                                <CreditCard size={20} className='text-white' />
                            </div>
                            <h3 className='text-lg font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
                                Phương thức thanh toán
                            </h3>
                        </div>
                        <p className='text-gray-700'>
                            {getPaymentMethod(order.paymentMethod)}
                        </p>
                    </div>
                </div>

                {/* Order Summary */}
                <div className='lg:col-span-1'>
                    <div className='sticky top-4 group relative bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/60 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300'>
                        <div className='absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>

                        <div className='flex items-center gap-3 mb-6'>
                            <div className='p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl'>
                                <Package size={20} className='text-white' />
                            </div>
                            <h3 className='text-lg font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
                                Sản phẩm đã đặt
                            </h3>
                        </div>

                        <div className='space-y-4 mb-6'>
                            {order.items.map((item, index) => (
                                <div
                                    key={index}
                                    className='flex items-center gap-4 p-4 border border-gray-200 rounded-xl'
                                >
                                    <img
                                        src={`${PRODUCT_IMAGE_URL}/${item.thumbnailUrl}`}
                                        alt={item.name}
                                        className='w-20 h-20 object-cover rounded-lg'
                                    />
                                    <div className='flex-1'>
                                        <h4 className='font-medium text-gray-800 mb-1'>
                                            {item.productName}
                                        </h4>
                                        <span className='text-sm text-gray-600'>
                                            {`${item.variantAttributeValues.color} - ${item.variantAttributeValues.size}`}
                                        </span>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-sm text-gray-600'>
                                                SL: {item.quantity}
                                            </span>
                                            <span className='font-medium text-gray-800'>
                                                {formatPriceVND(
                                                    item.unitPrice *
                                                        item.quantity
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='border-t border-gray-200 pt-4'>
                            <div className='flex justify-between items-center mb-4'>
                                <span className='text-lg font-medium text-gray-700'>
                                    Tổng cộng:
                                </span>
                                <span className='text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
                                    {formatPriceVND(order.totalPrice)}
                                </span>
                            </div>

                            <button
                                onClick={() => navigate('/user/my-orders')}
                                className='cursor-pointer w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium'
                            >
                                Quay lại danh sách đơn hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrderDetails;
