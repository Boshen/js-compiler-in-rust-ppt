---
theme: apple-basic
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
css: unocss

layout: intro-image
image: './bg2.jpeg'
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

<!--
-->

---

# 现代和未来的前端工具链介绍

<v-click>

处理 JavaScript / TypeScript 源代码

</v-click>

<v-clicks>

* Parser - 解析成 AST, 让后面的工具使用
  * babel, tsc
  * swc, esbuild

* Formatter - 格式化源代码
  * prettier

* Linter - 检测错误
  * eslint, tslint

</v-clicks>

<!--
a
-->

---

# 现代和未来的前端工具链介绍

<v-clicks>

* Transpiler - Down-level JavaScript
  * babel, tsc
  * esbuild, swc

* Minifier - 压缩代码
  * uglify, terser
  * esbuild
  * Google Closure Compiler (Java 😂)

* Bundler - 打包代码
  * webpack, rollup
  * tsc
  * esbuild

</v-clicks>

---

# 现代和未来的前端工具链介绍


<v-click>
趋势：一统江湖!
</v-click>

<v-clicks>

* Deno, Bun
  * 统一 Runtime！

* esbuild, swc
  * 统一 Bundler！
  * Parser + Transpier + Minifier + Bundler

* Rome Tools
  * 统一全家桶！

</v-clicks>

---
layout: statement
---


# 🤔 商业逻辑?

<v-click>
<div class="mt-5">
买断开发者流量，用他们的服务 💰💰💰
</div>
</v-click>

---

# JavaScript 工具链为什么慢?

<v-clicks>

* 语言自身 - Runtimes
  * Chrome, Node.js, Deno - V8
  * Firefox - SpiderMonkey
  * Safari, Bun - JavaScriptCore

* JIT (Just in Time)
  * 边解析边编译
  * 启动需要编译 = 增加启动时间
  * cpu 优化
    * CPU 指令

* 内存 和 gc (Garbage Collection)
  * 运行时 gc 影响性能

* 单线程
  * 后端无法合理利用多核

</v-clicks>

---

# Native (Rust / Go) 工具链为什么快?

---

# 尝试用 Rust 写 JavaScript 编译器

---

# 挑战 ESLint - 20 倍的性能提升

---

# 用 JavaScript 时注意不到的性能细节

---

# 总结

---
layout: image
image: './outro.jpeg'
---

<div class="absolute top-63">
  <h1>THANK YOU</h1>
</div>
