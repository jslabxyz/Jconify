/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { SvgPreview } from './components/SvgPreview';
import { IconLibrary } from './components/IconLibrary';
import { generateSvgFromPrompt } from './services/geminiService';
import { GeneratedSvg, GenerationStatus, ApiError } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  
  // Input State (Lifted from InputSection)
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Flat');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // History State Management
  const [history, setHistory] = useState<GeneratedSvg[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [error, setError] = useState<ApiError | null>(null);

  // Derived state for the currently visible SVG
  const currentSvg = currentIndex >= 0 ? history[currentIndex] : null;

  const handleGenerate = async (genPrompt: string, genStyle: string, genImage?: string) => {
    setStatus(GenerationStatus.LOADING);
    setError(null);
    // Note: We do not clear currentSvg here so the previous result remains visible during generation.

    try {
      const svgContent = await generateSvgFromPrompt(genPrompt, genStyle, genImage);
      
      const newSvg: GeneratedSvg = {
        id: crypto.randomUUID(),
        content: svgContent,
        // Append style to prompt for history/display clarity and better filenames
        prompt: `${genPrompt || 'Image Reference'} (${genStyle})`,
        timestamp: Date.now()
      };
      
      // Update history: remove any "redo" future if we are in the middle of the stack, then add new
      const newHistory = history.slice(0, currentIndex + 1).concat(newSvg);
      
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
      setStatus(GenerationStatus.SUCCESS);
    } catch (err: any) {
      setStatus(GenerationStatus.ERROR);
      setError({
        message: "Generation Failed",
        details: err.message || "An unexpected error occurred while contacting Gemini."
      });
    }
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      // Clear error state when navigating history
      if (status === GenerationStatus.ERROR) setStatus(GenerationStatus.SUCCESS);
    }
  };

  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1);
      if (status === GenerationStatus.ERROR) setStatus(GenerationStatus.SUCCESS);
    }
  };

  const handleSelectLibraryIcon = (newPrompt: string, newStyle: string) => {
    setPrompt(newPrompt);
    setSelectedStyle(newStyle);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30">
      <Header />
      
      <main className="pb-20">
        <InputSection 
          prompt={prompt}
          setPrompt={setPrompt}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          onGenerate={handleGenerate} 
          status={status} 
        />
        
        {status === GenerationStatus.ERROR && error && (
          <div className="max-w-2xl mx-auto mt-8 px-4">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 text-red-200">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-400">{error.message}</h4>
                <p className="text-sm text-red-300/70 mt-1">{error.details}</p>
              </div>
            </div>
          </div>
        )}

        {currentSvg && (
          <SvgPreview 
            data={currentSvg} 
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={currentIndex > 0}
            canRedo={currentIndex < history.length - 1}
          />
        )}
        
        {/* Empty State / Placeholder - Show only if no content is available */}
        {!currentSvg && (
          <div className="max-w-2xl mx-auto mt-16 text-center px-4 opacity-50 pointer-events-none select-none">
             <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-zinc-900/50 border border-white/5 mb-4">
                <svg className="w-12 h-12 text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                   <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                   <circle cx="8.5" cy="8.5" r="1.5" />
                   <polyline points="21 15 16 10 5 21" />
                </svg>
             </div>
             <p className="text-zinc-600 text-sm">Generated icons will appear here</p>
          </div>
        )}

        <IconLibrary onSelect={handleSelectLibraryIcon} />
      </main>
    </div>
  );
};

export default App;
