## TypeScript 指令（团队专用）

以下规范适用于仓库中所有 TypeScript 文件，用于指导 Copilot 生成或补全代码时遵循的风格与约束。

代码风格

- 使用严格的类型注解（尽量避免 any）；对外暴露的函数、方法、接口要有明确的类型声明。
- 使用驼峰命名（camelCase）用于变量与函数，PascalCase 用于类型/类名。
- 代码注释使用 JSDoc 风格，包含参数与返回值说明。

错误处理

- 使用 try/catch 捕获异步操作中的错误，并返回或抛出结构化错误对象（{ code, message }）。

异步与并发

- 使用 async/await；对于并发任务优先使用 Promise.allSettled 并妥善处理部分失败情况。

接口与返回值

- 接口返回应遵循 REST 风格并使用统一包装 { code, message, data }。

测试

- 为关键逻辑生成单元测试（推荐 Jest + Testing Library）；测试应覆盖正常路径与 1-2 个边界/错误路径。

安全与敏感信息

- 不要在代码中硬编码密钥、凭证或敏感信息；如果需要演示，请使用环境变量并在示例中以占位符形式出现（例如 process.env.PAYMENT_KEY）。
