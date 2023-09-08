/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, DatePicker, Form, Input, Row } from "antd";
import { useMutation } from "react-query";
import { CommitteePayload } from "../../libs/api/@types/committee";
import { committeeAPI } from "../../libs/api/committee";
const CreateCommittee = () => {
  const { mutate, isLoading } = useMutation((payload: CommitteePayload) =>
    committeeAPI.createCommittee(payload)
  );

  return (
    <Row align="middle" justify={"center"}>
      <Col span={8}>
        <Card className="shadow-2xl" title="Create Your Committee">
          <Form
            onFinish={(values) => {
              mutate({
                name: values.name,
                start_date: values.start_date,
                end_date: values.end_date,
              });
            }}
            layout="vertical"
          >
            <Form.Item
              label="Committee Name"
              name="name"
              rules={[
                { required: true, message: "Please Enter Committee Name" },
              ]}
            >
              <Input placeholder="Committee Name" />
            </Form.Item>

            <Form.Item name="start_date" label="Start Date">
              <DatePicker />
            </Form.Item>

            <Form.Item name="end_date" label="End Date">
              <DatePicker />
            </Form.Item>

            <Form.Item>
              <Button loading={isLoading} htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateCommittee;
