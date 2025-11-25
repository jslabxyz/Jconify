
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface GeneratedSvg {
  id: string;
  content: string;
  prompt: string; // Formatted display string
  originalPrompt: string; // Raw prompt for regeneration
  style: string;
  image?: string; // Optional base64 image
  color?: string;
  timestamp: number;
}

export interface ApiError {
  message: string;
  details?: string;
}
