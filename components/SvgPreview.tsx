/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Code, Image as ImageIcon, FileType, Undo2, Redo2, Copy, RefreshCw, ZoomIn, ZoomOut, RotateCcw, ChevronDown } from 'lucide-react';
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
  const [exportSize, setExportSize] = useState(1024);
  
  // Viewport State
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset copied state and view when data changes
  useEffect(() => {
    setCopied(false);
    setZoom(1);
    setPan({ x: 0, y: 0 });
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
        const size = exportSize;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) throw new Error("Could not get canvas context");

        const img = new Image();
        const svgBlob = new Blob([data.content], {type: 'image/svg+xml;charset=utf-8'});
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            if (format === 'jpeg') {
                ctx.fillStyle = '#FFFFFF';
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

  // Viewport Handlers
  const handleWheel = (e: React.WheelEvent) => {
    const zoomSpeed = 0.001;
    const delta = -e.deltaY * zoomSpeed;
    const newZoom = Math.min(Math.max(0.1, zoom + delta * 2), 5); 
    setZoom(newZoom);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; 
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      
      {/* Main Interface Frame */}
      <div className="bg-[#0b0c15] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
        
        {/* Top HUD Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 bg-[#0b0c15] border-b border-white/5 gap-4 sm:gap-0 relative z-20">
          
          <div className="flex items-center w-full sm:w-auto gap-4">
            <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/5">
                <button 
                  onClick={onUndo} 
                  disabled={!canUndo}
                  className={`p-1.5 rounded-md transition-all ${!canUndo ? 'text-slate-700' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                >
                  <Undo2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={onRegenerate}
                  className="p-1.5 rounded-md transition-all text-cyan-400 hover:text-cyan-200 hover:bg-cyan-500/10"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button 
                  onClick={onRedo} 
                  disabled={!canRedo}
                  className={`p-1.5 rounded-md transition-all ${!canRedo ? 'text-slate-700' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                >
                  <Redo2 className="w-4 h-4" />
                </button>
            </div>

            <div className="hidden sm:block h-4 w-px bg-white/10"></div>
            
            <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest truncate max-w-[150px] sm:max-w-xs">
              ID: {data.id.slice(0, 8)} // {data.style}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
             <div className="flex gap-2">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-colors"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <Code className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">Copy Code</span>
                </button>
             </div>

             <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
            
            <div className="flex items-center gap-2">
                {/* Res Selector */}
                <div className="relative group/res">
                   <select 
                      value={exportSize}
                      onChange={(e) => setExportSize(Number(e.target.value))}
                      className="appearance-none bg-black border border-white/10 text-slate-400 hover:text-white text-[10px] font-mono rounded-lg pl-2 pr-6 py-1.5 cursor-pointer outline-none focus:border-cyan-500/50 transition-colors"
                   >
                      <option value="512">512px</option>
                      <option value="1024">1024px</option>
                      <option value="2048">2048px</option>
                      <option value="4096">4096px</option>
                   </select>
                   <ChevronDown className="w-3 h-3 text-slate-500 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Exports */}
                <div className="flex gap-1">
                    {[
                      { id: 'svg', label: 'SVG', icon: FileType },
                      { id: 'png', label: 'PNG', icon: ImageIcon },
                      { id: 'jpeg', label: 'JPG', icon: ImageIcon }
                    ].map((fmt) => (
                        <button
                            key={fmt.id}
                            onClick={() => handleExport(fmt.id as any)}
                            disabled={isExporting}
                            className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 hover:text-black hover:bg-white rounded-md transition-all border border-transparent hover:border-white/20 uppercase tracking-wide"
                        >
                            {fmt.label}
                        </button>
                    ))}
                </div>
            </div>
          </div>
        </div>

        {/* Viewport Area */}
        <div 
          className={`relative overflow-hidden flex items-center justify-center bg-[#05050A] min-h-[400px] sm:min-h-[500px] group/canvas select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
           {/* Technical Grid Background */}
           <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{ 
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}>
           </div>
           
           {/* HUD Corners */}
           <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-white/20 pointer-events-none"></div>
           <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/20 pointer-events-none"></div>
           <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-white/20 pointer-events-none"></div>
           <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-white/20 pointer-events-none"></div>

           {/* Floating View Controls */}
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-1 bg-black/80 backdrop-blur-md border border-white/10 p-1.5 rounded-full shadow-2xl opacity-0 group-hover/canvas:opacity-100 transition-opacity duration-300">
               <button 
                 onClick={() => setZoom(z => Math.max(0.1, z - 0.2))} 
                 className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
               >
                 <ZoomOut className="w-4 h-4" />
               </button>
               <div className="w-px bg-white/10 my-1"></div>
               <button 
                 onClick={handleResetView} 
                 className="px-3 text-xs font-mono text-cyan-400 hover:text-cyan-300"
               >
                 {Math.round(zoom * 100)}%
               </button>
               <div className="w-px bg-white/10 my-1"></div>
               <button 
                 onClick={() => setZoom(z => Math.min(5, z + 0.2))} 
                 className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
               >
                 <ZoomIn className="w-4 h-4" />
               </button>
               <button 
                 onClick={handleResetView} 
                 className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors ml-1"
               >
                 <RotateCcw className="w-3.5 h-3.5" />
               </button>
           </div>

           {/* SVG Content */}
          <div 
            style={{ 
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'center center'
            }}
            className="relative z-10 w-full max-w-[300px] sm:max-w-[380px] aspect-square filter drop-shadow-[0_0_60px_rgba(59,130,246,0.1)] will-change-transform"
          >
             <div 
               ref={containerRef}
               className="w-full h-full"
               dangerouslySetInnerHTML={{ __html: data.content }} 
             />
          </div>
        </div>
      </div>
    </div>
  );
};