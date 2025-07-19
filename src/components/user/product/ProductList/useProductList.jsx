import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllProducts } from '../../../../services/apiProductService';
import { getAllCategories } from '../../../../services/apiCategoryService';
import { getAllBrands } from '../../../../services/apiBrandService';

const useProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [pageSize, setPageSize] = useState(16);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get('filter') || '';
    const pageParam = parseInt(searchParams.get('page')) || 1;

    const prices = [
        { label: 'Dưới 500.000đ', min: 0, max: 500000 },
        { label: 'Từ 500.000đ - 1 triệu', min: 500000, max: 1000000 },
        { label: 'Từ 1 triệu - 2 triệu', min: 1000000, max: 2000000 },
        { label: 'Từ 2 triệu - 3 triệu', min: 2000000, max: 3000000 },
        { label: 'Trên 3 triệu', min: 3000000, max: Infinity }
    ];

    // Fetch product list
    useEffect(() => {
        getAllProducts(pageParam, pageSize, filter)
            .then(res => {
                setProducts(res.data.result);
                setTotalPage(res.data.meta.totalPages);
                setCurrentPage(pageParam);
            })
            .catch(err => console.error('Error fetching products:', err));
    }, [pageParam, pageSize, filter]);

    // Fetch categories and brands
    useEffect(() => {
        getAllCategories()
            .then(res => setCategories(res?.data))
            .catch(err => console.log(err));
        getAllBrands()
            .then(res => setBrands(res?.data))
            .catch(err => console.log(err));
    }, []);

    // Page change
    const handlePageChange = page => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', page);
        setSearchParams(newParams);
    };

    // Build filter query string
    const buildFilterQuery = ({ priceRanges, categories, brands }) => {
        const filters = [];

        if (priceRanges.length) {
            const priceConditions = priceRanges.map(
                r =>
                    `(productVariants.price >: ${
                        r.min
                    } and productVariants.price <: ${
                        r.max === Infinity ? 999999999 : r.max
                    })`
            );
            filters.push(`(${priceConditions.join(' or ')})`);
        }

        if (categories.length) {
            const catList = [...new Set(categories)]
                .map(c => `'${c}'`)
                .join(',');
            filters.push(`category.name in [${catList}]`);
        }

        if (brands.length) {
            const brandList = [...new Set(brands)].map(b => `'${b}'`).join(',');
            filters.push(`brand.name in [${brandList}]`);
        }

        return filters.join(' and ');
    };

    useEffect(() => {
        const rawFilter = searchParams.get('filter');
        const page = parseInt(searchParams.get('page')) || 1;
        setCurrentPage(page);

        if (!rawFilter) {
            setSelectedCategories([]);
            setSelectedBrand([]);
            return;
        }

        // Parse category filter
        const categoryMatch = rawFilter.match(
            /category\.name\s+in\s+\[([^\]]+)\]/
        );
        const brandMatch = rawFilter.match(/brand\.name\s+in\s+\[([^\]]+)\]/);

        if (categoryMatch) {
            const catList = categoryMatch[1]
                .split(',')
                .map(s => s.trim().replace(/^'(.*)'$/, '$1'));
            setSelectedCategories(catList);
        } else {
            setSelectedCategories([]);
        }

        if (brandMatch) {
            const brandList = brandMatch[1]
                .split(',')
                .map(s => s.trim().replace(/^'(.*)'$/, '$1'));
            setSelectedBrand(brandList);
        } else {
            setSelectedBrand([]);
        }
    }, [searchParams]);

    // Update URL filter param when filters change
    useEffect(() => {
        const filterString = buildFilterQuery({
            priceRanges: selectedPriceRanges,
            categories: selectedCategories,
            brands: selectedBrand
        });

        const newParams = new URLSearchParams();
        if (filterString) newParams.set('filter', filterString);
        newParams.set('page', 1);
        setSearchParams(newParams);
    }, [selectedBrand, selectedCategories, selectedPriceRanges]);

    // Handlers
    const handleBrandChange = brand => {
        setSelectedBrand(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const handleCategoryChange = category => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handlePriceChange = price => {
        setSelectedPriceRanges(prev => {
            const exists = prev.some(p => p.label === price.label);
            return exists
                ? prev.filter(p => p.label !== price.label)
                : [...prev, price];
        });
    };

    return {
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
    };
};

export default useProductList;
