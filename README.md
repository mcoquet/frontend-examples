<div align="center">
  <img src="https://github.com/user-attachments/assets/7afad85a-b285-4bd0-b36a-43f7558e2838" alt="todo app">
</div>

# Frontend examples

The objective of this repository is to showcase examples of Manifest implementations with popular frontend frameworks.

The application is a slightly modified version of the popular [TodoMVC](https://todomvc.com/) that connects to a backend instead of keeping the logic in the frontend.

All frontends share the common Manifest backend API and use the Manifest JS SDK.

## Folder structure

```
├── manifest
│   ├── backend.yml
│   ├── backend.db
├── nextjs
│   ├── **
├── react
│   ├── **
├── svelte
│   ├── **
├── **
│   ├── **
├── README.md
├── node_modules
├── package.json
├── package-lock.json
└── .gitignore
```

## Available Demos

- [Next.js Todo App](./nextjs/README.md)

## Prerequisites

Before running any of the demos, ensure you have the following installed:
- Node.js (version 14 or later recommended)
- npm (usually comes with Node.js)

## Running the Manifest Backend

1. Install the dependencies:
   ```
   npm install
   ```

2. From the root directory of the project run the following command
   ```
   npm run manifest
   ```

Note: A sample database has already been initialized and included in this repository. You can find it at `manifest/backend.db`.