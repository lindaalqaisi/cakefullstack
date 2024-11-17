import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: async(credentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.success) {
            Cookies.set('token', response.data.data.token);
            Cookies.set('role', response.data.data.user.role);
        }
        return response.data;
    },

    register: async(userData) => {
        const response = await api.post('/auth/register', userData);
        if (response.data.success) {
            Cookies.set('token', response.data.data.token);
            Cookies.set('role', response.data.data.user.role);
        }
        return response.data;
    }
};

export const productService = {
    getAll: async(params) => {
        const response = await api.get('/products', { params });
        return response.data;
    },
    getById: async(id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },


    create: async(productData) => {
        const response = await api.post('/products', productData);
        return response.data;
    },

    update: async(id, productData) => {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    },

    delete: async(id) => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    }
};

export default api;