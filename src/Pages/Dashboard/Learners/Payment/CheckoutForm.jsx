import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link, useParams } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "@mui/material";
import useAuth from "../../../../hooks/useAuth";
import useSwal from "../../../../hooks/useSwal";

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
      // console.log(res.data);
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
      const res1 = await axiosSecure.patch(`/courses/${id}`, {
        numOfTotalEnrollment: 1,
      });
      // console.log(res.data);
      return [res.data, res1.data];
    },
    onSuccess: (data) => {
      const [res] = data;
      // console.log(res);
      if (res.insertedId) {
        useSwal("Wow!! Payment Completed", "success");
      }
    },
  });

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: data.price })
      .then((res) => {
        // console.log(res.data.clientSecret);
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
      // console.log("error", error);
      setError(error.message);
    } else {
      // console.log("payment method", paymentMethod);
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
      // console.log("confirm error", error);
    } else {
      // console.log("payment Intent", paymentIntent);
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
    <div className="bg-gray-50 rounded-md my-20 lg:w-1/2 p-4 md:p-16 mx-auto border-2 border-[#1c539f]">
      <div className="text-center">
        <h3 className="text-2xl md:text-4xl font-bold">Payment Details</h3>
        <p className="text-gray-400">
          Enter your card information below for this payment
        </p>
        <p className="py-4 font-bold">Amount Payable: ${data.price}</p>
        <p className="text-xs">
          (Use any{" "}
          <Link
            className="underline font-bold"
            to="https://stripe.com/docs/testing"
            target="_blank">
            stripe test
          </Link>{" "}
          card for payment)
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
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
          className="my-6 p-2 border"
        />
        <Button
          variant="contained"
          type="submit"
          disabled={!stripe || !clientSecret}>
          Pay
        </Button>
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <div className="text-center">
            <p className="text-green-600">
              Your transaction id: {transactionId}
            </p>
            <Link to="/">
              <Button variant="contained" sx={{ my: 2 }}>
                Return to Home
              </Button>
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
