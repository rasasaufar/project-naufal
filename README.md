# 🎨 Naufal's Portfolio

> A modern, responsive personal portfolio website showcasing projects, skills, and creative process. Built with SvelteKit and Tailwind CSS.

[![Svelte](https://img.shields.io/badge/svelte-%23f1413d.svg?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

**Live Site:** [nflnrahly.studio](https://nflnrahly.studio)

## ✨ Features

- **Hero section** — bold introduction with animated transitions
- **About section** — personal info and background
- **Tools & Skills** — showcase of technical skills and tools used
- **Process section** — workflow and creative process overview
- **Project grid** — portfolio projects with descriptions and links
- **CTA section** — call-to-action for contact/collaboration
- **Responsive design** — mobile-first, clean modern UI
- **Smooth transitions** — animated section transitions with TransitionStrip components

## 🧰 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | SvelteKit, Svelte 5, TypeScript, Tailwind CSS v4 |
| **Deployment** | Docker (node:20), Nginx reverse proxy, Cloudflare SSL |

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:
- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [npm](https://www.npmjs.com/) or another package manager of your choice
- [Docker](https://www.docker.com/) (if deploying via container)

## 🚀 Installation & Setup

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/project-naufal.git
   cd project-naufal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

### Docker Deployment

To build and run the project using Docker:

1. **Build the Docker image**
   ```bash
   docker build -t naufal-portfolio .
   ```

2. **Run the container**
   ```bash
   docker run -d --name portfolio naufal-portfolio
   ```

> **Note:** Configuration for the Nginx proxy and Cloudflare SSL setup is managed externally.

## 📁 Project Structure

```text
project-naufal/
├── .github/workflows/
├── src/
│   ├── lib/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── About.svelte
│   │   │   ├── Cta.svelte
│   │   │   ├── Footer.svelte
│   │   │   ├── Hero.svelte
│   │   │   ├── Navbar.svelte
│   │   │   ├── Process.svelte
│   │   │   ├── ProjectGrid.svelte
│   │   │   ├── Tools.svelte
│   │   │   └── TransitionStrip.svelte
│   │   ├── data/
│   │   │   └── projects.json
│   │   └── index.ts
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +page.svelte
│   │   ├── app.css
│   │   └── layout.css
│   └── app.html
├── static/
├── Dockerfile
├── package.json
├── svelte.config.js
├── vite.config.ts
└── tsconfig.json
```

## 🖼️ Screenshots

> *Add project screenshots here showcasing the different sections and your responsive layout.*

## 📄 License

This project is proprietary and intended as a personal portfolio. Please reach out for permissions regarding any reuse or distribution of its design and contents.
