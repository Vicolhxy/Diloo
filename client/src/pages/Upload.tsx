import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useSearch } from "wouter";
import { User, X, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import StyleTabNav from "@/components/StyleTabNav";
import Footer from "@/components/Footer";
import { idPhotoSpecs, getDocumentTypes, getDocumentSpec, formatDocumentType, photoSizeToString, findPhotoSizeByLabel, findPhotoSizeBySpec } from "../../../shared/idPhotoSpecs";

// Import original sample images for other styles
import w1Img from "@assets/W1_1761159011555.png";
import y1Img from "@assets/Y1_1761159011566.png";
import w2Img from "@assets/W2_1761159011568.png";
import b1Img from "@assets/B1_1761159011569.png";
import y2Img from "@assets/Y2_1761159011570.png";
import b2Img from "@assets/B2_1761159011571.png";
import w3Img from "@assets/W3_1761159011572.png";
import i1Img from "@assets/I1_1761159011573.png";

// Import 16 professional headshot photos for Pro Headshot carousel (optimized)
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

// Import suit color thumbnails
import suitCharcoal from "@assets/Headshot-Customized-SuitColorThumbnail-Charcoal_1761856108986.png";
import suitNavy from "@assets/Headshot-Customized-SuitColorThumbnail-Navy_1761856108976.png";
import suitBlack from "@assets/Headshot-Customized-SuitColorThumbnail-Black_1761856108986.png";
import suitLightGrey from "@assets/Headshot-Customized-SuitColorThumbnail-LightGrey_1761856108988.png";
import suitMidnightBlue from "@assets/Headshot-Customized-SuitColorThumbnail-MidnightBlue_1761856108990.png";
import suitCharcoalBlue from "@assets/Headshot-Customized-SuitColorThumbnail-CharcoalBlue_1761856108987.png";
import suitPinstripeCharcoal from "@assets/Headshot-Customized-SuitColorThumbnail-PinstripeCharcoal_1761856108989.png";
import suitCream from "@assets/Headshot-Customized-SuitColorThumbnail-Cream_1761856108988.png";
import suitSoftBlue from "@assets/Headshot-Customized-SuitColorThumbnail-SoftBlue_1761856108983.png";
import suitLightPink from "@assets/Headshot-Customized-SuitColorThumbnail-LightPink_1761856108989.png";
import suitTaupe from "@assets/Headshot-Customized-SuitColorThumbnail-Taupe_1761856108983.png";
import suitWhite from "@assets/Headshot-Customized-SuitColorThumbnail-White_1761856108990.png";

// Import suit color preview images for hover tooltips
import suitCharcoalPreview from "@assets/Headshot-Customized-Suit-Charcoal_1761923266361.png";
import suitNavyPreview from "@assets/Headshot-Customized-Suit-Navy_1761923266365.png";
import suitBlackPreview from "@assets/Headshot-Customized-Suit-Black_1761923266360.png";
import suitLightGreyPreview from "@assets/Headshot-Customized-Suit-LightGrey_1761923266363.png";
import suitMidnightBluePreview from "@assets/Headshot-Customized-Suit-MidnightBlue_1761923266364.png";
import suitCharcoalBluePreview from "@assets/Headshot-Customized-Suit-CharcoalBlue_1761923266361.png";
import suitPinstripeCharcoalPreview from "@assets/Headshot-Customized-Suit-PinstripeCharcoal_1761923266365.png";
import suitCreamPreview from "@assets/Headshot-Customized-Suit-Cream_1761923266362.png";
import suitSoftBluePreview from "@assets/Headshot-Customized-Suit-SoftBlue_1761923266359.png";
import suitLightPinkPreview from "@assets/Headshot-Customized-Suit-LightPink_1761923266358.png";
import suitTaupePreview from "@assets/Headshot-Customized-Suit-Taupe_1761923266359.png";
import suitWhitePreview from "@assets/Headshot-Customized-Suit-White_1761923266360.png";

// Import shirt color thumbnails
import shirtWhite from "@assets/Headshot-Customized-ShirtColorThumbnail-White_1761856108986.png";
import shirtLightBlue from "@assets/Headshot-Customized-ShirtColorThumbnail-LightBlue_1761856108984.png";
import shirtPaleGrey from "@assets/Headshot-Customized-ShirtColorThumbnail-PaleGrey_1761856108985.png";
import shirtLightPink from "@assets/Headshot-Customized-ShirtColorThumbnail-LightPink_1761856108984.png";
import shirtIvory from "@assets/Headshot-Customized-ShirtColorThumbnail-Ivory_1761856108984.png";
import shirtSoftBeige from "@assets/Headshot-Customized-ShirtColorThumbnail-SoftBeige_1761856108985.png";

// Import shirt color preview images for hover tooltips
import shirtWhitePreview from "@assets/Headshot-Customized-Shirt-White_1761923266357.png";
import shirtLightBluePreview from "@assets/Headshot-Customized-Shirt-LightBlue_1761923266352.png";
import shirtPaleGreyPreview from "@assets/Headshot-Customized-Shirt-PaleGrey_1761923266355.png";
import shirtLightPinkPreview from "@assets/Headshot-Customized-Shirt-LightPink_1761923266354.png";
import shirtIvoryPreview from "@assets/Headshot-Customized-Shirt-Ivory_1761923266347.png";
import shirtSoftBeigePreview from "@assets/Headshot-Customized-Shirt-SoftBeige_1761923266356.png";

// Import tie color thumbnails
import tieNavy from "@assets/Headshot-Customized-TieColorThumbnail-Navy_1761856179158.png";
import tieBurgundy from "@assets/Headshot-Customized-TieColorThumbnail-Burgundy_1761856179160.png";
import tieCharcoal from "@assets/Headshot-Customized-TieColorThumbnail-Charcoal_1761856179159.png";
import tieBlack from "@assets/Headshot-Customized-TieColorThumbnail-Black_1761856179152.png";
import tieSilver from "@assets/Headshot-Customized-TieColorThumbnail-Silver_1761856179159.png";
import tieStriped from "@assets/Headshot-Customized-TieColorThumbnail-Striped_1761856179158.png";

// Import tie preview images for hover tooltips
import tieNavyPreview from "@assets/Headshot-Customized-Tie-Navy_1761922194486.png";
import tieBurgundyPreview from "@assets/Headshot-Customized-Tie-Burgundy_1761922194485.png";
import tieCharcoalPreview from "@assets/Headshot-Customized-Tie-Charcoal_1761922194486.png";
import tieBlackPreview from "@assets/Headshot-Customized-Tie-Black_1761922194468.png";
import tieSilverPreview from "@assets/Headshot-Customized-Tie-Silver_1761922194487.png";
import tieStripedPreview from "@assets/Headshot-Customized-Tie-Striped_1761922194488.png";

// Import background thumbnails
import bgSilverGrey from "@assets/Headshot-Customized-BgColor-SilverGreyGradient_1761878132208.png";
import bgLightBlue from "@assets/Headshot-Customized-BgColor-LightBlueGradient_1761878132238.png";
import bgLightGrey from "@assets/Headshot-Customized-BgColor-LightGreyGradient_1761878132236.png";
import bgLightBeige from "@assets/Headshot-Customized-BgColor-LightBeigeGradient_1761878132234.png";
import bgLightBlueGrey from "@assets/Headshot-Customized-BgColor-LightBlueGreyGradient_1761878132232.png";
import bgLightSilver from "@assets/Headshot-Customized-BgColor-LightSliverGradient_1761878132231.png";
import bgOffice from "@assets/Headshot-Customized-BgColor-Office_1761878132230.png";
import bgConference from "@assets/Headshot-Customized-BgColor-Conference_1761878132229.png";
import bgTreeAvenue from "@assets/Headshot-Customized-BgColor-TreeAvenue_1761878132227.png";
import bgBalcony from "@assets/Headshot-Customized-BgColor-Balcony_1761878132226.png";

// Import ID Photo samples (new 2x resolution)
import idSample01 from "@assets/Sample-ID-01_1762479461886.png";
import idSample02 from "@assets/Sample-ID-02_1762479461890.png";
import idSample03 from "@assets/Sample-ID-03_1762479461893.png";
import idSample04 from "@assets/Sample-ID-04_1762479461893.png";

// All 16 professional headshot photos for Pro Headshot carousel
const proHeadshotImages = [
  female01, female02, female03, female04, female05, female06, female07, female08,
  male01, male02, male03, male04, male05, male06, male07, male08
];

// 4 ID Photo samples for ID Photo carousel
const idPhotoImages = [
  idSample01, idSample02, idSample03, idSample04
];

// Helper function to calculate pixel dimensions from size and DPI
function calculatePixelDimensions(size: string, dpi: string): string {
  if (!size || !dpi) {
    return "Please select Photo Size and DPI first";
  }

  // Parse DPI
  const dpiNumber = parseInt(dpi);
  if (isNaN(dpiNumber) || dpiNumber <= 0) {
    return "Please select Photo Size and DPI first";
  }

  // Try to parse size string (e.g., "35x45 mm", "2x2 inch", "51x51 mm")
  const sizePattern = /(\d+\.?\d*)\s*x\s*(\d+\.?\d*)\s*(mm|inch|cm)/i;
  const match = size.match(sizePattern);

  if (!match) {
    return "Please select Photo Size and DPI first";
  }

  const width = parseFloat(match[1]);
  const height = parseFloat(match[2]);
  const unit = match[3].toLowerCase();

  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    return "Please select Photo Size and DPI first";
  }

  // Convert to inches based on unit
  let widthInches: number;
  let heightInches: number;

  if (unit === "mm") {
    widthInches = width / 25.4;
    heightInches = height / 25.4;
  } else if (unit === "cm") {
    widthInches = width / 2.54;
    heightInches = height / 2.54;
  } else if (unit === "inch") {
    widthInches = width;
    heightInches = height;
  } else {
    return "Please select Photo Size and DPI first";
  }

  // Calculate pixels
  const widthPixels = Math.round(widthInches * dpiNumber);
  const heightPixels = Math.round(heightInches * dpiNumber);

  return `${widthPixels} × ${heightPixels} pixels`;
}

