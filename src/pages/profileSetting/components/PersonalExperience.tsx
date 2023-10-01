import { EditOutlined, SmileOutlined } from "@ant-design/icons";
import {
  App,
  Button,
  Form,
  Modal,
  Result,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { StyledCard } from "../../../components/StyleCard";
import {
  Experience,
  ExperiencePayload,
} from "../../../libs/api/@types/profile";
import { profileAPI } from "../../../libs/api/profileAPI";
import ExperienceForm from "../container/ExperienceForm";
import UpdateExperienceForm from "../container/UpdateExperienceForm";

const SeeExperience = () => {
  const { notification } = App.useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { data: experiencesData, isLoading } = useQuery(
    ["experience-list"],
    () => profileAPI.getExperiences()
  );

  const { mutate: mutateCreateExperience, isLoading: loadingAddExp } =
    useMutation(
      (payload: ExperiencePayload) => profileAPI.addExperiences(payload),
      {
        onSuccess: () => {
          notification.success({ message: "Successfully added Experiences" });
          queryClient.invalidateQueries(["experience-list"]);
          setIsModalOpen(false);
        },
        onError: (error: Error) => {
          notification.error({ message: error.message });
        },
      }
    );

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Spin spinning={isLoading}>
      <StyledCard
        className="bg-white"
        title={"Experience"}
        extra={
          <Button type="primary" onClick={() => showModal()}>
            Add Experiences
          </Button>
        }
      >
        <Modal
          title="Add Experience"
          open={isModalOpen}
          onOk={form.submit}
          onCancel={() => setIsModalOpen(false)}
          okText="Save"
          okType="primary"
          confirmLoading={loadingAddExp}
          centered
        >
          <Form
            form={form}
            onFinish={(values) =>
              mutateCreateExperience({
                company_name: values.company_name,
                designation: values.designation,
                job_department: values.job_department,
                job_location: values.job_location,
                responsibilities: values.responsibilities,
                start: values.start_date.format("YYYY-MM-DD"),
                end: values.end_date
                  ? values.end_date.format("YYYY-MM-DD")
                  : null,
                working_years: values.working_year,
              })
            }
            requiredMark="optional"
            layout="vertical"
          >
            <ExperienceForm />
          </Form>
        </Modal>

        {experiencesData?.data?.length ? (
          experiencesData?.data?.map((exp, i) => (
            <ExperienceItem key={i} exp={exp} />
          ))
        ) : (
          <Result
            icon={<SmileOutlined />}
            title="You have no experiences available."
          />
        )}
      </StyledCard>
    </Spin>
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
      <div className="mb-8">
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
          {exp?.company_name}-{exp?.responsibilities}
        </div>
        <div>
          {exp?.start}-{exp?.end}
        </div>
        <div>{exp?.working_years} Years of experience</div>
      </div>
    </>
  );
};
