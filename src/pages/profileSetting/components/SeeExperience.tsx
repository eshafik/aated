import { EditOutlined, SmileOutlined } from "@ant-design/icons";
import {
  App,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Result,
  Select,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { StyledCard } from "../../../components/StyleCard";
import { useJobDeptSearch } from "../../../config/hook/useJobDeptSearch";
import { ExperiencePayload } from "../../../libs/api/@types/profile";
import { profileAPI } from "../../../libs/api/profileAPI";

const SeeExperience = () => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [editMode, setEditMode] = useState(false);

  const { data: experienceData, isLoading } = useQuery(
    ["experience-list"],
    () => profileAPI.getExperiences()
  );

  // const { mutate: mutateDeleteExperience } = useMutation(
  //   ["experience-list"],
  //   (ID: string | number) => profileAPI.deleteExperiences(ID),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["experience-list"]);
  //     },
  //     onError: (error: Error) => {
  //       notification.error({ message: error.message });
  //     },
  //   }
  // );

  const { jobDept: jobDeptData, filter } = useJobDeptSearch();

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

  const handleOk = () => {
    setIsModalOpen(false);
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
          <Modal
            title="Add Experience"
            open={isModalOpen}
            onOk={form.submit}
            onCancel={handleOk}
            okText="Save"
            okType="primary"
            confirmLoading={loadingAddExp}
            centered
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your Company Name",
                },
              ]}
              name="company_name"
            >
              <Input placeholder="X LTD" />
            </Form.Item>

            <Form.Item
              name="designation"
              rules={[
                {
                  required: true,
                  message: "Please enter your Designation",
                },
              ]}
            >
              <Input placeholder="Professional designation" />
            </Form.Item>

            <Form.Item
              name="start_date"
              rules={[
                {
                  required: true,
                  message: "Please enter your Job Start Date",
                },
              ]}
            >
              <DatePicker
                format={"YYYY-MM-DD"}
                className="w-full"
                placeholder="Job Start Date"
              />
            </Form.Item>

            <Form.Item name="end_date">
              <DatePicker
                format={"YYYY-MM-DD"}
                className="w-full"
                placeholder="Job End Date"
              />
            </Form.Item>

            <Form.Item
              name="working_year"
              rules={[
                {
                  required: true,
                  message: "Please enter your Working Year",
                },
              ]}
            >
              <InputNumber className="w-full" placeholder="1 years" />
            </Form.Item>

            <Form.Item
              name="job_location"
              rules={[
                {
                  required: true,
                  message: "Please enter your Job Location",
                },
              ]}
            >
              <Input placeholder="Dhanmondi" />
            </Form.Item>

            <Form.Item
              name="responsibilities"
              rules={[
                {
                  required: true,
                  message: "Please enter your Job responsibilities",
                },
              ]}
            >
              <TextArea placeholder="Project Manager" />
            </Form.Item>

            <Form.Item
              name="job_department"
              rules={[
                {
                  required: true,
                  message: "Please enter you department name",
                },
              ]}
            >
              <Select
                showSearch
                onSearch={filter.handleChangeJobDept}
                options={jobDeptData?.data?.map(({ id, name }) => ({
                  value: id?.toString(),
                  label: name,
                }))}
                placeholder="Job Department"
              />
            </Form.Item>
          </Modal>
        </Form>

        {experienceData?.data?.length ? (
          experienceData?.data?.map((exp, i) => (
            <div key={i} className="mb-8">
              <Tooltip title="Edit Mode">
                <EditOutlined
                  onClick={() => showModal()}
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

              {/* {editMode ? (
                <Popconfirm
                  title="Delete this Experience"
                  description="Are you sure to delete this experience?"
                  onConfirm={() => mutateDeleteExperience(exp?.id)}
                  okText="Yes"
                  cancelText="No"
                  okType="danger"
                >
                  <Button className="mt-2" type="dashed" size="small">
                    Delete Experience
                  </Button>
                </Popconfirm>
              ) : (
                ""
              )} */}
            </div>
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
