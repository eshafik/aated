import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Carousel,
  Col,
  Row,
  Space,
  Typography,
} from "antd";
import { CarouselRef } from "antd/es/carousel";
import { FC, useRef } from "react";
import { useQuery } from "react-query";
import { publicCommitteeMemberAPI } from "../../libs/api/publicMember";

const PublicCommitteeMembers = () => {
  // const [currentSlide, setCurrentSlide] = useState(0);
  const caroselref = useRef<CarouselRef>(null);

  const { data } = useQuery({
    queryKey: ["publicCommitteeMembers-list"],
    queryFn: () => publicCommitteeMemberAPI.getPublicCommitteeMembers(),
  });

  return (
    <Row
      className="text-center bg-slate-300"
      justify={"space-between"}
      gutter={[48, 48]}
    >
      <Col span={24}>
        <Typography.Title>Our Leadership Team</Typography.Title>
        <Typography.Title level={5}>
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit..." "There is no one who loves pain
          itself, who seeks after it and wants to have it, simply because it is
          pain..."
        </Typography.Title>

        {data?.data?.map((members, i) => (
          <Space direction="vertical" key={i}>
            {members?.committee_designation == "President" && (
              <div className="w-56 text-center mt-14">
                <Avatar
                  className="h-44 w-44"
                  src={`http://api.aated.smartlivestocksystem.com/${members?.profile_pic}`}
                />
                <Typography.Title level={4}>{members?.name}</Typography.Title>
                <Typography.Paragraph type="secondary">
                  {members?.committee_designation}
                </Typography.Paragraph>
              </div>
            )}
            {members?.committee_designation == "Secretary" && (
              <div className="w-56 text-center">
                <Avatar
                  className="h-44 w-44"
                  src={`http://api.aated.smartlivestocksystem.com/${members?.profile_pic}`}
                />
                <Typography.Title level={4}>{members?.name}</Typography.Title>
                <Typography.Paragraph type="secondary">
                  {members?.committee_designation}
                </Typography.Paragraph>
              </div>
            )}
          </Space>
        ))}
      </Col>
      <Col span={24}>
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
        consectetur, adipisci velit..." "There is no one who loves pain itself,
        who seeks after it and wants to have it, simply because it is pain..."
      </Col>
      <Col span={24}>
        <Carousel autoplay ref={caroselref}>
          {data?.data?.map((members, i) => (
            <Space direction="vertical" key={i}>
              <Card key={i} className="bg-slate-200 text-center w-64 ml-5">
                <Avatar
                  className="h-16 w-16"
                  src={`http://api.aated.smartlivestocksystem.com/${members?.profile_pic}`}
                />
                <Typography.Title level={4}>{members?.name}</Typography.Title>
                <Typography.Paragraph type="secondary">
                  {members?.committee_designation}
                </Typography.Paragraph>
              </Card>
            </Space>
          ))}
        </Carousel>
      </Col>

      <Col span={24}>
        <Space className="text-center">
          <SamplePrevArrow onClick={() => caroselref?.current?.next()} />
          <SampleNextArrow onClick={() => caroselref?.current?.prev()} />
        </Space>
      </Col>
    </Row>
  );
};
export default PublicCommitteeMembers;

type NextPrevButton = {
  onClick?: () => void;
};
const SampleNextArrow: FC<NextPrevButton> = ({ onClick }) => {
  return (
    <Button
      shape="circle"
      className=""
      style={{
        color: "black",
        fontSize: "15px",
        lineHeight: "1.5715",
      }}
      onClick={onClick}
    >
      <RightOutlined />
    </Button>
  );
};
const SamplePrevArrow: FC<NextPrevButton> = ({ onClick }) => {
  return (
    <Button
      shape="circle"
      className=""
      style={{
        color: "black",
        fontSize: "15px",
        lineHeight: "1.5715",
      }}
      onClick={onClick}
    >
      <LeftOutlined />
    </Button>
  );
};
