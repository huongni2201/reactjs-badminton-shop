import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderPaymentPage = () => {
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem('latestOrder');
        if (stored) {
            setOrder(JSON.parse(stored));
        }
    }, []);

    if (!order)
        return <p className='text-center mt-10'>Không tìm thấy đơn hàng.</p>;

    const {
        orderId,
        fullName,
        phone,
        address,
        createdAt,
        totalPrice,
        paymentMethod,
        paymentInfo,
        items
    } = order;

    const paymentContent = `DH-${createdAt
        .slice(0, 10)
        .replaceAll('-', '')}-${orderId}`;

    return (
        <div className='max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow'>
            <div className='flex items-center gap-3 mb-6'>
                <CheckCircle className='text-green-500 w-6 h-6' />
                <h1 className='text-xl font-semibold text-green-700'>
                    Đặt hàng thành công!
                </h1>
            </div>

            <div className='mb-6'>
                <h2 className='text-lg font-semibold mb-2'>
                    Thông tin đơn hàng
                </h2>
                <ul className='text-sm text-gray-700 space-y-1'>
                    <li>
                        <strong>Mã đơn hàng:</strong> #{orderId}
                    </li>
                    <li>
                        <strong>Ngày đặt:</strong>{' '}
                        {new Date(createdAt).toLocaleString()}
                    </li>
                    <li>
                        <strong>Họ tên:</strong> {fullName}
                    </li>
                    <li>
                        <strong>Số điện thoại:</strong> {phone}
                    </li>
                    <li>
                        <strong>Địa chỉ:</strong> {address}
                    </li>
                </ul>
            </div>

            <div className='mb-6'>
                <h2 className='text-lg font-semibold mb-2'>
                    Chi tiết sản phẩm
                </h2>
                <table className='w-full text-sm'>
                    <thead>
                        <tr className='border-b'>
                            <th className='text-left py-2'>Sản phẩm</th>
                            <th>SL</th>
                            <th>Đơn giá</th>
                            <th>Tạm tính</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, idx) => (
                            <tr key={idx} className='border-b'>
                                <td className='py-2'>{item.productName}</td>
                                <td className='text-center'>{item.quantity}</td>
                                <td className='text-center'>
                                    {item.unitPrice.toLocaleString()}đ
                                </td>
                                <td className='text-center'>
                                    {(
                                        item.quantity * item.unitPrice
                                    ).toLocaleString()}
                                    đ
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='text-right mt-2 font-semibold text-lg'>
                    Tổng tiền:{' '}
                    <span className='text-red-600'>
                        {totalPrice.toLocaleString()}đ
                    </span>
                </div>
            </div>

            {paymentMethod === 'BANK' && paymentInfo && (
                <div className='border-t pt-4'>
                    <h2 className='text-lg font-semibold mb-2'>
                        Thông tin thanh toán
                    </h2>
                    <ul className='text-sm space-y-1'>
                        <li>
                            <strong>Ngân hàng:</strong> {paymentInfo.bankName}
                        </li>
                        <li>
                            <strong>Số tài khoản:</strong>{' '}
                            {paymentInfo.bankNumber}
                        </li>
                        <li>
                            <strong>Chủ tài khoản:</strong>{' '}
                            {paymentInfo.bankOwner}
                        </li>
                        <li>
                            <strong>Số tiền:</strong>{' '}
                            <span className='text-red-600 font-bold'>
                                {totalPrice.toLocaleString()}đ
                            </span>
                        </li>
                        <li>
                            <strong>Nội dung:</strong>{' '}
                            <span className='text-blue-600 font-semibold'>
                                {paymentContent}
                            </span>
                        </li>
                    </ul>

                    <div className='mt-4 flex flex-col items-center'>
                        <img
                            src={paymentInfo.qrCodeUrl}
                            alt='QR thanh toán'
                            className='w-60 border rounded-lg'
                        />
                        <p className='text-xs text-gray-500 mt-2'>
                            * Quét mã bằng app ngân hàng để thanh toán
                        </p>
                    </div>
                </div>
            )}

            <div className='text-center mt-8'>
                <button
                    onClick={() => {
                        localStorage.removeItem('latestOrder');
                        navigate('/user/my-orders');
                    }}
                    className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow cursor-pointer transition duration-200 font-semibold'
                >
                    Tôi đã thanh toán
                </button>
            </div>
        </div>
    );
};

export default OrderPaymentPage;
