import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

const Brands = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const brands = [
        {
            id: 1,
            name: 'Yonex',
            description: 'Thương hiệu cầu lông hàng đầu từ Nhật Bản',
            productCount: 145,
            status: 'Hoạt động',
            country: 'Nhật Bản',
            website: 'yonex.com',
            createdDate: '2024-01-10'
        },
        {
            id: 2,
            name: 'Victor',
            description: 'Thương hiệu cầu lông nổi tiếng từ Đài Loan',
            productCount: 98,
            status: 'Hoạt động',
            country: 'Đài Loan',
            website: 'victor-badminton.com',
            createdDate: '2024-01-15'
        },
        {
            id: 3,
            name: 'Li-Ning',
            description: 'Thương hiệu thể thao từ Trung Quốc',
            productCount: 76,
            status: 'Hoạt động',
            country: 'Trung Quốc',
            website: 'li-ning.com',
            createdDate: '2024-02-01'
        },
        {
            id: 4,
            name: 'Mizuno',
            description: 'Thương hiệu thể thao đa dạng từ Nhật Bản',
            productCount: 34,
            status: 'Hoạt động',
            country: 'Nhật Bản',
            website: 'mizuno.com',
            createdDate: '2024-02-10'
        },
        {
            id: 5,
            name: 'Kawasaki',
            description: 'Thương hiệu cầu lông chất lượng',
            productCount: 23,
            status: 'Tạm dừng',
            country: 'Trung Quốc',
            website: 'kawasaki-sports.com',
            createdDate: '2024-03-05'
        }
    ];

    const filteredBrands = brands.filter(
        brand =>
            brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            brand.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                <div>
                    <h1 className='text-3xl font-bold text-base-content'>
                        Quản lý Thương hiệu
                    </h1>
                    <p className='text-base-content/70 mt-1'>
                        Quản lý các thương hiệu sản phẩm cầu lông
                    </p>
                </div>
                <button className='btn btn-primary mt-4 lg:mt-0'>
                    <Plus size={20} />
                    Thêm thương hiệu
                </button>
            </div>

            {/* Stats */}
            <div className='stats shadow w-full'>
                <div className='stat'>
                    <div className='stat-figure text-primary'>
                        {/* <Brand size={32} /> */}
                    </div>
                    <div className='stat-title'>Tổng thương hiệu</div>
                    <div className='stat-value text-primary'>18</div>
                    <div className='stat-desc'>↗︎ 2 thương hiệu mới</div>
                </div>

                <div className='stat'>
                    <div className='stat-title'>Đang hoạt động</div>
                    <div className='stat-value text-success'>15</div>
                    <div className='stat-desc'>83% tổng số</div>
                </div>

                <div className='stat'>
                    <div className='stat-title'>Tạm dừng</div>
                    <div className='stat-value text-warning'>3</div>
                    <div className='stat-desc'>17% tổng số</div>
                </div>
            </div>

            {/* Search */}
            <div className='card bg-base-100 shadow-xl'>
                <div className='card-body'>
                    <div className='form-control'>
                        <div className='relative'>
                            <input
                                type='text'
                                placeholder='Tìm kiếm thương hiệu...'
                                className='input input-bordered w-full pl-10'
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                            <Search
                                className='absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50'
                                size={20}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Brands Table */}
            <div className='card bg-base-100 shadow-xl'>
                <div className='card-body'>
                    <div className='overflow-x-auto'>
                        <table className='table table-zebra w-full'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên thương hiệu</th>
                                    <th>Mô tả</th>
                                    <th>Xuất xứ</th>
                                    <th>Sản phẩm</th>
                                    <th>Website</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBrands.map(brand => (
                                    <tr key={brand.id}>
                                        <td className='font-mono'>
                                            {brand.id}
                                        </td>
                                        <td>
                                            <div className='flex items-center gap-3'>
                                                <div className='avatar placeholder'>
                                                    <div className='bg-primary text-primary-content rounded w-10'>
                                                        <span className='text-sm font-bold'>
                                                            {brand.name.charAt(
                                                                0
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className='font-bold text-lg'>
                                                    {brand.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='max-w-xs'>
                                                <p
                                                    className='truncate'
                                                    title={brand.description}
                                                >
                                                    {brand.description}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <span className='badge badge-outline'>
                                                {brand.country}
                                            </span>
                                        </td>
                                        <td>
                                            <span className='font-semibold text-primary'>
                                                {brand.productCount}
                                            </span>
                                        </td>
                                        <td>
                                            <a
                                                href={`https://${brand.website}`}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='link link-primary text-sm'
                                            >
                                                {brand.website}
                                            </a>
                                        </td>
                                        <td>
                                            <span
                                                className={`badge ${
                                                    brand.status === 'Hoạt động'
                                                        ? 'badge-success'
                                                        : 'badge-warning'
                                                }`}
                                            >
                                                {brand.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className='flex gap-2'>
                                                <button className='btn btn-ghost btn-xs text-blue-600'>
                                                    <Edit size={14} />
                                                </button>
                                                <button className='btn btn-ghost btn-xs text-red-600'>
                                                    <Trash2 size={14} />
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
                            <button className='join-item btn'>»</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Brands;