const suitFabrics = [
  { id: "wool", name: "Wool" },
  { id: "wool-blend", name: "Wool Blend" },
  { id: "worsted-wool", name: "Worsted Wool" },
  { id: "silk-blend", name: "Silk Blend" },
  { id: "tweed", name: "Tweed" },
];

const suitColors = [
  { id: "charcoal", name: "Charcoal", image: suitCharcoal, previewImage: suitCharcoalPreview },
  { id: "navy", name: "Navy", image: suitNavy, previewImage: suitNavyPreview },
  { id: "black", name: "Black", image: suitBlack, previewImage: suitBlackPreview },
  { id: "light-grey", name: "Light Grey", image: suitLightGrey, previewImage: suitLightGreyPreview },
  { id: "midnight-blue", name: "Midnight Blue", image: suitMidnightBlue, previewImage: suitMidnightBluePreview },
  { id: "charcoal-blue", name: "Charcoal Blue", image: suitCharcoalBlue, previewImage: suitCharcoalBluePreview },
  { id: "pinstripe-charcoal", name: "Pinstripe Charcoal", image: suitPinstripeCharcoal, previewImage: suitPinstripeCharcoalPreview },
  { id: "cream", name: "Cream", image: suitCream, previewImage: suitCreamPreview },
  { id: "soft-blue", name: "Soft Blue", image: suitSoftBlue, previewImage: suitSoftBluePreview },
  { id: "light-pink", name: "Light Pink", image: suitLightPink, previewImage: suitLightPinkPreview },
  { id: "taupe", name: "Taupe", image: suitTaupe, previewImage: suitTaupePreview },
  { id: "white", name: "White", image: suitWhite, previewImage: suitWhitePreview },
];

