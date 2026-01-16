# 快速开始

## 1. 查看演示页面

### 方式一：直接打开 HTML 文件

最简单的方式，无需任何依赖：

```bash
# 在浏览器中打开
examples/sg-power/demo.html
```

直接双击 `demo.html` 文件即可在浏览器中查看完整演示。

### 方式二：运行 React 版本

```bash
# 进入项目目录
cd json-render

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

访问 http://localhost:3001 查看完整的仪表板示例。

## 2. 了解文件结构

```
examples/sg-power/
├── README.md           # 完整文档
├── QUICKSTART.md       # 本文件 - 快速开始
├── demo.html           # HTML 演示（可直接打开）
├── demo.tsx            # React 演示组件
├── catalog.ts          # 电力业务组件目录定义
└── data.ts             # 模拟数据
```

## 3. 核心概念理解

### 什么是组件目录？

组件目录定义了 AI 可以使用的所有组件。例如：

```typescript
// catalog.ts
export const sgPowerCatalog = createCatalog({
  components: {
    PowerMetric: {
      props: z.object({
        label: z.string(),
        valuePath: z.string(),
        unit: z.string().nullable(),
      }),
      description: "电力指标展示",
    },
  },
  actions: {
    refresh_data: { description: "刷新实时数据" },
  },
});
```

### JSON 结构示例

```json
{
  "type": "PowerMetric",
  "props": {
    "label": "当前负荷",
    "valuePath": "/monitoring/currentLoad",
    "unit": "kW"
  }
}
```

这个 JSON 描述了一个显示当前负荷的组件，数据路径为 `/monitoring/currentLoad`。

### 数据绑定

```typescript
// data.ts
export const SG_POWER_DATA = {
  monitoring: {
    currentLoad: 45832.5,  // 对应 valuePath: "/monitoring/currentLoad"
  }
};
```

## 4. 创建你自己的组件

### 步骤 1：在目录中定义组件

```typescript
// catalog.ts
MyCustomComponent: {
  props: z.object({
    title: z.string(),
    value: z.number(),
  }),
  description: "我的自定义组件",
}
```

### 步骤 2：实现 React 组件

```typescript
const registry = {
  MyCustomComponent: ({ element, dataModel }) => (
    <div>
      <h3>{element.props.title}</h3>
      <p>{element.props.value}</p>
    </div>
  ),
};
```

### 步骤 3：在 JSON 中使用

```json
{
  "type": "MyCustomComponent",
  "props": {
    "title": "我的标题",
    "value": 123
  }
}
```

## 5. 示例场景

### 场景 1：监控大屏

用户输入："显示实时负荷、用电量、设备状态的监控看板"

AI 输出：
```json
{
  "type": "PowerGrid",
  "props": { "columns": 3 },
  "children": [
    {
      "type": "PowerCard",
      "props": { "title": "实时负荷" },
      "children": [{
        "type": "PowerMetric",
        "props": {
          "label": "当前负荷",
          "valuePath": "/monitoring/currentLoad",
          "unit": "kW"
        }
      }]
    }
  ]
}
```

### 场景 2：设备告警

用户输入："显示当前系统中的故障告警"

AI 输出：
```json
{
  "type": "PowerAlert",
  "props": {
    "type": "fault",
    "title": "开关柜B过载",
    "message": "温度超过阈值，当前72℃",
    "level": "high"
  }
}
```

### 场景 3：数据表格

用户输入："显示电费账单列表"

AI 输出：
```json
{
  "type": "BillTable",
  "props": {
    "dataPath": "/bills",
    "columns": [
      { "key": "customer", "label": "客户" },
      { "key": "amount", "label": "金额", "format": "currency" },
      { "key": "status", "label": "状态", "format": "status" }
    ]
  }
}
```

## 6. 下一步

1. **阅读完整文档** - 查看 `README.md` 了解更多细节
2. **查看源代码** - 研究现有组件的实现
3. **尝试修改** - 修改数据或组件，看看效果
4. **集成 AI** - 实现从自然语言到 JSON 的转换
5. **扩展功能** - 添加更多电力业务组件

## 7. 常见问题

### Q: 如何添加新的组件？

A: 在 `catalog.ts` 中定义组件结构，然后在 `demo.tsx` 的 `componentRegistry` 中实现对应的 React 组件。

### Q: 如何自定义样式？

A: 在 React 组件中使用 CSS 或 Tailwind CSS。样式的自定义完全由你控制。

### Q: 如何接入真实的 AI？

A: 使用 `useUIStream` hook 连接到你的 AI API：

```typescript
const { tree, send } = useUIStream({
  api: '/api/generate',
});

// 发送提示词
await send("显示实时监控看板");
```

### Q: 数据从哪里来？

A: 使用 `DataProvider` 提供数据：

```typescript
<DataProvider initialData={YOUR_DATA}>
  {/* 组件 */}
</DataProvider>
```

### Q: 如何处理用户交互？

A: 使用 `ActionProvider` 定义动作处理器：

```typescript
const handlers = {
  refresh_data: () => {
    // 处理刷新逻辑
  },
};

<ActionProvider handlers={handlers}>
  {/* 组件 */}
</ActionProvider>
```

## 8. 技术支持

- GitHub: https://github.com/vercel-labs/json-render
- 文档: https://json-render.dev
- Issues: https://github.com/vercel-labs/json-render/issues

---

开始探索 json-render 的强大功能吧！🚀
