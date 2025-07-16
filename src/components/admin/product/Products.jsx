import { useEffect, useState } from 'react';
import {
    Package,
    Search,
    Plus,
    ShoppingBasket,
    Activity,
    ShieldOff,
    Ban
} from 'lucide-react';

import Pagination from '../../common/Pagination';
import ProductCardAdmin from './ProductCardAdmin';
import AddProductModal from './AddProductModal';
import UpdateProductModal from './UpdateProductModal';
import StatCard from '../StatCard';
import { useProducts } from './useProduct';

const statusOptions = {
    ACTIVE: 'Đang hoạt động',
    INACTIVE: 'Ngừng bán',
    OUT_OF_STOCK: 'Hết hàng',
    DISCONTINUED: 'Ngừng sản xuất'
};

const Products = () => {
    const {
        products,
        categories,
        brands,
        searchInput,
        setSearchInput,
        handleSearch,
        handleFilterChange,
        currentPage,
        setCurrentPage,
        setPageSize,
        totalPages,
        totalItems,
        handleDeleteProduct,
        handleCreateProduct,
        handleUpdateProduct
    } = useProducts();

    const [showDeleteConfirmId, setShowDeleteConfirmId] = useState(null);
    const [isShowAddProductModal, setIsShowAddProductModal] = useState(false);
    const [isShowUpdateProductModal, setIsShowUpdateProductModal] =
        useState(false);
    const [productToUpdate, setProductToUpdate] = useState(null);

    const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/storage/product`;

    const handleOnPageChange = page => {
        setCurrentPage(page);
    };

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                <div>
                    <h1 className='text-3xl font-bold text-base-content'>
                        Quản lý Sản phẩm
                    </h1>
                    <p className='text-base-content/70 mt-1'>
                        Quản lý kho hàng và thông tin sản phẩm
                    </p>
                </div>
                <button
                    className='btn btn-primary mt-4 lg:mt-0'
                    onClick={() => setIsShowAddProductModal(true)}
                >
                    <Plus size={20} />
                    Thêm sản phẩm
                </button>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                <StatCard
                    icon={<ShoppingBasket size={24} />}
                    title='Tổng sản phẩm cầu lông'
                    value={totalItems}
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
                    <div className='grid grid-cols-1 lg:grid-cols-6 gap-4'>
                        <div className='form-control col-span-1 lg:col-span-2'>
                            <div className='relative'>
                                <input
                                    type='text'
                                    placeholder='Tìm kiếm sản phẩm, thương hiệu, danh mục...'
                                    className='input input-bordered w-full pl-10'
                                    value={searchInput}
                                    onChange={e =>
                                        setSearchInput(e.target.value)
                                    }
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            handleSearch();
                                        }
                                    }}
                                />
                                <Search
                                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 z-100'
                                    size={20}
                                />
                            </div>
                        </div>

                        <select
                            className='select select-bordered w-full'
                            onChange={e =>
                                handleFilterChange('categoryId', e.target.value)
                            }
                        >
                            <option value=''>Tất cả danh mục</option>
                            {categories?.map(cate => (
                                <option key={cate.id} value={cate.id}>
                                    {cate.name}
                                </option>
                            ))}
                        </select>

                        <select
                            className='select select-bordered w-full'
                            onChange={e =>
                                handleFilterChange('brandId', e.target.value)
                            }
                        >
                            <option value=''>Tất cả thương hiệu</option>
                            {brands?.map(brand => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>

                        <select
                            className='select select-bordered w-full'
                            onChange={e =>
                                handleFilterChange('status', e.target.value)
                            }
                        >
                            <option value=''>Tất cả trạng thái</option>
                            {Object.entries(statusOptions)?.map(
                                ([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                )
                            )}
                        </select>

                        <select
                            className='select select-bordered w-full'
                            onChange={e => setPageSize(Number(e.target.value))}
                        >
                            <option value='8'>8 Sản phẩm / Trang</option>
                            <option value='16'>16 Sản phẩm / Trang</option>
                            <option value='32'>32 Sản phẩm / Trang</option>
                            <option value='64'>64 Sản phẩm / Trang</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {products.map(product => (
                    <ProductCardAdmin
                        key={product.id}
                        product={product}
                        baseUrl={baseUrl}
                        onEdit={product => {
                            setProductToUpdate(product);
                            setIsShowUpdateProductModal(true);
                        }}
                        onDeleteConfirm={handleDeleteProduct}
                        showDeleteConfirmId={showDeleteConfirmId}
                        setShowDeleteConfirmId={setShowDeleteConfirmId}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className='bg-white flex item-center justify-center p-3 rounded'>
                <Pagination
                    currentPage={currentPage}
                    totalPage={totalPages}
                    onPageChange={handleOnPageChange}
                />
            </div>

            {/* Modals */}
            {isShowAddProductModal && (
                <AddProductModal
                    onClose={() => setIsShowAddProductModal(false)}
                    categories={categories}
                    brands={brands}
                    handleCreateProduct={handleCreateProduct}
                    statusOptions={statusOptions}
                />
            )}

            {isShowUpdateProductModal && productToUpdate && (
                <UpdateProductModal
                    onClose={() => {
                        setIsShowUpdateProductModal(false);
                        setProductToUpdate(null);
                    }}
                    baseUrl={baseUrl}
                    product={productToUpdate}
                    categories={categories}
                    brands={brands}
                    handleUpdateProduct={handleUpdateProduct}
                    statusOptions={statusOptions}
                />
            )}
        </div>
    );
};

export default Products;
