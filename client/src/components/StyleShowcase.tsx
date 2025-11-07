import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback, useRef } from "react";

// Import all 16 professional headshot photos (optimized)
import female01 from "@assets/Sample-headshot-female-01_1762008889169.png";
import female02 from "@assets/Sample-headshot-female-02_1762008889166.png";
import female03 from "@assets/Sample-headshot-female-03_1762008889165.png";
import female04 from "@assets/Sample-headshot-female-04_1762008889163.png";
import female05 from "@assets/Sample-headshot-female-05_1762008889156.png";
import female06 from "@assets/Sample-headshot-female-06_1762008889158.png";
import female07 from "@assets/Sample-headshot-female-07_1762008889153.png";
import female08 from "@assets/Sample-headshot-female-08_1762008889154.png";
import male01 from "@assets/Sample-headshot-male-01_1762008889170.png";
import male02 from "@assets/Sample-headshot-male-02_1762008889168.png";
import male03 from "@assets/Sample-headshot-male-03_1762008889168.png";
import male04 from "@assets/Sample-headshot-male-04_1762008889165.png";
import male05 from "@assets/Sample-headshot-male-05_1762008889162.png";
import male06 from "@assets/Sample-headshot-male-06_1762008889159.png";
import male07 from "@assets/Sample-headshot-male-07_1762008889155.png";
import male08 from "@assets/Sample-headshot-male-08_1762008889149.png";

// Import ID Photo samples (new 2x resolution)
import idSample01 from "@assets/Sample-ID-01_1762479461886.png";
import idSample02 from "@assets/Sample-ID-02_1762479461890.png";
import idSample03 from "@assets/Sample-ID-03_1762479461893.png";
import idSample04 from "@assets/Sample-ID-04_1762479461893.png";

// Define the photo pool with all 16 photos
const photoPool = [
  { id: 1, image: female01, alt: "Professional female headshot 1", gender: "female" },
  { id: 2, image: female02, alt: "Professional female headshot 2", gender: "female" },
  { id: 3, image: female03, alt: "Professional female headshot 3", gender: "female" },
  { id: 4, image: female04, alt: "Professional female headshot 4", gender: "female" },
  { id: 5, image: female05, alt: "Professional female headshot 5", gender: "female" },
  { id: 6, image: female06, alt: "Professional female headshot 6", gender: "female" },
  { id: 7, image: female07, alt: "Professional female headshot 7", gender: "female" },
  { id: 8, image: female08, alt: "Professional female headshot 8", gender: "female" },
  { id: 9, image: male01, alt: "Professional male headshot 1", gender: "male" },
  { id: 10, image: male02, alt: "Professional male headshot 2", gender: "male" },
  { id: 11, image: male03, alt: "Professional male headshot 3", gender: "male" },
  { id: 12, image: male04, alt: "Professional male headshot 4", gender: "male" },
  { id: 13, image: male05, alt: "Professional male headshot 5", gender: "male" },
  { id: 14, image: male06, alt: "Professional male headshot 6", gender: "male" },
  { id: 15, image: male07, alt: "Professional male headshot 7", gender: "male" },
  { id: 16, image: male08, alt: "Professional male headshot 8", gender: "male" },
];

type Photo = typeof photoPool[0];

// Define ID Photo card data (4 samples)
const idPhotoCards = [
  {
    id: 1,
    documentType: "Passport",
    countryEmoji: "🇺🇸",
    sampleImage: idSample01,
    alt: "ID Photo Sample - Passport"
  },
  {
    id: 2,
    documentType: "Visa",
    countryEmoji: "🇨🇦",
    sampleImage: idSample02,
    alt: "ID Photo Sample - Visa"
  },
  {
    id: 3,
    documentType: "Driver's License",
    countryEmoji: "🇪🇺",
    sampleImage: idSample03,
    alt: "ID Photo Sample - Driver's License"
  },
  {
    id: 4,
    documentType: "ID Card",
    countryEmoji: "🇨🇳",
    sampleImage: idSample04,
    alt: "ID Photo Sample - ID Card"
  }
];

// Helper function to shuffle array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Helper function to get random element from array
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

interface StyleShowcaseProps {
  activeCategory: string;
}

