import { parseAsBoolean, useQueryState } from "nuqs"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PageSpinner from "../components/PageSpinner"
import { setAccessToken } from "../utils/api"

export default function OAuthCallback() {
  const navigate = useNavigate()
  const [token] = useQueryState("token")
  const [isAdmin] = useQueryState("is_admin", parseAsBoolean)

  useEffect(() => {
    if (!token) return
    setAccessToken(token)
    if (isAdmin) window.location.replace(process.env.REACT_APP_ADMIN_URL)
    else navigate("/instance")
  }, [token, navigate, isAdmin])

  if (!token) {
    throw new Error("No token found!")
  }

  return <PageSpinner />
}
