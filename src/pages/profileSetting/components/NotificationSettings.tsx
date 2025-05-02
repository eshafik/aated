import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { App, Button, Spin, Switch } from "antd";

import { profileAPI } from "../../../libs/api/profileAPI";

const NotificationSettings = () => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  // Fetch profile data
  const { data, isLoading: isProfileLoading } = useQuery(["user-profile"], () =>
    profileAPI.getProfileDetails()
  );

  const emailNotification = data?.data?.email_notification ?? false;

  // Mutation to update notification setting
  const { mutate, isLoading: isMutating } = useMutation(
    (payload: { email_notification: boolean }) =>
      profileAPI.updateProfileDetails(payload),
    {
      onSuccess: () => {
        notification.success({
          message: "Notification settings updated successfully",
        });

        // Refetch profile data to reflect latest state
        queryClient.invalidateQueries(["user-profile"]);
      },
      onError: (error: Error) => {
        notification.error({
          message: `Failed to update notification settings: ${error.message}`,
        });
      },
    }
  );

  // Handle toggle change
  const handleToggle = (checked: boolean) => {
    mutate({ email_notification: checked });
  };

  return (
    <Spin spinning={isProfileLoading}>
      <div className="p-3 max-w-xl flex items-center justify-between">
        <span className="font-medium">
          {emailNotification ? "Notification Enabled" : "Notification Disabled"}
        </span>
        <Switch
          checked={emailNotification}
          onChange={handleToggle}
          disabled={isProfileLoading || isMutating}
          loading={isMutating}
        />
      </div>
    </Spin>
  );
};

export default NotificationSettings;
