import { useCart } from '../../../../context/CartContext';
import FilterSidebar from '../filter/Filter';
import ProductImageGallery from './ProductImageGallery';
import ProductInfoSection from './ProductInfoSection';
import ProductTabs from './ProductTabs';

const ProductLayout = ({
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
}) => {
    const { handleAddToCart, selectedVariant, setSelectedVariant } = useCart();

    return (
        <div className='mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8'>
            <div className='lg:col-span-1'>
                <FilterSidebar />
            </div>

            <div className='lg:col-span-3 bg-base-100 rounded-lg'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <ProductImageGallery
                        images={product.images.map(img => `${baseUrl}/${img}`)}
                        imageAlt={product.name}
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                    />

                    <ProductInfoSection
                        product={product}
                        selectedVariant={selectedVariant}
                        setSelectedVariant={setSelectedVariant}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        wishlist={wishlist}
                        setWishlist={setWishlist}
                        handleAddToCart={handleAddToCart}
                    />
                </div>

                <ProductTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    description={product.description}
                />
            </div>
        </div>
    );
};

export default ProductLayout;
