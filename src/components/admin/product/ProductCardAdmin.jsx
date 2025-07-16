import { Eye, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import { formatDate, formatPriceVND } from '../../../utils/myUtils';

const ProductCardAdmin = ({
    product,
    baseUrl,
    onEdit,
    onDeleteConfirm,
    showDeleteConfirmId,
    setShowDeleteConfirmId
}) => {
    const getPriceDisplay = () => {
        const prices = product.variants.map(v => v.price);

        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        if (minPrice === maxPrice) return `${formatPriceVND(minPrice)}`;

        return `${formatPriceVND(minPrice)} - ${formatPriceVND(maxPrice)}`;
    };

    return (
        <div className='card bg-base-100 shadow-xl'>
            <figure className='px-6 pt-6'>
                <img
                    src={`${baseUrl}/${product.images[0]}`}
                    alt={product.name}
                    className='rounded-xl h-60 object-cover'
                />
            </figure>
            <div className='card-body'>
                <h2 className='card-title h-[54px]'>
                    <div className='line-clamp-2'>{product.name}</div>
                </h2>

                <div className='space-y-2'>
                    <p className='text-sm text-base-content/70'>
                        <span className='font-medium'>Danh mục:</span>{' '}
                        {product.categoryName}
                    </p>
                    <p className='text-sm text-base-content/70'>
                        <span className='font-medium'>Thương hiệu:</span>{' '}
                        {product.brandName}
                    </p>
                    <p className='text-lg font-bold text-primary'>
                        {getPriceDisplay()}
                    </p>
                    <div className='flex items-center justify-between'>
                        <span className='text-sm'>
                            <span className='font-medium'>Kho:</span>{' '}
                            {product.stockQuantity}
                        </span>
                        {product.variants.length > 1 && (
                            <span className='badge badge-info badge-sm'>
                                {product.variants.length} phiên bản
                            </span>
                        )}
                    </div>
                    <div className='flex items-center justify-between'>
                        <span
                            className={`badge ${
                                product.status === 'ACTIVE'
                                    ? 'badge-success'
                                    : product.status === 'INACTIVE'
                                    ? 'badge-warning'
                                    : product.status === 'OUT_OF_STOCK'
                                    ? 'badge-error'
                                    : product.status === 'DISCONTINUED'
                                    ? 'badge-neutral'
                                    : ''
                            }`}
                        >
                            {product.status}
                        </span>
                        {product.totalStockQuantity === 0 && (
                            <span className='badge badge-error badge-sm'>
                                Hết hàng
                            </span>
                        )}
                    </div>
                    <p className='text-xs text-base-content/50'>
                        Cập nhật: {formatDate(product.updatedAt)}
                    </p>
                </div>
                <div className='card-actions justify-end mt-4'>
                    <button className='btn btn-ghost btn-sm'>
                        <Eye size={16} /> Xem
                    </button>
                    <button
                        className='btn btn-ghost btn-sm text-blue-600'
                        onClick={() => onEdit(product)}
                    >
                        <Edit size={16} /> Sửa
                    </button>
                    <button
                        className='btn btn-ghost btn-sm text-red-600'
                        onClick={() =>
                            setShowDeleteConfirmId(prev =>
                                prev === product.id ? null : product.id
                            )
                        }
                    >
                        <Trash2 size={16} /> Xoá
                    </button>

                    {showDeleteConfirmId === product.id && (
                        <div className='absolute bottom-[60px] right-[20px] mt-2 z-10 transition'>
                            <ConfirmDeleteModal
                                onConfirm={() => {
                                    onDeleteConfirm(product.id);
                                    setShowDeleteConfirmId(null);
                                }}
                                onCancel={() => setShowDeleteConfirmId(null)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCardAdmin;
