import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ClientLayout from '../layouts/ClientLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProductListPage from '../pages/ProductListPage';
import CartPage from '../pages/CartPage';
import Dashboard from '../components/admin/dashboard/Dashboard';
import Orders from '../components/admin/order/Orders';
import Brands from '../components/admin/brand/Brands';
import Categories from '../components/admin/category/Categories';
import Roles from '../components/admin/role/Roles';
import NotFound from '../pages/NotFound';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import Products from '../components/admin/product/Products';
import OrderPage from '../pages/OrderPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import OrderDetailsPage from '../pages/OrderDetailsPage';
import UserInfoPage from '../pages/UserInfoPage';
import MyOrders from '../components/user/order/myOrders/MyOrders';
import Users from '../components/admin/user/Users';
import RbacRoute from '../components/core/RbacRoute';
import { permissions } from '../config/rbacConfig';
import AccessDenied from '../pages/AccessDeniedPage';
import OrderPaymentPage from '../pages/OrderPaymentPage';

const ProtectedRoute = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
        return <Navigate to='/login' replace={true} />;
    }
    return <Outlet />;
};

const UnauthorizedRoutes = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
        return <Navigate to='/' replace={true} />;
    }
    return <Outlet />;
};

const Routers = () => {
    return (
        <div>
            <Routes>
                {/* Client side layout */}
                <Route element={<ClientLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/products' element={<ProductListPage />} />
                    <Route
                        path='/products/:id'
                        element={<ProductDetailsPage />}
                    />

                    <Route element={<ProtectedRoute />}>
                        <Route path='/carts' element={<CartPage />} />
                        <Route path='/orders' element={<OrderPage />} />
                        <Route
                            path='/orders/payment'
                            element={<OrderPaymentPage />}
                        />
                        <Route path='/user'>
                            <Route path='my-orders' element={<MyOrders />} />
                            <Route
                                path='my-orders/:id'
                                element={<OrderDetailsPage />}
                            />
                            <Route path='info' element={<UserInfoPage />} />
                        </Route>
                    </Route>

                    <Route element={<UnauthorizedRoutes />}>
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/register' element={<RegisterPage />} />
                    </Route>
                </Route>

                {/* Admin Dashboard layout */}
                <Route element={<ProtectedRoute />}>
                    <Route path='/admin' element={<DashboardLayout />}>
                        <Route
                            element={
                                <RbacRoute
                                    requiredPermission={
                                        permissions.VIEW_DASHBOARD
                                    }
                                />
                            }
                        >
                            <Route path='dashboard' element={<Dashboard />} />
                        </Route>
                        {/* Users */}
                        <Route
                            element={
                                <RbacRoute
                                    requiredPermission={
                                        permissions.MANAGE_USERS
                                    }
                                />
                            }
                        >
                            <Route path='users' element={<Users />} />
                        </Route>
                        {/* Products */}
                        <Route
                            element={
                                <RbacRoute
                                    requiredPermission={
                                        permissions.MANAGE_PRODUCTS
                                    }
                                />
                            }
                        >
                            <Route path='products' element={<Products />} />
                        </Route>
                        {/* Categories */}
                        <Route
                            element={
                                <RbacRoute
                                    requiredPermission={
                                        permissions.MANAGE_CATEGORIES
                                    }
                                />
                            }
                        >
                            <Route path='categories' element={<Categories />} />
                        </Route>
                        {/* Brands */}
                        <Route
                            element={
                                <RbacRoute
                                    requiredPermission={
                                        permissions.MANAGE_BRANDS
                                    }
                                />
                            }
                        >
                            <Route path='brands' element={<Brands />} />
                        </Route>

                        {/* Orders */}
                        <Route
                            element={
                                <RbacRoute
                                    requiredPermission={
                                        permissions.MANAGE_ORDERS
                                    }
                                />
                            }
                        >
                            <Route path='orders' element={<Orders />} />
                        </Route>

                        {/* Roles */}
                        <Route
                            element={
                                <RbacRoute
                                    requiredPermission={
                                        permissions.MANAGE_ROLES
                                    }
                                />
                            }
                        >
                            <Route path='roles' element={<Roles />} />
                        </Route>
                    </Route>
                </Route>

                {/* Not Found */}
                <Route path='*' element={<NotFound />} />

                <Route path='/access-denied' element={<AccessDenied />} />
            </Routes>
        </div>
    );
};

export default Routers;
