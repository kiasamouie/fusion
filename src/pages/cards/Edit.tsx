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
  { name: "current_stamps", label: "Current Stamps", type: "number" },
  { name: "status", label: "Status", type: "text" },
  { name: "data_consent_opt_in", label: "Data Consent Opt In", type: "checkbox" },
];

export default function Edit() {
  return (
    <RefineEdit
      resource="cards"
      title="Edit Loyalty Card"
      fields={fields}
      submitLabel="Save Changes"
    />
  );
}
