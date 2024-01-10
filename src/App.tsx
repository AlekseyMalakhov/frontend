import { useItems } from "./hooks/useItems";

function App() {
    const items = useItems();

    if (items.length === 0) {
        return <main>No data</main>;
    }

    return (
        <main>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Status</th>
                </tr>
                {items.map((item) => (
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.status}</td>
                    </tr>
                ))}
            </table>
        </main>
    );
}

export default App;
