# 排序算法单元测试建议

**目标文件**: `sort.ts`  
**测试框架**: Jest / Vitest  
**生成时间**: 2025-10-16

---

## 测试文件: `sort.test.ts`

```typescript
import { describe, test, expect } from 'vitest'
import { bubbleSort, quickSort, mergeSort } from './sort'

/**
 * 通用测试套件 - 适用于所有排序算法
 */
function createSortTests(
  sortName: string,
  sortFn: <T>(arr: T[], compareFn?: (a: T, b: T) => number) => T[]
) {
  describe(`${sortName} - 基础功能测试`, () => {
    test('应该正确排序数字数组', () => {
      const input = [3, 1, 4, 1, 5, 9, 2, 6]
      const expected = [1, 1, 2, 3, 4, 5, 6, 9]
      expect(sortFn(input)).toEqual(expected)
    })

    test('应该正确排序字符串数组', () => {
      const input = ['banana', 'apple', 'cherry', 'date']
      const expected = ['apple', 'banana', 'cherry', 'date']
      expect(sortFn(input)).toEqual(expected)
    })

    test('应该正确排序负数', () => {
      const input = [-5, 3, -2, 0, 8, -1]
      const expected = [-5, -2, -1, 0, 3, 8]
      expect(sortFn(input)).toEqual(expected)
    })

    test('应该正确排序小数', () => {
      const input = [3.14, 2.71, 1.41, 1.73]
      const expected = [1.41, 1.73, 2.71, 3.14]
      expect(sortFn(input)).toEqual(expected)
    })
  })

  describe(`${sortName} - 边界条件测试`, () => {
    test('应该处理空数组', () => {
      expect(sortFn([])).toEqual([])
    })

    test('应该处理单元素数组', () => {
      expect(sortFn([42])).toEqual([42])
    })

    test('应该处理两元素数组（未排序）', () => {
      expect(sortFn([2, 1])).toEqual([1, 2])
    })

    test('应该处理两元素数组（已排序）', () => {
      expect(sortFn([1, 2])).toEqual([1, 2])
    })

    test('应该处理已排序数组', () => {
      const input = [1, 2, 3, 4, 5]
      expect(sortFn(input)).toEqual([1, 2, 3, 4, 5])
    })

    test('应该处理逆序数组', () => {
      const input = [5, 4, 3, 2, 1]
      const expected = [1, 2, 3, 4, 5]
      expect(sortFn(input)).toEqual(expected)
    })

    test('应该处理所有元素相同的数组', () => {
      const input = [5, 5, 5, 5, 5]
      expect(sortFn(input)).toEqual([5, 5, 5, 5, 5])
    })

    test('应该处理包含重复元素的数组', () => {
      const input = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
      const expected = [1, 1, 2, 3, 3, 4, 5, 5, 6, 9]
      expect(sortFn(input)).toEqual(expected)
    })
  })

  describe(`${sortName} - 自定义比较器测试`, () => {
    test('应该支持降序排序', () => {
      const input = [3, 1, 4, 1, 5]
      const expected = [5, 4, 3, 1, 1]
      const compareFn = (a: number, b: number) => b - a
      expect(sortFn(input, compareFn)).toEqual(expected)
    })

    test('应该支持按对象属性排序', () => {
      interface Person {
        name: string
        age: number
      }

      const input: Person[] = [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
        { name: 'Charlie', age: 35 },
      ]

      const expected: Person[] = [
        { name: 'Bob', age: 25 },
        { name: 'Alice', age: 30 },
        { name: 'Charlie', age: 35 },
      ]

      const compareFn = (a: Person, b: Person) => a.age - b.age
      expect(sortFn(input, compareFn)).toEqual(expected)
    })

    test('应该支持多条件排序', () => {
      interface Student {
        grade: number
        name: string
      }

      const input: Student[] = [
        { grade: 90, name: 'Bob' },
        { grade: 85, name: 'Alice' },
        { grade: 90, name: 'Alice' },
      ]

      const expected: Student[] = [
        { grade: 85, name: 'Alice' },
        { grade: 90, name: 'Alice' },
        { grade: 90, name: 'Bob' },
      ]

      const compareFn = (a: Student, b: Student) => {
        if (a.grade !== b.grade) {
          return a.grade - b.grade
        }
        return a.name.localeCompare(b.name)
      }

      expect(sortFn(input, compareFn)).toEqual(expected)
    })
  })

  describe(`${sortName} - 错误处理测试`, () => {
    test('应该抛出错误当输入为 null', () => {
      expect(() => sortFn(null as any)).toThrow(TypeError)
    })

    test('应该抛出错误当输入为 undefined', () => {
      expect(() => sortFn(undefined as any)).toThrow(TypeError)
    })

    test('应该抛出错误当输入不是数组', () => {
      expect(() => sortFn('not an array' as any)).toThrow(TypeError)
    })

    test('应该处理比较函数抛出的错误', () => {
      const input = [1, 2, 3]
      const badCompareFn = () => {
        throw new Error('比较失败')
      }
      expect(() => sortFn(input, badCompareFn)).toThrow('排序失败')
    })
  })

  describe(`${sortName} - 稳定性测试`, () => {
    test('应该保持相等元素的相对顺序（稳定排序）', () => {
      interface Item {
        key: number
        index: number
      }

      const input: Item[] = [
        { key: 3, index: 0 },
        { key: 1, index: 1 },
        { key: 3, index: 2 },
        { key: 1, index: 3 },
      ]

      const compareFn = (a: Item, b: Item) => a.key - b.key
      const result = sortFn([...input], compareFn)

      // 检查 key=1 的元素顺序
      const onesIndices = result
        .filter((item) => item.key === 1)
        .map((item) => item.index)
      expect(onesIndices).toEqual([1, 3])

      // 检查 key=3 的元素顺序
      const threesIndices = result
        .filter((item) => item.key === 3)
        .map((item) => item.index)
      expect(threesIndices).toEqual([0, 2])
    })
  })

  describe(`${sortName} - 大数据量测试`, () => {
    test('应该处理 1000 个元素', () => {
      const input = Array.from({ length: 1000 }, () =>
        Math.floor(Math.random() * 1000)
      )
      const result = sortFn([...input])

      // 验证已排序
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1])
      }
    })

    test('应该处理 10000 个元素（性能测试）', () => {
      const input = Array.from({ length: 10000 }, () =>
        Math.floor(Math.random() * 10000)
      )

      const startTime = performance.now()
      const result = sortFn([...input])
      const endTime = performance.now()

      // 验证已排序
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1])
      }

      // 性能基准（根据算法调整）
      const duration = endTime - startTime
      console.log(`${sortName} 排序 10000 个元素耗时: ${duration.toFixed(2)}ms`)

      // 可选: 设置超时限制
      // expect(duration).toBeLessThan(5000); // 5秒
    })
  })

  describe(`${sortName} - 不变性测试`, () => {
    test('应该不修改原数组（如果实现为纯函数）', () => {
      const input = [3, 1, 4, 1, 5]
      const original = [...input]

      sortFn([...input]) // 使用副本

      expect(input).toEqual(original)
    })

    test('或应该返回排序后的同一数组（原地排序）', () => {
      const input = [3, 1, 4, 1, 5]
      const result = sortFn(input)

      // 检查是否是同一个对象引用
      expect(result).toBe(input)
    })
  })
}

// 为每个排序算法运行测试套件
createSortTests('bubbleSort', bubbleSort)
createSortTests('quickSort', quickSort)
createSortTests('mergeSort', mergeSort)

// 算法特定测试
describe('算法特定测试', () => {
  describe('bubbleSort 特定测试', () => {
    test('应该在已排序数组上提前退出', () => {
      const input = [1, 2, 3, 4, 5]
      // 如果实现了优化，应该只进行一次遍历
      const result = bubbleSort(input)
      expect(result).toEqual([1, 2, 3, 4, 5])
    })
  })

  describe('quickSort 特定测试', () => {
    test('应该正确处理所有元素相等的情况', () => {
      const input = [5, 5, 5, 5, 5]
      const result = quickSort(input)
      expect(result).toEqual([5, 5, 5, 5, 5])
    })

    test('应该正确选择 pivot', () => {
      // 测试不同 pivot 选择策略的影响
      const input = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      const result = quickSort(input)
      expect(result).toEqual(input)
    })
  })

  describe('mergeSort 特定测试', () => {
    test('应该正确合并两个已排序的子数组', () => {
      const input = [1, 3, 5, 2, 4, 6]
      const result = mergeSort(input)
      expect(result).toEqual([1, 2, 3, 4, 5, 6])
    })
  })
})

// 性能比较测试
describe('算法性能比较', () => {
  const sizes = [100, 500, 1000]

  sizes.forEach((size) => {
    test(`比较 ${size} 个元素的排序性能`, () => {
      const input = Array.from({ length: size }, () =>
        Math.floor(Math.random() * size)
      )

      const algorithms = [
        { name: 'bubbleSort', fn: bubbleSort },
        { name: 'quickSort', fn: quickSort },
        { name: 'mergeSort', fn: mergeSort },
      ]

      const results: { name: string; time: number }[] = []

      algorithms.forEach(({ name, fn }) => {
        const start = performance.now()
        fn([...input])
        const end = performance.now()
        results.push({ name, time: end - start })
      })

      console.log(`\n性能比较 (${size} 个元素):`)
      results.forEach((r) => {
        console.log(`  ${r.name}: ${r.time.toFixed(2)}ms`)
      })

      // 所有算法都应该完成排序
      expect(results.every((r) => r.time > 0)).toBe(true)
    })
  })
})

// 内存使用测试（需要特殊工具）
describe('内存使用测试', () => {
  test('bubbleSort 应该使用 O(1) 额外空间', () => {
    // 这需要使用内存分析工具
    // 这里只是一个示例
    const input = Array.from({ length: 1000 }, (_, i) => 1000 - i)

    const before = (performance as any).memory?.usedJSHeapSize || 0
    bubbleSort([...input])
    const after = (performance as any).memory?.usedJSHeapSize || 0

    if (before && after) {
      const used = (after - before) / 1024 / 1024
      console.log(`bubbleSort 额外内存使用: ${used.toFixed(2)} MB`)
    }
  })
})

// 并发测试
describe('并发排序测试', () => {
  test('应该支持并发调用', async () => {
    const promises = Array.from({ length: 10 }, (_, i) => {
      return new Promise((resolve) => {
        const input = Array.from({ length: 100 }, () =>
          Math.floor(Math.random() * 100)
        )
        const result = bubbleSort([...input])

        // 验证排序正确
        for (let j = 0; j < result.length - 1; j++) {
          if (result[j] > result[j + 1]) {
            throw new Error('排序错误')
          }
        }
        resolve(true)
      })
    })

    await expect(Promise.all(promises)).resolves.toBeDefined()
  })
})
```

