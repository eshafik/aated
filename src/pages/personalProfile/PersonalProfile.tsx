import { EditOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Skeleton,
  Typography,
} from "antd";
import { Briefcase, Info, Mail, MapPin, Phone } from "lucide-react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Cover from "../../assets/cover.jpg";
import { profileAPI } from "../../libs/api/profileAPI";

const PersonalProfile = () => {
  const navigate = useNavigate();
  const { data: memberData, isLoading } = useQuery(["user-profile"], () =>
    profileAPI.getProfileDetails()
  );

  const { data: experienceData } = useQuery(["experience-list"], () =>
    profileAPI.getExperiences()
  );

  return (
    <Skeleton loading={isLoading}>
      <Row justify={"center"}>
        <Col span={12}>
          <Card
            className="shadow-2xl bg-white w-[500px] sm:w-[500px] md:w-[500px] lg:w-[650px]"
            cover={<img className="absolute top-0" src={Cover} />}
          >
            <div>
              <Row justify={"space-between"}>
                <div>
                  {memberData?.data?.profile_pic ? (
                    <Avatar
                      shape="circle"
                      size={"large"}
                      src={memberData?.data?.profile_pic}
                      className="h-32 w-32 top-28"
                    />
                  ) : (
                    <Avatar className="h-32 w-24 rounded-lg" />
                  )}
                </div>
                <Button
                  onClick={() => navigate("/profilesetting")}
                  type="dashed"
                >
                  <EditOutlined />
                </Button>
              </Row>
              <div className="mt-28">
                <Typography.Title level={3}>
                  {memberData?.data?.name}
                </Typography.Title>
                <div>
                  <Briefcase className="h-3 mt-3" />
                  {memberData?.data?.professional_designation}
                </div>
                <div>
                  <Mail className="h-3 mt-3" />
                  {memberData?.data?.email}
                </div>
                <div>
                  <Phone className="h-3 mt-3" />
                  {memberData?.data?.phone}
                </div>
                <div>
                  <Info className="h-3 mt-3" />
                  {memberData?.data?.student_id} |{" "}
                  {memberData?.data?.batch?.name} |{" "}
                  {memberData?.data?.passing_year}
                </div>
                <div>
                  <MapPin className="h-3 mt-3" />
                  {memberData?.data?.contact_details}
                </div>
              </div>
              <Divider />
              <Typography.Title level={4} className="flex mt-5">
                Experiences
              </Typography.Title>
              {experienceData?.data?.map((exp, i) => (
                <div key={i} className="mb-8 ml-5">
                  <Typography.Title className="mt-0" level={5}>
                    {exp?.designation}
                  </Typography.Title>
                  <div>
                    {exp?.company_name} - {exp?.responsibilities}
                  </div>
                  <div>{exp?.working_years} Years of experience</div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </Skeleton>
  );
};

export default PersonalProfile;
