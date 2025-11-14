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
  { label: "Current Stamps", dataIndex: "current_stamps" },
  { label: "Total Stamps Earned", dataIndex: "total_stamps_earned" },
  { label: "Total Rewards Earned", dataIndex: "total_rewards_earned" },
  { label: "Total Rewards Redeemed", dataIndex: "total_rewards_redeemed" },
  { label: "Status", dataIndex: "status" },
  {
    label: "Created",
    dataIndex: "created",
    render: (value: any) => value ? new Date(value).toLocaleDateString() : "-",
  },
  {
    label: "Updated",
    dataIndex: "updated",
    render: (value: any) => value ? new Date(value).toLocaleDateString() : "-",
  },
];

export default function Show() {
  return (
    <RefineShow
      resource="cards"
      title="Card Details"
      fields={fields}
    />
  );
}
