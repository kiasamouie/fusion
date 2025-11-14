import { useGetIdentity, useUpdate } from "@refinedev/core";
import { Card, Form, Input, Button, Space, Row, Col, Divider, Typography, Avatar } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

const { Title, Text } = Typography;

export default function ProfilePage() {
  const { data: identity } = useGetIdentity();
  const { mutate: updateProfile, isLoading } = useUpdate();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (identity) {
      form.setFieldsValue({
        full_name: (identity as any)?.full_name,
        email: (identity as any)?.email,
        phone: (identity as any)?.phone,
      });
    }
  }, [identity, form]);

  const onFinish = (values: any) => {
    updateProfile(
      {
        resource: "profiles",
        id: (identity as any)?.id,
        values: {
          full_name: values.full_name,
          phone: values.phone,
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <div>
        <Title level={2}>My Profile</Title>
        <Text type="secondary">Manage your account information</Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card style={{ textAlign: "center" }}>
            <Avatar
              size={120}
              icon={<UserOutlined />}
              style={{ backgroundColor: "#6366f1", marginBottom: 16 }}
            />
            <Title level={4}>{(identity as any)?.full_name || "User"}</Title>
            <Text type="secondary">{(identity as any)?.email}</Text>
            {(identity as any)?.role && (
              <>
                <Divider />
                <Text>Role: {(identity as any)?.role}</Text>
              </>
            )}
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card title={isEditing ? "Edit Profile" : "Profile Information"}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              disabled={!isEditing}
            >
              <Form.Item
                name="full_name"
                label="Full Name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Your full name"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Invalid email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="your@email.com"
                  size="large"
                  disabled
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone"
              >
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Your phone number"
                  size="large"
                />
              </Form.Item>

              {(identity as any)?.company_id && (
                <Form.Item label="Company ID">
                  <Input
                    value={(identity as any)?.company_id}
                    disabled
                    prefix={<HomeOutlined />}
                  />
                </Form.Item>
              )}

              <Form.Item>
                <Space>
                  {isEditing ? (
                    <>
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        loading={isLoading}
                      >
                        Save Changes
                      </Button>
                      <Button
                        onClick={() => {
                          setIsEditing(false);
                          form.resetFields();
                        }}
                        size="large"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="primary"
                      onClick={() => setIsEditing(true)}
                      size="large"
                    >
                      Edit Profile
                    </Button>
                  )}
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Space>
  );
}
