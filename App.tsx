import React, { useState } from 'react';
import SearchHero from './components/SearchHero';
import PoemDisplay from './components/PoemDisplay';
import Loading from './components/Loading';
import { fetchPoemData } from './services/geminiService';
import { PoemData, ViewState } from './types';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('HOME');
  const [poemData, setPoemData] = useState<PoemData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setViewState('SEARCHING');
    setErrorMsg(null);
    try {
      const data = await fetchPoemData(query);
      setPoemData(data);
      setViewState('POEM_VIEW');
    } catch (err) {
      console.error(err);
      setErrorMsg("Unable to find or generate this poem. Please try another query.");
      setViewState('ERROR');
    }
  };

  const reset = () => {
    setViewState('HOME');
    setPoemData(null);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-paper-50 text-ink-900 font-serif selection:bg-genius-highlight selection:text-ink-900">
      {viewState === 'HOME' && (
        <SearchHero onSearch={handleSearch} />
      )}

      {viewState === 'SEARCHING' && (
        <Loading />
      )}

      {viewState === 'POEM_VIEW' && poemData && (
        <PoemDisplay data={poemData} onBack={reset} />
      )}

      {viewState === 'ERROR' && (
         <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
            <div className="text-6xl mb-4 text-seal-600 opacity-50">?</div>
            <h2 className="text-2xl font-bold mb-2">Poem Not Found</h2>
            <p className="text-ink-500 mb-8 max-w-md">{errorMsg}</p>
            <button 
              onClick={reset}
              className="px-6 py-3 bg-ink-900 text-white rounded-lg hover:bg-seal-600 transition-colors"
            >
              Try Again
            </button>
         </div>
      )}
    </div>
  );
};

export default App;
