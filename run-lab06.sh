#!/bin/bash

# Lab 06 - Copilot CLI 自动化审查脚本
# 用于完成 sort.ts 的代码审查任务

set -e

echo "=========================================="
echo "Lab 06 - Copilot CLI 代码审查"
echo "=========================================="
echo ""

# 检查 copilot 是否已安装
if ! command -v copilot &> /dev/null; then
    echo "❌ 错误: Copilot CLI 未安装"
    echo "请运行: npm install -g @github/copilot"
    exit 1
fi

echo "✅ Copilot CLI 已安装: $(copilot --version)"
echo ""

# 检查身份验证状态
echo "🔐 检查身份验证状态..."
if copilot -p "test" --allow-all-tools 2>&1 | grep -q "No authentication"; then
    echo "⚠️  需要进行身份验证"
    echo ""
    echo "请选择认证方法:"
    echo "1. 交互式登录 (推荐)"
    echo "2. 使用 GitHub CLI"
    echo "3. 手动设置 GITHUB_TOKEN"
    echo ""
    read -p "请选择 (1-3): " choice
    
    case $choice in
        1)
            echo ""
            echo "启动交互式登录..."
            echo "请在 Copilot CLI 中输入: /login"
            copilot
            ;;
        2)
            if ! command -v gh &> /dev/null; then
                echo "❌ GitHub CLI 未安装"
                echo "在 macOS 上安装: brew install gh"
                exit 1
            fi
            gh auth login
            echo "✅ GitHub CLI 认证完成"
            ;;
        3)
            echo ""
            echo "请访问: https://github.com/settings/tokens?type=beta"
            echo "创建一个 Fine-grained Personal Access Token"
            echo "权限: read:user, copilot"
            echo ""
            read -p "请输入 token: " token
            export GITHUB_TOKEN="$token"
            echo "export GITHUB_TOKEN=\"$token\"" >> ~/.zshrc
            echo "✅ Token 已设置并保存到 ~/.zshrc"
            ;;
        *)
            echo "❌ 无效选择"
            exit 1
            ;;
    esac
else
    echo "✅ 已完成身份验证"
fi

echo ""
echo "=========================================="
echo "开始代码审查"
echo "=========================================="
echo ""

# 设置项目目录
PROJECT_DIR="/Users/liujm/code/copilot-demo"
SORT_FILE="$PROJECT_DIR/sort.ts"

# 检查文件是否存在
if [ ! -f "$SORT_FILE" ]; then
    echo "❌ 错误: sort.ts 文件不存在"
    echo "路径: $SORT_FILE"
    exit 1
fi

echo "📁 目标文件: $SORT_FILE"
echo ""

# 创建输出目录
OUTPUT_DIR="$PROJECT_DIR/lab06-output"
mkdir -p "$OUTPUT_DIR"

echo "📝 执行代码审查..."
echo ""

# 执行审查并保存结果
REVIEW_OUTPUT="$OUTPUT_DIR/copilot-review.md"

copilot -p "请详细审查 sort.ts 文件，包括：
1. 类型安全问题 (any 使用、缺少类型注解)
2. 算法正确性 (循环边界、逻辑错误)
3. 最佳实践违规 (var使用、缺少导出)
4. 代码质量 (缺少文档、错误处理)
5. 性能优化建议

请为每个问题提供：
- 严重程度 (高/中/低)
- 问题描述
- 位置 (行号)
- 修复建议

以 Markdown 格式输出完整报告。" \
  --allow-all-tools \
  --add-dir "$PROJECT_DIR" \
  > "$REVIEW_OUTPUT" 2>&1

echo "✅ 审查完成: $REVIEW_OUTPUT"
echo ""

# 生成补丁文件
echo "🔧 生成修复补丁..."
PATCH_OUTPUT="$OUTPUT_DIR/sort.patch.diff"

copilot -p "分析 sort.ts 的所有问题，生成一个统一的补丁文件来修复：
1. 将 any[] 改为泛型 T[]
2. 修正算法错误
3. 添加输入验证
4. 使用 const/let 替代 var
5. 添加导出语句
6. 添加 JSDoc 文档

以标准 diff 格式输出。" \
  --allow-all-tools \
  --add-dir "$PROJECT_DIR" \
  > "$PATCH_OUTPUT" 2>&1

echo "✅ 补丁生成: $PATCH_OUTPUT"
echo ""

# 运行 TypeScript 编译器检查
echo "🔍 运行 TypeScript 静态检查..."
LINT_OUTPUT="$OUTPUT_DIR/typescript-check.txt"

cd "$PROJECT_DIR"
npx tsc --noEmit "$SORT_FILE" > "$LINT_OUTPUT" 2>&1 || true
echo "✅ TypeScript 检查完成: $LINT_OUTPUT"
echo ""

# 生成测试建议
echo "🧪 生成测试建议..."
TEST_OUTPUT="$OUTPUT_DIR/test-suggestions.md"

copilot -p "为 sort.ts 中的排序函数生成完整的单元测试建议，包括：
1. 正常情况测试
2. 边界条件测试 (空数组、单元素、已排序)
3. 类型测试 (数字、字符串、对象)
4. 错误处理测试
5. 性能测试建议

使用 Jest 或 Vitest 框架，提供完整的测试代码。" \
  --allow-all-tools \
  --add-dir "$PROJECT_DIR" \
  > "$TEST_OUTPUT" 2>&1

echo "✅ 测试建议生成: $TEST_OUTPUT"
echo ""

echo "=========================================="
echo "Lab 06 完成！"
echo "=========================================="
echo ""
echo "📊 生成的文件:"
echo "  - 代码审查报告: $REVIEW_OUTPUT"
echo "  - 修复补丁:     $PATCH_OUTPUT"
echo "  - TypeScript检查: $LINT_OUTPUT"
echo "  - 测试建议:     $TEST_OUTPUT"
echo ""
echo "📖 查看报告:"
echo "  cat $REVIEW_OUTPUT"
echo ""
echo "🔧 应用补丁:"
echo "  cd $PROJECT_DIR"
echo "  patch -p0 < $PATCH_OUTPUT"
echo ""
echo "✅ 所有步骤已完成！"
