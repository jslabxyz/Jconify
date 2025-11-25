/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 flex justify-center sticky top-0 z-50 pointer-events-none">
      <div className="pointer-events-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 flex items-center gap-3 shadow-2xl shadow-black/50 ring-1 ring-white/5">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/20">
          <Sparkles className="w-4 h-4 text-white" />
          <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
        </div>
        <h1 className="text-lg font-bold tracking-tight text-white">
          Jconify
        </h1>
        <div className="h-4 w-px bg-white/10 mx-1"></div>
        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
          v2.0
        </span>
      </div>
    </header>
  );
};