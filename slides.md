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
    BY 陈博深
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
  - Memory Arena 内存池
  - 用各种工具排查和优化内存使用情况

</v-clicks>

<v-click>

Guide: https://github.com/Boshen/javascript-parser-in-rust

</v-click>


---

# 挑战 ESLint - 20 倍的性能提升


---

# 用 JavaScript 时注意不到的性能细节


---

# 总结


---
layout: image
image: ./outro.jpeg
---

<div class="absolute top-63">
  <h1>THANK YOU</h1>
</div>
