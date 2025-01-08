import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./redux/apis/userSlice";
// import Navbar from "./components/Navbar";
// import DashNav from "./components/DashNav";
// import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import BillingInfo from "./pages/BillingInfo";
import Login from "./pages/Login";
import Instance from "./dashboard/Instance";
import Network from "./dashboard/Netwrok";
import Storage from "./dashboard/Storage";
import Snapshot from "./dashboard/Snapshot";
import Firewall from "./dashboard/Firewall";
import Images from "./dashboard/Images";
import Monitoring from "./dashboard/Monitoring";
import Payment from "./dashboard/Payment";
import Ticket from "./dashboard/Ticket";
import LinkCode from "./dashboard/LinkCode";
import ResourceRecord from "./dashboard/ResourceRecord";
import Billing from "./dashboard/Billing";
import Profile from "./dashboard/Profile";
import Authentication from "./dashboard/Authentication";
import DeployInstance from "./dashboard/DeployInstance";
import LoggedOut from "./providers/LoggedOut";
import ProtectedLayout from "./providers/ProtectedLayout";
import InstanceDetails from "./dashboard/InstanceDetails";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      {/* <DashNav/>
    <Instance/> */}
      {/* <Home/> */}
      {/* <Signup/> */}
      {/* <Login/> */}
      <Routes>
        <Route
          path="/"
          element={
            <LoggedOut>
              <Login />
            </LoggedOut>
          }
        />

        <Route
          path="/signup"
          element={
            <LoggedOut>
              <Signup />
            </LoggedOut>
          }
        />

        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:userId" element={<ResetPassword />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/instance" element={<Instance />} />
          <Route path="/instance/:instanceId" element={<InstanceDetails />} />
          <Route path="/network" element={<Network />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/snapshot" element={<Snapshot />} />
          <Route path="/firewall" element={<Firewall />} />
          <Route path="/images" element={<Images />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/link-code" element={<LinkCode />} />
          <Route path="/resource-record" element={<ResourceRecord />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/deploy" element={<DeployInstance />} />
          <Route path="/billing-info" element={<BillingInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
