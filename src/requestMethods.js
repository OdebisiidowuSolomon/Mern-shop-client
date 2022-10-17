import axios from "axios";

const BASE_URL = 'http://localhost:5000/api/'
// const BASE_URL = 'https://mern-shop-api.odebisiidowusol.repl.co/api/'

let TOKEN;
if(localStorage.getItem('persist:root')) {
     TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser?.accessToken || ''
    // const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')|| {}).user).currentUser?.accessToken || ''
} else  {
    TOKEN = ""
}

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        "token": `Bearer ${TOKEN}`
    }
})