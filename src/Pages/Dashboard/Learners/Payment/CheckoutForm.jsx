import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import {
  CardElement,
  PaymentElement,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "@mui/material";

const CheckoutForm = () => {
  // const [clientSecret, clientSecret] = useState("");
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const { id } = useParams();
  const { data: price } = useQuery({
    queryKey: ["price"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${id}`);
      return res.data.price;
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  console.log(price);

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        />
        <Button variant="contained" type="submit" disabled={!stripe}>
          Pay
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
