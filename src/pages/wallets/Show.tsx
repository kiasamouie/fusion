import { RefineShow, type RefineShowField } from "../../components/crud";

const fields: RefineShowField[] = [
  { label: "ID", dataIndex: "id" },
  { label: "Customer ID", dataIndex: "customer_id" },
  { label: "Company ID", dataIndex: "company_id" },
  { label: "Platform", dataIndex: "platform" },
  { label: "Pass Identifier", dataIndex: "pass_identifier" },
  {
    label: "Pass URL",
    dataIndex: "pass_url",
    render: (value: any) =>
      value ? (
        <a href={value} target="_blank" rel="noopener noreferrer">
          {value}
        </a>
      ) : (
        "-"
      ),
  },
  {
    label: "Added",
    dataIndex: "added_at",
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
      resource="wallets"
      title="Wallet Details"
      fields={fields}
    />
  );
}
