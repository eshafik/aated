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
import { FC } from "react";
import { useNavigate } from "react-router-dom";
// import cover from "../../assets/cover.jpg";
import { Experience } from "../libs/api/@types/members";
import { ExperiencesResponse } from "../libs/api/@types/profile";

type ProfileLayoutProps = {
  isLoading?: boolean;
  profile_pic?: string;
  path?: string;
  name?: string;
  professional_designation?: string;
  email?: string;
  phone?: string;
  student_id?: string | number;
  batch_name?: string;
  passing_year?: string | number;
  contact_details?: string;
  personalExperienceData?: ExperiencesResponse;
  isMemberEnable?: boolean;
  memberExperience?: Experience[];
};
const ProfileLayout: FC<ProfileLayoutProps> = ({
  isLoading,
  profile_pic,
  path,
  name,
  professional_designation,
  email,
  phone,
  student_id,
  batch_name,
  passing_year,
  contact_details,
  personalExperienceData,
  isMemberEnable,
  memberExperience,
}) => {
  const navigate = useNavigate();
  return (
    <Skeleton loading={isLoading}>
      <Row justify={"center"}>
        <Col span={12}>
          <Card
            className="shadow-2xl bg-white w-[500px] sm:w-[500px] md:w-[500px] lg:w-[650px]"
            cover={
              <img
                className="absolute top-0"
                src={
                  "https://timelinecovers.pro/facebook-cover/download/Best-Covers-For-Facebook-Timeline-sunflower.jpg"
                  // "https://i.pinimg.com/736x/be/d1/f2/bed1f2fa5028d5f818ec727a134df8e3.jpg"
                }
              />
            }
          >
            <div>
              <Row justify={"space-between"}>
                <div>
                  {profile_pic ? (
                    <Avatar
                      shape="circle"
                      size={"large"}
                      src={profile_pic}
                      className="h-32 w-32 top-28 shadow-lg"
                    />
                  ) : (
                    <Avatar className="h-32 w-24 rounded-lg" />
                  )}
                </div>
                {isMemberEnable ? (
                  ""
                ) : (
                  <Button
                    onClick={() => navigate({ pathname: path })}
                    type="primary"
                    icon={<EditOutlined className="text-white" />}
                  />
                )}
              </Row>
              <div className="mt-28">
                <Typography.Title level={3}>{name}</Typography.Title>
                <div>
                  <Briefcase className="h-3 mt-3" />
                  {professional_designation}
                </div>
                <div>
                  <Mail className="h-3 mt-3" />
                  {email}
                </div>
                <div>
                  <Phone className="h-3 mt-3" />
                  {phone}
                </div>
                <div>
                  <Info className="h-3 mt-3" />
                  {student_id} | {batch_name} | {passing_year}
                </div>
                <div>
                  <MapPin className="h-3 mt-3" />
                  {contact_details}
                </div>
              </div>
              <Divider />
              <Typography.Title level={4} className="flex mt-5">
                Experiences
              </Typography.Title>
              {personalExperienceData?.data?.map((exp, i) => (
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
              {isMemberEnable
                ? memberExperience?.map((exp, i) => (
                    <div key={i} className="mb-8 ml-5">
                      <Typography.Title className="mt-0" level={5}>
                        {exp?.designation}
                      </Typography.Title>
                      <div>
                        {exp?.company_name} - {exp?.responsibilities}
                      </div>
                      <div>{exp?.working_years} Years of experience</div>
                    </div>
                  ))
                : ""}
            </div>
          </Card>
        </Col>
      </Row>
    </Skeleton>
  );
};

export default ProfileLayout;
