# Diloo AI Photo Style Transfer Platform

## Overview
Diloo is an AI-powered photo style transfer platform designed to transform user photos into artistic renditions using professional AI-generated styles. The platform focuses on a visual-first, conversion-oriented user experience, offering three main style categories: Pro Headshot, ID Photo, and Social Avatar Decors. It aims to provide users with unique and high-quality stylized images for various purposes, from professional profiles to social media.

## User Preferences
- Preferred communication style: Simple, everyday language.
- Testing preference: Do not proactively run tests. Always ask for user approval before running tests.

## System Architecture

### UI/UX Decisions
The platform features a custom color palette centered around teal (#25ced1), with Inter for UI text and Poppins for headings. It utilizes Tailwind CSS and shadcn/ui for accessible, utility-first styling, incorporating glassmorphism effects and interactive elements like image zoom and hover overlays. The design is fully responsive.

### Technical Implementations
- **Frontend**: Built with React 18, TypeScript, Vite, and Wouter for routing. State management is handled by TanStack Query for server state and component-level React state for UI.
- **Backend**: Developed using Express.js with TypeScript, providing a RESTful API (`/api` prefix) with centralized error handling and request logging.
- **Core Features**:
    - **Dynamic Style Selection**: Three main categories (Pro Headshot, ID Photo, Social Avatar Decors) with sample images and a persistent selection flow from homepage to upload.
    - **Image Upload**: Functionality with preview and re-selection.
    - **Pro Headshot Customization**: Extensive options including Suit Fabric (5 options), Suit Color (12 swatches), Shirt Color (6 swatches), Neck Tie (7 options), Background (10 options), Composition (2 options), Hand Pose (9 options, conditional), Eye Direction (2 options), and Expression (3 options).
    - **ID Photo Customization**: Configurable by Country/Region and Document Type, with options for Photo Size (6 common sizes + "Other"), DPI (300/600), Background Color (White, Red, Blue), and File Format (JPG/PNG). Includes smart auto-fill and pixel dimension calculation.
    - **Carousel**: Image carousels with auto-slide (2s interval), hover-pause, and reset on style change.
    - **Checkout Process**: Multi-state (Checkout, Processing, Success, Failure) with dynamic photo details display and itemized pricing.
    - **Pricing Models**: Dynamic pricing for Pro Headshot (Base CAD $2.99 + $0.50 per customization option) and fixed pricing for ID Photo (CAD $4.99).
    - **Testimonials**: Infinite-loop, pause-on-hover testimonials carousel.

### System Design Choices
- **Data Storage**: PostgreSQL (via Neon serverless) with Drizzle ORM for type-safe queries. A minimal `users` table is used, and session management is handled by `connect-pg-simple`.
- **Storage Abstraction**: An `IStorage` interface is defined for flexible storage solutions (currently memory-based for development).
- **Pro Headshot Photo Rotation System**: Intelligent system for displaying and rotating 16 professional headshots on the homepage, prioritizing least-shown photos and using smooth slide-up animations.
- **ID Photo Configuration System**: `shared/idPhotoSpecs.ts` provides a comprehensive JSON database for country/document-specific ID photo specifications, enabling accurate auto-filling and validation.

## External Dependencies

### UI & Styling
- `@radix-ui/*`: Accessible component primitives.
- `tailwindcss`: Utility-first CSS framework.
- `class-variance-authority`: Type-safe variant management.
- `clsx`, `tailwind-merge`: Conditional class name utilities.
- `embla-carousel-react`: Carousel component.
- `lucide-react`: Icon library.

### Data & Forms
- `@tanstack/react-query`: Async state management.
- `react-hook-form`: Form state and validation.
- `zod`: Schema validation library.

### Database & ORM
- `@neondatabase/serverless`: Neon PostgreSQL driver.
- `drizzle-orm`, `drizzle-kit`, `drizzle-zod`: ORM and schema tools.

### Development Tools
- `vite`: Frontend build tool.
- `tsx`: TypeScript execution for Node.js.
- `esbuild`: Fast JavaScript bundler.

### Utilities
- `date-fns`: Date manipulation.
- `nanoid`: Unique ID generation.

### Assets
- `Diloo-logo-original.png`, `Diloo-logo-white.png`: Project logos.
- `Banner.png`: Hero section background.
- 16 professional headshot photos: For Pro Headshot showcase.

## Recent Changes

### Pro Headshot Upload Page Major Redesign (October 31, 2025 - Latest)
- **Layout Restructure**: Changed left-right ratio from 1:1 to 2:3 (left smaller, right larger)
  - Grid changed from `lg:grid-cols-2` to `lg:grid-cols-5` with `lg:col-span-2` (left) and `lg:col-span-3` (right)
- **Carousel Upgrade**: Replaced with 16 professional headshot photos (female-01 to 08, male-01 to 08)
  - Pro Headshot (styleId=1) exclusively uses 16 professional photos
  - Other styles retain original 8 sample images
- **Customization Options Overhaul**:
  - **Suit Fabric**: Expanded from 3 to 5 options (+ Silk Blend, Tweed)
  - **Suit Color**: Redesigned with 12 circular image thumbnails in single horizontal row
  - **Shirt Color**: Redesigned with 6 circular image thumbnails
  - **NEW: Neck Tie**: 7 options (None + 6 color thumbnails)
  - **Background**: Redesigned with 10 square image thumbnails
    - Changed from text buttons to visual thumbnails in 5-column grid
    - Square thumbnails (rounded-md) showing gradients and environment photos
  - **Hand Pose**: Expanded from 6 to 9 options
- **Toggle Functionality**: All options support deselect (click selected item → null state)
- **UI Polish**: Removed all "(Optional)" labels, image-only displays with tooltip text
- **Text Option Styling Unification**:
  - Suit Fabric, Composition, Eye Direction, Expression use consistent styling
  - All have default light gray border (border-2 border-gray-300)
  - Unified padding: 16px (p-4) across all text options
  - Auto-width layout: flex flex-wrap allows width to adapt to text length
- **Hover Preview Tooltips** (October 31, 2025 - Latest Update):
  - **Suit Color**: All 12 colors display hover preview with 490px width showing male and female suit versions
  - **Shirt Color**: All 6 colors display hover preview with 490px width showing male and female shirt versions
  - **Neck Tie**: 6 color options display hover preview (300px height) showing full tie appearance; "None" option excluded
  - All tooltips set to `delayDuration={0}` for instant display on hover
  - Preview images include color name labels for user reference
  - Implemented using shadcn Tooltip component with TooltipProvider, TooltipTrigger, and TooltipContent