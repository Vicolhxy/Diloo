import { useState, useMemo } from "react";
import { Link, useSearch, useLocation } from "wouter";
import { ChevronLeft, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
  { id: 1, name: "Gray", color: "bg-gray-400" },
  { id: 2, name: "Teal", color: "bg-primary" },
  { id: 3, name: "Brown", color: "bg-amber-700" },
  { id: 4, name: "Dark Gray", color: "bg-gray-500" },
  { id: 5, name: "Light Brown", color: "bg-amber-200" },
];

const materials = [
  { id: 1, name: "Material 1" },
  { id: 2, name: "Material 2" },
  { id: 3, name: "Material 3" },
  { id: 4, name: "Material 4" },
];

const coatColors = [
  { id: 1, name: "Gray", color: "bg-gray-400" },
  { id: 2, name: "Teal", color: "bg-primary" },
  { id: 3, name: "Brown", color: "bg-amber-700" },
  { id: 4, name: "Dark Gray", color: "bg-gray-500" },
  { id: 5, name: "Light Brown", color: "bg-amber-200" },
];

// Labels for new customization options
const compositionLabels: Record<string, string> = {
  "waist-up": "Waist Up",
  "shoulder-up": "Shoulder Up",
};

const poseLabels: Record<string, string> = {
  "hands-down": "Hands Down",
  "hands-pocket": "Hands in Pockets",
  "arms-crossed": "Arms Crossed",
  "hand-chin": "Hand on Chin",
  "buttoning": "Buttoning",
  "hand-collar": "Touching Collar",
};

const eyeDirectionLabels: Record<string, string> = {
  "straight": "Straight",
  "slight-side": "Slight Side",
};

