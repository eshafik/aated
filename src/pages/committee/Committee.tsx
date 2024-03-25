import {
  App,
  Badge,
  Button,
  Card,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Modal,
  Pagination,
  Spin,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";
import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { useCommitteeList } from "../../config/hook/useCommittee";
import { useUserDetails } from "../../container/RoleProvider";
import { CommitteePayload } from "../../libs/api/@types/committee";
import { committeeAPI } from "../../libs/api/committee";
import PageHeader from "./components/PageHeader";

const Committee = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSuperUser } = useUserDetails();
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
    <div>
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
            isSuperUser && (
              <Button size="large" type="primary" onClick={() => showModal()}>
                Create Committee
              </Button>
            )
          }
        />
        <CreateCommitteeModal
          form={form}
          isLoading={loadingCreateCommittee}
          isModalOpen={isModalOpen}
          handelOk={handleOk}
          mutate={mutate}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {committeeData?.data?.map((items, index) => (
            <Link to={`members/${items?.id}`} key={index}>
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
          ))}
        </div>

        <Pagination
          style={{ textAlign: "right", marginTop: "10px" }}
          defaultCurrent={1}
          total={committeeData?.meta_data?.count}
          defaultPageSize={committeeData?.meta_data?.page_size ?? 10}
          onChange={filter.handleChangePage}
        />
      </Spin>
    </div>
  );
};

export default Committee;

type CreateCommitteeModalProps = {
  form: FormInstance;
  isLoading: boolean;
  isModalOpen: boolean;
  handelOk: () => void;
  mutate: UseMutateFunction<unknown, Error, CommitteePayload, unknown>;
};
const CreateCommitteeModal = ({
  form,
  isLoading,
  isModalOpen,
  handelOk,
  mutate,
}: CreateCommitteeModalProps) => {
  return (
    <Modal
      title="Create Committee"
      open={isModalOpen}
      onOk={form.submit}
      onCancel={handelOk}
      okText="Save"
      okType="primary"
      confirmLoading={isLoading}
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
            {
              required: true,
              message: "Please Enter Committee Start Date",
            },
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
  );
};
