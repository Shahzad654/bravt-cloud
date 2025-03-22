import { Typography } from "antd"
import DashHeader from "../../components/DashHeader"
import AffiliateInput from "./AffiliateInput"
import AffiliateStats from "./AffiliateStats"

export default function Affiliate() {
  return (
    <>
      <DashHeader />
      <div style={{ padding: "30px" }}>
        <Typography.Title
          level={2}
          style={{ marginBottom: "2rem", color: "#1a1a1a" }}
        >
          Referral Program
        </Typography.Title>

        <AffiliateStats />
        <AffiliateInput />
      </div>
    </>
  )
}
