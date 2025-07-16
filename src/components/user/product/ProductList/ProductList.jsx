import Pagination from '../../../common/Pagination';
import Filter from '../filter/Filter';
import ProductGrid from './ProductGrid';
import useProductList from './useProductList';

const ProductList = () => {
    const {
        products,
        currentPage,
        totalPage,
        handlePageChange,
        setCurrentPage,
        setPageSize,
        selectedCategories,
        selectedPriceRanges,
        selectedBrand,
        handleCategoryChange,
        handlePriceChange,
        handleBrandChange,
        categories,
        brands,
        prices
    } = useProductList();

    return (
        <div className='flex py-8'>
            <div>
                <Filter
                    selectedCategories={selectedCategories}
                    selectedPriceRanges={selectedPriceRanges}
                    selectedBrand={selectedBrand}
                    handleCategoryChange={handleCategoryChange}
                    handlePriceChange={handlePriceChange}
                    handleBrandChange={handleBrandChange}
                    categories={categories}
                    brands={brands}
                    prices={prices}
                />
            </div>

            <div className='flex-1 px-6'>
                <ProductGrid products={products} />

                <div className='mt-8'>
                    <Pagination
                        currentPage={currentPage}
                        totalPage={totalPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductList;
