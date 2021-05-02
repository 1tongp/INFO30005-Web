import _axios from 'axios';

const axios = baseUrl => {
    const instance = _axios.create({
        baseURL: baseUrl || 'http://localhost:8080'

    });
    return instance;
};

export { axios };

export default axios();