import Loading from '../../../common/Loading';
import ProductLayout from './ProductLayout';
import useProductDetail from './useProductDetails';

const ProductDetail = () => {
    const {
        product,
        selectedImage,
        setSelectedImage,
        quantity,
        setQuantity,
        wishlist,
        setWishlist,
        activeTab,
        setActiveTab,
        baseUrl
    } = useProductDetail();

    if (!product) return <Loading message='Đang tải sản phẩm...' />;

    return (
        <ProductLayout
            product={product}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            quantity={quantity}
            setQuantity={setQuantity}
            wishlist={wishlist}
            setWishlist={setWishlist}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            baseUrl={baseUrl}
        />
    );
};

export default ProductDetail;
