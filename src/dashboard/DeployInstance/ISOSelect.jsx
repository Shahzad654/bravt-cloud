import { BsDisc } from "react-icons/bs";

const ISOSelect = ({ value, onValueChange }) => {
  const isLoading = false;

  const data = [
    {
      id: "1",
      name: "Ubuntu 20.04",
      description: "20.04 LTS x86_64",
      md5sum: "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
    },
    {
      id: "2",
      name: "Debian 11",
      description: "11 x86_64 Minimal",
      md5sum: "2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p1a",
    },
    {
      id: "3",
      name: "Fedora 38",
      description: "38 x86_64 Workstation",
      md5sum: "3c4d5e6f7g8h9i0j1k2l3m4n5o6p1a2b",
    },
    {
      id: "4",
      name: "CentOS Stream 9",
      description: "9 x86_64 Stream",
      md5sum: "4d5e6f7g8h9i0j1k2l3m4n5o6p1a2b3c",
    },
    {
      id: "5",
      name: "Arch Linux",
      description: "Rolling x86_64 Minimal",
      md5sum: "5e6f7g8h9i0j1k2l3m4n5o6p1a2b3c4d",
    },
    {
      id: "6",
      name: "Alpine Linux",
      description: "3.18.0 x86_64 Minimal",
      md5sum: "6f7g8h9i0j1k2l3m4n5o6p1a2b3c4d5e",
    },
    {
      id: "7",
      name: "OpenSUSE Leap",
      description: "15.5 x86_64 Minimal",
      md5sum: "7g8h9i0j1k2l3m4n5o6p1a2b3c4d5e6f",
    },
    {
      id: "8",
      name: "Manjaro",
      description: "23.0 x86_64 XFCE",
      md5sum: "8h9i0j1k2l3m4n5o6p1a2b3c4d5e6f7g",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid-layout">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="grid-item animate-pulse"
            style={{ backgroundColor: "#d1d5db", height: "100px" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid-layout">
      {data.map((item) => (
        <div
          key={item.id}
          className={`grid-item ${value === item.id ? "active" : ""}`}
          onClick={() => onValueChange(item.id)}
          style={{
            justifyContent: "normal",
            paddingLeft: "18px",
            paddingRight: "18px",
          }}
        >
          <BsDisc
            size={30}
            color={value === item.id ? "var(--primary-color)" : "gray"}
            style={{ flexShrink: 0 }}
          />

          <div
            className="content"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ fontSize: "14px" }}>{item.name}</span>
            <span
              style={{
                fontSize: "11px",
                color: "gray",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {item.id}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ISOSelect;
