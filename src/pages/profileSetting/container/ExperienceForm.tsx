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
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useJobDeptSearch } from "../../../config/hook/useJobDeptSearch";
import { profileAPI } from "../../../libs/api/profileAPI";

type ExperienceFormProps = {
  isDisabled?: boolean;
  deleteExperience?: string;
  updateLoading?: boolean;
  onCancel: () => void;
};

const ExperienceForm: FC<ExperienceFormProps> = ({
  isDisabled,
  deleteExperience,
  updateLoading,
  onCancel,
}) => {
  const { jobDept: jobDeptData, filter } = useJobDeptSearch();
  const [searchValue, setSearchValue] = useState<string>("");
  const [noResults, setNoResults] = useState<boolean>(false);
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
          onCancel();
        },
        onError: (error: Error) => {
          notification.error({ message: error.message });
        },
      }
    );

  // Update search value and check for results
  const handleSearch = (value: string) => {
    setSearchValue(value);
    const filteredData = jobDeptData?.data.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    setNoResults(filteredData.length === 0); // Set noResults based on filtered data
  };

  // Handle when a user selects from the dropdown
  const handleSelect = (value: string) => {
    setSearchValue(value);
    setNoResults(false); // Reset noResults if a valid department is selected
  };

  return (
    <>
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
            message: "Please enter your department name",
          },
        ]}
      >
        {noResults ? (
          <Input
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            onBlur={() => setNoResults(searchValue.trim().length === 0)}
            placeholder="Enter your department"
          />
        ) : (
          <Select
            showSearch
            value={searchValue}
            onSearch={handleSearch}
            onSelect={handleSelect}
            filterOption={false} // Disable internal filtering
            options={jobDeptData?.data?.map(({ name }) => ({
              value: name,
              label: name,
            }))}
            placeholder="Select Job Department"
            notFoundContent={null} // Prevent showing 'Not Found' when no match
          />
        )}
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
    </>
  );
};

export default ExperienceForm;
