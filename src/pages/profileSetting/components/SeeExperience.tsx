import { DeleteOutlined, SmileOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Popconfirm,
  Result,
  Row,
  Spin,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { ExperiencePayload } from "../../../libs/api/@types/profile";
import { profileAPI } from "../../../libs/api/profileAPI";

const SeeExperience = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [check, setCheck] = useState(false);

  const { data: experienceData, isLoading } = useQuery(
    ["experience-list"],
    () => profileAPI.getExperiences()
  );

  const { mutate: mutateDeleteExperience } = useMutation(
    ["experience-list"],
    (ID: string | number) => profileAPI.deleteExperiences(ID),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["experience-list"]);
      },
    }
  );

  const { mutate: mutateCreateExperience, isLoading: loadingAddExp } =
    useMutation(
      (payload: ExperiencePayload) => profileAPI.addExperiences(payload),
      {
        onSuccess: () => {
          navigate("/");
        },
      }
    );
  return (
    <Spin spinning={isLoading}>
      <Card
        className="bg-white"
        extra={
          <Button type="primary" size="large" onClick={() => setCheck(true)}>
            Add Experiences
          </Button>
        }
      >
        <Row>
          <Col span={12}>
            {experienceData?.data?.length ? (
              experienceData?.data?.map((exp, i) => (
                <Card
                  className="shadow-2xl bg-transparent mb-5 max-w-xl"
                  key={i}
                  title={`${i + 1}. ${exp?.company_name}`}
                  extra={
                    <Popconfirm
                      title="Delete this Experience"
                      description="Are you sure to delete this experience?"
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
          </Col>
          <Col span={12}>
            {check ? (
              <Card
                title={
                  <Typography.Title level={4} className="text-center">
                    Add Experience
                  </Typography.Title>
                }
                className="shadow-2xl bg-white max-w-xl"
              >
                <Form
                  onFinish={(values) =>
                    mutateCreateExperience({
                      company_name: values.company_name,
                      designation: values.designation,
                      job_department: values.job_department,
                      job_location: values.job_location,
                      responsibilities: values.responsibilities,
                      start: values.start,
                      end: values.end,
                      working_years: values.working_year,
                    })
                  }
                  requiredMark="optional"
                  layout="vertical"
                  labelAlign="left"
                >
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Company Name",
                      },
                    ]}
                    name="company_name"
                    label="Company Name"
                  >
                    <Input placeholder="X LTD" />
                  </Form.Item>

                  <Form.Item
                    name="designation"
                    label="Professional Designation"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Designation",
                      },
                    ]}
                  >
                    <Input placeholder="professional designation" />
                  </Form.Item>

                  <Form.Item
                    name="start"
                    label="Start Date"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Job Start Date",
                      },
                    ]}
                  >
                    <Input placeholder="2021-05-25" />
                  </Form.Item>

                  <Form.Item name="end" label="End Date">
                    <Input placeholder="2020-05-25 or Present" />
                  </Form.Item>

                  <Form.Item
                    name="working_year"
                    label="Working Year"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Working Year",
                      },
                    ]}
                  >
                    <Input placeholder="1 years" />
                  </Form.Item>

                  <Form.Item
                    name="job_location"
                    label="Job Location"
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
                    label="Responsibilities"
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
                    label="Job Department"
                    rules={[
                      {
                        required: true,
                        message: "Please enter you department name",
                      },
                    ]}
                  >
                    <Input placeholder="passing year" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      loading={loadingAddExp}
                      className="bg-blue-400 "
                      htmlType="submit"
                    >
                      Save
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Card>
    </Spin>
  );
};

export default SeeExperience;
