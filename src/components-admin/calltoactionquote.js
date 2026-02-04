"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Typography,
  message,
  Button,
  Modal,
  Descriptions,
  Popconfirm,
  Space,
} from "antd";

const { Title } = Typography;

export default function CallToActionQuote() {
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // 🔄 Fetch Quotes
  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/calltoactionquote");
      const data = await res.json();

      if (data.success) {
        setQuotes(data.data);
      } else {
        message.error(data.error || "Failed to fetch quotes");
      }
    } catch (error) {
      message.error("Failed to load quotes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  // 👁 View Quote
  const handleView = (record) => {
    setSelectedQuote(record);
    setIsViewModalOpen(true);
  };

  // 🗑 Delete Quote
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/calltoactionquote?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        message.success("Quote deleted successfully");
        fetchQuotes();
      } else {
        message.error(data.error || "Failed to delete quote");
      }
    } catch (error) {
      message.error("Delete failed");
    }
  };

  // 📋 Table Columns
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
      title: "Message",
      dataIndex: "goalsAndRequirements",
      key: "goalsAndRequirements",
      ellipsis: true,
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleView(record)}>
            View
          </Button>

          <Popconfirm
            title="Are you sure you want to delete this quote?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger type="link">
              Delete
            </Button>
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

      {/* 👁 View Modal */}
      <Modal
        title="Quote Details"
        open={isViewModalOpen}
        footer={null}
        onCancel={() => setIsViewModalOpen(false)}
      >
        {selectedQuote && (
          <Descriptions column={1} bordered size="middle">
            <Descriptions.Item label="Full Name">
              {selectedQuote.fullName}
            </Descriptions.Item>

            <Descriptions.Item label="Email">
              {selectedQuote.emailAddress}
            </Descriptions.Item>

            <Descriptions.Item label="Phone">
              {selectedQuote.phoneNumber}
            </Descriptions.Item>

            <Descriptions.Item label="Message">
              {selectedQuote.goalsAndRequirements}
            </Descriptions.Item>

            <Descriptions.Item label="Submitted At">
              {new Date(selectedQuote.createdAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
}
