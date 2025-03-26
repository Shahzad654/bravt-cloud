import styled from "styled-components"
import Logo from "../assets/images/logo.png"
import { Alert, Badge, Button, Layout, Popover, Tag, theme } from "antd"
import { Link } from "react-router-dom"
import { RiMoneyDollarCircleLine } from "react-icons/ri"
import { useGetSessionQuery } from "../redux/apis/auth"
import UserMenu from "./UserMenu"
import { formatPrice } from "../utils/helpers"
import NotificationsDrawer from "./NotificationsDrawer"
import { useState } from "react"
import {
  notificationUtil,
  useListUnseenNotificationsCountQuery
} from "../redux/apis/notifications"
import { LuBell } from "react-icons/lu"
import { useDispatch } from "react-redux"

const { Header } = Layout

const DashHeader = () => {
  const { data } = useGetSessionQuery()

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const [open, setOpen] = useState(false)

  const { data: count = 0 } = useListUnseenNotificationsCountQuery()

  const dispatch = useDispatch()

  return (
    <>
      <StyledHeader style={{ background: colorBgContainer }}>
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <NavLinks>
          <NotificationsDrawer open={open} onClose={() => setOpen(false)} />

          <Badge
            count={count}
            size="default"
            style={{ fontSize: "8px", cursor: "pointer" }}
            onClick={() => {
              setOpen(true)
              dispatch(
                notificationUtil.updateQueryData(
                  "listUnseenNotificationsCount",
                  undefined,
                  () => 0
                )
              )
            }}
          >
            <div
              className="icon-border"
              style={{
                cursor: "pointer",
                backgroundColor: "var(--bg-color)",
                color: "var(--primary-color)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px"
              }}
            >
              <LuBell size={18} />
            </div>
          </Badge>

          <Popover
            content={
              <div style={{ width: "250px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "20px"
                  }}
                >
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "600"
                    }}
                  >
                    Balance
                  </p>

                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "600"
                    }}
                  >
                    {formatPrice(data.credits, 3)}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "20px"
                  }}
                >
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "600"
                    }}
                  >
                    Status
                  </p>

                  <Tag color={data.isSubscribed ? "green" : "blue"}>
                    {data.isSubscribed ? "Subscribed" : "Normal"}
                  </Tag>
                </div>

                <Link to="/payment">
                  <Button type="primary" style={{ width: "100%" }}>
                    Recharge
                  </Button>
                </Link>
              </div>
            }
          >
            <div className="link">
              <div className="icon-border">
                <RiMoneyDollarCircleLine className="icon" />
              </div>
              {formatPrice(data.credits, 3, "decimal")}
            </div>
          </Popover>

          <UserMenu />
        </NavLinks>
      </StyledHeader>
      {data?.suspended && (
        <div style={{ padding: "16px 24px 0 24px" }}>
          <Alert
            message="Your account has been suspended."
            description="Please contact support if you believe this is a mistake or need assistance."
            type="error"
            showIcon
            action={
              <Link to="/tickets">
                <Button danger size="small">
                  Contact Support
                </Button>
              </Link>
            }
          />
        </div>
      )}
    </>
  )
}

export default DashHeader

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;

  .logo {
    display: flex;
    align-items: center;

    img {
      width: 120px;
      height: auto;
    }
  }
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  .link {
    display: flex;
    align-items: center;
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;

    .icon-border {
      width: 32px;
      height: 32px;
      background-color: var(--bg-color);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 8px;
    }

    .icon {
      width: 20px;
      height: 20px;
    }
  }
`
