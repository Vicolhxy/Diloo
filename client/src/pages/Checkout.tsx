import { useState, useMemo, useEffect } from "react";
import { Link, useSearch, useLocation } from "wouter";
import { ChevronLeft, CheckCircle2, XCircle, Loader2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import idPhotoSpecs, { photoSizeToString, findPhotoSizeByLabel } from "@shared/idPhotoSpecs";
import w1Img from "@assets/W1_1761159011555.png";
import y1Img from "@assets/Y1_1761159011566.png";
import w2Img from "@assets/W2_1761159011568.png";
import b1Img from "@assets/B1_1761159011569.png";
import y2Img from "@assets/Y2_1761159011570.png";
import b2Img from "@assets/B2_1761159011571.png";
import w3Img from "@assets/W3_1761159011572.png";
import i1Img from "@assets/I1_1761159011573.png";

const styleImages = {
  "1": w1Img,
  "2": y1Img,
  "3": w2Img,
  "4": b1Img,
  "5": y2Img,
  "6": b2Img,
  "7": w3Img,
  "8": i1Img,
};

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

// Default values for Pro Headshot customization options
const DEFAULT_SUIT_FABRIC = "wool";
const DEFAULT_SUIT_COLOR = "charcoal";
const DEFAULT_SHIRT_COLOR = "white";
const DEFAULT_NECK_TIE = "none";
const DEFAULT_BACKGROUND = 1;
const DEFAULT_COMPOSITION = "above-shoulders";
const DEFAULT_EYE_DIRECTION = "facing-camera";
const DEFAULT_EXPRESSION = "serious";

// Pricing configuration for Pro Headshot options (non-default selections)
const OPTION_PRICES = {
  suitFabric: 0.50,
  suitColor: 0.80,    // Premium pricing for suit color
  shirtColor: 0.80,   // Premium pricing for shirt color
  neckTie: 0.80,      // Premium pricing for neck tie
  background: 0.50,
  composition: 0.50,
  eyeDirection: 0.50,
  expression: 0.50,
} as const;

// GlowingLoader Component - Fancy gradient glow animation
function GlowingLoader() {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Outer glow ring - largest */}
      <motion.div
        className="absolute w-32 h-32 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(37, 206, 209, 0.3) 0%, rgba(37, 206, 209, 0.1) 50%, transparent 70%)",
          filter: "blur(8px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Middle glow ring */}
      <motion.div
        className="absolute w-24 h-24 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(37, 206, 209, 0.5) 0%, rgba(37, 206, 209, 0.2) 60%, transparent 80%)",
          filter: "blur(6px)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />
      
      {/* Inner glow ring */}
      <motion.div
        className="absolute w-16 h-16 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(37, 206, 209, 0.7) 0%, rgba(37, 206, 209, 0.3) 70%, transparent 90%)",
          filter: "blur(4px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
      />
      
      {/* Core light ball - solid center with gradient */}
      <motion.div
        className="absolute w-12 h-12 rounded-full"
        style={{
          background: "linear-gradient(135deg, #25ced1 0%, #1ab3b6 50%, #0f8c8e 100%)",
          boxShadow: "0 0 20px rgba(37, 206, 209, 0.8), 0 0 40px rgba(37, 206, 209, 0.4)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 20px rgba(37, 206, 209, 0.8), 0 0 40px rgba(37, 206, 209, 0.4)",
            "0 0 30px rgba(37, 206, 209, 1), 0 0 60px rgba(37, 206, 209, 0.6)",
            "0 0 20px rgba(37, 206, 209, 0.8), 0 0 40px rgba(37, 206, 209, 0.4)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Sparkle particles */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white"
          style={{
            top: "50%",
            left: "50%",
            filter: "blur(1px)",
          }}
          animate={{
            x: [0, Math.cos((i * Math.PI) / 2) * 40, 0],
            y: [0, Math.sin((i * Math.PI) / 2) * 40, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

const suitFabrics = [
  { id: "wool", name: "Wool" },
  { id: "wool-blend", name: "Wool Blend" },
  { id: "worsted-wool", name: "Worsted Wool" },
  { id: "silk-blend", name: "Silk Blend" },
  { id: "tweed", name: "Tweed" },
];

const suitColors = [
  { id: "charcoal", name: "Charcoal" },
  { id: "navy", name: "Navy" },
  { id: "black", name: "Black" },
  { id: "light-grey", name: "Light Grey" },
  { id: "midnight-blue", name: "Midnight Blue" },
  { id: "charcoal-blue", name: "Charcoal Blue" },
  { id: "pinstripe-charcoal", name: "Pinstripe Charcoal" },
  { id: "cream", name: "Cream" },
  { id: "soft-blue", name: "Soft Blue" },
  { id: "light-pink", name: "Light Pink" },
  { id: "taupe", name: "Taupe" },
  { id: "white", name: "White" },
];

const shirtColors = [
  { id: "white", name: "White" },
  { id: "light-blue", name: "Light Blue" },
  { id: "pale-grey", name: "Pale Grey" },
  { id: "light-pink", name: "Light Pink" },
  { id: "ivory", name: "Ivory" },
  { id: "soft-beige", name: "Soft Beige" },
];

const neckTies = [
  { id: "none", name: "None" },
  { id: "navy", name: "Navy" },
  { id: "burgundy", name: "Burgundy" },
  { id: "charcoal", name: "Charcoal" },
  { id: "black", name: "Black" },
  { id: "silver", name: "Silver" },
  { id: "striped", name: "Striped" },
];

const backgrounds = [
  { id: 1, name: "Silver gray gradient" },
  { id: 2, name: "Light blue gradient" },
  { id: 3, name: "Light gray gradient" },
  { id: 4, name: "Light beige gradient" },
  { id: 5, name: "Light blue-gray gradient" },
  { id: 6, name: "Light silver gradient" },
  { id: 7, name: "Modern office interior (glass, white walls, plants, blurred)" },
  { id: 8, name: "Conference room background (blurred)" },
  { id: 9, name: "Tree-lined street (blurred)" },
  { id: 10, name: "Outdoor terrace or balcony (blurred)" },
];

// Labels for customization options
const compositionLabels: Record<string, string> = {
  "above-shoulders": "Shoulders up",
  "above-waist-hands-down": "Hands naturally down",
  "above-waist-hands-pockets": "Hands in pockets",
  "above-waist-arms-crossed": "Arms crossed",
  "above-waist-buttoning": "Buttoning jacket",
  "above-waist-hand-chin": "One hand touching chin",
  "above-waist-adjusting-lapel": "Adjusting lapel",
  "above-waist-hands-crossed-front": "Hands lightly crossed in front",
  "above-waist-hand-on-waist": "One hand on waist",
  "above-waist-holding-blazer": "Holding blazer edge",
};

const eyeDirectionLabels: Record<string, string> = {
  "facing-camera": "Facing the camera",
  "slightly-away": "Slightly away from camera",
};

const expressionLabels: Record<string, string> = {
  "serious": "Serious and professional",
  "natural-smile": "Natural smile",
  "laughing": "Laughing (slight motion)",
};

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

type PageState = 'checkout' | 'processing' | 'success' | 'failure';

export default function Checkout() {
  const searchString = useSearch();
  const [, setLocation] = useLocation();
  const [pageState, setPageState] = useState<PageState>('checkout');
  const [userEmail, setUserEmail] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(true);

  // Auto-scroll to top when entering checkout page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Simulate photo generation loading (3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPhotoLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const {
    suitFabric,
    suitColor,
    shirtColor,
    neckTie,
    background,
    styleId,
    selectedStyleImage,
    composition,
    eyeDirection,
    expression,
    // ID Photos params
    country,
    documentType,
    size,
    dpi,
    backgroundColor,
    fileFormat
  } = useMemo(() => {
    const params = new URLSearchParams(searchString);
    const styleId = params.get('style') || "3";
    
    // Parse documentType (format: "Country:DocumentType")
    const documentTypeParam = params.get('documentType') || '';
    const [countryPart, docTypePart] = documentTypeParam.split(':');
    
    return {
      // Pro Headshot params
      suitFabric: params.get('suitFabric') || DEFAULT_SUIT_FABRIC,
      suitColor: params.get('suitColor') || DEFAULT_SUIT_COLOR,
      shirtColor: params.get('shirtColor') || DEFAULT_SHIRT_COLOR,
      neckTie: params.get('neckTie') || DEFAULT_NECK_TIE,
      background: parseInt(params.get('background') || String(DEFAULT_BACKGROUND)),
      styleId,
      selectedStyleImage: styleImages[styleId as keyof typeof styleImages] || w2Img,
      composition: params.get('composition') || DEFAULT_COMPOSITION,
      eyeDirection: params.get('eyeDirection') || DEFAULT_EYE_DIRECTION,
      expression: params.get('expression') || DEFAULT_EXPRESSION,
      // ID Photos params
      country: countryPart || '',
      documentType: docTypePart || '',
      size: params.get('size') || '',
      dpi: params.get('dpi') || '',
      backgroundColor: params.get('backgroundColor') || '',
      fileFormat: params.get('fileFormat') || '',
    };
  }, [searchString]);

  const selectedSuitFabric = suitFabrics.find(f => f.id === suitFabric) || suitFabrics[0];
  const selectedSuitColor = suitColors.find(c => c.id === suitColor) || suitColors[0];
  const selectedShirtColor = shirtColors.find(c => c.id === shirtColor) || shirtColors[0];
  const selectedNeckTie = neckTies.find(t => t.id === neckTie) || neckTies[0];
  const selectedBackground = backgrounds.find(b => b.id === background) || backgrounds[0];

  // Calculate price based on style type
  let totalPrice: number;
  
  if (styleId === "2") {
    // ID Photos: Fixed price CAD $4.99
    totalPrice = 4.99;
  } else {
    // Pro Headshot: Dynamic pricing - "Free First Option" strategy
    // Base price: CAD $2.99
    // Non-default options add their configured price (CAD $0.50 or CAD $0.80)
    // Default options are FREE
    const basePrice = 2.99;
    
    let customizationCost = 0;
    if (suitFabric !== DEFAULT_SUIT_FABRIC) customizationCost += OPTION_PRICES.suitFabric;
    if (suitColor !== DEFAULT_SUIT_COLOR) customizationCost += OPTION_PRICES.suitColor;
    if (shirtColor !== DEFAULT_SHIRT_COLOR) customizationCost += OPTION_PRICES.shirtColor;
    if (neckTie !== DEFAULT_NECK_TIE) customizationCost += OPTION_PRICES.neckTie;
    if (background !== DEFAULT_BACKGROUND) customizationCost += OPTION_PRICES.background;
    if (composition !== DEFAULT_COMPOSITION) customizationCost += OPTION_PRICES.composition;
    if (eyeDirection !== DEFAULT_EYE_DIRECTION) customizationCost += OPTION_PRICES.eyeDirection;
    if (expression !== DEFAULT_EXPRESSION) customizationCost += OPTION_PRICES.expression;
    
    totalPrice = basePrice + customizationCost;
  }

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: emailInput,
    },
    values: {
      email: emailInput,
    },
  });

  const onSubmit = (data: EmailFormData) => {
    setUserEmail(data.email);
    setEmailInput(data.email);
    setPageState('processing');
    // In real implementation, this would redirect to Stripe payment page
    console.log("Proceeding to payment with email:", data.email);
  };

  const handleSuccess = () => {
    setPageState('success');
  };

  const handleFailure = () => {
    setPageState('failure');
  };

  const handleBackToCheckout = () => {
    setPageState('checkout');
  };

  // Checkout Initial State
  if (pageState === 'checkout') {
    return (
      <div className="min-h-screen w-full bg-gray-50">
        <Navigation />
        
        <div className="pt-12 pb-12 px-6 md:px-12">
          <div className="container mx-auto max-w-7xl">
            <Link href="/upload" data-testid="link-back-upload">
              <div className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 cursor-pointer w-fit">
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Upload</span>
              </div>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Generated Photo */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8" data-testid="section-photo-preview">
                  <h2 className="text-xl font-semibold mb-6 text-gray-900">Your Generated Photo</h2>
                  
                  {/* Photo with Improved Watermark */}
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
                    {isPhotoLoading ? (
                      /* Loading State */
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <GlowingLoader />
                        <p className="text-sm text-gray-600 mt-4">Generating your photo...</p>
                      </div>
                    ) : (
                      <>
                        {/* Actual Generated Photo */}
                        <img 
                          src={selectedStyleImage} 
                          alt="Generated AI Photo Preview" 
                          className="w-full h-full object-cover"
                          data-testid="img-generated-photo"
                        />
                        
                        {/* Improved Diagonal Watermark Matrix - Less Dense, Better Coverage */}
                        <div className="absolute inset-0 pointer-events-none">
                          {Array.from({ length: 12 }).map((_, i) => {
                            const row = Math.floor(i / 3);
                            const col = i % 3;
                            return (
                              <div
                                key={i}
                                className="absolute text-white text-5xl font-bold opacity-20 select-none whitespace-nowrap"
                                style={{
                                  top: `${row * 25}%`,
                                  left: `${col * 33}%`,
                                  transform: 'rotate(-45deg)',
                                }}
                              >
                                Diloo
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side - Parameters, Email, Price, Payment */}
              <div className="space-y-6">
                {/* Parameters */}
                <div className="bg-white rounded-2xl p-8" data-testid="section-parameters">
                  <h2 className="text-xl font-semibold mb-6 text-gray-900">Photo Details</h2>
                  
                  <div className="space-y-3">
                    {styleId === "2" ? (
                      /* ID Photos Details */
                      <>
                        <div className="flex items-center justify-between py-2 border-b border-gray-200">
                          <span className="text-sm text-gray-600">Country/Region</span>
                          <span className="text-sm font-medium text-gray-900">
                            {country && idPhotoSpecs.countries[country] ? idPhotoSpecs.countries[country].name : country}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between py-2 border-b border-gray-200">
                          <span className="text-sm text-gray-600">Document Type</span>
                          <span className="text-sm font-medium text-gray-900">
                            {documentType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between py-2 border-b border-gray-200">
                          <span className="text-sm text-gray-600">Photo Size</span>
                          <span className="text-sm font-medium text-gray-900">{size}</span>
                        </div>
                        
                        <div className="flex items-center justify-between py-2 border-b border-gray-200">
                          <span className="text-sm text-gray-600">Resolution (DPI)</span>
                          <span className="text-sm font-medium text-gray-900">{dpi} DPI</span>
                        </div>
                        
                        <div className="flex items-center justify-between py-2 border-b border-gray-200">
                          <span className="text-sm text-gray-600">Background Color</span>
                          <span className="text-sm font-medium text-gray-900">{backgroundColor}</span>
                        </div>
                        
                        <div className="flex items-center justify-between py-2 border-b border-gray-200">
                          <span className="text-sm text-gray-600">File Format</span>
                          <span className="text-sm font-medium text-gray-900">{fileFormat.toUpperCase()}</span>
                        </div>
                        
                        <div className="flex items-center justify-between py-2 border-b border-gray-200">
                          <span className="text-sm text-gray-600">Pixel Dimensions</span>
                          <span className="text-sm font-medium text-gray-900" data-testid="text-pixel-dimensions">
                            {(() => {
                              // Convert label to size string for calculation
                              const photoSize = findPhotoSizeByLabel(size);
                              const sizeString = photoSize ? photoSizeToString(photoSize) : size;
                              return calculatePixelDimensions(sizeString, dpi);
                            })()}
                          </span>
                        </div>
                      </>
                    ) : (
                      /* Pro Headshot Details */
                      <>
                        {/* Always show required options */}
                        <div className="flex items-center justify-between py-2 border-b border-gray-200">
                          <span className="text-sm text-gray-600">Suit Fabric</span>
                          <span className="text-sm font-medium text-gray-900">{selectedSuitFabric.name}</span>
                        </div>
                        
                        <div className="flex items-center justify-between py-2 border-b border-gray-200">
                          <span className="text-sm text-gray-600">Suit Color</span>
                          <span className="text-sm font-medium text-gray-900">{selectedSuitColor.name}</span>
                        </div>
                        
                        <div className="flex items-center justify-between py-2 border-b border-gray-200">
                          <span className="text-sm text-gray-600">Shirt Color</span>
                          <span className="text-sm font-medium text-gray-900">{selectedShirtColor.name}</span>
                        </div>
                        
                        <div className="flex items-center justify-between py-2 border-b border-gray-200">
                          <span className="text-sm text-gray-600">Background</span>
                          <span className="text-sm font-medium text-gray-900">{selectedBackground.name}</span>
                        </div>
                        
                        {/* Only show composition if selected */}
                        {composition && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-200">
                            <span className="text-sm text-gray-600">Composition</span>
                            <span className="text-sm font-medium text-gray-900">{compositionLabels[composition]}</span>
                          </div>
                        )}
                        
                        {/* Only show eye direction if selected */}
                        {eyeDirection && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-200">
                            <span className="text-sm text-gray-600">Eye Direction</span>
                            <span className="text-sm font-medium text-gray-900">{eyeDirectionLabels[eyeDirection]}</span>
                          </div>
                        )}
                        
                        {/* Only show expression if selected */}
                        {expression && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-200">
                            <span className="text-sm text-gray-600">Expression</span>
                            <span className="text-sm font-medium text-gray-900">{expressionLabels[expression]}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between py-2 border-b border-gray-200">
                          <span className="text-sm text-gray-600">Resolution</span>
                          <span className="text-sm font-medium text-gray-900">2048 × 2732 pixels</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Email Input, Price & Payment */}
                <div className="bg-white rounded-2xl p-8" data-testid="section-payment">
                  <h2 className="text-xl font-semibold mb-6 text-gray-900">Delivery Information</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="your@email.com" 
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  setEmailInput(e.target.value);
                                }}
                                data-testid="input-email" 
                              />
                            </FormControl>
                            <p className="text-xs text-gray-500 mt-2">
                              Your high-resolution photo without watermark will be sent to this email within approximately 1 minute after successful payment.
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Price Breakdown */}
                      <div className="p-4 bg-primary/10 rounded-xl" data-testid="section-price">
                        <h3 className="text-sm font-bold text-gray-900 mb-3">Price Breakdown</h3>
                        
                        {styleId === "2" ? (
                          /* ID Photos: Fixed Price */
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">ID Photo Service</span>
                              <span className="font-medium text-gray-900">CAD ${totalPrice.toFixed(2)}</span>
                            </div>
                          </div>
                        ) : (
                          /* Pro Headshot: "Free First Option" Pricing Strategy */
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Base Photo</span>
                              <span className="font-medium text-gray-900">CAD $2.99</span>
                            </div>
                            
                            {/* Suit Fabric */}
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Suit Fabric: {selectedSuitFabric.name}</span>
                              <span className="font-medium text-gray-900">
                                {suitFabric === DEFAULT_SUIT_FABRIC ? "Free" : `CAD $${OPTION_PRICES.suitFabric.toFixed(2)}`}
                              </span>
                            </div>
                            
                            {/* Suit Color */}
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Suit Color: {selectedSuitColor.name}</span>
                              <span className="font-medium text-gray-900">
                                {suitColor === DEFAULT_SUIT_COLOR ? "Free" : `CAD $${OPTION_PRICES.suitColor.toFixed(2)}`}
                              </span>
                            </div>
                            
                            {/* Shirt Color */}
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Shirt Color: {selectedShirtColor.name}</span>
                              <span className="font-medium text-gray-900">
                                {shirtColor === DEFAULT_SHIRT_COLOR ? "Free" : `CAD $${OPTION_PRICES.shirtColor.toFixed(2)}`}
                              </span>
                            </div>
                            
                            {/* Neck Tie */}
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Neck Tie: {selectedNeckTie.name}</span>
                              <span className="font-medium text-gray-900">
                                {neckTie === DEFAULT_NECK_TIE ? "Free" : `CAD $${OPTION_PRICES.neckTie.toFixed(2)}`}
                              </span>
                            </div>
                            
                            {/* Background */}
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Background: {selectedBackground.name}</span>
                              <span className="font-medium text-gray-900">
                                {background === DEFAULT_BACKGROUND ? "Free" : `CAD $${OPTION_PRICES.background.toFixed(2)}`}
                              </span>
                            </div>
                            
                            {/* Composition */}
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Composition: {compositionLabels[composition]}</span>
                              <span className="font-medium text-gray-900">
                                {composition === DEFAULT_COMPOSITION ? "Free" : `CAD $${OPTION_PRICES.composition.toFixed(2)}`}
                              </span>
                            </div>
                            
                            {/* Eye Direction */}
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Eye Direction: {eyeDirectionLabels[eyeDirection]}</span>
                              <span className="font-medium text-gray-900">
                                {eyeDirection === DEFAULT_EYE_DIRECTION ? "Free" : `CAD $${OPTION_PRICES.eyeDirection.toFixed(2)}`}
                              </span>
                            </div>
                            
                            {/* Expression */}
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Expression: {expressionLabels[expression]}</span>
                              <span className="font-medium text-gray-900">
                                {expression === DEFAULT_EXPRESSION ? "Free" : `CAD $${OPTION_PRICES.expression.toFixed(2)}`}
                              </span>
                            </div>
                          </div>
                        )}
                        
                        <div className="border-t border-gray-300 pt-3 mt-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-gray-900">Total: CAD ${totalPrice.toFixed(2)}</span>
                                <Badge variant="destructive" className="bg-red-500 font-normal">Limited Offer</Badge>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">High-resolution AI-generated photo</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button 
                        type="submit"
                        className="w-full bg-primary text-black hover:bg-primary/90 h-12 text-base"
                        data-testid="button-pay-now"
                      >
                        Proceed to Payment
                      </Button>

                      {/* Privacy Policy Agreement */}
                      <p className="text-xs text-gray-500 text-center" data-testid="text-privacy-notice">
                        By clicking 'Proceed to Payment' you agree to our{" "}
                        <Link href="/privacy">
                          <a className="text-primary hover:underline" data-testid="link-privacy-policy">
                            Privacy Policy
                          </a>
                        </Link>
                        {" "}and{" "}
                        <Link href="/terms">
                          <a className="text-primary hover:underline" data-testid="link-terms-conditions">
                            Terms and Conditions
                          </a>
                        </Link>
                      </p>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // Processing State
  if (pageState === 'processing') {
    return (
      <div className="min-h-screen w-full bg-gray-50">
        <Navigation />
        
        <div className="pt-24 pb-12 px-6 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-12 text-center" data-testid="section-processing">
              <div className="flex justify-center mb-6">
                <GlowingLoader />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Processing</h1>
              
              <p className="text-lg text-gray-600 mb-2">
                Your payment is being processed...
              </p>
              
              <p className="text-base text-gray-600 mb-8">
                After successful payment, your photo will be sent to:{" "}
                <span className="font-semibold text-gray-900" data-testid="text-user-email">{userEmail}</span>
              </p>

              <div className="border-t border-gray-200 pt-8 mt-8">
                <p className="text-sm text-gray-500 mb-4">Test Payment Status (Development Only)</p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={handleSuccess}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    data-testid="button-test-success"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Simulate Success
                  </Button>
                  <Button
                    onClick={handleFailure}
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                    data-testid="button-test-failure"
                  >
                    <XCircle className="w-5 h-5 mr-2" />
                    Simulate Failure
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // Success State
  if (pageState === 'success') {
    return (
      <div className="min-h-screen w-full bg-gray-50">
        <Navigation />
        
        <div className="pt-24 pb-12 px-6 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-12 text-center" data-testid="section-success">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
              
              <p className="text-lg text-gray-600 mb-4">
                Thank you for your purchase. Your payment has been processed successfully.
              </p>
              
              <div className="bg-primary/10 rounded-xl p-6 mb-8">
                <p className="text-base text-gray-700">
                  Your high-resolution photo without watermark has been sent to:
                </p>
                <p className="text-lg font-semibold text-gray-900 mt-2" data-testid="text-success-email">
                  {userEmail}
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  Please check your inbox (and spam folder) within the next few minutes.
                </p>
              </div>

              <p className="text-sm text-gray-500">
                You can safely close this page now.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // Failure State
  if (pageState === 'failure') {
    return (
      <div className="min-h-screen w-full bg-gray-50">
        <Navigation />
        
        <div className="pt-24 pb-12 px-6 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-12 text-center" data-testid="section-failure">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="w-12 h-12 text-red-600" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Failed</h1>
              
              <p className="text-lg text-gray-600 mb-8">
                We're sorry, but your payment could not be processed. Please try again.
              </p>

              <Button
                onClick={handleBackToCheckout}
                className="bg-primary text-black hover:bg-primary/90"
                data-testid="button-back-to-checkout"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back to Checkout
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return null;
}
