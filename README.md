# React from Scratch

On a mission to get familiar with React, but I'm going to
try my best to uncover some of the complexity that they
want to protect me from.

On March 16, 2023 - the React team released a [blog post](https://react.dev/blog/2023/03/16/introducing-react-dev).

> The new React site (react.dev) teaches modern React with function components and Hooks.
> We’ve included diagrams, illustrations, challenges, and over 600 new interactive examples.
> The previous React documentation site has now moved to legacy.reactjs.org.

Suggesting that I'm doing anything "from scratch" is quite misleading. The core of React is basically `react` and `react-dom`. However, this doesn't take me very far because I'm going to need the rest of the "toolchain" to do anything useful.

# Starting a React Project

What does it actually mean to start a new React project?
Isn't it just a JS library? 

Before the official release date, there was a section in "Start a new React Project" that reveals most of the complexity under the hood of all these frameworks (see [wayback machine link](https://web.archive.org/web/20230314161214/https://beta.reactjs.org/learn/start-a-new-react-project))

> Custom toolchains 
> 
> You may prefer to create and configure your own toolchain. A toolchain typically consists of:
> 
> - A package manager lets you install, update, and manage third-party packages. Popular package managers: npm (built into Node.js), Yarn, pnpm.
> - A compiler lets you compile modern language features and additional syntax like JSX or type annotations for the browsers. Popular compilers: Babel, TypeScript, swc.
> - A bundler lets you write modular code and bundle it together into small packages to optimize load time. Popular bundlers: webpack, Parcel, esbuild, swc.
> - A minifier makes your code more compact so that it loads faster. Popular minifiers: Terser, swc.
> - A server handles server requests so that you can render components to HTML. Popular servers: Express.
> - A linter checks your code for common mistakes. Popular linters: ESLint.
> - A test runner lets you run tests against your code. Popular test runners: Jest.

If you go off of the "Start a new React Project" path today, you can jump straight into React land and never think about the "toolchain".

Doubtful? The [docs](https://react.dev/learn/start-a-new-react-project) page addresses that question too.

> You can definitely use React without a framework—that’s how you’d use React for a part of your page. However, if you’re building a new app or a site fully with React, we recommend using a framework.

TL;DR React itself probably doesn't do much for you. If you're building an application, you'll run into many more problems:
- routing
- data fetching
- server
- bundler
- compiler
- CSR, SSR, ISR, etc.

> These problems are not React-specific. This is why Svelte has SvelteKit, Vue has Nuxt, and so on.
> [...]
> If you’re still not convinced, or your app has unusual constraints not served well by these frameworks and you’d like to roll your own custom setup, we can’t stop you—go for it! Grab react and react-dom from npm, set up your custom build process with a bundler like Vite or Parcel, and add other tools as you need them for routing, static generation or server-side rendering, and more.

For the sake of my own sanity, I'm rolling with Next.js
