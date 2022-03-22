// function to handle with the connection between the front-end and the back-end
import _axios from 'axios';

const axios = baseUrl => {
    const instance = _axios.create({

        // connected to the heroku
        baseURL: 'https://keepitsimple-snacksinvan.herokuapp.com/' || 'http://localhost:5000'
        //baseURL: baseUrl || 'http://localhost:5000'

    });
    return instance;
};

export { axios };

export default axios();