import { Button, Col, Dropdown, Row, Switch, Table, notification } from "antd";
import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { committeeAPI } from "../../libs/api/committee";
import { ColumnsType } from "antd/es/table";
import { Committee, CommitteePayload } from "../../libs/api/@types/committee";
import { profileAPI } from "../../libs/api/profileAPI";

const Committee = () => {
  const navigate = useNavigate();

  const { data } = useQuery(["committee-list"], () =>
    committeeAPI.getcommitteeList()
  );

  // const { data: committeeMemberData } = useQuery(
  //   ["members-list"],
  //   () => committeeAPI.getcommitteeMembersList(),
  //   {
  //     onError: () => {
  //       notification.error({ message: "You do not have permission" });
  //     },
  //   }
  // );
  const { data: profileData } = useQuery(["user-profile"], () =>
    profileAPI.getProfileDetails()
  );

  const { mutate, isLoading } = useMutation(
    ({ id, payload }: { id: string | number; payload: CommitteePayload }) =>
      committeeAPI.updateCommittee(id, payload),
    {
      onError: () => {
        notification.error({
          message: "You do not have permission to perform this action.",
        });
      },
    }
  );

  const switchHandler = (id: string, is_active?: boolean) => {
    const payload = {
      is_active: is_active == true ? true : false,
    };

    mutate({ id, payload });
  };

  const columns: ColumnsType<Committee> = [
    {
      title: "Committee Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => record?.name,
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (_, record) => record?.start_date,
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (_, record) => record?.end_date,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      responsive: ["md", "sm", "xs"],
      align: "center",
      key: "status",
      render: (_, record) => (
        <Switch
          disabled={!profileData?.data?.is_superuser}
          loading={isLoading}
          defaultChecked={record?.is_active ? true : false}
          onChange={(value) => switchHandler(String(record?.id), value)}
        />
      ),
    },
    {
      title: "View Members",
      dataIndex: "view",
      key: "view",
      render: (_, record) => <Link to={`members/${record?.id}`}>View</Link>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                label: "Edit",
                disabled: !profileData?.data?.is_superuser,
                icon: <EditOutlined />,
                onClick: () => navigate(`${record?.id}`),
              },
            ],
          }}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="p-12">
      <Row align={"middle"} justify={"space-between"}>
        <Col></Col>
        <Col>
          <Button
            className="mb-3"
            type="primary"
            onClick={() => navigate("createcommittee")}
          >
            Create committee
          </Button>
        </Col>
      </Row>

      <Table
        rowKey={(record) => record?.id?.toString()}
        bordered
        dataSource={data?.data}
        columns={columns}
      />
    </div>
  );
};

export default Committee;
