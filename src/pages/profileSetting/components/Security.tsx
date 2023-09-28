import { App, Button, Form, Input } from "antd";
import { useMutation } from "react-query";
import { StyledCard } from "../../../components/StyleCard";
import { UpdateProfilePayload } from "../../../libs/api/@types/profile";
import { profileAPI } from "../../../libs/api/profileAPI";

const Security = () => {
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  // const queryClient = useQueryClient();
  // const { data, isLoading: isProfileLoading } = useQuery(
  //   ["user-profile"],
  //   () => profileAPI.getProfileDetails(),
  //   {
  //     onSuccess: () => {},
  //   }
  // );

  const { mutate, isLoading } = useMutation(
    (payload: UpdateProfilePayload) => profileAPI.updateProfileDetails(payload),
    {
      onSuccess: () => {
        notification.success({ message: "Profile Successfully Updated" });
        form.resetFields();
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );
  return (
    <StyledCard title="Password Change">
      <Form
        form={form}
        onFinish={(values) => {
          mutate({
            password: values.password,
          });
        }}
        requiredMark
        size="large"
        layout="vertical"
      >
        {/* <Form.Item label="Old Password" name="old_password">
          <Input.Password
            placeholder="old password"
            suffix={<SecurityScanTwoTone />}
          />
        </Form.Item> */}

        <Form.Item
          name="password"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            className="flex ml-auto"
            loading={isLoading}
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </StyledCard>
  );
};

export default Security;
