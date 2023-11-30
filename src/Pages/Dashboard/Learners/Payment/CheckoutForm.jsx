import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "@mui/material";
import useAuth from "../../../../hooks/useAuth";

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const { id } = useParams();

  const { data: price } = useQuery({
    queryKey: ["price"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${id}`);
      return res.data.price;
    },
  });
  console.log(typeof price);

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment by card

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "annonymous",
            email: user?.email || "annonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error", error);
    } else {
      console.log("payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded")
        setTransactionId(paymentIntent.id);
    }
  };
  console.log(price);

  return (
    <div>
      <div>
        <h3 className="lg:text-4xl font-bold">Payment Details</h3>
        <p>Enter your card information below for this payment</p>
        <p>Price: ${price}</p>
      </div>
      <form onSubmit={handleSubmit} className="w-1/2">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          className="m-6 p-2 border"
        />
        <Button
          variant="contained"
          type="submit"
          disabled={!stripe || !clientSecret}>
          Pay
        </Button>
        <p className="text-red-600">{error}</p>
        <p className="text-green-600">Your transaction id: {transactionId}</p>
      </form>
    </div>
  );
};

export default CheckoutForm;
