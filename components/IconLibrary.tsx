/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { LIBRARY_ICONS } from '../data/library';

interface IconLibraryProps {
  onSelect: (prompt: string, style: string) => void;
}

export const IconLibrary: React.FC<IconLibraryProps> = ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIcons = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return LIBRARY_ICONS.filter(icon => 
      icon.prompt.toLowerCase().includes(query) || 
      icon.style.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto mt-20 px-6 mb-24">
      <div className="flex flex-col md:flex-row items-end md:items-center justify-between mb-8 gap-6 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            Asset Library
          </h2>
          <p className="text-slate-500 text-xs font-mono mt-1 uppercase tracking-widest">
            Pre-rendered vector modules
          </p>
        </div>
        
        <div className="relative w-full md:w-72 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-600 group-focus-within:text-cyan-400 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2 bg-[#0b0c15] border border-white/10 rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 text-sm font-mono transition-all"
            placeholder="Search database..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredIcons.map((icon) => (
          <div 
            key={icon.id}
            className="group relative bg-[#0b0c15] border border-white/5 rounded-xl p-3 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] cursor-pointer overflow-hidden"
            onClick={() => onSelect(icon.prompt, icon.style)}
          >
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="aspect-square flex items-center justify-center text-slate-500 bg-black/40 rounded-lg p-4 group-hover:text-cyan-50 transition-colors relative z-10">
               <div className="w-full h-full transform group-hover:scale-110 transition-transform duration-500 ease-out" dangerouslySetInnerHTML={{ __html: icon.content }} />
            </div>
            
            <div className="mt-3 flex items-center justify-between relative z-10">
              <div className="flex flex-col min-w-0 pr-2">
                 <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate group-hover:text-white transition-colors">{icon.prompt.split(' ')[0]}</h3>
                 <span className="text-[9px] font-mono text-slate-600">{icon.style}</span>
              </div>
              
              <button
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded bg-white/5 text-slate-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-cyan-500 hover:text-black transform translate-y-2 group-hover:translate-y-0"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};