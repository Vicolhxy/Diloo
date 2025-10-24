import { useState, useMemo, useRef } from "react";
import { Link, useSearch } from "wouter";
import { User } from "lucide-react";
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
  { value: "waist-up", label: "腰部以上" },
  { value: "shoulder-up", label: "肩部以上" },
];

const poses = [
  { value: "hands-down", label: "双手自然垂下" },
  { value: "hands-pocket", label: "双手插兜" },
  { value: "arms-crossed", label: "双臂环抱于胸前" },
  { value: "hand-chin", label: "单手摸下巴" },
  { value: "buttoning", label: "系扣子" },
  { value: "hand-collar", label: "摸衣领" },
];

const eyeDirections = [
  { value: "straight", label: "正视" },
  { value: "slight-side", label: "微微侧视" },
];

const expressions = [
  { value: "neutral", label: "面无表情" },
  { value: "smile", label: "微笑" },
  { value: "laugh", label: "大笑" },
];

export default function Upload() {
  const searchString = useSearch();
  const [selectedBgColor, setSelectedBgColor] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState(1);
  const [selectedCoatColor, setSelectedCoatColor] = useState(1);
  const [primaryImage, setPrimaryImage] = useState<string | null>(null);
  const [optionalImage, setOptionalImage] = useState<string | null>(null);
  
  // New customization options
  const [selectedComposition, setSelectedComposition] = useState<string | null>(null);
  const [selectedPose, setSelectedPose] = useState<string | null>(null);
  const [selectedEyeDirection, setSelectedEyeDirection] = useState<string | null>(null);
  const [selectedExpression, setSelectedExpression] = useState<string | null>(null);
  
  const primaryInputRef = useRef<HTMLInputElement>(null);
  const optionalInputRef = useRef<HTMLInputElement>(null);

  const { styleId, selectedStyleImage } = useMemo(() => {
    const params = new URLSearchParams(searchString);
    const styleId = params.get('style') || "3";
    return {
      styleId,
      selectedStyleImage: styleImages[styleId as keyof typeof styleImages] || w2Img,
    };
  }, [searchString]);

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
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
                <img 
                  src={selectedStyleImage} 
                  alt="Selected style sample photo" 
                  className="w-full h-full object-cover"
                  data-testid="img-sample-photo"
                />
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
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button 
                            onClick={() => primaryInputRef.current?.click()}
                            className="bg-white text-gray-900 hover:bg-white/90"
                            data-testid="button-change-primary"
                          >
                            Change
                          </Button>
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
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button 
                            onClick={() => optionalInputRef.current?.click()}
                            className="bg-white text-gray-900 hover:bg-white/90"
                            data-testid="button-change-optional"
                          >
                            Change
                          </Button>
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
                      构图 <span className="text-gray-500 text-xs">(可选)</span>
                    </label>
                    <div className="flex gap-3">
                      {compositions.map((comp) => (
                        <Button
                          key={comp.value}
                          variant={selectedComposition === comp.value ? "default" : "outline"}
                          onClick={() => {
                            setSelectedComposition(comp.value);
                            // Reset pose if shoulder-up is selected
                            if (comp.value === "shoulder-up") {
                              setSelectedPose(null);
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
                      姿势 <span className="text-gray-500 text-xs">(可选)</span>
                      {selectedComposition === "shoulder-up" && (
                        <span className="text-gray-400 text-xs ml-2">(构图选择"肩部以上"时不可选)</span>
                      )}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {poses.map((pose) => (
                        <Button
                          key={pose.value}
                          variant={selectedPose === pose.value ? "default" : "outline"}
                          onClick={() => setSelectedPose(pose.value)}
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
                      眼睛方向 <span className="text-gray-500 text-xs">(可选)</span>
                    </label>
                    <div className="flex gap-3">
                      {eyeDirections.map((eye) => (
                        <Button
                          key={eye.value}
                          variant={selectedEyeDirection === eye.value ? "default" : "outline"}
                          onClick={() => setSelectedEyeDirection(eye.value)}
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
                      表情 <span className="text-gray-500 text-xs">(可选)</span>
                    </label>
                    <div className="flex gap-3">
                      {expressions.map((expr) => (
                        <Button
                          key={expr.value}
                          variant={selectedExpression === expr.value ? "default" : "outline"}
                          onClick={() => setSelectedExpression(expr.value)}
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
                <Link href={`/checkout?style=${styleId}&bgColor=${selectedBgColor}&material=${selectedMaterial}&coatColor=${selectedCoatColor}${selectedComposition ? `&composition=${selectedComposition}` : ''}${selectedPose ? `&pose=${selectedPose}` : ''}${selectedEyeDirection ? `&eyeDirection=${selectedEyeDirection}` : ''}${selectedExpression ? `&expression=${selectedExpression}` : ''}`}>
                  <Button 
                    className="w-full bg-primary text-black font-bold hover:bg-primary/90 h-12 text-base"
                    data-testid="button-create-now"
                  >
                    Create Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
