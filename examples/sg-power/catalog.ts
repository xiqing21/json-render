import { createCatalog } from "@json-render/core";
import { z } from "zod";

/**
 * 国网电力业务组件目录
 *
 * 包含电力行业常用的业务组件：
 * - 电力数据监控：电量、负荷、电压等指标
 * - 设备管理：变压器、线路、开关设备等
 * - 业务流程：用电申请、故障报修、缴费等
 */
export const sgPowerCatalog = createCatalog({
  name: "国网电力业务系统",
  components: {
    // 布局组件
    PowerCard: {
      props: z.object({
        title: z.string().nullable(),
        icon: z.string().nullable(),
        status: z.enum(["normal", "warning", "error", "offline"]).nullable(),
        padding: z.enum(["sm", "md", "lg"]).nullable(),
      }),
      hasChildren: true,
      description: "电力业务卡片容器",
    },

    PowerGrid: {
      props: z.object({
        columns: z.number().min(1).max(6).nullable(),
        gap: z.enum(["sm", "md", "lg"]).nullable(),
        responsive: z.boolean().nullable(),
      }),
      hasChildren: true,
      description: "响应式网格布局",
    },

    // 数据指标组件
    PowerMetric: {
      props: z.object({
        label: z.string(),
        valuePath: z.string(),
        unit: z.string().nullable(),
        format: z.enum(["number", "currency", "percent", "power"]).nullable(),
        trend: z.enum(["up", "down", "stable"]).nullable(),
        trendValue: z.string().nullable(),
        color: z.enum(["blue", "green", "orange", "red"]).nullable(),
        threshold: z
          .object({
            warning: z.number().nullable(),
            danger: z.number().nullable(),
          })
          .nullable(),
      }),
      description: "电力指标展示",
    },

    // 图表组件
    LoadChart: {
      props: z.object({
        title: z.string().nullable(),
        dataPath: z.string(),
        type: z.enum(["line", "bar", "area"]),
        height: z.number().nullable(),
        showGrid: z.boolean().nullable(),
      }),
      description: "电力负荷曲线图",
    },

    ConsumptionChart: {
      props: z.object({
        title: z.string().nullable(),
        dataPath: z.string(),
        type: z.enum(["pie", "bar", "line"]),
        height: z.number().nullable(),
      }),
      description: "用电量统计图表",
    },

    VoltageChart: {
      props: z.object({
        title: z.string().nullable(),
        dataPath: z.string(),
        type: z.enum(["line", "area"]),
        height: z.number().nullable(),
        thresholds: z
          .object({
            min: z.number().nullable(),
            max: z.number().nullable(),
          })
          .nullable(),
      }),
      description: "电压曲线图",
    },

    // 表格组件
    DeviceTable: {
      props: z.object({
        dataPath: z.string(),
        columns: z.array(
          z.object({
            key: z.string(),
            label: z.string(),
            width: z.string().nullable(),
          }),
        ),
        selectable: z.boolean().nullable(),
        sortable: z.boolean().nullable(),
      }),
      description: "设备信息表格",
    },

    BillTable: {
      props: z.object({
        dataPath: z.string(),
        columns: z.array(
          z.object({
            key: z.string(),
            label: z.string(),
            format: z.enum(["text", "currency", "date", "status"]).nullable(),
          }),
        ),
      }),
      description: "电费账单表格",
    },

    // 设备状态组件
    DeviceStatus: {
      props: z.object({
        deviceName: z.string(),
        deviceId: z.string(),
        status: z.enum(["online", "offline", "fault", "maintenance"]),
        lastUpdate: z.string().nullable(),
        metrics: z
          .array(
            z.object({
              label: z.string(),
              value: z.string(),
              unit: z.string().nullable(),
            }),
          )
          .nullable(),
      }),
      description: "设备实时状态",
    },

    // 表单组件
    PowerForm: {
      props: z.object({
        title: z.string(),
        submitAction: z.string(),
        fields: z.array(
          z.object({
            key: z.string(),
            label: z.string(),
            type: z.enum(["text", "number", "select", "date", "textarea"]),
            required: z.boolean(),
            bindPath: z.string(),
            options: z
              .array(
                z.object({
                  value: z.string(),
                  label: z.string(),
                }),
              )
              .nullable(),
            placeholder: z.string().nullable(),
          }),
        ),
      }),
      description: "电力业务表单",
    },

    ServiceRequestForm: {
      props: z.object({
        requestType: z.enum([
          "installation",
          "maintenance",
          "repair",
          "inquiry",
        ]),
        customerInfo: z
          .object({
            name: z.string(),
            phone: z.string(),
            address: z.string(),
          })
          .nullable(),
        description: z.string(),
        submitAction: z.string(),
      }),
      description: "服务申请表单",
    },

    // 警告组件
    PowerAlert: {
      props: z.object({
        type: z.enum(["fault", "warning", "maintenance", "notice"]),
        title: z.string(),
        message: z.string().nullable(),
        level: z.enum(["low", "medium", "high", "critical"]).nullable(),
        timestamp: z.string().nullable(),
        dismissible: z.boolean().nullable(),
      }),
      description: "电力系统警报",
    },

    // 按钮
    PowerButton: {
      props: z.object({
        label: z.string(),
        variant: z
          .enum(["primary", "secondary", "danger", "success", "ghost"])
          .nullable(),
        size: z.enum(["sm", "md", "lg"]).nullable(),
        action: z.string(),
        disabled: z.boolean().nullable(),
        icon: z.string().nullable(),
      }),
      description: "操作按钮",
    },

    // 标签
    StatusBadge: {
      props: z.object({
        text: z.string(),
        variant: z.enum([
          "normal",
          "warning",
          "error",
          "offline",
          "online",
          "pending",
          "completed",
          "processing",
          "overdue",
          "paid",
          "unpaid",
        ]),
      }),
      description: "状态标签",
    },

    // 进度条
    PowerProgress: {
      props: z.object({
        label: z.string(),
        valuePath: z.string(),
        max: z.number(),
        unit: z.string().nullable(),
        color: z.enum(["blue", "green", "orange", "red"]).nullable(),
        showPercentage: z.boolean().nullable(),
      }),
      description: "进度条组件",
    },

    // 时间线
    EventTimeline: {
      props: z.object({
        dataPath: z.string(),
        title: z.string().nullable(),
      }),
      description: "事件时间线",
    },

    // 统计卡片
    StatCard: {
      props: z.object({
        title: z.string(),
        value: z.string(),
        valuePath: z.string().nullable(),
        change: z.string().nullable(),
        changeType: z.enum(["positive", "negative", "neutral"]).nullable(),
        icon: z.string().nullable(),
        color: z.enum(["blue", "green", "orange", "red", "purple"]).nullable(),
      }),
      description: "统计卡片",
    },
  },
  actions: {
    // 数据操作
    refresh_data: { description: "刷新实时数据" },
    export_report: { description: "导出报表" },
    export_bill: { description: "导出电费账单" },

    // 设备操作
    view_device_details: { description: "查看设备详细信息" },
    start_maintenance: { description: "开始设备维护" },
    reset_device: { description: "重置设备状态" },

    // 业务流程
    create_service_request: { description: "创建服务工单" },
    approve_request: { description: "审核通过申请" },
    reject_request: { description: "拒绝申请" },
    pay_bill: { description: "缴纳电费" },
    apply_recharge: { description: "申请充值" },

    // 报警处理
    acknowledge_alarm: { description: "确认警报" },
    resolve_alarm: { description: "解决警报" },
    mute_alarm: { description: "静音警报" },

    // 其他
    filter_data: { description: "筛选数据" },
    sort_data: { description: "排序数据" },
    print_report: { description: "打印报表" },
  },
  validation: "strict",
});

export const sgPowerComponentList = sgPowerCatalog.componentNames as string[];
