/* eslint-disable @typescript-eslint/no-explicit-any */
import {
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
import { useMutation, useQuery } from "react-query";
import { membersAPI } from "../../../libs/api/membersAPI";
import { Link } from "react-router-dom";
import { searchAPI } from "../../../libs/api/searchAPI";
import { useMemo } from "react";
import { ApproveMembersPayload } from "../../../libs/api/@types/members";
import { MoreOutlined } from "@ant-design/icons";
import { profileAPI } from "../../../libs/api/profileAPI";
import { useMemberList } from "../../../config/hook/useUserSearch";

const ActiveMembers = () => {
  const {
    members: ActiveMemberData,
    filter: memberFilter,
    isLoading,
  } = useMemberList();

  const { data: batchData } = useQuery(["batch-list"], () =>
    searchAPI.getBatchList()
  );

  const { data: occupationData } = useQuery(["occupation-list"], () =>
    searchAPI.getOccupationList()
  );

  const { data: jobDeptData } = useQuery(["jobDept-list"], () =>
    searchAPI.getJobDepartment()
  );

  const { mutate } = useMutation((payload: ApproveMembersPayload) =>
    membersAPI.updateMemberRole(payload)
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

  const { data: superUser } = useQuery(["user-profile"], () =>
    profileAPI.superUserCheck()
  );

  return (
    <Spin spinning={isLoading}>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Form
            onFinish={(values) => {
              memberFilter.handleChangeName(values.name);
              memberFilter.handleChangeCompany(values.company);
              memberFilter.handleChangeDesignation(values.designation);
              memberFilter.handleChangeJobDepartment(values.job_department);
              memberFilter.handleChangeLocation(values.location);
              memberFilter.handleChangeOccupation(values.occupation_type);
              memberFilter.handleChangeStudentId(values.student_id);
              memberFilter.handleChangeOrdering(values.batch);
            }}
            layout="inline"
          >
            <Form.Item name="name">
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item name="designation">
              <Input placeholder="Designation" />
            </Form.Item>

            <Form.Item name="student_id">
              <Input placeholder="Student id" />
            </Form.Item>

            <Form.Item name="location">
              <Input placeholder="Location" />
            </Form.Item>

            <Form.Item name="company">
              <Input placeholder="Company" />
            </Form.Item>

            <Form.Item name="skills">
              <Input placeholder="Skills" />
            </Form.Item>

            <Form.Item>
              <Select
                style={{ width: "205px" }}
                placeholder="Batch"
                options={batchoptions}
              />
            </Form.Item>

            <Form.Item>
              <Select
                style={{ width: "205px" }}
                placeholder="Occupation"
                options={occupationoptions}
              />
            </Form.Item>

            <Form.Item>
              <Select
                style={{ width: "205px" }}
                placeholder="Job department"
                options={jobDeptoptions}
              />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit">Apply Filter</Button>
            </Form.Item>
          </Form>
        </Col>
        {ActiveMemberData?.data?.map((item, i) => (
          <Col key={i} xs={24} md={8} lg={6}>
            <Badge.Ribbon text={`${item?.batch_no}th batch`}>
              <Card type="inner" hoverable className="h-full">
                <Link to={`${item?.id}`}>
                  <Space align="start" size="middle">
                    <Avatar
                      size="large"
                      className="bg-primary/[15%] border-none dark:bg-primary flex justify-center items-center"
                      src={item?.profile_pic}
                    />
                    <Space.Compact direction="vertical">
                      <Typography.Title level={5} className="mb-1 mt-1">
                        {item?.name}
                      </Typography.Title>
                      <Typography.Paragraph
                        type="secondary"
                        className="mb-0"
                        ellipsis={{ rows: 2 }}
                      >
                        {item?.student_id}
                      </Typography.Paragraph>
                    </Space.Compact>
                  </Space>
                </Link>
                <div className="text-end">
                  <Dropdown
                    disabled={!superUser?.data?.is_superuser}
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
                    <Button icon={<MoreOutlined />} />
                  </Dropdown>
                </div>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
    </Spin>
  );
};

export default ActiveMembers;
