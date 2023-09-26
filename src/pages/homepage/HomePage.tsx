import { Button, Col, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          background: "LightGray",
        }}
      >
        <Row align={"middle"} justify={"center"} gutter={24}>
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
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
