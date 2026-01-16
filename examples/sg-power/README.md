# json-render 国网业务样例

## 项目简介

本样例展示如何使用 `json-render` 构建国网电力行业的业务系统界面。通过定义电力行业专用的组件目录和数据模型，实现了安全的、可预测的 UI 生成能力。

## json-render 是什么？

`json-render` 是 Vercel Labs 开发的一个创新性框架，其核心思想是：

### 核心理念

1. **可控性（Guardrailed）** - AI 只能使用你在组件目录中定义的组件，确保生成的界面符合业务规范
2. **可预测性（Predictable）** - JSON 输出严格遵循 Schema 定义，每次生成结果一致
3. **高性能（Fast）** - 支持流式渲染，随着 AI 生成内容实时更新界面

### 工作原理

```
用户提示 → AI + 组件目录 → JSON 树 → React 组件渲染
         (受约束)        (可预测)    (实时流式)
```

### 为什么适合电力行业？

1. **严格规范** - 电力系统界面需要遵循严格的安全和规范标准
2. **数据安全** - 通过组件目录确保不会生成危险的代码
3. **快速迭代** - 业务人员可以通过自然语言快速生成监控界面
4. **统一风格** - 确保所有生成的界面保持一致的 UI/UX

## 国网业务样例特性

### 1. 电力专用组件

我们定义了电力行业专用的组件目录，包括：

#### 监控类组件
- **PowerMetric** - 电力指标展示（负荷、电压、频率等）
- **LoadChart** - 负荷曲线图
- **VoltageChart** - 电压曲线图
- **ConsumptionChart** - 用电量统计图表

#### 设备管理组件
- **DeviceStatus** - 设备实时状态
- **DeviceTable** - 设备信息表格

#### 业务流程组件
- **PowerForm** - 电力业务表单
- **ServiceRequestForm** - 服务申请表单
- **BillTable** - 电费账单表格

#### 警告组件
- **PowerAlert** - 电力系统警报（故障、警告、维护）

### 2. 完整的数据模型

包含电力系统常见数据：
- 实时监控数据（负荷、电压、频率）
- 设备数据（变压器、开关柜、互感器等）
- 用电数据（分区、分时统计）
- 电费账单
- 警报事件
- 服务工单

### 3. 业务场景示例

#### 场景 1：实时监控看板

```typescript
{
  "type": "PowerCard",
  "props": {
    "title": "实时负荷",
    "icon": "⚡",
    "status": "online"
  },
  "children": [{
    "type": "PowerMetric",
    "props": {
      "label": "当前负荷",
      "valuePath": "/monitoring/currentLoad",
      "unit": "kW",
      "color": "blue",
      "trend": "up",
      "trendValue": "较昨日 +5.2%"
    }
  }]
}
```

#### 场景 2：设备状态监控

```typescript
{
  "type": "DeviceTable",
  "props": {
    "dataPath": "/devices",
    "columns": [
      { "key": "name", "label": "设备名称" },
      { "key": "status", "label": "状态" },
      { "key": "loadRate", "label": "负载率" }
    ]
  }
}
```

#### 场景 3：故障告警

```typescript
{
  "type": "PowerAlert",
  "props": {
    "type": "fault",
    "title": "开关柜B过载",
    "message": "10kV开关柜B温度超过阈值，当前温度72℃",
    "level": "high",
    "timestamp": "2024-01-15 10:30:25"
  }
}
```

## 使用方法

### 安装依赖

```bash
pnpm install
```

### 运行演示

```bash
pnpm dev
```

访问 http://localhost:3001 查看仪表板示例

### 集成到你的项目

#### 1. 引入核心包

```bash
npm install @json-render/core @json-render/react
```

#### 2. 定义组件目录

```typescript
import { createCatalog } from "@json-render/core";
import { z } from "zod";

const catalog = createCatalog({
  name: "你的业务系统",
  components: {
    MyComponent: {
      props: z.object({
        title: z.string(),
        value: z.number(),
      }),
      hasChildren: false,
      description: "组件描述",
    },
  },
  actions: {
    myAction: { description: "动作描述" },
  },
});
```

#### 3. 实现 React 组件

```typescript
const registry = {
  MyComponent: ({ element, dataModel }) => (
    <div>
      <h3>{element.props.title}</h3>
      <p>{dataModel[element.props.value]}</p>
    </div>
  ),
};
```

#### 4. 使用 Provider 和 Renderer

```typescript
import { DataProvider, ActionProvider, Renderer } from "@json-render/react";

function App() {
  return (
    <DataProvider initialData={YOUR_DATA}>
      <ActionProvider handlers={ACTION_HANDLERS}>
        <Renderer tree={jsonTree} registry={registry} />
      </ActionProvider>
    </DataProvider>
  );
}
```

## 核心概念

### 组件目录（Catalog）

组件目录是 json-render 的核心概念，它定义了：