const expressionLabels: Record<string, string> = {
  "neutral": "Neutral",
  "smile": "Smile",
  "laugh": "Laugh",
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

  const { bgColor, material, coatColor, styleId, selectedStyleImage, composition, pose, eyeDirection, expression } = useMemo(() => {
    const params = new URLSearchParams(searchString);
    const styleId = params.get('style') || "3";
    return {
      bgColor: parseInt(params.get('bgColor') || '1'),
      material: parseInt(params.get('material') || '1'),
      coatColor: parseInt(params.get('coatColor') || '1'),
      styleId,
      selectedStyleImage: styleImages[styleId as keyof typeof styleImages] || w2Img,
      composition: params.get('composition') || null,
      pose: params.get('pose') || null,
      eyeDirection: params.get('eyeDirection') || null,
      expression: params.get('expression') || null,
    };
  }, [searchString]);

  const selectedBgColor = backgroundColors.find(c => c.id === bgColor) || backgroundColors[0];
  const selectedMaterial = materials.find(m => m.id === material) || materials[0];
  const selectedCoatColor = coatColors.find(c => c.id === coatColor) || coatColors[0];

  // Calculate number of customization options selected (each adds CAD $0.50)
  const customizationCount = [
    bgColor !== 1,           // Background Color
    material !== 1,          // Coat Material
    coatColor !== 1,         // Coat Color
    composition !== null,    // Composition
    pose !== null,           // Pose
    eyeDirection !== null,   // Eye Direction
    expression !== null,     // Expression
  ].filter(Boolean).length;

  const basePrice = 2.99;
  const perOptionPrice = 0.50;
  const totalPrice = basePrice + (customizationCount * perOptionPrice);

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

  const removeOption = (optionKey: string) => {
    const params = new URLSearchParams(searchString);
    params.delete(optionKey);
    setLocation(`/checkout?${params.toString()}`);
  };

  // Checkout Initial State
  if (pageState === 'checkout') {
    return (
      <div className="min-h-screen w-full bg-gray-50">
        <Navigation />
        
        <div className="pt-24 pb-12 px-6 md:px-12">
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
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
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
                  </div>
                </div>
              </div>

              {/* Right Side - Parameters, Email, Price, Payment */}
              <div className="space-y-6">
                {/* Parameters */}
                <div className="bg-white rounded-2xl p-8" data-testid="section-parameters">
                  <h2 className="text-xl font-semibold mb-6 text-gray-900">Photo Details</h2>
                  
                  <div className="space-y-3">
                    {/* Always show background color if not default */}
                    {bgColor !== 1 && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Background Color</span>
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded ${selectedBgColor.color}`}></div>
                          <span className="text-sm font-medium text-gray-900">{selectedBgColor.name}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Only show coat material if not default */}
                    {material !== 1 && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Coat Material</span>
                        <span className="text-sm font-medium text-gray-900">{selectedMaterial.name}</span>
                      </div>
                    )}
                    
                    {/* Only show coat color if not default */}
                    {coatColor !== 1 && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Coat Color</span>
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded ${selectedCoatColor.color}`}></div>
                          <span className="text-sm font-medium text-gray-900">{selectedCoatColor.name}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Only show composition if selected */}
                    {composition && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Composition</span>
                        <span className="text-sm font-medium text-gray-900">{compositionLabels[composition]}</span>
                      </div>
                    )}
                    
                    {/* Only show pose if selected */}
                    {pose && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Pose</span>
                        <span className="text-sm font-medium text-gray-900">{poseLabels[pose]}</span>
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
                        
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Base Photo</span>
                            <span className="font-medium text-gray-900">CAD ${basePrice.toFixed(2)}</span>
                          </div>
                          
                          {/* Individual customization items with delete buttons */}
                          {bgColor !== 1 && (
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-600">Background Color: {selectedBgColor.name}</span>
                                <button
                                  type="button"
                                  onClick={() => removeOption('bgColor')}
                                  className="text-gray-400 hover:text-red-600 text-lg"
                                  aria-label="Remove background color"
                                  data-testid="button-remove-bgColor"
                                >
                                  ×
                                </button>
                              </div>
                              <span className="font-medium text-gray-900">CAD $0.50</span>
                            </div>
                          )}
                          
                          {material !== 1 && (
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-600">Coat Material: {selectedMaterial.name}</span>
                                <button
                                  type="button"
                                  onClick={() => removeOption('material')}
                                  className="text-gray-400 hover:text-red-600 text-lg"
                                  aria-label="Remove coat material"
                                  data-testid="button-remove-material"
                                >
                                  ×
                                </button>
                              </div>
                              <span className="font-medium text-gray-900">CAD $0.50</span>
                            </div>
                          )}
                          
                          {coatColor !== 1 && (
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-600">Coat Color: {selectedCoatColor.name}</span>
                                <button
                                  type="button"
                                  onClick={() => removeOption('coatColor')}
                                  className="text-gray-400 hover:text-red-600 text-lg"
                                  aria-label="Remove coat color"
                                  data-testid="button-remove-coatColor"
                                >
                                  ×
                                </button>
                              </div>
                              <span className="font-medium text-gray-900">CAD $0.50</span>
                            </div>
                          )}
                          
                          {composition && (
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-600">Composition: {compositionLabels[composition]}</span>
                                <button
                                  type="button"
                                  onClick={() => removeOption('composition')}
                                  className="text-gray-400 hover:text-red-600 text-lg"
                                  aria-label="Remove composition"
                                  data-testid="button-remove-composition"
                                >
                                  ×
                                </button>
                              </div>
                              <span className="font-medium text-gray-900">CAD $0.50</span>
                            </div>
                          )}
                          
                          {pose && (
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-600">Pose: {poseLabels[pose]}</span>
                                <button
                                  type="button"
                                  onClick={() => removeOption('pose')}
                                  className="text-gray-400 hover:text-red-600 text-lg"
                                  aria-label="Remove pose"
                                  data-testid="button-remove-pose"
                                >
                                  ×
                                </button>
                              </div>
                              <span className="font-medium text-gray-900">CAD $0.50</span>
                            </div>
                          )}
                          
                          {eyeDirection && (
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-600">Eye Direction: {eyeDirectionLabels[eyeDirection]}</span>
                                <button
                                  type="button"
                                  onClick={() => removeOption('eyeDirection')}
                                  className="text-gray-400 hover:text-red-600 text-lg"
                                  aria-label="Remove eye direction"
                                  data-testid="button-remove-eyeDirection"
                                >
                                  ×
                                </button>
                              </div>
                              <span className="font-medium text-gray-900">CAD $0.50</span>
                            </div>
                          )}
                          
                          {expression && (
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-600">Expression: {expressionLabels[expression]}</span>
                                <button
                                  type="button"
                                  onClick={() => removeOption('expression')}
                                  className="text-gray-400 hover:text-red-600 text-lg"
                                  aria-label="Remove expression"
                                  data-testid="button-remove-expression"
                                >
                                  ×
                                </button>
                              </div>
                              <span className="font-medium text-gray-900">CAD $0.50</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="border-t border-gray-300 pt-3 mt-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-gray-900">Total: CAD ${totalPrice.toFixed(2)}</span>
                                <Badge variant="destructive" className="bg-red-500">Limited Offer</Badge>
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
                        <a 
                          href="#" 
                          onClick={(e) => e.preventDefault()}
                          className="text-primary hover:underline"
                          data-testid="link-privacy-policy"
                        >
                          Privacy Policy
                        </a>
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
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
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
