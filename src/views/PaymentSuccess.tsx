import { useParams } from "react-router-dom";

export default function PaymentSuccess() {
    const { orderId } = useParams();
    console.log(orderId);
    return <h3>Payment success</h3>;
}
