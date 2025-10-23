import { useState, useMemo } from "react";
import { Link, useSearch } from "wouter";
import { ChevronLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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

const checkoutFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  sameAsBilling: z.boolean().default(false),
  billingAddress: z.string().optional(),
  billingCity: z.string().optional(),
  billingPostalCode: z.string().optional(),
  billingCountry: z.string().optional(),
  cardNumber: z.string().min(13, "Card number must be at least 13 digits"),
  cardName: z.string().min(2, "Cardholder name is required"),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, "Format: MM/YY"),
  cvv: z.string().min(3, "CVV must be 3 or 4 digits"),
});

type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

export default function Checkout() {
  const searchString = useSearch();
  const [sameAsBilling, setSameAsBilling] = useState(false);

  const { bgColor, material, coatColor } = useMemo(() => {
    const params = new URLSearchParams(searchString);
    return {
      bgColor: parseInt(params.get('bgColor') || '1'),
      material: parseInt(params.get('material') || '1'),
      coatColor: parseInt(params.get('coatColor') || '1'),
    };
  }, [searchString]);

  const selectedBgColor = backgroundColors.find(c => c.id === bgColor) || backgroundColors[0];
  const selectedMaterial = materials.find(m => m.id === material) || materials[0];
  const selectedCoatColor = coatColors.find(c => c.id === coatColor) || coatColors[0];

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      sameAsBilling: false,
      billingAddress: "",
      billingCity: "",
      billingPostalCode: "",
      billingCountry: "",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    console.log("Payment submitted:", data);
  };

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
                
                {/* Photo with Watermark */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-300">
                  {/* Diagonal Watermark Matrix */}
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute text-white text-4xl font-bold opacity-30 select-none"
                        style={{
                          top: `${(i % 5) * 80}px`,
                          left: `${Math.floor(i / 5) * 80}px`,
                          transform: 'rotate(-45deg)',
                        }}
                      >
                        DILOO
                      </div>
                    ))}
                  </div>
                </div>

                {/* Parameters */}
                <div className="mt-6 space-y-3" data-testid="section-parameters">
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Background Color</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded ${selectedBgColor.color}`}></div>
                      <span className="text-sm font-medium text-gray-900">{selectedBgColor.name}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Coat Material</span>
                    <span className="text-sm font-medium text-gray-900">{selectedMaterial.name}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Coat Color</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded ${selectedCoatColor.color}`}></div>
                      <span className="text-sm font-medium text-gray-900">{selectedCoatColor.name}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Resolution</span>
                    <span className="text-sm font-medium text-gray-900">2048 × 2732 pixels</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-8 p-4 bg-primary/10 rounded-xl" data-testid="section-price">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl font-bold text-gray-900">CAD $2.99</span>
                        <Badge variant="destructive" className="bg-red-500">Limited Time Offer</Badge>
                      </div>
                      <p className="text-sm text-gray-600">High-resolution AI-generated photo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Payment Form */}
            <div className="bg-white rounded-2xl p-8" data-testid="section-payment-form">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Payment Information</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Personal Information</h3>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} data-testid="input-fullname" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 234 567 8900" {...field} data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St" {...field} data-testid="input-address" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="Toronto" {...field} data-testid="input-city" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input placeholder="M5V 3A8" {...field} data-testid="input-postalcode" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input placeholder="Canada" {...field} data-testid="input-country" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Billing Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Billing Information</h3>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox 
                        id="sameAsBilling" 
                        checked={sameAsBilling}
                        onCheckedChange={(checked) => setSameAsBilling(checked as boolean)}
                        data-testid="checkbox-same-billing"
                      />
                      <label
                        htmlFor="sameAsBilling"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Same as personal information
                      </label>
                    </div>

                    {!sameAsBilling && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="billingAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Billing Address</FormLabel>
                              <FormControl>
                                <Input placeholder="123 Billing St" {...field} data-testid="input-billing-address" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="billingCity"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="Vancouver" {...field} data-testid="input-billing-city" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="billingPostalCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="V6B 1A1" {...field} data-testid="input-billing-postalcode" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="billingCountry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Input placeholder="Canada" {...field} data-testid="input-billing-country" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>

                  {/* Payment Card Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Payment Card</h3>
                    
                    {/* Payment Methods Icons */}
                    <div className="flex gap-3 mb-4" data-testid="payment-methods">
                      <div className="px-3 py-2 border rounded-md bg-white">
                        <span className="text-xs font-semibold text-blue-600">VISA</span>
                      </div>
                      <div className="px-3 py-2 border rounded-md bg-white">
                        <span className="text-xs font-semibold text-orange-600">MASTERCARD</span>
                      </div>
                      <div className="px-3 py-2 border rounded-md bg-white">
                        <span className="text-xs font-semibold text-blue-500">AMEX</span>
                      </div>
                      <div className="px-3 py-2 border rounded-md bg-white">
                        <span className="text-xs font-semibold text-red-600">UNIONPAY</span>
                      </div>
                      <div className="px-3 py-2 border rounded-md bg-white">
                        <span className="text-xs font-semibold text-blue-700">PAYPAL</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input placeholder="1234 5678 9012 3456" {...field} data-testid="input-card-number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cardholder Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} data-testid="input-card-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YY" {...field} data-testid="input-expiry-date" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input placeholder="123" {...field} data-testid="input-cvv" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit"
                    className="w-full bg-primary text-white hover:bg-primary/90 h-12 text-base"
                    data-testid="button-pay-now"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Pay CAD $2.99
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
