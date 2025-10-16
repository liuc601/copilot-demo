/**
 * 有潜在问题的排序算法实现
 * 注意：此代码包含多个常见问题，用于演示代码审查
 */

// 问题1：使用 any 类型，缺乏类型安全
function bubbleSort(arr: any[]): any[] {
  // 问题2：直接修改输入数组，没有创建副本
  const n = arr.length

  // 问题3：变量命名不清晰
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // 问题4：内层循环条件错误，应该是 n - i - 1
      // 问题5：没有类型检查，可能导致运行时错误
      if (arr[j] > arr[j + 1]) {
        // 问题6：使用传统的临时变量交换，不如解构赋值简洁
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }

  return arr
}

// 问题7：没有导出函数，外部无法使用
// 问题8：缺少单元测试

// 问题9：没有输入验证
function quickSort(arr: any): any {
  // 问题10：没有处理空数组或非数组输入
  if (arr.length <= 1) return arr

  // 问题11：使用 var 而不是 const/let
  var pivot = arr[0]
  var left = []
  var right = []

  // 问题12：从索引1开始，但没有注释说明原因
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  // 问题13：递归调用可能导致栈溢出（大数组）
  return quickSort(left).concat(pivot, quickSort(right))
}

// 问题14：缺少 JSDoc 注释
function mergeSort(arr: number[]) {
  // 问题15：没有边界检查
  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)

  // 问题16：递归没有终止条件检查
  return merge(mergeSort(left), mergeSort(right))
}

// 问题17：merge 函数的类型定义不完整
function merge(left, right) {
  let result = []
  let i = 0
  let j = 0

  // 问题18：可能的数组越界访问
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++])
    } else {
      result.push(right[j++])
    }
  }

  // 问题19：直接使用 concat，性能不佳
  return result.concat(left.slice(i)).concat(right.slice(j))
}

// 问题20：全局变量污染
var sortedArray = [1, 2, 3, 4, 5]

// 问题21：没有错误处理
console.log(bubbleSort([3, 1, 4, 1, 5, 9, 2, 6]))
console.log(quickSort([3, 1, 4, 1, 5, 9, 2, 6]))
