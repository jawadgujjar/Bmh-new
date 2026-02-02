"use client";
import React from "react";
import { Card, Col, Row, Statistic, Typography, Table, Tag } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function Dashboard() {
  // Hardcoded recent activity table
  const recentData = [
    {
      key: "1",
      name: "Jawad Ahmad",
      action: "Submitted Get a Quote",
      date: "2025-09-20",
      status: "Pending",
    },
    {
      key: "2",
      name: "Ali Raza",
      action: "Submitted CTA Quote",
      date: "2025-09-19",
      status: "Approved",
    },
    {
      key: "3",
      name: "Sara Khan",
      action: "Submitted Portfolio Request",
      date: "2025-09-18",
      status: "Rejected",
    },
  ];

  const columns = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color =
          status === "Approved"
            ? "green"
            : status === "Pending"
            ? "blue"
            : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ marginBottom: "20px", color: "#1890ff" }}>
        📊 Admin Dashboard
      </Title>

      {/* Top Stats */}
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col span={6}>
          <Card variant="outlined">
            <Statistic
              title="Total Quotes"
              value={128}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="requests"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="outlined">
            <Statistic
              title="CTA Quotes"
              value={56}
              valueStyle={{ color: "#722ed1" }}
              prefix={<ArrowUpOutlined />}
              suffix="forms"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="outlined">
            <Statistic
              title="Portfolios"
              value={34}
              valueStyle={{ color: "#1890ff" }}
              prefix={<ArrowDownOutlined />}
              suffix="projects"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="outlined">
            <Statistic
              title="Users"
              value={12}
              valueStyle={{ color: "#fa541c" }}
              prefix={<ArrowUpOutlined />}
              suffix="admins"
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Activities */}
      <Card
        title="Recent Activities"
        style={{
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Table
          columns={columns}
          dataSource={recentData}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
}
