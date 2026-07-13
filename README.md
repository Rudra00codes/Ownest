# Own Nest 🏰 - Luxury Real Estate Platform

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Sanity CMS](https://img.shields.io/badge/Sanity_CMS-F03E3E?logo=sanity&logoColor=white)](https://www.sanity.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 📑 Table of Contents
- [Overview](#overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🎨 Design Patterns](#-design-patterns)
- [📐 Responsive Design](#-responsive-design)
- [🚀 Getting Started](#-getting-started)
- [📄 License](#-license)

---

## Overview

**Own Nest** is a premium, fully-responsive luxury real estate web application migrated from a Vite SPA to the modern **Next.js App Router**. It features a state-of-the-art aesthetic with high-quality background video elements, glassmorphism overlays, custom local typography, and immersive interactions. 

Discerning clients can explore exclusive, curated property listings, simulate payments using an interactive mortgage calculator, and schedule calls. All content is powered dynamically through an integrated **Sanity CMS** headless backend.

---

## ✨ Features

- **Next.js App Router Architecture** 🚀: Leverages server-side rendering (SSR), static site generation (SSG), and hybrid static params configurations for ultra-fast page speed.
- **Sanity CMS Integration** 📝: Headless CMS backend with a custom built-in studio interface accessible at `/studio` to manage properties, listings, agents, and testimonials in real time.
- **Premium UX Animations** 💫: Staggered entrance animations powered by **GSAP** and **ScrollTrigger**, featuring character-by-character SplitText reveals on headings.
- **Buttery-Smooth Scrolling** ⚓: Seamless scroll inertia and navigation controls integrated using **Lenis Smooth Scroll**.
- **Interactive Mortgage Calculator** 🧮: Client-side tool with instant down payment, interest rate, and term computations, rendered with glassmorphism design layouts.
- **Performance-Optimized Media** 🎥: Postered background video loaders designed to defer network resource streams until critical content is painted (First Contentful Paint optimization).
- **Custom Local Typography** 🎨: Preconfigured local variable font loaders supporting **ClashGrotesk** (for display headings) and **Manrope** (for readable body layout).
- **Sticky Glassmorphism Navbar** 🧭: Floating header pill that animates from transparent to a blur glass design dynamically on scroll.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Programming Language**: TypeScript
- **Content Management**: Sanity CMS (next-sanity)
- **Styling**: Tailwind CSS & Tailwind Animate
- **Animations**: GSAP (GreenSock), `@gsap/react`, ScrollTrigger
- **Scroll Engine**: Lenis
- **Forms & Validation**: React Hook Form + Zod
- **Icons**: Lucide React
- **Themes**: Next Themes

---

## 📁 Project Structure

```
├── public/                 # Static assets and media files
│   ├── font/               # Local ClashGrotesk and Manrope variable fonts
├── src/
│   ├── app/                # Next.js App Router layouts, global css, and page routes
│   │   ├── studio/         # Embedded Sanity Studio route
│   │   ├── properties/     # Dynamic listing and detail routes
│   ├── components/         # Reusable presentation and layout modules
│   │   ├── home/           # Homepage components (Hero, Calculator, About, etc.)
│   │   ├── layout/         # Header, Footer, and Navbar components
│   │   ├── providers/      # React contexts, providers, and Lenis setups
│   │   ├── ui/             # Core UI atoms and animation hooks (GSAP wrappers)
│   ├── lib/                # Shared utilities
│   ├── sanity/             # CMS client configuration and schemas
│   ├── types/              # Type definitions for listings and CMS schemas
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18.x or higher) and npm installed.

### 1. Clone the repository
```bash
git clone https://github.com/Rudra00codes/royal-hermitage.git
cd royal-hermitage
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory and copy the contents from `.env.local.example`:
```bash
cp .env.local.example .env.local
```
Update the Sanity variables with your credentials:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) 🌐 in your browser to view the application.

### 5. Build for Production
To verify page compilation and static generation, run:
```bash
npm run build
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---
Built with ❤️ by the Own Nest Team