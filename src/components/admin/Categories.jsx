import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

const Categories = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        {
            id: 1,
            name: 'Vợt cầu lông',
            description: 'Các loại vợt cầu lông chuyên nghiệp và nghiệp dư',
            productCount: 234,
            status: 'Hoạt động',
            createdDate: '2024-01-15'
        },
        {
            id: 2,
            name: 'Giày cầu lông',
            description: 'Giày chuyên dụng cho môn cầu lông',
            productCount: 156,
            status: 'Hoạt động',
            createdDate: '2024-01-20'
        },
        {
            id: 3,
            name: 'Quần áo thể thao',
            description: 'Trang phục chuyên dụng cho cầu lông',
            productCount: 89,
            status: 'Hoạt động',
            createdDate: '2024-02-10'
        },
        {
            id: 4,
            name: 'Phụ kiện',
            description: 'Túi, balo, dây vợt và các phụ kiện khác',
            productCount: 67,
            status: 'Hoạt động',
            createdDate: '2024-02-15'
        },
        {
            id: 5,
            name: 'Cầu lông',
            description: 'Cầu lông nhựa và lông ngỗng',
            productCount: 45,
            status: 'Tạm dừng',
            createdDate: '2024-03-01'
        }
    ];

    const filteredCategories = categories.filter(
        category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                <div>
                    <h1 className='text-3xl font-bold text-base-content'>
                        Quản lý Danh mục
                    </h1>
                    <p className='text-base-content/70 mt-1'>
                        Tổ chức và phân loại sản phẩm theo danh mục
                    </p>
                </div>
                <button className='btn btn-primary mt-4 lg:mt-0'>
                    <Plus size={20} />
                    Thêm danh mục
                </button>
            </div>

            {/* Stats */}
            <div className='stats shadow w-full'>
                <div className='stat'>
                    <div className='stat-figure text-primary'>
                        {/* <Category size={32} /> */}
                    </div>
                    <div className='stat-title'>Tổng danh mục</div>
                    <div className='stat-value text-primary'>24</div>
                    <div className='stat-desc'>↗︎ 3 danh mục mới</div>
                </div>

                <div className='stat'>
                    <div className='stat-title'>Đang hoạt động</div>
                    <div className='stat-value text-success'>21</div>
                    <div className='stat-desc'>87% tổng số</div>
                </div>

                <div className='stat'>
                    <div className='stat-title'>Tạm dừng</div>
                    <div className='stat-value text-warning'>3</div>
                    <div className='stat-desc'>13% tổng số</div>
                </div>
            </div>

            {/* Search */}
            <div className='card bg-base-100 shadow-xl'>
                <div className='card-body'>
                    <div className='form-control'>
                        <div className='relative'>
                            <input
                                type='text'
                                placeholder='Tìm kiếm danh mục...'
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

            {/* Categories Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filteredCategories.map(category => (
                    <div
                        key={category.id}
                        className='card bg-base-100 shadow-xl'
                    >
                        <div className='card-body'>
                            <div className='flex items-center justify-between mb-4'>
                                <h2 className='card-title text-xl'>
                                    {category.name}
                                </h2>
                                <span
                                    className={`badge ${
                                        category.status === 'Hoạt động'
                                            ? 'badge-success'
                                            : 'badge-warning'
                                    }`}
                                >
                                    {category.status}
                                </span>
                            </div>

                            <p className='text-base-content/70 mb-4'>
                                {category.description}
                            </p>

                            <div className='stats shadow mb-4'>
                                <div className='stat px-4 py-2'>
                                    <div className='stat-title text-xs'>
                                        Sản phẩm
                                    </div>
                                    <div className='stat-value text-2xl text-primary'>
                                        {category.productCount}
                                    </div>
                                </div>
                            </div>

                            <div className='text-sm text-base-content/70 mb-4'>
                                <span className='font-medium'>Ngày tạo:</span>{' '}
                                {category.createdDate}
                            </div>

                            <div className='card-actions justify-end'>
                                <button className='btn btn-ghost btn-sm text-blue-600'>
                                    <Edit size={16} />
                                    Sửa
                                </button>
                                <button className='btn btn-ghost btn-sm text-red-600'>
                                    <Trash2 size={16} />
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredCategories.length === 0 && (
                <div className='card bg-base-100 shadow-xl'>
                    <div className='card-body text-center py-12'>
                        <Category
                            size={64}
                            className='mx-auto text-base-content/30 mb-4'
                        />
                        <h3 className='text-xl font-semibold mb-2'>
                            Không tìm thấy danh mục
                        </h3>
                        <p className='text-base-content/70'>
                            Thử tìm kiếm với từ khóa khác hoặc thêm danh mục mới
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;
