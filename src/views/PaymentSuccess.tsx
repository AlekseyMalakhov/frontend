import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import itemsAPI from "../api/items";

export default function PaymentSuccess() {
    const { orderId } = useParams();
    const [paid, setPaid] = useState();
    const [error, setError] = useState("");

    const checkIfPaid = () => {
        if (!orderId) {
            return;
        }
        itemsAPI
            .checkIfPaid(orderId)
            .then((response) => {
                if (response.status === 200) {
                    //if paid status has not been updated yet - check it again in 3 seconds
                    if (!response.data.paid) {
                        setTimeout(() => checkIfPaid(), 3000);
                    } else {
                        //if updated - set paid status
                        setPaid(response.data.paid);
                    }
                } else {
                    setError("Something went wrong - can't update order status. Please try to refresh this page");
                }
            })
            .catch(() => {});
    };

    useEffect(() => {
        checkIfPaid();
    }, []);
    return (
        <div>
            <h3>Payment success</h3>
            {paid ? (
                <div>
                    Order status successfully updated. Please return to the <Link to="/">main page</Link>
                </div>
            ) : (
                <div>Please wait - order status is updating...</div>
            )}
            <div>{error}</div>
        </div>
    );
}
