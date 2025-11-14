import { RefineShow, type RefineShowField } from "../../components/crud";

const fields: RefineShowField[] = [
  { label: "ID", dataIndex: "id" },
  {
    label: "Name",
    dataIndex: "first_name",
    render: (_value: any, record: any) => `${record.first_name} ${record.last_name}`,
  },
  { label: "Email", dataIndex: "email" },
  { label: "Phone", dataIndex: "mobile_number" },
  {
    label: "Date of Birth",
    dataIndex: "date_of_birth",
    render: (value: any) => value ? new Date(value).toLocaleDateString() : "N/A",
  },
  { label: "Postcode", dataIndex: "postcode" },
  {
    label: "Marketing Consent",
    dataIndex: "marketing_consent",
    render: (value: any) => (value ? "Yes" : "No"),
  },
  {
    label: "Terms Accepted",
    dataIndex: "terms_accepted",
    render: (value: any) => (value ? "Yes" : "No"),
  },
  {
    label: "Created",
    dataIndex: "created_at",
    render: (value: any) => value ? new Date(value).toLocaleDateString() : "-",
  },
  {
    label: "Updated",
    dataIndex: "updated_at",
    render: (value: any) => value ? new Date(value).toLocaleDateString() : "-",
  },
];

export default function Show() {
  return (
    <RefineShow
      resource="customers"
      title="Customer Details"
      fields={fields}
    />
  );
}
