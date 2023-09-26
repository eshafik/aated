import { App } from "antd";
import { useState } from "react";
import { useMutation } from "react-query";
import { postAPI } from "../../libs/api/postAPI";

export const useGetPostDetails = () => {
  const [id, setid] = useState<string | number>();
  const { notification } = App.useApp();
  const handlePostId = (val: string | number) => {
    setid(val);
  };
  const { data } = useMutation(
    ["post-list"],
    () => postAPI.getPostDetails(id),
    {
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );

  return { data, handlePostId };
};
