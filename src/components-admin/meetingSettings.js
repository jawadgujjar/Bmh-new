"use client";

import React, { useEffect, useState } from "react";
import { Card, Button, Typography, Tag, Space, Popconfirm, message, Spin } from "antd";
import { GoogleOutlined, CheckCircleFilled, DisconnectOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function MeetingSettings() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [disconnecting, setDisconnecting] = useState(false);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/google/status", { cache: "no-store" });
      const data = await res.json();
      setAccount(data.connected ? data.account : null);
    } catch (err) {
      console.error(err);
      message.error("Failed to load Google Calendar status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();

    // Land back here with a status after Google redirects to /admin?googleConnect=...
    const params = new URLSearchParams(window.location.search);
    const status = params.get("googleConnect");
    if (status === "success") {
      message.success("Google Calendar connected successfully!");
    } else if (status === "missing_refresh_token") {
      message.warning(
        "Google didn't return a refresh token. Remove BMH's access at myaccount.google.com/permissions and try connecting again."
      );
    } else if (status === "error") {
      message.error("Google connection failed. Please try again.");
    }
    if (status) {
      const url = new URL(window.location.href);
      url.searchParams.delete("googleConnect");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  const handleDisconnect = async () => {
    try {
      setDisconnecting(true);
      const res = await fetch("/api/admin/google/disconnect", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        message.success("Google Calendar disconnected");
        setAccount(null);
      } else {
        message.error(data.error || "Failed to disconnect");
      }
    } catch (err) {
      console.error(err);
      message.error("Failed to disconnect");
    } finally {
      setDisconnecting(false);
    }
  };

  return (
    <Card
      variant="outlined"
      style={{ borderRadius: 12, border: "1px solid #f0f0f0", maxWidth: 640 }}
    >
      <Title level={3} style={{ marginTop: 0 }}>📅 Meeting Scheduling Settings</Title>
      <Paragraph type="secondary">
        Connect ONE Google account here (usually your business/admin Gmail). Every visitor
        who books a "Free Consultation" on the website will get an event created directly
        on this calendar with a Google Meet link — they never need to sign in with Google
        themselves.
      </Paragraph>

      {loading ? (
        <Spin />
      ) : account ? (
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Tag icon={<CheckCircleFilled />} color="success" style={{ padding: "6px 12px", fontSize: 14 }}>
            Connected as {account.email}
          </Tag>
          <Text type="secondary">
            Connected on {account.connectedAt ? new Date(account.connectedAt).toLocaleString() : "-"}
          </Text>
          <Popconfirm
            title="Disconnect Google Calendar?"
            description="Meeting scheduling on the website will stop working until you reconnect."
            okText="Disconnect"
            okType="danger"
            cancelText="Cancel"
            onConfirm={handleDisconnect}
          >
            <Button danger icon={<DisconnectOutlined />} loading={disconnecting}>
              Disconnect
            </Button>
          </Popconfirm>
        </Space>
      ) : (
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Tag color="orange" style={{ padding: "6px 12px", fontSize: 14 }}>
            Not connected — meeting booking is disabled on the website
          </Tag>
          <Button
            type="primary"
            icon={<GoogleOutlined />}
            onClick={() => (window.location.href = "/api/admin/google/connect")}
          >
            Connect Google Calendar
          </Button>
        </Space>
      )}
    </Card>
  );
}
