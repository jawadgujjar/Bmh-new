"use client";
import React, { useEffect, useState } from "react";
import { Table, Tag, Card, Typography, message } from "antd";

const { Title } = Typography;

export default function GetaQuote() {
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/getaquote"); // API endpoint
        const rawData = await res.json();

        if (rawData.success) {
          setQuotes(rawData.data); // ✅ sirf array pass karo
        } else {
          message.error(rawData.error || "Failed to fetch quotes");
        }
      } catch (err) {
        message.error("Failed to load quotes");
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  const columns = [
    {
      title: "Name",
      key: "name",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "emailAddress",
      key: "emailAddress",
      render: (text) => <a href={`mailto:${text}`}>{text}</a>,
    },
    {
      title: "Website",
      dataIndex: "websiteUrl",
      key: "websiteUrl",
      render: (text) =>
        text ? (
          <a href={text} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        ) : (
          <Tag color="default">N/A</Tag>
        ),
    },
    {
      title: "Budget",
      dataIndex: "monthlyBudget",
      key: "monthlyBudget",
      render: (budget) => (
        <Tag color={budget > 1000 ? "green" : "blue"}>${budget}</Tag>
      ),
    },
    {
      title: "Project Details",
      dataIndex: "projectDetails",
      key: "projectDetails",
      ellipsis: true,
    },
    
  ];

  return (
    <Card
      style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Title level={3} style={{ marginBottom: "20px", color: "#1890ff" }}>
        📝 Get a Quote Requests
      </Title>
      <Table
        columns={columns}
        dataSource={quotes}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </Card>
  );
}
