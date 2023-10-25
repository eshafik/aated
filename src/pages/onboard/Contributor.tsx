import { Card, Col, Flex, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { LucideFacebook, LucideGithub, LucideLinkedin } from "lucide-react";
import Hemel from "../../assets/hemel.jpg";
import Header from "../../components/header/Header";

const Contributor = () => {
  return (
    <>
      <Header isDisable={true} />
      <Row className="h-calc(100vh-120px)" align="middle" justify="center">
        <Flex gap="middle">
          <Col>
            <Card
              style={{ width: 540 }}
              className="bg-slate-400"
              hoverable
              cover={<img src={Hemel} />}
              actions={[
                <LucideFacebook />,
                <LucideLinkedin />,
                <LucideGithub />,
              ]}
            >
              <Meta title="Abu Shyed Hemel" description="Front-End Developer" />
            </Card>
          </Col>
          <Col>
            <Card
              className="bg-slate-400"
              style={{ width: 540 }}
              hoverable
              cover={<img src={Hemel} />}
              actions={[
                <a href="https://www.facebook.com/hemel.orten/" target="_blank">
                  <LucideFacebook />
                </a>,
                <a
                  href="https://www.linkedin.com/in/abu-shyed-hemel-80693b13a/"
                  target="_blank"
                >
                  <LucideLinkedin />
                </a>,
                <a href="https://github.com/AbuShyedHemel" target="_blank">
                  <LucideGithub />,
                </a>,
              ]}
            >
              <Meta title="Abu Shyed Hemel" description="Front-End Developer" />
            </Card>
          </Col>
        </Flex>
      </Row>
    </>
  );
};

export default Contributor;
