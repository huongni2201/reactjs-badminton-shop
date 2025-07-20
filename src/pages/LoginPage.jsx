import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogInIcon, Mail, Lock } from 'lucide-react';
import TextInput from '../components/common/TextInput';
import GradientButton from '../components/common/GradientButton';
import Cookies from 'js-cookie';
import { postLogin } from '../services/authService';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const { setUserInfo } = useUser();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
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

        if (!formData.username) {
            newErrors.username = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
            newErrors.username = 'Email không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Mật khẩu là bắt buộc';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        if (validateForm()) {
            const res = await postLogin(formData);
            setIsLoading(false);

            const user = res?.data?.data?.user;

            const userInfo = {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                avatar: user.avatar || null
            };

            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            setUserInfo(userInfo);
            toast.success(res?.data?.message);

            if (userInfo.role === 'ADMIN') {
                navigate('/dashboard');
            } else if (userInfo.role === 'STAFF') {
                navigate('/admin/products');
            } else {
                navigate('/');
            }
        }
    };

    return (
        <div className='bg-gradient-to-br from-red-50 via-orange-50 to-red-50 flex items-center justify-center py-20 px-4'>
            <div className='max-w-md w-full'>
                <div className='bg-white rounded-2xl shadow-xl p-8'>
                    {/* Header */}
                    <div className='text-center mb-8'>
                        <div className='w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4'>
                            <LogInIcon size={32} className='text-white' />
                        </div>
                        <h2 className='text-3xl font-bold'>Đăng Nhập</h2>
                        <p className='text-gray-600 mt-2'>
                            Chào mừng bạn trở lại BadmintonShop
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <TextInput
                            label='Email'
                            name='username'
                            type='email'
                            value={formData.username}
                            onChange={handleInputChange}
                            icon={Mail}
                            placeholder='Nhập email'
                            error={errors.username}
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

                        <div className='flex items-center justify-between'>
                            <label className='flex items-center'>
                                <input
                                    type='checkbox'
                                    className='rounded border-gray-300 text-red-600 focus:ring-red-500'
                                />
                                <span className='ml-2 text-sm text-gray-600'>
                                    Ghi nhớ đăng nhập
                                </span>
                            </label>
                            <Link
                                to='#'
                                className='text-sm text-red-600 hover:text-red-700 font-medium'
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <GradientButton type='submit'>
                            {isLoading ? 'Đang xử lý...' : 'Đăng Nhập'}
                        </GradientButton>
                    </form>

                    {/* Footer */}
                    <div className='mt-8 text-center'>
                        <p className='text-gray-600'>
                            Chưa có tài khoản?{' '}
                            <Link
                                to='/register'
                                className='text-red-600 hover:text-red-700 font-medium'
                            >
                                Đăng ký ngay
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
