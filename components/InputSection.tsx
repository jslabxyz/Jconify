
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useCallback, useRef, useState } from 'react';
import { Send, Loader2, Palette, ImagePlus, X, Crop, PaintBucket, Wand2 } from 'lucide-react';
import { GenerationStatus } from '../types';
import { ImageEditor } from './ImageEditor';

interface InputSectionProps {
  prompt: string;
  setPrompt: (value: string) => void;
  selectedStyle: string;
  setSelectedStyle: (value: string) => void;
  selectedImage: string | null;
  setSelectedImage: (value: string | null) => void;
  selectedColor: string;
  setSelectedColor: (value: string) => void;
  onGenerate: (prompt: string, style: string, image?: string, color?: string) => void;
  status: GenerationStatus;
}

const ICON_STYLES = [
  { id: 'Flat', label: 'Flat' },
  { id: 'Line Art', label: 'Line' },
  { id: 'Solid', label: 'Solid' },
  { id: 'Duotone', label: 'Duotone' },
  { id: 'Gradient', label: 'Gradient' },
  { id: 'Pixel', label: 'Pixel' },
  { id: 'Sticker', label: 'Sticker' },
  { id: 'Geometric', label: 'Geometric' },
  { id: 'Abstract', label: 'Abstract' },
  { id: 'Hand-drawn', label: 'Sketch' },
];

const COLOR_PRESETS = [
  '#000000', '#FFFFFF', '#3b82f6', '#06b6d4', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#6366f1'
];

