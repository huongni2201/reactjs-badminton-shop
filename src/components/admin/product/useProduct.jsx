import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
    deleteProductById,
    getAllProductsAdmin,
    postCreateProduct,
    putUpdateProduct
} from '../../../services/apiProductService';
import { getAllCategories } from '../../../services/apiCategoryService';
import { getAllBrands } from '../../../services/apiBrandService';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [filter, setFilter] = useState({
        status: '',
        brandId: '',
        categoryId: '',
        search: ''
    });
    const [searchInput, setSearchInput] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const fetchProducts = () => {
        getAllProductsAdmin(currentPage, pageSize, filter)
            .then(res => {
                setProducts(res?.data.result);
                setTotalPages(res?.data.meta.totalPages);
                setTotalItems(res?.data.meta.totalItems);
            })
            .catch(err => console.log(err));
    };

    const fetchCategoriesAndBrands = () => {
        getAllCategories()
            .then(res => setCategories(res?.data))
            .catch(err => console.log(err));
        getAllBrands()
            .then(res => setBrands(res?.data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage, filter, pageSize]);

    useEffect(() => {
        fetchCategoriesAndBrands();
    }, []);

    const handleSearch = () => {
        setFilter(prev => ({ ...prev, search: searchInput.trim() }));
        setSearchInput('');
    };

    const handleFilterChange = (field, value) => {
        setFilter(prev => ({ ...prev, [field]: value }));
    };

    const handleDeleteProduct = id => {
        deleteProductById(id)
            .then(data => {
                const { statusCode, message, error } = data?.data;
                if (statusCode >= 200 && statusCode < 300) {
                    toast.success(message || 'Xóa thành công');
                    fetchProducts();
                } else {
                    toast.error(error || 'Lỗi khi xóa');
                }
            })
            .catch(err => console.log(err));
    };

    const handleCreateProduct = product => {
        postCreateProduct(product)
            .then(data => {
                const { statusCode, message, error } = data?.data;

                if (statusCode >= 200 && statusCode < 300) {
                    toast.success(message || 'Tạo thành công');
                    fetchProducts();
                } else {
                    toast.error(error || 'Lỗi khi tạo');
                }
            })
            .catch(err => console.log(err));
    };

    const handleUpdateProduct = product => {
        putUpdateProduct(product.id, product)
            .then(data => {
                const { statusCode, message, error } = data?.data;
                if (statusCode >= 200 && statusCode < 300) {
                    toast.success(message || 'Cập nhật thành công');
                    fetchProducts();
                } else {
                    toast.error(error || 'Cập nhật thất bại');
                }
            })
            .catch(err => toast.error(`Lỗi khi cập nhật: ${err}`));
    };

    return {
        products,
        categories,
        brands,
        filter,
        setFilter,
        searchInput,
        setSearchInput,
        handleSearch,
        handleFilterChange,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        totalPages,
        totalItems,
        handleDeleteProduct,
        handleCreateProduct,
        handleUpdateProduct
    };
};
