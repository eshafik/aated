// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button, Form, Input, Select, SelectProps } from "antd";
// import { useMemo } from "react";
// import { useQuery } from "react-query";
// import { useMemberList } from "../../../config/hook/useUserSearch";
// import { searchAPI } from "../../../libs/api/searchAPI";

// const MemberSearch = () => {
//   const [form] = Form.useForm();

//   const { data: batchData } = useQuery(["batch-list"], () =>
//     searchAPI.getBatchList()
//   );

//   const { data: occupationData } = useQuery(["occupation-list"], () =>
//     searchAPI.getOccupationList()
//   );

//   const { data: jobDeptData } = useQuery(["jobDept-list"], () =>
//     searchAPI.getJobDepartment()
//   );

//   const { filter: memberFilter } = useMemberList();

//   const batchoptions: SelectProps["options"] = useMemo(() => {
//     if (batchData?.data && Array.isArray(batchData?.data)) {
//       return batchData?.data.reduce(
//         (acc: any, curr: any) => {
//           acc.push({ value: curr.id.toString(), label: curr.name });
//           return acc;
//         },
//         [batchData?.data]
//       );
//     }

//     return [];
//   }, [batchData?.data]);

//   const employeeOptions = [
//     {
//       label: "Employed",
//       value: "employed",
//     },
//     {
//       label: "Unemployed",
//       value: "unemployed",
//     },
//     {
//       label: "Student",
//       value: "student",
//     },
//   ];

//   const occupationoptions: SelectProps["options"] = useMemo(() => {
//     if (occupationData?.data && Array.isArray(occupationData?.data)) {
//       return occupationData?.data.reduce(
//         (acc: any, curr: any) => {
//           acc.push({ value: curr.id.toString(), label: curr.name });
//           return acc;
//         },
//         [occupationData?.data]
//       );
//     }

//     return [];
//   }, [occupationData?.data]);

//   const jobDeptoptions: SelectProps["options"] = useMemo(() => {
//     if (jobDeptData?.data && Array.isArray(jobDeptData?.data)) {
//       return jobDeptData?.data.reduce(
//         (acc: any, curr: any) => {
//           acc.push({ value: curr.id.toString(), label: curr.name });
//           return acc;
//         },
//         [jobDeptData?.data]
//       );
//     }
//     return [];
//   }, [jobDeptData?.data]);
//   return (
//     <Form
//       form={form}
//       onFinish={(values) => {
//         memberFilter.handleChangeName(values.name);
//         memberFilter.handleChangeCompany(values.company);
//         memberFilter.handleChangeDesignation(values.designation);
//         memberFilter.handleChangeJobDepartment(values.job_department);
//         memberFilter.handleChangeLocation(values.location);
//         memberFilter.handleChangeOccupation(values.occupation_type);
//         memberFilter.handleChangeStudentId(values.student_id);
//         memberFilter.handleChangeOrdering(values.batch);
//         memberFilter.handleChangeSkills(values.skills);
//         memberFilter.handleChangeEmployeeStatus(values.employment_status);
//       }}
//       layout="inline"
//     >
//       <Form.Item name="name">
//         <Input placeholder="Name" />
//       </Form.Item>

//       <Form.Item name="designation">
//         <Input placeholder="Designation" />
//       </Form.Item>

//       <Form.Item name="student_id">
//         <Input placeholder="Student id" />
//       </Form.Item>

//       <Form.Item name="location">
//         <Input placeholder="Location" />
//       </Form.Item>

//       <Form.Item name="company">
//         <Input placeholder="Company" />
//       </Form.Item>

//       <Form.Item name="skills">
//         <Input placeholder="Skills" />
//       </Form.Item>

//       <Form.Item name="employment_status">
//         <Select
//           style={{ width: "205px" }}
//           placeholder="Employee Status"
//           options={employeeOptions}
//         />
//       </Form.Item>

//       <Form.Item name="batch">
//         <Select
//           style={{ width: "205px" }}
//           placeholder="Batch"
//           options={batchoptions}
//         />
//       </Form.Item>

//       <Form.Item name="occupation_type">
//         <Select
//           style={{ width: "205px" }}
//           placeholder="Occupation"
//           options={occupationoptions}
//         />
//       </Form.Item>

//       <Form.Item name="job_department">
//         <Select
//           style={{ width: "205px" }}
//           placeholder="Job department"
//           options={jobDeptoptions}
//         />
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Apply Filter
//         </Button>
//       </Form.Item>

//       <Form.Item>
//         <Button onClick={() => form.resetFields()} htmlType="reset">
//           Reset Filter
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default MemberSearch;
