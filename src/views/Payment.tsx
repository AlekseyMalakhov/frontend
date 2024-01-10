import { useAppSelector } from "../hooks/reduxHooks";
import { useState, useEffect } from "react";
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

export default function Payment() {
    const itemToBuy = useAppSelector((state) => state.manage.itemToBuy);
    const [clientSecret, setClientSecret] = useState("");
    const { setLoading } = useLoading();

    useEffect(() => {
        if (!itemToBuy) {
            return;
        }
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
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}
