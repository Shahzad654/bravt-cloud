import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { authUtil, useGetSessionQuery } from "../redux/apis/auth";
import { useGetStripePaymentIntentMutation } from "../redux/apis/transactions";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

function Form({ credits }) {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");

  const { data: user } = useGetSessionQuery();
  const [getPaymentIntent] = useGetStripePaymentIntentMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setStatus("loading");

    const { data, error } = await getPaymentIntent({ credits });

    if (error) {
      message.error(error.data.message);
      setStatus("error");
      return;
    }

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setStatus("error");
      message.error(result.error.message);
      return;
    }

    setStatus("success");

    if (result.paymentIntent.status === "requires_capture") {
      dispatch(
        authUtil.updateQueryData("getSession", undefined, (draft) => {
          Object.assign(draft, {
            credits: Number(user.credits) + Number(credits),
          });
        })
      );

      navigate("/instance");
    }
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit}>
      <CardElement
        onReady={(e) => e.focus()}
        options={{
          hidePostalCode: true,
          disabled: status === "loading",
          classes: {
            base: "stripe-card-element",
            focus: "stripe-card-element-focused",
            invalid: "stripe-card-element-invalid",
          },
        }}
      />
      <button
        className="btn"
        disabled={status === "loading"}
        style={{ width: "100%", height: "44px", marginTop: "20px" }}
      >
        {status === "loading" ? (
          <CircularProgress size={16} style={{ color: "white" }} />
        ) : (
          `Pay $${credits}`
        )}
      </button>
    </form>
  );
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function PaymentForm({ credits }) {
  return (
    <Elements stripe={stripePromise}>
      <Form credits={credits} />
    </Elements>
  );
}
