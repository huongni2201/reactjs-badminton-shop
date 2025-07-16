import { useEffect, useRef, useState } from 'react';
import { FilePlus2, Plus, Trash2, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { postUploadMultipleProductFile } from '../../../services/apiFileService';

const initialVariant = { color: '', size: '', price: '', stockQuantity: '' };

const UpdateProductModal = ({
    onClose,
    baseUrl,
    categories,
    brands,
    product,
    handleUpdateProduct,
    statusOptions
}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [brandId, setBrandId] = useState('');
    const [status, setStatus] = useState('ACTIVE');
    const [variants, setVariants] = useState([initialVariant]);
    const [images, setImages] = useState([]); // new files
    const [previewImages, setPreviewImages] = useState([]); // already uploaded URLs

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (product) {
            setName(product.name || '');
            setDescription(product.description || '');
            setCategoryId(product.categoryId || '');
            setBrandId(product.brandId || '');
            setStatus(product.status || 'ACTIVE');

            const simplifiedVariants = product.variants.map(variant => {
                const color =
                    variant.attributeValues.find(attr => attr.name === 'color')
                        ?.value || '';
                const size =
                    variant.attributeValues.find(attr => attr.name === 'size')
                        ?.value || '';
                return {
                    color,
                    size,
                    price: variant.price,
                    stockQuantity: variant.stockQuantity
                };
            });
            setVariants(simplifiedVariants);

            setPreviewImages(product.images || []);
        }
    }, [product]);

    const handleAddVariant = () => {
        setVariants([...variants, initialVariant]);
    };

    const handleVariantChange = (index, field, value) => {
        setVariants(prev =>
            prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
        );
    };

    const handleRemoveVariant = index => {
        setVariants(prev => prev.filter((_, i) => i !== index));
    };

    const handleImageUpload = e => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);
        e.target.value = '';
    };

    const handleRemovePreviewImage = fileNameRemove => {
        setPreviewImages(prev => prev.filter(img => img !== fileNameRemove));
    };

    const handleRemoveNewImage = index => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        let uploadedImageUrls = [...previewImages];

        try {
            if (images.length > 0) {
                const formData = new FormData();
                images.forEach(img => {
                    formData.append('files', img);
                });
                formData.append('folder', 'product');
                const res = await postUploadMultipleProductFile(formData);
                const newImageUrls = res.data.map(item => item.fileName);
                uploadedImageUrls = [...previewImages, ...newImageUrls];
            }

            const payload = {
                id: product.id,
                name,
                description,
                categoryId,
                brandId,
                status,
                images: uploadedImageUrls,
                variants
            };

            handleUpdateProduct(payload);
        } catch (err) {
            console.error('Lỗi khi cập nhật sản phẩm:', err);
            toast.error('Đã xảy ra lỗi khi cập nhật sản phẩm');
        }
    };

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
                    <h2 className='text-2xl font-bold'>Cập nhật Sản Phẩm</h2>

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
                    />

                    <div className='grid grid-cols-3 gap-3'>
                        <select
                            value={categoryId}
                            onChange={e => setCategoryId(e.target.value)}
                            className='select select-bordered'
                        >
                            <option value=''>-- Chọn danh mục --</option>
                            {categories?.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={brandId}
                            onChange={e => setBrandId(e.target.value)}
                            className='select select-bordered'
                        >
                            <option value=''>-- Chọn nhãn hàng --</option>
                            {brands?.map(b => (
                                <option key={b.id} value={b.id}>
                                    {b.name}
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
                        {/* Input file ẩn đi */}
                        <input
                            ref={fileInputRef}
                            type='file'
                            className='hidden'
                            multiple
                            accept='image/*'
                            id='file-upload'
                            onChange={handleImageUpload}
                        />

                        {/* Nút giả để kích hoạt input */}
                        <label
                            htmlFor='file-upload'
                            className='btn btn-outline bg-gray-100 btn-sm cursor-pointer'
                        >
                            <FilePlus2 size={16} />{' '}
                            <span className='text-sm tex-gray-300'>
                                Chọn ảnh sản phẩm
                            </span>
                        </label>

                        {/* Hiển thị số lượng ảnh đã chọn */}
                        <p className='text-sm text-gray-500 mt-1'>
                            Đã chọn {images.length} ảnh mới,
                            {` `}
                            {previewImages.length} ảnh đã có
                        </p>
                        <div className='mt-2 grid grid-cols-4 gap-2'>
                            {previewImages.map((url, i) => (
                                <div key={i} className='relative'>
                                    <img
                                        src={`${baseUrl}/${url}`}
                                        alt='preview'
                                        className='w-full h-24 object-cover rounded'
                                    />
                                    <button
                                        type='button'
                                        className='absolute top-1 right-1 bg-red-500 text-white rounded-full cursor-pointer'
                                        onClick={() =>
                                            handleRemovePreviewImage(url)
                                        }
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            ))}
                            {images.map((img, i) => (
                                <div key={i} className='relative'>
                                    <img
                                        key={`new-${i}`}
                                        src={URL.createObjectURL(img)}
                                        alt='preview'
                                        className='w-full h-24 object-cover rounded'
                                    />
                                    <button
                                        type='button'
                                        className='absolute top-1 right-1 bg-red-500 text-white rounded-full cursor-pointer'
                                        onClick={() => handleRemoveNewImage(i)}
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
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
                                    required
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
                                    required
                                />
                                <input
                                    type='number'
                                    className='input input-sm input-bordered'
                                    placeholder='Giá'
                                    value={variant.price ?? ''}
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
                                    value={variant.stockQuantity ?? ''}
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
                        Cập nhật sản phẩm
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProductModal;
