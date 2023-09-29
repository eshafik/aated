import { Button, Form, FormInstance, Input, Select } from "antd";
import { FC } from "react";
import { useQuery } from "react-query";
import { useJobDeptSearch } from "../../../config/hook/useJobDeptSearch";
import { searchAPI } from "../../../libs/api/searchAPI";

const employeeOptions = [
  {
    label: "Employed",
    value: "employed",
  },
  {
    label: "Unemployed",
    value: "unemployed",
  },
  {
    label: "Student",
    value: "student",
  },
];

type MemberSearchProps = {
  form: FormInstance;
};

const MemberSearch: FC<MemberSearchProps> = ({ form }) => {
  const { data: batchData } = useQuery(["batch-list"], () =>
    searchAPI.getBatchList()
  );

  const { data: occupationData } = useQuery(["occupation-list"], () =>
    searchAPI.getOccupationList()
  );

  const { filter, jobDept: jobDeptData } = useJobDeptSearch();

  return (
    <div className="flex flex-wrap gap-2">
      <Form.Item name="name" className="w-36 sm:w-40">
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item name="designation" className="w-36 sm:w-40">
        <Input placeholder="Designation" />
      </Form.Item>

      <Form.Item name="student_id" className="w-36 sm:w-40">
        <Input placeholder="Student id" />
      </Form.Item>

      <Form.Item name="location" className="w-36 sm:w-40">
        <Input placeholder="Location" />
      </Form.Item>

      <Form.Item name="company" className="w-36 sm:w-40">
        <Input placeholder="Company" />
      </Form.Item>

      <Form.Item name="skills" className="w-36 sm:w-40">
        <Input placeholder="Skills" />
      </Form.Item>

      <Form.Item name="employment_status" className="w-36 sm:w-40">
        <Select placeholder="Employee Status" options={employeeOptions} />
      </Form.Item>

      <Form.Item name="batch" className="w-36 sm:w-40">
        <Select
          placeholder="Batch"
          options={batchData?.data?.map(({ id, name }) => ({
            value: id?.toString(),
            label: name,
          }))}
        />
      </Form.Item>

      <Form.Item name="occupation_type" className="w-38 sm:w-40">
        <Select
          placeholder="Occupation"
          options={occupationData?.data?.map(({ id, name }) => ({
            value: id?.toString(),
            label: name,
          }))}
        />
      </Form.Item>

      <Form.Item name="job_department" className="w-38 sm:w-40">
        <Select
          onSearch={filter.handleChangeJobDept}
          showSearch
          allowClear
          placeholder="Job department"
          options={jobDeptData?.data?.map(({ name }) => ({
            value: name?.toLowerCase(),
            label: name,
          }))}
        />
      </Form.Item>

      <div className="flex ml-auto">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Apply Filter
          </Button>
        </Form.Item>

        <Form.Item>
          <Button onClick={() => form.resetFields()} htmlType="reset">
            Reset Filter
          </Button>
        </Form.Item>
      </div>
    </div>
  );
};

export default MemberSearch;
