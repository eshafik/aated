import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Skeleton,
  Tabs,
  Tag,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
// import cover from "../../assets/cover.jpg";
import { EditOutlined } from "@ant-design/icons";
import { twMerge } from "tailwind-merge";
import { Experience, MemberDetails } from "../libs/api/@types/members";

type ProfileLayoutProps = {
  isLoading?: boolean;
  profileData?: MemberDetails;
  memberExperience?: Experience[];
  isOwnAccount?: boolean;
};
const ProfileLayout = ({
  isLoading,
  memberExperience,
  profileData,
  isOwnAccount,
}: ProfileLayoutProps) => {
  const navigate = useNavigate();
  const noProfilePic =
    "https://t3.ftcdn.net/jpg/05/79/68/24/360_F_579682479_j4jRfx0nl3C8vMrTYVapFnGP8EgNHgfk.jpg";
  return (
    <Skeleton loading={isLoading}>
      <div className="flex justify-center pt-5">
        <Card className="shadow-2xl w-full max-w-4xl">
          <div className="flex gap-3 bg-yellow-400 p-4">
            <Avatar
              shape="square"
              size={80}
              src={profileData?.profile_pic ?? noProfilePic}
              className="shadow-lg"
            />
            <div className="flex-1">
              <Typography.Title level={5} className="mt-0 mb-0">
                {profileData?.name}
              </Typography.Title>
              <Descriptions
                items={[
                  {
                    label: "Email",
                    children: profileData?.email,
                    span: 24,
                    className: "mb-0 pb-0 truncate",
                  },
                  {
                    label: "Phone",
                    span: 24,
                    children: profileData?.phone ?? null,
                  },
                ]}
              />
            </div>
            <Button
              size="small"
              type="primary"
              icon={<EditOutlined />}
              className={twMerge("hidden", isOwnAccount && "flex ml-auto")}
              onClick={() => navigate("/profile-setting")}
            />
          </div>
          <Card className="mt-5">
            <Tabs
              items={[
                {
                  label: "Basic Information",
                  key: "basic_info",
                  children: <BasicInfo profileData={profileData} />,
                },
                {
                  label: "Experiences",
                  key: "experiences",
                  children: (
                    <UserExperience experienceData={memberExperience} />
                  ),
                },
              ]}
            />
          </Card>
        </Card>
      </div>
    </Skeleton>
  );
};

export default ProfileLayout;

type BasicInfoProps = {
  profileData?: MemberDetails;
};
const BasicInfo = ({ profileData }: BasicInfoProps) => {
  return (
    <Descriptions
      bordered
      layout="vertical"
      items={[
        {
          label: "Student ID",
          children: profileData?.student_id,
        },
        {
          label: "Batch No",
          children: profileData?.batch?.batch_number,
        },
        {
          label: "Passing Year",
          children: profileData?.passing_year,
        },
        {
          label: "Employment Status",
          children: (
            <Tag className="capitalize">{profileData?.employment_status}</Tag>
          ),
        },
        {
          label: "Expertise Area",
          children: profileData?.expertise_area,
        },
        {
          label: "Professional Designation",
          children: profileData?.professional_designation,
        },
        {
          label: "Unemployment Reason",
          children: profileData?.unemployment_reasons,
        },
      ]}
    />
  );
};

type UserExperienceProps = {
  experienceData?: Experience[];
};
const UserExperience = ({ experienceData }: UserExperienceProps) => {
  return (
    <>
      {experienceData?.map((items) => (
        <Descriptions
          className="mb-2"
          bordered
          items={[
            {
              label: "Company Name",
              children: items?.company_name,
              span: 24,
            },
            {
              label: "Designation",
              children: items?.designation,
              span: 24,
            },
            {
              label: "Department",
              children: items?.job_department?.name,
              span: 24,
            },
            {
              label: "Company Address",
              children: items?.job_location,
              span: 24,
            },
            {
              label: "Responsibilities",
              children: items?.responsibilities,
              span: 24,
            },
            {
              label: "Working Year",
              children: items?.working_years,
            },
            {
              label: "Start/End Date",
              children: items?.start + " to " + items?.end ?? "",
            },
          ]}
        />
      ))}
    </>
  );
};
