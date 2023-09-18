import { useMutation, useQuery } from "react-query";
import { profileAPI } from "../../libs/api/profileAPI";
import { Button, Card, Popconfirm, Result, Spin } from "antd";
import { DeleteOutlined, SmileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const SeeExperience = () => {
  const navigate = useNavigate();
  const { data: experienceData, isLoading } = useQuery(
    ["experience-list"],
    () => profileAPI.getExperiences()
  );

  const { mutate: mutateDeleteExperience } = useMutation(
    ["experience-list"],
    (ID: string | number) => profileAPI.deleteExperiences(ID)
  );
  return (
    <Spin spinning={isLoading}>
      <Card
        className="bg-transparent"
        extra={
          <Button type="primary" onClick={() => navigate("/add-experiences")}>
            Add Experiences
          </Button>
        }
      >
        {experienceData?.data?.length ? (
          experienceData?.data?.map((exp, i) => (
            <Card
              className="shadow-2xl bg-transparent mb-5 max-w-xl"
              key={i}
              title={`${i + 1}. ${exp?.company_name}`}
              extra={
                <Popconfirm
                  title="Delete the Post"
                  description="Are you sure to delete this post?"
                  onConfirm={() => mutateDeleteExperience(exp?.id)}
                  okText="Yes"
                  cancelText="No"
                  okType="danger"
                >
                  <DeleteOutlined />
                </Popconfirm>
              }
            >
              <div>{exp?.designation}</div>
              <div>{exp?.job_department?.name}</div>
              <div>{exp?.job_location}</div>
              <div>{exp?.responsibilities}</div>
              <div>{exp?.working_years} Year of experience</div>
            </Card>
          ))
        ) : (
          <Result
            icon={<SmileOutlined />}
            title="You have no experiences available."
          />
        )}
      </Card>
    </Spin>
  );
};

export default SeeExperience;
