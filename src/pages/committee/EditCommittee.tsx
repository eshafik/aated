/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  SelectProps,
  Skeleton,
} from "antd";
import { useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useSuperUser } from "../../container/ProfileProvider";
import {
  CommitteeMemberPayload,
  CommitteePayload,
} from "../../libs/api/@types/committee";
import { committeeAPI } from "../../libs/api/committee";
import { membersAPI } from "../../libs/api/membersAPI";

const EditCommittee = () => {
  const { committeeId } = useParams();
  console.log(committeeId);

  const [form] = Form.useForm();

  const { mutate, isLoading } = useMutation((payload: CommitteePayload) =>
    committeeAPI.updateCommittee(payload, committeeId as string)
  );
  const { mutate: addMemberMutate } = useMutation(
    ["committee-member"],
    (payload: CommitteeMemberPayload) =>
      committeeAPI.addCommitteeMember(payload)
  );
  const { mutate: deleteMemberMutate, isLoading: loadingMember } = useMutation(
    (id: string | number) => committeeAPI.removeCommitteeMember(id)
  );

  const { data: allMembersData } = useQuery(["members-list"], () =>
    membersAPI.activeMembersList()
  );

  const { data: committeeDetailsData, isLoading: loadingCommitteeDetails } =
    useQuery(["committee-details"], () =>
      committeeAPI.getCommitteeDetails(committeeId as string)
    );

  const memberOptions: SelectProps["options"] = useMemo(() => {
    if (allMembersData?.data && Array.isArray(allMembersData?.data)) {
      return allMembersData?.data.reduce(
        (acc: any, curr: any) => {
          acc.push({ value: curr.id, label: curr.name });
          return acc;
        },
        [allMembersData?.data]
      );
    }

    return [];
  }, [allMembersData?.data]);

  const { isSuperUser } = useSuperUser();

  return (
    <Row align="middle" justify={"center"}>
      <Col span={8}>
        <Skeleton loading={loadingCommitteeDetails}>
          {isSuperUser ? (
            <Card className="shadow-2xl" title="Edit Your Committee">
              <Form
                form={form}
                initialValues={{
                  name: committeeDetailsData?.data?.name,
                  // start_date: committeeDetailsData?.data?.start_date,
                  committee_designation:
                    committeeDetailsData?.data?.members?.[0]
                      ?.committee_designation,

                  member: committeeDetailsData?.data?.members?.map(
                    (items) => items?.member?.name
                  ),
                }}
                onFinish={(values) => {
                  mutate({
                    name: values.name,
                    start_date: values.start_date.format("YYYY-MM-DD"),
                    end_date: values.end_date.format("YYYY-MM-DD"),
                  });
                  addMemberMutate({
                    committee: committeeId,
                    member: values.member,
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
                  <DatePicker
                    showTime={false}
                    use12Hours={false}
                    className="w-full"
                  />
                </Form.Item>

                <Form.Item name="end_date" label="End Date">
                  <DatePicker
                    showTime={false}
                    use12Hours={false}
                    className="w-full"
                  />
                </Form.Item>
                <Form.Item
                  name="committee_designation"
                  label="Committee Designation"
                >
                  <Input placeholder="committee designation" />
                </Form.Item>

                <Form.Item name="member" label="Add Member">
                  <Select
                    onDeselect={(val) => {
                      deleteMemberMutate(val);
                    }}
                    options={memberOptions}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    loading={isLoading || loadingMember}
                    htmlType="submit"
                  >
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          ) : (
            "You do not have permission to do this action"
          )}
        </Skeleton>
      </Col>
    </Row>
  );
};

export default EditCommittee;
