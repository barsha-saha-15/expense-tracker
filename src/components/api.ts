import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', 
});

// প্রত্যেক request এ token যোগ করবে যদি থাকে
api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;


