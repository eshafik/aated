import {
  App,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Skeleton,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useJobDeptSearch } from "../../../config/hook/useJobDeptSearch";
import { profileAPI } from "../../../libs/api/profileAPI";

type ExperienceFormProps = {
  isloading?: boolean;
  isDisabled?: boolean;
  deleteExperience?: string;
  updateLoading?: boolean;
};
const ExperienceForm: FC<ExperienceFormProps> = ({
  isloading,
  isDisabled,
  deleteExperience,
  updateLoading,
}) => {
  const { jobDept: jobDeptData, filter } = useJobDeptSearch();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteExperience, isLoading: deleteExperienceLoading } =
    useMutation(
      ["experience-list"],
      (ID?: string) => profileAPI.deleteExperiences(ID),
      {
        onSuccess: () => {
          notification.success({ message: "Delete" }), Modal.destroyAll();
          queryClient.invalidateQueries(["experience-list"]);
        },
        onError: (error: Error) => {
          notification.error({ message: error.message });
        },
      }
    );

  return (
    <Skeleton loading={isloading}>
      <Form.Item
        label="Company Name"
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
        label="Designation"
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
        label="Start Date"
        name="start_date"
        rules={[
          {
            required: true,
            message: "Please enter your Job Start Date",
          },
        ]}
      >
        <DatePicker
          disabled={isDisabled}
          format={"YYYY-MM-DD"}
          className="w-full"
          placeholder="Job Start Date"
        />
      </Form.Item>

      <Form.Item label="End Date" name="end_date">
        <DatePicker
          format={"YYYY-MM-DD"}
          className="w-full"
          placeholder="Job End Date"
        />
      </Form.Item>

      <Form.Item
        label="Working Year"
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
        label="Job Location"
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
        label="Responsibilities"
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
        label="Job Department"
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
          filterOption={(input, option) =>
            (option?.label?.toLowerCase() ?? "").includes(input)
          }
          options={jobDeptData?.data?.map(({ id, name }) => ({
            value: id,
            label: name,
          }))}
          placeholder="Job Department"
        />
      </Form.Item>

      {isDisabled ? (
        <div className="flex justify-between gap-2">
          <Popconfirm
            title="Delete this Experience"
            description="Are you sure to delete this experience?"
            onConfirm={() => mutateDeleteExperience(deleteExperience)}
          >
            <Button danger loading={deleteExperienceLoading}>
              Delete
            </Button>
          </Popconfirm>
          <Button loading={updateLoading} type="primary" htmlType="submit">
            Update
          </Button>
        </div>
      ) : (
        ""
      )}
    </Skeleton>
  );
};

export default ExperienceForm;
