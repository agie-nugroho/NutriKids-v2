import axios from "axios";

const ApiUser = axios.create({
    baseURL: 'http://localhost:3000'
})

export default ApiUser;