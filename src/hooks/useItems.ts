import { useEffect, useState } from "react";
import itemsAPI from "../api/items";
import { useLoading } from "./useLoading";
import { Item } from "../types/item";

export const useItems = () => {
    const [items, setItems] = useState<Item[]>([]);
    const { setLoading } = useLoading();

    useEffect(() => {
        setLoading(true);
        itemsAPI
            .getItems()
            .then((response) => {
                if (response?.status === 200) {
                    setItems(response.data);
                } else {
                    console.log("Error on getting items");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return items;
};