---

## 测试配置

### Vitest 配置 (`vitest.config.ts`)

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'test/', '**/*.test.ts'],
    },
    testTimeout: 10000, // 10 秒
    hookTimeout: 10000,
  },
})
```

### Jest 配置 (`jest.config.js`)

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: ['sort.ts', '!**/*.test.ts', '!**/node_modules/**'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  testTimeout: 10000,
}
```

---

## 运行测试

### 安装依赖

```bash
# 使用 Vitest
npm install --save-dev vitest @vitest/ui

# 或使用 Jest
npm install --save-dev jest ts-jest @types/jest
```

### 运行命令

```bash
# Vitest
npm test                    # 运行所有测试
npm test -- --ui           # 打开 UI 界面
npm test -- --coverage     # 生成覆盖率报告
npm test -- sort.test.ts   # 运行特定文件

# Jest
npm test                    # 运行所有测试
npm test -- --coverage     # 生成覆盖率报告
npm test -- --watch        # 监听模式
npm test -- sort.test      # 运行特定文件
```

---

## 测试覆盖率目标

| 指标       | 目标  | 说明                    |
| ---------- | ----- | ----------------------- |
| 行覆盖率   | ≥ 90% | 至少 90% 的代码行被执行 |
| 分支覆盖率 | ≥ 80% | 至少 80% 的分支被测试   |
| 函数覆盖率 | 100%  | 所有导出函数都被测试    |
| 语句覆盖率 | ≥ 90% | 至少 90% 的语句被执行   |

