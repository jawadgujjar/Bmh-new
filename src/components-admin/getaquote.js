"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Card,
  Typography,
  message,
  Button,
  Modal,
  Descriptions,
  Space,
  Popconfirm,
} from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function GetaQuote() {
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // 🔹 Fetch quotes
  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/getaquote");
      const rawData = await res.json();

      if (rawData.success) {
        setQuotes(rawData.data);
      } else {
        message.error(rawData.error || "Failed to fetch quotes");
      }
    } catch (err) {
      message.error("Failed to load quotes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  // 🔹 Delete quote
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/getaquote/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        message.success("Quote request deleted successfully");
        fetchQuotes();
      } else {
        message.error(data.error || "Failed to delete");
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

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
          <Tag>N/A</Tag>
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedQuote(record);
              setViewModalOpen(true);
            }}
          >
            View
          </Button>

          <Popconfirm
            title="Delete Quote"
            description="Are you sure you want to delete this quote request?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={3} style={{ marginBottom: 20, color: "#1890ff" }}>
          📝 Get a Quote Requests
        </Title>

        <Table
          columns={columns}
          dataSource={quotes}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          bordered
        />
      </Card>

      {/* 🔹 View Modal */}
      <Modal
        title="Quote Request Details"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalOpen(false)}>
            Close
          </Button>,
        ]}
        width={700}
      >
        {selectedQuote && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">
              {selectedQuote.firstName} {selectedQuote.lastName}
            </Descriptions.Item>

            <Descriptions.Item label="Email">
              {selectedQuote.emailAddress}
            </Descriptions.Item>

            <Descriptions.Item label="Phone">
              {selectedQuote.phoneNumber}
            </Descriptions.Item>

            <Descriptions.Item label="Website">
              {selectedQuote.websiteUrl || "N/A"}
            </Descriptions.Item>

            <Descriptions.Item label="Monthly Budget">
              ${selectedQuote.monthlyBudget}
            </Descriptions.Item>

            <Descriptions.Item label="Project Details">
              {selectedQuote.projectDetails}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
}
