import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import {
    isVietnamesePhoneNumber,
    validateEmailUtils
} from '../../../utils/myUtils';
import { Upload, X } from 'lucide-react';

const UpdateUserModal = ({ onClose, baseUrl, onSuccess, userInfo }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        dob: '',
        gender: 'MALE',
        role: 'USER',
        address: '',
        avatar: ''
    });

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (userInfo) {
            setFormData({
                ...userInfo,
                role: userInfo?.role?.role || userInfo.role || 'USER',
                avatar: userInfo?.avatar || ''
            });
        }
    }, [userInfo]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = e => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                avatar: file
            }));
        }
    };

    const handleSubmitUpdateUser = () => {
        if (!validateEmailUtils(formData.email)) {
            toast.error('Email invalid!');
            return;
        }
        if (!isVietnamesePhoneNumber(formData.phone)) {
            toast.error('Phone number invalid!');
            return;
        }
        onSuccess(formData);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const renderAvatarPreview = () => {
        if (!formData.avatar) return null;
        const src =
            typeof formData.avatar === 'string'
                ? `${baseUrl}/${formData.avatar}`
                : URL.createObjectURL(formData.avatar);

        return (
            <img
                src={src}
                alt='Avatar'
                className='w-16 h-16 mt-2 rounded-full object-cover border'
            />
        );
    };

    return (
        <div className='fixed inset-0 bg-black/30 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-lg shadow-xl w-[450px] animate-fade-in animate-fade-out'>
                <div className='flex justify-between'>
                    <h2 className='text-lg font-bold mb-4'>
                        Cập nhật người dùng
                    </h2>

                    <X
                        className='text-red-400 cursor-pointer'
                        onClick={onClose}
                    />
                </div>

                <div className='space-y-3'>
                    <input
                        className='input input-bordered w-full'
                        placeholder='Họ tên'
                        name='fullName'
                        value={formData.fullName}
                        onChange={handleChange}
                    />

                    <div className='flex gap-3'>
                        <input
                            className='input input-bordered flex-1'
                            placeholder='SĐT'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <input
                            className='input input-bordered flex-1'
                            type='date'
                            name='dob'
                            value={formData.dob}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex gap-3'>
                        <select
                            className='select select-bordered flex-1'
                            name='gender'
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value='MALE'>Nam</option>
                            <option value='FEMALE'>Nữ</option>
                        </select>
                        <select
                            className='select select-bordered flex-1 uppercase'
                            name='role'
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value='USER'>USER</option>
                            <option value='ADMIN'>ADMIN</option>
                            <option value='STAFF'>STAFF</option>
                        </select>
                    </div>

                    <input
                        className='input input-bordered w-full'
                        placeholder='Địa chỉ'
                        name='address'
                        value={formData.address}
                        onChange={handleChange}
                    />

                    {/* Upload avatar button */}
                    <div className='space-y-2'>
                        <button
                            type='button'
                            onClick={handleUploadClick}
                            className='btn btn-outline flex items-center gap-2'
                        >
                            <Upload size={16} />
                            Upload Ảnh đại diện
                        </button>
                        <input
                            type='file'
                            name='avatar'
                            ref={fileInputRef}
                            className='hidden'
                            accept='image/*'
                            onChange={handleFileChange}
                        />
                        {renderAvatarPreview()}
                    </div>
                </div>

                <div className='flex justify-end gap-2 mt-6'>
                    <button className='btn btn-outline' onClick={onClose}>
                        Huỷ
                    </button>
                    <button
                        className='btn btn-primary'
                        onClick={handleSubmitUpdateUser}
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserModal;
