/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI } from "@google/genai";

// Initialize the client
// CRITICAL: We use process.env.API_KEY as per strict guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates an SVG string based on the user's prompt.
 * Uses 'gemini-3-pro' as requested for generation.
 */
export const generateSvgFromPrompt = async (prompt: string, style: string): Promise<string> => {
  try {
    const systemPrompt = `
      You are an expert UI/UX Icon Designer. Your task is to generate high-quality, professional SVG icons.

      Guidelines:
      1.  **Output Format**: Return ONLY the raw SVG code. No markdown formatting (no \`\`\`xml or \`\`\`svg). No commentary.
      2.  **Icon Style**: 
          - Create clean, vector-based designs.
          - Use a standard square viewBox (e.g., "0 0 512 512").
          - Prioritize bold shapes, clear metaphors, and good contrast.
      3.  **Technical Constraints**:
          - Ensure the SVG is self-contained.
          - Use inline styles or attributes (fill, stroke) directly on elements.
          - Do not use external CSS or fonts.
          - Ensure the content is centered within the viewBox with appropriate padding.
    `;

    const fullPrompt = `
      Task: Create a professional SVG icon.
      Subject: "${prompt}"
      
      Visual Style: "${style}"
      
      Style Instructions:
      - Strictly adhere to the "${style}" style.
      - If "Line Art", use strokes with consistent width and no fills (unless necessary for the metaphor).
      - If "Solid" or "Glyph", use solid fills and negative space.
      - If "Flat", use a modern palette with flat colors and no gradients/shadows unless specified.
      - If "Duotone", use two distinct opacity levels or complementary colors.
      - If "Pixel", use a blocky, grid-aligned aesthetic.
      
      Return ONLY the SVG string.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: fullPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.4, 
        topP: 0.95,
        topK: 40,
      },
    });

    const rawText = response.text || '';
    
    // Robust cleanup to extract just the SVG part
    const svgMatch = rawText.match(/<svg[\s\S]*?<\/svg>/i);
    
    if (svgMatch && svgMatch[0]) {
      return svgMatch[0];
    } else {
      // Fallback cleanup if strict regex fails but content is present
      return rawText.replace(/```xml/g, '').replace(/```svg/g, '').replace(/```/g, '').trim();
    }

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate SVG.");
  }
};