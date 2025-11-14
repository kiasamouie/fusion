import { RefineCreate, type RefineCreateFieldConfig } from "../../components/crud";

const fields: RefineCreateFieldConfig[] = [
  { name: "card_id", label: "Card ID", type: "number", required: true },
  { name: "customer_id", label: "Customer ID", type: "number", required: true },
  { name: "stamp_count", label: "Stamp Count", type: "number", required: true, initialValue: 1 },
  { name: "action", label: "Action", type: "text", required: true },
  { name: "notes", label: "Notes", type: "textarea" },
];

export default function Create() {
  return (
    <RefineCreate
      resource="stamps"
      title="Create Stamp Record"
      fields={fields}
      submitLabel="Create Record"
    />
  );
}