1. **可用的组件** - AI 只能使用这些组件
2. **组件属性 Schema** - 使用 Zod 定义严格的类型约束
3. **可用的动作** - 支持的业务操作
4. **验证规则** - 确保生成的内容符合规范

### 数据绑定

使用路径表达式绑定数据：

```typescript
{
  "type": "PowerMetric",
  "props": {
    "valuePath": "/monitoring/currentLoad"  // 自动从数据模型中取值
  }
}
```

### 条件可见性

基于数据动态控制组件显示：

```typescript
{
  "type": "PowerAlert",
  "props": { "message": "故障！" },
  "visible": {
    "path": "/monitoring/hasFault"  // 当有故障时显示
  }
}
```

### 动作处理

定义业务动作并在前端实现：

```typescript
// 定义动作
{
  "type": "Button",
  "props": {
    "label": "确认",
    "action": "acknowledge_alarm"
  }
}

// 处理动作
const handlers = {
  acknowledge_alarm: (params) => {
    // 执行业务逻辑
  }
};
```

## 高级特性

### 1. 流式生成

支持从 AI 流式接收 JSON 并实时渲染：

```typescript
const { tree, isStreaming, send } = useUIStream({
  api: '/api/generate',
});

// 实时渲染
<Renderer tree={tree} loading={isStreaming} />
```

### 2. 动态验证

内置验证机制确保数据正确性：

```typescript
{
  "type": "TextField",
  "props": {
    "valuePath": "/form/email",
    "checks": [
      { "fn": "required", "message": "必填" },
      { "fn": "email", "message": "邮箱格式错误" }
    ]
  }
}
```

### 3. 确认对话框

支持带确认的操作：

```typescript
{
  "type": "Button",
  "props": {
    "action": {
      "name": "delete_device",
      "confirm": {
        "title": "确认删除",
        "message": "确定要删除此设备吗？",
        "variant": "danger"
      }
    }
  }
}
```

## 实际应用场景

### 1. 智能监控大屏

业务人员通过自然语言描述监控需求，AI 自动生成监控界面：

```
用户："给我展示一个包含实时负荷、用电量、设备状态的监控看板"
AI → 生成对应的 JSON → 渲染界面
```

### 2. 故障诊断助手

根据故障描述，自动生成诊断界面和操作流程：

```
用户："10kV开关柜温度过高，需要故障处理流程"
AI → 生成故障告警和处理步骤 → 指导操作
```

### 3. 报表自动生成

根据报表需求，自动生成报表结构和图表：

```
用户："生成本月用电量统计报表，按区域和时段分析"
AI → 生成报表 UI → 绑定数据 → 导出
```

### 4. 自定义表单

根据业务需求动态生成表单：

```
用户："需要用电申请表单，包含用户信息、用电类型、容量需求"
AI → 生成表单结构 → 提交处理
```

## 优势分析

### 对比传统开发

| 特性 | 传统开发 | json-render |
|------|---------|-------------|
| 开发时间 | 数天到数周 | 几分钟到几小时 |
| 修改成本 | 高（需改代码） | 低（改描述） |
| 灵活性 | 低 | 高 |
| 业务参与度 | 低 | 高 |
| UI 一致性 | 依赖规范 | 自动保证 |

### 电力行业优势

1. **安全性** - 组件目录确保不会生成危险代码
2. **规范性** - 所有界面严格遵循电力行业 UI 规范
3. **效率** - 快速响应业务需求变化
4. **可维护** - 集中管理组件，易于升级维护
5. **可扩展** - 轻松添加新组件和业务逻辑

## 未来扩展

### 1. AI 集成

- 接入 OpenAI、Claude 等 LLM
- 实现自然语言到 JSON 的自动转换
- 支持多轮对话式界面生成

### 2. 更多业务场景

- 变电站监控
- 配电网管理
- 用电服务
- 调度指挥
- 故障处理

### 3. 高级功能

- 实时数据推送
- 复杂交互逻辑
- 移动端适配
- 多语言支持

## 技术栈

- **核心框架**: json-render
- **UI 框架**: React
- **类型检查**: TypeScript + Zod
- **包管理**: pnpm
- **构建工具**: Turbo

## 许可证

Apache-2.0

## 相关资源

- [json-render 官方仓库](https://github.com/vercel-labs/json-render)
- [json-render 文档](https://json-render.dev)
- [国网 UI 规范](https://www.sgcc.com.cn)

## 总结

json-render 通过组件目录的方式，将 AI 生成 UI 的能力约束在安全、可控的范围内。对于电力行业这样的高度规范化行业，这种模式能够：

1. **保证安全性** - AI 只能使用预定义的安全组件
2. **提高效率** - 快速响应业务需求
3. **统一规范** - 所有界面自动符合行业标准
4. **降低门槛** - 业务人员也能参与界面设计

这个样例展示了如何将 json-render 应用于国网电力业务场景，为电力行业的数字化转型提供了一种新的思路和工具。
