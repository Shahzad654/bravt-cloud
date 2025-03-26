import { Drawer, Flex, Typography } from "antd";
import {
  useListNotificationsQuery,
  useListUnseenNotificationsCountQuery,
} from "../redux/apis/notifications";
import { format } from "date-fns";

export default function NotificationsDrawer({ open, onClose }) {
  const { data: unseenCount = 0 } = useListUnseenNotificationsCountQuery();
  const { data = [] } = useListNotificationsQuery(undefined, {
    skip: !open,
  });

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={`Notifications (${unseenCount ?? 0})`}
    >
      {data.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </Drawer>
  );
}

function Notification({ notification }) {
  return (
    <div>
      <Flex justify="space-between" align="start">
        <p style={{ fontSize: "16px", fontWeight: "600" }}>
          {notification.title}
        </p>
        <p style={{ fontSize: "11px", color: "gray", whiteSpace: "nowrap" }}>
          {format(notification.createdAt, "PPP")}
        </p>
      </Flex>
      <Typography.Paragraph
        ellipsis={{
          rows: 3,
          expandable: "collapsible",
        }}
        style={{
          fontSize: "13px",
          color: "gray",
          whiteSpace: "pre-wrap",
        }}
      >
        {notification.message}
      </Typography.Paragraph>
    </div>
  );
}