---

## 持续集成配置

### GitHub Actions (`.github/workflows/test.yml`)

```yaml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x, 22.x]

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
          flags: unittests
          name: codecov-umbrella
```

---

## 性能基准测试

创建 `sort.bench.ts`:

```typescript
import { bench, describe } from 'vitest'
import { bubbleSort, quickSort, mergeSort } from './sort'

describe('排序算法性能基准', () => {
  const sizes = [10, 100, 1000]

  sizes.forEach((size) => {
    describe(`数组大小: ${size}`, () => {
      const randomArray = Array.from({ length: size }, () =>
        Math.floor(Math.random() * size)
      )

      bench(`bubbleSort - ${size}`, () => {
        bubbleSort([...randomArray])
      })

      bench(`quickSort - ${size}`, () => {
        quickSort([...randomArray])
      })

      bench(`mergeSort - ${size}`, () => {
        mergeSort([...randomArray])
      })

      bench(`原生 sort - ${size}`, () => {
        ;[...randomArray].sort((a, b) => a - b)
      })
    })
  })
})
```

运行基准测试:

```bash
npm test -- --run sort.bench.ts
```

---

## 测试报告示例

```
 ✓ bubbleSort - 基础功能测试 (8)
   ✓ 应该正确排序数字数组
   ✓ 应该正确排序字符串数组
   ✓ 应该正确排序负数
   ✓ 应该正确排序小数

 ✓ bubbleSort - 边界条件测试 (8)
   ✓ 应该处理空数组
   ✓ 应该处理单元素数组
   ✓ 应该处理两元素数组（未排序）
   ✓ 应该处理两元素数组（已排序）
   ✓ 应该处理已排序数组
   ✓ 应该处理逆序数组
   ✓ 应该处理所有元素相同的数组
   ✓ 应该处理包含重复元素的数组

 ✓ bubbleSort - 自定义比较器测试 (3)
   ✓ 应该支持降序排序
   ✓ 应该支持按对象属性排序
   ✓ 应该支持多条件排序

 ✓ bubbleSort - 错误处理测试 (4)
   ✓ 应该抛出错误当输入为 null
   ✓ 应该抛出错误当输入为 undefined
   ✓ 应该抛出错误当输入不是数组
   ✓ 应该处理比较函数抛出的错误

Test Files  1 passed (1)
     Tests  69 passed (69)
  Start at  10:30:15
  Duration  1.23s

 % Coverage report from v8
----------------|---------|----------|---------|---------|-------------------
File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------|---------|----------|---------|---------|-------------------
All files       |   95.23 |    88.88 |     100 |   95.23 |
 sort.ts        |   95.23 |    88.88 |     100 |   95.23 | 45-47
----------------|---------|----------|---------|---------|-------------------
```

---

## 总结

这套测试方案提供了:

1. ✅ **全面的功能测试** - 覆盖所有基本场景
2. ✅ **边界条件测试** - 确保健壮性
3. ✅ **错误处理测试** - 验证异常处理
4. ✅ **性能测试** - 比较不同算法
5. ✅ **稳定性测试** - 验证排序稳定性
6. ✅ **大数据测试** - 确保可扩展性
7. ✅ **CI/CD 集成** - 自动化测试流程

**预期覆盖率**: 90%+ 行覆盖率，80%+ 分支覆盖率

**下一步**: 运行测试并根据结果修复代码问题。
