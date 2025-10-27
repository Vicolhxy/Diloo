import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback, useRef } from "react";

// Import all 16 professional headshot photos
import female01 from "@assets/female-01.png";
import female02 from "@assets/female-02.png";
import female03 from "@assets/female-03.png";
import female04 from "@assets/female-04.png";
import female05 from "@assets/female-05.png";
import female06 from "@assets/female-06.png";
import female07 from "@assets/female-07.png";
import female08 from "@assets/female-08.png";
import male01 from "@assets/male-01.png";
import male02 from "@assets/male-02.png";
import male03 from "@assets/male-03.png";
import male04 from "@assets/male-04.png";
import male05 from "@assets/male-05.png";
import male06 from "@assets/male-06.png";
import male07 from "@assets/male-07.png";
import male08 from "@assets/male-08.png";

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

export default function StyleShowcase() {
  // State for currently displayed 8 photos
  const [displayedPhotos, setDisplayedPhotos] = useState<typeof photoPool>(() => {
    // Randomly select 8 photos from the pool on initial load
    const shuffled = shuffleArray(photoPool);
    return shuffled.slice(0, 8);
  });

  // Track which photos are currently flipping (max 2 at a time)
  const [flippingIndices, setFlippingIndices] = useState<Set<number>>(new Set());
  
  // Track display count for each photo to ensure all 16 get shown
  const displayCountRef = useRef<Map<number, number>>(new Map());
  
  // Initialize display counts
  useEffect(() => {
    displayedPhotos.forEach(photo => {
      const currentCount = displayCountRef.current.get(photo.id) || 0;
      displayCountRef.current.set(photo.id, currentCount + 1);
    });
  }, []);

  // Function to select next photo to display (prefer least-shown photos)
  const selectNextPhoto = useCallback((excludeIds: number[]) => {
    const availablePhotos = photoPool.filter(photo => !excludeIds.includes(photo.id));
    
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

  // Function to flip and replace a photo at a specific index
  const flipAndReplace = useCallback((index: number) => {
    // Don't flip if already flipping or if we've reached max concurrent flips (2)
    if (flippingIndices.has(index) || flippingIndices.size >= 2) {
      return;
    }

    // Get IDs of currently displayed photos
    const currentPhotoIds = displayedPhotos.map(p => p.id);

    // Select next photo (excluding currently displayed ones)
    const nextPhoto = selectNextPhoto(currentPhotoIds);
    if (!nextPhoto) return;

    // Mark this index as flipping
    setFlippingIndices(prev => new Set(prev).add(index));

    // After 250ms (half of 500ms flip duration), replace the photo
    setTimeout(() => {
      setDisplayedPhotos(prev => {
        const newPhotos = [...prev];
        newPhotos[index] = nextPhoto;
        
        // Update display count
        const currentCount = displayCountRef.current.get(nextPhoto.id) || 0;
        displayCountRef.current.set(nextPhoto.id, currentCount + 1);
        
        return newPhotos;
      });
    }, 250);

    // After 500ms (full flip duration), mark as not flipping
    setTimeout(() => {
      setFlippingIndices(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 500);
  }, [displayedPhotos, flippingIndices, selectNextPhoto]);

  // Rotation logic: every 3.5 seconds, flip 1-2 random photos
  useEffect(() => {
    const interval = setInterval(() => {
      // Determine how many photos to flip (1 or 2)
      const numToFlip = Math.random() < 0.5 ? 1 : 2;
      
      // Get indices that are not currently flipping
      const availableIndices = [0, 1, 2, 3, 4, 5, 6, 7].filter(
        i => !flippingIndices.has(i)
      );

      if (availableIndices.length === 0) return;

      // Select random indices to flip
      const shuffledIndices = shuffleArray(availableIndices);
      const indicesToFlip = shuffledIndices.slice(0, Math.min(numToFlip, availableIndices.length));

      // Flip selected photos with slight delay between them for staggered effect
      indicesToFlip.forEach((index, i) => {
        setTimeout(() => {
          flipAndReplace(index);
        }, i * 100); // 100ms delay between flips
      });
    }, 3500); // Run every 3.5 seconds

    return () => clearInterval(interval);
  }, [flippingIndices, flipAndReplace]);

  return (
    <section className="w-full bg-gray-50 pt-3 pb-12 md:pt-4 md:pb-16" data-testid="style-showcase">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {displayedPhotos.map((photo, index) => (
            <div
              key={`${photo.id}-${index}`}
              className="aspect-[3/4] rounded-2xl overflow-hidden shadow-md"
              data-testid={`card-style-${index + 1}`}
              style={{ perspective: '1000px' }}
            >
              <div
                className={`w-full h-full transition-transform duration-500 ${
                  flippingIndices.has(index) ? 'flip-animation' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <img
                  src={photo.image}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  style={{ backfaceVisibility: 'hidden' }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 mt-6">
          <Link href="/upload?style=3">
            <Button 
              size="lg"
              className="bg-primary text-black hover:bg-primary/90"
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
        .flip-animation {
          animation: flipCard 500ms ease-in-out;
        }

        @keyframes flipCard {
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(90deg);
          }
          100% {
            transform: rotateY(0deg);
          }
        }
      `}</style>
    </section>
  );
}
