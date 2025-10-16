# Lab 06 - Copilot CLI 代码审查完整指南

## ✅ 步骤 1: 安装完成

已成功安装 GitHub Copilot CLI:

- **版本**: 0.0.342
- **提交**: 69ac520
- **包名**: @github/copilot

⚠️ **注意**: 当前使用 Node.js v20.19.1，而推荐版本为 >= 22.0.0，但工具仍可正常运行。

---

## 🔐 步骤 2: 身份验证

### 方法 1: 交互式登录（推荐）

```bash
# 启动 Copilot CLI
copilot

# 在交互式界面中输入
/login

# 按照提示在浏览器中完成 GitHub OAuth 认证
```

### 方法 2: 使用 GitHub CLI

```bash
# 安装 GitHub CLI (macOS)
brew install gh

# 登录 GitHub
gh auth login

# 选择 GitHub.com
# 选择 HTTPS
# 选择 Login with a web browser
# 复制 one-time code 并在浏览器中完成认证

# 验证登录状态
gh auth status

# Copilot CLI 将自动使用 gh 的认证
```

### 方法 3: 使用环境变量

```bash
# 从 GitHub 创建 Personal Access Token
# Settings -> Developer settings -> Personal access tokens -> Fine-grained tokens
# 权限: read:user, copilot

# 设置环境变量
export GITHUB_TOKEN="your_token_here"

# 或添加到 ~/.zshrc
echo 'export GITHUB_TOKEN="your_token_here"' >> ~/.zshrc
source ~/.zshrc
```

---

## 📝 步骤 3: 使用 Copilot CLI 审查代码

### 交互式模式（推荐）

```bash
# 导航到项目目录
cd /Users/liujm/code/copilot-demo

# 启动 Copilot CLI
copilot --add-dir /Users/liujm/code/copilot-demo

# 在交互界面中输入
/help

# 查看 sort.ts 并请求审查
请审查 sort.ts 文件，找出所有问题

# 或者
review @sort.ts
```

### 非交互式模式

```bash
# 一次性执行审查
copilot -p "请审查 sort.ts 文件的代码质量、类型安全和算法正确性，列出所有问题" \
  --allow-all-tools \
  --add-dir /Users/liujm/code/copilot-demo
```

### 具体审查命令示例

```bash
# 审查特定文件
copilot -p "分析 sort.ts 中的类型错误" --allow-all-tools --add-dir .

# 生成补丁
copilot -p "为 sort.ts 生成修复所有问题的补丁" --allow-all-tools --add-dir .

# 安全检查
copilot -p "对 sort.ts 进行安全审查，检查是否有潜在的运行时错误" --allow-all-tools --add-dir .
```

---

## 🎯 步骤 4: 预期审查结果

根据 Lab 05 的分析，Copilot CLI 应该能识别以下问题：

### 🔴 严重问题 (6 个)

1. **any 类型滥用** - `bubbleSort`, `quickSort` 使用 any[]
2. **算法错误** - bubbleSort 循环边界错误
3. **缺少输入验证** - 所有函数都没有空数组检查
4. **var 使用** - quickSort 使用 var 代替 const/let
5. **缺少错误处理** - 没有 try-catch 或类型守卫
6. **缺少导出** - 所有函数都是 local，无法被导入

### 🟡 中等问题 (9 个)

7. 缺少泛型约束
8. 缺少返回类型注解
9. 缺少参数类型注解
10. 算法效率问题
11. 缺少 JSDoc 文档
12. 命名不一致
13. 缺少单元测试
14. 缺少边界条件处理
15. 缺少比较器函数

### 🟢 轻微问题 (6 个)

16. 缺少 strict 模式
17. 缺少 readonly 修饰符
18. 缺少 const assertion
19. 缺少代码注释
20. 缺少性能优化
21. 缺少类型别名

---

## 📊 验证清单

完成以下步骤以验证 Lab 06：

