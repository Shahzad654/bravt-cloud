import { Button, Input, Table } from "antd";

import { useState } from "react";
// import moment from "moment";
const Tags = () => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

//   const handleAddTag = () => {
//     if (tagInput.trim()) {
//       setTags([
//         ...tags,
//         {
//           key: tags.length,
//           tag: tagInput,
//           dateAdded: moment().format("YYYY-MM-DD HH:mm:ss"),
//         },
//       ]);
//       setTagInput("");
//     }
//   };

  const columns = [
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Date Added",
      dataIndex: "dateAdded",
      key: "dateAdded",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ padding: "20px" }}>
      <h4>Add Tag</h4>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
        
          <Input
            placeholder='Add Tag'
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            style={{ width: "200px", marginRight: "10px" }}
          />
          <Button type='primary'>
            Add
          </Button>
        </div>
        <h4>Existing Tags</h4>
        <Table
          dataSource={tags}
          columns={columns}
          pagination={{ pageSize: 5 }}
          style={{ marginTop: "20px" }}
        />
      </div>
    </div>
  );
};

export default Tags;
