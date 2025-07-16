// Roles user in system
export const roles = {
    USER: 'user',
    STAFF: 'staff',
    MANAGER: 'manager',
    ADMIN: 'admin'
};


// Defined permission in system
export const permissions = {
    VIEW_PRODUCTS: 'view_products',
    ORDER_PRODUCTS: 'order_products',
    VIEW_OWN_ORDERS: 'view_own_orders',

    MANAGE_ALL_USERS: 'manage_all_users',
    MANAGE_ALL_ORDERS: 'manage_all_orders',
    MANAGE_PRODUCTS: 'manage_products',
    MANAGE_PROMOTIONS: 'manage_promotions',

    VIEW_DASHBOARD: 'view_dashboard'
};

// combines Roles and Permissions to verify role of user
export const rolePermissions = {
    [roles.USER]: [
        permissions.VIEW_PRODUCTS,
        permissions.ORDER_PRODUCTS,
        permissions.VIEW_OWN_ORDERS
    ],
    [roles.STAFF]: [
        permissions.VIEW_PRODUCTS,
        permissions.MANAGE_ALL_ORDERS
    ],
    [roles.MANAGER]: [
        permissions.VIEW_PRODUCTS,
        permissions.MANAGE_PRODUCTS,
        permissions.MANAGE_PROMOTIONS
    ],
    [roles.ADMIN]: Object.values(permissions)
};