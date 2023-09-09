import { Button, Col, Dropdown, Row, Switch, Table, Typography } from "antd";
import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { committeeAPI } from "../../libs/api/committee";
import { ColumnsType } from "antd/es/table";
import { Committee, CommitteePayload } from "../../libs/api/@types/committee";

const Committee = () => {
  const navigate = useNavigate();
  const { data } = useQuery(["committee-list"], () =>
    committeeAPI.getcommitteeList()
  );

  const { mutate, isLoading } = useMutation(
    ({ id, payload }: { id: string | number; payload: CommitteePayload }) =>
      committeeAPI.updateCommittee(id, payload)
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
          loading={isLoading}
          defaultChecked={record?.is_active ? true : false}
          onChange={(value) => switchHandler(String(record?.id), value)}
        />
      ),
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
    <>
      <Row justify={"space-between"}>
        <Col>
          <Typography.Title level={2}>Committee name</Typography.Title>
        </Col>
        <Col>
          <Button onClick={() => navigate("createcommittee")}>
            Create committee
          </Button>
        </Col>
      </Row>

      <Table
        // rowKey={(record) => record?.id}
        bordered
        dataSource={data?.data}
        columns={columns}
      />
    </>
  );
};

export default Committee;
