import Header from "../../components/header/Header";
import PublicCommitteeMembers from "./PublicCommitteeMembers";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="bg-slate-300">
        <PublicCommitteeMembers />
        {/* <Row justify={"center"}>
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
        </Row> */}
      </div>
    </div>
  );
};

export default HomePage;
