import { Edit, useForm } from "@refinedev/antd";
import { Form, Button, Input, InputNumber, Select, Checkbox } from "antd";
import { ReactNode } from "react";

export interface RefineEditFieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "date" | "textarea" | "select" | "checkbox";
  required?: boolean;
  rules?: any[];
  options?: { value: any; label: string }[];
  render?: (form: any) => ReactNode;
}

export interface RefineEditProps {
  resource: string;
  title: string;
  fields: RefineEditFieldConfig[];
  submitLabel?: string;
}

export default function RefineEdit({
  resource,
  title,
  fields,
  submitLabel = "Save Changes",
}: RefineEditProps) {
  const { formProps, saveButtonProps } = useForm({
    resource,
    redirect: "list",
  });

  const renderField = (field: RefineEditFieldConfig) => {
    if (field.render) {
      return field.render(Form);
    }

    switch (field.type) {
      case "email":
        return <Input type="email" />;
      case "password":
        return <Input.Password />;
      case "number":
        return <InputNumber />;
      case "date":
        return <Input type="date" />;
      case "textarea":
        return <Input.TextArea rows={4} />;
      case "select":
        return <Select options={field.options} />;
      case "checkbox":
        return <Checkbox />;
      default:
        return <Input />;
    }
  };

  return (
    <Edit title={title} breadcrumb={false}>
      <Form {...formProps} layout="vertical">
        {fields.map((field) => (
          <Form.Item
            key={field.name}
            label={field.label}
            name={field.name}
            rules={field.rules || (field.required ? [{ required: true }] : [])}
            valuePropName={field.type === "checkbox" ? "checked" : undefined}
          >
            {renderField(field)}
          </Form.Item>
        ))}

        <Form.Item>
          <Button type="primary" {...saveButtonProps}>
            {submitLabel}
          </Button>
        </Form.Item>
      </Form>
    </Edit>
  );
}
