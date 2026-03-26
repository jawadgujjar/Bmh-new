"use client";

import { useEffect, useState } from "react";
import { Table, Tag, Button, message, Popconfirm } from "antd";

export default function NewsletterAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 📌 Fetch Data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/newsletter");
      const result = await res.json();

      if (result.success) {
        setData(result.data);
      } else {
        message.error("Failed to fetch data");
      }
    } catch (err) {
      message.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 📌 Delete Email
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/newsletter/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success) {
        message.success("Deleted successfully");
        fetchData();
      } else {
        message.error(result.message);
      }
    } catch (err) {
      message.error("Delete failed");
    }
  };

  // 📊 Table Columns
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "subscribed" ? "green" : "red"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Subscribed At",
      dataIndex: "subscribedAt",
      key: "subscribedAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete?"
          onConfirm={() => handleDelete(record._id)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Newsletter Subscribers</h2>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        loading={loading}
        bordered
      />
    </div>
  );
}