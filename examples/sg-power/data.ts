/**
 * 国网电力业务模拟数据
 */

export const SG_POWER_DATA = {
  // 实时监控数据
  monitoring: {
    currentLoad: 45832.5, // 当前负荷 kW
    peakLoad: 52000, // 峰值负荷 kW
    voltage: 10.5, // 电压 kV
    frequency: 50.02, // 频率 Hz
    powerFactor: 0.95, // 功率因数

    // 24小时负荷曲线
    loadCurve: [
      { time: "00:00", value: 32000 },
      { time: "02:00", value: 28000 },
      { time: "04:00", value: 29000 },
      { time: "06:00", value: 35000 },
      { time: "08:00", value: 42000 },
      { time: "10:00", value: 48000 },
      { time: "12:00", value: 52000 },
      { time: "14:00", value: 50000 },
      { time: "16:00", value: 49000 },
      { time: "18:00", value: 51000 },
      { time: "20:00", value: 48000 },
      { time: "22:00", value: 40000 },
    ],

    // 电压波动曲线
    voltageCurve: [
      { time: "00:00", value: 10.3 },
      { time: "04:00", value: 10.4 },
      { time: "08:00", value: 10.5 },
      { time: "12:00", value: 10.6 },
      { time: "16:00", value: 10.5 },
      { time: "20:00", value: 10.4 },
      { time: "24:00", value: 10.3 },
    ],
  },

  // 设备数据
  devices: [
    {
      id: "TRF001",
      name: "1#主变压器",
      type: "主变压器",
      capacity: 50000, // kVA
      status: "online",
      loadRate: 78.5,
      temperature: 65,
      oilLevel: "normal",
      location: "变电站A区",
      lastMaintenance: "2024-01-10",
    },
    {
      id: "TRF002",
      name: "2#主变压器",
      type: "主变压器",
      capacity: 31500,
      status: "online",
      loadRate: 65.2,
      temperature: 58,
      oilLevel: "normal",
      location: "变电站A区",
      lastMaintenance: "2024-01-05",
    },
    {
      id: "SWT001",
      name: "110kV开关柜A",
      type: "开关柜",
      capacity: 2000,
      status: "online",
      loadRate: 45.8,
      temperature: 42,
      location: "高压室",
      lastMaintenance: "2023-12-20",
    },
    {
      id: "SWT002",
      name: "10kV开关柜B",
      type: "开关柜",
      capacity: 630,
      status: "fault",
      loadRate: 0,
      temperature: 72,
      location: "高压室",
      lastMaintenance: "2024-01-08",
    },
    {
      id: "CT001",
      name: "电流互感器A",
      type: "互感器",
      capacity: 1000,
      status: "online",
      loadRate: 85.3,
      temperature: 55,
      location: "变压器室",
      lastMaintenance: "2024-01-12",
    },
    {
      id: "PT001",
      name: "电压互感器A",
      type: "互感器",
      capacity: 110,
      status: "maintenance",
      loadRate: 0,
      temperature: 25,
      location: "变压器室",
      lastMaintenance: "2024-01-15",
    },
  ],

  // 用电数据
  consumption: {
    total: 1256780.5, // 本月用电量 kWh
    yesterday: 45632.5,
    today: 28345.8,
    lastMonth: 1189450.5,
    growth: 5.6,

    // 分区用电量
    byRegion: [
      { region: "工业A区", value: 450000, percentage: 35.8 },
      { region: "工业B区", value: 320000, percentage: 25.5 },
      { region: "商业区", value: 280000, percentage: 22.3 },
      { region: "居民区", value: 156780, percentage: 12.5 },
      { region: "其他", value: 50000.5, percentage: 4.0 },
    ],

    // 分时用电量
    byTimePeriod: [
      { period: "峰时段", value: 560000, hours: 8 },
      { period: "平时段", value: 420000, hours: 8 },
      { period: "谷时段", value: 276780, hours: 8 },
    ],
  },

  // 电费账单
  bills: [
    {
      id: "BILL202401001",
      customer: "XX化工厂",
      customerType: "工业用户",
      period: "2024-01",
      consumption: 156780.5,
      rate: 0.65, // 元/kWh
      basicFee: 5000,
      totalAmount: 102907.33,
      status: "unpaid",
      dueDate: "2024-01-25",
      issueDate: "2024-01-05",
    },
    {
      id: "BILL202401002",
      customer: "XX商贸公司",
      customerType: "商业用户",
      period: "2024-01",
      consumption: 45632.5,
      rate: 0.78,
      basicFee: 800,
      totalAmount: 36393.35,
      status: "paid",
      dueDate: "2024-01-20",
      issueDate: "2024-01-05",
      paymentDate: "2024-01-18",
    },
    {
      id: "BILL202401003",
      customer: "XX小区",
      customerType: "居民用户",
      period: "2024-01",
      consumption: 28345.8,
      rate: 0.52,
      basicFee: 200,
      totalAmount: 14739.82,
      status: "paid",
      dueDate: "2024-01-22",
      issueDate: "2024-01-05",
      paymentDate: "2024-01-20",
    },
    {
      id: "BILL202401004",
      customer: "XX科技公司",
      customerType: "工业用户",
      period: "2024-01",
      consumption: 89567.5,
      rate: 0.65,
      basicFee: 3000,
      totalAmount: 61318.88,
      status: "overdue",
      dueDate: "2024-01-15",
      issueDate: "2024-01-05",
    },
  ],

  // 警报事件
  alarms: [
    {
      id: "ALM001",
      type: "fault",
      level: "high",
      title: "开关柜B过载",
      message: "10kV开关柜B温度超过阈值，当前温度72℃",
      device: "SWT002",
      timestamp: "2024-01-15 10:30:25",
      acknowledged: false,
      resolved: false,
    },
    {
      id: "ALM002",
      type: "warning",
      level: "medium",
      title: "电压异常",
      message: "母线电压偏低，当前10.3kV，建议调整变压器分接头",
      device: "PT001",
      timestamp: "2024-01-15 09:15:10",
      acknowledged: true,
      resolved: false,
    },
    {
      id: "ALM003",
      type: "maintenance",
      level: "low",
      title: "设备检修计划",
      message: "PT001电压互感器计划检修中",
      device: "PT001",
      timestamp: "2024-01-15 08:00:00",
      acknowledged: true,
      resolved: true,
    },
  ],

  // 服务工单
  workOrders: [
    {
      id: "WO202401001",
      type: "repair",
      title: "开关柜B故障维修",
      priority: "high",
      status: "processing",
      requester: "运行值班员",
      createTime: "2024-01-15 10:35:00",
      assignee: "维修班组A",
      estimatedCompletion: "2024-01-15 14:00:00",
      description: "10kV开关柜B温度过高，需紧急处理",
    },
    {
      id: "WO202401002",
      type: "maintenance",
      title: "1#主变压器定期检修",
      priority: "medium",
      status: "pending",
      requester: "检修计划员",
      createTime: "2024-01-14 15:20:00",
      assignee: "检修班组B",
      estimatedCompletion: "2024-01-20 18:00:00",
      description: "按计划进行季度检修",
    },
    {
      id: "WO202401003",
      type: "installation",
      title: "新设备安装验收",
      priority: "low",
      status: "completed",
      requester: "设备管理员",
      createTime: "2024-01-10 09:00:00",
      assignee: "工程队",
      completedTime: "2024-01-12 16:30:00",
      description: "新购入设备安装及验收",
    },
  ],

  // 事件时间线
  events: [
    {
      time: "2024-01-15 10:35:00",
      type: "alarm",
      title: "开关柜B温度过高",
      description: "检测到温度异常，自动触发警报",
    },
    {
      time: "2024-01-15 10:30:00",
      type: "fault",
      title: "开关柜B故障",
      description: "设备运行异常，自动停机",
    },
    {
      time: "2024-01-15 09:15:00",
      type: "warning",
      title: "电压偏低",
      description: "母线电压低于正常范围",
    },
    {
      time: "2024-01-15 08:00:00",
      type: "maintenance",
      title: "设备检修开始",
      description: "PT001按计划开始检修",
    },
    {
      time: "2024-01-14 18:00:00",
      type: "info",
      title: "交接班完成",
      description: "正常交接班，设备状态良好",
    },
    {
      time: "2024-01-14 06:30:00",
      type: "info",
      title: "晨间巡检完成",
      description: "所有设备巡检正常",
    },
  ],

  // 表单数据
  form: {
    serviceRequest: {
      requestType: "",
      customerName: "",
      phone: "",
      address: "",
      description: "",
    },
    deviceFilter: {
      type: "",
      status: "",
      location: "",
    },
  },
};
