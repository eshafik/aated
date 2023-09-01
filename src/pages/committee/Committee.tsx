import { Button, Card, Col, Dropdown, Row, Table, Typography } from "antd";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Committee = () => {
  const navigate = useNavigate();
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
      action: true,
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      action: true,
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                label: "Edit",
                icon: <EditOutlined />,
                onClick: () => navigate(`/settings/skill/`),
              },
              {
                key: "delete",
                label: "Delete",
                icon: <DeleteOutlined />,
                //   onClick: () => showDeleteWarning(String(record?.id)),
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
          <Button>Create committee</Button>
        </Col>
      </Row>
      <Card extra={<Button>Add Members</Button>}>
        <Table bordered dataSource={dataSource} columns={columns} />
      </Card>
    </>
  );
};

export default Committee;
