/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useCallback } from 'react';
import { Send, Loader2, Sparkles, Palette } from 'lucide-react';
import { GenerationStatus } from '../types';

interface InputSectionProps {
  onGenerate: (prompt: string, style: string) => void;
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

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && status !== GenerationStatus.LOADING) {
      onGenerate(input.trim(), selectedStyle);
    }
  }, [input, selectedStyle, status, onGenerate]);

  const isLoading = status === GenerationStatus.LOADING;

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 mb-3">
          Design Custom Icons
        </h2>
        <p className="text-zinc-400 text-lg">
          Describe the icon you need, select a style, and we'll generate a professional vector.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group z-10">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur-lg"></div>
        <div className="relative flex items-center bg-zinc-900 rounded-xl border border-white/10 shadow-2xl overflow-hidden p-2">
          <div className="pl-4 text-zinc-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. Minimalist home, settings gear, rocket ship..."
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-zinc-500 px-4 py-3 text-lg"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`
              flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200
              ${!input.trim() || isLoading 
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