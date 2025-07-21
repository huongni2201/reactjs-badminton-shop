import { Package, User, ShoppingCart, TrendingUp } from 'lucide-react';

const Dashboard = () => {
    const stats = [
        {
            title: 'Tổng sản phẩm',
            value: '1,234',
            change: '+12.5%',
            icon: Package,
            color: 'bg-blue-500'
        },
        {
            title: 'Người dùng',
            value: '856',
            change: '+8.2%',
            icon: User,
            color: 'bg-green-500'
        },
        {
            title: 'Đơn hàng',
            value: '342',
            change: '+15.3%',
            icon: ShoppingCart,
            color: 'bg-purple-500'
        },
        {
            title: 'Doanh thu',
            value: '125M',
            change: '+23.1%',
            icon: TrendingUp,
            color: 'bg-orange-500'
        }
    ];

    const recentOrders = [
        {
            id: '#001',
            customer: 'Nguyễn Văn A',
            product: 'Vợt cầu lông Yonex',
            amount: '1,200,000đ',
            status: 'Hoàn thành'
        },
        {
            id: '#002',
            customer: 'Trần Thị B',
            product: 'Giày cầu lông Victor',
            amount: '800,000đ',
            status: 'Đang giao'
        },
        {
            id: '#003',
            customer: 'Lê Văn C',
            product: 'Bộ cầu lông Mizuno',
            amount: '2,500,000đ',
            status: 'Chờ xử lý'
        },
        {
            id: '#004',
            customer: 'Phạm Thị D',
            product: 'Áo cầu lông Li-Ning',
            amount: '450,000đ',
            status: 'Hoàn thành'
        }
    ];

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                <div>
                    <h1 className='text-3xl font-bold text-base-content'>
                        Dashboard
                    </h1>
                    <p className='text-base-content/70 mt-1'>
                        Chào mừng quay trở lại! Đây là tổng quan về cửa hàng của
                        bạn.
                    </p>
                </div>
                <div className='flex gap-2 mt-4 lg:mt-0'>
                    <button className='btn btn-outline'>Xuất báo cáo</button>
                    <button className='btn btn-primary'>
                        Thêm sản phẩm mới
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {stats.map((stat, index) => (
                    <div key={index} className='card bg-base-100 shadow-xl'>
                        <div className='card-body'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-base-content/70 text-sm'>
                                        {stat.title}
                                    </p>
                                    <p className='text-2xl font-bold text-base-content'>
                                        {stat.value}
                                    </p>
                                    <p className='text-green-500 text-sm font-medium'>
                                        {stat.change}
                                    </p>
                                </div>
                                <div
                                    className={`p-3 rounded-full ${stat.color} text-white`}
                                >
                                    <stat.icon size={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Recent Orders */}
                <div className='lg:col-span-2'>
                    <div className='card bg-base-100 shadow-xl'>
                        <div className='card-body'>
                            <h2 className='card-title text-xl mb-4'>
                                Đơn hàng gần đây
                            </h2>
                            <div className='overflow-x-auto'>
                                <table className='table table-zebra w-full'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Khách hàng</th>
                                            <th>Sản phẩm</th>
                                            <th>Số tiền</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentOrders.map((order, index) => (
                                            <tr key={index}>
                                                <td className='font-mono'>
                                                    {order.id}
                                                </td>
                                                <td>{order.customer}</td>
                                                <td>{order.product}</td>
                                                <td className='font-semibold'>
                                                    {order.amount}
                                                </td>
                                                <td>
                                                    <span
                                                        className={`badge ${
                                                            order.status ===
                                                            'Hoàn thành'
                                                                ? 'badge-success'
                                                                : order.status ===
                                                                  'Đang giao'
                                                                ? 'badge-warning'
                                                                : 'badge-info'
                                                        }`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='card-actions justify-end mt-4'>
                                <button className='btn btn-outline btn-sm'>
                                    Xem tất cả
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className='space-y-6'>
                    <div className='card bg-base-100 shadow-xl'>
                        <div className='card-body'>
                            <h3 className='card-title text-lg'>
                                Thao tác nhanh
                            </h3>
                            <div className='space-y-3'>
                                <button className='btn btn-primary btn-block'>
                                    Thêm sản phẩm
                                </button>
                                <button className='btn btn-secondary btn-block'>
                                    Thêm danh mục
                                </button>
                                <button className='btn btn-accent btn-block'>
                                    Thêm thương hiệu
                                </button>
                                <button className='btn btn-info btn-block'>
                                    Xem báo cáo
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='card bg-base-100 shadow-xl'>
                        <div className='card-body'>
                            <h3 className='card-title text-lg'>Thông báo</h3>
                            <div className='space-y-3'>
                                <div className='alert alert-info'>
                                    <span className='text-sm'>
                                        5 đơn hàng mới cần xử lý
                                    </span>
                                </div>
                                <div className='alert alert-warning'>
                                    <span className='text-sm'>
                                        3 sản phẩm sắp hết hàng
                                    </span>
                                </div>
                                <div className='alert alert-success'>
                                    <span className='text-sm'>
                                        Doanh thu tháng này tăng 15%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
