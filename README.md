# Main-PF: A Personal Showcase Monorepo

> A personal monorepo showcasing my professional work in Machine Learning and Data Science, alongside passion projects including blogs on sports and film.

This project is a centralized repository that contains several distinct web applications, all managed and built efficiently using **Turborepo**. The primary goal is to provide a live, high-performance platform to demonstrate my skills and interests.

---

## ✨ Key Features

* **⚡️ Monorepo Powered by Turborepo**: Utilizes Turborepo for high-performance build systems, including its powerful **Remote Caching** feature to speed up builds and deployments.
* **🤖 Intelligent Deployments**: CI/CD pipelines use `git` diffs to intelligently determine which apps have changed, ensuring only the affected projects are redeployed.
* **🔩 Modern Tech Stack**: Built with a robust and type-safe stack including **Next.js**, **TypeScript**, and **PostgreSQL**.
* **📝 Headless Editor**: The sports and film blogs use **Tiptap** as a headless editor, storing content as JSON and rendering it to HTML on the frontend for maximum flexibility.
* **📦 Centralized Configuration**: All applications consume shared configurations (ESLint, Prettier, TypeScript) from internal `packages`, ensuring consistency and maintainability across the repo.
* **🖼️ Optimized Image Delivery**: Images are served either statically from the application or via a **Cloudflare CDN** for accelerated global delivery.
* **🚀 Automated CI/CD**: The entire workflow is automated using **GitHub Actions** and **Vercel Actions** for continuous integration and deployment.

---

## 🏗️ Monorepo Structure

The repository is structured with applications in the `apps` directory and shared code/configurations in the `packages` directory.

### Applications

| Application   | Description                                            |
| :------------ | :----------------------------------------------------- |
| `apps/main`       | The primary portfolio and showcase for my ML/Data Science work. |
| `apps/sport-main` | A dedicated blog for my thoughts and articles on sports. |
| `apps/lbxd`       | A dedicated blog for film reviews and analysis.        |

### Packages

| Package                  | Description                                            |
| :----------------------- | :----------------------------------------------------- |
| `packages/ui`            | Shared UI components (e.g., buttons, cards) used across all apps. |
| `packages/config-eslint` | Shared ESLint configuration for consistent code style.   |
| `packages/config-tsconfig` | Shared TypeScript `tsconfig.json` files.               |
| `packages/db`            | (Example) Prisma schema and database utilities.        |

---

## 🛠️ Technology Stack

This project leverages a modern and efficient set of tools to deliver a high-quality developer and user experience.

* **Framework**: Next.js
* **Language**: TypeScript
* **Database**: PostgreSQL
* **Monorepo Tool**: Turborepo
* **Styling**: (e.g., Tailwind CSS)
* **Linting/Formatting**: ESLint & Prettier
* **Deployment**: Vercel
* **CI/CD**: GitHub Actions

---

## 🚀 Deployment & CI/CD

This monorepo is automatically deployed via a sophisticated CI/CD pipeline built on **GitHub Actions**.

1.  **Push to `main`**: A push or merge to the `main` branch triggers the workflow.
2.  **Remote Cache**: The workflow leverages Turborepo's remote caching to restore build artifacts from previous runs, dramatically reducing build times.
3.  **Selective Build**: The pipeline checks for changes within each app's directory.
4.  **Deploy**: Only the applications that have been modified are deployed to **Vercel**, saving build minutes and resources.

---

## 🚧 Project Status: In Development

This project is actively maintained. Some features are currently under development, including:
* Full-featured Tiptap editor with image upload functionality.
* Advanced image alignment and resizing options within blog posts.

> **Note**: This repository serves as a personal showcase and is not intended for direct reproduction or cloning. The code is provided for demonstration purposes.
