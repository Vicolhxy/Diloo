import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useSearch } from "wouter";
import { User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import StyleTabNav from "@/components/StyleTabNav";
import Footer from "@/components/Footer";
import w1Img from "@assets/W1_1761159011555.png";
import y1Img from "@assets/Y1_1761159011566.png";
import w2Img from "@assets/W2_1761159011568.png";
import b1Img from "@assets/B1_1761159011569.png";
import y2Img from "@assets/Y2_1761159011570.png";
import b2Img from "@assets/B2_1761159011571.png";
import w3Img from "@assets/W3_1761159011572.png";
import i1Img from "@assets/I1_1761159011573.png";

// Sample images organized by style ID
// Each style can have multiple sample images for carousel
const styleImages: Record<string, string[]> = {
  "1": [w1Img],
  "2": [y1Img],
  "3": [w2Img],
  "4": [b1Img],
  "5": [y2Img],
  "6": [b2Img],
  "7": [w3Img],
  "8": [i1Img],
};

const backgroundColors = [
  { id: 1, color: "bg-gray-400", hex: "#9CA3AF" },
  { id: 2, color: "bg-primary", hex: "#25CED1" },
  { id: 3, color: "bg-amber-700", hex: "#B45309" },
  { id: 4, color: "bg-gray-500", hex: "#6B7280" },
  { id: 5, color: "bg-amber-200", hex: "#FDE68A" },
];

const coatColors = [
  { id: 1, color: "bg-gray-400", hex: "#9CA3AF" },
  { id: 2, color: "bg-primary", hex: "#25CED1" },
  { id: 3, color: "bg-amber-700", hex: "#B45309" },
  { id: 4, color: "bg-gray-500", hex: "#6B7280" },
  { id: 5, color: "bg-amber-200", hex: "#FDE68A" },
];

const materials = [
  { id: 1, name: "Material 1" },
  { id: 2, name: "Material 2" },
  { id: 3, name: "Material 3" },
  { id: 4, name: "Material 4" },
];

const compositions = [
  { value: "waist-up", label: "Waist Up" },
  { value: "shoulder-up", label: "Shoulder Up" },
];

const poses = [
  { value: "hands-down", label: "Hands Down" },
  { value: "hands-pocket", label: "Hands in Pockets" },
  { value: "arms-crossed", label: "Arms Crossed" },
  { value: "hand-chin", label: "Hand on Chin" },
  { value: "buttoning", label: "Buttoning" },
  { value: "hand-collar", label: "Touching Collar" },
];

const eyeDirections = [
  { value: "straight", label: "Straight" },
  { value: "slight-side", label: "Slight Side" },
];

const expressions = [
  { value: "neutral", label: "Neutral" },
  { value: "smile", label: "Smile" },
  { value: "laugh", label: "Laugh" },
];

export default function Upload() {
  const searchString = useSearch();
  const [selectedBgColor, setSelectedBgColor] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState(1);
  const [selectedCoatColor, setSelectedCoatColor] = useState(1);
  const [primaryImage, setPrimaryImage] = useState<string | null>(null);
  const [optionalImage, setOptionalImage] = useState<string | null>(null);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  
  // New customization options
  const [selectedComposition, setSelectedComposition] = useState<string | null>(null);
  const [selectedPose, setSelectedPose] = useState<string | null>(null);
  const [selectedEyeDirection, setSelectedEyeDirection] = useState<string | null>(null);
  const [selectedExpression, setSelectedExpression] = useState<string | null>(null);
  
  const primaryInputRef = useRef<HTMLInputElement>(null);
  const optionalInputRef = useRef<HTMLInputElement>(null);

  const { styleId, styleSampleImages } = useMemo(() => {
    const params = new URLSearchParams(searchString);
    const styleId = params.get('style') || "3";
    const images = styleImages[styleId] || styleImages["3"];
    return {
      styleId,
      styleSampleImages: images,
    };
  }, [searchString]);

  // Reset carousel index when style changes
  useEffect(() => {
    setCurrentCarouselIndex(0);
  }, [styleId]);

  // Auto-rotate carousel every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % styleSampleImages.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [styleSampleImages.length]);

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
      
      <div className="pt-8 pb-12 px-6 md:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8" data-testid="section-sample-photo">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Sample Photo</h2>
              <div className="relative">
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
                  <img 
                    src={styleSampleImages[currentCarouselIndex]} 
                    alt={`Sample photo ${currentCarouselIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-500"
                    data-testid="img-sample-photo"
                  />
                </div>
                
                {/* Dots indicator */}
                <div className="flex justify-center gap-2 mt-4" data-testid="carousel-dots">
                  {styleSampleImages.map((_: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCarouselIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentCarouselIndex 
                          ? 'bg-primary w-6' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      data-testid={`carousel-dot-${index}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
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
                        <p className="text-gray-900 font-medium mb-1">Upload your photo</p>
                        <p className="text-gray-500 text-sm mb-4">PNG and JPG only</p>
                        <Button 
                          className="bg-primary text-black font-bold hover:bg-primary/90"
                          data-testid="button-upload-primary"
                        >
                          Select from my device
                        </Button>
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
                        <p className="text-gray-900 font-medium mb-1">Upload your photo</p>
                        <p className="text-gray-500 text-sm mb-4">Optional</p>
                        <Button 
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary/10"
                          data-testid="button-upload-optional"
                        >
                          Select from my device
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8" data-testid="section-customize">
                <h2 className="text-xl font-semibold mb-6 text-gray-900">Customize Your Photo</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Background Color
                    </label>
                    <div className="flex gap-3">
                      {backgroundColors.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedBgColor(item.id)}
                          className={`w-12 h-12 rounded-lg ${item.color} ${
                            selectedBgColor === item.id
                              ? "ring-2 ring-primary ring-offset-2"
                              : "hover:ring-2 hover:ring-gray-300"
                          } transition-all`}
                          data-testid={`color-bg-${item.id}`}
                          aria-label={`Background color ${item.id}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Coat Material
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {materials.map((material) => (
                        <Button
                          key={material.id}
                          variant={selectedMaterial === material.id ? "default" : "outline"}
                          onClick={() => setSelectedMaterial(material.id)}
                          className={
                            selectedMaterial === material.id
                              ? "bg-gray-300 text-gray-900 hover:bg-gray-400"
                              : "border-gray-300 text-gray-700 hover:bg-gray-100"
                          }
                          data-testid={`material-${material.id}`}
                        >
                          {material.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Coat Color
                    </label>
                    <div className="flex gap-3">
                      {coatColors.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedCoatColor(item.id)}
                          className={`w-12 h-12 rounded-lg ${item.color} ${
                            selectedCoatColor === item.id
                              ? "ring-2 ring-primary ring-offset-2"
                              : "hover:ring-2 hover:ring-gray-300"
                          } transition-all`}
                          data-testid={`color-coat-${item.id}`}
                          aria-label={`Coat color ${item.id}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Composition */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Composition <span className="text-gray-500 text-xs">(Optional)</span>
                    </label>
                    <div className="flex gap-3">
                      {compositions.map((comp) => (
                        <Button
                          key={comp.value}
                          variant={selectedComposition === comp.value ? "default" : "outline"}
                          onClick={() => {
                            if (selectedComposition === comp.value) {
                              // Deselect if already selected
                              setSelectedComposition(null);
                            } else {
                              // Select new option
                              setSelectedComposition(comp.value);
                              // Reset pose if shoulder-up is selected
                              if (comp.value === "shoulder-up") {
                                setSelectedPose(null);
                              }
                            }
                          }}
                          className={
                            selectedComposition === comp.value
                              ? "bg-primary text-black font-bold hover:bg-primary/90"
                              : "border-gray-300 text-gray-700 hover:bg-gray-100"
                          }
                          data-testid={`composition-${comp.value}`}
                        >
                          {comp.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Pose */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Pose <span className="text-gray-500 text-xs">(Optional)</span>
                      {selectedComposition === "shoulder-up" && (
                        <span className="text-gray-400 text-xs ml-2">(Disabled when Shoulder Up is selected)</span>
                      )}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {poses.map((pose) => (
                        <Button
                          key={pose.value}
                          variant={selectedPose === pose.value ? "default" : "outline"}
                          onClick={() => {
                            if (selectedPose === pose.value) {
                              setSelectedPose(null);
                            } else {
                              setSelectedPose(pose.value);
                            }
                          }}
                          disabled={selectedComposition === "shoulder-up"}
                          className={
                            selectedPose === pose.value
                              ? "bg-primary text-black font-bold hover:bg-primary/90"
                              : "border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          }
                          data-testid={`pose-${pose.value}`}
                        >
                          {pose.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Eye Direction */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Eye Direction <span className="text-gray-500 text-xs">(Optional)</span>
                    </label>
                    <div className="flex gap-3">
                      {eyeDirections.map((eye) => (
                        <Button
                          key={eye.value}
                          variant={selectedEyeDirection === eye.value ? "default" : "outline"}
                          onClick={() => {
                            if (selectedEyeDirection === eye.value) {
                              setSelectedEyeDirection(null);
                            } else {
                              setSelectedEyeDirection(eye.value);
                            }
                          }}
                          className={
                            selectedEyeDirection === eye.value
                              ? "bg-primary text-black font-bold hover:bg-primary/90"
                              : "border-gray-300 text-gray-700 hover:bg-gray-100"
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
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Expression <span className="text-gray-500 text-xs">(Optional)</span>
                    </label>
                    <div className="flex gap-3">
                      {expressions.map((expr) => (
                        <Button
                          key={expr.value}
                          variant={selectedExpression === expr.value ? "default" : "outline"}
                          onClick={() => {
                            if (selectedExpression === expr.value) {
                              setSelectedExpression(null);
                            } else {
                              setSelectedExpression(expr.value);
                            }
                          }}
                          className={
                            selectedExpression === expr.value
                              ? "bg-primary text-black font-bold hover:bg-primary/90"
                              : "border-gray-300 text-gray-700 hover:bg-gray-100"
                          }
                          data-testid={`expression-${expr.value}`}
                        >
                          {expr.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8" data-testid="section-cta">
                {(primaryImage || optionalImage) ? (
                  <Link href={`/checkout?style=${styleId}&bgColor=${selectedBgColor}&material=${selectedMaterial}&coatColor=${selectedCoatColor}${selectedComposition ? `&composition=${selectedComposition}` : ''}${selectedPose ? `&pose=${selectedPose}` : ''}${selectedEyeDirection ? `&eyeDirection=${selectedEyeDirection}` : ''}${selectedExpression ? `&expression=${selectedExpression}` : ''}`}>
                    <Button 
                      className="w-full bg-primary text-black font-bold hover:bg-primary/90 h-12 text-base"
                      data-testid="button-create-now"
                    >
                      Create Now
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    disabled
                    className="w-full bg-gray-300 text-gray-500 h-12 text-base cursor-not-allowed"
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
