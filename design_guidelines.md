# Diloo AI Photo Style Transfer Platform - Design Guidelines

## Design Approach
**Reference-Based Approach** inspired by modern AI services (Midjourney, Replicate) combined with e-commerce aesthetics (Shopify, Etsy) to create a visually striking platform that showcases photo transformation capabilities while maintaining professional credibility.

## Core Design Principles
1. **Visual-First**: Photography and transformations are the hero - let images breathe
2. **Trust & Professionalism**: Clean, modern design that conveys AI expertise
3. **Smooth & Delightful**: Subtle animations enhance but never distract
4. **Conversion-Focused**: Clear flow from discovery to action

## Color Palette

### Primary Colors
- **Primary Brand**: 280 65% 55% (Rich purple - AI/creative tech association)
- **Primary Light**: 280 70% 92% (Soft purple backgrounds)
- **Primary Dark**: 280 70% 35% (Deep purple accents)

### Accent & Supporting
- **Accent**: 200 90% 50% (Vibrant cyan - contrasts beautifully with purple)
- **Success**: 145 65% 45% (Emerald green for confirmations)
- **Neutral Dark**: 240 10% 15% (Rich charcoal for text)
- **Neutral Light**: 240 5% 96% (Subtle backgrounds)

### Dark Mode
- Background: 240 15% 8%
- Surface: 240 12% 12%
- Text Primary: 0 0% 95%
- Text Secondary: 0 0% 70%

## Typography

**Font Families**:
- Primary: 'Inter' (Google Fonts) - Clean, modern sans-serif for UI
- Headings: 'Poppins' (Google Fonts) - Friendly, distinctive for headlines

**Scale**:
- Hero Headline: text-6xl lg:text-7xl, font-bold (Poppins)
- Section Headers: text-4xl lg:text-5xl, font-bold (Poppins)
- Card Titles: text-xl lg:text-2xl, font-semibold
- Body Text: text-base lg:text-lg
- Captions: text-sm

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 8, 12, 16, 20, 24, 32**

**Container Strategy**:
- Max-width: max-w-7xl for main content
- Section padding: py-20 lg:py-32
- Card spacing: gap-8 lg:gap-12
- Mobile padding: px-6, Desktop: px-8

**Grid Systems**:
- Three-column cards: grid-cols-1 md:grid-cols-3 gap-8
- Testimonials: Horizontal scroll with snap points

## Component Library

### Hero Section
- Full-viewport height (min-h-screen) with gradient overlay
- Large hero image showcasing style transformations
- Centered headline + subheadline + CTA button
- Gradient background: from-purple-900 via-purple-700 to-indigo-800

### Style Showcase Cards
- Grid layout with hover scale effects (hover:scale-105)
- Rounded corners: rounded-2xl
- Subtle shadow: shadow-lg hover:shadow-2xl
- Image aspect ratio: aspect-[4/3] or aspect-square
- Overlay gradient on hover to show style name

### How It Works Section
- Three horizontal cards with icons
- Card structure: Icon (top) → Title → Description
- Icons: Use Heroicons (outline style, size: w-12 h-12)
- Card background: bg-white/5 with backdrop-blur-sm in dark mode
- Numbered steps (1, 2, 3) in circular badges

**Content**:
1. "选择喜欢的风格" - Icon: photo/image icon
2. "上传自己的照片" - Icon: upload/cloud-upload icon  
3. "生成风格化照片" - Icon: sparkles/stars icon

### Why Choose Us Section
- Three horizontal cards with icons
- Similar card styling to How It Works
- Icons: Use Heroicons (solid style for emphasis)
- Subtle border: border border-purple-500/20

**Content**:
1. "真实自然" - Icon: check-badge / shield-check
2. "专业团队" - Icon: users-group / academic-cap
3. "快速生成" - Icon: bolt / rocket-launch

### What Our Users Say Section
- Horizontally scrolling container with auto-scroll animation
- Individual testimonial cards: w-80 flex-shrink-0
- Card components:
  - Random avatar (40x40, rounded-full)
  - User name (font-semibold)
  - 5-star rating (use star icons, text-yellow-400)
  - Review text (text-sm, text-gray-300)
- Infinite scroll with CSS animation (20-30s duration)
- Duplicate testimonials for seamless loop

**Sample Testimonials** (8-10 cards):
- Generic positive reviews about quality, speed, results
- Mix of Chinese names: "李明", "王芳", "张伟", "刘洋", "陈静"

### Footer
- Two-column layout on desktop, stacked on mobile
- Background: bg-purple-900 or primary brand color
- Text color: text-white/90

**Left Column**:
- Logo placeholder (h-12 w-12 bg-white/20 rounded)
- "Diloo" (text-2xl font-bold)
- Slogan: "让每一张照片都成为艺术" (text-sm text-white/70)

**Right Column** - Links in columns:
- Column 1: "产品" (选择风格, 上传照片, 价格)
- Column 2: "公司" (About Us, Contact Us, 隐私政策)
- Column 3: Social icons (placeholder)

### Buttons & CTAs
- Primary CTA: bg-gradient-to-r from-purple-600 to-indigo-600
- Size: px-8 py-4 text-lg font-semibold
- Rounded: rounded-full
- Hover: hover:shadow-xl hover:scale-105
- Outlined variant on images: backdrop-blur-md bg-white/10 border-2 border-white/30

## Images

**Hero Section**: 
- Large background image showcasing before/after style transformation
- Image should be high-quality, demonstrate the AI capability
- Suggested: Split-screen or side-by-side comparison of original vs styled photo
- Apply gradient overlay for text readability

**Style Showcase Grid**:
- 6-9 style example cards with representative photos
- Each shows a different artistic style (watercolor, oil painting, sketch, vintage, etc.)
- Images should be vibrant and eye-catching

## Animations

**Use Sparingly**:
- Card hover: Subtle scale (scale-105) and shadow transitions
- Testimonial scroll: Smooth infinite horizontal scroll
- Button hover: Gentle scale and glow effect
- Page sections: Fade-in on scroll (intersection observer)

**No animations for**:
- Text typing effects
- Excessive parallax
- Distracting particle effects

## Accessibility
- Maintain WCAG AA contrast ratios
- Dark mode optimized for comfortable viewing
- Focus states on all interactive elements
- Semantic HTML structure
- Alt text for all images