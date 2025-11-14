import { Create, useForm } from "@refinedev/antd";
import { Form, Button, Input, InputNumber, Select, Checkbox } from "antd";
import { ReactNode } from "react";

export interface RefineCreateFieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "date" | "textarea" | "select" | "checkbox";
  required?: boolean;
  rules?: any[];
  options?: { value: any; label: string }[];
  initialValue?: any;
  render?: (form: any) => ReactNode;
}

export interface RefineCreateProps {
  resource: string;
  title: string;
  fields: RefineCreateFieldConfig[];
  submitLabel?: string;
}

export default function RefineCreate({
  resource,
  title,
  fields,
  submitLabel = "Create",
}: RefineCreateProps) {
  const { formProps, saveButtonProps } = useForm({
    resource,
    redirect: "list",
  });

  const renderField = (field: RefineCreateFieldConfig) => {
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
    <Create title={title} breadcrumb={false}>
      <Form {...formProps} layout="vertical">
        {fields.map((field) => (
          <Form.Item
            key={field.name}
            label={field.label}
            name={field.name}
            rules={field.rules || (field.required ? [{ required: true }] : [])}
            initialValue={field.initialValue}
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
    </Create>
  );
}

function getInputComponent(
  type: string,
  options?: { value: any; label: string }[]
) {
  switch (type) {
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
      return <Select options={options} />;
    case "checkbox":
      return <Checkbox />;
    default:
      return <Input />;
  }
}
