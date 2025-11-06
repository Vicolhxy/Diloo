import { useMemo } from "react";
import { Link, useSearch } from "wouter";

const styles = [
  { id: "1", name: "Pro Headshot" },
  { id: "2", name: "ID Photo" },
  { id: "3", name: "Social Avatar Decors" },
];

export default function StyleTabNav() {
  const searchString = useSearch();
  
  const activeStyleId = useMemo(() => {
    const params = new URLSearchParams(searchString);
    return params.get('style') || "1";
  }, [searchString]);

  return (
    <div className="w-full bg-gray-50" data-testid="style-tab-nav">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl pt-10 pb-4">
        <div className="flex flex-wrap items-center gap-3">
          {styles.map((style) => (
            <Link key={style.id} href={`/upload?style=${style.id}`}>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeStyleId === style.id
                    ? 'bg-primary text-black font-bold'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-primary'
                }`}
                data-testid={`tab-style-${style.id}`}
              >
                {style.name}
              </button>
            </Link>
          ))}
          <span className="px-6 py-2 text-sm text-gray-400" data-testid="text-coming-soon">
            More Coming Soon...
          </span>
        </div>
      </div>
    </div>
  );
}
