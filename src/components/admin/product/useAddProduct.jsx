import { useState } from 'react';
import { toast } from 'react-toastify';
import { postUploadMultipleProductFile } from '../../../services/apiFileService';

const initialVariant = { color: '', size: '', price: '', stockQuantity: '' };

export const useAddProduct = (onCreateProduct, onClose) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [brandId, setBrandId] = useState('');
    const [status, setStatus] = useState('ACTIVE');
    const [variants, setVariants] = useState([initialVariant]);
    const [images, setImages] = useState([]);

    const handleAddVariant = () => {
        setVariants([...variants, initialVariant]);
    };

    const handleVariantChange = (index, field, value) => {
        setVariants(prev =>
            prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
        );
    };

    const handleRemoveVariant = index => {
        const updated = variants.filter((_, i) => i !== index);
        setVariants(updated);
    };

    const handleImageUpload = e => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();
        images?.forEach(img => formData.append('files', img));

        let uploadedImageUrls = [];

        try {
            if (images.length > 0) {
                const res = await postUploadMultipleProductFile(formData);
                uploadedImageUrls = res.data.map(item => item.fileName);
            }

            const payload = {
                name,
                description,
                categoryId,
                brandId,
                status,
                images: uploadedImageUrls,
                variants
            };

            onCreateProduct(payload);
            onClose();
        } catch (err) {
            console.error('Lỗi khi tạo sản phẩm:', err);
            toast.error('Đã xảy ra lỗi khi thêm sản phẩm');
        }
    };

    return {
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
    };
};
