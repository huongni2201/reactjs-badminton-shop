import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Edit,
    Save,
    X,
    ShoppingBag,
    Trophy,
    TrendingUp,
    FilePlus2
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
    formatDate,
    formatLocalDate,
    formatPriceVND
} from '../../../utils/myUtils';
import { getUserInfo, putUser } from '../../../services/apiUserService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { AVATAR_IMAGE_URL } from '../../../utils/constants';
import { postUploadAvatarFile } from '../../../services/apiFileService';

const UserInfo = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [editForm, setEditForm] = useState(userInfo);
    const [newAvatar, setNewAvatar] = useState(null);
    const fileInputRef = useRef(null);

    const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/storage/avatar`;

    const rankLevels = [
        {
            name: 'Thành viên',
            maxTotal: 500000,
            gradient: 'from-gray-400 to-gray-600'
        },
        {
            name: 'Thành viên bạc',
            maxTotal: 2000000,
            gradient: 'from-slate-400 to-slate-600'
        },
        {
            name: 'Thành viên vàng',
            maxTotal: 5000000,
            gradient: 'from-yellow-500 to-yellow-700'
        },
        {
            name: 'Thành viên kim cương',
            maxTotal: Infinity,
            gradient: 'from-blue-400 to-blue-700'
        }
    ];

    // Hàm lấy rank từ total
    const getUserRank = total => {
        return rankLevels.find(r => total <= r.maxTotal);
    };

    const { name, gradient } = getUserRank(userInfo?.totalPrice || 0) || {};

    const fetchUserInfo = async () => {
        getUserInfo().then(data => {
            setUserInfo(data?.data);
        });
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
        setEditForm(userInfo);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditForm(userInfo);
    };

    const handleImageUpload = e => {
        const file = e.target.files?.[0];
        if (file) {
            setNewAvatar(file);
        }
    };

    const handleSave = async () => {
        try {
            let avatarFileName = userInfo.avatar;

            if (newAvatar) {
                const fileName = await postUploadAvatarFile(newAvatar);
                avatarFileName = fileName?.data.fileName;
            }

            const updatedUser = {
                ...editForm,
                avatar: avatarFileName
            };

            const res = await putUser(updatedUser, userInfo.id);

            if (res?.statusCode >= 200 && res?.statusCode < 300) {
                toast.success('Cập nhật thông tin thành công!');
                setUserInfo(updatedUser);
                setIsEditing(false);
            } else {
                toast.error('Cập nhật thông tin thất bại!');
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi cập nhật thông tin!');
        }
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className='max-w-7xl mx-auto px-4 py-8'>
            {/* Header */}
            <div className='flex items-center justify-between mb-8'>
                <div className='flex items-center gap-3'>
                    <div className='p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl'>
                        <User size={24} className='text-white' />
                    </div>
                    <h1 className='text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
                        Thông tin cá nhân
                    </h1>
                </div>

                {!isEditing ? (
                    <button
                        onClick={handleEdit}
                        className='flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all duration-300'
                    >
                        <Edit size={16} />
                        <span>Chỉnh sửa</span>
                    </button>
                ) : (
                    <div className='flex gap-2'>
                        <button
                            onClick={handleSave}
                            className='flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-300'
                        >
                            <Save size={16} />
                            <span>Lưu</span>
                        </button>
                        <button
                            onClick={handleCancel}
                            className='flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:shadow-lg transition-all duration-300'
                        >
                            <X size={16} />
                            <span>Hủy</span>
                        </button>
                    </div>
                )}
            </div>

            <div className='grid lg:grid-cols-3 gap-8'>
                {/* Left Column - Avatar & User Info */}
                <div className='lg:col-span-2 space-y-6'>
                    {/* Avatar & Basic Info */}
                    <div className='group relative border-gray-200/60 hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300'>
                        <div className='absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>

                        <div>
                            <div className='flex items-center gap-6 p-4'>
                                {isEditing ? (
                                    <div className='relative w-32 h-32'>
                                        {/* Ảnh đại diện */}
                                        <img
                                            src={
                                                newAvatar
                                                    ? URL.createObjectURL(
                                                          newAvatar
                                                      )
                                                    : `${AVATAR_IMAGE_URL}/${userInfo.avatar}`
                                            }
                                            alt='avatar'
                                            className='border-1 border-gray-300 rounded-full'
                                        />

                                        {/* Nút chỉnh sửa hiển thị khi hover */}
                                        <div className='absolute inset-0 bg-black/30 rounded-full opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center group'>
                                            <label
                                                htmlFor='file-upload'
                                                className='cursor-pointer bg-white p-2 rounded-full shadow-md hover:shadow-lg transition'
                                                title='Thay ảnh đại diện'
                                            >
                                                <Edit
                                                    className='text-gray-700'
                                                    size={18}
                                                />
                                            </label>
                                        </div>

                                        {/* Input file ẩn */}
                                        <input
                                            ref={fileInputRef}
                                            type='file'
                                            className='hidden'
                                            accept='image/*'
                                            id='file-upload'
                                            onChange={handleImageUpload}
                                        />
                                    </div>
                                ) : (
                                    <div className='w-32 h-32 border-1 border-gray-300 to-orange-500 rounded-full'>
                                        <img
                                            className='rounded-full w-full h-full'
                                            src={`${AVATAR_IMAGE_URL}/${userInfo.avatar}`}
                                            alt={userInfo.fullName}
                                        />
                                    </div>
                                )}

                                <div className='flex-1'>
                                    <h2 className='text-2xl font-bold text-gray-800 mb-2'>
                                        {userInfo.fullName}
                                    </h2>
                                    <div className='flex items-center gap-2 text-gray-600 mb-1'>
                                        <Mail size={16} />
                                        <span>{userInfo.email}</span>
                                    </div>
                                    <div className='flex items-center gap-2 text-gray-600'>
                                        <Phone size={16} />
                                        <span>{userInfo.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className='p-4 group relative border-gray-200/60 hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300'>
                        <div className='absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>

                        <div>
                            <div className='flex items-center gap-3'>
                                <div className='p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl'>
                                    <User size={20} className='text-white' />
                                </div>
                                <span className='bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
                                    Thông tin cá nhân
                                </span>
                            </div>
                        </div>

                        <div className='space-y-4'>
                            <div className='grid md:grid-cols-2 gap-4 p-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-900 mb-2'>
                                        Họ và tên
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type='text'
                                            name='fullName'
                                            value={editForm.fullName}
                                            onChange={handleInputChange}
                                            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200'
                                        />
                                    ) : (
                                        <p className='text-gray-600 py-3'>
                                            {userInfo.fullName}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-900 mb-2'>
                                        Số điện thoại
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type='tel'
                                            name='phone'
                                            value={editForm.phone}
                                            onChange={handleInputChange}
                                            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200'
                                        />
                                    ) : (
                                        <p className='text-gray-600 py-3'>
                                            {userInfo.phone}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-900 mb-2'>
                                        Email
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type='email'
                                            name='email'
                                            value={editForm.email}
                                            onChange={handleInputChange}
                                            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200'
                                        />
                                    ) : (
                                        <p className='text-gray-600 py-3'>
                                            {userInfo.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-900 mb-2'>
                                        Giới tính
                                    </label>
                                    {isEditing ? (
                                        <select
                                            name='gender'
                                            value={editForm.gender || ''}
                                            onChange={handleInputChange}
                                            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200'
                                        >
                                            <option value=''>
                                                -- Chọn giới tính --
                                            </option>
                                            <option value='MALE'>Nam</option>
                                            <option value='FEMALE'>Nữ</option>
                                            <option value='OTHER'>Khác</option>
                                        </select>
                                    ) : (
                                        <p className='text-gray-600 py-3'>
                                            {userInfo.gender === 'MALE'
                                                ? 'Nam'
                                                : userInfo.gender === 'FEMALE'
                                                ? 'Nữ'
                                                : '- -'}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-900 mb-2'>
                                        Ngày sinh
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type='date'
                                            name='dob'
                                            value={editForm.dob}
                                            onChange={handleInputChange}
                                            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200'
                                        />
                                    ) : (
                                        <p className='text-gray-600 py-3'>
                                            {userInfo.dob
                                                ? formatLocalDate(userInfo.dob)
                                                : '- -'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='p-4 group relative border-gray-200/60 hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300'>
                        <div className='absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>

                        <div>
                            <div className='flex items-center gap-3'>
                                <div className='p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl'>
                                    <MapPin size={20} className='text-white' />
                                </div>
                                <span className='bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
                                    Địa chỉ
                                </span>
                            </div>
                        </div>

                        <div className='p-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-900 mb-2'>
                                    Địa chỉ chi tiết
                                </label>
                                {isEditing ? (
                                    <input
                                        type='text'
                                        name='address'
                                        value={editForm.address}
                                        onChange={handleInputChange}
                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200'
                                    />
                                ) : (
                                    <p className='text-gray-600 py-3'>
                                        {userInfo.address}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Statistics */}
                <div className='lg:col-span-1 space-y-2'>
                    {/* Join Date */}
                    <div className='group relative border-gray-200/60 hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300 p-4'>
                        <div className='absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>

                        <div className='pb-3'>
                            <div className='flex items-center gap-3 text-lg'>
                                <div className='p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl'>
                                    <Calendar
                                        size={18}
                                        className='text-white'
                                    />
                                </div>
                                <span className='text-gray-800'>
                                    Thành viên từ
                                </span>
                            </div>
                        </div>

                        <div className='pt-0'>
                            <p className='text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
                                {formatDate(userInfo.createdAt)}
                            </p>
                        </div>
                    </div>

                    {/* Total Orders */}
                    <div className='group relative border-gray-200/60 hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300 p-4'>
                        <div className='absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>

                        <div className='pb-3'>
                            <div className='flex items-center gap-3 text-lg'>
                                <div className='p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-xl'>
                                    <ShoppingBag
                                        size={18}
                                        className='text-white'
                                    />
                                </div>
                                <span className='text-gray-800'>
                                    Tổng đơn hàng
                                </span>
                            </div>
                        </div>

                        <div className='pt-0'>
                            <p className='text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
                                {userInfo.totalOrder}
                            </p>
                            <p className='text-sm text-gray-500 mt-1'>
                                đơn hàng hoàn thành
                            </p>
                        </div>
                    </div>

                    {/* Total Spent */}
                    <div className='group relative border-gray-200/60 hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300 p-4'>
                        <div className='absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>

                        <div className='pb-3'>
                            <div className='flex items-center gap-3 text-lg'>
                                <div className='p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl'>
                                    <TrendingUp
                                        size={18}
                                        className='text-white'
                                    />
                                </div>
                                <span className='text-gray-800'>
                                    Tổng chi tiêu
                                </span>
                            </div>
                        </div>

                        <div className='pt-0'>
                            <p className='text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
                                {formatPriceVND(userInfo.totalPrice)}
                            </p>
                            <p className='text-sm text-gray-500 mt-1'>
                                từ khi tham gia
                            </p>
                        </div>
                    </div>

                    {/* Customer Level */}
                    <div className='group relative border-gray-200/60 hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300 p-4'>
                        <div className='absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>

                        <div className='pb-3'>
                            <div className='flex items-center gap-3 text-lg'>
                                <div className='p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl'>
                                    <Trophy size={18} className='text-white' />
                                </div>
                                <span className='text-gray-800'>
                                    Hạng thành viên
                                </span>
                            </div>
                        </div>

                        <div className='pt-0'>
                            <p
                                className={`text-xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent capitalize`}
                            >
                                {name}
                            </p>
                            <p className='text-sm text-gray-500 mt-1'>
                                Ưu đãi đặc biệt
                            </p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <Link to={'/user/my-orders'}>
                        <button className='cursor-pointer mt-3 w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-medium text-lg'>
                            Xem lịch sử đơn hàng
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
