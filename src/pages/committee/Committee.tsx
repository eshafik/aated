import {
  App,
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Pagination,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { useCommitteeList } from "../../config/hook/useCommittee";
import { useSuperUser } from "../../container/RoleProvider";
import { CommitteePayload } from "../../libs/api/@types/committee";
import { committeeAPI } from "../../libs/api/committee";
import PageHeader from "./components/PageHeader";

const Committee = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSuperUser } = useSuperUser();
  const queryClient = useQueryClient();
  const { notification } = App.useApp();

  const { committeeData, isLoading, filter } = useCommitteeList();

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  return (
    <Spin spinning={isLoading}>
      <PageHeader
        title={
          <>
            Committee
            <Badge count={committeeData?.meta_data?.count} />
          </>
        }
        subtitle="Connect with committee members by joining a Committee"
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
        <Form
          form={form}
          requiredMark={"optional"}
          onFinish={(values) => {
            mutate({
              name: values.name,
              start_date: values.start_date.format("YYYY-MM-DD"),
              end_date: values.end_date.format("YYYY-MM-DD"),
            });
          }}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please Enter Committee Name" }]}
          >
            <Input placeholder="Committee Name" />
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="start_date"
            rules={[
              { required: true, message: "Please Enter Committee Start Date" },
            ]}
          >
            <DatePicker className="w-full" placeholder="Start Date" />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="end_date"
            rules={[
              { required: true, message: "Please Enter Committee End Date" },
            ]}
          >
            <DatePicker className="w-full" placeholder="End Date" />
          </Form.Item>
        </Form>
      </Modal>
      {committeeData?.data?.map((items, index) => (
        <Space key={index}  direction="vertical">
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

      <Pagination
        style={{ textAlign: "right", marginTop: "10px" }}
        defaultCurrent={1}
        total={committeeData?.meta_data?.count}
        defaultPageSize={committeeData?.meta_data?.page_size ?? 10}
        onChange={filter.handleChangePage}
        // showQuickJumper={true}
        // showSizeChanger={true}
      />
    </Spin>
  );
};

export default Committee;
