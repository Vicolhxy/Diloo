import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useSearch } from "wouter";
import { User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import StyleTabNav from "@/components/StyleTabNav";
import Footer from "@/components/Footer";
import { idPhotoSpecs, getDocumentTypes, getDocumentSpec, formatDocumentType } from "../../../shared/idPhotoSpecs";
import w1Img from "@assets/W1_1761159011555.png";
import y1Img from "@assets/Y1_1761159011566.png";
import w2Img from "@assets/W2_1761159011568.png";
import b1Img from "@assets/B1_1761159011569.png";
import y2Img from "@assets/Y2_1761159011570.png";
import b2Img from "@assets/B2_1761159011571.png";
import w3Img from "@assets/W3_1761159011572.png";
import i1Img from "@assets/I1_1761159011573.png";

// All 8 sample images for carousel (not grouped by category)
const allStyleImages = [w1Img, y1Img, w2Img, b1Img, y2Img, b2Img, w3Img, i1Img];

const suitFabrics = [
  { id: 1, name: "Wool" },
  { id: 2, name: "Wool Blend" },
  { id: 3, name: "Worsted Wool" },
];

const suitColors = [
  { id: 1, name: "Charcoal", hex: "#36454F" },
  { id: 2, name: "Navy", hex: "#000080" },
  { id: 3, name: "Black", hex: "#000000" },
  { id: 4, name: "Light Gray", hex: "#D3D3D3" },
  { id: 5, name: "Midnight Blue", hex: "#191970" },
  { id: 6, name: "Charcoal Blue", hex: "#3C4C5C" },
  { id: 7, name: "Pinstripe Charcoal", hex: "#36454F", pattern: "pinstripe" },
];

const shirtColors = [
  { id: 1, name: "White", hex: "#FFFFFF" },
  { id: 2, name: "Light Blue", hex: "#ADD8E6" },
  { id: 3, name: "Pale Gray", hex: "#E8E8E8" },
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

const compositions = [
  { value: "above-shoulders", label: "Above shoulders" },
  { value: "above-waist", label: "Above waist" },
];

const handPoses = [
  { value: "hands-down", label: "Hands naturally down" },
  { value: "hands-pockets", label: "Hands in pockets" },
  { value: "arms-crossed", label: "Arms crossed" },
  { value: "buttoning", label: "Buttoning jacket" },
  { value: "hand-chin", label: "One hand touching chin" },
  { value: "adjusting-lapel", label: "Adjusting lapel" },
];

const eyeDirections = [
  { value: "facing-camera", label: "Facing the camera" },
  { value: "slightly-away", label: "Slightly away from camera" },
];

const expressions = [
  { value: "serious", label: "Serious and professional" },
  { value: "natural-smile", label: "Natural smile" },
  { value: "laughing", label: "Laughing (slight motion)" },
];

export default function Upload() {
  const searchString = useSearch();
  const [selectedSuitFabric, setSelectedSuitFabric] = useState(1);
  const [selectedSuitColor, setSelectedSuitColor] = useState(1);
  const [selectedShirtColor, setSelectedShirtColor] = useState(1);
  const [selectedBackground, setSelectedBackground] = useState(1);
  const [primaryImage, setPrimaryImage] = useState<string | null>(null);
  const [optionalImage, setOptionalImage] = useState<string | null>(null);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  
  // Customization options for Pro Headshot
  const [selectedComposition, setSelectedComposition] = useState<string | null>(null);
  const [selectedHandPose, setSelectedHandPose] = useState<string | null>(null);
  const [selectedEyeDirection, setSelectedEyeDirection] = useState<string | null>(null);
  const [selectedExpression, setSelectedExpression] = useState<string | null>(null);
  
  // ID Photos customization options
  const [selectedCountry, setSelectedCountry] = useState<string>("Canada");
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>("Passport");
  const [customSize, setCustomSize] = useState<string>("");
  const [customDPI, setCustomDPI] = useState<string>("");
  const [customBgColor, setCustomBgColor] = useState<string>("");
  const [customFileFormat, setCustomFileFormat] = useState<string>("");
  
  const primaryInputRef = useRef<HTMLInputElement>(null);
  const optionalInputRef = useRef<HTMLInputElement>(null);

  const { styleId } = useMemo(() => {
    const params = new URLSearchParams(searchString);
    const styleId = params.get('style') || "1";
    return {
      styleId,
    };
  }, [searchString]);
  
  // Get current document spec for ID Photos
  const currentDocSpec = useMemo(() => {
    if (styleId !== "2") return null;
    return getDocumentSpec(selectedCountry, selectedDocumentType);
  }, [styleId, selectedCountry, selectedDocumentType]);
  
  // Get available document types for selected country
  const availableDocTypes = useMemo(() => {
    if (styleId !== "2") return [];
    return getDocumentTypes(selectedCountry);
  }, [styleId, selectedCountry]);
  
  // Reset document type when country changes
  useEffect(() => {
    if (styleId === "2" && availableDocTypes.length > 0) {
      setSelectedDocumentType(availableDocTypes[0]);
    }
  }, [selectedCountry, styleId, availableDocTypes]);
  
  const styleSampleImages = allStyleImages;

  // Reset carousel index when style changes
  useEffect(() => {
    setCurrentCarouselIndex(0);
  }, [styleId]);

  // Auto-rotate carousel every 2 seconds, pause on hover
  useEffect(() => {
    if (isCarouselHovered) return;
    
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % styleSampleImages.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [styleSampleImages.length, isCarouselHovered]);

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
              <div 
                className="relative"
                onMouseEnter={() => setIsCarouselHovered(true)}
                onMouseLeave={() => setIsCarouselHovered(false)}
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
                  <div 
                    className="flex h-full transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentCarouselIndex * 100}%)` }}
                  >
                    {styleSampleImages.map((image, index) => (
                      <img 
                        key={index}
                        src={image} 
                        alt={`Sample photo ${index + 1}`}
                        className="w-full h-full object-cover flex-shrink-0"
                        data-testid={`img-sample-photo-${index}`}
                      />
                    ))}
                  </div>
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
                          className="bg-primary text-black hover:bg-primary/90"
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
                
                {/* Conditional rendering based on style */}
                {styleId === "2" ? (
                  /* ID Photos Form */
                  <div className="space-y-6">
                    {/* Country Selection */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3">
                        Country/Region
                      </label>
                      <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                        <SelectTrigger className="w-full" data-testid="select-country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(idPhotoSpecs.countries).map((countryKey) => (
                            <SelectItem key={countryKey} value={countryKey}>
                              {idPhotoSpecs.countries[countryKey].name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Document Type Selection */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3">
                        Document Type
                      </label>
                      <Select value={selectedDocumentType} onValueChange={setSelectedDocumentType}>
                        <SelectTrigger className="w-full" data-testid="select-document-type">
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableDocTypes.map((docType: string) => (
                            <SelectItem key={docType} value={docType}>
                              {formatDocumentType(docType)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Specifications Display */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <h3 className="font-semibold text-gray-900 text-sm">Specifications</h3>
                      
                      {/* Size */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Photo Size:</span>
                        {currentDocSpec && currentDocSpec.size ? (
                          <span className="text-sm font-medium text-gray-900">{currentDocSpec.size}</span>
                        ) : (
                          <Input
                            type="text"
                            value={customSize}
                            onChange={(e) => setCustomSize(e.target.value)}
                            placeholder="e.g., 35x45 mm"
                            className="w-40 h-8 text-sm"
                            data-testid="input-custom-size"
                          />
                        )}
                      </div>

                      {/* DPI */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">DPI:</span>
                        {currentDocSpec && currentDocSpec.dpi ? (
                          <span className="text-sm font-medium text-gray-900">{currentDocSpec.dpi}</span>
                        ) : (
                          <Input
                            type="text"
                            value={customDPI}
                            onChange={(e) => setCustomDPI(e.target.value)}
                            placeholder="e.g., 300"
                            className="w-40 h-8 text-sm"
                            data-testid="input-custom-dpi"
                          />
                        )}
                      </div>

                      {/* Background Color */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Background:</span>
                        {currentDocSpec && currentDocSpec.backgroundColor ? (
                          <span className="text-sm font-medium text-gray-900">{currentDocSpec.backgroundColor}</span>
                        ) : (
                          <Input
                            type="text"
                            value={customBgColor}
                            onChange={(e) => setCustomBgColor(e.target.value)}
                            placeholder="e.g., White"
                            className="w-40 h-8 text-sm"
                            data-testid="input-custom-bgcolor"
                          />
                        )}
                      </div>

                      {/* File Format */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">File Format:</span>
                        {currentDocSpec && currentDocSpec.fileFormat ? (
                          <span className="text-sm font-medium text-gray-900">{currentDocSpec.fileFormat}</span>
                        ) : (
                          <Input
                            type="text"
                            value={customFileFormat}
                            onChange={(e) => setCustomFileFormat(e.target.value)}
                            placeholder="e.g., JPG"
                            className="w-40 h-8 text-sm"
                            data-testid="input-custom-format"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Pro Headshot Form (existing) */
                  <div className="space-y-6">
                  {/* Suit Fabric */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Suit Fabric
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {suitFabrics.map((fabric) => (
                        <Button
                          key={fabric.id}
                          variant={selectedSuitFabric === fabric.id ? "default" : "outline"}
                          onClick={() => setSelectedSuitFabric(fabric.id)}
                          className={
                            selectedSuitFabric === fabric.id
                              ? "bg-primary text-black hover:bg-primary/90"
                              : "border-gray-300 text-gray-700 hover:bg-gray-100"
                          }
                          data-testid={`suit-fabric-${fabric.id}`}
                        >
                          {fabric.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Suit Color with color swatches */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Suit Color
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {suitColors.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => setSelectedSuitColor(color.id)}
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                            selectedSuitColor === color.id
                              ? "border-primary bg-primary/5"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          data-testid={`suit-color-${color.id}`}
                        >
                          <div 
                            className="w-8 h-8 rounded border border-gray-300 flex-shrink-0"
                            style={{ 
                              backgroundColor: color.hex,
                              backgroundImage: color.pattern === "pinstripe" 
                                ? `repeating-linear-gradient(90deg, ${color.hex}, ${color.hex} 3px, rgba(255,255,255,0.1) 3px, rgba(255,255,255,0.1) 4px)`
                                : undefined
                            }}
                          />
                          <span className="text-sm text-gray-900">{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Shirt Color with color swatches */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Shirt Color
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {shirtColors.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => setSelectedShirtColor(color.id)}
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                            selectedShirtColor === color.id
                              ? "border-primary bg-primary/5"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          data-testid={`shirt-color-${color.id}`}
                        >
                          <div 
                            className="w-8 h-8 rounded border border-gray-300 flex-shrink-0"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-sm text-gray-900">{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Background */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Background
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {backgrounds.map((bg) => (
                        <Button
                          key={bg.id}
                          variant={selectedBackground === bg.id ? "default" : "outline"}
                          onClick={() => setSelectedBackground(bg.id)}
                          className={
                            selectedBackground === bg.id
                              ? "bg-primary text-black hover:bg-primary/90 text-left justify-start"
                              : "border-gray-300 text-gray-700 hover:bg-gray-100 text-left justify-start"
                          }
                          data-testid={`background-${bg.id}`}
                        >
                          {bg.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Composition */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Composition <span className="text-gray-500 text-xs font-normal">(Optional)</span>
                    </label>
                    <div className="flex gap-3">
                      {compositions.map((comp) => (
                        <Button
                          key={comp.value}
                          variant="outline"
                          onClick={() => {
                            if (selectedComposition === comp.value) {
                              setSelectedComposition(null);
                              setSelectedHandPose(null);
                            } else {
                              setSelectedComposition(comp.value);
                              if (comp.value === "above-shoulders") {
                                setSelectedHandPose(null);
                              }
                            }
                          }}
                          className={
                            selectedComposition === comp.value
                              ? "bg-primary text-black hover:bg-primary/90 border-2 border-primary"
                              : "border-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                          }
                          data-testid={`composition-${comp.value}`}
                        >
                          {comp.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Hand Pose - Only show when "Above waist" is selected */}
                  {selectedComposition === "above-waist" && (
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3">
                        Hand Pose <span className="text-gray-500 text-xs font-normal">(Optional)</span>
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {handPoses.map((pose) => (
                          <Button
                            key={pose.value}
                            variant="outline"
                            onClick={() => {
                              if (selectedHandPose === pose.value) {
                                setSelectedHandPose(null);
                              } else {
                                setSelectedHandPose(pose.value);
                              }
                            }}
                            className={
                              selectedHandPose === pose.value
                                ? "bg-primary text-black hover:bg-primary/90 border-2 border-primary"
                                : "border-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                            }
                            data-testid={`hand-pose-${pose.value}`}
                          >
                            {pose.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Eye Direction */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Eye Direction <span className="text-gray-500 text-xs font-normal">(Optional)</span>
                    </label>
                    <div className="flex gap-3">
                      {eyeDirections.map((eye) => (
                        <Button
                          key={eye.value}
                          variant="outline"
                          onClick={() => {
                            if (selectedEyeDirection === eye.value) {
                              setSelectedEyeDirection(null);
                            } else {
                              setSelectedEyeDirection(eye.value);
                            }
                          }}
                          className={
                            selectedEyeDirection === eye.value
                              ? "bg-primary text-black hover:bg-primary/90 border-2 border-primary"
                              : "border-2 border-gray-300 text-gray-700 hover:bg-gray-100"
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
                      Expression <span className="text-gray-500 text-xs font-normal">(Optional)</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {expressions.map((expr) => (
                        <Button
                          key={expr.value}
                          variant="outline"
                          onClick={() => {
                            if (selectedExpression === expr.value) {
                              setSelectedExpression(null);
                            } else {
                              setSelectedExpression(expr.value);
                            }
                          }}
                          className={
                            selectedExpression === expr.value
                              ? "bg-primary text-black hover:bg-primary/90 border-2 border-primary"
                              : "border-2 border-gray-300 text-gray-700 hover:bg-gray-100"
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
                      ? `/checkout?style=${styleId}&country=${selectedCountry}&documentType=${selectedDocumentType}&size=${encodeURIComponent(currentDocSpec?.size || customSize)}&dpi=${currentDocSpec?.dpi || customDPI}&backgroundColor=${encodeURIComponent(currentDocSpec?.backgroundColor || customBgColor)}&fileFormat=${currentDocSpec?.fileFormat || customFileFormat}`
                      : `/checkout?style=${styleId}&suitFabric=${selectedSuitFabric}&suitColor=${selectedSuitColor}&shirtColor=${selectedShirtColor}&background=${selectedBackground}${selectedComposition ? `&composition=${selectedComposition}` : ''}${selectedHandPose ? `&handPose=${selectedHandPose}` : ''}${selectedEyeDirection ? `&eyeDirection=${selectedEyeDirection}` : ''}${selectedExpression ? `&expression=${selectedExpression}` : ''}`
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
