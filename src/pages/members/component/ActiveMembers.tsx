/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarsOutlined, MoreOutlined } from "@ant-design/icons";
import {
  App,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
  SelectProps,
  Space,
  Spin,
  Typography,
} from "antd";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useMemberList } from "../../../config/hook/useUserSearch";
import { useSuperUser } from "../../../container/ProfileProvider";
import { ApproveMembersPayload } from "../../../libs/api/@types/members";
import { membersAPI } from "../../../libs/api/membersAPI";
import { searchAPI } from "../../../libs/api/searchAPI";

const ActiveMembers = () => {
  const { isSuperUser } = useSuperUser();
  const { notification } = App.useApp();
  const {
    members: ActiveMemberData,
    isLoading,
    filter: memberFilter,
  } = useMemberList();

  const [form] = Form.useForm();

  const { data: batchData } = useQuery(["batch-list"], () =>
    searchAPI.getBatchList()
  );

  const { data: occupationData } = useQuery(["occupation-list"], () =>
    searchAPI.getOccupationList()
  );

  const { data: jobDeptData } = useQuery(["jobDept-list"], () =>
    searchAPI.getJobDepartment()
  );

  const batchoptions: SelectProps["options"] = useMemo(() => {
    if (batchData?.data && Array.isArray(batchData?.data)) {
      return batchData?.data.reduce(
        (acc: any, curr: any) => {
          acc.push({ value: curr.id.toString(), label: curr.name });
          return acc;
        },
        [batchData?.data]
      );
    }

    return [];
  }, [batchData?.data]);

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

  const occupationoptions: SelectProps["options"] = useMemo(() => {
    if (occupationData?.data && Array.isArray(occupationData?.data)) {
      return occupationData?.data.reduce(
        (acc: any, curr: any) => {
          acc.push({ value: curr.id.toString(), label: curr.name });
          return acc;
        },
        [occupationData?.data]
      );
    }

    return [];
  }, [occupationData?.data]);

  const jobDeptoptions: SelectProps["options"] = useMemo(() => {
    if (jobDeptData?.data && Array.isArray(jobDeptData?.data)) {
      return jobDeptData?.data.reduce(
        (acc: any, curr: any) => {
          acc.push({ value: curr.id.toString(), label: curr.name });
          return acc;
        },
        [jobDeptData?.data]
      );
    }
    return [];
  }, [jobDeptData?.data]);

  const { mutate } = useMutation(
    (payload: ApproveMembersPayload) => membersAPI.updateMemberRole(payload),
    {
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );

  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  return (
    <Spin spinning={isLoading}>
      <Button
        className="xl:hidden "
        onClick={() => setIsFiltersVisible((prev) => !prev)}
        icon={<BarsOutlined />}
      />

      <Form
        size="large"
        className={twMerge("hidden xl:block", isFiltersVisible && "block")}
        form={form}
        onFinish={(values) => {
          memberFilter.handleChangeName(values.name);
          memberFilter.handleChangeCompany(values.company);
          memberFilter.handleChangeDesignation(values.designation);
          memberFilter.handleChangeJobDepartment(values.job_department);
          memberFilter.handleChangeLocation(values.location);
          memberFilter.handleChangeOccupation(values.occupation_type);
          memberFilter.handleChangeStudentId(values.student_id);
          memberFilter.handleChangeOrdering(values.batch);
          memberFilter.handleChangeSkills(values.skills);
          memberFilter.handleChangeEmployeeStatus(values.employment_status);
        }}
        layout="inline"
      >
        <div className="flex flex-wrap gap-1">
          <Form.Item name="name" className="w-36 sm:w-36">
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item name="designation" className="w-36 sm:w-36">
            <Input placeholder="Designation" />
          </Form.Item>

          <Form.Item name="student_id" className="w-36 sm:w-36">
            <Input placeholder="Student id" />
          </Form.Item>

          <Form.Item name="location" className="w-36 sm:w-36">
            <Input placeholder="Location" />
          </Form.Item>

          <Form.Item name="company" className="w-36 sm:w-36">
            <Input placeholder="Company" />
          </Form.Item>

          <Form.Item name="skills" className="w-36 sm:w-36">
            <Input placeholder="Skills" />
          </Form.Item>

          <Form.Item name="employment_status" className="w-36 sm:w-36">
            <Select placeholder="Employee Status" options={employeeOptions} />
          </Form.Item>

          <Form.Item name="batch" className="w-36 sm:w-36">
            <Select placeholder="Batch" options={batchoptions} />
          </Form.Item>

          <Form.Item name="occupation_type" className="w-38 sm:w-36">
            <Select placeholder="Occupation" options={occupationoptions} />
          </Form.Item>

          <Form.Item name="job_department" className="w-38 sm:w-36">
            <Select placeholder="Job department" options={jobDeptoptions} />
          </Form.Item>

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
      </Form>
      <Row gutter={[12, 12]}>
        {ActiveMemberData?.data?.map((item, i) => (
          <Col key={i} xs={24} sm={24} md={12} lg={12} xl={8} xxl={6}>
            <Badge.Ribbon placement="start" text={`${item?.batch_no}th batch`}>
              <Link to={`${item?.id}`}>
                <Card
                  className="h-48"
                  hoverable
                  extra={
                    <Dropdown
                      disabled={!isSuperUser}
                      menu={{
                        items: [
                          {
                            key: "admin",
                            label: (
                              <Popconfirm
                                title="Make Admin?"
                                description="Are you sure to Make Admin"
                                onConfirm={() =>
                                  mutate({
                                    role: "admin",
                                    user_id: item?.id,
                                  })
                                }
                                okText="Yes"
                                cancelText="No"
                                okType="danger"
                              >
                                Make Admin
                              </Popconfirm>
                            ),
                          },
                          {
                            key: "member",
                            label: (
                              <Popconfirm
                                title="Make member?"
                                description="Are you sure to Make member"
                                onConfirm={() =>
                                  mutate({
                                    role: "member",
                                    user_id: item?.id,
                                  })
                                }
                                okText="Yes"
                                cancelText="No"
                                okType="danger"
                              >
                                Make Member
                              </Popconfirm>
                            ),
                          },
                          {
                            key: "moderator",
                            label: (
                              <Popconfirm
                                title="Make member?"
                                description="Are you sure to Make member"
                                onConfirm={() =>
                                  mutate({
                                    role: "moderator",
                                    user_id: item?.id,
                                  })
                                }
                                okText="Yes"
                                cancelText="No"
                                okType="danger"
                              >
                                Make moderator
                              </Popconfirm>
                            ),
                          },
                        ],
                      }}
                    >
                      <Button type="text" icon={<MoreOutlined />} />
                    </Dropdown>
                  }
                >
                  <div>
                    <Space align="start" size="middle">
                      <Avatar
                        size="large"
                        className="bg-primary/[15%] border-none dark:bg-primary flex justify-center items-center"
                        src={item?.profile_pic}
                      />
                      <Space.Compact direction="vertical">
                        <Typography.Title level={5} className="mb-1 mt-1 ">
                          {item?.name}
                        </Typography.Title>
                        <Typography.Paragraph
                          type="secondary"
                          className="mb-0"
                          ellipsis={{ rows: 2 }}
                        >
                          {item?.student_id}
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                          {item?.professional_designation}
                        </Typography.Paragraph>
                      </Space.Compact>
                    </Space>
                  </div>
                </Card>
              </Link>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
    </Spin>
  );
};

export default ActiveMembers;
