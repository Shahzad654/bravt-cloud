import { Flex, Layout } from "antd";
import ISOTable from "./ISOTable";
import CreateISOModal from "./AddISOModal";

const ISO = () => {
  return (
    <Layout style={{ backgroundColor: "white", padding: "20px 36px" }}>
      <Flex align="center" justify="space-between">
        <h2>ISO</h2>
        <CreateISOModal />
      </Flex>
      <ISOTable />
    </Layout>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default ISO;
