import { useList, useGetIdentity } from "@refinedev/core";
import { Card, Row, Col, Statistic, Space, Table } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Card as CardType } from "../../types";

export default function DashboardPage() {
  const { data: identity } = useGetIdentity();
  const { data: cardsData } = useList<CardType>({ 
    resource: "cards", 
    pagination: { pageSize: 999999 },
    queryOptions: { enabled: true }
  });
  const { data: topCardsData } = useList<CardType>({ 
    resource: "cards",
    pagination: { pageSize: 5 },
    sorters: [
      {
        field: "total_stamps_earned",
        order: "desc",
      },
    ],
  });

  const allCards = cardsData?.data || [];
  const totalCardsCount = cardsData?.total || 0;
  const topCards = topCardsData?.data || [];

  // Calculate totals from all cards
  const totalRewards = allCards.reduce((sum, card) => sum + (card.total_rewards_earned || 0), 0);
  const totalStamps = allCards.reduce((sum, card) => sum + (card.total_stamps_earned || 0), 0);

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <div>
        <h1>Welcome back, {(identity as any)?.full_name || (identity as any)?.name || "User"}! 👋</h1>
        <p>Here's an overview of your loyalty program</p>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Cards"
              value={totalCardsCount}
              suffix={<ArrowUpOutlined />}
              valueStyle={{ color: "#6366f1" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Stamps Earned"
              value={totalStamps}
              suffix={<ArrowUpOutlined />}
              valueStyle={{ color: "#f59e0b" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Rewards Earned"
              value={totalRewards}
              suffix={<ArrowUpOutlined />}
              valueStyle={{ color: "#8b5cf6" }}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "16px" }}>
          <h3 style={{ margin: 0 }}>Top Cards by Stamps</h3>
          <p style={{ color: "#999", marginTop: "4px" }}>Top 5 performing loyalty cards</p>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          <Table
            dataSource={topCards}
            rowKey="id"
            pagination={false}
            columns={[
              {
                title: "Customer",
                dataIndex: "first_name",
                key: "name",
                render: (_value: any, record: CardType) => `${record.first_name} ${record.last_name}`,
              },
              {
                title: "Email",
                dataIndex: "email",
                key: "email",
              },
              {
                title: "Current Stamps",
                dataIndex: "current_stamps",
                key: "current_stamps",
              },
              {
                title: "Total Stamps Earned",
                dataIndex: "total_stamps_earned",
                key: "stamps_earned",
              },
              {
                title: "Rewards Earned",
                dataIndex: "total_rewards_earned",
                key: "rewards_earned",
              },
            ]}
          />
        </div>
      </Card>
    </Space>
  );
}