export const InputSection: React.FC<InputSectionProps> = ({ 
  prompt, 
  setPrompt, 
  selectedStyle, 
  setSelectedStyle, 
  selectedImage, 
  setSelectedImage,
  selectedColor,
  setSelectedColor,
  onGenerate, 
  status 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if ((prompt.trim() || selectedImage) && status !== GenerationStatus.LOADING) {
      onGenerate(prompt.trim(), selectedStyle, selectedImage || undefined, selectedColor);
    }
  }, [prompt, selectedStyle, selectedImage, selectedColor, status, onGenerate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
        setIsEditing(true);
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

  const handleEditClick = () => {
    if (selectedImage) {
        setTempImage(selectedImage);
        setIsEditing(true);
    }
  };

  const handleEditorSave = (croppedData: string) => {
    setSelectedImage(croppedData);
    setIsEditing(false);
    setTempImage(null);
  };

  const handleEditorCancel = () => {
    setIsEditing(false);
    setTempImage(null);
    if (!selectedImage && fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('#')) {
        val = '#' + val;
    }
    // Limit to 7 chars (#RRGGBB)
    if (val.length <= 7) {
        setSelectedColor(val);
    }
  };

  const isLoading = status === GenerationStatus.LOADING;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 sm:mt-12 px-4">
      {isEditing && tempImage && (
        <ImageEditor 
          imageSrc={tempImage} 
          onSave={handleEditorSave} 
          onCancel={handleEditorCancel} 
        />
      )}

      <div className="text-center mb-12 space-y-2">
        <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tighter">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-white">
            Generate Assets
          </span>
        </h2>
        <p className="text-slate-400 font-mono text-xs sm:text-sm uppercase tracking-widest opacity-80">
          AI-Powered Vector Synthesis Engine
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative z-20 mb-8">
        {/* Main Input HUD */}
        <div className={`
          relative group transition-all duration-300 rounded-2xl p-1
          ${isFocused ? 'bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500' : 'bg-white/10'}
        `}>
          <div className="bg-[#0b0c15] rounded-xl overflow-hidden relative">
            
            {/* Active Image Badge */}
            {selectedImage && (
              <div className="absolute top-0 left-0 right-0 z-10 px-4 py-2 bg-blue-500/10 border-b border-blue-500/20 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative group/img cursor-pointer" onClick={handleEditClick}>
                    <img 
                      src={selectedImage} 
                      alt="Ref" 
                      className="w-8 h-8 rounded border border-blue-500/30 object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity rounded">
                      <Crop className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-blue-300 uppercase tracking-wider">
                    Ref_Img_Loaded.png
                  </span>
                </div>
                <button 
                  type="button"
                  onClick={handleRemoveImage}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className={`flex items-center p-2 sm:p-4 gap-3 ${selectedImage ? 'pt-14' : ''}`}>
              {/* Upload Button */}
              <div className="flex-shrink-0">
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
                   className={`
                     p-3 sm:p-4 rounded-xl transition-all duration-200 border border-dashed
                     ${selectedImage 
                       ? 'border-blue-500/50 bg-blue-500/5 text-blue-400' 
                       : 'border-slate-700 bg-slate-800/30 text-slate-400 hover:text-white hover:bg-slate-800/80 hover:border-slate-500'}
                   `}
                   title="Upload Reference"
                   disabled={isLoading}
                 >
                   <ImagePlus className="w-5 h-5" />
                 </button>
              </div>

              {/* Text Input */}
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Initialize generation sequence..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-600 py-3 text-base sm:text-lg font-medium min-w-0"
                disabled={isLoading}
              />
              
              {/* Generate Button */}
              <button
                type="submit"
                disabled={(!prompt.trim() && !selectedImage) || isLoading}
                className={`
                  flex-shrink-0 relative group/btn overflow-hidden flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold tracking-wide transition-all duration-300
                  ${(!prompt.trim() && !selectedImage) || isLoading 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                    : 'bg-white text-black hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.3)]'}
                `}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-black" />
                ) : (
                  <>
                    <span className="hidden sm:inline">RUN</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
                {/* Button Glint */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover/btn:animate-shine" />
              </button>
            </div>
          </div>
        </div>
      </form>
      
      {/* Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
        
        {/* Style Module */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
            <Palette className="w-3 h-3" />
            <span>Style_Matrix</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {ICON_STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                disabled={isLoading}
                className={`
                  relative px-2 py-2 rounded-lg text-[10px] sm:text-xs font-medium transition-all duration-200 border
                  ${selectedStyle === style.id 
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)]' 
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-800 hover:border-slate-600 hover:text-white'}
                `}
              >
                {style.label}
                {selectedStyle === style.id && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,211,238,1)]"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Color Module */}
        <div className="space-y-3">
           <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
            <PaintBucket className="w-3 h-3" />
            <span>Chroma_Config</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-[#0b0c15] border border-white/5 rounded-xl">
             <div className="relative w-8 h-8 flex-shrink-0 group">
                <input
                  type="color"
                  value={selectedColor.length === 7 ? selectedColor : '#000000'}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  disabled={isLoading}
                />
                <div 
                  className="w-full h-full rounded-full border border-white/20 shadow-[0_0_10px_inset_rgba(0,0,0,0.5)] flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{ backgroundColor: selectedColor }}
                >
                  <Wand2 className="w-3 h-3 text-white mix-blend-difference opacity-50" />
                </div>
             </div>
             
             {/* Hex Input Display */}
             <input 
               type="text" 
               value={selectedColor}
               onChange={handleHexChange}
               className="w-16 bg-transparent text-[10px] font-mono text-slate-400 focus:text-cyan-400 outline-none uppercase border-b border-transparent focus:border-cyan-500/50 transition-colors pb-0.5"
               maxLength={7}
               placeholder="#HEX"
             />

             <div className="h-6 w-px bg-white/10 mx-2"></div>

             <div className="flex flex-1 justify-between">
               {COLOR_PRESETS.map((color) => (
                 <button
                   key={color}
                   onClick={() => setSelectedColor(color)}
                   disabled={isLoading}
                   className={`
                     w-5 h-5 rounded hover:scale-110 transition-all
                     ${selectedColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0b0c15] scale-110' : 'opacity-70 hover:opacity-100'}
                   `}
                   style={{ backgroundColor: color }}
                   title={color}
                 />
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
