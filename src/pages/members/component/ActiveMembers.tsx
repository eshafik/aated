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
  Modal,
  Pagination,
  Popconfirm,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import { RotateCw, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { useMemberList } from "../../../config/hook/useUserSearch";
import { useSuperUser } from "../../../container/RoleProvider";
import { ApproveMembersPayload } from "../../../libs/api/@types/members";
import { membersAPI } from "../../../libs/api/membersAPI";
import MemberSearch from "../containers/MemberSearch";

const ActiveMembers = () => {
  const { isSuperUser } = useSuperUser();
  const { notification } = App.useApp();
  const [page, setPage] = useState(0);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const handelOk = () => {
    setIsModalOpen(true);
    setIsFiltersVisible(true);
  };

  return (
    <Spin spinning={isLoading}>
      {/* <Button
        type="text"
        className="xl:hidden mb-3"
        onClick={() => setIsFiltersVisible((prev) => !prev)}
        icon={<SlidersHorizontal />}
      /> */}
      <Space className="mb-3">
        <Button
          title="Member Filter"
          icon={<SlidersHorizontal />}
          onClick={() => handelOk()}
          type="text"
        />
        {isFiltersVisible ? (
          <Button
            title="Reload"
            type="text"
            icon={<RotateCw />}
            onClick={() => window.location.reload()}
          />
        ) : (
          ""
        )}
      </Space>
      <Form
        size="large"
        // className={twMerge(
        //   "hidden xl:block mb-3 mr-8 sticky top-0 z-10 bg-transparent",
        //   isFiltersVisible && "block"
        // )}
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
        <Modal
          title="Member Search"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          confirmLoading={isLoading}
          centered
          footer={[
            <Button htmlType="reset" onClick={() => form.resetFields()}>
              Reset Field
            </Button>,
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => form.submit()}
            >
              Apply Filter
            </Button>,
          ]}
        >
          <MemberSearch />
        </Modal>
      </Form>
      <Row gutter={[12, 12]}>
        {ActiveMemberData?.data?.map((item, i) => (
          <Col key={i} xs={24} sm={24} md={12} lg={12} xl={8} xxl={6}>
            <Badge.Ribbon placement="start" text={`${item?.batch_no}th batch`}>
              <Card
                className="h-full"
                hoverable
                style={{ width: 370 }}
                // cover={
                //   <Avatar
                //     size={"small"}
                //     shape="square"
                //     src={
                //       item?.profile_pic ??
                //       "https://t3.ftcdn.net/jpg/05/79/68/24/360_F_579682479_j4jRfx0nl3C8vMrTYVapFnGP8EgNHgfk.jpg"
                //     }
                //     style={{ height: 300 }}
                //   />
                // }
                actions={[
                  <Link to={`${item?.id}`}>
                    <Button type="text" icon={<EyeOutlined />}>
                      View
                    </Button>
                  </Link>,
                ]}
              >
                {isSuperUser ? (
                  <div className="absolute top-0 right-0">
                    <Dropdown
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
                    ,
                  </div>
                ) : (
                  ""
                )}
                <div className="text-center">
                  <Avatar
                    className="h-32 w-32 shadow-2xl"
                    src={
                      item?.profile_pic ??
                      "https://t3.ftcdn.net/jpg/05/79/68/24/360_F_579682479_j4jRfx0nl3C8vMrTYVapFnGP8EgNHgfk.jpg"
                    }
                  />
                  <br />
                  <Typography.Title level={4} className="shadow-2xl">
                    {item?.name}
                  </Typography.Title>
                  <Typography.Paragraph className="shadow-2xl">
                    {item?.professional_designation ?? "null"}
                  </Typography.Paragraph>
                </div>
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
