// API 配置檔案
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// API 端點定義
export const API_ENDPOINTS = {
    USERS: '/api/users',
    PRODUCTS: '/api/products',
    SIGNIN: '/api/sign/signin'
};

// 建構完整的 API URL
export const buildApiUrl = (endpoint) => {
    return `${API_BASE_URL}${endpoint}`;
};

// 預設匯出 API 基礎 URL
export default API_BASE_URL;
