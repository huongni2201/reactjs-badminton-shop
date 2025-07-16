import { Plus, Trash2 } from 'lucide-react';
import { useAddProduct } from './useAddProduct';

const AddProductModal = ({
    onClose,
    categories,
    brands,
    handleCreateProduct,
    statusOptions
}) => {
    const {
        name,
        setName,
        description,
        setDescription,
        categoryId,
        setCategoryId,
        brandId,
        setBrandId,
        status,
        setStatus,
        variants,
        handleAddVariant,
        handleVariantChange,
        handleRemoveVariant,
        images,
        handleImageUpload,
        handleSubmit
    } = useAddProduct(handleCreateProduct, onClose);

    return (
        <div className='fixed inset-0 bg-black/30 z-50 flex items-center justify-center'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative max-h-[90vh] overflow-y-auto'>
                <button
                    className='absolute top-2 right-2 btn btn-sm btn-circle'
                    onClick={onClose}
                >
                    ✕
                </button>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <h2 className='text-2xl font-bold'>Thêm Sản Phẩm</h2>

                    <input
                        type='text'
                        className='input input-bordered w-full'
                        placeholder='Tên sản phẩm'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />

                    <textarea
                        className='textarea textarea-bordered w-full'
                        placeholder='Mô tả'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>

                    <div className='grid grid-cols-3 gap-3'>
                        <select
                            value={categoryId}
                            onChange={e => setCategoryId(e.target.value)}
                            className='select select-bordered'
                        >
                            <option value=''>-- Chọn danh mục --</option>
                            {categories?.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={brandId}
                            onChange={e => setBrandId(e.target.value)}
                            className='select select-bordered'
                        >
                            <option value=''>-- Chọn nhãn hàng --</option>
                            {brands?.map(brand => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>

                        <select
                            className='select select-bordered w-full'
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                        >
                            {Object.entries(statusOptions)?.map(
                                ([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div>
                        <label className='block mb-2 font-medium'>
                            Ảnh sản phẩm
                        </label>
                        <input
                            type='file'
                            className='file-input file-input-bordered w-full'
                            multiple
                            accept='image/*'
                            onChange={handleImageUpload}
                        />
                        <div className='mt-2 grid grid-cols-4 gap-2'>
                            {images.map((img, i) => (
                                <img
                                    key={i}
                                    src={URL.createObjectURL(img)}
                                    alt='preview'
                                    className='w-full h-24 object-cover rounded'
                                />
                            ))}
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <label className='block font-medium'>Phiên bản</label>
                        {variants.map((variant, idx) => (
                            <div
                                key={idx}
                                className='grid grid-cols-5 gap-2 items-center'
                            >
                                <input
                                    type='text'
                                    className='input input-sm input-bordered'
                                    placeholder='Màu'
                                    value={variant.color}
                                    onChange={e =>
                                        handleVariantChange(
                                            idx,
                                            'color',
                                            e.target.value
                                        )
                                    }
                                />
                                <input
                                    type='text'
                                    className='input input-sm input-bordered'
                                    placeholder='Size'
                                    value={variant.size}
                                    onChange={e =>
                                        handleVariantChange(
                                            idx,
                                            'size',
                                            e.target.value
                                        )
                                    }
                                />
                                <input
                                    type='number'
                                    className='input input-sm input-bordered'
                                    placeholder='Giá'
                                    value={variant.price}
                                    onChange={e =>
                                        handleVariantChange(
                                            idx,
                                            'price',
                                            e.target.value
                                        )
                                    }
                                />
                                <input
                                    type='number'
                                    className='input input-sm input-bordered'
                                    placeholder='Tồn kho'
                                    value={variant.stockQuantity}
                                    onChange={e =>
                                        handleVariantChange(
                                            idx,
                                            'stockQuantity',
                                            e.target.value
                                        )
                                    }
                                />
                                <button
                                    type='button'
                                    className='btn btn-sm btn-error'
                                    onClick={() => handleRemoveVariant(idx)}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}

                        <button
                            type='button'
                            className='btn btn-outline btn-sm mt-2'
                            onClick={handleAddVariant}
                        >
                            <Plus size={16} className='mr-1' /> Thêm phiên bản
                        </button>
                    </div>

                    <button type='submit' className='btn btn-primary w-full'>
                        Lưu sản phẩm
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;
