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

const CreateCommittee = () => {
  const { mutate, isLoading } = useMutation((payload: CommitteePayload) =>
    committeeAPI.createCommittee(payload)
  );

  const { data: allMembersData } = useQuery(["members-list"], () =>
    membersAPI.activeMembersList()
  );

  const membersbatchoptions: SelectProps["options"] = useMemo(() => {
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

  const { mutate: addMemberMutate } = useMutation(
    ["committee-member"],
    (payload: CommitteeMemberPayload) =>
      committeeAPI.addCommitteeMember(payload)
  );

  return (
    <Row align="middle" justify={"center"}>
      <Col span={12}>
        <Card className="shadow-2xl" title="Create Your Committee">
          <Form
            onFinish={(values) => {
              mutate({
                name: values.name,
                start_date: values.start_date,
                end_date: values.end_date,
              });
              addMemberMutate({
                member: values.member,
                committee_designation: values.committee_designation,
                position_order: values.position_order,
              });
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
              <Select options={membersbatchoptions} />
            </Form.Item>

            <Form.Item
              name="committee_designation"
              label="Committee Designation"
            >
              <Input />
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
      </Col>
    </Row>
  );
};

export default CreateCommittee;