// Map category ID to style ID
const categoryToStyleMap: Record<string, string> = {
  "pro-headshot": "1",
  "id-photo": "2",
  "social-avatar": "3",
};

export default function StyleShowcase({ activeCategory }: StyleShowcaseProps) {
  // State for currently displayed 8 photos
  const [displayedPhotos, setDisplayedPhotos] = useState<typeof photoPool>(() => {
    // Randomly select 8 photos from the pool on initial load
    const shuffled = shuffleArray(photoPool);
    return shuffled.slice(0, 8);
  });

  // Track next photos for each position during animation (sparse array)
  const [nextPhotos, setNextPhotos] = useState<(Photo | null)[]>(Array(8).fill(null));

  // Track which photos are currently animating (max 2 at a time)
  const [animatingIndices, setAnimatingIndices] = useState<Set<number>>(new Set());
  
  // Track display count for each photo to ensure all 16 get shown
  const displayCountRef = useRef<Map<number, number>>(new Map());
  
  // Track pending replacements to prevent duplicates during concurrent animations
  const pendingReplacementsRef = useRef<Map<number, number>>(new Map()); // index -> photoId
  
  // Initialize display counts
  useEffect(() => {
    displayedPhotos.forEach(photo => {
      const currentCount = displayCountRef.current.get(photo.id) || 0;
      displayCountRef.current.set(photo.id, currentCount + 1);
    });
  }, []);

  // Function to select next photo ensuring no duplicates
  const selectNextPhotoSafe = useCallback((currentDisplayed: typeof photoPool) => {
    // Get IDs of currently displayed photos
    const displayedIds = new Set(currentDisplayed.map(p => p.id));
    
    // Get IDs of photos that are pending replacement
    const pendingIds = new Set(Array.from(pendingReplacementsRef.current.values()));
    
    // Exclude both displayed and pending photos
    const excludedIds = new Set([...Array.from(displayedIds), ...Array.from(pendingIds)]);
    const availablePhotos = photoPool.filter(photo => !excludedIds.has(photo.id));
    
    if (availablePhotos.length === 0) return null;

    // Get photos with minimum display count
    const displayCounts = availablePhotos.map(photo => ({
      photo,
      count: displayCountRef.current.get(photo.id) || 0,
    }));

    const minCount = Math.min(...displayCounts.map(dc => dc.count));
    const leastShownPhotos = displayCounts
      .filter(dc => dc.count === minCount)
      .map(dc => dc.photo);

    return getRandomElement(leastShownPhotos);
  }, []);

  // Function to slide and replace a photo at a specific index
  const slideAndReplace = useCallback((index: number) => {
    // Don't animate if already animating or if we've reached max concurrent animations (2)
    if (animatingIndices.has(index) || animatingIndices.size >= 2) {
      return;
    }

    // Select next photo using current displayed photos
    const nextPhoto = selectNextPhotoSafe(displayedPhotos);
    if (!nextPhoto) return;

    // Mark this photo as pending to prevent duplicate selection
    pendingReplacementsRef.current.set(index, nextPhoto.id);

    // Set the next photo for this position (triggers slide-up animation)
    setNextPhotos(prev => {
      const updated = [...prev];
      updated[index] = nextPhoto;
      return updated;
    });

    // Mark this index as animating
    setAnimatingIndices(prev => new Set(prev).add(index));

    // After 500ms (full animation duration), replace the current photo and cleanup
    setTimeout(() => {
      setDisplayedPhotos(prev => {
        const newPhotos = [...prev];
        newPhotos[index] = nextPhoto;
        
        // Update display count
        const currentCount = displayCountRef.current.get(nextPhoto.id) || 0;
        displayCountRef.current.set(nextPhoto.id, currentCount + 1);
        
        return newPhotos;
      });
      
      // Clear the next photo
      setNextPhotos(prev => {
        const updated = [...prev];
        updated[index] = null;
        return updated;
      });
      
      // Remove from animating and pending
      setAnimatingIndices(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
      
      pendingReplacementsRef.current.delete(index);
    }, 500);
  }, [displayedPhotos, animatingIndices, selectNextPhotoSafe]);

  // Rotation logic: every 3.5 seconds, slide 1-2 random photos
  useEffect(() => {
    const interval = setInterval(() => {
      // Determine how many photos to slide (1 or 2)
      const numToSlide = Math.random() < 0.5 ? 1 : 2;
      
      // Get indices that are not currently animating
      const availableIndices = [0, 1, 2, 3, 4, 5, 6, 7].filter(
        i => !animatingIndices.has(i)
      );

      if (availableIndices.length === 0) return;

      // Select random indices to slide
      const shuffledIndices = shuffleArray(availableIndices);
      const indicesToSlide = shuffledIndices.slice(0, Math.min(numToSlide, availableIndices.length));

      // Slide selected photos with slight delay between them for staggered effect
      indicesToSlide.forEach((index, i) => {
        setTimeout(() => {
          slideAndReplace(index);
        }, i * 100); // 100ms delay between slides
      });
    }, 3500); // Run every 3.5 seconds

    return () => clearInterval(interval);
  }, [animatingIndices, slideAndReplace]);

  return (
    <section className="w-full bg-gray-50 pt-3 pb-12 md:pt-4 md:pb-16" data-testid="style-showcase">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Conditional rendering based on activeCategory */}
        {activeCategory === "id-photo" ? (
          // ID Photo: 1 row x 3 columns grid layout (378px x 274px per card)
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            {idPhotoCards.map((card) => (
              <div
                key={card.id}
                className="relative rounded-2xl overflow-hidden shadow-md w-full"
                style={{
                  height: '274px',
                  backgroundImage: `url(${idSampleBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
                data-testid={`card-id-photo-${card.id}`}
              >
                <div className="absolute inset-0 flex items-start justify-between" style={{ padding: '24px' }}>
                  {/* Left side: Document type and country emoji */}
                  <div className="flex flex-col" style={{ paddingTop: '8px', maxWidth: 'calc(100% - 24px - 226px - 24px)' }}>
                    <p 
                      className="font-bold text-gray-900 leading-tight break-words"
                      style={{ fontFamily: 'Hanuman, serif', fontSize: '16px' }}
                      data-testid={`text-document-type-${card.id}`}
                    >
                      {card.documentType}
                    </p>
                    <p 
                      className="leading-none"
                      style={{ fontSize: '32px', marginTop: '12px' }}
                      data-testid={`text-country-emoji-${card.id}`}
                    >
                      {card.countryEmoji}
                    </p>
                  </div>
                  
                  {/* Right side: Sample photo */}
                  <div className="flex-shrink-0">
                    <img
                      src={card.sampleImage}
                      alt={card.alt}
                      className="w-auto object-cover rounded-lg"
                      style={{ height: '226px' }}
                      data-testid={`img-sample-${card.id}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Pro Headshot & Social Avatar: Original carousel layout
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {displayedPhotos.map((photo, index) => (
              <div
                key={`${photo.id}-${index}`}
                className="aspect-[3/4] rounded-2xl overflow-hidden shadow-md relative"
                data-testid={`card-style-${index + 1}`}
              >
                {/* Current photo */}
                <img
                  src={photo.image}
                  alt={photo.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Next photo (slides up from bottom) */}
                {nextPhotos[index] && (
                  <img
                    src={nextPhotos[index]!.image}
                    alt={nextPhotos[index]!.alt}
                    className="absolute inset-0 w-full h-full object-cover slide-up-animation"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Common CTA section for all categories */}
        <div className="flex flex-col items-center gap-3 mt-6">
          <Link href={`/upload?style=${categoryToStyleMap[activeCategory] || "1"}`}>
            <Button 
              className="bg-primary text-black hover:bg-primary/90 font-normal w-[480px] h-12"
              data-testid="button-showcase-create-now"
            >
              Create Now
            </Button>
          </Link>
          <p className="text-sm text-gray-600 text-center max-w-md" data-testid="text-payment-notice">
            You'll see the generated results first, then decide whether to download with payment. Feel free to try it out!
          </p>
        </div>
      </div>

      <style>{`
        .slide-up-animation {
          animation: slideUp 500ms ease-out forwards;
        }

        @keyframes slideUp {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
