import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../../../services/apiProductService';
import { toast } from 'react-toastify';
import { postCartItem } from '../../../../services/apiCartItemService';
import { useCart } from '../../../../context/CartContext';

const useProductDetail = () => {
    const { id } = useParams();
    const { handleAddToCart, selectedVariant, setSelectedVariant } = useCart();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [wishlist, setWishlist] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/storage/product`;

    useEffect(() => {
        getProductById(id)
            .then(res => {
                const data = res?.data?.data;
                if (data) {
                    const normalizedVariants = data.variants.map(variant => ({
                        ...variant,
                        attributes: variant.attributeValues.reduce(
                            (acc, cur) => {
                                acc[cur.name] = cur.value;
                                return acc;
                            },
                            {}
                        )
                    }));
                    setProduct({ ...data, variants: normalizedVariants });
                    setSelectedVariant(normalizedVariants[0]);
                    setSelectedImage(0);
                }
            })
            .catch(console.error);
    }, [id]);

    return {
        product,
        selectedImage,
        setSelectedImage,
        wishlist,
        setWishlist,
        quantity,
        setQuantity,
        activeTab,
        setActiveTab,
        baseUrl,
        handleAddToCart
    };
};

export default useProductDetail;
