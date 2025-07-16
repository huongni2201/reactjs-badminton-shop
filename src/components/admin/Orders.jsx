import { useState } from 'react';
import {
    ShoppingCart,
    Search,
    Eye,
    Edit,
    ShoppingBasket,
    Activity,
    ShieldOff,
    Ban
} from 'lucide-react';
import StatCard from './StatCard';

const Orders = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const orders = [
        {
            id: '#001',
            customer: 'Nguyễn Văn A',
            email: 'nguyen.van.a@email.com',
            products: 'Vợt cầu lông Yonex, Giày Victor',
            total: '4,700,000đ',
            status: 'Hoàn thành',
            date: '2024-06-25',
            payment: 'Đã thanh toán'
        },
        {
            id: '#002',
            customer: 'Trần Thị B',
            email: 'tran.thi.b@email.com',
            products: 'Áo cầu lông Li-Ning',
            total: '450,000đ',
            status: 'Đang giao',
            date: '2024-06-26',
            payment: 'Đã thanh toán'
        },
        {
            id: '#003',
            customer: 'Lê Văn C',
            email: 'le.van.c@email.com',
            products: 'Bộ cầu lông Mizuno',
            total: '5,200,000đ',
            status: 'Chờ xử lý',
            date: '2024-06-27',
            payment: 'Chờ thanh toán'
        },
        {
            id: '#004',
            customer: 'Phạm Thị D',
            email: 'pham.thi.d@email.com',
            products: 'Túi đựng vợt Yonex',
            total: '800,000đ',
            status: 'Đã hủy',
            date: '2024-06-24',
            payment: 'Đã hoàn tiền'
        }
    ];

    const filteredOrders = orders.filter(
        order =>
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = status => {
        switch (status) {
            case 'Hoàn thành':
                return 'badge-success';
            case 'Đang giao':
                return 'badge-warning';
            case 'Chờ xử lý':
                return 'badge-info';
            case 'Đã hủy':
                return 'badge-error';
            default:
                return 'badge-ghost';
        }
    };

    const getPaymentColor = payment => {
        switch (payment) {
            case 'Đã thanh toán':
                return 'badge-success';
            case 'Chờ thanh toán':
                return 'badge-warning';
            case 'Đã hoàn tiền':
                return 'badge-info';
            default:
                return 'badge-ghost';
        }
    };

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                <div>
                    <h1 className='text-3xl font-bold text-base-content'>
                        Quản lý Đơn hàng
                    </h1>
                    <p className='text-base-content/70 mt-1'>
                        Theo dõi và quản lý tất cả đơn hàng
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                <StatCard
                    icon={<ShoppingBasket size={24} />}
                    title='Tổng sản phẩm cầu lông'
                    value='100'
                    subtext='Bao gồm vợt, giày, phụ kiện...'
                    color='primary'
                />
                <StatCard
                    icon={<Activity size={24} />}
                    title='Đang bán'
                    value='120'
                    subtext='Chiếm 60% tổng kho'
                    color='success'
                />
                <StatCard
                    icon={<ShieldOff size={24} />}
                    title='Ngừng bán'
                    value='50'
                    subtext='Chiếm 25% tổng kho'
                    color='warning'
                />
                <StatCard
                    icon={<Ban size={24} />}
                    title='Hết hàng'
                    value='30'
                    subtext='Chiếm 15% tổng kho'
                    color='error'
                />
            </div>

            {/* Search and Filters */}
            <div className='card bg-base-100 shadow-xl'>
                <div className='card-body'>
                    <div className='flex flex-col lg:flex-row gap-4'>
                        <div className='form-control flex-1'>
                            <div className='relative'>
                                <input
                                    type='text'
                                    placeholder='Tìm kiếm theo ID đơn hàng hoặc tên khách hàng...'
                                    className='input input-bordered w-full pl-10'
                                    value={searchTerm}
                                    onChange={e =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                                <Search
                                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50'
                                    size={20}
                                />
                            </div>
                        </div>
                        <select className='select select-bordered'>
                            <option>Tất cả trạng thái</option>
                            <option>Chờ xử lý</option>
                            <option>Đang giao</option>
                            <option>Hoàn thành</option>
                            <option>Đã hủy</option>
                        </select>
                        <select className='select select-bordered'>
                            <option>Tất cả thanh toán</option>
                            <option>Đã thanh toán</option>
                            <option>Chờ thanh toán</option>
                            <option>Đã hoàn tiền</option>
                        </select>
                        <input type='date' className='input input-bordered' />
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className='card bg-base-100 shadow-xl'>
                <div className='card-body'>
                    <div className='overflow-x-auto'>
                        <table className='table table-zebra w-full'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Khách hàng</th>
                                    <th>Sản phẩm</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái</th>
                                    <th>Thanh toán</th>
                                    <th>Ngày đặt</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map(order => (
                                    <tr key={order.id}>
                                        <td className='font-mono font-bold'>
                                            {order.id}
                                        </td>
                                        <td>
                                            <div>
                                                <div className='font-medium'>
                                                    {order.customer}
                                                </div>
                                                <div className='text-sm text-base-content/70'>
                                                    {order.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                className='max-w-xs truncate'
                                                title={order.products}
                                            >
                                                {order.products}
                                            </div>
                                        </td>
                                        <td className='font-bold text-primary'>
                                            {order.total}
                                        </td>
                                        <td>
                                            <span
                                                className={`badge ${getStatusColor(
                                                    order.status
                                                )}`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                className={`badge ${getPaymentColor(
                                                    order.payment
                                                )}`}
                                            >
                                                {order.payment}
                                            </span>
                                        </td>
                                        <td>{order.date}</td>
                                        <td>
                                            <div className='flex gap-2'>
                                                <button
                                                    className='btn btn-ghost btn-xs text-blue-600'
                                                    title='Xem chi tiết'
                                                >
                                                    <Eye size={14} />
                                                </button>
                                                <button
                                                    className='btn btn-ghost btn-xs text-green-600'
                                                    title='Chỉnh sửa'
                                                >
                                                    <Edit size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className='flex justify-center mt-6'>
                        <div className='join'>
                            <button className='join-item btn'>«</button>
                            <button className='join-item btn btn-active'>
                                1
                            </button>
                            <button className='join-item btn'>2</button>
                            <button className='join-item btn'>3</button>
                            <button className='join-item btn'>»</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
