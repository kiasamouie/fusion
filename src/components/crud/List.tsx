import { List, ShowButton, EditButton, DeleteButton, useTable, FilterDropdown, CreateButton } from "@refinedev/antd";
import { Table, Space, Input, Button, Row, Col, Select } from "antd";
import { useState, ReactNode } from "react";
import { FilterOutlined } from "@ant-design/icons";

export interface RefineListColumn {
  dataIndex: string | string[];
  title: string;
  sorter?: boolean;
  render?: (value: any, record: any) => ReactNode;
  width?: number;
  filterable?: boolean;
  filterType?: "text" | "select" | "number";
  filterOptions?: { label: string; value: any }[];
}

export interface RefineListProps {
  resource: string;
  title: string;
  columns: RefineListColumn[];
  pageSize?: number;
  search?: boolean;
  filters?: boolean;
  pagination?: boolean;
  sorting?: boolean;
  create?: boolean;
}

export default function RefineList({
  resource,
  title,
  columns,
  pageSize = 10,
  search = true,
  filters = true,
  pagination = true,
  sorting = true,
  create = true,
}: RefineListProps) {
  const [searchValues, setSearchValues] = useState<Record<string, any>>({});

  const { tableProps, setFilters } = useTable({
    resource,
    pagination: pagination
      ? {
          pageSize,
        }
      : undefined,
    filters: {
      initial: Object.keys(searchValues).length > 0
        ? Object.entries(searchValues)
            .filter(([, value]) => value !== undefined && value !== "")
            .map(([field, value]) => ({
              field,
              operator: "contains" as const,
              value,
            }))
        : undefined,
    },
  });

  const handleSearchChange = (value: string) => {
    if (value) {
      setSearchValues({ q: value });
      setFilters([
        {
          field: "q",
          operator: "contains" as const,
          value,
        },
      ]);
    } else {
      setSearchValues({});
      setFilters([], "replace");
    }
  };

  const tableColumns = [
    ...columns.map((col) => {
      const column: any = {
        dataIndex: col.dataIndex,
        title: col.title,
        sorter: sorting && col.sorter ? true : false,
        render: col.render,
        width: col.width,
      };

      if (filters && col.filterable) {
        column.filterDropdown = (props: any) => (
          <FilterDropdown {...props}>
            <Space direction="vertical" style={{ width: 200 }}>
              {col.filterType === "select" ? (
                <Select
                  placeholder={`Filter ${col.title}`}
                  options={col.filterOptions}
                  onChange={(value: any) => {
                    props.setSelectedKeys(value ? [value] : []);
                  }}
                  style={{ width: "100%" }}
                />
              ) : (
                <Input
                  placeholder={`Filter ${col.title}`}
                  onChange={(e) => {
                    props.setSelectedKeys(e.target.value ? [e.target.value] : []);
                  }}
                />
              )}
            </Space>
          </FilterDropdown>
        );
      }

      return column;
    }),
    {
      title: "Actions",
      width: 120,
      render: (_: any, record: any) => (
        <Space>
          <ShowButton hideText size="small" recordItemId={record.id} />
          <EditButton hideText size="small" recordItemId={record.id} />
          <DeleteButton hideText size="small" recordItemId={record.id} />
        </Space>
      ),
    },
  ];

  return (
    <List title={title} breadcrumb={false} headerButtons={() => create ? <CreateButton /> : null}>
      {search && (
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12}>
            <Input.Search
              placeholder="Search..."
              allowClear
              onSearch={(value) => handleSearchChange(value)}
              onChange={(e) => {
                const value = e.target.value;
                if (!value) {
                  handleSearchChange("");
                }
              }}
            />
          </Col>

          {Object.keys(searchValues).length > 0 && (
            <Col>
              <Button onClick={() => handleSearchChange("")}>
                <FilterOutlined /> Reset
              </Button>
            </Col>
          )}
        </Row>
      )}

      <Table {...tableProps} rowKey="id" columns={tableColumns} />
    </List>
  );
}
