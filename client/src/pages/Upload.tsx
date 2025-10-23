import { useState, useMemo } from "react";
import { Link, useSearch } from "wouter";
import { ChevronLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
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

export default function Upload() {
  const searchString = useSearch();
  const [selectedBgColor, setSelectedBgColor] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState(1);
  const [selectedCoatColor, setSelectedCoatColor] = useState(1);

  const selectedStyleImage = useMemo(() => {
    const params = new URLSearchParams(searchString);
    const styleId = params.get('style') || "3";
    return styleImages[styleId as keyof typeof styleImages] || w2Img;
  }, [searchString]);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-12 px-6 md:px-12">
        <div className="container mx-auto max-w-7xl">
          <Link href="/" data-testid="link-back-home">
            <div className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 cursor-pointer w-fit">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Home</span>
            </div>
          </Link>

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
                    className="border-2 border-dashed border-primary rounded-xl p-8 flex flex-col items-center justify-center min-h-[280px] cursor-pointer hover:border-primary/70 transition-colors"
                    data-testid="upload-area-primary"
                  >
                    <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-900 font-medium mb-1">Upload your photo</p>
                    <p className="text-gray-500 text-sm mb-4">PNG and JPG only</p>
                    <Button 
                      className="bg-primary text-white hover:bg-primary/90"
                      data-testid="button-upload-primary"
                    >
                      Select from my device
                    </Button>
                  </div>

                  <div 
                    className="border-2 border-dashed border-primary rounded-xl p-8 flex flex-col items-center justify-center min-h-[280px] cursor-pointer hover:border-primary/70 transition-colors"
                    data-testid="upload-area-optional"
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

                  <Button 
                    className="w-full bg-primary text-white hover:bg-primary/90 h-12 text-base"
                    data-testid="button-generate"
                  >
                    Select from my device
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
