import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./redux/apis/userSlice";
import Navbar from "./components/Navbar";
import DashNav from "./components/DashNav";
import Home from "./pages/Home";
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
import PrivateRoute from "./providers/PrivateRoute";
import LoggedOut from "./providers/LoggedOut";

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

        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:userId" element={<ResetPassword />} />
        <Route
          path="/instance"
          element={
            <PrivateRoute>
              <Instance />
            </PrivateRoute>
          }
        />
        <Route
          path="/network"
          element={
            <PrivateRoute>
              <Network />
            </PrivateRoute>
          }
        />
        <Route
          path="/storage"
          element={
            <PrivateRoute>
              <Storage />
            </PrivateRoute>
          }
        />
        <Route
          path="/snapshot"
          element={
            <PrivateRoute>
              <Snapshot />
            </PrivateRoute>
          }
        />
        <Route
          path="/firewall"
          element={
            <PrivateRoute>
              <Firewall />
            </PrivateRoute>
          }
        />
        <Route
          path="/images"
          element={
            <PrivateRoute>
              <Images />
            </PrivateRoute>
          }
        />
        <Route
          path="/monitoring"
          element={
            <PrivateRoute>
              <Monitoring />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
        <Route
          path="/ticket"
          element={
            <PrivateRoute>
              <Ticket />
            </PrivateRoute>
          }
        />
        <Route
          path="/link-code"
          element={
            <PrivateRoute>
              <LinkCode />
            </PrivateRoute>
          }
        />
        <Route
          path="/resource-record"
          element={
            <PrivateRoute>
              <ResourceRecord />
            </PrivateRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <PrivateRoute>
              <Billing />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/authentication"
          element={
            <PrivateRoute>
              <Authentication />
            </PrivateRoute>
          }
        />
        <Route
          path="/deploy"
          element={
            <PrivateRoute>
              <DeployInstance />
            </PrivateRoute>
          }
        />
        <Route
          path="/billing-info"
          element={
            <PrivateRoute>
              <BillingInfo />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
