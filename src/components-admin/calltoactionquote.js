"use client";
import React, { useEffect, useState } from "react";
import { Table, Tag, Card, Typography, message } from "antd";

const { Title } = Typography;

export default function CallToActionQuote() {
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/calltoactionquote"); // API endpoint for CTA quotes
        const rawData = await res.json();

        if (rawData.success) {
          setQuotes(rawData.data); // ✅ sirf array lena hai
        } else {
          message.error(rawData.error || "Failed to fetch Call To Action Quotes");
        }
      } catch (err) {
        message.error("Failed to load Call To Action Quotes");
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "emailAddress",
      key: "emailAddress",
      render: (text) => <a href={`mailto:${text}`}>{text}</a>,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Goals & Requirements",
      dataIndex: "goalsAndRequirements",
      key: "goalsAndRequirements",
      ellipsis: true,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
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
      <Title level={3} style={{ marginBottom: "20px", color: "#722ed1" }}>
        📢 Call to Action Quote Requests
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
