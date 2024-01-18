import { useAppSelector } from "../hooks/reduxHooks";
import { useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import itemsAPI from "../api/items";
import { useLoading } from "../hooks/useLoading";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE);

const appearance = {
    theme: "stripe" as const,
};

/*
Stripe implementation
1)	When user pushes button “Pay” he will be redirected to /payment page. When this page loads, on mount, it makes POST request to /payment-intent URL with body containing id 
of the order. 
2)	Our server receives this request and checks if this order is paid or not. If it is paid earlier our server returns error 409 with text “Item id=… has been paid already”. 
If it is not paid, server runs  stripe.paymentIntents.create() function provided by Stripe library. This library function sends request to the Stripe server and 
returns clientSecret. Server sends this clientSecret back to the client.
3)	Browser receives client secret and displays the form to enter payment card data – this form is provided by Stripe React library (Stripe Elements). User enters 
card data and pushes Pay button. Form internally takes clientSecret, card data and sends it to Stripe server (using internal Stripe library function).
4)	Stripe validates user input and tries to pay. If succeed it returns 200 response and stripe library redirects user to /payment-success/${itemToBuy.id} page. 
At the same time Stripe server calls webhook POST /succeed with orderId in its body. Our server takes orderId and updates payment status to “paid” in DB for this orderId.
5)	/payment-success/${itemToBuy.id} page shows user “Payment success. Status of order is updating…” message and on mount makes GET /items/check-if-paid/${id} request 
to our server and check if order status is updated for this orderId. If order status is paid – it shows to user Success message “Order status successfully updated. 
Please return to the main page”. If not, it continues to show user “Status of order is updating…” waits for 3 seconds and makes the same request again. If request 
returns error – page shows error information.
*/

export default function Payment() {
    const itemToBuy = useAppSelector((state) => state.manage.itemToBuy);
    const [clientSecret, setClientSecret] = useState("");
    const { setLoading } = useLoading();

    //prevent running useEffect twice in dev mode (when strict mode is on)
    const init = useRef(false);

    useEffect(() => {
        if (!itemToBuy || init.current) {
            return;
        }
        init.current = true;
        setLoading(true);
        itemsAPI
            .createPaymentIntent(itemToBuy)
            .then((response) => {
                if (response?.status === 201) {
                    setClientSecret(response.data.clientSecret);
                } else {
                    console.log("Error on creating payment intent");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    if (!itemToBuy) {
        return "No item to buy";
    }

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div>
            <div>
                Payment for {itemToBuy.name}. Price {itemToBuy.price}$
            </div>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm itemToBuy={itemToBuy} />
                </Elements>
            )}
        </div>
    );
}
