import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  return {
    define: {
      "process.env.REACT_APP_SNAPSHOT_COST": JSON.stringify(
        env.REACT_APP_SNAPSHOT_COST
      ),
      "process.env.REACT_APP_API_URL": JSON.stringify(env.REACT_APP_API_URL),
      "process.env.REACT_APP_ADMIN_URL": JSON.stringify(env.REACT_APP_ADMIN_URL)
    },
    plugins: [react()]
  }
})
