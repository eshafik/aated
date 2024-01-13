import { DeleteOutlined, EditTwoTone, MoreOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Spin,
  Table,
  notification,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useMemberList } from "../../../config/hook/useUserSearch";
import { useUserDetails } from "../../../container/RoleProvider";
import {
  CommitteeMemberPayload,
  CommitteeMembers,
} from "../../../libs/api/@types/committee";
import { committeeAPI } from "../../../libs/api/committee";
import EditCommittee from "../EditCommittee";
import PageHeader from "../components/PageHeader";

const CommitteeMembers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { slag } = useParams();
  const queryClient = useQueryClient();
  const { isSuperUser } = useUserDetails();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: CommitteeName } = useQuery(["committee-details"], () =>
    committeeAPI.getCommitteeDetails(slag as string)
  );

  const { data, isLoading } = useQuery(["committeeMember-details"], () =>
    committeeAPI.getCommitteeMembersList(slag as string)
  );

  const { mutate } = useMutation(
    [""],
    (id?: string | number) => committeeAPI?.removeCommitteeMember(id),
    {
      onSuccess: () => {
        notification.success({ message: "Member Delete successfully" });
        queryClient.invalidateQueries(["committeeMember-details"]);
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );

  const switchHandler = (id?: string | number) => {
    mutate(id);
  };

  const column: ColumnsType<CommitteeMembers> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) => record?.member?.name,
    },
    {
      title: "Designation",
      dataIndex: "committee_designation",
      render: (_, record) => record?.committee_designation,
    },
    {
      title: "Position",
      dataIndex: "position",
      render: (_, record) => record?.position_order,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (_, record) => (
        <Dropdown
          disabled={!isSuperUser}
          menu={{
            items: [
              {
                key: "delete",
                label: "Delete",
                icon: <DeleteOutlined />,
                onClick: () => switchHandler(record?.id),
              },
            ],
          }}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const {
    data: ActiveMemberData,
    filter,
    isLoading: loadingMembers,
  } = useMemberList();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const { mutate: addMemberMutate } = useMutation(
    ["committee-member"],
    (payload: CommitteeMemberPayload) =>
      committeeAPI.addCommitteeMember(payload),
    {
      onSuccess: () => {
        notification.success({ message: "Success" });
        queryClient.invalidateQueries(["committeeMember-details"]);
        setIsModalOpen(false);
      },
      onError: (error: Error) => {
        notification.error({ message: error.name });
      },
    }
  );

  return (
    <>
      <EditCommittee
        isOpen={isEditModalOpen}
        committeeId={slag?.toString()}
        onCancel={() => setIsEditModalOpen(false)}
      />
      <Spin spinning={isLoading || loadingMembers}>
        <div className="pr-11">
          <PageHeader
            title={CommitteeName?.data?.name}
            subActions={
              isSuperUser ? (
                <Button
                  type="dashed"
                  icon={<EditTwoTone />}
                  onClick={() => setIsEditModalOpen(true)}
                />
              ) : (
                ""
              )
            }
            subtitle={`Start Date: ${CommitteeName?.data?.start_date} & End Date: ${CommitteeName?.data?.end_date}`}
            actions={
              isSuperUser ? (
                <Button
                  size="large"
                  type="primary"
                  className="ml-5"
                  onClick={() => showModal()}
                >
                  Add Members
                </Button>
              ) : (
                // </Link>
                ""
              )
            }
          />
          <Modal
            title="Add Members"
            open={isModalOpen}
            onOk={form.submit}
            onCancel={handleOk}
            okText="Save"
            okType="primary"
            confirmLoading={isLoading}
            centered
          >
            <Form
              onFinish={(values) =>
                addMemberMutate({
                  committee: slag,
                  member: values.member,
                  committee_designation: values.committee_designation,
                  position_order: values.position_order,
                })
              }
              layout="vertical"
              form={form}
            >
              <Form.Item name="member" label="Members">
                <Select
                  onSearch={filter.handleChangeName}
                  optionFilterProp="children"
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    (option?.label?.toLowerCase() ?? "").includes(input)
                  }
                  loading={loadingMembers}
                  options={ActiveMemberData?.data?.map(({ id, name }) => ({
                    value: id,
                    label: name,
                  }))}
                  placeholder="Members"
                />
              </Form.Item>

              <Form.Item
                name="committee_designation"
                label="Committee Designation"
              >
                <Input placeholder="Committee Designation" />
              </Form.Item>

              <Form.Item name="position_order" label="Position Order">
                <InputNumber className="w-full" placeholder="Position Order" />
              </Form.Item>
            </Form>
          </Modal>
          <Table
            bordered
            rowKey={(key) => key.id?.toString() ?? ""}
            dataSource={data?.data || []}
            columns={column}
            pagination={{
              size: "default",
              total: ActiveMemberData?.meta_data?.count,
              pageSize: filter?.filters?.limit,
              onChange: filter.handleChangePage,
              showTotal: () => `Total: ${data?.meta_data?.count} User`,
            }}
          />
        </div>
      </Spin>
    </>
  );
};

export default CommitteeMembers;
