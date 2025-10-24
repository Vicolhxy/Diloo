import { useMemo } from "react";
import { Link, useSearch } from "wouter";

const styles = [
  { id: "1", name: "Pre-Processed" },
  { id: "2", name: "Hard Portrait" },
  { id: "3", name: "AI Photo" },
  { id: "4", name: "ID Photo" },
  { id: "5", name: "Social Avatar" },
  { id: "6", name: "Business" },
  { id: "7", name: "Professional" },
  { id: "8", name: "Artistic" },
];

export default function StyleTabNav() {
  const searchString = useSearch();
  
  const activeStyleId = useMemo(() => {
    const params = new URLSearchParams(searchString);
    return params.get('style') || "3";
  }, [searchString]);

  return (
    <div className="w-full bg-white border-b border-gray-200" data-testid="style-tab-nav">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl py-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          {styles.map((style) => (
            <Link key={style.id} href={`/upload?style=${style.id}`}>
              <div
                className={`flex-shrink-0 px-4 py-2 rounded-lg cursor-pointer transition-all font-medium text-sm ${
                  activeStyleId === style.id
                    ? 'bg-primary text-black'
                    : 'bg-gray-100 text-gray-700 hover-elevate'
                }`}
                data-testid={`tab-style-${style.id}`}
              >
                {style.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
