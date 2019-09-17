import axios from 'axios';

const base = process.env.NODE_ENV === 'production' ? 'http://149.56.185.80:3000/api/' : 'http://localhost:3000/api/';

const api = axios.create({
    baseURL: base
});

export default api;