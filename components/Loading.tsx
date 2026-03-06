import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-pulse">
      <div className="w-20 h-20 border-8 border-paper-200 border-t-ink-900 rounded-full animate-spin mb-8"></div>
      <h3 className="text-ink-900 font-serif text-2xl font-bold mb-2 tracking-tight">
        Consulting the Archives
      </h3>
      <p className="text-ink-500 font-sans text-sm uppercase tracking-widest">
        Retrieving from chinese-poetry database...
      </p>
    </div>
  );
};

export default Loading;