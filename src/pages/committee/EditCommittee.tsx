/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  SelectProps,
} from "antd";
import { useMutation, useQuery } from "react-query";
import {
  CommitteeMemberPayload,
  CommitteePayload,
} from "../../libs/api/@types/committee";
import { committeeAPI } from "../../libs/api/committee";
import { membersAPI } from "../../libs/api/membersAPI";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { profileAPI } from "../../libs/api/profileAPI";

const EditCommittee = () => {
  const { committeeId } = useParams();
  const [form] = Form.useForm();

  const { mutate, isLoading } = useMutation((payload: CommitteePayload) =>
    committeeAPI.createCommittee(payload)
  );

  const { data: allMembersData } = useQuery(["members-list"], () =>
    membersAPI.activeMembersList()
  );

  const { mutate: addMemberMutate } = useMutation(
    ["committee-member"],
    (payload: CommitteeMemberPayload) =>
      committeeAPI.addCommitteeMember(payload)
  );

  const { data: committeeData } = useQuery(
    ["committee-list"],
    () => committeeAPI.getcommitteeList(),
    {
      onSuccess: () => {
        form.setFieldsValue({
          name: committeeDetailsData?.name,
        });
      },
    }
  );
  const { data: committeeDetailsData } = useQuery(
    ["committee-list"],
    () => committeeAPI.getCommitteeDetails(),
    {
      onSuccess: () => {
        committeeDetailsData?.name &&
          form.setFieldsValue({
            name: committeeDetailsData?.name,
            start_date: committeeDetailsData?.start_date,
            end_date: committeeDetailsData?.end_date,
          });
      },
    }
  );

  const { mutate: deleteMemberMutate } = useMutation((id: string | number) =>
    committeeAPI.removeCommitteeMember(id)
  );

  const memberoptions: SelectProps["options"] = useMemo(() => {
    if (allMembersData?.data && Array.isArray(allMembersData?.data)) {
      return allMembersData?.data.reduce(
        (acc: any, curr: any) => {
          acc.push({ value: curr.id.toString(), label: curr.name });
          return acc;
        },
        [allMembersData?.data]
      );
    }

    return [];
  }, [allMembersData?.data]);

  const committeoptions: SelectProps["options"] = useMemo(() => {
    if (committeeData?.data && Array.isArray(committeeData?.data)) {
      return committeeData?.data?.reduce(
        (acc: any, curr: any) => {
          acc.push({ value: curr.id.toString(), label: curr.name });
          return acc;
        },
        [committeeData?.data]
      );
    }

    return [];
  }, [committeeData]);

  const { data } = useQuery(
    ["user-profile"],
    () => profileAPI.getProfileDetails(),
    {
      onSuccess: () => {},
    }
  );

  return (
    <Row align="middle" justify={"center"}>
      <Col span={8}>
        {data?.data?.is_superuser ? (
          <Card className="shadow-2xl" title="Create Your Committee">
            <Form
              form={form}
              onFinish={(values) => {
                mutate({
                  name: values.name,
                  start_date: values.start_date,
                  end_date: values.end_date,
                });
                addMemberMutate({
                  committee: committeeId,
                  member: values.member[0],
                  committee_designation: values.committee_designation,
                  position_order: values.position_order,
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
                <DatePicker />
              </Form.Item>

              <Form.Item name="end_date" label="End Date">
                <DatePicker />
              </Form.Item>

              <Form.Item name="member" label="Add Member">
                <Select
                  onDeselect={(val) => {
                    deleteMemberMutate(val);
                  }}
                  options={memberoptions}
                />
              </Form.Item>

              <Form.Item name="committee_designation" label="Add Committee">
                <Select options={committeoptions} />
              </Form.Item>

              <Form.Item name="position_order" label="Position Order">
                <InputNumber />
              </Form.Item>

              <Form.Item>
                <Button loading={isLoading} htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Card>
        ) : (
          "You do not have permission to do this action"
        )}
      </Col>
    </Row>
  );
};

export default EditCommittee;
