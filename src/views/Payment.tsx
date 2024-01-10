import { useAppSelector } from "../hooks/reduxHooks";

export default function Payment() {
    const itemToBuy = useAppSelector((state) => state.manage.itemToBuy);

    if (!itemToBuy) {
        return "No item to buy";
    }

    return (
        <div>
            Payment for {itemToBuy.name}. Price {itemToBuy.price}$
        </div>
    );
}
