import axios from "axios";

const ApiUser = axios.create({
    baseURL: 'http://localhost:8000'
})

export default ApiUser;