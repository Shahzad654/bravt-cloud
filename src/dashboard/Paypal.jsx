import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { api } from "../utils/api";
import { setUser } from "../redux/apis/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Paypal = ({ credits }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.REACT_APP_PAYPAL_PUBLIC_KEY,
      }}
    >
      <PayPalButtons
        createOrder={async () => {
          const { data } = await api.post("/payment/paypal", { credits });
          return data.orderID;
        }}
        onApprove={async (data) => {
          await api.post("/payment/paypal/capture", {
            orderID: data.orderID,
          });
          const newUser = { ...user, credit: user.credit + credits };
          dispatch(setUser(newUser));
          navigate("/instance");
        }}
        onError={() => {
          const newUser = { ...user, credit: user.credit - credits };
          dispatch(setUser(newUser));
        }}
        onCancel={async (data) => {
          await api.post(`/payment/paypal/cancel/${data.orderID}`);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default Paypal;
