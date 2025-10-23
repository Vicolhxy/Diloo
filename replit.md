# Diloo AI Photo Style Transfer Platform

## Overview

Diloo is an AI-powered photo style transfer platform that enables users to transform their photos into artistic renditions by applying professional AI-generated styles. The platform features a curated collection of style presets (Pre-Processed, Hard Portrait, AI Photo, Social Avatar Deluxe) with a focus on natural, professional results. Built as a full-stack web application with a modern React frontend and Express backend, the platform emphasizes visual-first design, trust, and conversion-focused user experience.

## Recent Changes

**October 23, 2025**
- Added top Navigation bar with frosted glass effect:
  - Fixed positioning with white semi-transparent background (70% opacity) + backdrop blur
  - Left: Diloo logo and brand name
  - Right: Home and Feedback tabs with dynamic active states
  - Active tab shows teal color with 2px bottom border
- Created Upload page with two-column responsive layout:
  - Left column: Sample photo display (professional portrait in white card)
  - Right column: Upload and customization controls
  - Two upload areas (required + optional) with teal dashed borders
  - Concise format support text: "PNG and JPG only"
  - Customization options: Background Color (5 options), Coat Material (4 options), Coat Color (5 options)
- Implemented client-side routing with Wouter:
  - Added /upload route
  - StyleShowcase Create buttons now navigate to Upload page
  - "Back to Home" link returns to homepage
  - Tab navigation with automatic active state tracking
- All end-to-end tests passed for navigation flow

**October 22, 2025**
- Implemented horizontal auto-scrolling testimonials carousel with infinite loop animation
- Removed job titles from testimonial cards (now showing only avatar, name, rating, and comment)
- Added brand slogan to footer: "Expert-crafted AI styles. Always on trend."
- Unified CategoryNav and StyleShowcase background colors for seamless visual flow
- Reduced StyleShowcase top padding to 1/4 of original for tighter layout
- Added interactive hover effects to style showcase cards:
  - Image zoom (110% scale) on hover
  - Bottom overlay slides up with semi-transparent black background (100px height)
  - White "Create" button appears in overlay
  - Smooth 300ms transitions with ease-out timing

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast HMR (Hot Module Replacement)
- **Wouter** for client-side routing with two main routes:
  - `/` - Homepage with hero, style showcase, testimonials
  - `/upload` - Photo upload and customization page
- **TanStack Query (React Query)** for server state management and data fetching

**UI Component System**
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom design tokens
- Component configuration uses "new-york" style preset
- Comprehensive set of pre-built components (40+ UI components including dialogs, forms, navigation, data display)

**Design System**
- Custom color palette centered around teal primary (`181 70% 48%` / #25ced1) matching Homepage.png reference
- Typography system using Inter (UI) and Poppins (headings) from Google Fonts
- Spacing system based on Tailwind's 8-point grid (2, 4, 8, 12, 16, 20, 24, 32)
- Dark mode support with HSL color tokens
- Hover and active states using elevation overlays (rgba overlays for depth)
- Custom CSS animations for testimonials carousel (30s linear infinite scroll)

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
- Banner.png - Hero section background (warm wood desk scene)
- Diloo-logo.png - Brand logo used in footer
- 8 professional portrait photos (W1, Y1, W2, B1, Y2, B2, W3, I1) used in:
  - StyleShowcase section (8-photo grid)
  - Testimonials section (avatar images)
- Images referenced via Vite's asset resolution (`@assets` alias)

**UI Components & Features**

*Homepage Components:*
- **Navigation**: Fixed top navigation bar with frosted glass effect
  - Semi-transparent white background (70% opacity) + backdrop blur
  - Left: Diloo logo (teal "D" square) + dark brand name
  - Right: Home and Feedback tabs with dynamic active states
  - Active tab: teal text color + 2px teal bottom border
  - Inactive tab: gray text color + hover effect
  - Subtle gray border bottom
- **HeroSection**: Banner.png background with dark gradient overlay, white typography
- **CategoryNav**: 4 style categories + "More Coming Soon" text, unified gray-50 background
- **StyleShowcase**: 8-photo responsive grid (2 cols mobile, 4 cols desktop), 3:4 aspect ratio cards
  - Interactive hover effects: image zoom (110% scale)
  - Bottom overlay (100px) with semi-transparent black background
  - "Create" button appears on hover, navigates to /upload page
  - Smooth transitions using GPU-accelerated transforms
- **HowItWorks**: 3-step process cards with icons and numbered badges
- **WhyChooseUs**: Teal background section with 3 feature highlights
- **Testimonials**: Horizontal auto-scrolling carousel with infinite loop
  - 30-second animation cycle
  - Pause on hover functionality
  - Shows avatar, name, 5-star rating, and comment (no job titles)
  - Duplicated array for seamless loop
- **Footer**: Teal background with logo, brand name, slogan, and copyright

*Upload Page Components:*
- **Upload Layout**: Two-column responsive layout (single column mobile, dual column desktop)
  - Left column: Sample Photo card showing professional portrait in 3:4 aspect ratio
  - Right column: Upload and customization controls
- **Upload Areas**: 
  - Primary upload (required): Teal dashed border, user icon, solid teal button
  - Format support text: "PNG and JPG only"
  - Secondary upload (optional): Teal dashed border, outline user icon, outline teal button
  - Optional label for second upload area
- **Customization Controls**:
  - Background Color selector: 5 color swatches with teal ring selection indicator
  - Coat Material selector: 4 material buttons with gray selected state
  - Coat Color selector: 5 color swatches with teal ring selection indicator
  - Bottom action button: Full-width teal button
- **Back Navigation**: Top-left "Back to Home" link with chevron icon

**Configuration Philosophy**
- Path aliases configured in both `tsconfig.json` and `vite.config.ts` for consistency
- `@/` prefix for client-side code
- `@shared/` prefix for shared schemas/types
- `@assets/` prefix for static assets
- Strict TypeScript configuration with ESM modules throughout