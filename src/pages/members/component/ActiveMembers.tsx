/* eslint-disable @typescript-eslint/no-explicit-any */
import { EyeOutlined, SettingOutlined } from "@ant-design/icons";
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
  Pagination,
  Popconfirm,
  Row,
  Select,
  Spin,
} from "antd";
import Meta from "antd/es/card/Meta";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useJobDeptSearch } from "../../../config/hook/useJobDeptSearch";
import { useMemberList } from "../../../config/hook/useUserSearch";
import { useSuperUser } from "../../../container/ProfileProvider";
import { ApproveMembersPayload } from "../../../libs/api/@types/members";
import { membersAPI } from "../../../libs/api/membersAPI";
import { searchAPI } from "../../../libs/api/searchAPI";

const ActiveMembers = () => {
  const { isSuperUser } = useSuperUser();
  const { notification } = App.useApp();
  const [page, setPage] = useState(0);

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

  const { filter, jobDept: jobDeptData } = useJobDeptSearch();

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
        type="text"
        className="xl:hidden mb-3"
        onClick={() => setIsFiltersVisible((prev) => !prev)}
        icon={<SlidersHorizontal />}
      />

      <Form
        size="large"
        className={twMerge(
          "hidden xl:block mb-3 mr-7",
          isFiltersVisible && "block"
        )}
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
      </Form>
      <Row gutter={[12, 12]}>
        {ActiveMemberData?.data?.map((item, i) => (
          <Col key={i} xs={24} sm={24} md={12} lg={12} xl={8} xxl={6}>
            <Badge.Ribbon placement="start" text={`${item?.batch_no}th batch`}>
              {/* <Link to={`${item?.id}`}> */}
              <Card
                type="inner"
                className="h-full"
                style={{ width: 370 }}
                cover={
                  <Avatar
                    shape="square"
                    src={
                      item?.profile_pic ??
                      "https://t3.ftcdn.net/jpg/05/79/68/24/360_F_579682479_j4jRfx0nl3C8vMrTYVapFnGP8EgNHgfk.jpg"
                    }
                    style={{ height: 300 }}
                  />
                }
                hoverable
                actions={[
                  isSuperUser ? (
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
                      <Button type="text" icon={<SettingOutlined />} />
                    </Dropdown>
                  ) : (
                    ""
                  ),
                  <Link to={`${item?.id}`}>
                    <Button type="text" icon={<EyeOutlined />}>
                      View
                    </Button>
                  </Link>,
                ]}
              >
                <Meta
                  avatar={<Avatar src={item?.profile_pic} />}
                  title={item?.name}
                  description={item?.professional_designation ?? "Null"}
                />
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
      <div style={{ float: "right" }} className="sticky bottom-10">
        <Pagination
          className="px-4"
          size="default"
          total={ActiveMemberData?.meta_data?.page_size}
          pageSize={10}
          current={page}
          onChange={(page) => setPage(page)}
          showQuickJumper={true}
        />
      </div>
    </Spin>
  );
};

export default ActiveMembers;
