import { UploadOutlined } from "@ant-design/icons";
import { App, Button, Modal, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

import { FC, useState } from "react";
import { authService } from "../libs/auth/auth.service";
import config from "../config";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

type AvatarUploadProps = {
  value?: string;
  onChange?: (value?: string) => void;
};

const AvatarUploader: FC<AvatarUploadProps> = ({ value, onChange }) => {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const [fileList, setFileList] = useState<UploadFile[] | undefined>(
    value
      ? [
          {
            uid: "-1",
            name: "photo",
            status: "done",
            url: value,
            fileName: "htec.jpeg",
          },
        ]
      : undefined
  );

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    setFileList(info.fileList.filter((file) => !!file.status));

    if (info.file.status === "uploading") {
      setLoading(true);
    }

    if (info.file.status === "done") {
      setLoading(false);
      onChange?.(info.file.response.data.url);
    }
  };

  const handleRemove = () => {
    setFileList(undefined);
    onChange?.();
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>

      <Upload
        name="photo"
        listType="picture-card"
        maxCount={1}
        action={`${config?.apiURL}/api/v1/core/upload/`}
        headers={{ Authorization: `Bearer ${authService.getToken()}` }}
        beforeUpload={beforeUpload}
        onPreview={(file) => handlePreview(file)}
        fileList={fileList}
        onRemove={handleRemove}
        onChange={handleChange}
      >
        {(!fileList || fileList?.length < 1) && (
          <Button
            shape="circle"
            type="text"
            icon={<UploadOutlined />}
            loading={loading}
          />
        )}
      </Upload>
    </>
  );
};

export default AvatarUploader;
