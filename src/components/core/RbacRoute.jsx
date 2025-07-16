import React from 'react';
import { usePermission } from '../../hooks/usePermission';
import { Navigate, Outlet } from 'react-router-dom';

const RbacRoute = ({ requiredPermission, redirectTo = '/access-denied' }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userRole = user?.role;

    const { hasPermissions } = usePermission(userRole);

    if (!hasPermissions) {
        return <Navigate redirectTo={redirectTo} replace={true} />;
    }

    return <Outlet />;
};

export default RbacRoute;
