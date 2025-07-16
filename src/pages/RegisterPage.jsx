import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, Phone, User } from 'lucide-react';
import TextInput from '../components/common/TextInput';
import GradientButton from '../components/common/GradientButton';
import { postRegister } from '../services/authService';
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });

    const [errors, setErrors] = useState({});
    const [errorMsg, setErrorMsg] = useState();
    const navigate = useNavigate();

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName) {
            newErrors.fullName = 'Họ và tên là bắt buộc';
        }

        if (!formData.email) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Mật khẩu là bắt buộc';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu ít nhất 6 ký tự';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Mật khẩu không khớp';
        }

        if (!formData.phone) {
            newErrors.phone = 'Số điện thoại là bắt buộc';
        } else if (!/^\d{9,11}$/.test(formData.phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (validateForm()) {
            postRegister(formData)
                .then(data => {
                    if (data?.statusCode >= 200 && data?.statusCode < 300) {
                        toast.success('Đăng ký tài khoản thành công!');
                        navigate('/login');
                    }
                })
                .catch(err => {
                    setErrorMsg(
                        err?.response?.data?.error || 'Đăng ký thất bại'
                    );
                });
        }
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-50 flex items-center justify-center py-12 px-4'>
            <div className='max-w-xl w-full'>
                <div className='bg-white rounded-2xl shadow-xl p-10'>
                    {/* Header */}
                    <div className='flex justify-center items-center gap-4 mb-3'>
                        <div className='w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center'>
                            <UserPlus size={28} className='text-white' />
                        </div>
                        <h2 className='text-4xl font-bold'>Đăng Ký</h2>
                    </div>

                    <p className='text-gray-600 mt-2 mb-4 text-center'>
                        Tạo tài khoản để bắt đầu trải nghiệm cùng BadmintonShop
                    </p>

                    {errorMsg && (
                        <p className='text-red-500 mt-2 mb-4 text-center'>
                            {errorMsg}
                        </p>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <TextInput
                            label='Họ và tên'
                            name='fullName'
                            type='text'
                            value={formData.fullName}
                            onChange={handleInputChange}
                            icon={User}
                            placeholder='Nhập họ tên đầy đủ'
                            error={errors.fullName}
                        />

                        <TextInput
                            label='Email'
                            name='email'
                            type='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            icon={Mail}
                            placeholder='Nhập email'
                            error={errors.email}
                        />

                        <TextInput
                            label='Số điện thoại'
                            name='phone'
                            type='tel'
                            value={formData.phone}
                            onChange={handleInputChange}
                            icon={Phone}
                            placeholder='Nhập số điện thoại'
                            error={errors.phone}
                        />

                        <TextInput
                            label='Mật khẩu'
                            name='password'
                            type='password'
                            value={formData.password}
                            onChange={handleInputChange}
                            icon={Lock}
                            placeholder='Nhập mật khẩu'
                            error={errors.password}
                            showToggle
                        />

                        <TextInput
                            label='Xác nhận mật khẩu'
                            name='confirmPassword'
                            type='password'
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            icon={Lock}
                            placeholder='Nhập lại mật khẩu'
                            error={errors.confirmPassword}
                            showToggle
                        />

                        <GradientButton type='submit'>Đăng Ký</GradientButton>
                    </form>

                    {/* Footer */}
                    <div className='mt-8 text-center'>
                        <p className='text-gray-600'>
                            Đã có tài khoản?{' '}
                            <Link
                                to='/login'
                                className='text-red-600 hover:text-red-700 font-medium'
                            >
                                Đăng nhập ngay
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
