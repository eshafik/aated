import { Card, Col, Row } from "antd";
import SettingCard from "./component/SettingCard";

const Members = () => {
  const BATCH_DATA = [
    {
      batch: "Batch-12",
      name: "Abu Shyed Hemel",
      position: "CEO",
    },
    {
      batch: "Batch-12",
      name: "Abu Shyed Hemel",
      position: "CEO",
    },
    {
      batch: "Batch-12",
      name: "Abu Shyed Hemel",
      position: "CEO",
    },
    {
      batch: "Batch-12",
      name: "Abu Shyed Hemel",
      position: "CEO",
    },
    {
      batch: "Batch-12",
      name: "Abu Shyed Hemel",
      position: "CEO",
    },
    {
      batch: "Batch-12",
      name: "Abu Shyed Hemel",
      position: "CEO",
    },
  ];

  const tabList = [
    {
      key: "activeMembers",
      label: "Active Members",
    },
    {
      key: "pendingRequest",
      label: "Pending Request",
    },
  ];
  return (
    <Card tabList={tabList} className="h-full w-full">
      <Row gutter={[12, 12]}>
        {BATCH_DATA.map((item, i) => (
          <Col>
            <SettingCard
              key={i}
              name={item.name}
              position={item.position}
              batch={item.batch}
            />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default Members;
