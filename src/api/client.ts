import axios from "axios";

const client = axios.create({
    //baseURL: "http://localhost:3000",
    baseURL: "https://6487-188-69-11-194.ngrok-free.app",
    headers: {
        "ngrok-skip-browser-warning": "69420",
    },
});

export default client;
