# Diloo AI Photo Style Transfer Platform

## Overview
Diloo is an AI-powered photo style transfer platform that enables users to transform their photos into artistic renditions using professional AI-generated styles. The platform offers 3 main style categories (Pro Headshot, ID Photo, Social Avatar Decors), each with 2 sample images. It is built as a full-stack web application with a modern React frontend and Express backend, focusing on a visual-first, conversion-oriented user experience.

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
    - Dynamic style selection flow with 3 main categories matching between homepage and upload page: Pro Headshot (styleId=1), ID Photo (styleId=2), Social Avatar Decors (styleId=3).
    - Image upload functionality with preview and re-selection options.
    - **Pro Headshot Customization**: Suit Fabric, Suit Color (with swatches), Shirt Color (with swatches), Background, Composition, Hand Pose (conditional), Eye Direction, Expression (8 total options).
    - **ID Photo Customization**: Country/Region, Document Type, Photo Size, DPI, Background Color, File Format (all editable with auto-fill defaults), Pixel Dimensions (calculated).
    - Carousel with left-sliding animation (2s interval), hover-pause functionality, and automatic reset on style change.
    - Multi-state checkout process (Checkout, Processing, Success, Failure) with dynamic Photo Details display and itemized pricing.
    - Testimonials carousel with infinite loop and pause-on-hover.
    - **Pricing Models**: Pro Headshot uses dynamic pricing (Base CAD $2.99 + $0.50 per customization option); ID Photo uses fixed CAD $4.99.
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

### ID Photo UI Improvements (October 27, 2025 - Latest)
- **Enhanced form controls** for better UX with proper UI components:
  - **Photo Size**: Select dropdown with 6 common sizes
    - Format: "50x70 mm / 1.97x2.76 in" (both mm and inch units displayed)
    - Options: 35x45mm, 50x70mm, 33x48mm, 51x51mm, 2x2in, 30x24mm
    - Shows "Please select" placeholder when empty (e.g., for "Other" country/document)
  - **DPI**: Radio buttons with 300 and 600 options
  - **Background**: Radio buttons with color preview blocks
    - Options: White (#FFFFFF), Red (#FF0000), Blue (#0000FF)
    - Each option shows color swatch + name
  - **File Format**: Radio buttons with JPG and PNG options
  - **Smart Auto-fill System**:
    - Uses `findPhotoSizeBySpec()` helper to match specs regardless of unit (mm or inch)
    - Converts all sizes to mm with 0.1mm tolerance for accurate matching
    - Handles USA's "2x2 inch" matching to "2x2 in / 50.8x50.8 mm" dropdown option
  - **"Other" Country/Document Defaults**:
    - Photo Size: empty (shows "Please select")
    - DPI: 300
    - Background: White
    - File Format: JPG

### ID Photo Category Implementation (October 27, 2025)
- **Complete ID Photo workflow** (styleId = "2", formerly "B&W Portrait") with country/document-specific specifications:
  - **Configuration System**: Created `shared/idPhotoSpecs.ts` with comprehensive JSON database
    - 6 countries/regions: Canada, USA, China, EU, Japan, Other
    - Multiple document types per country: Passport, Driver License, Visa, PR Card, ID Card, Custom
    - Each document type has predefined specs: size, DPI, background color, file format
    - "Other" option allows full custom specification entry
    - Common photo sizes with PhotoSize interface (widthMm, heightMm, label)
    - Background colors with hex values for color preview display
  - **Upload Page (styleId = "2")**:
    - Two-level selection: Country/Region → Document Type (cascading dropdown)
    - Form fields use proper UI components (Select, RadioGroup with Labels)
    - Auto-fill mechanism with unit-aware matching (handles both mm and inch)
    - **Pixel Dimensions Calculation**: Real-time calculation based on Size and DPI, displays "Please select Photo Size and DPI first" when incomplete
    - Conditional rendering: ID Photo form replaces Pro Headshot customization options
  - **Checkout Page**:
    - Photo Details section displays all user-selected ID photo specifications
    - Shows calculated Pixel Dimensions (read-only, computed from size and DPI)
    - Fixed pricing model: CAD $4.99 (no itemization, no customization add-ons)
    - Price Breakdown shows single line: "ID Photo Service: CAD $4.99"
  - **URL Parameters**: country, documentType, size (as label), dpi, backgroundColor, fileFormat
  - **Helper Functions**: photoSizeToString(), findPhotoSizeByLabel(), findPhotoSizeBySpec() for robust size handling
  - **Category Structure**: Platform now has 3 categories instead of 4 (Pro Headshot, ID Photo, Social Avatar Decors)

### Pro Headshot Photo Rotation System (October 27, 2025)
- **Complete redesign** of homepage Pro Headshot showcase with intelligent photo rotation:
  - **Photo Pool**: 16 professional headshots (8 female: female-01.png to female-08.png, 8 male: male-01.png to male-08.png)
  - **Initial Display**: Randomly selects 8 photos from pool of 16 using Fisher-Yates shuffle algorithm
  - **Slide-Up Animation**: CSS-based translateY slide from bottom with ease-out timing, 500ms duration for "fast in, slow out" effect
  - **Smart Rotation Logic**:
    - Timer triggers every 3.5 seconds
    - Randomly selects 1-2 photos to slide and replace
    - Staggered timing (100ms delay) when sliding 2 photos simultaneously
  - **Concurrency Control**: Maximum 2 photos animate simultaneously using Set-based tracking
  - **Duplicate Prevention**: `pendingReplacementsRef` Map tracks photos selected for replacement to prevent duplicate selection during concurrent animations
  - **Fair Distribution**: `displayCountRef` Map tracks display count for each photo, prioritizes least-shown photos in selection algorithm
  - **Complete Animation Flow**: New photo slides from bottom (translateY(100%)) to top (translateY(0)) over 500ms → State updated with new photo

### Technical Implementation Details (Photo Rotation)
- **State Management**:
  - `displayedPhotos`: Current 8 photos being shown
  - `nextPhotos`: Sparse array tracking photos currently sliding in during animation
  - `animatingIndices`: Set of indices currently animating
  - `displayCountRef`: Ref-based Map tracking how many times each photo has been displayed
  - `pendingReplacementsRef`: Ref-based Map preventing duplicate selection during concurrent animations
- **Selection Algorithm**: Filters available photos by excluding currently displayed AND pending photos, then selects from photos with minimum display count
- **Animation**: CSS keyframe animation with translateY from 100% to 0%, ease-out timing for smooth slide-up effect
- **DOM Structure**: Absolute positioning with overflow-hidden prevents layout shifts during animation
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