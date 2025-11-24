/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useCallback, useRef } from 'react';
import { Send, Loader2, Sparkles, Palette, ImagePlus, X } from 'lucide-react';
import { GenerationStatus } from '../types';

interface InputSectionProps {
  onGenerate: (prompt: string, style: string, image?: string) => void;
  status: GenerationStatus;
}

const ICON_STYLES = [
  { id: 'Flat', label: 'Flat' },
  { id: 'Line Art', label: 'Line Art' },
  { id: 'Solid', label: 'Solid' },
  { id: 'Duotone', label: 'Duotone' },
  { id: 'Gradient', label: 'Gradient' },
  { id: 'Pixel', label: 'Pixel' },
  { id: 'Sticker', label: 'Sticker' },
];

export const InputSection: React.FC<InputSectionProps> = ({ onGenerate, status }) => {
  const [input, setInput] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Flat');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if ((input.trim() || selectedImage) && status !== GenerationStatus.LOADING) {
      onGenerate(input.trim(), selectedStyle, selectedImage || undefined);
    }
  }, [input, selectedStyle, selectedImage, status, onGenerate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isLoading = status === GenerationStatus.LOADING;

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 mb-3">
          Design Custom Icons
        </h2>
        <p className="text-zinc-400 text-lg">
          Describe the icon you need or upload an image as reference.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group z-10">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur-lg"></div>
        
        <div className="relative bg-zinc-900 rounded-xl border border-white/10 shadow-2xl overflow-hidden p-2">
          {selectedImage && (
            <div className="px-4 pt-3 pb-1 flex items-start gap-3 border-b border-white/5 mb-1">
              <div className="relative group/img">
                <img 
                  src={selectedImage} 
                  alt="Reference" 
                  className="w-16 h-16 object-cover rounded-lg border border-white/10" 
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-zinc-800 text-zinc-400 hover:text-red-400 border border-white/10 rounded-full p-0.5 shadow-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                <span className="font-medium text-zinc-300">Image Reference Attached</span>
                <p>The AI will use this image as a visual guide for the icon structure.</p>
              </div>
            </div>
          )}

          <div className="flex items-center">
            <div className="pl-3 pr-2 border-r border-white/5 mr-2">
               <input 
                 type="file" 
                 accept="image/*" 
                 className="hidden" 
                 ref={fileInputRef}
                 onChange={handleFileChange}
                 disabled={isLoading}
               />
               <button
                 type="button"
                 onClick={() => fileInputRef.current?.click()}
                 className={`p-2 rounded-lg transition-colors ${selectedImage ? 'text-blue-400 bg-blue-400/10' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'}`}
                 title="Upload Reference Image"
                 disabled={isLoading}
               >
                 <ImagePlus className="w-5 h-5" />
               </button>
            </div>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={selectedImage ? "Add instructions (optional)..." : "e.g. Minimalist home, settings gear..."}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-zinc-500 px-2 py-3 text-lg"
              disabled={isLoading}
            />
            
            <button
              type="submit"
              disabled={(!input.trim() && !selectedImage) || isLoading}
              className={`
                flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ml-2
                ${(!input.trim() && !selectedImage) || isLoading 
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                  : 'bg-white text-zinc-950 hover:bg-zinc-200 active:scale-95 shadow-lg shadow-white/10'}
              `}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="hidden sm:inline">Creating...</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Generate</span>
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
      
      {/* Style Selector */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider pl-1">
          <Palette className="w-3 h-3" />
          <span>Select Style</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {ICON_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              disabled={isLoading}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border
                ${selectedStyle === style.id 
                  ? 'bg-blue-500/10 border-blue-500/50 text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                  : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 hover:border-white/10'}
              `}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Quick suggestions */}
      <div className="mt-6 pt-6 border-t border-white/5">
        <div className="text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-3 pl-1">
          Try Examples
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            'Cloud Upload', 
            'Secure Shield', 
            'Analytics Graph', 
            'Mail Envelope',
            'User Profile',
            'Settings Gear'
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInput(suggestion)}
              className="px-3 py-1.5 text-xs font-medium text-zinc-500 bg-zinc-900/30 border border-white/5 rounded-full hover:bg-zinc-800 hover:text-white hover:border-white/20 transition-all"
              disabled={isLoading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};