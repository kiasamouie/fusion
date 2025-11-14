import { RefineShow, type RefineShowField } from "../../components/crud";

const fields: RefineShowField[] = [
  { label: "ID", dataIndex: "id" },
  { label: "Card ID", dataIndex: "card_id" },
  { label: "Customer ID", dataIndex: "customer_id" },
  { label: "Company ID", dataIndex: "company_id" },
  { label: "Stamp Count", dataIndex: "stamp_count" },
  { label: "Action", dataIndex: "action" },
  { label: "Notes", dataIndex: "notes" },
  {
    label: "Created",
    dataIndex: "created_at",
    render: (value: any) => value ? new Date(value).toLocaleDateString() : "-",
  },
];

export default function Show() {
  return (
    <RefineShow
      resource="stamps"
      title="Stamp Details"
      fields={fields}
    />
  );
}
