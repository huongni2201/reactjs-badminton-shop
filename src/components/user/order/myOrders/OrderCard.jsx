import { Eye, Calendar, MapPin } from 'lucide-react';
import { formatDate, formatPriceVND } from '../../../../utils/myUtils';
import { Link } from 'react-router-dom';

const OrderCard = ({
    order,
    getOrderStatusIcon,
    getOrderStatusColor,
    getPaymentMethod
}) => {
    return (
        <div className='group relative bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/60 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300'>
            <div className='absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>

            <div className='flex justify-between items-start mb-4'>
                <div className='flex items-center gap-3'>
                    <div className='p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl'>
                        {getOrderStatusIcon(order.orderStatus)}
                    </div>
                    <div>
                        <div className='flex items-center gap-2'>
                            <h3 className='text-lg font-bold text-gray-800'>
                                Đơn hàng #{order.orderId}
                            </h3>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(
                                    order.orderStatus
                                )}`}
                            >
                                {order.orderStatus}
                            </span>
                        </div>
                        <div className='flex items-center gap-1 text-sm text-gray-500 mt-1'>
                            <Calendar size={14} />
                            <span>{formatDate(order.createdAt)}</span>
                        </div>
                    </div>
                </div>

                <Link to={`/user/my-orders/${order.orderId}`}>
                    <button className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all duration-300'>
                        <Eye size={16} />
                        <span>Chi tiết</span>
                    </button>
                </Link>
            </div>

            <div className='grid md:grid-cols-2 gap-4 mb-4'>
                <div>
                    <h4 className='font-medium text-gray-700 mb-2'>
                        Thông tin khách hàng
                    </h4>
                    <div className='space-y-1 text-sm text-gray-600'>
                        <p>
                            <strong>Tên:</strong> {order.fullName}
                        </p>
                        <p>
                            <strong>SĐT:</strong> {order.phone}
                        </p>
                        {order.email && (
                            <p>
                                <strong>Email:</strong> {order.email}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <h4 className='font-medium text-gray-700 mb-2 flex items-center gap-1'>
                        <MapPin size={16} />
                        Địa chỉ giao hàng
                    </h4>
                    <p className='text-sm text-gray-600'>{order.address}</p>
                </div>
            </div>

            <div className='flex justify-between items-center pt-4 border-t border-gray-200'>
                <div>
                    <p className='text-sm text-gray-600'>
                        <strong>Số lượng:</strong> {order.items.length} sản phẩm
                    </p>
                    <p className='text-sm text-gray-600'>
                        <strong>Thanh toán:</strong>{' '}
                        {getPaymentMethod(order.paymentMethod)}
                    </p>
                </div>
                <div className='text-right'>
                    <p className='text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
                        {formatPriceVND(order.totalPrice)}
                    </p>
                </div>
            </div>

            {order.note && (
                <div className='mt-4 p-3 bg-gray-50 rounded-xl'>
                    <p className='text-sm text-gray-600'>
                        <strong>Ghi chú:</strong> {order.note}
                    </p>
                </div>
            )}
        </div>
    );
};

export default OrderCard;
