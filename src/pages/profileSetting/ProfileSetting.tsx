import {
  App,
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Spin,
  Typography,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { UpdateProfilePayload } from "../../libs/api/@types/profile";
import { profileAPI } from "../../libs/api/profileAPI";

const ProfileSetting = () => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { mutate, isLoading } = useMutation(
    (payload: UpdateProfilePayload) => profileAPI.updateProfileDetails(payload),
    {
      onSuccess: () => {
        notification.success({ message: "Profile Successfully Updated" });
        queryClient.invalidateQueries(["user-profile"]);
      },
    }
  );
  const { data, isLoading: isProfileLoading } = useQuery(
    ["user-profile"],
    () => profileAPI.getProfileDetails(),
    {
      onSuccess: () => {
        form.setFieldsValue({
          name: data?.data?.name,
          email: data?.data?.email,
          phone: data?.data?.phone,
          batch_no: data?.data?.batch_no,
          passing_year: data?.data?.passing_year,
          student_id: data?.data?.student_id,
        });
      },
    }
  );

  return (
    <Spin spinning={isProfileLoading}>
      <Card className="max-w-xl">
        <Form
          form={form}
          initialValues={{
            name: data?.data?.name,
            email: data?.data?.email,
            phone: data?.data?.phone,
            batch_no: data?.data?.batch_no,
            passing_year: data?.data?.passing_year,
            student_id: data?.data?.student_id,
          }}
          requiredMark="optional"
          layout="vertical"
          labelAlign="left"
          onFinish={(values) => {
            mutate({
              name: values.name,
              email: values.email,
              phone: values.phone,
              batch_no: values.batch_no,
              passing_year: values.passing_year,
              student_id: values.student_id,
            });
          }}
        >
          {/* <Form.Item name="profile_pic">
          <Upload listType="picture-circle">Upload here</Upload>
        </Form.Item> */}

          <Form.Item
            shouldUpdate
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your Name" }]}
          >
            <Input placeholder="John" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your Email" }]}
          >
            <Input placeholder="someone@gmail.com" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Contact Number"
            rules={[
              { required: true, message: "Please enter your Phone Number" },
            ]}
          >
            <Input placeholder="01XXXXXXXX" />
          </Form.Item>

          <Typography.Title level={5}>Job Experience</Typography.Title>
          <Form.Item
            name="batch_no"
            label="Batch Number"
            rules={[{ required: true, message: "Please select role" }]}
          >
            <Input placeholder="5 Years" />
          </Form.Item>

          <Form.Item
            name="student_id"
            label="Student ID"
            rules={[
              { required: true, message: "Please enter your Company Name" },
            ]}
          >
            <Input placeholder="Microsoft" />
          </Form.Item>

          <Form.Item
            name="passing_year"
            label="Passing Year"
            rules={[
              { required: true, message: "Please write some description" },
            ]}
          >
            <InputNumber placeholder="Write something" />
          </Form.Item>

          <Form.Item>
            <Button
              loading={isLoading || isProfileLoading}
              className="bg-blue-500 flex justify-end"
              htmlType="submit"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Spin>
  );
};

export default ProfileSetting;
