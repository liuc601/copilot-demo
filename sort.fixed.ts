/**
 * 排序算法实现（已修复版本）
 * 修复了原始代码中的所有严重和中等问题
 */

/**
 * 使用冒泡排序算法对数组进行升序排序
 * @template T - 数组元素类型，必须可比较
 * @param arr - 待排序的数组
 * @returns 排序后的新数组（不修改原数组）
 * @throws {TypeError} 如果输入不是数组
 * @example
 * bubbleSort([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]
 */
export function bubbleSort<T extends number | string>(arr: T[]): T[] {
  // 输入验证
  if (!Array.isArray(arr)) {
    throw new TypeError('Input must be an array')
  }

  // 创建副本，避免修改原数组
  const result = [...arr]
  const length = result.length

  // 优化的冒泡排序（带提前退出）
  let swapped: boolean
  do {
    swapped = false
    for (let i = 0; i < length - 1; i++) {
      if (result[i] > result[i + 1]) {
        // 使用解构赋值交换
        ;[result[i], result[i + 1]] = [result[i + 1], result[i]]
        swapped = true
      }
    }
  } while (swapped)

  return result
}

/**
 * 使用快速排序算法对数组进行升序排序
 * @template T - 数组元素类型，必须可比较
 * @param arr - 待排序的数组
 * @returns 排序后的新数组
 * @throws {TypeError} 如果输入不是数组
 * @example
 * quickSort([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]
 */
export function quickSort<T extends number | string>(arr: T[]): T[] {
  // 输入验证
  if (!Array.isArray(arr)) {
    throw new TypeError('Input must be an array')
  }

  // 基线条件
  if (arr.length <= 1) {
    return [...arr]
  }

  // 选择中间元素作为基准（比第一个元素更好）
  const pivotIndex = Math.floor(arr.length / 2)
  const pivot = arr[pivotIndex]
  const left: T[] = []
  const right: T[] = []

  // 分区
  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) continue // 跳过 pivot 本身

    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  // 递归排序并合并（使用扩展运算符，性能更好）
  return [...quickSort(left), pivot, ...quickSort(right)]
}

/**
 * 使用归并排序算法对数组进行升序排序
 * @template T - 数组元素类型，必须可比较
 * @param arr - 待排序的数组
 * @returns 排序后的新数组
 * @throws {TypeError} 如果输入不是数组
 * @example
 * mergeSort([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]
 */
export function mergeSort<T extends number | string>(arr: T[]): T[] {
  // 输入验证
  if (!Array.isArray(arr)) {
    throw new TypeError('Input must be an array')
  }

  // 基线条件：数组长度 <= 1 时已经有序
  if (arr.length <= 1) {
    return [...arr]
  }

  // 分割数组
  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)

  // 递归排序并合并
  return merge(mergeSort(left), mergeSort(right))
}

/**
 * 合并两个已排序的数组
 * @template T - 数组元素类型
 * @param left - 第一个已排序数组
 * @param right - 第二个已排序数组
 * @returns 合并后的排序数组
 */
function merge<T extends number | string>(left: T[], right: T[]): T[] {
  const result: T[] = []
  let leftIndex = 0
  let rightIndex = 0

  // 比较并合并
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex])
      leftIndex++
    } else {
      result.push(right[rightIndex])
      rightIndex++
    }
  }

  // 添加剩余元素（使用扩展运算符，性能更好）
  return [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)]
}

/**
 * 通用排序接口
 * @param arr - 待排序数组
 * @param algorithm - 排序算法类型
 * @returns 排序后的数组
 */
export function sort<T extends number | string>(
  arr: T[],
  algorithm: 'bubble' | 'quick' | 'merge' = 'quick'
): T[] {
  switch (algorithm) {
    case 'bubble':
      return bubbleSort(arr)
    case 'quick':
      return quickSort(arr)
    case 'merge':
      return mergeSort(arr)
    default:
      throw new Error(`Unknown algorithm: ${algorithm}`)
  }
}

// 仅在直接运行此文件时执行（非模块导入）
if (require.main === module) {
  try {
    const testArray = [3, 1, 4, 1, 5, 9, 2, 6]
    console.log('Original:', testArray)
    console.log('Bubble Sort:', bubbleSort(testArray))
    console.log('Quick Sort:', quickSort(testArray))
    console.log('Merge Sort:', mergeSort(testArray))
  } catch (error) {
    console.error('Sorting failed:', error)
  }
}
