import { createBrowserRouter } from "react-router-dom";
import ListOfItems from "../views/ListOfItems";
import Payment from "../views/Payment";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ListOfItems />,
    },
    {
        path: "payment",
        element: <Payment />,
    },
]);

export default router;
