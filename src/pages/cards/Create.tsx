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
  { name: "current_stamps", label: "Current Stamps", type: "number", initialValue: 0 },
  { name: "status", label: "Status", type: "text" },
  { name: "data_consent_opt_in", label: "Data Consent Opt In", type: "checkbox" },
];

export default function Create() {
  return (
    <RefineCreate
      resource="cards"
      title="Create Loyalty Card"
      fields={fields}
      submitLabel="Create Card"
    />
  );
}
