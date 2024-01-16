import axios from "axios";

const client = axios.create({
    //baseURL: "http://localhost:3000",
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "ngrok-skip-browser-warning": "69420",
    },
});

export default client;
