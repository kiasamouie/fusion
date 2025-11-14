import { RefineList, type RefineListColumn } from "../../components/crud";

const columns: RefineListColumn[] = [
  {
    dataIndex: ["customer_id"],
    title: "Customer ID",
    sorter: true,
  },
  {
    dataIndex: ["platform"],
    title: "Platform",
    sorter: true,
  },
  {
    dataIndex: ["pass_identifier"],
    title: "Identifier",
    sorter: true,
  },
  {
    dataIndex: ["added_at"],
    title: "Date Added",
    sorter: true,
    render: (_value: any, record: any) => new Date(record.added_at).toLocaleDateString(),
  },
];

export default function List() {
  return (
    <RefineList
      resource="wallets"
      title="Mobile Wallets"
      columns={columns}
      pageSize={10}
    />
  );
}
