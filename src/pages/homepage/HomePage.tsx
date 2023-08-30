import { Button, Col, Row, Typography } from "antd";
import Header from "../../components/header/Header";

const HomePage = () => {
  return (
    <><Header /><div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        background: "LightGray",
      }}
    >
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        gutter={24}
      >
        <Col span={24}>
          <Typography.Title className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipis elit.
          </Typography.Title>
        </Col>

        <Col span={24}>
          <Typography.Title level={4} className="text-center">
            Pellentesque in condimentum elit. Curabitur aliquet sapien quis
            dolor venenatis,
            <br /> vel scelerisque ipsum rhoncus. Nunc eu tellus efficitur
          </Typography.Title>
        </Col>

        <Col>
          <Button size="large" type="text" className="bg-orange-400">
            Sign In
          </Button>
        </Col>
      </Row>
    </div></>
  );
};

export default HomePage;
