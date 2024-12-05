"use client";

import { SessionProvider as Provider } from "next-auth/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export function SessionProvider({ children, session }) {
    return (
        <Provider session={session}>
            <Elements stripe={stripePromise}>{children}</Elements>
        </Provider>
    );
}
