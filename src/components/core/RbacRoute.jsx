import React from 'react';
import { usePermission } from '../../hooks/usePermission';
import { Navigate, Outlet } from 'react-router-dom';

const RbacRoute = ({ requiredPermission, redirectTo = '/access-denied' }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userRole = userInfo?.role?.name;

    const { hasPermission } = usePermission(userRole);

    if (!hasPermission(requiredPermission)) {
        return <Navigate to={redirectTo} replace={true} />;
    }

    return <Outlet />;
};

export default RbacRoute;
