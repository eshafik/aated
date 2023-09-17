import { Button, Card, Form, Input, Typography } from "antd";
import { useMutation } from "react-query";
import { ExperiencePayload } from "../../libs/api/@types/profile";
import { profileAPI } from "../../libs/api/profileAPI";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";

const AddExperiences = () => {
  const navigator = useNavigate();
  const { mutate: mutateCreateExperience, isLoading } = useMutation(
    (payload: ExperiencePayload) => profileAPI.addExperiences(payload),
    {
      onSuccess: () => {
        navigator("/");
      },
    }
  );

  return (
    <Card
      title={
        <Typography.Title level={4} className="text-center">
          Add Experience
        </Typography.Title>
      }
      className="shadow-2xl bg-transparent max-w-xl"
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
            { required: true, message: "Please enter your Company Name" },
          ]}
          name="company_name"
          label="Company Name"
        >
          <Input placeholder="X LTD" />
        </Form.Item>

        <Form.Item
          name="designation"
          label="Professional Designation"
          rules={[{ required: true, message: "Please enter your Designation" }]}
        >
          <Input placeholder="professional designation" />
        </Form.Item>

        <Form.Item
          name="start"
          label="Start Date"
          rules={[
            { required: true, message: "Please enter your Job Start Date" },
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
            { required: true, message: "Please enter your Working Year" },
          ]}
        >
          <Input placeholder="1 years" />
        </Form.Item>

        <Form.Item
          name="job_location"
          label="Job Location"
          rules={[
            { required: true, message: "Please enter your Job Location" },
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
            { required: true, message: "Please enter you department name" },
          ]}
        >
          <Input placeholder="passing year" />
        </Form.Item>

        <Form.Item>
          <Button
            loading={isLoading}
            className="bg-blue-400 "
            htmlType="submit"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddExperiences;
