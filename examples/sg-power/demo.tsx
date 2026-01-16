"use client";

import { useState, useCallback } from "react";
import {
  DataProvider,
  ActionProvider,
  VisibilityProvider,
  Renderer,
} from "@json-render/react";
import { sgPowerCatalog } from "./catalog";
import { SG_POWER_DATA } from "./data";

/**
 * 国网电力业务演示页面
 * 展示如何使用 json-render 构建电力行业的业务界面
 */

const ACTION_HANDLERS = {
  refresh_data: () => {
    console.log("刷新数据...");
    alert("数据已刷新");
  },
  export_report: () => {
    console.log("导出报表...");
    alert("报表导出中...");
  },
  view_device_details: (params: Record<string, unknown>) => {
    console.log("查看设备详情:", params);
    alert(`查看设备详情: ${JSON.stringify(params)}`);
  },
  acknowledge_alarm: (params: Record<string, unknown>) => {
    console.log("确认警报:", params);
    alert(`警报已确认`);
  },
  create_service_request: () => {
    console.log("创建服务工单...");
    alert("服务工单已创建");
  },
};

// 简化的组件注册表 - 用于演示
const componentRegistry = {
  PowerCard: ({ element, children }: any) => (
    <div
      style={{
        background: element.props.status === "fault" ? "#fef2f2" : "#ffffff",
        border: `1px solid ${
          element.props.status === "fault"
            ? "#ef4444"
            : element.props.status === "warning"
              ? "#f59e0b"
              : "#e5e7eb"
        }`,
        borderRadius: "8px",
        padding: element.props.padding === "lg" ? "24px" : "16px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      {element.props.title && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          {element.props.icon && (
            <span style={{ marginRight: "8px" }}>{element.props.icon}</span>
          )}
          {element.props.title}
          {element.props.status && (
            <span
              style={{
                marginLeft: "auto",
                padding: "2px 8px",
                borderRadius: "4px",
                fontSize: "12px",
                background:
                  element.props.status === "online"
                    ? "#d1fae5"
                    : element.props.status === "fault"
                      ? "#fee2e2"
                      : element.props.status === "offline"
                        ? "#f3f4f6"
                        : "#fef3c7",
                color:
                  element.props.status === "online"
                    ? "#065f46"
                    : element.props.status === "fault"
                      ? "#991b1b"
                      : element.props.status === "offline"
                        ? "#374151"
                        : "#92400e",
              }}
            >
              {element.props.status}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  ),

  PowerMetric: ({ element, dataModel }: any) => {
    const value = dataModel[element.props.valuePath];
    const color =
      element.props.color === "blue"
        ? "#3b82f6"
        : element.props.color === "green"
          ? "#10b981"
          : element.props.color === "orange"
            ? "#f59e0b"
            : element.props.color === "red"
              ? "#ef4444"
              : "#6b7280";

    return (
      <div>
        <div
          style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}
        >
          {element.props.label}
        </div>
        <div style={{ fontSize: "28px", fontWeight: "700", color: color }}>
          {typeof value === "number"
            ? element.props.format === "currency"
              ? `¥${value.toLocaleString()}`
              : element.props.format === "percent"
                ? `${value.toFixed(1)}%`
                : value.toLocaleString()
            : value}
          {element.props.unit && (
            <span style={{ fontSize: "16px", marginLeft: "4px" }}>
              {element.props.unit}
            </span>
          )}
        </div>
        {element.props.trend && (
          <div
            style={{
              fontSize: "12px",
              marginTop: "4px",
              color:
                element.props.trend === "up"
                  ? "#10b981"
                  : element.props.trend === "down"
                    ? "#ef4444"
                    : "#6b7280",
            }}
          >
            {element.props.trend === "up"
              ? "↑"
              : element.props.trend === "down"
                ? "↓"
                : "→"}{" "}
            {element.props.trendValue}
          </div>
        )}
      </div>
    );
  },

  PowerAlert: ({ element, onAction }: any) => (
    <div
      style={{
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "12px",
        background:
          element.props.type === "fault"
            ? "#fef2f2"
            : element.props.type === "warning"
              ? "#fffbeb"
              : element.props.type === "maintenance"
                ? "#eff6ff"
                : "#f9fafb",
        border: `1px solid ${
          element.props.type === "fault"
            ? "#fee2e2"
            : element.props.type === "warning"
              ? "#fef3c7"
              : element.props.type === "maintenance"
                ? "#dbeafe"
                : "#e5e7eb"
        }`,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <span
          style={{
            marginRight: "8px",
            fontSize: "20px",
          }}
        >
          {element.props.type === "fault"
            ? "⚠️"
            : element.props.type === "warning"
              ? "⚡"
              : element.props.type === "maintenance"
                ? "🔧"
                : "ℹ️"}
        </span>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontWeight: "600",
              marginBottom: "4px",
              fontSize: "14px",
            }}
          >
            {element.props.title}
          </div>
          {element.props.message && (
            <div style={{ fontSize: "13px", color: "#6b7280" }}>
              {element.props.message}
            </div>
          )}
          {element.props.timestamp && (
            <div
              style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}
            >
              {element.props.timestamp}
            </div>
          )}
        </div>
        {element.props.dismissible && (
          <button
            onClick={() => onAction?.(element.props.action)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              color: "#9ca3af",
            }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  ),

  StatusBadge: ({ element }: any) => {
    const colors: Record<string, { bg: string; text: string }> = {
      online: { bg: "#d1fae5", text: "#065f46" },
      offline: { bg: "#f3f4f6", text: "#374151" },
      fault: { bg: "#fee2e2", text: "#991b1b" },
      warning: { bg: "#fef3c7", text: "#92400e" },
      normal: { bg: "#d1fae5", text: "#065f46" },
      paid: { bg: "#d1fae5", text: "#065f46" },
      unpaid: { bg: "#fee2e2", text: "#991b1b" },
      overdue: { bg: "#fef2f2", text: "#991b1b" },
      pending: { bg: "#fef3c7", text: "#92400e" },
      processing: { bg: "#dbeafe", text: "#1e40af" },
      completed: { bg: "#d1fae5", text: "#065f46" },
    };

    const colors_ = colors[element.props.variant] || colors.normal;

    return (
      <span
        style={{
          padding: "2px 8px",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: "500",
          background: colors_.bg,
          color: colors_.text,
        }}
      >
        {element.props.text}
      </span>
    );
  },
};

// 预定义的UI树示例
const DASHBOARD_TREE = {
  root: "grid",
  elements: {
    grid: {
      key: "grid",
      type: "PowerGrid",
      props: { columns: 3, gap: "md" },
      children: ["card1", "card2", "card3", "alerts"],
    },
    card1: {
      key: "card1",
      type: "PowerCard",
      props: { title: "实时负荷", icon: "⚡", status: "online", padding: "md" },
      children: ["metric1"],
    },
    metric1: {
      key: "metric1",
      type: "PowerMetric",
      props: {
        label: "当前负荷",
        valuePath: "/monitoring/currentLoad",
        unit: "kW",
        format: "number",
        color: "blue",
        trend: "up",
        trendValue: "较昨日 +5.2%",
      },
    },
    card2: {
      key: "card2",
      type: "PowerCard",
      props: { title: "用电量", icon: "📊", status: "online", padding: "md" },
      children: ["metric2"],
    },
    metric2: {
      key: "metric2",
      type: "PowerMetric",
      props: {
        label: "本月用电量",
        valuePath: "/consumption/total",
        unit: "kWh",
        format: "number",
        color: "green",
        trend: "up",
        trendValue: "较上月 +5.6%",
      },
    },
    card3: {
      key: "card3",
      type: "PowerCard",
      props: { title: "设备状态", icon: "🔧", status: "online", padding: "md" },
      children: ["metric3"],
    },
    metric3: {
      key: "metric3",
      type: "PowerMetric",
      props: {
        label: "在线设备",
        valuePath: "/devices",
        unit: "台",
        format: "number",
        color: "green",
        trend: "stable",
        trendValue: "6台在线",
      },
    },
    alerts: {
      key: "alerts",
      type: "PowerCard",
      props: {
        title: "系统告警",
        icon: "⚠️",
        status: "warning",
        padding: "md",
      },
      children: ["alert1", "alert2"],
    },
    alert1: {
      key: "alert1",
      type: "PowerAlert",
      props: {
        type: "fault",
        title: "开关柜B过载",
        message: "10kV开关柜B温度超过阈值，当前温度72℃",
        level: "high",
        timestamp: "2024-01-15 10:30:25",
        action: "acknowledge_alarm",
      },
    },
    alert2: {
      key: "alert2",
      type: "PowerAlert",
      props: {
        type: "warning",
        title: "电压异常",
        message: "母线电压偏低，当前10.3kV，建议调整变压器分接头",
        level: "medium",
        timestamp: "2024-01-15 09:15:10",
      },
    },
  },
};

function PowerDashboardContent() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px" }}>
      <header style={{ marginBottom: 32 }}>
        <h1
          style={{ margin: 0, fontSize: 32, fontWeight: 600, color: "#1f2937" }}
        >
          国网电力业务系统
        </h1>
        <p style={{ margin: "8px 0 0", color: "#6b7280", fontSize: 16 }}>
          基于 json-render 的电力行业业务界面演示
        </p>
      </header>

      <div style={{ marginBottom: 24, display: "flex", gap: 12 }}>
        <button
          onClick={() => ACTION_HANDLERS.refresh_data()}
          style={{
            padding: "8px 16px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          刷新数据
        </button>
        <button
          onClick={() => ACTION_HANDLERS.export_report()}
          style={{
            padding: "8px 16px",
            background: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          导出报表
        </button>
      </div>

      <Renderer tree={DASHBOARD_TREE as any} registry={componentRegistry} />

      <div style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>设备状态概览</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {SG_POWER_DATA.devices.map((device) => (
            <PowerCard
              key={device.id}
              element={{
                props: {
                  title: device.name,
                  status: device.status,
                  padding: "sm",
                },
              }}
            >
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
                <div>类型: {device.type}</div>
                <div>位置: {device.location}</div>
                <div>
                  负载率:{" "}
                  <StatusBadge
                    element={{
                      props: {
                        text: `${device.loadRate}%`,
                        variant: device.status === "fault" ? "error" : "normal",
                      },
                    }}
                  />
                </div>
              </div>
            </PowerCard>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>电费账单</h2>
        <div
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f9fafb" }}>
              <tr>
                {[
                  "账单号",
                  "客户",
                  "类型",
                  "用电量(kWh)",
                  "金额(元)",
                  "状态",
                ].map((header) => (
                  <th
                    key={header}
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#6b7280",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SG_POWER_DATA.bills.map((bill) => (
                <tr key={bill.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "12px 16px", fontSize: 13 }}>
                    {bill.id}
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13 }}>
                    {bill.customer}
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13 }}>
                    {bill.customerType}
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13 }}>
                    {bill.consumption.toLocaleString()}
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13 }}>
                    {bill.totalAmount.toLocaleString()}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <StatusBadge
                      element={{
                        props: {
                          text:
                            bill.status === "paid"
                              ? "已缴费"
                              : bill.status === "unpaid"
                                ? "未缴费"
                                : "逾期",
                          variant: bill.status,
                        },
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <details style={{ marginTop: 32 }}>
        <summary style={{ cursor: "pointer", fontSize: 14, color: "#6b7280" }}>
          查看 JSON 结构
        </summary>
        <pre
          style={{
            marginTop: 8,
            padding: 16,
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            overflow: "auto",
            fontSize: 12,
            color: "#6b7280",
          }}
        >
          {JSON.stringify(DASHBOARD_TREE, null, 2)}
        </pre>
      </details>
    </div>
  );
}

export default function PowerDashboardDemo() {
  return (
    <DataProvider initialData={SG_POWER_DATA}>
      <VisibilityProvider>
        <ActionProvider handlers={ACTION_HANDLERS}>
          <PowerDashboardContent />
        </ActionProvider>
      </VisibilityProvider>
    </DataProvider>
  );
}
