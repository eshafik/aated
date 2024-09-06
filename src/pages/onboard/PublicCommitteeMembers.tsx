import { Avatar, Card, Typography } from "antd";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import CardMeta from "../../components/CardMeta";
import { publicCommitteeMemberAPI } from "../../libs/api/publicMember";

const PublicCommitteeMembers = () => {
  // const [currentSlide, setCurrentSlide] = useState(0);
  // const caroselref = useRef<Slider>();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["publicCommitteeMembers-list"],
    queryFn: () => publicCommitteeMemberAPI.getPublicCommitteeMembers(),
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div className="h-[calc(100vh-190px)] flex flex-col justify-between gap-5 p-3">
      <div>
        <Typography.Title className="text-center mt-0">
          Our Leadership Team
        </Typography.Title>
        <Typography.Title level={5} className="text-center">
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit..." "There is no one who loves pain
          itself, who seeks after it and wants to have it, simply because it is
          pain..."
        </Typography.Title>
      </div>

      {data?.data?.map(
        (members, i) =>
          members?.committee_designation === "Secretary" && (
            <div
              key={i}
              className="flex flex-col items-center w-full justify-center"
            >
              <Avatar size={100} src={members?.profile_pic} />
              <Typography.Title level={5} className="mt-0">
                {members?.name}
              </Typography.Title>
              <Typography.Text>
                {members?.committee_designation}
              </Typography.Text>
            </div>
          )
      )}

      <div className="flex flex-col items-center mt-1">
        <Typography.Text className="text-center">
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit..." "There is no one who loves pain
          itself, who seeks after it and wants to have it, simply because it is
          pain..."
        </Typography.Text>

        <Slider {...settings} className="w-full">
          {data?.data?.map((members, i) => (
            <Card
              key={i}
              className="cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              <CardMeta
                icon={<Avatar src={members?.profile_pic} size={40} />}
                title={
                  <Typography.Text className="mb-0 mt-0">
                    {members?.name}
                  </Typography.Text>
                }
                description={
                  <Typography.Paragraph className="mb-0" type="secondary">
                    {members?.committee_designation}
                  </Typography.Paragraph>
                }
              />
            </Card>
          ))}
        </Slider>
      </div>
    </div>
  );
};
export default PublicCommitteeMembers;
