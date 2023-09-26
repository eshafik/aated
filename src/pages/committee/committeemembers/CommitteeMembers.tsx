import { DeleteFilled, MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, Spin, Table, notification } from "antd";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import { useSuperUser } from "../../../container/ProfileProvider";
import { CommitteeMembers } from "../../../libs/api/@types/committee";
import { committeeAPI } from "../../../libs/api/committee";
import PageHeader from "../components/PageHeader";

const CommitteeMembers = () => {
  const { slag } = useParams();
  const queryClient = useQueryClient();
  const { isSuperUser } = useSuperUser();

  const { data: CommitteeName } = useQuery(["committee-details"], () =>
    committeeAPI.getCommitteeDetails(slag as string)
  );

  const { data, isLoading } = useQuery(["committeeMember-details"], () =>
    committeeAPI.getCommitteeMembersList(slag as string)
  );

  const { mutate } = useMutation(
    [""],
    (id?: string | number) => committeeAPI?.removeCommitteeMember(id),
    {
      onSuccess: () => {
        notification.success({ message: "Member Delete successfully" });
        queryClient.invalidateQueries(["committeeMember-details"]);
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );

  const switchHandler = (id?: string | number) => {
    mutate(id);
  };

  const column: ColumnsType<CommitteeMembers> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) => record?.member?.name,
    },
    {
      title: "Designation",
      dataIndex: "committee_designation",
      render: (_, record) => record?.committee_designation,
    },
    {
      title: "Position",
      dataIndex: "position",
      render: (_, record) => record?.position_order,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (_, record) => (
        <Dropdown
          disabled={!isSuperUser}
          menu={{
            items: [
              {
                key: "delete",
                label: "Delete",
                icon: <DeleteFilled />,
                onClick: () => switchHandler(record?.id),
              },
            ],
          }}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const tableData = useMemo(() => {
    if (Array.isArray(data?.data)) {
      return data?.data;
    }
    return [];
  }, [data?.data]);

  return (
    <Spin spinning={isLoading}>
      <div className="pr-11">
        <PageHeader
          title={CommitteeName?.data?.name}
          subtitle={`Start Date: ${CommitteeName?.data?.start_date} & End Date: ${CommitteeName?.data?.end_date}`}
          actions={
            isSuperUser ? (
              <Link to={`/committee/edit-committee/${CommitteeName?.data?.id}`}>
                <Button size="large" type="primary">
                  Edit Committee
                </Button>
              </Link>
            ) : (
              ""
            )
          }
        />
        <Table bordered dataSource={tableData} columns={column} />
      </div>
    </Spin>
  );
};

export default CommitteeMembers;
