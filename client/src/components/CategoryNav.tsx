import { useState } from "react";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "pre-processed", label: "Pre-Processed", active: true },
  { id: "hard-portrait", label: "Hard Portrait", active: false },
  { id: "ai-photo", label: "AI Photo", active: false },
  { id: "social-avatar", label: "Social Avatar Deluxe", active: false },
  { id: "coming-soon", label: "More Coming Soon", active: false },
];

export default function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState("pre-processed");

  return (
    <div className="flex flex-wrap gap-3 justify-start" data-testid="category-nav">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "secondary"}
          size="sm"
          className="rounded-full"
          onClick={() => {
            setActiveCategory(category.id);
            console.log("Category selected:", category.label);
          }}
          data-testid={`button-category-${category.id}`}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}
