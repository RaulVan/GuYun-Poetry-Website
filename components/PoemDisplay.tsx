import React, { useState } from 'react';
import { PoemData, PoemLine } from '../types';
import { Info, BookOpen, Quote, Github, ExternalLink } from 'lucide-react';

interface PoemDisplayProps {
  data: PoemData;
  onBack: () => void;
}

const PoemDisplay: React.FC<PoemDisplayProps> = ({ data, onBack }) => {
  const [activeLineId, setActiveLineId] = useState<number | null>(null);

  const activeLineData = data.lines.find(l => l.id === activeLineId);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-paper-50 relative">
      {/* Main Content Area */}
      <div className="flex-1 max-w-4xl mx-auto p-6 lg:p-12 pb-32 lg:pb-12">
        
        {/* Navigation & Metadata Bar */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="text-ink-500 hover:text-black transition-colors flex items-center gap-2 text-sm font-sans font-bold uppercase tracking-widest"
          >
            ← Search
          </button>
          <a 
            href="https://github.com/chinese-poetry/chinese-poetry" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-sans text-ink-500 hover:text-seal-600 transition-colors bg-white px-3 py-1 rounded-full border border-paper-200"
          >
            <Github size={12} />
            <span>Data from chinese-poetry</span>
          </a>
        </div>

        {/* Poem Header */}
        <header className="mb-12 text-center lg:text-left">
           <div className="flex items-center justify-center lg:justify-start gap-3 mb-4 text-ink-500">
              <span className="px-3 py-1 border border-ink-900 rounded-sm text-xs font-sans font-bold tracking-wider uppercase bg-white text-ink-900">
                {data.dynasty} Dynasty
              </span>
              <span className="text-xs font-sans tracking-wider uppercase text-seal-600 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-seal-600 animate-pulse"></span>
                Verified Annotation
              </span>
           </div>
           
           <h1 className="text-5xl lg:text-7xl font-serif font-black text-ink-900 mb-6 tracking-tight leading-none">
             {data.title}
           </h1>
           <div className="flex flex-col lg:flex-row gap-4 items-center lg:items-start text-ink-500">
             <h2 className="text-2xl font-serif text-ink-700">
               <span className="text-ink-400 font-sans text-sm uppercase tracking-widest mr-2">Author</span>
               {data.author}
             </h2>
           </div>
        </header>

        {/* Introduction / Track Info */}
        <div className="bg-white p-6 rounded-sm mb-12 border border-paper-200 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-widest text-ink-400 mb-3">
             About this Poem
          </h3>
          <p className="text-ink-700 font-serif leading-relaxed text-lg">
            {data.introduction}
          </p>
          <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-paper-100">
            {data.themes.map((theme, i) => (
              <span key={i} className="text-xs font-sans font-semibold border border-ink-200 px-2 py-1 rounded text-ink-500 uppercase hover:border-ink-900 hover:text-ink-900 cursor-default transition-colors">
                {theme}
              </span>
            ))}
          </div>
        </div>

        {/* The Poem Lyrics/Lines */}
        <div className="space-y-6 mb-20">
          {data.lines.map((line) => (
            <div 
              key={line.id}
              onClick={() => setActiveLineId(activeLineId === line.id ? null : line.id)}
              className="group relative cursor-pointer"
            >
              <div 
                className={`
                  text-3xl lg:text-4xl font-serif leading-relaxed lg:leading-[1.8] py-2 px-4 -mx-4 rounded transition-all duration-200
                  ${activeLineId === line.id 
                    ? 'bg-genius-active text-ink-900 shadow-sm' 
                    : 'text-ink-700 hover:bg-genius-highlight'
                  }
                `}
              >
                {line.original}
              </div>
              
              {/* Mobile Inline Annotation */}
              {activeLineId === line.id && (
                <div className="lg:hidden mt-4 mb-8 bg-white border border-paper-200 p-6 rounded shadow-xl animate-in fade-in slide-in-from-top-2 relative z-10">
                   <div className="absolute top-0 left-0 w-full h-1 bg-seal-600 rounded-t"></div>
                   <div className="mb-4 pb-4 border-b border-paper-100">
                    <span className="text-xs uppercase tracking-widest text-ink-400 font-bold block mb-1">Pronunciation</span>
                    <p className="font-sans text-ink-600">{line.pinyin}</p>
                  </div>
                  <div className="mb-4">
                    <span className="text-xs uppercase tracking-widest text-ink-400 font-bold block mb-1">Translation</span>
                    <p className="font-serif text-lg text-ink-900 italic">{line.translation}</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-seal-600 font-bold block mb-2">Genius Analysis</span>
                    <p className="font-serif text-ink-700 leading-relaxed text-base">
                      {line.analysis}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar (The "Genius" Panel) */}
      <div className="hidden lg:block w-[450px] border-l border-paper-200 bg-white sticky top-0 h-screen overflow-y-auto custom-scrollbar shadow-xl z-20">
        {activeLineData ? (
          <div className="p-10 animate-in slide-in-from-right-4 duration-300">
             <div className="text-xs font-sans uppercase tracking-widest text-ink-400 mb-8 pb-2 border-b border-paper-200 flex justify-between items-center">
               <span>Annotation</span>
               <span className="text-seal-600 font-bold">Genius Verified</span>
             </div>
             
             {/* Selected Original Line */}
             <div className="mb-8 bg-paper-50 p-6 rounded-lg border border-paper-100">
               <h3 className="text-3xl font-serif text-ink-900 mb-3">{activeLineData.original}</h3>
               <p className="text-ink-500 font-sans text-sm tracking-wide">{activeLineData.pinyin}</p>
             </div>

             {/* Modern Translation */}
             <div className="mb-8">
               <div className="flex items-center gap-2 mb-3 text-ink-900">
                 <Quote size={16} />
                 <span className="text-xs font-bold uppercase tracking-wider">Modern Translation</span>
               </div>
               <p className="text-ink-700 font-serif text-xl italic leading-relaxed pl-4 border-l-2 border-genius-active">
                 {activeLineData.translation}
               </p>
             </div>

             {/* Deep Analysis */}
             <div>
               <div className="flex items-center gap-2 mb-4 text-ink-900 mt-10">
                 <BookOpen size={18} />
                 <span className="font-bold font-sans uppercase tracking-wider text-sm">Literary Analysis</span>
               </div>
               <div className="prose prose-stone prose-lg prose-p:font-serif prose-p:text-ink-600 prose-p:leading-8">
                 <p>
                   {activeLineData.analysis}
                 </p>
               </div>
             </div>
             
             <div className="mt-12 pt-6 border-t border-paper-100 text-center">
               <p className="text-xs text-ink-400 font-sans">
                 Analysis generated based on <br/>
                 <span className="font-semibold text-ink-500">chinese-poetry/chinese-poetry</span> data.
               </p>
             </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center">
            <div className="w-20 h-20 bg-paper-50 rounded-full flex items-center justify-center mb-6 text-ink-300 border border-paper-200">
              <span className="font-serif text-4xl font-bold italic">注</span>
            </div>
            <h3 className="font-sans font-bold text-ink-900 text-lg mb-2">
              Unlock the Meaning
            </h3>
            <p className="font-serif text-ink-500 text-lg leading-relaxed max-w-xs">
              Click on any line to read deep analysis, translation, and historical context.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default PoemDisplay;