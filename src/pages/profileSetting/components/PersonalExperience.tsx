import { EditOutlined } from "@ant-design/icons";
import { List, Tooltip, Typography } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { Experience } from "../../../libs/api/@types/profile";
import { profileAPI } from "../../../libs/api/profileAPI";
import UpdateExperienceForm from "../container/UpdateExperienceForm";

const SeeExperience = () => {
  const { data: experiencesData, isLoading } = useQuery(
    ["experience-list"],
    () => profileAPI.getExperiences()
  );

  return (
    <div className="max-w-xl p-3">
      <List
        dataSource={experiencesData?.data}
        loading={isLoading}
        renderItem={(items) => (
          <List.Item>
            <ExperienceItem exp={items} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default SeeExperience;

const ExperienceItem = ({ exp }: { exp: Experience }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <UpdateExperienceForm
        slug={exp.id.toString()}
        open={visible}
        onCancel={() => setVisible(false)}
      />
      <div>
        <Tooltip title="Edit Mode">
          <EditOutlined
            onClick={() => setVisible(true)}
            className="absolute right-7"
          />
        </Tooltip>
        <Typography.Title className="mt-0" level={5}>
          {exp?.designation}
        </Typography.Title>
        <div>
          {exp?.company_name} | {exp?.responsibilities}
        </div>
        <div>
          {exp?.start} To {exp?.end}
        </div>
        <div>{exp?.working_years} Years of experience</div>
      </div>
    </>
  );
};
