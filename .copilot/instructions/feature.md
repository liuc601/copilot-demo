## 新功能实现指令示例

场景：为现有项目添加一项新功能（例如：行程推荐模块）。

指令：

- 请基于仓库结构在 `frontend/` 添加一个 `components/Recommendation` 组件，显示“你可能喜欢”的线路卡片。
- 组件应为无状态函数组件，接收 `items: Array<{ id: string; title: string; image?: string }>` 的 props。
- 为组件添加简短的单元测试，验证正确渲染传入的 items。
