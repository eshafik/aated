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
  Pagination,
  Popconfirm,
  Row,
  Spin,
} from "antd";
import Meta from "antd/es/card/Meta";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useMemberList } from "../../../config/hook/useUserSearch";
import { useSuperUser } from "../../../container/ProfileProvider";
import { ApproveMembersPayload } from "../../../libs/api/@types/members";
import { membersAPI } from "../../../libs/api/membersAPI";
import MemberSearch from "../containers/MemberSearch";

const ActiveMembers = () => {
  const { isSuperUser } = useSuperUser();
  const { notification } = App.useApp();
  const [page, setPage] = useState(0);
  const [form] = Form.useForm();

  const {
    members: ActiveMemberData,
    isLoading,
    filter: memberFilter,
  } = useMemberList();

  const { mutate } = useMutation(
    (payload: ApproveMembersPayload) => membersAPI.updateMemberRole(payload),
    {
      onSuccess: () => {
        notification.success({ message: "Role Updated" });
      },
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
        <MemberSearch form={form} />
      </Form>
      <Row gutter={[12, 12]}>
        {ActiveMemberData?.data?.map((item, i) => (
          <Col key={i} xs={24} sm={24} md={12} lg={12} xl={8} xxl={6}>
            <Badge.Ribbon placement="start" text={`${item?.batch_no}th batch`}>
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
                  </Dropdown>,
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
                  description={item?.professional_designation ?? "null"}
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
