import { useMutation, useQuery, useQueryClient } from "react-query";
import { profileAPI } from "../../libs/api/profileAPI";
import { Card, Popconfirm, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const SeeExperience = () => {
  const queryClient = useQueryClient();

  const { data: experienceData, isLoading } = useQuery(
    ["experience-list"],
    () => profileAPI.getExperiences(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["experience-list"]);
      },
    }
  );

  const { mutate: mutateDeleteExperience } = useMutation(
    ["experience-list"],
    (ID: string | number) => profileAPI.deleteExperiences(ID)
  );
  return (
    <Spin spinning={isLoading}>
      <div>
        {experienceData?.data?.map((exp, i) => (
          <Card
            className="shadow-2xl bg-transparent max-w-xl mx-auto"
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
        ))}
      </div>
    </Spin>
  );
};

export default SeeExperience;
