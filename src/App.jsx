import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./redux/apis/userSlice";

import LoggedOut from "./providers/LoggedOut";
import DashboardLayout from "./providers/DashboardLayout";
import NotFound from "./components/NotFound";

// Lazy loaded components
const Signup = lazy(() => import("./pages/Signup"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const BillingInfo = lazy(() => import("./pages/BillingInfo"));
const Login = lazy(() => import("./pages/Login"));
const Instance = lazy(() => import("./dashboard/Instance"));
const Network = lazy(() => import("./dashboard/Network"));
const Storage = lazy(() => import("./dashboard/Storage"));
const Snapshot = lazy(() => import("./dashboard/Snapshot"));
const Firewall = lazy(() => import("./dashboard/Firewall"));
const Images = lazy(() => import("./dashboard/Images"));
const Monitoring = lazy(() => import("./dashboard/Monitoring"));
const Payment = lazy(() => import("./dashboard/Payment"));
const Ticket = lazy(() => import("./dashboard/Ticket"));
const LinkCode = lazy(() => import("./dashboard/LinkCode"));
const ResourceRecord = lazy(() => import("./dashboard/ResourceRecord"));
const Billing = lazy(() => import("./dashboard/Billing"));
const Profile = lazy(() => import("./dashboard/Profile"));
const Authentication = lazy(() => import("./dashboard/Authentication"));
const DeployInstance = lazy(() => import("./dashboard/DeployInstance"));
const InstanceDetails = lazy(() => import("./dashboard/InstanceDetails"));
const FirewallDetails = lazy(() => import("./dashboard/FirewallDetails"));
const CreateSnapshot = lazy(() => import("./dashboard/CreateSnapshot"));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoggedOut />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:userId" element={<ResetPassword />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/instance" element={<Instance />} />
          <Route path="/instance/:instanceId" element={<InstanceDetails />} />
          <Route path="/network" element={<Network />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/snapshot" element={<Snapshot />} />
          <Route path="/snapshot/create" element={<CreateSnapshot />} />
          <Route path="/firewall" element={<Firewall />} />
          <Route path="/firewall/:firewallId" element={<FirewallDetails />} />
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

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
