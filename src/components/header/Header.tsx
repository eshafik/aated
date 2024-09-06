import { Button, Layout, Typography } from "antd";
import { Header as AntHeader } from "antd/es/layout/layout";
import { useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Header = () => {
  const { pathname } = useLocation();
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
      path: "committee",
    },
    // {
    //   name: "Contributor",
    //   path: "contributor",
    // },
    {
      name: "Sign in",
      path: "/signin",
    },
  ];

  return (
    <Layout>
      <AntHeader className="bg-transparent p-0 pl-5 pr-5 flex items-center justify-between">
        <div>
          {HEADER_LINK.map((item, i) => (
            <Typography.Link
              key={i}
              href={item.path}
              className="hover:text-sky-700 hover:font-bold mr-3 text-black font-semibold"
            >
              {item.name}
            </Typography.Link>
          ))}
        </div>
        <Button
          className={twMerge(pathname.includes("signup") && "hidden")}
          type="primary"
          onClick={() => navigate("/signup")}
        >
          Signup
        </Button>
      </AntHeader>
    </Layout>
  );
};

export default Header;
