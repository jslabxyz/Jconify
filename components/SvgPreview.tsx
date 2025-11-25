
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef, useState } from 'react';
import { Download, CheckCircle2, Code, Image as ImageIcon, FileType, Undo2, Redo2, Copy, RefreshCw } from 'lucide-react';
import { GeneratedSvg } from '../types';

interface SvgPreviewProps {
  data: GeneratedSvg | null;
  onUndo: () => void;
  onRedo: () => void;
  onRegenerate: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const SvgPreview: React.FC<SvgPreviewProps> = ({ data, onUndo, onRedo, onRegenerate, canUndo, canRedo }) => {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset copied state when data changes
  useEffect(() => {
    setCopied(false);
  }, [data]);

  if (!data) return null;

  const getFilename = (prompt: string, extension: string) => {
    const safeName = prompt
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 50); // limit length
    
    return `${safeName || 'icon'}.${extension}`;
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(data.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = async (format: 'svg' | 'png' | 'jpeg') => {
    const filename = getFilename(data.prompt, format === 'jpeg' ? 'jpg' : format);

    if (format === 'svg') {
        const blob = new Blob([data.content], { type: 'image/svg+xml' });
        downloadBlob(blob, filename);
        return;
    }

    setIsExporting(true);
    try {
        const canvas = document.createElement('canvas');
        // Export at high resolution
        const size = 1024;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) throw new Error("Could not get canvas context");

        const img = new Image();
        // Create a blob URL for the SVG to load it into the image
        const svgBlob = new Blob([data.content], {type: 'image/svg+xml;charset=utf-8'});
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            // Background handling
            if (format === 'jpeg') {
                ctx.fillStyle = '#FFFFFF'; // JPEG doesn't support transparency
                ctx.fillRect(0, 0, size, size);
            } else {
                ctx.clearRect(0, 0, size, size);
            }

            ctx.drawImage(img, 0, 0, size, size);
            
            canvas.toBlob((blob) => {
                if (blob) {
                    downloadBlob(blob, filename);
                }
                URL.revokeObjectURL(url);
                setIsExporting(false);
            }, `image/${format}`, 0.95);
        };

        img.onerror = () => {
            console.error("Error loading SVG for export");
            URL.revokeObjectURL(url);
            setIsExporting(false);
        };

        img.src = url;

    } catch (e) {
        console.error("Export failed", e);
        setIsExporting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 sm:mt-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-zinc-900/80 backdrop-blur border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-4 border-b border-white/10 bg-zinc-900/50 gap-4 sm:gap-0">
          
          <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-3 overflow-hidden">
            {/* History & Regenerate Controls */}
            <div className="flex items-center gap-1 border-r border-white/10 pr-3 mr-1">
                <button 
                  onClick={onUndo} 
                  disabled={!canUndo}
                  className={`p-2 sm:p-1.5 rounded-lg transition-colors ${!canUndo ? 'text-zinc-700 cursor-not-allowed' : 'text-zinc-400 hover:text-white hover:bg-white/10'}`}
                  title="Undo"
                >
                  <Undo2 className="w-5 h-5 sm:w-4 sm:h-4" />
                </button>
                <button 
                  onClick={onRegenerate}
                  className="p-2 sm:p-1.5 rounded-lg transition-colors text-blue-400 hover:text-white hover:bg-blue-500/20"
                  title="Regenerate Variation"
                >
                  <RefreshCw className="w-5 h-5 sm:w-4 sm:h-4" />
                </button>
                <button 
                  onClick={onRedo} 
                  disabled={!canRedo}
                  className={`p-2 sm:p-1.5 rounded-lg transition-colors ${!canRedo ? 'text-zinc-700 cursor-not-allowed' : 'text-zinc-400 hover:text-white hover:bg-white/10'}`}
                  title="Redo"
                >
                  <Redo2 className="w-5 h-5 sm:w-4 sm:h-4" />
                </button>
            </div>

            <h3 className="text-sm font-medium text-zinc-300 truncate max-w-[180px] sm:max-w-xs text-left">
              <span className="sm:hidden">Result: </span>
              <span className="text-zinc-500">"{data.prompt}"</span>
            </h3>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyCode}
              className="flex-1 sm:flex-none p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex justify-center mr-1 sm:mr-2"
              title="Copy SVG Code"
            >
              {copied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Code className="w-5 h-5" />}
            </button>

            <button
              onClick={handleCopyCode}
              className="flex-1 sm:flex-none p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex justify-center mr-1 sm:mr-2"
              title="Copy SVG to Clipboard"
            >
              {copied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
            </button>
            
            <span className="text-xs text-zinc-600 font-medium uppercase tracking-wider hidden sm:block mr-1">Export:</span>
            
            <div className="flex gap-2 w-full sm:w-auto justify-end">
                <div className="relative group flex-1 sm:flex-none">
                <button
                    onClick={() => handleExport('svg')}
                    disabled={isExporting}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 text-xs font-semibold text-zinc-300 bg-zinc-800 border border-white/5 rounded-lg hover:bg-zinc-700 hover:text-white transition-colors"
                >
                    <FileType className="w-3.5 h-3.5" />
                    <span className="sm:inline">SVG</span>
                </button>
                <div className="absolute top-full right-0 mt-2 px-3 py-1.5 text-[10px] text-zinc-200 bg-zinc-900 border border-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-50 hidden sm:block">
                    Vector format • Infinite scaling
                </div>
                </div>

                <div className="relative group flex-1 sm:flex-none">
                <button
                    onClick={() => handleExport('png')}
                    disabled={isExporting}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 text-xs font-semibold text-zinc-300 bg-zinc-800 border border-white/5 rounded-lg hover:bg-zinc-700 hover:text-white transition-colors"
                >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span className="sm:inline">PNG</span>
                </button>
                <div className="absolute top-full right-0 mt-2 px-3 py-1.5 text-[10px] text-zinc-200 bg-zinc-900 border border-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-50 hidden sm:block">
                    High quality • Transparent background
                </div>
                </div>

                <div className="relative group flex-1 sm:flex-none">
                <button
                    onClick={() => handleExport('jpeg')}
                    disabled={isExporting}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 text-xs font-semibold text-zinc-300 bg-zinc-800 border border-white/5 rounded-lg hover:bg-zinc-700 hover:text-white transition-colors"
                >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span className="sm:inline">JPG</span>
                </button>
                <div className="absolute top-full right-0 mt-2 px-3 py-1.5 text-[10px] text-zinc-200 bg-zinc-900 border border-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-50 hidden sm:block">
                    Small file size • White background
                </div>
                </div>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="p-4 sm:p-8 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-zinc-950/50 min-h-[300px] sm:min-h-[400px]">
           {/* 
             Using dangerouslySetInnerHTML is intentional here as the content is generated by the LLM for the purpose of display.
           */}
          <div 
            ref={containerRef}
            className="w-full max-w-[240px] sm:max-w-[320px] h-auto transition-all duration-500 transform hover:scale-[1.02] filter drop-shadow-2xl"
            dangerouslySetInnerHTML={{ __html: data.content }} 
          />
        </div>
        
        {/* Metadata Footer */}
        <div className="px-4 py-2 bg-zinc-950 border-t border-white/5 flex flex-col sm:flex-row justify-between text-xs text-zinc-600 gap-1 sm:gap-0">
          <span>Generated by Gemini 2.5 Flash</span>
          <span>1024x1024 Export Resolution</span>
        </div>
      </div>
    </div>
  );
};
