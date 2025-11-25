/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { Search, PenLine } from 'lucide-react';
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
    <div className="w-full max-w-5xl mx-auto mt-20 px-4 mb-20">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Icon Library</h2>
          <p className="text-zinc-400 text-sm">Browse pre-generated icons and remix them.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-zinc-800 rounded-lg leading-5 bg-zinc-900 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:bg-zinc-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-colors"
            placeholder="Search library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {filteredIcons.map((icon) => (
          <div 
            key={icon.id}
            className="group relative bg-zinc-900 border border-white/5 rounded-xl p-4 transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
          >
            <div className="aspect-square flex items-center justify-center text-zinc-300 mb-3 bg-zinc-950/50 rounded-lg p-4 group-hover:text-blue-400 transition-colors">
               <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: icon.content }} />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-zinc-300 truncate">{icon.prompt.split(' ').slice(0, 3).join(' ')}</h3>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">{icon.style}</span>
                
                <button
                  onClick={() => onSelect(icon.prompt, icon.style)}
                  className="flex items-center gap-1 text-[10px] font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-300"
                >
                  <PenLine className="w-3 h-3" />
                  Modify
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {filteredIcons.length === 0 && (
          <div className="col-span-full py-12 text-center text-zinc-500">
            No icons found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};
