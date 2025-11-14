import { RefineEdit, type RefineEditFieldConfig } from "../../components/crud";

const fields: RefineEditFieldConfig[] = [
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
  { name: "marketing_consent", label: "Marketing Consent", type: "checkbox" },
  { name: "terms_accepted", label: "Terms Accepted", type: "checkbox" },
];

export default function Edit() {
  return (
    <RefineEdit
      resource="customers"
      title="Edit Customer"
      fields={fields}
      submitLabel="Save Changes"
    />
  );
}
