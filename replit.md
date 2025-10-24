# Diloo AI Photo Style Transfer Platform

## Overview
Diloo is an AI-powered photo style transfer platform that enables users to transform their photos into artistic renditions using professional AI-generated styles. The platform offers 4 main style categories (Pro Headshot, B&W Portrait, ID Photos, Social Avatar Decors), each with 2 sample images. It is built as a full-stack web application with a modern React frontend and Express backend, focusing on a visual-first, conversion-oriented user experience.

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
    - Dynamic style selection flow with 4 main categories matching between homepage and upload page.
    - Image upload functionality with preview and re-selection options.
    - Customization options: Background Color, Coat Material, Coat Color, Composition, Pose, Eye Direction, Expression (7 total options).
    - Carousel with left-sliding animation (2s interval), hover-pause functionality, and automatic reset on style change.
    - Multi-state checkout process (Checkout, Processing, Success, Failure) with dynamic Photo Details display and itemized pricing.
    - Testimonials carousel with infinite loop and pause-on-hover.
    - Dynamic pricing: Base CAD $2.99 + $0.50 per customization option selected.
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
- **Images**: Banner.png (hero background), 8 professional portrait photos organized into 4 style categories (2 images per category).

## Recent Changes (October 24, 2025)

### Navigation & Style Selection
- Updated StyleTabNav to use 4 category names matching homepage tabs: "Pro Headshot", "B&W Portrait", "ID Photos", "Social Avatar Decors"
- Reorganized sample images: 2 images per category instead of 8 individual styles
- Category selection persists from homepage to upload page via URL parameters

### Upload Page Enhancements
- **Carousel Animation**: Implemented left-sliding animation using translateX with 500ms transition
  - Auto-advances every 2 seconds
  - Pauses on mouse hover (controlled by `isCarouselHovered` state)
  - Resets to first image when style changes
- **Customize Section Styling**:
  - Made all 7 option labels bold (Background Color, Coat Material, Coat Color, Composition, Pose, Eye Direction, Expression)
  - Changed Coat Material selected state from gray to primary color (#25ced1)
  - Added border-2 styling to Composition, Pose, Eye Direction, and Expression option buttons

### Checkout Page Improvements
- **Dynamic Photo Details**: Only displays customization options user actually selected
  - Shows Background Color, Coat Material, Coat Color only if non-default
  - Shows Composition, Pose, Eye Direction, Expression only if selected
  - Always displays Resolution (2048 × 2732 pixels)
- **Itemized Pricing**:
  - Base Photo: CAD $2.99
  - Customizations: Count × $0.50 (counts all 7 possible options)
  - Displays breakdown with total calculation
  - Shows "Limited Offer" badge