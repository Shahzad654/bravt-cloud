import { parseAsBoolean, useQueryState } from "nuqs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageSpinner from "../components/PageSpinner";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const [token] = useQueryState("token");
  const [isAdmin] = useQueryState("is_admin", parseAsBoolean);

  useEffect(() => {
    if (!token) return;
    localStorage.setItem("access_token", token);
    navigate(isAdmin ? "/dashboard" : "/instance");
  }, [token, navigate, isAdmin]);

  if (!token) {
    throw new Error("No token found!");
  }

  return <PageSpinner />;
}
