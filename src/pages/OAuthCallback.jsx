import { parseAsBoolean, useQueryState } from "nuqs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageSpinner from "../components/PageSpinner";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const [token] = useQueryState("token");
  const [isNew] = useQueryState("is_new", parseAsBoolean);
  const [isAdmin] = useQueryState("is_admin", parseAsBoolean);

  useEffect(() => {
    if (!token) return;
    localStorage.setItem("access_token", token);
    navigate(isNew ? "/billing-info" : isAdmin ? "/dashboard" : "/instance");
  }, [token, isNew, navigate, isAdmin]);

  if (!token) {
    throw new Error("No token found!");
  }

  return <PageSpinner />;
}
