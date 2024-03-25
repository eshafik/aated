/* eslint-disable @typescript-eslint/no-explicit-any */
import { App, DatePicker, Form, Input, Modal, Radio, Skeleton } from "antd";
import dayJs from "dayjs";
import { FC } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CommitteePayload } from "../../libs/api/@types/committee";
import { committeeAPI } from "../../libs/api/committee";

type EditCommitteeProps = {
  isOpen?: boolean;
  committeeId?: string;
  onCancel: () => void;
};
const EditCommittee: FC<EditCommitteeProps> = ({
  isOpen,
  committeeId,
  onCancel,
}) => {
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (payload: CommitteePayload) =>
      committeeAPI.updateCommittee(payload, committeeId as string),
    {
      onSuccess: () => {
        notification.success({ message: "Successfully updated" }), onCancel();
        queryClient.invalidateQueries(["committee-details"]);
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );

  const { data: committeeDetailsData, isLoading: loadingCommitteeDetails } =
    useQuery(["committee-details"], () =>
      committeeAPI.getCommitteeDetails(committeeId as string)
    );

  // const { isSuperUser } = useSuperUser();

  return (
    <Modal
      open={isOpen}
      okText="Update"
      okType="primary"
      onOk={form.submit}
      confirmLoading={isLoading}
      onCancel={onCancel}
    >
      <Skeleton loading={loadingCommitteeDetails}>
        <Form
          form={form}
          initialValues={{
            name: committeeDetailsData?.data?.name,
            start_date: dayJs(committeeDetailsData?.data?.start_date),
            end_date: dayJs(committeeDetailsData?.data?.end_date),
            is_active: committeeDetailsData?.data?.is_active,
            committee_designation:
              committeeDetailsData?.data?.members?.[0]?.committee_designation,

            member: committeeDetailsData?.data?.members?.map(
              (items) => items?.member?.name
            ),
          }}
          onFinish={(values) => {
            mutate({
              name: values.name,
              start_date: values.start_date.format("YYYY-MM-DD"),
              end_date: values.end_date.format("YYYY-MM-DD") ?? "",
              is_active: values.is_active,
            });
          }}
          layout="vertical"
        >
          <Form.Item
            label="Committee Name"
            name="name"
            rules={[{ required: true, message: "Please Enter Committee Name" }]}
          >
            <Input placeholder="Committee Name" />
          </Form.Item>

          <Form.Item name="start_date" label="Start Date">
            <DatePicker
              format={"YYYY-MM-DD"}
              showTime={false}
              use12Hours={false}
              className="w-full"
            />
          </Form.Item>

          <Form.Item name="end_date" label="End Date">
            <DatePicker
              format={"YYYY-MM-DD"}
              showTime={false}
              use12Hours={false}
              className="w-full"
            />
          </Form.Item>

          <Form.Item name="is_active" label="Committee Status">
            <Radio.Group
              buttonStyle="solid"
              options={[
                {
                  label: "ON",
                  value: true,
                },
                {
                  label: "OFF",
                  value: false,
                },
              ]}
              optionType="button"
            />
          </Form.Item>
        </Form>
      </Skeleton>
    </Modal>
  );
};

export default EditCommittee;
