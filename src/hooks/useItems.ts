import { useEffect, useState } from "react";
import itemsAPI from "../api/fields";

export const useItems = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        itemsAPI
            .getItems()
            .then((response) => {
                if (response?.status === 200) {
                    setItems(response.data);
                } else {
                    console.log("Error on getting items");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return items;
};
