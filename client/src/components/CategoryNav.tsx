import { useState } from "react";

const categories = [
  { id: "pro-headshot", label: "Pro Headshot", style: "active" },
  { id: "bw-portrait", label: "B&W Portrait", style: "border" },
  { id: "id-photo", label: "ID Photo", style: "border" },
  { id: "social-avatar", label: "Social Avatar Decors", style: "border" },
  { id: "coming-soon", label: "More Coming Soon...", style: "text" },
];

export default function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState("pro-headshot");

  const getButtonClasses = (category: typeof categories[0]) => {
    const baseClasses = "inline-flex justify-center items-center gap-2 px-8 py-2.5 rounded-3xl font-sans text-base font-normal cursor-pointer transition-all";
    
    if (category.style === "active" && activeCategory === category.id) {
      return `${baseClasses} bg-[#25ced1] text-white font-bold`;
    } else if (category.style === "border") {
      return `${baseClasses} border border-[#43bc72] ${activeCategory === category.id ? 'bg-[#25ced1] text-white font-bold border-transparent' : 'text-black'}`;
    } else {
      return `${baseClasses} text-[#959595]`;
    }
  };

  return (
    <div className="w-full max-w-[1920px] h-[79px] flex items-center gap-[30px] px-[100px] py-5 overflow-hidden" data-testid="category-nav">
      {categories.map((category) => (
        <button
          key={category.id}
          className={getButtonClasses(category)}
          onClick={() => {
            if (category.style !== "text") {
              setActiveCategory(category.id);
              console.log("Category selected:", category.label);
            }
          }}
          data-testid={`button-category-${category.id}`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
