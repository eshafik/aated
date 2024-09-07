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
import { useNavigate, useParams } from "react-router-dom";
// import cover from "../../assets/cover.jpg";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";
import { Experience, MemberDetails } from "../libs/api/@types/members";
import { membersAPI } from "../libs/api/membersAPI";

type ProfileLayoutProps = {
  isEditEnable?: boolean;
};
const ProfileLayout = ({ isEditEnable }: ProfileLayoutProps) => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const noProfilePic =
    "https://t3.ftcdn.net/jpg/05/79/68/24/360_F_579682479_j4jRfx0nl3C8vMrTYVapFnGP8EgNHgfk.jpg";
  const accountOwner = JSON.parse(localStorage.getItem("user-profile") || "[]");
  const userID = memberId ?? accountOwner?.id;

  const isProfileEditEnable =
    String(accountOwner?.id) === memberId || isEditEnable;

  const { data: memberData, isLoading } = useQuery({
    queryKey: ["member-list", userID],
    queryFn: () => membersAPI.getMemberDetails(userID),
  });
  return (
    <Skeleton loading={isLoading}>
      <div className="flex justify-center pt-2">
        <Card className="shadow-2xl max-w-3xl">
          <div className="flex gap-3 bg-yellow-400 p-4 rounded-lg">
            <Avatar
              shape="square"
              size={80}
              src={memberData?.data?.profile_pic ?? noProfilePic}
              className="shadow-lg"
            />
            <div className="flex-1">
              <Typography.Title level={5} className="mt-0 mb-0">
                {memberData?.data?.name}
              </Typography.Title>
              <Descriptions
                items={[
                  {
                    label: "Email",
                    children: memberData?.data?.email,
                    span: 24,
                    className: "mb-0 pb-0 truncate",
                  },
                  {
                    label: "Phone",
                    span: 24,
                    children: memberData?.data?.phone ?? null,
                  },
                ]}
              />
            </div>
            <Button
              size="small"
              type="primary"
              icon={<EditOutlined />}
              className={twMerge(
                "hidden",
                isProfileEditEnable && "flex ml-auto"
              )}
              onClick={() => navigate("/profile-setting")}
            />
          </div>
          <StyledCard className="mt-2">
            <Tabs
              items={[
                {
                  label: "Basic Information",
                  key: "basic_info",
                  children: <BasicInfo profileData={memberData?.data} />,
                },
                {
                  label: "Experiences",
                  key: "experiences",
                  children: (
                    <UserExperience
                      experienceData={memberData?.data?.experiences}
                    />
                  ),
                },
              ]}
            />
          </StyledCard>
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
            <Tag
              className="capitalize"
              color={
                profileData?.employment_status === "employed" ? "green" : "red"
              }
            >
              {profileData?.employment_status}
            </Tag>
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
  const [expID, setExpID] = useState(experienceData?.[0]?.id);
  return (
    <>
      <div className="flex gap-2">
        {experienceData?.map((exp, i) => (
          <Button
            size="small"
            className="mb-2"
            key={i}
            onClick={() => setExpID(Number(exp?.id))}
            type={expID === exp.id ? "primary" : "default"}
          >
            {i + 1}
          </Button>
        ))}
      </div>
      {experienceData?.map(
        (items) =>
          expID === items.id && (
            <Descriptions
              key={items?.id}
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
                  children:
                    items?.start + "  to  " + (items?.end ?? "Continuing"),
                },
              ]}
            />
          )
      )}
    </>
  );
};

const StyledCard = styled(Card)`
  &&.ant-card .ant-card-body {
    padding: 12px !important;
  }
`;
