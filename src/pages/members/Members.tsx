import { Card, Col, Row, Select, Spin } from "antd";
import SettingCard from "./component/SettingCard";
import { useQuery } from "react-query";
import { membersAPI } from "../../libs/api/membersAPI";
import Post from "../post/Post";

const Members = () => {
  const { data: memberData, isLoading } = useQuery(["members-list"], () =>
    membersAPI.membersList()
  );

  const tabList = [
    {
      key: "activeMembers",
      label: "Active Members",
    },
    {
      key: "pendingRequest",
      label: "Pending Request",
      children: <Post />,
    },
  ];
  return (
    <>
      <Spin spinning={isLoading}>
        <Card tabList={tabList} className="bg-transparent h-full w-full">
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Select size="large" />
              <Select size="large" />
              <Select size="large" />
            </Col>
            {memberData?.data?.map((item, i) => (
              <Col key={i} xs={24} md={8} lg={6}>
                <SettingCard
                  key={i}
                  src={item?.profile_pic}
                  name={item?.name}
                  position={item?.professional_designation}
                  batch={item?.batch_no}
                />
              </Col>
            ))}
          </Row>
        </Card>
      </Spin>
    </>
  );
};

export default Members;
