import { useLogin, useRegister } from "@refinedev/core";
import { Form, Input, Button, Card, Space, Typography, Divider, AutoComplete } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

const { Title, Text } = Typography;

export default function LoginPage() {
  const { mutate: login, isLoading: isLoginLoading } = useLogin();
  const { mutate: register, isLoading: isRegisterLoading } = useRegister();
  const [isRegister, setIsRegister] = useState(false);
  const [form] = Form.useForm();
  const [savedEmails, setSavedEmails] = useState<string[]>([]);

  useEffect(() => {
    // Load saved emails from localStorage on mount
    const stored = localStorage.getItem("savedEmails");
    if (stored) {
      try {
        setSavedEmails(JSON.parse(stored));
      } catch {
        setSavedEmails([]);
      }
    }
  }, []);

  const onFinish = (values: { email: string; password: string }) => {
    // Save email to localStorage for autocomplete
    const stored = localStorage.getItem("savedEmails");
    const emails = stored ? JSON.parse(stored) : [];
    if (!emails.includes(values.email)) {
      emails.push(values.email);
      localStorage.setItem("savedEmails", JSON.stringify(emails));
      setSavedEmails(emails);
    }

    if (isRegister) {
      register(values);
    } else {
      login(values);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Card
        style={{
          width: 400,
          borderRadius: 8,
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <div style={{ textAlign: "center" }}>
            <Title level={2} style={{ margin: 0 }}>
              {isRegister ? "Create Account" : "Login"}
            </Title>
            <Text type="secondary">Loyalty Hub Dashboard</Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="on"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Invalid email!" },
              ]}
            >
              <AutoComplete
                options={savedEmails.map((email) => ({ label: email, value: email }))}
                placeholder="your@email.com"
                filterOption={(inputValue, option) => {
                  const label = option?.label || "";
                  return label.toLowerCase().includes(inputValue.toLowerCase());
                }}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="your@email.com"
                  size="large"
                  autoComplete="email"
                />
              </AutoComplete>
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter password"
                size="large"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={isLoginLoading || isRegisterLoading}
              >
                {isRegister ? "Sign Up" : "Sign In"}
              </Button>
            </Form.Item>
          </Form>

          <Divider>OR</Divider>

          <Button
            type="link"
            block
            onClick={() => {
              setIsRegister(!isRegister);
              form.resetFields();
            }}
          >
            {isRegister ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </Button>
        </Space>
      </Card>
    </div>
  );
}
