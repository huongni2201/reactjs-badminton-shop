import { ShoppingBag } from 'lucide-react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { useCart } from '../../../context/CartContext';

const Cart = () => {
    const {
        cartItems,
        totalPrice,
        handleQuantityChange,
        handleRemove,
        baseUrl
    } = useCart();

    return (
        <div className='max-w-7xl mx-auto px-4 py-8'>
            <div className='flex items-center gap-2 text-2xl font-bold text-primary mb-8 border-b border-gray-300 pb-4'>
                <ShoppingBag />
                <h2>Your Shopping Cart</h2>
            </div>

            <div className='grid lg:grid-cols-12 gap-8'>
                {/* Product List */}
                <div className='lg:col-span-8 space-y-4'>
                    {cartItems.map(item => (
                        <CartItem
                            key={item.cartItemId}
                            cartItem={item}
                            baseUrl={baseUrl}
                            onChangeQuantity={handleQuantityChange}
                            onRemove={handleRemove}
                        />
                    ))}
                    {cartItems.length === 0 && (
                        <div className='text-center text-gray-500 py-12'>
                            Your cart is currently empty.
                        </div>
                    )}
                </div>

                {/* Order Summary */}
                <div className='lg:col-span-4'>
                    <CartSummary
                        totalPrice={totalPrice}
                        disabled={cartItems.length === 0}
                    />
                </div>
            </div>
        </div>
    );
};

export default Cart;
