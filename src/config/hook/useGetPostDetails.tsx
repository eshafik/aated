import { useMutation } from "react-query";
import { postAPI } from "../../libs/api/postAPI";
import { useState } from "react";

export const useGetPostDetails = () => {
  const [id, setid] = useState<string | number>();
  const handlePostId = (val: string | number) => {
    setid(val);
  };
  const { data } = useMutation(["post-list"], () => postAPI.getPostDetails(id));

  return { data, handlePostId };
};
