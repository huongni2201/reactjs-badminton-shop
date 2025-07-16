import { Package } from 'lucide-react';
import useMyOrders from './useMyOrders';
import OrderCard from './OrderCard';

const MyOrders = () => {
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
                    <p className='text-gray-600'>Đang tải đơn hàng...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto px-4 py-8'>
            <div className='flex items-center gap-2 text-2xl font-bold text-primary mb-8 border-b border-gray-300 pb-4'>
                <Package />
                <h2>Đơn hàng của tôi</h2>
            </div>

            {orders.length === 0 ? (
                <div className='text-center py-12'>
                    <Package size={64} className='mx-auto text-gray-400 mb-4' />
                    <h3 className='text-xl font-medium text-gray-600 mb-2'>
                        Chưa có đơn hàng nào
                    </h3>
                    <p className='text-gray-500 mb-6'>
                        Bạn chưa đặt đơn hàng nào. Hãy khám phá và mua sắm ngay!
                    </p>
                    <button className='bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300'>
                        Mua sắm ngay
                    </button>
                </div>
            ) : (
                <div className='space-y-6'>
                    {orders?.map(order => (
                        <OrderCard
                            key={order.orderId}
                            order={order}
                            getOrderStatusIcon={getOrderStatusIcon}
                            getOrderStatusColor={getOrderStatusColor}
                            getPaymentMethod={getPaymentMethod}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
