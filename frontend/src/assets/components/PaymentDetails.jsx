import getUser from "../../utils/getUser";
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from "react-redux";
import getToken from "../../utils/getToken";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function PaymentDetails({total, shipping}) {

    const carts = useSelector((state) => state.carts?.cartItems) || [];
    const navigate = useNavigate();

    const token = getToken();
    let user = [];

    useEffect(() => {
        user = getUser() || null;
    }, [])

    shipping = total == 0 ? 0 : shipping;

    // payment integration
    async function makePayment() {
        try {
            if(user) {
                const stripe = await loadStripe("pk_test_51PL0vKSB8s66qgzb05jS33UvndQrSMa2IglMqm0E0EblWo2NWrY8yf09EEwAiHa0wUWlIIjYvEvG4qYqXqeLNJTW00ZHs3oO28");

                const productsWithoutImage = carts.map(({ image, ...rest }) => rest);

                const body = {
                    products: productsWithoutImage
                }

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL_PRODUCTION}/user/checkout`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body),
                });

                const session = await response.json();

                if (!session.id) {
                    alert("Session ID is missing from the response");
                    return;
                }

                if(response.ok) {
                    await stripe.redirectToCheckout({
                        sessionId: session.id,
                    });
                }
            } else {
            navigate('/login');
            }
        } catch (err) {
            alert(err)
        }
    }
    
  return (
    <>
        <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Subtotal</p>
            <p className="text-lg font-semibold text-gray-900"><span className="text-xs font-normal text-gray-400">INR </span>{total}.00</p>
            </div>
            <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Shipping</p>
            <p className="text-lg font-semibold text-gray-900"><span className="text-xs font-normal text-gray-400">INR </span>{shipping}.00</p>
            </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900"><span className="text-xs font-normal text-gray-400">INR </span>{total + shipping}.00</p>
        </div>

        <div className="mt-6 text-center">
            <button
                disabled={total === 0}
                onClick={makePayment}
                className="group inline-flex items-center justify-center px-6 py-4 text-lg font-semibold transition-all duration-200 ease-in-out focus:shadow
                my-4 w-full rounded-md bg-cyan-500 disabled:bg-cyan-200 hover:bg-cyan-700 text-white"
            >
                Checkout
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            </button>
        </div>
    </>
  );
}
