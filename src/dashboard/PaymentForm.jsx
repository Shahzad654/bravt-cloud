import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { api } from "../utils/api";
import { setUser } from "../redux/apis/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { user } = useSelector((state) => state.user);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setStatus("loading");

    const { data } = await api.post("/payment/stripe", { credits });

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setStatus("error");
      setSnackbar({
        open: true,
        severity: "error",
        message: result.error.message,
      });
    } else if (result.paymentIntent.status === "requires_capture") {
      setStatus("success");
      const newUser = { ...user, credit: user.credit + credits };
      dispatch(setUser(newUser));
      setSnackbar({
        open: true,
        severity: "success",
        message: "Payment successful!",
      });

      navigate("/instance");
    } else {
      setStatus("success");
    }
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
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