const shirtColors = [
  { id: "white", name: "White", image: shirtWhite, previewImage: shirtWhitePreview },
  { id: "light-blue", name: "Light Blue", image: shirtLightBlue, previewImage: shirtLightBluePreview },
  { id: "pale-grey", name: "Pale Grey", image: shirtPaleGrey, previewImage: shirtPaleGreyPreview },
  { id: "light-pink", name: "Light Pink", image: shirtLightPink, previewImage: shirtLightPinkPreview },
  { id: "ivory", name: "Ivory", image: shirtIvory, previewImage: shirtIvoryPreview },
  { id: "soft-beige", name: "Soft Beige", image: shirtSoftBeige, previewImage: shirtSoftBeigePreview },
];

const neckTies = [
  { id: "none", name: "None", image: null, previewImage: null },
  { id: "navy", name: "Navy", image: tieNavy, previewImage: tieNavyPreview },
  { id: "burgundy", name: "Burgundy", image: tieBurgundy, previewImage: tieBurgundyPreview },
  { id: "charcoal", name: "Charcoal", image: tieCharcoal, previewImage: tieCharcoalPreview },
  { id: "black", name: "Black", image: tieBlack, previewImage: tieBlackPreview },
  { id: "silver", name: "Silver", image: tieSilver, previewImage: tieSilverPreview },
  { id: "striped", name: "Striped", image: tieStriped, previewImage: tieStripedPreview },
];

const backgrounds = [
  { id: 1, name: "Silver gray gradient", image: bgSilverGrey },
  { id: 2, name: "Light blue gradient", image: bgLightBlue },
  { id: 3, name: "Light gray gradient", image: bgLightGrey },
  { id: 4, name: "Light beige gradient", image: bgLightBeige },
  { id: 5, name: "Light blue-gray gradient", image: bgLightBlueGrey },
  { id: 6, name: "Light silver gradient", image: bgLightSilver },
  { id: 7, name: "Modern office interior", image: bgOffice },
  { id: 8, name: "Conference room background", image: bgConference },
  { id: 9, name: "Tree-lined street", image: bgTreeAvenue },
  { id: 10, name: "Outdoor terrace or balcony", image: bgBalcony },
];

const compositions = [
  { value: "above-shoulders", label: "Shoulders up" },
  { value: "above-waist-hands-down", label: "Hands naturally down" },
  { value: "above-waist-hands-pockets", label: "Hands in pockets" },
  { value: "above-waist-arms-crossed", label: "Arms crossed" },
  { value: "above-waist-buttoning", label: "Buttoning jacket" },
  { value: "above-waist-hand-chin", label: "One hand touching chin" },
  { value: "above-waist-adjusting-lapel", label: "Adjusting lapel" },
  { value: "above-waist-hands-crossed-front", label: "Hands lightly crossed in front" },
  { value: "above-waist-hand-on-waist", label: "One hand on waist" },
  { value: "above-waist-holding-blazer", label: "Holding blazer edge" },
];

