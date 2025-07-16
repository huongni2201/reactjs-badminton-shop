import { useState } from 'react';
import {
    isVietnamesePhoneNumber,
    validateEmailUtils
} from '../../../utils/myUtils';
import { toast } from 'react-toastify';

const AddUserModal = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        dob: '',
        gender: 'MALE',
        role: 'USER',
        address: '',
        avatar: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = e => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            avatar: file
        }));
    };

    const handleSubmitCreateUser = () => {
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

    return (
        <div className='fixed inset-0 bg-black/30 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-lg shadow-xl w-[450px] animate-fade-in'>
                <h2 className='text-lg font-bold mb-4'>Thêm người dùng</h2>

                <div className='space-y-3'>
                    <input
                        className='input input-bordered w-full'
                        placeholder='Họ tên'
                        name='fullName'
                        value={formData.fullName}
                        onChange={handleChange}
                    />

                    <input
                        className='input input-bordered w-full'
                        placeholder='Email'
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        className='input input-bordered w-full'
                        placeholder='Password'
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />

                    {/* Nhóm thông tin ngắn gọn: SĐT + Ngày sinh */}
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

                    {/* Giới tính + Vai trò */}
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

                    <input
                        className='input input-bordered w-full'
                        type='file'
                        name='avatar'
                        accept='image/*'
                        onChange={handleFileChange}
                    />

                    {formData.avatar && (
                        <p className='text-sm text-gray-500 mt-1'>
                            Ảnh đã chọn: {formData.avatar.name}
                        </p>
                    )}
                </div>

                <div className='flex justify-end gap-2 mt-6'>
                    <button className='btn btn-outline' onClick={onClose}>
                        Huỷ
                    </button>
                    <button
                        className='btn btn-primary'
                        onClick={handleSubmitCreateUser}
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddUserModal;
