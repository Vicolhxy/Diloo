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
    - Customization options: Suit Fabric, Suit Color (with swatches), Shirt Color (with swatches), Background, Composition, Hand Pose (conditional), Eye Direction, Expression (8 total options).
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
- **Images**: Banner.png (hero background), 16 professional headshot photos (8 female, 8 male) for Pro Headshot showcase rotation system.

## Recent Changes

### Pro Headshot Photo Rotation System (October 27, 2025)
- **Complete redesign** of homepage Pro Headshot showcase with intelligent photo rotation:
  - **Photo Pool**: 16 professional headshots (8 female: female-01.png to female-08.png, 8 male: male-01.png to male-08.png)
  - **Initial Display**: Randomly selects 8 photos from pool of 16 using Fisher-Yates shuffle algorithm
  - **3D Flip Animation**: CSS-based rotateY transform with 500ms duration and perspective depth effect
  - **Smart Rotation Logic**:
    - Timer triggers every 3.5 seconds
    - Randomly selects 1-2 photos to flip and replace
    - Staggered timing (100ms delay) when flipping 2 photos simultaneously
  - **Concurrency Control**: Maximum 2 photos flip simultaneously using Set-based tracking
  - **Duplicate Prevention**: `pendingReplacementsRef` Map tracks photos selected for replacement to prevent duplicate selection during concurrent flips
  - **Fair Distribution**: `displayCountRef` Map tracks display count for each photo, prioritizes least-shown photos in selection algorithm
  - **Complete Flip Flow**: Flip to 90deg → Replace image at midpoint (250ms) → Flip back to 0deg (500ms total)

### Technical Implementation Details (Photo Rotation)
- **State Management**:
  - `displayedPhotos`: Current 8 photos being shown
  - `flippingIndices`: Set of indices currently animating
  - `displayCountRef`: Ref-based Map tracking how many times each photo has been displayed
  - `pendingReplacementsRef`: Ref-based Map preventing duplicate selection during concurrent flips
- **Selection Algorithm**: Filters available photos by excluding currently displayed AND pending photos, then selects from photos with minimum display count
- **Animation**: Inline CSS keyframe animation for smooth 3D flip effect without layout shift
- **Performance**: Uses refs for tracking to avoid unnecessary re-renders, cleanup timers prevent memory leaks

### Professional Headshot Customization Schema (October 26, 2025)

### Professional Headshot Customization Schema (Latest)
- **Complete refactor** of customization options to focus on professional headshot generation:
  - **Suit Fabric**: Wool, Wool Blend, Worsted Wool (text-based selection)
  - **Suit Color**: 7 options with color swatches (Charcoal, Navy, Black, Light Gray, Midnight Blue, Charcoal Blue, Pinstripe Charcoal)
  - **Shirt Color**: 3 options with color swatches (White, Light Blue, Pale Gray)
  - **Background**: 10 options text-based (6 gradients + 4 blurred environments like modern office, conference room, tree-lined street, outdoor terrace)
  - **Composition**: Above shoulders / Above waist (optional)
  - **Hand Pose**: 6 options (Hands naturally down, Hands in pockets, Arms crossed, Buttoning jacket, One hand touching chin, Adjusting lapel) - only visible when "Above waist" composition is selected
  - **Eye Direction**: Facing the camera / Slightly away from camera (optional)
  - **Expression**: Serious and professional / Natural smile / Laughing (slight motion) (optional)

### Technical Implementation
- **Upload Page**: Color swatches for Suit Color and Shirt Color (8×8 color boxes with names), text-based UI for Suit Fabric and Background options
- **Conditional Logic**: Hand Pose field only appears when "Above waist" composition is selected; selecting "Above shoulders" hides and clears Hand Pose
- **URL Parameters**: Updated from old schema (bgColor, material, coatColor, pose) to new schema (suitFabric, suitColor, shirtColor, background, composition, handPose, eyeDirection, expression)
- **Checkout Page**: Updated Photo Details and pricing breakdown to use new parameter names and labels
- **Pricing**: Total of 8 customization options (4 required + 4 optional), each adds CAD $0.50 to base price of CAD $2.99
- **UI Consistency**: All buttons use font-normal (removed font-bold throughout application)

### Navigation & Style Selection (October 24)
- Updated StyleTabNav to use 4 category names matching homepage tabs: "Pro Headshot", "B&W Portrait", "ID Photos", "Social Avatar Decors"
- Reorganized sample images: 2 images per category instead of 8 individual styles
- Category selection persists from homepage to upload page via URL parameters

### Upload Page Enhancements (October 24)
- **Carousel Animation**: Implemented left-sliding animation using translateX with 500ms transition
  - Auto-advances every 2 seconds
  - Pauses on mouse hover (controlled by `isCarouselHovered` state)
  - Resets to first image when style changes

### Checkout Page Improvements (October 24)
- **Dynamic Photo Details**: Only displays customization options user actually selected
  - Always displays Resolution (2048 × 2732 pixels)
- **Itemized Pricing**:
  - Base Photo: CAD $2.99
  - Customizations: Individual line items with delete buttons
  - Displays breakdown with total calculation
  - Shows "Limited Offer" badge