- [ ] ✅ 安装 @github/copilot CLI (版本 0.0.342)
- [ ] ⏳ 完成 GitHub 身份验证（3 种方法任选其一）
- [ ] ⏳ 启动 Copilot CLI 交互模式
- [ ] ⏳ 使用 `/help` 查看可用命令
- [ ] ⏳ 执行 `review @sort.ts` 或等效命令
- [ ] ⏳ 收到详细的代码审查报告
- [ ] ⏳ （可选）生成补丁文件
- [ ] ⏳ （可选）应用修复并验证

---

## 🔄 替代方案：使用 VS Code Copilot Chat

如果在身份验证上遇到困难，可以使用 VS Code 内置的 Copilot Chat：

```markdown
1. 打开 VS Code
2. 打开 sort.ts 文件
3. 按 Cmd/Ctrl + I 或点击 Copilot Chat 图标
4. 输入：
   @workspace 请详细审查 sort.ts 文件，列出所有代码问题、类型错误和改进建议
5. 查看生成的审查报告
```

---

## 📁 产出文件

按照 Lab 要求，应生成以下文件：

### 1. 补丁文件 (patch.diff)

```bash
copilot -p "为 sort.ts 生成完整的修复补丁" \
  --allow-all-tools \
  --add-dir /Users/liujm/code/copilot-demo > sort.patch.diff
```

### 2. Lint 报告

```bash
# 使用 TypeScript 编译器
npx tsc --noEmit sort.ts > sort.lint.txt 2>&1

# 或使用 ESLint（如果已配置）
npx eslint sort.ts --format json > sort.eslint.json
```

### 3. 测试报告

```bash
# 运行测试（如果有测试文件）
npm test -- sort.test.ts > sort.test.report.txt
```

---

## 🔗 参考资源

- [GitHub Copilot CLI 官方文档](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-in-the-command-line)
- [本项目的完整审查报告](./review/report.md)
- [修复后的代码示例](./sort.fixed.ts)
- [Lab 05 审查指南](./review/README.md)

---

## 💡 下一步操作

### 立即可执行的命令

```bash
# 1. 完成身份验证（推荐使用交互式方法）
copilot
# 然后输入: /login

# 2. 退出并重新启动
# 按 Ctrl+C 退出，然后：
copilot --add-dir /Users/liujm/code/copilot-demo

# 3. 在交互界面中审查代码
review @sort.ts

# 4. 或使用非交互模式
copilot -p "详细审查 sort.ts 文件的所有代码问题" \
  --allow-all-tools \
  --add-dir /Users/liujm/code/copilot-demo
```

---

## ⚠️ 常见问题

### Q1: 提示 "No authentication information found"

**解决方案**：

1. 运行 `copilot` 进入交互模式
2. 输入 `/login`
3. 在浏览器中完成 OAuth 认证
4. 返回终端继续使用

### Q2: Node.js 版本警告

**解决方案**：

```bash
# 使用 nvm 升级到 Node 22
nvm install 22
nvm use 22

# 重新安装 copilot
npm install -g @github/copilot
```

### Q3: 无法访问 sort.ts

**解决方案**：

```bash
# 确保使用 --add-dir 参数
copilot --add-dir /Users/liujm/code/copilot-demo

# 或允许所有路径（不推荐）
copilot --allow-all-paths
```

---

## 📝 总结

Lab 06 展示了如何使用 GitHub Copilot CLI 进行：

- ✅ **命令行代码审查** - 无需离开终端
- ✅ **自动补丁生成** - 快速修复问题
- ✅ **静态分析集成** - 结合 lint 工具
- ✅ **非交互式执行** - 适合 CI/CD 流程

**当前状态**: CLI 已安装并验证，等待身份验证后即可完成审查任务。

---

**下一个 Lab**: Lab 04 - CodingAgent (如果未完成) 或其他待执行的实验。