const eyeDirections = [
  { value: "facing-camera", label: "Facing the camera" },
  { value: "slightly-away", label: "Slightly away from camera" },
];

const expressions = [
  { value: "serious", label: "Serious and professional" },
  { value: "natural-smile", label: "Natural smile" },
  { value: "laughing", label: "Gentle laugh" },
];

export default function Upload() {
  const searchString = useSearch();
  const [selectedSuitFabric, setSelectedSuitFabric] = useState<string>("wool");
  const [selectedSuitColor, setSelectedSuitColor] = useState<string>("charcoal");
  const [selectedShirtColor, setSelectedShirtColor] = useState<string>("white");
  const [selectedNeckTie, setSelectedNeckTie] = useState<string>("none");
  const [selectedBackground, setSelectedBackground] = useState<number>(1);
  const [primaryImage, setPrimaryImage] = useState<string | null>(null);
  const [optionalImage, setOptionalImage] = useState<string | null>(null);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  
  // Customization options for Pro Headshot
  const [selectedComposition, setSelectedComposition] = useState<string>("above-shoulders");
  const [selectedEyeDirection, setSelectedEyeDirection] = useState<string>("facing-camera");
  const [selectedExpression, setSelectedExpression] = useState<string>("serious");
  
  // ID Photos customization options - Combined country and document type
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>("Canada:Passport");
  const [customSize, setCustomSize] = useState<string>("");
  const [customDPI, setCustomDPI] = useState<string>("");
  const [customBgColor, setCustomBgColor] = useState<string>("");
  const [customFileFormat, setCustomFileFormat] = useState<string>("");
  
  const primaryInputRef = useRef<HTMLInputElement>(null);
  const optionalInputRef = useRef<HTMLInputElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { styleId } = useMemo(() => {
    const params = new URLSearchParams(searchString);
    const styleId = params.get('style') || "1";
    return {
      styleId,
    };
  }, [searchString]);
  
  // Parse country and document type from combined value
  const { country, docType } = useMemo(() => {
    const [country, docType] = selectedDocumentType.split(':');
    return { country: country || 'Canada', docType: docType || 'Passport' };
  }, [selectedDocumentType]);
  
  // Get current document spec for ID Photos
  const currentDocSpec = useMemo(() => {
    if (styleId !== "2") return null;
    return getDocumentSpec(country, docType);
  }, [styleId, country, docType]);
  
  // Auto-fill specification fields when document spec changes
  useEffect(() => {
    if (styleId === "2") {
      // Check if "Other" country or document type is selected
      const isOther = country === "Other" || docType === "Other" || docType === "Custom";
      
      if (isOther) {
        // Set defaults for "Other" selection
        setCustomSize("");  // Empty, will show "Please select" in dropdown
        setCustomDPI("300");
        setCustomBgColor("White");
        setCustomFileFormat("JPG");
      } else if (currentDocSpec) {
        // Auto-fill from document spec
        if (currentDocSpec.size) {
          // Try to find matching photo size label from common sizes (handles both mm and inch)
          const matchingSize = findPhotoSizeBySpec(currentDocSpec.size);
          setCustomSize(matchingSize ? matchingSize.label : currentDocSpec.size);
        }
        if (currentDocSpec.dpi) setCustomDPI(currentDocSpec.dpi.toString());
        if (currentDocSpec.backgroundColor) setCustomBgColor(currentDocSpec.backgroundColor);
        if (currentDocSpec.fileFormat) setCustomFileFormat(currentDocSpec.fileFormat);
      }
    }
  }, [styleId, currentDocSpec, country, docType]);
  
  // Use professional headshot images for Pro Headshot carousel, ID Photo samples for ID Photo, original images for other styles
  const otherStyleImages = [w1Img, y1Img, w2Img, b1Img, y2Img, b2Img, w3Img, i1Img];
  const styleSampleImages = styleId === "1" ? proHeadshotImages : (styleId === "2" ? idPhotoImages : otherStyleImages);
  
  // Create extended array with first image duplicated at end for seamless loop
  const extendedImages = [...styleSampleImages, styleSampleImages[0]];

  // Reset carousel index when style changes
  useEffect(() => {
    setCurrentCarouselIndex(0);
    setIsTransitioning(true);
  }, [styleId]);

  // Handle seamless loop when reaching the duplicate image
  useEffect(() => {
    if (currentCarouselIndex === styleSampleImages.length) {
      // We're at the duplicate, wait for transition to finish then jump to real first image
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentCarouselIndex(0);
        // Re-enable transition after a brief moment
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500); // Match the transition duration
      
      return () => clearTimeout(timeout);
    }
  }, [currentCarouselIndex, styleSampleImages.length]);

  // Auto-rotate carousel every 2 seconds, pause on hover
  useEffect(() => {
    if (isCarouselHovered) return;
    
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => prev + 1);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isCarouselHovered]);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: (url: string | null) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Navigation />
      <StyleTabNav />
      
      <div className="pt-4 pb-12 px-6 md:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl p-8" data-testid="section-sample-photo">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Sample Photo</h2>
              <div 
                className="relative"
                onMouseEnter={() => setIsCarouselHovered(true)}
                onMouseLeave={() => setIsCarouselHovered(false)}
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
                  <div 
                    ref={carouselRef}
                    className="flex h-full"
                    style={{ 
                      transform: `translateX(-${currentCarouselIndex * 100}%)`,
                      transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none'
                    }}
                  >
                    {extendedImages.map((image, index) => (
                      <img 
                        key={index}
                        src={image} 
                        alt={`Sample photo ${(index % styleSampleImages.length) + 1}`}
                        className="w-full h-full object-cover flex-shrink-0"
                        data-testid={`img-sample-photo-${index}`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Dots indicator */}
                <div className="flex justify-center gap-2 mt-4" data-testid="carousel-dots">
                  {styleSampleImages.map((_: string, index: number) => {
                    const isActive = index === currentCarouselIndex || 
                                    (currentCarouselIndex === styleSampleImages.length && index === 0);
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setIsTransitioning(true);
                          setCurrentCarouselIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          isActive
                            ? 'bg-primary w-6' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        data-testid={`carousel-dot-${index}`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-2xl p-8" data-testid="section-upload">
                <h2 className="text-xl font-semibold mb-6 text-gray-900">Upload Your Photo</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div 
                    className="border-2 border-dashed border-primary rounded-xl overflow-hidden relative group"
                    data-testid="upload-area-primary"
                  >
                    <input
                      ref={primaryInputRef}
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={(e) => handleImageUpload(e, setPrimaryImage)}
                      className="hidden"
                      data-testid="input-file-primary"
                    />
                    
                    {primaryImage ? (
                      <div className="relative aspect-[3/4]">
                        <img 
                          src={primaryImage} 
                          alt="Uploaded primary photo" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-0 left-0 right-0 bg-black/90 p-4 flex items-center justify-center">
                            <button
                              onClick={() => setPrimaryImage(null)}
                              className="text-white hover:text-red-400 transition-colors"
                              data-testid="button-delete-primary"
                              aria-label="Delete primary photo"
                            >
                              <X className="w-6 h-6" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="p-8 flex flex-col items-center justify-center min-h-[280px] cursor-pointer hover:border-primary/70 transition-colors"
                        onClick={() => primaryInputRef.current?.click()}
                      >
                        <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4">
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <Button 
                          className="bg-primary text-black hover:bg-primary/90 mb-2"
                          data-testid="button-upload-primary"
                        >
                          Upload my photo
                        </Button>
                        <p className="text-gray-500 text-sm">PNG and JPG only</p>
                      </div>
                    )}
                  </div>

                  <div 
                    className="border-2 border-dashed border-primary rounded-xl overflow-hidden relative group"
                    data-testid="upload-area-optional"
                  >
                    <input
                      ref={optionalInputRef}
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={(e) => handleImageUpload(e, setOptionalImage)}
                      className="hidden"
                      data-testid="input-file-optional"
                    />
                    
                    {optionalImage ? (
                      <div className="relative aspect-[3/4]">
                        <img 
                          src={optionalImage} 
                          alt="Uploaded optional photo" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-0 left-0 right-0 bg-black/90 p-4 flex items-center justify-center">
                            <button
                              onClick={() => setOptionalImage(null)}
                              className="text-white hover:text-red-400 transition-colors"
                              data-testid="button-delete-optional"
                              aria-label="Delete optional photo"
                            >
                              <X className="w-6 h-6" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="p-8 flex flex-col items-center justify-center min-h-[280px] cursor-pointer hover:border-primary/70 transition-colors"
                        onClick={() => optionalInputRef.current?.click()}
                      >
                        <div className="w-16 h-16 border-2 border-primary rounded-lg flex items-center justify-center mb-4">
                          <User className="w-8 h-8 text-primary" />
                        </div>
                        <Button 
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary/10 mb-2"
                          data-testid="button-upload-optional"
                        >
                          Upload my photo
                        </Button>
                        <p className="text-gray-500 text-sm">Optional</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8" data-testid="section-customize">
                <div className="flex items-center justify-between gap-3 mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Customize Your Photo</h2>
                  <Badge 
                    className="bg-primary/20 text-gray-900 dark:text-white dark:bg-primary/30 text-sm font-medium flex items-center gap-1.5"
                    data-testid="badge-free-tip"
                  >
                    <Lightbulb className="w-4 h-4" />
                    {styleId === "2" 
                      ? "All options included in package price" 
                      : "First option in each category is free"
                    }
                  </Badge>
                </div>
                
                {/* Conditional rendering based on style */}
                {styleId === "2" ? (
                  /* ID Photos Form */
                  <div className="space-y-6">
                    {/* Document Type Selection - Grouped by Country */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3">
                        Document Type
                      </label>
                      <Select value={selectedDocumentType} onValueChange={setSelectedDocumentType}>
                        <SelectTrigger className="w-full" data-testid="select-document-type">
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(idPhotoSpecs.countries).map((countryKey) => {
                            // Country flag emojis
                            const countryFlags: Record<string, string> = {
                              'Canada': '🇨🇦',
                              'USA': '🇺🇸',
                              'China': '🇨🇳',
                              'EU': '🇪🇺',
                              'Japan': '🇯🇵',
                              'Other': '🌐'
                            };
                            const flag = countryFlags[countryKey] || '🌐';
                            
                            return (
                              <SelectGroup key={countryKey}>
                                <SelectLabel>{flag} {idPhotoSpecs.countries[countryKey].name}</SelectLabel>
                                {getDocumentTypes(countryKey).map((docType: string) => (
                                  <SelectItem 
                                    key={`${countryKey}:${docType}`} 
                                    value={`${countryKey}:${docType}`}
                                    className="pl-12"
                                  >
                                    {idPhotoSpecs.countries[countryKey].name} - {formatDocumentType(docType)}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Specifications */}
                    <div className="space-y-6">
                      {/* Photo Size - Button Options */}
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">
                          Photo Size
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {idPhotoSpecs.common.commonPhotoSizes.map((size) => (
                            <Button
                              key={size.label}
                              variant="outline"
                              onClick={() => setCustomSize(size.label)}
                              className={
                                customSize === size.label
                                  ? "bg-primary text-black hover:bg-primary/90 border-2 border-primary py-2 px-4"
                                  : "border-2 border-gray-300 text-gray-700 hover:bg-gray-100 py-2 px-4"
                              }
                              data-testid={`photo-size-${size.label.replace(/\s+/g, '-').toLowerCase()}`}
                            >
                              {size.label}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* DPI - Button Options */}
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">
                          DPI
                        </label>
                        <div className="flex flex-wrap gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setCustomDPI("300")}
                            className={
                              customDPI === "300"
                                ? "bg-primary text-black hover:bg-primary/90 border-2 border-primary py-2 px-4"
                                : "border-2 border-gray-300 text-gray-700 hover:bg-gray-100 py-2 px-4"
                            }
                            data-testid="dpi-300"
                          >
                            300
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setCustomDPI("600")}
                            className={
                              customDPI === "600"
                                ? "bg-primary text-black hover:bg-primary/90 border-2 border-primary py-2 px-4"
                                : "border-2 border-gray-300 text-gray-700 hover:bg-gray-100 py-2 px-4"
                            }
                            data-testid="dpi-600"
                          >
                            600
                          </Button>
                        </div>
                      </div>

                      {/* Background - Square Color Blocks */}
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">
                          Background
                        </label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setCustomBgColor("White")}
                            className={`w-12 h-12 rounded-md transition-all ring-2 ring-inset p-0.5 ${
                              customBgColor === "White"
                                ? "ring-4 ring-primary"
                                : "ring-gray-300 hover:ring-4 hover:ring-primary"
                            }`}
                            data-testid="bg-white"
                            title="White"
                          >
                            <div className="w-full h-full rounded-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e5e7eb' }}></div>
                          </button>
                          <button
                            onClick={() => setCustomBgColor("Blue")}
                            className={`w-12 h-12 rounded-md transition-all ring-2 ring-inset p-0.5 ${
                              customBgColor === "Blue"
                                ? "ring-4 ring-primary"
                                : "ring-gray-300 hover:ring-4 hover:ring-primary"
                            }`}
                            data-testid="bg-blue"
                            title="Blue"
                          >
                            <div className="w-full h-full rounded-sm" style={{ backgroundColor: '#438EDB' }}></div>
                          </button>
                          <button
                            onClick={() => setCustomBgColor("Red")}
                            className={`w-12 h-12 rounded-md transition-all ring-2 ring-inset p-0.5 ${
                              customBgColor === "Red"
                                ? "ring-4 ring-primary"
                                : "ring-gray-300 hover:ring-4 hover:ring-primary"
                            }`}
                            data-testid="bg-red"
                            title="Red"
                          >
                            <div className="w-full h-full rounded-sm" style={{ backgroundColor: '#FF0000' }}></div>
                          </button>
                        </div>
                      </div>

                      {/* File Format - Button Options */}
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">
                          File Format
                        </label>
                        <div className="flex flex-wrap gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setCustomFileFormat("JPG")}
                            className={
                              customFileFormat === "JPG"
                                ? "bg-primary text-black hover:bg-primary/90 border-2 border-primary py-2 px-4"
                                : "border-2 border-gray-300 text-gray-700 hover:bg-gray-100 py-2 px-4"
                            }
                            data-testid="format-jpg"
                          >
                            JPG
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setCustomFileFormat("PNG")}
                            className={
                              customFileFormat === "PNG"
                                ? "bg-primary text-black hover:bg-primary/90 border-2 border-primary py-2 px-4"
                                : "border-2 border-gray-300 text-gray-700 hover:bg-gray-100 py-2 px-4"
                            }
                            data-testid="format-png"
                          >
                            PNG
                          </Button>
                        </div>
                      </div>

                      {/* Calculated Pixel Dimensions - Read-only */}
                      <div className="pt-2 border-t border-gray-200">
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          Pixel Dimensions
                        </label>
                        <span className="text-sm font-medium text-gray-900" data-testid="text-pixel-dimensions">
                          {(() => {
                            // Convert label to size string for calculation
                            const photoSize = findPhotoSizeByLabel(customSize);
                            const sizeString = photoSize ? photoSizeToString(photoSize) : customSize;
                            return calculatePixelDimensions(sizeString, customDPI);
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Pro Headshot Form */
                  <div className="space-y-6">
                  {/* Suit Fabric */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Suit Fabric
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {suitFabrics.map((fabric) => (
                        <Button
                          key={fabric.id}
                          variant="outline"
                          onClick={() => setSelectedSuitFabric(fabric.id)}
                          className={
                            selectedSuitFabric === fabric.id
                              ? "bg-primary text-black hover:bg-primary/90 border-2 border-primary py-2 px-4"
                              : "border-2 border-gray-300 text-gray-700 hover:bg-gray-100 py-2 px-4"
                          }
                          data-testid={`suit-fabric-${fabric.id}`}
                        >
                          {fabric.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Suit Color - Image thumbnails only, 12 in one row */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Suit Color
                    </label>
                    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
                      <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2">
                        {suitColors.map((color) => {
                          const colorButton = (
                            <button
                              onClick={() => setSelectedSuitColor(color.id)}
                              className={`flex-shrink-0 rounded-full transition-all ring-2 ring-inset p-0.5 ${
                                selectedSuitColor === color.id
                                  ? "ring-4 ring-primary"
                                  : "ring-gray-300 hover:ring-4 hover:ring-primary"
                              }`}
                              data-testid={`suit-color-${color.id}`}
                              title={color.previewImage ? undefined : color.name}
                            >
                              <img 
                                src={color.image} 
                                alt={color.name}
                                className="w-11 h-11 rounded-full"
                              />
                            </button>
                          );

                          return (
                            <Tooltip key={color.id}>
                              <TooltipTrigger asChild>
                                {colorButton}
                              </TooltipTrigger>
                              <TooltipContent side="top" className="p-2 bg-white border-2 border-gray-200 shadow-lg w-[490px]">
                                <div className="text-center">
                                  <p className="text-sm font-semibold mb-2 text-gray-900">{color.name}</p>
                                  <img 
                                    src={color.previewImage} 
                                    alt={`${color.name} preview`}
                                    className="w-full h-auto object-contain"
                                  />
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    </TooltipProvider>
                  </div>

                  {/* Shirt Color - Image thumbnails only */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Shirt Color
                    </label>
                    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
                      <div className="flex gap-2">
                        {shirtColors.map((color) => {
                          const colorButton = (
                            <button
                              onClick={() => setSelectedShirtColor(color.id)}
                              className={`flex-shrink-0 rounded-full transition-all ring-2 ring-inset p-0.5 ${
                                selectedShirtColor === color.id
                                  ? "ring-4 ring-primary"
                                  : "ring-gray-300 hover:ring-4 hover:ring-primary"
                              }`}
                              data-testid={`shirt-color-${color.id}`}
                              title={color.previewImage ? undefined : color.name}
                            >
                              <img 
                                src={color.image} 
                                alt={color.name}
                                className="w-11 h-11 rounded-full"
                              />
                            </button>
                          );

                          return (
                            <Tooltip key={color.id}>
                              <TooltipTrigger asChild>
                                {colorButton}
                              </TooltipTrigger>
                              <TooltipContent side="top" className="p-2 bg-white border-2 border-gray-200 shadow-lg w-[490px]">
                                <div className="text-center">
                                  <p className="text-sm font-semibold mb-2 text-gray-900">{color.name}</p>
                                  <img 
                                    src={color.previewImage} 
                                    alt={`${color.name} preview`}
                                    className="w-full h-auto object-contain"
                                  />
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    </TooltipProvider>
                  </div>

                  {/* Neck Tie - Image thumbnails, None option + 6 colors */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Neck Tie
                    </label>
                    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
                      <div className="flex gap-2">
                        {neckTies.map((tie) => {
                          const tieButton = (
                            <button
                              onClick={() => setSelectedNeckTie(tie.id)}
                              className={`flex-shrink-0 rounded-full transition-all ring-2 ring-inset p-0.5 ${
                                selectedNeckTie === tie.id
                                  ? "ring-4 ring-primary"
                                  : "ring-gray-300 hover:ring-4 hover:ring-primary"
                              }`}
                              data-testid={`neck-tie-${tie.id}`}
                              title={tie.previewImage ? undefined : tie.name}
                            >
                              {tie.image ? (
                                <img 
                                  src={tie.image} 
                                  alt={tie.name}
                                  className="w-11 h-11 rounded-full"
                                />
                              ) : (
                                <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-600">
                                  None
                                </div>
                              )}
                            </button>
                          );

                          // If the tie has a preview image, wrap it with Tooltip
                          if (tie.previewImage) {
                            return (
                              <Tooltip key={tie.id}>
                                <TooltipTrigger asChild>
                                  {tieButton}
                                </TooltipTrigger>
                                <TooltipContent side="top" className="p-2 bg-white border-2 border-gray-200 shadow-lg">
                                  <div className="text-center">
                                    <p className="text-sm font-semibold mb-2 text-gray-900">{tie.name}</p>
                                    <img 
                                      src={tie.previewImage} 
                                      alt={`${tie.name} preview`}
                                      className="h-[300px] w-auto object-contain"
                                    />
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            );
                          }

                          // For "None" option, just return the button
                          return <div key={tie.id}>{tieButton}</div>;
                        })}
                      </div>
                    </TooltipProvider>
                  </div>

                  {/* Background - Square image thumbnails */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Background
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {backgrounds.map((bg) => (
                        <button
                          key={bg.id}
                          onClick={() => setSelectedBackground(bg.id)}
                          className={`flex-shrink-0 rounded-md transition-all ring-2 ring-inset p-0.5 ${
                            selectedBackground === bg.id
                              ? "ring-4 ring-primary"
                              : "ring-gray-300 hover:ring-4 hover:ring-primary"
                          }`}
                          data-testid={`background-${bg.id}`}
                          title={bg.name}
                        >
                          <img 
                            src={bg.image} 
                            alt={bg.name}
                            className="w-full h-[60px] object-cover rounded-sm"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Composition */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Composition
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {compositions.map((comp) => (
                        <Button
                          key={comp.value}
                          variant="outline"
                          onClick={() => setSelectedComposition(comp.value)}
                          className={
                            selectedComposition === comp.value
                              ? "bg-primary text-black hover:bg-primary/90 border-2 border-primary py-2 px-4"
                              : "border-2 border-gray-300 text-gray-700 hover:bg-gray-100 py-2 px-4"
                          }
                          data-testid={`composition-${comp.value}`}
                        >
                          {comp.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Eye Direction */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Eye Direction
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {eyeDirections.map((eye) => (
                        <Button
                          key={eye.value}
                          variant="outline"
                          onClick={() => setSelectedEyeDirection(eye.value)}
                          className={
                            selectedEyeDirection === eye.value
                              ? "bg-primary text-black hover:bg-primary/90 border-2 border-primary py-2 px-4"
                              : "border-2 border-gray-300 text-gray-700 hover:bg-gray-100 py-2 px-4"
                          }
                          data-testid={`eye-direction-${eye.value}`}
                        >
                          {eye.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Expression */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Expression
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {expressions.map((expr) => (
                        <Button
                          key={expr.value}
                          variant="outline"
                          onClick={() => setSelectedExpression(expr.value)}
                          className={
                            selectedExpression === expr.value
                              ? "bg-primary text-black hover:bg-primary/90 border-2 border-primary py-2 px-4"
                              : "border-2 border-gray-300 text-gray-700 hover:bg-gray-100 py-2 px-4"
                          }
                          data-testid={`expression-${expr.value}`}
                        >
                          {expr.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                )}
              </div>

              <div className="bg-white rounded-2xl p-8" data-testid="section-cta">
                {(primaryImage || optionalImage) ? (
                  <Link href={
                    styleId === "2" 
                      ? `/checkout?style=${styleId}&documentType=${encodeURIComponent(selectedDocumentType)}&size=${encodeURIComponent(currentDocSpec?.size || customSize)}&dpi=${currentDocSpec?.dpi || customDPI}&backgroundColor=${encodeURIComponent(currentDocSpec?.backgroundColor || customBgColor)}&fileFormat=${currentDocSpec?.fileFormat || customFileFormat}`
                      : `/checkout?style=${styleId}${selectedSuitFabric ? `&suitFabric=${selectedSuitFabric}` : ''}${selectedSuitColor ? `&suitColor=${selectedSuitColor}` : ''}${selectedShirtColor ? `&shirtColor=${selectedShirtColor}` : ''}${selectedNeckTie ? `&neckTie=${selectedNeckTie}` : ''}${selectedBackground ? `&background=${selectedBackground}` : ''}${selectedComposition ? `&composition=${selectedComposition}` : ''}${selectedEyeDirection ? `&eyeDirection=${selectedEyeDirection}` : ''}${selectedExpression ? `&expression=${selectedExpression}` : ''}`
                  }>
                    <Button 
                      className="w-full bg-primary text-black hover:bg-primary/90 h-12 text-base font-normal"
                      data-testid="button-create-now"
                    >
                      Create Now
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    disabled
                    className="w-full bg-gray-300 text-gray-500 h-12 text-base cursor-not-allowed font-normal"
                    data-testid="button-create-now"
                  >
                    Create Now
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
