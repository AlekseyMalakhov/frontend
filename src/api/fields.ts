import client from "./client";

const getItems = () => {
    return client
        .get(`/items`)
        .then((response) => {
            return response;
        })
        .catch((error) => error.response);
};

const itemsAPI = {
    getItems,
};

export default itemsAPI;
