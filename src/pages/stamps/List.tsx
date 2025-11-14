import { RefineList, type RefineListColumn } from "../../components/crud";

const columns: RefineListColumn[] = [
  {
    dataIndex: ["card_id"],
    title: "Card ID",
    sorter: true,
  },
  {
    dataIndex: ["customer_id"],
    title: "Customer ID",
    sorter: true,
  },
  {
    dataIndex: ["stamp_count"],
    title: "Stamps",
    sorter: true,
  },
  {
    dataIndex: ["action"],
    title: "Action",
    sorter: true,
  },
  {
    dataIndex: ["created_at"],
    title: "Date",
    sorter: true,
    render: (_value: any, record: any) => new Date(record.created_at).toLocaleDateString(),
  },
];

export default function List() {
  return (
    <RefineList
      resource="stamps"
      title="Stamp Activity"
      columns={columns}
      pageSize={10}
    />
  );
}
