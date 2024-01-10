import { useItems } from "./hooks/useItems";

function App() {
    const items = useItems();

    console.log(items);

    return <div>hi all</div>;
}

export default App;
