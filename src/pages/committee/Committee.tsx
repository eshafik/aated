import {
  App,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { useSuperUser } from "../../container/ProfileProvider";
import { CommitteePayload } from "../../libs/api/@types/committee";
import { committeeAPI } from "../../libs/api/committee";
import PageHeader from "./components/PageHeader";

const Committee = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["committee-list"], () =>
    committeeAPI.getCommitteeList()
  );

  const { notification } = App.useApp();

  const { mutate, isLoading: loadingCreateCommittee } = useMutation(
    (payload: CommitteePayload) => committeeAPI.createCommittee(payload),
    {
      onSuccess: () => {
        notification.success({ message: "Committee created successful" });
        queryClient.invalidateQueries(["committee-list"]);
        setIsModalOpen(false);
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );

  const { isSuperUser } = useSuperUser();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  return (
    <Spin spinning={isLoading}>
      <PageHeader
        title="Committee"
        subtitle="Connect with community members by joining a communities"
        actions={
          isSuperUser ? (
            <Button
              size="large"
              className="mr-14"
              type="primary"
              onClick={() => showModal()}
            >
              Create Committee
            </Button>
          ) : (
            ""
          )
        }
      />
      <Form
        form={form}
        onFinish={(values) => {
          mutate({
            name: values.name,
            start_date: values.start_date.format("YYYY-MM-DD"),
            end_date: values.end_date.format("YYYY-MM-DD"),
          });
        }}
        layout="vertical"
      >
        <Modal
          title="Create Committee"
          open={isModalOpen}
          onOk={form.submit}
          onCancel={handleOk}
          okText="Save"
          okType="primary"
          confirmLoading={loadingCreateCommittee}
          centered
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please Enter Committee Name" }]}
          >
            <Input placeholder="Committee Name" />
          </Form.Item>

          <Form.Item name="start_date">
            <DatePicker className="w-full" placeholder="Start Date" />
          </Form.Item>

          <Form.Item name="end_date">
            <DatePicker className="w-full" placeholder="End Date" />
          </Form.Item>
        </Modal>
      </Form>
      {data?.data?.map((items, index) => (
        <Space key={index} size={"large"} direction="vertical">
          <Row gutter={[48, 48]}>
            <Col className="mt-5" span={23}>
              <Link to={`members/${items?.id}`}>
                <Card hoverable>
                  <Typography.Title level={5}>{items?.name}</Typography.Title>
                  <Typography.Paragraph type="secondary">
                    This committee Start at{" "}
                    <span className="text-black">{items?.start_date}</span> and
                    End at <span className="text-black">{items?.end_date}</span>
                  </Typography.Paragraph>
                  <Tag color={items?.is_active ? "green" : "red"}>
                    {items?.is_active ? "Active" : "Deactivate"}
                  </Tag>
                </Card>
              </Link>
            </Col>
          </Row>
        </Space>
      ))}
    </Spin>
  );
};

export default Committee;
