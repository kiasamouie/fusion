import { RefineList, type RefineListColumn } from "../../components/crud";

const columns: RefineListColumn[] = [
  {
    dataIndex: ["first_name"],
    title: "Name",
    sorter: true,
    render: (_value: any, record: any) => (
      <span>{record.first_name} {record.last_name}</span>
    ),
  },
  {
    dataIndex: ["email"],
    title: "Email",
    sorter: true,
  },
  {
    dataIndex: ["mobile_number"],
    title: "Phone",
    sorter: true,
  },
  {
    dataIndex: ["marketing_consent"],
    title: "Marketing Consent",
    render: (_value: any, record: any) => (record.marketing_consent ? "Yes" : "No"),
  },
];

export default function List() {
  return (
    <RefineList
      resource="customers"
      title="Customers"
      columns={columns}
      pageSize={10}
    />
  );
}
