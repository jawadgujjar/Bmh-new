"use client";

import { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm, Modal } from "antd";

export default function ContactAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // 📌 Fetch Data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/contactus");
      const result = await res.json();

      if (result.success) {
        setData(result.data);
      } else {
        message.error("Failed to fetch contacts");
      }
    } catch (err) {
      message.error("Error fetching contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 📌 Delete
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/contactus/${id}`, {
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

  // 📌 View Handler
  const handleView = (record) => {
    setSelectedContact(record);
    setIsModalOpen(true);
  };

  // 📊 Columns
  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (text) => (
        <div style={{ maxWidth: 250 }}>
          {text.length > 50 ? text.slice(0, 50) + "..." : text}
        </div>
      ),
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
        <>
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            onClick={() => handleView(record)}
          >
            View
          </Button>

          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Contact Messages</h2>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        loading={loading}
        bordered
      />

      {/* ✅ VIEW MODAL */}
      <Modal
        title="Contact Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {selectedContact && (
          <div>
            <p><strong>Name:</strong> {selectedContact.fullName}</p>
            <p><strong>Email:</strong> {selectedContact.email}</p>
            <p><strong>Phone:</strong> {selectedContact.phone}</p>
            <p><strong>Message:</strong> {selectedContact.message}</p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(selectedContact.createdAt).toLocaleString()}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}