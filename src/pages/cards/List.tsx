import { RefineList, type RefineListColumn } from "../../components/crud";

const columns: RefineListColumn[] = [
  {
    dataIndex: ["first_name"],
    title: "First Name",
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
    dataIndex: ["current_stamps"],
    title: "Current Stamps",
    sorter: true,
  },
  {
    dataIndex: ["total_stamps_earned"],
    title: "Total Earned",
    sorter: true,
  },
  {
    dataIndex: ["total_rewards_earned"],
    title: "Rewards Earned",
    sorter: true,
  },
  {
    dataIndex: ["total_rewards_redeemed"],
    title: "Rewards Redeemed",
    sorter: true,
  },
];

export default function List() {
  return (
    <RefineList
      resource="cards"
      title="Loyalty Cards"
      columns={columns}
      pageSize={10}
    />
  );
}
