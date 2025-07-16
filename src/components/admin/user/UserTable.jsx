// src/components/user/UserTable.jsx
import { Edit, Trash2 } from 'lucide-react';
import { formatDate } from '../../../utils/myUtils';
import ConfirmDeleteModal from '../ConfirmDeleteModal';

const UserTable = ({
    users,
    baseUrl,
    onEdit,
    onDeleteConfirm,
    showConfirmId,
    setShowConfirmId
}) => {
    return (
        <div className='overflow-x-auto'>
            <table className='table table-zebra w-full text-center'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Giới tính</th>
                        <th>Vai trò</th>
                        <th>Trạng thái</th>
                        <th>Ngày tham gia</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => (
                        <tr key={user.id}>
                            <td className='font-mono'>{user.id}</td>
                            <td>
                                <div className='flex items-center gap-3 justify-center'>
                                    <div className='avatar placeholder'>
                                        <figure className='w-[32px] h-[32px] rounded-full'>
                                            <img
                                                src={
                                                    user.avatar
                                                        ? `${baseUrl}/${user.avatar}`
                                                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT18iwsdCCbBfpa50-5BmNa_m_BX087_x1oWQ&s'
                                                }
                                                alt={user.fullName}
                                            />
                                        </figure>
                                    </div>
                                    <span className='capitalize'>
                                        {user.fullName}
                                    </span>
                                </div>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.gender}</td>
                            <td>
                                <span
                                    className={`badge rounded ${
                                        user.role?.role === 'ADMIN'
                                            ? 'badge-primary'
                                            : 'badge-secondary'
                                    }`}
                                >
                                    {user.role?.role}
                                </span>
                            </td>
                            <td>
                                <span
                                    className={`badge ${
                                        user.status === 'Hoạt động'
                                            ? 'badge-success'
                                            : 'badge-warning'
                                    }`}
                                >
                                    {user.status}
                                </span>
                            </td>
                            <td>
                                {user.createdAt
                                    ? formatDate(user.createdAt)
                                    : 'N/A'}
                            </td>
                            <td className='relative'>
                                <div className='flex gap-2 justify-center'>
                                    <button
                                        className='btn btn-ghost btn-xs py-3 text-sky-500'
                                        onClick={() => onEdit(user)}
                                    >
                                        <Edit size={20} />
                                    </button>

                                    <button
                                        className='btn btn-ghost btn-xs py-3 text-primary'
                                        onClick={() =>
                                            setShowConfirmId(prev =>
                                                prev === user.id
                                                    ? null
                                                    : user.id
                                            )
                                        }
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>

                                {showConfirmId === user.id && (
                                    <div className='absolute bottom-[20px] right-[120px] mt-2 z-10 transition'>
                                        <ConfirmDeleteModal
                                            onConfirm={() => {
                                                onDeleteConfirm(user.id);
                                                setShowConfirmId(null);
                                            }}
                                            onCancel={() =>
                                                setShowConfirmId(null)
                                            }
                                        />
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
