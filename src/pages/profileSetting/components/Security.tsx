import { SecurityScanTwoTone } from "@ant-design/icons";
import { App, Button, Card, Form, Input } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { profileAPI } from "../../../libs/api/profileAPI";
import { UpdateProfilePayload } from "../../../libs/api/@types/profile";

const Security = () => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const { data, isLoading: isProfileLoading } = useQuery(
    ["user-profile"],
    () => profileAPI.getProfileDetails(),
    {
      onSuccess: () => {},
    }
  );

  const { mutate, isLoading } = useMutation(
    (payload: UpdateProfilePayload) => profileAPI.updateProfileDetails(payload),
    {
      onSuccess: () => {
        notification.success({ message: "Profile Successfully Updated" });
        queryClient.invalidateQueries(["user-profile"]);
      },
    }
  );
  return (
    <Card className="shadow-2xl bg-transparent max-w-xl">
      <Form size="large" layout="vertical">
        <Form.Item label="Old Password" name="old_password">
          <Input.Password
            placeholder="old password"
            suffix={<SecurityScanTwoTone />}
          />
        </Form.Item>

        <Form.Item label="New Password" name="new_password">
          <Input.Password
            placeholder="old password"
            suffix={<SecurityScanTwoTone />}
          />
        </Form.Item>

        <Form.Item label="Confirm Password" name="confirm_password">
          <Input.Password
            placeholder="confirm password"
            suffix={<SecurityScanTwoTone />}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Security;
