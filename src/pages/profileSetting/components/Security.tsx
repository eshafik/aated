import { App, Button, Card, Form, Input } from "antd";
import { useMutation } from "react-query";
import { profileAPI } from "../../../libs/api/profileAPI";
import { UpdateProfilePayload } from "../../../libs/api/@types/profile";

const Security = () => {
  const { notification } = App.useApp();
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
      },
    }
  );
  return (
    <Card className="shadow-2xl mr-3 bg-transparent max-w-xl">
      <Form
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
          <Button loading={isLoading} type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Security;
