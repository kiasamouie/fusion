import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Descriptions } from "antd";
import { ReactNode } from "react";

export interface RefineShowField {
  label: string;
  dataIndex: string;
  render?: (value: any, record: any) => ReactNode;
}

export interface RefineShowProps {
  resource: string;
  title: string;
  fields: RefineShowField[];
}

export default function RefineShow({
  resource,
  title,
  fields,
}: RefineShowProps) {
  const { queryResult } = useShow({ resource });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading} title={title} breadcrumb={false}>
      <Descriptions bordered>
        {fields.map((field) => (
          <Descriptions.Item key={field.dataIndex} label={field.label}>
            {field.render
              ? field.render(record?.[field.dataIndex], record)
              : record?.[field.dataIndex]}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Show>
  );
}
