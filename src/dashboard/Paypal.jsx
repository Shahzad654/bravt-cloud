import { message } from "antd";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authUtil, useGetSessionQuery } from "../redux/apis/auth";
import {
  useCapturePaypalOrderMutation,
  useCreatePaypalOrderMutation,
  useCancelPaypalOrderMutation,
} from "../redux/apis/transactions";
import { CircularProgress } from "@mui/material";

const Paypal = ({ credits }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user } = useGetSessionQuery();

  const [createPaypalOrder] = useCreatePaypalOrderMutation();
  const [capturePaypalOrder] = useCapturePaypalOrderMutation();
  const [cancelOrder] = useCancelPaypalOrderMutation();

  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return (
      <div
        style={{
          padding: "20px 0",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={20} color="primary" />
      </div>
    );
  }

  return (
    <PayPalButtons
      key={credits}
      createOrder={async () => {
        const { data, error } = await createPaypalOrder({ credits });
        if (error) {
          message.error(error.data.message);
          throw error;
        }
        return data.orderID;
      }}
      onApprove={async ({ orderID }) => {
        const { error } = await capturePaypalOrder(orderID);
        if (error) {
          message.error(error.data.message);
          throw error;
        }

        dispatch(
          authUtil.updateQueryData("getSession", undefined, (draft) => {
            Object.assign(draft, {
              credits: Number(user.credits) + Number(credits),
            });
          })
        );

        navigate("/instance");
      }}
      onError={() => {
        dispatch(
          authUtil.updateQueryData("getSession", undefined, (draft) => {
            Object.assign(draft, {
              credits: Number(user.credits) - Number(credits),
            });
          })
        );
      }}
      onCancel={async (data) => cancelOrder(data.orderID)}
    />
  );
};

export default Paypal;
