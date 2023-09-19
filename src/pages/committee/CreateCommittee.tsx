/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, DatePicker, Form, Input, Row } from "antd";
import { useMutation, useQuery } from "react-query";
import { CommitteePayload } from "../../libs/api/@types/committee";
import { committeeAPI } from "../../libs/api/committee";
import { profileAPI } from "../../libs/api/profileAPI";
const CreateCommittee = () => {
  const { data } = useQuery(["user-profile"], () =>
    profileAPI.getProfileDetails()
  );

  const { mutate, isLoading } = useMutation((payload: CommitteePayload) =>
    committeeAPI.createCommittee(payload)
  );

  return (
    <Row align="middle" justify={"center"}>
      <Col span={8}>
        {data?.data?.is_superuser ? (
          <Card className="shadow-2xl" title="Create Your Committee">
            <Form
              onFinish={(values) => {
                mutate({
                  name: values.name,
                  start_date: values.start_date,
                  end_date: values.end_date,
                });
                console.log(values);
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
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>

              <Form.Item name="end_date" label="End Date">
                <DatePicker />
              </Form.Item>

              <Form.Item>
                <Button type="primary" loading={isLoading} htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Card>
        ) : (
          "Only Admin have permission to do this action"
        )}
      </Col>
    </Row>
  );
};

export default CreateCommittee;
