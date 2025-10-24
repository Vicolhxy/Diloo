# Diloo AI Photo Style Transfer Platform

## Overview
Diloo is an AI-powered photo style transfer platform that enables users to transform their photos into artistic renditions using professional AI-generated styles. The platform offers a curated collection of style presets (e.g., Pre-Processed, Hard Portrait, AI Photo, Social Avatar Deluxe) designed for natural, professional results. It is built as a full-stack web application with a modern React frontend and Express backend, focusing on a visual-first, conversion-oriented user experience.

## User Preferences
- Preferred communication style: Simple, everyday language.
- Testing preference: Do not proactively run tests. Always ask for user approval before running tests.

## System Architecture

### Frontend
- **Frameworks:** React 18 with TypeScript, Vite for building, Wouter for routing.
- **UI/UX:**
    - Custom color palette centered around teal (#25ced1).
    - Typography: Inter (UI) and Poppins (headings).
    - Tailwind CSS for utility-first styling, integrated with shadcn/ui components for accessible UI.
    - Glassmorphism effects for navigation and interactive elements.
    - Interactive elements with hover effects, such as image zoom and overlay reveals in the style showcase.
    - Responsive design for mobile and desktop.
- **Key Features:**
    - Dynamic style selection flow.
    - Image upload functionality with preview and re-selection options.
    - Customization options for background, coat material, and coat color.
    - Multi-state checkout process (Checkout, Processing, Success, Failure) with simplified layout and watermark.
    - Testimonials carousel with infinite loop and pause-on-hover.
- **State Management:** TanStack Query for server state, component-level React state for UI.

### Backend
- **Framework:** Express.js with TypeScript.
- **API:** RESTful API with `/api` prefix, including request logging and centralized error handling.
- **Development Tooling:** tsx for development, esbuild for production builds.

### Data Storage
- **Database:** PostgreSQL (via Neon serverless) with Drizzle ORM for type-safe queries.
- **Schema:** Minimal `users` table with UUID primary keys.
- **Session Management:** `connect-pg-simple` for PostgreSQL-backed sessions.
- **Storage Abstraction:** `IStorage` interface for flexible storage implementation (currently memory-based for development).

## External Dependencies

### UI & Styling
- **`@radix-ui/*`**: Accessible component primitives.
- **`tailwindcss`**: Utility-first CSS framework.
- **`class-variance-authority`**: Type-safe variant management.
- **`clsx`**, **`tailwind-merge`**: Conditional class name utilities.
- **`embla-carousel-react`**: Carousel component.
- **`lucide-react`**: Icon library.

### Data & Forms
- **`@tanstack/react-query`**: Async state management.
- **`react-hook-form`**: Form state and validation.
- **`zod`**: Schema validation library.

### Database & ORM
- **`@neondatabase/serverless`**: Neon PostgreSQL driver.
- **`drizzle-orm`**, **`drizzle-kit`**, **`drizzle-zod`**: ORM and schema tools.

### Development Tools
- **`vite`**: Frontend build tool.
- **`tsx`**: TypeScript execution for Node.js.
- **`esbuild`**: Fast JavaScript bundler.

### Utilities
- **`date-fns`**: Date manipulation.
- **`nanoid`**: Unique ID generation.

### Assets
- **Logo files**: `Diloo-logo-original.png`, `Diloo-logo-white.png`.
- **Images**: Banner.png (hero background), 8 professional portrait photos for showcase and testimonials.