import { Button, Col, Layout, Row, Typography } from "antd";
import { Header as AntHeader } from "antd/es/layout/layout";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
type HeaderProps = {
  isSignButton: boolean;
};
const Header: FC<HeaderProps> = ({ isSignButton }) => {
  const navigate = useNavigate();
  const HEADER_LINK = [
    {
      name: "Home",
      path: "/homepage",
    },
    {
      name: "About us",
      path: "",
    },
    {
      name: "Committee",
      path: "",
    },
    {
      name: "Sign in",
      path: "",
    },
  ];

  return (
    <Layout>
      <AntHeader className="bg-transparent">
        <Row className="justify-between">
          <Col>
            {HEADER_LINK.map((item, i) => (
              <a key={i} className="mr-5 " href={item.path}>
                <Typography.Text className="hover:text-sky-700 hover:font-bold">
                  {item.name}
                </Typography.Text>
              </a>
            ))}
          </Col>
          <Col>
            {isSignButton ? (
              <Button
                size="large"
                type="text"
                className="bg-orange-400"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            ) : null}
          </Col>
        </Row>
      </AntHeader>
    </Layout>
  );
};

export default Header;
