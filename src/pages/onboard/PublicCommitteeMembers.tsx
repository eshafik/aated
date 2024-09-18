import { Avatar, Typography } from "antd";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { publicCommitteeMemberAPI } from "../../libs/api/publicMember";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const PublicCommitteeMembers = () => {
  // const [currentSlide, setCurrentSlide] = useState(0);
  // const caroselref = useRef<Slider>();
  // const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["publicCommitteeMembers-list"],
    queryFn: () => publicCommitteeMemberAPI.getPublicCommitteeMembers(),
  });

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

        <div className="w-96 mt-10 flex justify-center items-center">
          <Swiper
            slidesPerView={2}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper flex justify-center items-center w-full"
          >
            {data?.data?.map((members, i) => (
              <SwiperSlide key={i}>
                <div
                  key={i}
                  className="bg-gray-200 w-44 flex justify-center items-center flex-col text-center p-5 rounded-lg"
                >
                  <Avatar src={members.profile_pic} size={100} />
                  <Typography.Title level={5}>{members.name}</Typography.Title>
                  <Typography.Text type="secondary">
                    {members.committee_designation}
                  </Typography.Text>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default PublicCommitteeMembers;
