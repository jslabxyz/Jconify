/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCw, RotateCcw, RefreshCcw, Check, X } from 'lucide-react';

interface ImageEditorProps {
  imageSrc: string;
  onSave: (croppedImage: string) => void;
  onCancel: () => void;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({ imageSrc, onSave, onCancel }) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "anonymous";
    img.onload = () => setImage(img);
  }, [imageSrc]);

  useEffect(() => {
    if (!image || !canvasRef.current) return;
    drawCanvas();
  }, [image, scale, rotation]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fixed canvas size for the output (Square aspect ratio for icons)
    const size = 512;
    canvas.width = size;
    canvas.height = size;

    // Clear background
    ctx.clearRect(0, 0, size, size);

    ctx.save();
    
    // Move to center of canvas
    ctx.translate(size / 2, size / 2);
    
    // Apply transformations
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);
    
    // Calculate draw dimensions to fit image within the square initially
    const aspect = image.width / image.height;
    let drawWidth, drawHeight;
    
    if (aspect > 1) {
       drawWidth = size;
       drawHeight = size / aspect;
    } else {
       drawHeight = size;
       drawWidth = size * aspect;
    }

    // Draw image centered relative to the transformed origin
    ctx.drawImage(
      image, 
      -drawWidth / 2, 
      -drawHeight / 2, 
      drawWidth, 
      drawHeight
    );
    
    ctx.restore();
  };

  const handleSave = () => {
    if (canvasRef.current) {
        // Export high quality PNG
        onSave(canvasRef.current.toDataURL('image/png', 1.0));
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden w-full max-w-lg flex flex-col">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-zinc-900/50">
            <h3 className="text-white font-semibold flex items-center gap-2">
                Edit Reference Image
            </h3>
            <button 
                onClick={onCancel} 
                className="text-zinc-400 hover:text-white hover:bg-white/10 p-1 rounded-lg transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
        
        <div className="p-6 flex justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-zinc-950/50 relative">
            {/* The crop preview area */}
            <div className="relative border-2 border-dashed border-blue-500/50 shadow-2xl shadow-black/50 overflow-hidden rounded-lg bg-zinc-900/50">
                 <canvas 
                    ref={canvasRef} 
                    className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] object-contain block"
                 />
                 {/* Overlay grid lines for crop effect */}
                 <div className="absolute inset-0 pointer-events-none opacity-20 border-blue-500/30">
                     <div className="absolute top-1/3 left-0 right-0 h-px bg-white"></div>
                     <div className="absolute top-2/3 left-0 right-0 h-px bg-white"></div>
                     <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white"></div>
                     <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white"></div>
                 </div>
            </div>
        </div>

        <div className="p-4 bg-zinc-900 border-t border-white/10 space-y-4">
            
            {/* Controls */}
            <div className="flex items-center justify-center gap-4 sm:gap-6">
                 {/* Zoom */}
                 <div className="flex items-center gap-2 bg-zinc-950/50 px-3 py-2 rounded-lg border border-white/5">
                    <ZoomOut className="w-4 h-4 text-zinc-400" />
                    <input 
                        type="range" 
                        min="0.5" 
                        max="3" 
                        step="0.1" 
                        value={scale} 
                        onChange={(e) => setScale(parseFloat(e.target.value))}
                        className="w-24 accent-blue-500 h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                        aria-label="Zoom"
                    />
                    <ZoomIn className="w-4 h-4 text-zinc-400" />
                 </div>

                 {/* Rotate */}
                 <div className="flex items-center gap-1 bg-zinc-950/50 p-1 rounded-lg border border-white/5">
                    <button 
                        onClick={() => setRotation(r => r - 90)}
                        className="p-1.5 bg-transparent hover:bg-zinc-800 rounded text-zinc-300 hover:text-white transition-colors"
                        title="Rotate Left"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-white/10 mx-1"></div>
                    <button 
                        onClick={() => setRotation(r => r + 90)}
                        className="p-1.5 bg-transparent hover:bg-zinc-800 rounded text-zinc-300 hover:text-white transition-colors"
                        title="Rotate Right"
                    >
                        <RotateCw className="w-4 h-4" />
                    </button>
                 </div>
            </div>

            <div className="flex items-center justify-between pt-2">
                 <button 
                    onClick={() => { setScale(1); setRotation(0); }}
                    className="flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-white transition-colors px-2 py-1"
                >
                    <RefreshCcw className="w-3.5 h-3.5" />
                    Reset
                 </button>

                 <div className="flex items-center gap-3">
                     <button 
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                     >
                        Cancel
                     </button>
                     <button 
                        onClick={handleSave}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                     >
                        <Check className="w-4 h-4" />
                        Apply
                     </button>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};