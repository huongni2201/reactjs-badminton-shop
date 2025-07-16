import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {products?.length > 0 ? (
                products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))
            ) : (
                <h3 className='text-center col-span-full mt-8 text-primary'>
                    Không có sản phẩm nào!
                </h3>
            )}
        </div>
    );
};

export default ProductGrid;
