import { useEffect, useState } from 'react';
import { getCart } from '../../../services/apiCartService';
import {
    clearCart,
    deleteCartItem
} from '../../../services/apiCartItemService';
import { postOrder } from '../../../services/apiOrderService';
import { useCart } from '../../../context/CartContext';
import { Navigate, useNavigate } from 'react-router-dom';

const useOrder = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        note: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [totalPrice, setTotalPrice] = useState(0);
    const [formErrors, setFormErrors] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const { handleClearCart } = useCart();
    const [isLoading, setIsLoading] = useState(false);
    const [newOrder, setNewOrder] = useState(null);

    const navigate = useNavigate();

    const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/storage/product`;

    const fetchCartByUser = () => {
        setIsLoading(true);
        getCart()
            .then(res => {
                const data = res?.data;
                if (data) {
                    setOrderItems(data.items);
                    setTotalPrice(data.totalPrice);
                    setCustomerInfo(prev => ({
                        ...prev,
                        ...data.userDTO
                    }));
                }
            })
            .catch(err => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchCartByUser();
    }, []);

    useEffect(() => {
        setTotalPrice(
            orderItems.reduce(
                (sum, item) => sum + item.unitPrice * item.quantity,
                0
            )
        );
    }, [orderItems]);

    const handleRemove = orderItemId => {
        setCartItems(prev =>
            prev.filter(item => item.cartItemId !== orderItemId)
        );

        deleteCartItem(orderItemId);
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitOrder = e => {
        e.preventDefault();

        const errors = {};

        if (!customerInfo.fullName) errors.fullName = 'Vui lòng nhập họ tên';
        if (!customerInfo.phone) errors.phone = 'Vui lòng nhập số điện thoại';
        if (!customerInfo.address) errors.address = 'Vui lòng nhập địa chỉ';

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors({});
        setIsLoading(true);

        const orderItemsSubmit = orderItems.map(item => ({
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.unitPrice
        }));

        const orderData = {
            fullName: customerInfo.fullName,
            phone: customerInfo.phone,
            email: customerInfo.email,
            address: customerInfo.address,
            note: customerInfo.note,
            totalPrice: totalPrice,
            paymentMethod: paymentMethod,
            orderItems: orderItemsSubmit
        };

        postOrder(orderData)
            .then(data => {
                const statusCode = data?.statusCode;
                if (statusCode >= 200 && statusCode < 300) {
                    setShowSuccessMessage(true);
                    setNewOrder(data?.data);
                    localStorage.setItem(
                        'latestOrder',
                        JSON.stringify(data.data)
                    );
                    handleClearCart();
                }
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    };

    const handleSuccessMessage = () => {
        setShowSuccessMessage(false);
        if (newOrder?.paymentMethod === 'BANK') {
            navigate('/orders/payment');
            return;
        }
        navigate('/user/my-orders');
    };

    return {
        isLoading,
        orderItems,
        setOrderItems,
        totalPrice,
        setTotalPrice,
        customerInfo,
        setCustomerInfo,
        paymentMethod,
        formErrors,
        showSuccessMessage,
        setShowSuccessMessage,
        setPaymentMethod,
        handleRemove,
        handleInputChange,
        handleSubmitOrder,
        handleSuccessMessage,
        baseUrl
    };
};

export default useOrder;
