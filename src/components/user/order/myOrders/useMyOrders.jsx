import { useState, useEffect } from 'react';
import {
    Package,
    Truck,
    CheckCircle,
    XCircle,
    Clock,
    BanknoteArrowUp
} from 'lucide-react';
import { getOrders } from '../../../../services/apiOrderService';

const useMyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/storage/product`;

    useEffect(() => {
        getOrders().then(data => {
            setTotalPage(data?.data.meta.totalPages);
            setCurrentPage(data?.data.meta.page);
            setPageSize(data?.data.meta.pageSize);
            setOrders(data?.data.result);
            setIsLoading(false);
        });
    }, []);

    const getOrderStatusIcon = status => {
        const iconProps = { size: 20, className: 'text-white' };

        switch (status) {
            case 'PENDING':
                return <Clock {...iconProps} />;
            case 'PAID':
                return <BanknoteArrowUp {...iconProps} />;
            case 'SHIPPED':
                return <Truck {...iconProps} />;
            case 'DELIVERED':
                return <CheckCircle {...iconProps} />;
            case 'CANCELLED':
                return <XCircle {...iconProps} />;
            default:
                return <Package {...iconProps} />;
        }
    };

    const getOrderStatusColor = status => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'PAID':
                return 'bg-orange-100 text-orange-800';
            case 'SHIPPED':
                return 'bg-blue-100 text-blue-800';
            case 'DELIVERED':
                return 'bg-green-100 text-green-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPaymentMethod = method => {
        switch (method) {
            case 'COD':
                return 'Thanh toán khi nhận hàng';
            case 'BANK':
                return 'Chuyển khoản ngân hàng';
            case 'MOMO':
                return 'Ví MoMo';
        }
    };

    return {
        orders,
        isLoading,
        currentPage,
        setCurrentPage,
        pageSize,
        totalPage,
        getOrderStatusIcon,
        getOrderStatusColor,
        getPaymentMethod,
        baseUrl
    };
};

export default useMyOrders;
