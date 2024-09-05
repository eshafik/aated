/* eslint-disable @typescript-eslint/no-explicit-any */
import { SettingOutlined } from "@ant-design/icons";
import {
  App,
  Avatar,
  Button,
  Dropdown,
  Form,
  Popconfirm,
  Popover,
  Tooltip,
  Typography,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Filter, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useMutation } from "react-query";
import { twMerge } from "tailwind-merge";
import CardMeta from "../../../components/CardMeta";
import { useMemberList } from "../../../config/hook/useUserSearch";
import { useUserDetails } from "../../../container/RoleProvider";
import {
  ApproveMembersPayload,
  MemberDetails,
} from "../../../libs/api/@types/members";
import { membersAPI } from "../../../libs/api/membersAPI";
import MemberSearch from "../containers/MemberSearch";

type FilterFieldType = {
  name: string;
  company: string;
  designation: string;
  job_department: string;
  location: string;
  occupation_type: string;
  student_id: string;
  batch: string;
  skills: string;
  employment_status: string;
};

const ActiveMembers = () => {
  const { isSuperUser } = useUserDetails();
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const [filters, setFilter] = useState(false);

  const {
    data: ActiveMemberData,
    isLoading,
    filter: memberFilter,
  } = useMemberList();

  const {
    mutate,
    isLoading: memberRoleLoading,
    variables,
  } = useMutation(
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

  const columns: ColumnsType<MemberDetails> = [
    {
      title: "Name",
      dataIndex: "name",
      width: 200,
      key: "name",
      fixed: "left",
      ellipsis: true,
      render: (_, record) => (
        <CardMeta
          icon={<Avatar src={record.profile_pic} size="large" />}
          title={
            <Typography.Link
              href={`members/${record.id?.toString()}`}
              className="font-semibold"
            >
              {record.name}
            </Typography.Link>
          }
          description={
            <Typography.Text type="secondary">
              {record.professional_designation}
            </Typography.Text>
          }
        />
      ),
    },
    {
      title: "Passing Year",
      width: 120,
      render: (_, record) => record.passing_year,
    },
    {
      title: "Student Id",
      width: 120,
      render: (_, record) => record.student_id,
    },
    {
      title: "Batch Number",
      width: 130,
      render: (_, record) => record.batch_no + "th",
    },
    {
      title: "Contact Details",
      width: 140,
      render: (_, record) => (
        <div className="flex gap-3">
          <Tooltip title={record.phone}>
            <Phone size={16} className="cursor-pointer" />
          </Tooltip>
          <Tooltip title={record.email}>
            <Mail size={16} className="cursor-pointer" />
          </Tooltip>
          {/* <Tooltip title={record.}>
            <Phone size={16} className="cursor-pointer" />
          </Tooltip> */}
        </div>
      ),
    },
    {
      title: "Action",
      width: 200,
      className: twMerge(!isSuperUser && "hidden"),
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "admin",
                label: (
                  <Popconfirm
                    title="Make Admin"
                    description="Are you sure you want to change member role as admin?"
                    onConfirm={() =>
                      mutate({
                        role: "admin",
                        user_id: record.id,
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
                    title="Member"
                    description="Are you sure you want to change member role as member?"
                    onConfirm={() =>
                      mutate({
                        role: "member",
                        user_id: record?.id,
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
                    title="Moderator"
                    description="Are you sure you want to change member role as moderator?"
                    onConfirm={() =>
                      mutate({
                        role: "moderator",
                        user_id: record?.id,
                      })
                    }
                    okText="Yes"
                    cancelText="No"
                    okType="danger"
                  >
                    Make Moderator
                  </Popconfirm>
                ),
              },
            ],
          }}
        >
          <Button
            type="text"
            icon={<SettingOutlined />}
            loading={record.id === variables?.user_id && memberRoleLoading}
          />
        </Dropdown>
      ),
    },
  ];

  const serializePayload = (values: FilterFieldType) => {
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
  };

  return (
    <div className="overflow-hidden">
      <Form
        size="large"
        form={form}
        onFinish={serializePayload}
        layout="inline"
      >
        <Popover
          title="Member Search"
          open={filters}
          placement="rightTop"
          onOpenChange={(open) => setFilter(open)}
          content={
            <MemberSearch
              form={form}
              onClear={() => memberFilter.clearFilter()}
            />
          }
          trigger={"click"}
        >
          <Button
            title="Member Filter"
            icon={<Filter size={16} />}
            onClick={() => setFilter(true)}
            type="primary"
            className="flex items-center justify-center mb-2"
            size="middle"
          >
            {memberFilter?.filters && "Filter Applied"}
          </Button>
        </Popover>
      </Form>
      <div className="overflow-auto">
        <Table
          rowKey={(id) => String(id.id)}
          loading={isLoading}
          columns={columns}
          dataSource={ActiveMemberData?.data}
          pagination={{
            size: "default",
            total: ActiveMemberData?.meta_data?.count,
            pageSize: memberFilter?.filters?.limit,
            onChange: memberFilter.handleChangePage,
            showTotal: () =>
              `Total: ${ActiveMemberData?.meta_data?.count} User`,
          }}
        />
      </div>
    </div>
  );
};

export default ActiveMembers;
