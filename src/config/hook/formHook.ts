import { Form, FormInstance } from "antd";
import { useEffect } from "react";

interface Params<T> {
  onFinish: (values: T, form: FormInstance<T>) => void;
  initialValues?: T;
  resetOnInitialValuesChange?: boolean;
}

export const useForm = <T>(params: Params<T>) => {
  const [form] = Form.useForm<T>();

  useEffect(() => {
    if (params.initialValues && params.resetOnInitialValuesChange)
      form.resetFields();
  }, [form, params.initialValues, params.resetOnInitialValuesChange]);

  const handleFinish = (values: T) => params.onFinish(values, form);

  return { form, initialValues: params.initialValues, handleFinish };
};
