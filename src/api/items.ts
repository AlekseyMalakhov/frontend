import { Item } from "../types/item";
import client from "./client";

const getItems = () => {
    return client
        .get(`/items`)
        .then((response) => {
            return response;
        })
        .catch((error) => error.response);
};

const createPaymentIntent = (data: Item) => {
    return client
        .post(`/payment-intent`, data)
        .then((response) => {
            return response;
        })
        .catch((error) => error.response);
};

const checkIfPaid = (id: string) => {
    return client
        .get(`/items/check-if-paid/${id}`)
        .then((response) => {
            return response;
        })
        .catch((error) => error.response);
};

const itemsAPI = {
    getItems,
    createPaymentIntent,
    checkIfPaid,
};

export default itemsAPI;
