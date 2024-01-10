import { useItems } from "../hooks/useItems";
import { Item } from "../types/item";
import { useAppDispatch } from "../hooks/reduxHooks";
import { setItemToBuy } from "../store/manage";
import { useNavigate } from "react-router-dom";

export default function ListOfItems() {
    const navigate = useNavigate();
    const items = useItems();
    const dispatch = useAppDispatch();

    if (items.length === 0) {
        return <main>No data</main>;
    }

    const buy = (item: Item) => {
        dispatch(setItemToBuy(item));
        navigate("/payment");
    };

    return (
        <main>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.status}</td>
                            <td>
                                <button onClick={() => buy(item)}>Buy</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
