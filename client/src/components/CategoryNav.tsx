const categories = [
  { id: "pro-headshot", label: "Pro Headshot" },
  { id: "id-photo", label: "ID Photo" },
  { id: "social-avatar", label: "Social Avatar Decors" },
];

interface CategoryNavProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function CategoryNav({ activeCategory, setActiveCategory }: CategoryNavProps) {

  return (
    <div className="w-full bg-gray-50" data-testid="category-nav">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl py-4 mt-[20px] mb-[20px] pt-[0px] pb-[0px]">
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
      </div>
    </div>
  );
}
