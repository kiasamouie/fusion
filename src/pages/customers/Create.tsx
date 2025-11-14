import { RefineCreate, type RefineCreateFieldConfig } from "../../components/crud";

const fields: RefineCreateFieldConfig[] = [
  { name: "first_name", label: "First Name", type: "text", required: true },
  { name: "last_name", label: "Last Name", type: "text", required: true },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    rules: [{ type: "email" }],
  },
  { name: "mobile_number", label: "Mobile Number", type: "text" },
  { name: "date_of_birth", label: "Date of Birth", type: "date" },
  { name: "postcode", label: "Postcode", type: "text" },
  { name: "marketing_consent", label: "Marketing Consent", type: "checkbox", initialValue: false },
  { name: "terms_accepted", label: "Terms Accepted", type: "checkbox", initialValue: false },
];

export default function Create() {
  return (
    <RefineCreate
      resource="customers"
      title="Create New Customer"
      fields={fields}
      submitLabel="Create Customer"
    />
  );
}
