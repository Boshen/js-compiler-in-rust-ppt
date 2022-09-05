---
theme: apple-basic
highlighter: shiki
lineNumbers: false
css: unocss
title: 用 Rust 写 JavaScript 编译器
exportFilename: js-compiler-in-rust
colorSchema: dark
favicon: ./favicon.png
layout: intro-image
image: ./bg2.jpeg
---

<div class="absolute top-40 left-17">
  <h1>用 Rust 写 JavaScript 编译器</h1>
  <br/>
  <p>前端性能及新技术实践</p>
  <p>字节跳动 Dev Better 技术沙龙</p>
</div>

<div class="absolute bottom-20 left-17">
  <div class="font-700">
    &mdash; Boshen
  </div>
  <div class="font-700">
    github.com/boshen
  </div>
</div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---

# 内容

* 现代和未来的前端工具链介绍
* JavaScript 工具链为什么慢?
* Native (Rust / Go) 工具链为什么快?
* 尝试用 Rust 写 JavaScript 编译器
* 挑战 ESLint - 20 倍的性能提升
* 用 JavaScript 时注意不到的性能细节


---
layout: two-cols
---

# 前端工具链介绍

<v-clicks>

* Parser - 解析成 AST, 让后面的工具使用
  * Babel, tsc
  * swc, esbuild

* Formatter - 格式化源代码
  * Prettier

* Linter - 检测错误
  * ESLint, TSLint

* Transpiler - Down-level JavaScript
  * Babel, tsc
  * Esbuild, swc

</v-clicks>

::right::

<v-clicks>

* Minifier - 压缩代码
  * uglify, terser
  * esbuild
  * Google Closure Compiler (Java 😂)

* Bundler - 打包代码
  * Webpack, Rollup
  * tsc
  * esbuild

* All-In-One - 集成上面所有工具
  * Webpack
  * Vite
  * Parcel

</v-clicks>

<!--
a
-->

---

# 前端工具链趋势


<v-click>

用 Native 语言一统江湖!

</v-click>

<v-clicks>

* Deno, Bun
  * 用 Rust / Zig 统一 Runtime

* swc, esbuild
  * 用 Rust / Go 重写所有工具

* Rome Tools
  * 用 Rust 统一全家桶！

</v-clicks>


---
layout: statement
---

# 商业逻辑 🤔 ?

<v-click>

<div class="mt-5">
买断开发者流量，用他们的服务 💰💰💰
</div>

</v-click>


---
layout: two-cols
---

# JS 工具链为什么慢?

<v-clicks>

* 语言自身 - Runtimes
  * Chrome, Node.js, Deno - V8
  * Firefox - SpiderMonkey
  * Safari, Bun - JavaScriptCore

* JIT (Just in Time)
  * 边解析边编译
  * 需要启动时间
  * 没有最优的 CPU 指令优化

* 内存 和 GC (Garbage Collection)
  * 运行时 GC 影响性能

</v-clicks>

::right::

<v-clicks>

* 架构
  * 插件系统
  * 没有重复使用 AST
  * 融合接口不兼容的工具

</v-clicks>


---

# 性能应用需要处理的核心问题

<v-click>

Concurrency vs Parallelism | 并发 vs 并行

</v-click>

<v-clicks>

* Concurrency - 并发
  * 同一时间执行更多的任务
  * 各种 async 模型

* Parallelism - 并行
  * 把一个任务拆分成多个子任务
  * 并且跑在多个 CPU 上

</v-clicks>


---
layout: statement
---

# 前端工具链核心逻辑

<div v-click class="text-left flex justify-center">

```javascript

let asts = [];

for (let file of files) {
  let ast1 = parse(file);
  let ast2 = transpile(ast1);
  let ast3 = minifiy(ast2);
  asts.push(ast3);
}

const output = bundle(asts);

```

</div>

<v-click>

都是可以拆的任务， 可以并行

</v-click>

<v-click>

可以使用多核！

