import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route, useLocation } from "react-router-dom";

import LoggedOut from "./providers/LoggedOut";
import DashboardLayout from "./providers/DashboardLayout";
import NotFound from "./components/NotFound";
import ProtectedLayout from "./providers/ProtectedLayout";

import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import BillingInfo from "./pages/BillingInfo";
import Login from "./pages/Login";
import Instance from "./dashboard/Instance";
import Network from "./dashboard/Network";
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
import InstanceDetails from "./dashboard/InstanceDetails";
import FirewallDetails from "./dashboard/FirewallDetails";
import CreateSnapshot from "./dashboard/CreateSnapshot";
import AddSHH from "./dashboard/ShhDetails/AddSHH";
import SSHKeyTable from "./dashboard/ShhDetails";
import UpdateSHH from "./dashboard/ShhDetails/UpadateSHH";
import OAuthCallback from "./pages/OAuthCallback";
import VerifyCode from "./pages/VerifyCode";
import SetupPassword from "./pages/SetupPassword";
import ISO from "./dashboard/ISO";
import { useEffect } from "react";
import AdminLayout from "./providers/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminPlans from "./admin/AdminPlans";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route element={<LoggedOut />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
      </Route>

      <Route path="/oauth-callback" element={<OAuthCallback />} />

      <Route element={<ProtectedLayout />}>
        <Route path="/billing-info" element={<BillingInfo />} />
        <Route path="/setup-password" element={<SetupPassword />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/instance" element={<Instance />} />
        <Route path="/instance/deploy" element={<DeployInstance />} />
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
        <Route path="/ssh-keys" element={<SSHKeyTable />} />
        <Route path="/ssh-keys/add" element={<AddSHH />} />
        <Route path="/ssh-keys/:id" element={<UpdateSHH />} />
        <Route path="/iso" element={<ISO />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/plans" element={<AdminPlans />} />
      </Route>

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
