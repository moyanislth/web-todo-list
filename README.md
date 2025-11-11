## Web Todo List
一个简单、高效的在线待办事项应用。每个用户通过浏览器localStorage独立管理自己的todo列表，支持离线使用，无需注册或服务器。核心目标：快速记录任务、跨浏览器同步数据、直观交互。

#### 特性

- **数据持久化**：使用localStorage存储数据，刷新不丢，支持5MB上限。
- **核心操作**：添加/编辑/删除/完成todo，支持标题（必填）和描述（可选）。
- **搜索与过滤**：顶部搜索框实时过滤标题。
- **排序**：鼠标拖拽排序todo项（仅同状态内）。
- **描述支持**：描述区支持基础换行、空格展示（pre-wrap）。
- **导入/导出**：JSON备份/恢复数据，便于迁移。
- **响应式设计**：Tailwind CSS驱动，适配桌面/移动。

#### 技术栈

- **框架**：Next.js (App Router)
- **样式**：Tailwind CSS
- **状态管理**：React Hooks (useState, useEffect)
- **持久化**：localStorage + 自定义hooks
- **其他**：React DnD-like拖拽（原生HTML5）

#### 快速启动

##### 先决条件

- Node.js >= 18
- npm/yarn/pnpm

##### 本地开发

1. 克隆仓库：

   ```text
   git clone https://github.com/moyanislth/web-todo-list.git
   cd web-todo-list
   ```

2. 安装依赖：

   ```text
   npm install
   ```

3. 运行开发服务器：

   ```text
   npm run dev
   ```

4. 访问 http://localhost:3000。
5. 数据自动从localStorage加载，支持实时编辑/排序。

#### 生产构建

```text
npm run build
npm start
```

访问 http://localhost:3000 

#### 部署

...

#### 已实现进度

✅ 核心CRUD（增删改查）  
✅ 修改todo（弹出编辑窗）  
✅ 拖拽排序（同组内）  
✅ localStorage持久化  
✅ 描述优化（换行/空格展示）  
✅ 导入/导出JSON数据

