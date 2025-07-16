import { useEffect, useState } from 'react';
import {
    User,
    Search,
    Plus,
    ShoppingBasket,
    ShieldOff,
    Activity,
    Ban
} from 'lucide-react';
import {
    deleteUserById,
    getAllUsers,
    postCreateNewUser,
    putUser
} from '../../../services/apiUserService';
import Pagination from '../../common/Pagination';
import { toast } from 'react-toastify';
import { postUploadAvatarFile } from '../../../services/apiFileService';
import UpdateUserModal from './UpdateUserModal';
import UserTable from './UserTable';
import { getAllRoles } from '../../../services/apiRoleService';
import StatCard from '../StatCard';
import AddUserModal from './AddUserModal';

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showConfirmId, setShowConfirmId] = useState(null);
    const [userToUpdate, setUserToUpdate] = useState(null);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [filter, setFilter] = useState({
        status: '',
        role: '',
        search: ''
    });

    const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/storage/avatar`;

    useEffect(() => {
        getAllRoles()
            .then(data => {
                setRoles(data?.data?.result);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        getAllUsers(currentPage, pageSize, filter)
            .then(data => {
                setUsers(data?.data.result);
                setTotalPage(data?.data.meta.totalPages);
                setTotalItems(data?.data.meta.totalItems);
            })
            .catch(err => {
                console.log(err);
            });
    }, [currentPage, pageSize, filter]);

    const handleOnChange = page => {
        setCurrentPage(page);
    };

    const handleDeleteUser = id => {
        deleteUserById(id)
            .then(res => {
                const { statusCode, message, error } = res;

                if (statusCode >= 200 && statusCode < 300) {
                    toast.success(message || 'Xóa người dùng thành công!');
                } else {
                    toast.error(error || 'Đã xảy ra lỗi khi xóa!');
                }

                getAllUsers(currentPage, pageSize).then(data => {
                    setUsers(data?.data.result);
                    setTotalPage(data?.data.meta.totalPages);
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleCreateUser = async formData => {
        try {
            if (formData.avatar instanceof File) {
                const uploadRes = await postUploadAvatarFile(formData.avatar);
                formData.avatar = uploadRes.data.fileName;
            }

            formData.role = { name: formData.role };

            const res = await postCreateNewUser(formData);
            const { statusCode, message, error } = res;

            if (statusCode >= 200 && statusCode < 300) {
                toast.success(message || 'Thêm mới người dùng thành công!');
            } else {
                toast.error(
                    error || 'Đã xảy ra lỗi khi thêm. Vui lòng thử lại!'
                );
            }

            const data = await getAllUsers(currentPage, pageSize);
            setUsers(data?.data.result);
            setTotalPage(data?.data.meta.totalPages);
        } catch (err) {
            toast.error(err || 'Lỗi tạo người dùng!');
        }
    };

    const handleUpdateUser = async (formData, id) => {
        try {
            if (formData.avatar instanceof File) {
                const uploadRes = await postUploadAvatarFile(formData.avatar);
                formData.avatar = uploadRes.data.fileName;
            }

            formData.role = { name: formData.role };

            const res = await putUser(formData, id);
            const { statusCode, message, error } = res;

            if (statusCode >= 200 && statusCode < 300) {
                toast.success(message || 'Cập nhật người dùng thành công!');
            } else {
                toast.error(
                    error || 'Đã xảy ra lỗi khi cập nhật. Vui lòng thử lại!'
                );
            }

            const data = await getAllUsers(currentPage, pageSize);
            setUsers(data?.data.result);
            setTotalPage(data?.data.meta.totalPages);
        } catch (err) {
            toast.error(err || 'Lỗi cập nhật người dùng!');
        }
    };

    const handleFilterChange = (field, value) => {
        setFilter(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSearch = () => {
        setFilter(prev => ({
            ...prev,
            search: searchInput.trim()
        }));
        setSearchInput('');
    };

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                <div>
                    <h1 className='text-3xl font-bold text-base-content'>
                        Quản lý Người dùng
                    </h1>
                    <p className='text-base-content/70 mt-1'>
                        Quản lý thông tin người dùng và quyền truy cập
                    </p>
                </div>
                <button
                    className='btn btn-primary mt-4 lg:mt-0'
                    onClick={() => setShowAddUserModal(!showAddUserModal)}
                >
                    <Plus size={20} />
                    Thêm người dùng
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
                    <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
                        <div className='form-control col-span-1 lg:col-span-2'>
                            <div className='relative'>
                                <input
                                    type='text'
                                    placeholder='Tìm kiếm theo tên'
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
                                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50'
                                    size={20}
                                />
                            </div>
                        </div>

                        <select
                            className='select select-bordered w-full'
                            onChange={e =>
                                handleFilterChange('role', e.target.value)
                            }
                        >
                            <option value=''>Tất cả vai trò</option>
                            {roles?.map(role => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
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
                            <option value='ACTIVE'>Hoạt động</option>
                            <option value='INACTIVE'>Tạm khóa</option>
                        </select>

                        <select
                            className='select select-bordered w-full'
                            value={pageSize}
                            onChange={e => setPageSize(Number(e.target.value))}
                        >
                            <option value='10'>10 người dùng/trang</option>
                            <option value='20'>20 người dùng/trang</option>
                            <option value='50'>50 người dùng/trang</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className='card bg-base-100 shadow-xl'>
                <div className='card-body'>
                    <UserTable
                        users={users}
                        baseUrl={baseUrl}
                        onEdit={user => {
                            setUserToUpdate(user);
                            setShowUpdateUserModal(true);
                        }}
                        onDeleteConfirm={handleDeleteUser}
                        showConfirmId={showConfirmId}
                        setShowConfirmId={setShowConfirmId}
                    />

                    <div className='mt-8'>
                        <Pagination
                            currentPage={currentPage}
                            totalPage={totalPage}
                            onPageChange={handleOnChange}
                        />
                    </div>
                </div>
            </div>

            {/* Add User Modal */}
            {showAddUserModal && (
                <AddUserModal
                    onClose={() => setShowAddUserModal(false)}
                    onSuccess={dataFromModal => {
                        handleCreateUser(dataFromModal);
                        setShowAddUserModal(false);
                    }}
                />
            )}

            {/* Update User Modal */}
            {showUpdateUserModal && userToUpdate && (
                <UpdateUserModal
                    userInfo={userToUpdate}
                    baseUrl={baseUrl}
                    onClose={() => setShowUpdateUserModal(false)}
                    onSuccess={dataFromModal => {
                        handleUpdateUser(dataFromModal, userToUpdate.id);
                        setShowUpdateUserModal(false);
                    }}
                />
            )}
        </div>
    );
};

export default Users;
