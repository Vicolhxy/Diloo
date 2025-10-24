import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const categories = [
  { id: "pro-headshot", label: "Pro Headshot" },
  { id: "bw-portrait", label: "B&W Portrait" },
  { id: "id-photos", label: "ID Photos" },
  { id: "social-avatar", label: "Social Avatar Decors" },
];

export default function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState("pro-headshot");

  return (
    <div className="w-full bg-gray-50" data-testid="category-nav">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary text-black font-bold'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-primary'
                }`}
                onClick={() => setActiveCategory(category.id)}
                data-testid={`button-category-${category.id}`}
              >
                {category.label}
              </button>
            ))}
            <span className="px-6 py-2 text-sm text-gray-400" data-testid="text-coming-soon">
              More Coming Soon...
            </span>
          </div>
          
          <Link href="/upload?style=3">
            <Button 
              className="bg-primary text-black font-bold hover:bg-primary/90"
              data-testid="button-category-create-now"
            >
              Create Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