</v-click>


---

# Native (Rust / Go) 工具链为什么快?

<v-clicks>

* 不单单是多核

* 编译到最优 CPU 指令
  * Rust - LLVM
  * Go - 定制

* 优秀的内存管理
  * Rust - 生命周期
  * Go - 业界最先进的 GC

* 层层优化
  * 极致到每一个比特的使用
  * 系统 API 调用
  * 优秀的性能排查工具

</v-clicks>


---

# 尝试用 Rust 写 JavaScript 编译器

<v-clicks>

* 过去半年时间自研 JavaScript / TypeScript Parser
* 跑通 99% Test262, babel 以及 TypeScript 语法测试
* 比 swc parser 快几倍，同 esbuild 和 Rome 在一个性能级别

</v-clicks>

<v-click>

## 性能来自于架构

</v-click>

<v-clicks>

* 一体式架构，不考虑插件系统
* 为多核而设计
* 压榨 LLVM, 用更优的 CPU 指令集
* 内存使用优化到极致
  - 使用 Memory Arena 内存池
  - 差点以为自己在写游戏引擎
  - 用各种工具排查和优化内存使用情况

</v-clicks>

<v-click>

Guide: https://github.com/Boshen/javascript-parser-in-rust

</v-click>

---
layout: statement
---

# 有了自己的地基，才敢搭建应用

---

# 挑战 ESLint

<v-clicks>

* ESLint 性能问题渐渐成为了我们的瓶颈
* 极其复杂的配置系统
* 无法提升能力的插件系统
* 没有区分开代码风格和代码错误两种基本问题
* 没有静态类型分析，需要引入 TypeScript - 变得巨慢无比
* 艰难处理越来越多的巨型 Monorepo - 十几万文件，几百万行代码

</v-clicks>

---
layout: statement
---

# 决定：自研企业级 ESLint

---

# 企业级 ESLint 功能

<v-clicks>

* Performance is feature
* 只检查正确性，不检查风格
* 开箱即用, 无需配置
* 更友好的错误信息

</v-clicks>

---

# 自研 ESLint 成果

<v-click>

  <img src="/no-self-compare.png" class="rounded shadow mb-5" />

</v-click>

<v-click>

  <img src="/no-dupe-class-member.jpeg" class="rounded shadow" />

</v-click>

---

# 自研 ESLint 性能

#### 2 秒完成 VScode 仓库 (3200 文件, 786K 行代码)

<v-click>

<div class="flex" style="height:40vh">
  <img src="/cloc.gif" class="mt-5 rounded shadow" />
</div>

</v-click>

---

# 自研 ESLint 成果

<v-clicks>

* 内部最大 Monorepo - 15 分钟 vs 20 秒 - 45 倍的性能提升
* 多核处理每一个文件
* 多核处理 Linter 规则
* 困难重重
  * Control Flow Analysis
  * Data Analysis
  * 学习 TypeScript

</v-clicks>



---

# 性能优化经验

<v-clicks>

* 性能不是白给的, 需要花时间打磨

* Cache Locality - 缓存访问局部性
  * 想方设法减少数据结构的内存，让它进 CPU / L1 / L2 缓存
  * 在 Hot Path 上面统计使用频率，决定是否引入跟高一层的缓存 (Heap, Disk)

* 申请和释放内存真的很耗时
  * 改为使用内存池后，性能提升 20%+
  * 一些系统 API 会无意间使用内存, 劲量统一申请，提前申请容量 (Capacity)

* 系统学习排查性能问题
  * 多看其他编译器源码，学习细节
  * 学会统计 Code Path 的执行次数，决定是否使用缓存


* Rust 并没有想象的那么难

</v-clicks>

---
layout: statement
---

# 期待开源

<div class="mt-5">
关注 github.com/boshen
</div>

---
layout: image
image: ./outro.jpeg
---

<div class="absolute top-63">
  <h1>THANK YOU</h1>
</div>
