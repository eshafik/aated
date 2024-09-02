/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Typography } from "antd";
import { Brain, Lock, Settings } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";
import ExperienceAddModal from "./components/ExperieceAddModal";
import SeeExperience from "./components/PersonalExperience";
import ProfileSettings from "./components/ProfileSettings";
import Security from "./components/Security";

export const StyledCard = styled(Card)`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;

  .ant-card-body {
    padding: 0 !important;
    flex: 1 1 0%;
    overflow-y: auto;
  }
`;
const ProfileContainer = () => {
  const [settingItem, setSettingItem] = useState("basic_profile");

  const settingsItems: { icon: React.ReactNode; title: string; key: string }[] =
    [
      {
        icon: <Settings size={16} />,
        title: "Basic Profile",
        key: "basic_profile",
      },
      {
        icon: <Lock size={16} />,
        title: "Security",
        key: "security",
      },
      {
        icon: <Brain size={16} />,
        title: "Experience",
        key: "experience",
      },
    ];

  return (
    <div className="grid grid-cols-12 pt-3">
      <StyledCard
        title={
          <Typography.Text className="capitalize">
            {settingItem.replace("_", " ")}
          </Typography.Text>
        }
        className="col-span-2 rounded-r-none pl-1 pr-1"
      >
        {settingsItems?.map((items) => (
          <Button
            type="text"
            size="large"
            className={twMerge(
              "flex w-full mt-1 items-center justify-start border-none hover:bg-[#F4801A] hover:text-white rounded",
              settingItem === items.key && "w-full bg-[#F4801A] text-white"
            )}
            key={items.key}
            icon={items.icon}
            onClick={() => setSettingItem(items.key)}
          >
            {items.title}
          </Button>
        ))}
      </StyledCard>

      <StyledCard
        title=" "
        extra={settingItem === "experience" && <ExperienceAddModal />}
        className="col-span-10 rounded-l-none capitalize"
      >
        <div className="pl-5">
          {settingItem === "basic_profile" && <ProfileSettings />}
          {settingItem === "security" && <Security />}
          {settingItem === "experience" && <SeeExperience />}
        </div>
      </StyledCard>
    </div>
  );
};

export default ProfileContainer;
