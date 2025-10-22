# Diloo AI Photo Style Transfer Platform - Design Guidelines

## Design Approach
**Reference-Based Approach** inspired by modern AI services (Midjourney, Replicate) combined with professional SaaS aesthetics (Linear, Stripe) to create a warm, trustworthy platform emphasizing human connection through AI-enhanced photography.

## Core Design Principles
1. **Warm & Professional**: Organic textures and teal accents create approachability
2. **Human-Centered**: Real headshots and testimonials build trust
3. **Clear Value Path**: Intuitive flow from understanding to conversion
4. **Visual Excellence**: Photography quality showcases AI capabilities

## Color Palette

### Primary Colors
- **Primary Brand**: 181 70% 48% (Vibrant teal - professional yet friendly)
- **Primary Light**: 181 60% 92% (Soft teal backgrounds)
- **Primary Dark**: 181 75% 35% (Deep teal accents)

### Warm Neutrals & Supporting
- **Warm Beige**: 35 25% 88% (Background sections, warmth)
- **Wood Tone**: 30 15% 75% (Subtle texture references)
- **Success**: 145 65% 45% (Emerald green confirmations)
- **Neutral Dark**: 215 15% 20% (Professional text)
- **Neutral Light**: 35 20% 96% (Soft backgrounds)

### Dark Mode
- Background: 215 20% 10%
- Surface: 215 15% 14%
- Teal Muted: 181 40% 35%
- Text Primary: 0 0% 95%
- Text Secondary: 0 0% 70%

## Typography

**Font Families**:
- Primary: 'Inter' (clean UI, professional)
- Headings: 'Poppins' (distinctive, friendly authority)

**Hierarchy**:
- Hero Headline: text-5xl lg:text-7xl font-bold (Poppins)
- Section Headers: text-3xl lg:text-5xl font-bold (Poppins)
- Card Titles: text-xl lg:text-2xl font-semibold
- Body Text: text-base lg:text-lg
- Captions: text-sm text-gray-600

## Layout System

**Spacing Primitives**: Tailwind units of **4, 8, 12, 16, 20, 24, 32**

**Container Strategy**:
- Max-width: max-w-7xl for content sections
- Hero padding: py-24 lg:py-32
- Section padding: py-16 lg:py-24
- Card gaps: gap-8 lg:gap-12
- Mobile: px-6, Desktop: px-12

**Grid Systems**:
- Headshot grid: grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4
- Process cards: grid-cols-1 md:grid-cols-3 gap-8
- Feature cards: grid-cols-1 md:grid-cols-2 gap-12

## Component Library

### Hero Section
- Height: min-h-[85vh] with warm beige/wood desk background image
- Subtle wood grain texture overlay for depth
- Two-column layout on desktop: Left (60%) text content, Right (40%) visual
- Left: Headline + subheadline + description paragraph + CTA button
- Right: Before/after photo comparison or style transformation showcase
- Background treatment: Gradient overlay from-beige-100/80 to-white/90

### Professional Headshot Grid
- Six-column grid (2 cols mobile, 4 tablet, 6 desktop)
- Square aspect ratio: aspect-square
- Rounded corners: rounded-2xl
- Each image: Professional headshots demonstrating style variety
- Subtle hover effect: hover:scale-105 transition-transform
- Positioned below hero or within "Our Transformations" section
- Grid showcases AI's ability to handle diverse faces/styles

### Step-by-Step Process Cards
- Three-column horizontal layout
- Numbered circular badges: Large numbers (text-4xl) in teal circles
- Card structure: Number badge → Icon (Heroicons, w-16 h-16) → Title → Description
- Background: bg-white with border-2 border-teal-100
- Shadow: shadow-lg hover:shadow-xl
- Icons: photo (choose style), cloud-upload (upload), sparkles (generate)

**Content**:
1. "选择喜欢的风格" - Browse style gallery
2. "上传自己的照片" - Simple upload process
3. "获得专业照片" - Receive transformed images

### Feature Highlights Section
- Full-width teal background: bg-gradient-to-br from-teal-500 to-teal-600
- Two-column alternating layout for 4-6 features
- Each feature: Icon + Headline + Multi-line description
- Text color: text-white
- Icons: Heroicons solid style, w-12 h-12
- Generous spacing: py-24 with feature gap-16

**Features**:
1. "真实自然的效果" - Natural-looking results
2. "专业级AI技术" - Advanced AI algorithms
3. "快速交付" - Quick turnaround time
4. "多种风格选择" - Diverse style options
5. "隐私保护" - Data security guaranteed
6. "专业支持" - Expert customer service

### Testimonial Cards
- Three-column grid (1 col mobile, 2 tablet, 3 desktop)
- Card structure: 5-star rating → Quote text → Avatar + Name + Title
- Background: bg-white with subtle shadow
- Rounded: rounded-xl
- Star icons: text-yellow-400 filled stars
- Avatars: 48px rounded-full with color variety
- Quote marks decoration: Large teal quotation marks

**Sample Testimonials** (6-9 cards):
- Mix professional contexts: "公司HR主管", "自由摄影师", "市场总监"
- Names: "李明", "王芳", "张伟", "刘洋", "陈静", "赵强"
- Focus: Quality, professionalism, transformation accuracy

### Call-to-Action Section
- Full-width with warm beige background
- Centered content: max-w-3xl
- Large headline + supporting text + primary CTA button
- Optional: Small trust indicators (user count, rating)

### Footer
- Teal background: bg-teal-600
- Three-column layout desktop, stacked mobile
- Text: text-white/90

**Columns**:
1. Brand: Logo + "Diloo" + tagline "让每一张照片都成为艺术"
2. Links: 产品、公司、法律 sections with navigation
3. Contact: Email, social icons (WeChat, Weibo placeholders)

## Buttons & CTAs

- Primary: bg-teal-500 hover:bg-teal-600
- Size variants: px-8 py-4 (large), px-6 py-3 (medium)
- Rounded: rounded-full
- Font: font-semibold text-white
- Shadow: shadow-lg hover:shadow-xl
- Transition: transition-all duration-200
- On images: backdrop-blur-md bg-white/20 border-2 border-white/40 text-white

## Images

**Hero Background**: 
- Warm wood desk/workspace scene with soft lighting
- Professional photographer's workspace aesthetic
- Subtle depth with bokeh or soft focus
- Overlay: Light gradient for text readability

**Headshot Grid**:
- 12-18 professional headshot photos
- Diverse ages, genders, expressions
- Consistent lighting and quality
- Mix of style transformations (business, artistic, vintage)

**Before/After Comparisons**:
- Side-by-side or slider format
- High-resolution portraits
- Clear style transformation demonstration
- Place in hero section or dedicated showcase

**Feature Section Icons/Graphics**:
- Use Heroicons consistently
- Supplement with small accent illustrations if desired

## Animations

**Minimal & Purposeful**:
- Card hover: scale-105 with shadow transition
- Button hover: Subtle scale and brightness shift
- Scroll reveals: Gentle fade-in for sections
- No auto-scrolling or distracting motion

## Accessibility

- WCAG AA contrast: Ensure teal text on white, white on teal pass
- Dark mode: Muted teal tones, proper contrast ratios
- Focus indicators: Visible teal outline on interactive elements
- Semantic HTML: Proper heading hierarchy
- Alt text: Descriptive for all transformation examples