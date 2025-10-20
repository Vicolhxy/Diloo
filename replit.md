# Diloo AI Photo Style Transfer Platform

## Overview

Diloo is an AI-powered photo style transfer platform that enables users to transform their photos into artistic renditions by applying professional AI-generated styles. The platform features a curated collection of style presets (Pre-Processed, Hard Portrait, AI Photo, Social Avatar Deluxe) with a focus on natural, professional results. Built as a full-stack web application with a modern React frontend and Express backend, the platform emphasizes visual-first design, trust, and conversion-focused user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast HMR (Hot Module Replacement)
- **Wouter** for client-side routing (lightweight alternative to React Router)
- **TanStack Query (React Query)** for server state management and data fetching

**UI Component System**
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom design tokens
- Component configuration uses "new-york" style preset
- Comprehensive set of pre-built components (40+ UI components including dialogs, forms, navigation, data display)

**Design System**
- Custom color palette centered around purple primary (`280 65% 55%`) and cyan accent (`200 90% 50%`)
- Typography system using Inter (UI) and Poppins (headings) from Google Fonts
- Spacing system based on Tailwind's 8-point grid (2, 4, 8, 12, 16, 20, 24, 32)
- Dark mode support with HSL color tokens
- Hover and active states using elevation overlays (rgba overlays for depth)

**State Management Philosophy**
- Server state managed via TanStack Query with optimistic updates
- Local UI state kept in component-level React state
- No global state management library (Redux/Zustand) - intentionally simple architecture

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript for the REST API
- Custom middleware for request logging and error handling
- Development/production environment separation

**Development Tooling**
- **tsx** for running TypeScript in development without compilation
- **esbuild** for production builds (fast, efficient bundling)
- Vite integration for development with HMR support
- Replit-specific plugins for development experience (cartographer, dev banner, runtime error overlay)

**API Design**
- RESTful API with `/api` prefix for all backend routes
- Request/response logging middleware captures method, path, status, duration, and response body
- Centralized error handling middleware

**Build & Deployment**
- Separate client and server build processes
- Client builds to `dist/public` directory
- Server bundles to `dist` directory with ESM format
- Static file serving in production mode

### Data Storage

**Database Strategy**
- **PostgreSQL** as the primary database (via Neon serverless)
- **Drizzle ORM** for type-safe database queries and schema management
- Zod integration for runtime validation via `drizzle-zod`

**Schema Design**
- Current schema includes a minimal `users` table (id, username, password)
- UUID primary keys using PostgreSQL's `gen_random_uuid()`
- Migrations stored in `/migrations` directory

**Storage Abstraction Layer**
- `IStorage` interface defines CRUD operations
- `MemStorage` class provides in-memory implementation for development/testing
- Clean separation allows swapping storage implementations (currently memory-based, designed for database expansion)

**Session Management**
- `connect-pg-simple` configured for PostgreSQL-backed sessions
- Supports persistent authentication across server restarts

### External Dependencies

**UI & Styling**
- `@radix-ui/*` (20+ packages) - Accessible, unstyled component primitives
- `tailwindcss` - Utility-first CSS framework
- `class-variance-authority` - Type-safe variant management for components
- `clsx` + `tailwind-merge` - Conditional class name utilities

**Data Fetching & Forms**
- `@tanstack/react-query` - Async state management
- `react-hook-form` - Form state and validation
- `@hookform/resolvers` - Validation schema resolvers
- `zod` - Schema validation library

**Database & ORM**
- `@neondatabase/serverless` - Neon PostgreSQL driver
- `drizzle-orm` - TypeScript ORM
- `drizzle-kit` - Migration and schema management CLI
- `drizzle-zod` - Zod schema generation from Drizzle schemas

**Development Tools**
- `@replit/vite-plugin-*` - Replit-specific development enhancements
- `vite` - Frontend build tool
- `tsx` - TypeScript execution for Node.js
- `esbuild` - Fast JavaScript bundler

**Utilities**
- `date-fns` - Date manipulation library
- `embla-carousel-react` - Carousel/slider component
- `cmdk` - Command menu component (⌘K interface)
- `nanoid` - Unique ID generation
- `lucide-react` - Icon library

**Image Assets**
- Stock images stored in `attached_assets/stock_images/` directory
- Professional portrait and headshot images for style showcase
- Images referenced via Vite's asset resolution (`@assets` alias)

**Configuration Philosophy**
- Path aliases configured in both `tsconfig.json` and `vite.config.ts` for consistency
- `@/` prefix for client-side code
- `@shared/` prefix for shared schemas/types
- `@assets/` prefix for static assets
- Strict TypeScript configuration with ESM modules throughout