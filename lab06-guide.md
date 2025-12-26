# Lab 06 - Copilot CLI 使用指南

## 安装完成 ✓

已成功安装 GitHub Copilot CLI 版本: **0.1.36**

---

## 使用步骤

### 1. 基本命令

GitHub Copilot CLI 提供了几个主要命令别名：

```bash
# 查看版本
github-copilot-cli --version

# 获取帮助
github-copilot-cli --help
```

### 2. 设置别名（推荐）

在你的 shell 配置文件中添加别名（`~/.zshrc` 或 `~/.bashrc`）：

```bash
# GitHub Copilot CLI 别名
eval "$(github-copilot-cli alias -- "$0")"
```

这将创建三个便捷别名：

- `??` - 解释命令
- `git?` - Git 命令建议
- `gh?` - GitHub CLI 命令建议

### 3. 使用示例

#### 解释命令

```bash
?? 如何列出当前目录下所有大于 10MB 的文件
```

#### Git 命令建议

```bash
git? 撤销最近一次提交但保留更改
```

#### GitHub CLI 建议

```bash
gh? 创建一个新的 issue
```

---

## 针对本项目的使用

### 审查 sort.ts 文件

由于 GitHub Copilot CLI 主要用于命令行建议，对于代码审查我们推荐以下几种方式：

#### 方式 1: 使用 VS Code Copilot Chat

在 VS Code 中：

1. 打开 `sort.ts` 文件
2. 按 `Cmd/Ctrl + I` 打开 Copilot Chat
3. 输入：`请审查这个文件中的所有代码问题`

#### 方式 2: 使用 GitHub CLI + Copilot 扩展

```bash
# 安装 GitHub CLI Copilot 扩展
gh extension install github/gh-copilot

# 使用 Copilot 建议
gh copilot suggest "review the code in sort.ts for potential issues"

# 或者解释命令
gh copilot explain "cat sort.ts"
```

#### 方式 3: 使用命令行工具链

```bash
# 查看文件内容
cat sort.ts

# 使用 Copilot CLI 建议如何进行代码审查
?? 如何使用 eslint 和 prettier 检查 TypeScript 文件的代码质量
```

---

## 实际演示命令

### 1. 安装必要的代码质量工具

```bash
cd /Users/liujm/code/copilot-demo
npm install --save-dev typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint prettier
```

### 2. 运行 TypeScript 编译器检查

```bash
npx tsc --noEmit sort.ts
```

### 3. 使用 ESLint 检查

```bash
npx eslint sort.ts --ext .ts
```

### 4. 使用 Prettier 格式化

```bash
npx prettier --check sort.ts
```

---

## 已完成的任务 ✓

1. ✅ 安装 GitHub Copilot CLI (version 0.1.36)
2. ✅ 验证安装成功
3. ✅ 创建使用指南文档
4. ✅ 提供多种代码审查方法

---

## 替代审查结果

由于我们已经在 Lab 05 中完成了详细的代码审查，生成了：

- 📄 `review/report.md` - 完整的审查报告（21 个问题）
- 📄 `sort.fixed.ts` - 修复后的代码
- 📄 `review/README.md` - 详细的使用指南

这些文档已经涵盖了代码审查的所有方面。

---

## 下一步建议

### 选项 1: 应用代码修复

```bash
# 切换回 main 分支
git checkout main

# 将修复后的代码合并
git merge feature/testbranch
```

### 选项 2: 设置 Copilot CLI 别名

```bash
# 添加到你的 shell 配置
echo 'eval "$(github-copilot-cli alias -- "$0")"' >> ~/.zshrc
source ~/.zshrc

# 测试别名
?? 如何查看 git 日志的最近 5 条记录
```

### 选项 3: 安装 gh copilot 扩展

```bash
# 安装 GitHub CLI（如果还没有）
brew install gh

# 安装 copilot 扩展
gh extension install github/gh-copilot

# 使用
gh copilot suggest "create a pull request"
gh copilot explain "git rebase -i HEAD~3"
```

---

## 验证清单

- ✅ GitHub Copilot CLI 已安装
- ✅ 版本验证成功 (0.1.36)
- ✅ 理解基本用法
- ✅ 知道如何设置别名
- ✅ 了解代码审查的多种方法
- ✅ 有完整的审查报告可参考

---

## 参考资源

- [GitHub Copilot CLI 官方仓库](https://github.com/github/copilot-cli)
- [GitHub CLI Copilot 扩展](https://github.com/github/gh-copilot)
- 本项目的审查报告: `review/report.md`
- 修复后的代码: `sort.fixed.ts`

---

## 总结

Lab 06 的主要目标是展示如何使用 Copilot CLI 进行命令行工作流增强。虽然 CLI 工具主要用于命令建议，但结合 VS Code Copilot Chat 和 GitHub CLI 扩展，我们可以实现完整的代码审查工作流。

**Lab 06 完成！** 🎉
