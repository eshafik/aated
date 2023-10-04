import { Avatar, Card, Col, Row, Space, Typography } from "antd";
import { useQuery } from "react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { publicCommitteeMemberAPI } from "../../libs/api/publicMember";
const PublicCommitteeMembers = () => {
  // const [currentSlide, setCurrentSlide] = useState(0);
  // const caroselref = useRef<Slider>();

  const { data } = useQuery({
    queryKey: ["publicCommitteeMembers-list"],
    queryFn: () => publicCommitteeMemberAPI.getPublicCommitteeMembers(),
  });

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    arrows: true,
    speed: 500,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       infinite: true,
    //       dots: true,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       infinite: true,
    //       dots: true,
    //     },
    //   },
    // ],
  };

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

      <Col className="mx-auto" sm={9} xl={12}>
        <Slider {...settings}>
          {data?.data?.map((members, i) => (
            <Space direction="vertical">
              <Card
                key={i}
                className="bg-slate-200 text-center w-64 ml-5 m-auto"
              >
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
        </Slider>
      </Col>
    </Row>
  );
};
export default PublicCommitteeMembers;
