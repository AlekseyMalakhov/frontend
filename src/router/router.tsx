import { createBrowserRouter } from "react-router-dom";
import ListOfItems from "../views/ListOfItems";
import Payment from "../views/Payment";
import PaymentSuccess from "../views/PaymentSuccess";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ListOfItems />,
    },
    {
        path: "payment",
        element: <Payment />,
    },
    {
        path: "payment-success/:orderId",
        element: <PaymentSuccess />,
    },
]);

export default router;
