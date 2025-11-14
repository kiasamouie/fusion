import { RefineCreate, type RefineCreateFieldConfig } from "../../components/crud";

const fields: RefineCreateFieldConfig[] = [
  { name: "customer_id", label: "Customer ID", type: "number", required: true },
  {
    name: "platform",
    label: "Platform",
    type: "select",
    required: true,
    options: [
      { value: "apple", label: "Apple Wallet" },
      { value: "google", label: "Google Wallet" },
    ],
  },
  { name: "pass_identifier", label: "Pass Identifier", type: "text", required: true },
  { name: "pass_url", label: "Pass URL", type: "text", required: true },
];

export default function Create() {
  return (
    <RefineCreate
      resource="wallets"
      title="Add Mobile Wallet"
      fields={fields}
      submitLabel="Add Wallet"
    />
  );
}
