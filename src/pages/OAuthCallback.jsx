import { parseAsBoolean, useQueryState } from "nuqs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageSpinner from "../components/PageSpinner";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const [token] = useQueryState("token");
  const [isNew] = useQueryState("is_new", parseAsBoolean);

  useEffect(() => {
    if (!token) return;
    localStorage.setItem("access_token", token);
    navigate(isNew ? "/billing-info" : "/instance");
  }, [token, isNew, navigate]);

  if (!token) {
    throw new Error("No token found!");
  }

  return <PageSpinner />;
}
