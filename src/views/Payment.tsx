import { useAppSelector } from "../hooks/reduxHooks";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

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

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt34" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
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
