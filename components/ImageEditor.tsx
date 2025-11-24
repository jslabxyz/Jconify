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
    // Robust centering technique: fixed container with overflow-y-auto, 
    // flex container for centering, and min-h-full to ensure vertical alignment.
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        
        <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 text-left align-middle shadow-2xl transition-all flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-zinc-900/50 p-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  Edit Reference Image
              </h3>
              <button 
                  onClick={onCancel} 
                  className="rounded-lg p-1 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                  <X className="h-5 w-5" />
              </button>
          </div>
          
          {/* Canvas Area */}
          <div className="relative flex justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-zinc-950/50 p-6">
              <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-blue-500/50 bg-zinc-900/50 shadow-2xl shadow-black/50 w-full max-w-[320px] aspect-square">
                   <canvas 
                      ref={canvasRef} 
                      className="h-full w-full object-contain block mx-auto"
                   />
                   {/* Overlay grid lines */}
                   <div className="pointer-events-none absolute inset-0 opacity-20">
                       <div className="absolute left-0 right-0 top-1/3 h-px bg-white"></div>
                       <div className="absolute left-0 right-0 top-2/3 h-px bg-white"></div>
                       <div className="absolute bottom-0 top-0 left-1/3 w-px bg-white"></div>
                       <div className="absolute bottom-0 top-0 left-2/3 w-px bg-white"></div>
                   </div>
              </div>
          </div>

          {/* Controls Footer */}
          <div className="space-y-5 border-t border-white/10 bg-zinc-900 p-5">
              
              {/* Controls Group */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
                   {/* Zoom */}
                   <div className="flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl border border-white/5 bg-zinc-950/50 px-4 py-2.5">
                      <ZoomOut className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                      <input 
                          type="range" 
                          min="0.5" 
                          max="3" 
                          step="0.1" 
                          value={scale} 
                          onChange={(e) => setScale(parseFloat(e.target.value))}
                          className="h-1.5 w-full sm:w-32 cursor-pointer appearance-none rounded-lg bg-zinc-700 accent-blue-500"
                          aria-label="Zoom"
                      />
                      <ZoomIn className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                   </div>

                   {/* Rotate */}
                   <div className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/5 bg-zinc-950/50 p-1.5">
                      <button 
                          onClick={() => setRotation(r => r - 90)}
                          className="flex-1 sm:flex-none rounded-lg p-1.5 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                          title="Rotate Left"
                      >
                          <RotateCcw className="h-4 w-4 mx-auto" />
                      </button>
                      <div className="h-4 w-px bg-white/10 mx-1"></div>
                      <button 
                          onClick={() => setRotation(r => r + 90)}
                          className="flex-1 sm:flex-none rounded-lg p-1.5 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                          title="Rotate Right"
                      >
                          <RotateCw className="h-4 w-4 mx-auto" />
                      </button>
                   </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 gap-4">
                   <button 
                      onClick={() => { setScale(1); setRotation(0); }}
                      className="flex items-center gap-2 rounded-lg px-2 py-1 text-xs font-medium text-zinc-500 hover:text-white transition-colors"
                  >
                      <RefreshCcw className="h-3.5 w-3.5" />
                      Reset
                   </button>

                   <div className="flex items-center gap-3">
                       <button 
                          onClick={onCancel}
                          className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                       >
                          Cancel
                       </button>
                       <button 
                          onClick={handleSave}
                          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 active:scale-95"
                       >
                          <Check className="h-4 w-4" />
                          Apply
                       </button>
                   </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};