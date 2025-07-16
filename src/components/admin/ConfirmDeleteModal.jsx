// src/components/common/ConfirmDeleteModal.jsx
import { Trash2, XCircle } from 'lucide-react';

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
    return (
        <div className='absolute bottom-0 right-2 z-50 mt-2 w-64 bg-base-100 border border-base-300 rounded-lg shadow-lg p-4 animate-fade-in'>
            <div className='flex items-center gap-2 text-red-600 mb-3'>
                <XCircle size={20} />
                <span className='font-semibold'>Xác nhận xoá người dùng?</span>
            </div>
            <div className='flex justify-end gap-2'>
                <button className='btn btn-sm btn-outline' onClick={onCancel}>
                    Huỷ
                </button>
                <button className='btn btn-sm btn-error' onClick={onConfirm}>
                    <Trash2 size={16} />
                    Xoá
                </button>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
