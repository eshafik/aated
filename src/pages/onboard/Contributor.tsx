import { Avatar, Card, Col, Row, Space, Typography } from "antd";
import { LucideFacebook, LucideGithub, LucideLinkedin } from "lucide-react";
import Hemel from "../../assets/hemel.jpg";
import Header from "../../components/header/Header";

const Contributor = () => {
  return (
    <>
      <Header isDisable={true} />
      <Row
        className="h-[calc(100vh-120px)]"
        align="middle"
        justify="center"
        gutter={[48, 48]}
      >
        <Col>
          <Card
            className="bg-transparent border-none"
            cover={<Avatar shape="circle" className="h-56 w-56" src={Hemel} />}
          >
            <Typography.Title className="mt-0" level={4}>
              Abu Shyed Hemel
            </Typography.Title>

            <Typography.Paragraph className="text-center mt-0">
              Front-End Developer
            </Typography.Paragraph>

            <div className="text-center">
              <Space>
                <a href="https://www.facebook.com/hemel.orten/" target="_blank">
                  <LucideFacebook />
                </a>

                <a
                  href="https://www.linkedin.com/in/abu-shyed-hemel-80693b13a/"
                  target="_blank"
                >
                  <LucideLinkedin />
                </a>

                <a href="https://github.com/AbuShyedHemel" target="_blank">
                  <LucideGithub />
                </a>
              </Space>
            </div>
          </Card>
        </Col>
        <Col>
          <Card
            className="bg-transparent border-none"
            cover={<Avatar shape="circle" className="h-56 w-56" src={Hemel} />}
          >
            <Typography.Title className=" mt-0" level={4}>
              Abu Shyed Hemel
            </Typography.Title>

            <Typography.Paragraph className="text-center">
              Front-End Developer
            </Typography.Paragraph>

            <div className="text-center">
              <Space>
                <a href="https://www.facebook.com/hemel.orten/" target="_blank">
                  <LucideFacebook />
                </a>

                <a
                  href="https://www.linkedin.com/in/abu-shyed-hemel-80693b13a/"
                  target="_blank"
                >
                  <LucideLinkedin />
                </a>

                <a href="https://github.com/AbuShyedHemel" target="_blank">
                  <LucideGithub />
                </a>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Contributor;
