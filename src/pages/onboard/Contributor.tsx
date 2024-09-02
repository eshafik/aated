import {
  DesktopOutlined,
  MailOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Col, Row, Space, Typography } from "antd";
import { LucideFacebook, LucideGithub, LucideLinkedin } from "lucide-react";
import Hemel from "../../assets/hemel.jpg";

const Contributor = () => {
  return (
    <>
      <Row
        className="h-[calc(100vh-120px)]"
        align="middle"
        justify="center"
        gutter={[48, 48]}
      >
        <Col>
          <Card
            className="bg-transparent border-none"
            cover={<Avatar shape="square" className="h-56 w-56" src={Hemel} />}
          >
            <Typography.Title className="mt-0 mb-0" level={4}>
              <ProfileOutlined className="text-sm" />
              {"  "} Abu Shyed Hemel
            </Typography.Title>

            <Typography.Paragraph className="text-center mt-0 mb-0">
              <DesktopOutlined />
              {"  "} Front-End Developer(React)
            </Typography.Paragraph>

            <Typography.Paragraph>
              <MailOutlined className="text-xs mt-0" />
              {"  "}abushyedhemel01@gmail.com
            </Typography.Paragraph>

            <div className="text-center">
              <Space>
                <a href="https://www.facebook.com/hemel.orten/" target="_blank">
                  <Button>
                    <LucideFacebook />
                  </Button>
                </a>

                <a
                  href="https://www.linkedin.com/in/abu-shyed-hemel-80693b13a/"
                  target="_blank"
                >
                  <Button>
                    <LucideLinkedin />
                  </Button>
                </a>

                <a href="https://github.com/AbuShyedHemel" target="_blank">
                  <Button>
                    <LucideGithub />
                  </Button>
                </a>
              </Space>
            </div>
          </Card>
        </Col>
        <Col>
          <Card
            className="bg-transparent border-none"
            cover={<Avatar shape="square" className="h-56 w-56" src={Hemel} />}
          >
            <Typography.Title className="mt-0 mb-0" level={4}>
              <ProfileOutlined className="text-sm" />
              {"  "} Abu Shyed Hemel
            </Typography.Title>

            <Typography.Paragraph className="text-center mt-0 mb-0">
              <DesktopOutlined />
              {"  "} Front-End Developer(React)
            </Typography.Paragraph>

            <Typography.Paragraph>
              <MailOutlined className="text-xs mt-0" />
              {"  "}abushyedhemel01@gmail.com
            </Typography.Paragraph>

            <div className="text-center">
              <Space>
                <a href="https://www.facebook.com/hemel.orten/" target="_blank">
                  <Button>
                    <LucideFacebook />
                  </Button>
                </a>

                <a
                  href="https://www.linkedin.com/in/abu-shyed-hemel-80693b13a/"
                  target="_blank"
                >
                  <Button>
                    <LucideLinkedin />
                  </Button>
                </a>

                <a href="https://github.com/AbuShyedHemel" target="_blank">
                  <Button>
                    <LucideGithub />
                  </Button>
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
