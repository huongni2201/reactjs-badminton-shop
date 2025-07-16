import CategoryFilter from './CategoryFilter';
import PriceRange from './PriceRange';
import BrandFilter from './BrandFilter';

const Filter = ({
    selectedCategories,
    selectedPriceRanges,
    selectedBrand,
    handleCategoryChange,
    handlePriceChange,
    handleBrandChange,
    categories,
    brands,
    prices
}) => {
    return (
        <div className='w-64 bg-gray-100 p-6 space-y-8 rounded-lg'>
            <div className='space-y-8'>
                <PriceRange
                    title='Chọn mức giá'
                    prices={prices}
                    selectedPriceRange={selectedPriceRanges}
                    onChange={handlePriceChange}
                />

                <CategoryFilter
                    title='danh mục'
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onChange={handleCategoryChange}
                />

                <BrandFilter
                    title='Nhãn hàng'
                    brands={brands}
                    selectedBrands={selectedBrand}
                    onChange={handleBrandChange}
                />
            </div>
        </div>
    );
};

export default Filter;
