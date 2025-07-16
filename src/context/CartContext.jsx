import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback
} from 'react';
import { getCart } from '../services/apiCartService';
import {
    clearCart,
    deleteCartItem,
    postCartItem,
    putCartItemQuantity
} from '../services/apiCartItemService';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import { useUser } from './UserContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { userInfo } = useUser();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState(null);

    const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/storage/product`;

    const fetchCartByUser = useCallback(() => {
        if (!userInfo?.id) return;
        setLoading(true);
        getCart()
            .then(res => {
                const data = res?.data;
                if (data) {
                    setCartItems(data.items || []);
                    setTotalPrice(data.totalPrice || 0);
                }
            })
            .catch(err => console.error('Lỗi khi fetch giỏ hàng:', err))
            .finally(() => setLoading(false));
    }, [userInfo]);

    // ✅ Debounce update quantity
    const debouncedUpdateQuantity = useCallback(
        debounce(async (cartItemId, quantity) => {
            try {
                const res = await putCartItemQuantity(cartItemId, quantity);
                if (res?.statusCode > 300) {
                    toast.error(res.error);
                } else {
                    fetchCartByUser();
                }
            } catch (err) {
                console.error('Lỗi cập nhật số lượng:', err);
            }
        }, 500),
        [fetchCartByUser]
    );

    const handleQuantityChange = (cartItemId, delta) => {
        const currentItem = cartItems.find(
            item => item.cartItemId === cartItemId
        );
        if (!currentItem) return;

        const attemptedQuantity = currentItem.quantity + delta;

        if (attemptedQuantity > currentItem.stockQuantity) {
            toast.error('Số lượng không được vượt quá tồn kho!');
            return;
        }

        const newQuantity = Math.max(1, attemptedQuantity);

        setCartItems(prev =>
            prev.map(item =>
                item.cartItemId === cartItemId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );

        debouncedUpdateQuantity(cartItemId, newQuantity);
    };

    const handleRemove = async cartItemId => {
        await deleteCartItem(cartItemId);
        fetchCartByUser();
    };

    const handleAddToCart = (pro, selectedVariant, quantity) => {
        if (!userInfo?.id) return;

        if (!pro || !selectedVariant) {
            console.error('Thiếu dữ liệu sản phẩm hoặc phiên bản');
            return;
        }

        if (quantity > selectedVariant.stockQuantity) {
            toast.error(
                `Kho chỉ còn ${selectedVariant.stockQuantity} sản phẩm`
            );
            return;
        }

        setLoading(true);

        const cartItemData = {
            variantId: selectedVariant.id,
            price: selectedVariant.price,
            quantity: quantity
        };

        postCartItem(cartItemData)
            .then(res => {
                const statusCode = res.statusCode;
                if (statusCode >= 200 && statusCode <= 300) {
                    toast.success('Thêm sản phẩm vào giỏ hàng thành công!');
                    fetchCartByUser();
                } else {
                    toast.error('Số lượng vượt quá sản phẩm có trong kho!');
                }
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    };

    const handleClearCart = async () => {
        setCartItems([]);
        return clearCart()
            .then(() => {
                fetchCartByUser();
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchCartByUser();
    }, [fetchCartByUser]);

    useEffect(() => {
        const total = cartItems?.reduce(
            (sum, item) => sum + item.unitPrice * item.quantity,
            0
        );
        setTotalPrice(total);
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                setCartItems,
                totalPrice,
                fetchCartByUser,
                handleClearCart,
                handleQuantityChange,
                handleRemove,
                handleAddToCart,
                selectedVariant,
                setSelectedVariant,
                baseUrl,
                loading
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
