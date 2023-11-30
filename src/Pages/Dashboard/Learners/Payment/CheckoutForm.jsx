import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
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
  // console.log(id);

  const { data = [] } = useQuery({
    queryKey: ["price"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courses/${id}`);
      console.log(res.data);
      return res.data;
    },
  });

  // console.log(data);
  const {
    _id,
    title,
    instructor,
    instructorImage,
    ratings,
    numOfRatingProviders,
    numOfTotalEnrollment,
    price,
    image,
    description,
  } = data;

  const { mutate } = useMutation({
    mutationFn: async (item) => {
      const res = await axiosSecure.post("/payments", item);
      return res.data;
    },
  });

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: data.price })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [data.price, axiosSecure]);

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

      const items = {
        courseId: _id,
        title,
        instructor,
        instructorImage,
        ratings,
        numOfRatingProviders,
        numOfTotalEnrollment,
        price,
        image,
        description,
        learnersName: user.displayName,
        learnerEmail: user.email,
        transactionId: paymentIntent.id,
      };
      mutate(items);
    }
  };

  return (
    <div>
      <div>
        <h3 className="lg:text-4xl font-bold">Payment Details</h3>
        <p>Enter your card information below for this payment</p>
        <p>Price: ${data.price}</p>
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
        {transactionId && (
          <p className="text-green-600">Your transaction id: {transactionId}</p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
