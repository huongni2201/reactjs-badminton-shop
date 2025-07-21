// Roles user in system
export const roles = {
    USER: 'USER',
    STAFF: 'STAFF',
    ADMIN: 'ADMIN'
};


// Defined permission in system
export const permissions = {
    VIEW_PRODUCTS: 'view_products',
    ORDER_PRODUCTS: 'order_products',
    VIEW_OWN_ORDERS: 'view_own_orders',

    MANAGE_USERS: 'manage_users',
    MANAGE_ORDERS: 'manage_orders',
    MANAGE_PRODUCTS: 'manage_products',
    MANAGE_PROMOTIONS: 'manage_promotions',
    MANAGE_CATEGORIES: 'manage_categories',
    MANAGE_BRANDS: 'manage_brands',
    MANAGE_ROLES: 'manage_roles',

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
        permissions.MANAGE_ORDERS,
        permissions.MANAGE_PRODUCTS,
        permissions.MANAGE_CATEGORIES,
        permissions.MANAGE_BRANDS,
        permissions.MANAGE_ROLES,
    ],
    [roles.ADMIN]: Object.values(permissions)
};