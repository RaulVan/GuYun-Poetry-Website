import React, { useState } from 'react';
import { Search, Sparkles, Github } from 'lucide-react';

interface SearchHeroProps {
  onSearch: (query: string) => void;
}

const SUGGESTIONS = [
  "Li Bai Jing Ye Si",
  "Su Shi Chi Bi Fu",
  "Du Fu Chun Wang",
  "Song Ci",
  "Shi Jing"
];

const SearchHero: React.FC<SearchHeroProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-paper-50 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-genius-active/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-ink-900/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="max-w-3xl w-full relative z-10 text-center">
        <div className="mb-10 inline-flex flex-col items-center">
          <div className="w-20 h-20 bg-ink-900 text-genius-active font-serif text-5xl flex items-center justify-center rounded-sm shadow-xl mb-6">
            古
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-black text-ink-900 mb-2 tracking-tighter">
            GuYun
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-0.5 bg-genius-active text-ink-900 text-xs font-bold uppercase tracking-widest rounded-sm">
              Genius
            </span>
            <span className="text-ink-500 font-sans tracking-widest uppercase text-xs font-semibold">
              Ancient Poetry Knowledge Base
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative w-full mb-8 max-w-xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search poems from chinese-poetry repo..."
            className="w-full p-5 pl-14 rounded-lg bg-white border-2 border-ink-900 focus:outline-none focus:ring-4 focus:ring-genius-active/50 shadow-lg hover:shadow-xl transition-all font-serif text-lg text-ink-900 placeholder:text-ink-300 placeholder:font-sans"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-ink-900" size={24} />
          <button 
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-ink-900 text-white px-6 py-2 rounded font-sans text-sm font-bold uppercase tracking-wide hover:bg-seal-600 transition-colors"
          >
            Search
          </button>
        </form>

        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-2 text-ink-400 text-xs font-sans uppercase tracking-widest font-bold">
            <Sparkles size={12} />
            <span>Popular in Database</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => onSearch(s)}
                className="px-4 py-2 bg-white border border-paper-200 rounded text-ink-600 font-serif text-sm hover:border-ink-900 hover:text-ink-900 transition-colors shadow-sm"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <footer className="absolute bottom-8 text-center w-full flex flex-col items-center gap-2">
         <a 
           href="https://github.com/chinese-poetry/chinese-poetry" 
           target="_blank" 
           rel="noreferrer"
           className="inline-flex items-center gap-2 text-ink-400 hover:text-ink-900 transition-colors text-xs font-sans uppercase tracking-wider"
         >
           <Github size={14} />
           <span>Data Source: chinese-poetry/chinese-poetry</span>
         </a>
      </footer>
    </div>
  );
};

export default SearchHero;