/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export const LIBRARY_ICONS = [
  // --- UI / Navigation ---
  {
    id: 'home-flat',
    prompt: 'Minimalist modern home house icon',
    style: 'Flat',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 32L32 224h48v256h128V320h96v160h128V224h48L256 32z" fill="#3b82f6"/></svg>`
  },
  {
    id: 'menu-line',
    prompt: 'Hamburger menu navigation list',
    style: 'Line Art',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M80 160h352M80 256h352M80 352h352" fill="none" stroke="currentColor" stroke-width="48" stroke-linecap="round"/></svg>`
  },
  {
    id: 'search-line',
    prompt: 'Search magnifying glass',
    style: 'Line Art',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" stroke-width="32"/><path d="M300 300l150 150" fill="none" stroke="currentColor" stroke-width="32" stroke-linecap="round"/></svg>`
  },
  {
    id: 'user-solid',
    prompt: 'User profile avatar person',
    style: 'Solid',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="128" r="96" fill="currentColor"/><path d="M256 256c-88.4 0-160 71.6-160 160h320c0-88.4-71.6-160-160-160z" fill="currentColor"/></svg>`
  },
  {
    id: 'settings-duotone',
    prompt: 'Settings gear cog mechanical',
    style: 'Duotone',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" r="64" fill="currentColor" opacity="0.4"/><path d="M416.3 256c0-88.5-71.8-160.3-160.3-160.3S95.7 167.5 95.7 256s71.8 160.3 160.3 160.3S416.3 344.5 416.3 256z" fill="none" stroke="currentColor" stroke-width="32"/><rect x="232" y="32" width="48" height="80" rx="10" fill="currentColor"/><rect x="232" y="400" width="48" height="80" rx="10" fill="currentColor"/><rect x="400" y="232" width="80" height="48" rx="10" fill="currentColor"/><rect x="32" y="232" width="80" height="48" rx="10" fill="currentColor"/></svg>`
  },
  {
    id: 'trash-solid',
    prompt: 'Trash can delete bin',
    style: 'Solid',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M112 112l20 320c1 16 15 29 31 29h186c16 0 30-13 31-29l20-320H112zm84 272c-8 0-16-7-16-16V176c0-8 7-16 16-16s16 7 16 16v192c0 8-7 16-16 16zm120 0c-8 0-16-7-16-16V176c0-8 7-16 16-16s16 7 16 16v192c0 8-7 16-16 16zM368 64h-80V32c0-9-7-16-16-16h-32c-9 0-16 7-16 16v32h-80c-9 0-16 7-16 16v16h256V80c0-9-7-16-16-16z" fill="currentColor"/></svg>`
  },
  {
    id: 'bell-duotone',
    prompt: 'Notification bell alert',
    style: 'Duotone',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 448c26.5 0 48-21.5 48-48h-96c0 26.5 21.5 48 48 48z" fill="currentColor"/><path d="M400 288v-96c0-79.5-64.5-144-144-144S112 112.5 112 192v96l-48 48v32h384v-32l-48-48z" fill="currentColor" opacity="0.4"/></svg>`
  },

  // --- Tech / Data ---
  {
    id: 'cloud-gradient',
    prompt: 'Cloud computing upload sky',
    style: 'Gradient',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#60a5fa;stop-opacity:1" /><stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" /></linearGradient></defs><path d="M368 160c-44.2 0-80 35.8-80 80 0 8.8 1.4 17.2 4 25.2-12.6-9.4-28.4-15.2-45-15.2-41.4 0-75 33.6-75 75 0 8.4 1.4 16.4 4 24-2.6-.4-5.2-.8-8-.8-35.3 0-64 28.7-64 64s28.7 64 64 64h224c53 0 96-43 96-96s-43-96-96-96c-5.8 0-11.4.6-16.8 1.6C395.4 175.4 382.4 160 368 160z" fill="url(#cloudGrad)"/></svg>`
  },
  {
    id: 'wifi-line',
    prompt: 'Wifi signal internet connection',
    style: 'Line Art',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 416c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zM128 320c70.7-70.7 185.3-70.7 256 0M64 224c106-106 278-106 384 0M32 160c123.7-123.7 324.3-123.7 448 0" fill="none" stroke="currentColor" stroke-width="40" stroke-linecap="round"/></svg>`
  },
  {
    id: 'code-pixel',
    prompt: 'Code brackets developer pixel',
    style: 'Pixel',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M160 128H96v64H32v128h64v64h64v-64h-64v-64h64v-64h-64v-64h64v-64zm192 0v64h64v64h-64v64h64v64h64v-128h-64v-64h64v-64h-64z" fill="#10b981"/></svg>`
  },
  {
    id: 'download-duotone',
    prompt: 'Download arrow tray save',
    style: 'Duotone',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M384 256h-80v-96c0-17.7-14.3-32-32-32h-32c-17.7 0-32 14.3-32 32v96H128c-28.4 0-42.8 34.5-22.6 54.6l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c20.1-20.1 5.8-54.6-22.7-54.6z" fill="currentColor"/><path d="M448 416H64c-17.7 0-32 14.3-32 32v32h448v-32c0-17.7-14.3-32-32-32z" fill="currentColor" opacity="0.4"/></svg>`
  },

  // --- Communication / Social ---
  {
    id: 'mail-geometric',
    prompt: 'Email envelope letter message',
    style: 'Geometric',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><rect x="64" y="128" width="384" height="256" rx="16" fill="none" stroke="currentColor" stroke-width="24"/><path d="M64 160l192 144 192-144" fill="none" stroke="currentColor" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'chat-hand-drawn',
    prompt: 'Chat bubble message speech',
    style: 'Hand-drawn',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M448 224c0-88.4-71.6-160-160-160S128 135.6 128 224c0 35.8 11.9 69 32 96l-32 80 80-32c27 20.1 60.2 32 96 32 88.4 0 160-71.6 160-160z" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 5"/></svg>`
  },
  {
    id: 'share-line',
    prompt: 'Share nodes connection network',
    style: 'Line Art',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="384" cy="112" r="48" fill="none" stroke="currentColor" stroke-width="32"/><circle cx="128" cy="256" r="48" fill="none" stroke="currentColor" stroke-width="32"/><circle cx="384" cy="400" r="48" fill="none" stroke="currentColor" stroke-width="32"/><path d="M346 136L166 232M166 280l180 96" fill="none" stroke="currentColor" stroke-width="32" stroke-linecap="round"/></svg>`
  },
  {
    id: 'heart-pixel',
    prompt: 'Heart love like favorite 8-bit',
    style: 'Pixel',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M96 192h64v-64h64v-64h64v64h64v64h64v64h-64v64h-64v64h-64v64h-64v-64h-64v-64h-64v-64h-64v-64h64v-64z" fill="#ef4444"/></svg>`
  },
  {
    id: 'thumbs-up-solid',
    prompt: 'Thumbs up like success hand',
    style: 'Solid',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M480 224H352c10-28 17-62 9-86-6-19-21-27-31-27-20 0-26 23-26 31 0 18-9 28-15 35-14 14-38 31-52 59H96v160h144c29 0 57-9 74-27l3-3c22-22 28-59 27-89 2-25-16-43-18-45 10-9 16-24 16-37 0-22-19-41-42-45zM32 240h48v144H32V240z" fill="currentColor"/></svg>`
  },

  // --- Business / Productivity ---
  {
    id: 'briefcase-solid',
    prompt: 'Briefcase business work bag',
    style: 'Solid',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M368 128h-32v-32c0-17.7-14.3-32-32-32h-96c-17.7 0-32 14.3-32 32v32h-32c-26.5 0-48 21.5-48 48v224c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V176c0-26.5-21.5-48-48-48zm-160-32h96v32h-96v-32z" fill="currentColor"/></svg>`
  },
  {
    id: 'chart-line',
    prompt: 'Analytics chart graph growth',
    style: 'Line Art',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M64 416h384" fill="none" stroke="currentColor" stroke-width="32" stroke-linecap="round"/><path d="M96 352l96-96 64 64 160-160" fill="none" stroke="currentColor" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/><circle cx="416" cy="160" r="16" fill="currentColor"/></svg>`
  },
  {
    id: 'target-geometric',
    prompt: 'Target goal bullseye precision',
    style: 'Geometric',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" r="208" fill="none" stroke="currentColor" stroke-width="32"/><circle cx="256" cy="256" r="144" fill="none" stroke="currentColor" stroke-width="32"/><circle cx="256" cy="256" r="64" fill="currentColor"/></svg>`
  },
  {
    id: 'calendar-flat',
    prompt: 'Calendar date schedule',
    style: 'Flat',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><rect x="64" y="96" width="384" height="352" rx="32" fill="#e5e7eb"/><path d="M64 160h384v-32c0-17.7-14.3-32-32-32H96c-17.7 0-32 14.3-32 32v32z" fill="#ef4444"/><rect x="112" y="64" width="32" height="64" rx="8" fill="#1f2937"/><rect x="368" y="64" width="32" height="64" rx="8" fill="#1f2937"/><circle cx="256" cy="272" r="32" fill="#ef4444"/></svg>`
  },

  // --- Multimedia / Art ---
  {
    id: 'camera-flat',
    prompt: 'Camera photography photo',
    style: 'Flat',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><rect x="48" y="128" width="416" height="304" rx="32" fill="#fbbf24"/><circle cx="256" cy="280" r="96" fill="#1f2937"/><circle cx="256" cy="280" r="80" fill="#4b5563"/><rect x="176" y="80" width="160" height="48" rx="8" fill="#fbbf24"/><circle cx="400" cy="192" r="16" fill="#1f2937"/></svg>`
  },
  {
    id: 'image-line',
    prompt: 'Image picture landscape mountain',
    style: 'Line Art',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><rect x="48" y="80" width="416" height="352" rx="32" fill="none" stroke="currentColor" stroke-width="32" stroke-linejoin="round"/><circle cx="144" cy="176" r="32" fill="currentColor"/><path d="M464 336L336 208 240 304l-48-48L48 400" fill="none" stroke="currentColor" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'music-abstract',
    prompt: 'Music note melody sound',
    style: 'Abstract',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M192 384c0-35.3-28.7-64-64-64s-64 28.7-64 64 28.7 64 64 64 64-28.7 64-64V128h160v192c0-35.3-28.7-64-64-64s-64 28.7-64 64 28.7 64 64 64 64-28.7 64-64V64H192v320z" fill="none" stroke="#a855f7" stroke-width="32" stroke-linecap="round"/></svg>`
  },
  {
    id: 'palette-flat',
    prompt: 'Art palette color design',
    style: 'Flat',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208c28.7 0 52-23.3 52-52 0-16.1-7.5-30.3-19.1-39.6-3.8-3.1-6.9-8.4-6.9-12.4 0-14.3 11.7-26 26-26h28c57.4 0 104-46.6 104-104 0-114.9-93.1-208-208-208zm-96 112c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm96 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm96 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z" fill="#f472b6"/></svg>`
  },

  // --- Miscellaneous ---
  {
    id: 'coffee-line',
    prompt: 'Coffee cup hot tea steam',
    style: 'Line Art',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M368 192h16c26.5 0 48 21.5 48 48s-21.5 48-48 48h-16M96 192h272v128c0 53-43 96-96 96H192c-53 0-96-43-96-96V192z" fill="none" stroke="currentColor" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/><path d="M160 96c0-24 16-48 32-48M256 96c0-24 16-48 32-48M352 96c0-24 16-48 32-48" fill="none" stroke="currentColor" stroke-width="24" stroke-linecap="round"/></svg>`
  },
  {
    id: 'sun-flat',
    prompt: 'Sun weather summer day',
    style: 'Flat',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" r="112" fill="#fbbf24"/><path d="M256 64V32M256 480v-32M448 256h32M32 256h32M392 120l24-24M96 416l24-24M392 392l24 24M96 96l24 24" fill="none" stroke="#fbbf24" stroke-width="48" stroke-linecap="round"/></svg>`
  },
  {
    id: 'moon-solid',
    prompt: 'Moon night dark mode sleep',
    style: 'Solid',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M224 448c106 0 192-86 192-192 0-36.4-10.1-70.3-27.7-99.3C440.8 196.2 464 246.4 464 304c0 106-86 192-192 192-57.6 0-107.8-23.2-143.3-60.7 29 17.6 62.9 27.7 99.3 27.7z" fill="currentColor"/><path d="M224 64c-36.4 0-70.3 10.1-99.3 27.7C161.8 53.8 206.4 32 256 32c106 0 192 86 192 192 0 49.6-21.8 94.2-56.3 126.7C401.9 294.3 416 260.4 416 224c0-88.4-71.6-160-160-160z" fill="currentColor" opacity="0.3"/></svg>`
  },
  {
    id: 'lock-duotone',
    prompt: 'Lock secure password privacy',
    style: 'Duotone',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><rect x="96" y="224" width="320" height="224" rx="32" fill="currentColor"/><path d="M160 224V144c0-53 43-96 96-96s96 43 96 96v80" fill="none" stroke="currentColor" stroke-width="48" stroke-linecap="round" opacity="0.4"/></svg>`
  },
  {
    id: 'star-sticker',
    prompt: 'Star rating favorite sticker',
    style: 'Sticker',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 48l64 160 160 16 16 16-128 96 48 160-16 16-144-96-144 96-16-16 48-160L16 240l16-16 160-16z" fill="#ffffff" stroke="#e5e7eb" stroke-width="24" stroke-linejoin="round"/><path d="M256 80l52 130 130 13-104 78 39 130-117-78-117 78 39-130-104-78 130-13z" fill="#facc15"/></svg>`
  },
  {
    id: 'cart-duotone',
    prompt: 'Shopping cart buy ecommerce',
    style: 'Duotone',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="176" cy="416" r="32" fill="currentColor" opacity="0.4"/><circle cx="400" cy="416" r="32" fill="currentColor" opacity="0.4"/><path d="M48 80h64l48 272h272" fill="none" stroke="currentColor" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/><path d="M160 288h249.4l42.7-160H142.3" fill="none" stroke="currentColor" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/></svg>`
  },
  {
    id: 'rocket-flat',
    prompt: 'Rocket launch startup space',
    style: 'Flat',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 32c0 0-144 192-144 320 0 53 43 96 96 96h96c53 0 96-43 96-96C400 224 256 32 256 32z" fill="#e5e7eb"/><path d="M256 64c0 0-112 176-112 288 0 35.3 28.7 64 64 64h96c35.3 0 64-28.7 64-64 0-112-112-288-112-288z" fill="#ef4444"/><circle cx="256" cy="256" r="48" fill="#1f2937"/><path d="M160 416l-64 64M352 416l64 64" fill="none" stroke="#ef4444" stroke-width="32" stroke-linecap="round"/></svg>`
  },
  {
    id: 'lightning-abstract',
    prompt: 'Lightning bolt energy power fast',
    style: 'Abstract',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M304 32L112 288h128l-32 192 192-256H272L304 32z" fill="none" stroke="#f59e0b" stroke-width="24" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'globe-gradient',
    prompt: 'Globe world earth internet',
    style: 'Gradient',
    content: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="earthGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#34d399;stop-opacity:1" /><stop offset="100%" style="stop-color:#059669;stop-opacity:1" /></linearGradient></defs><circle cx="256" cy="256" r="192" fill="url(#earthGrad)"/><path d="M256 64c-64 0-110 86-110 192s46 192 110 192 110-86 110-192S320 64 256 64z" fill="none" stroke="#fff" stroke-width="24" opacity="0.5"/><path d="M64 256h384" fill="none" stroke="#fff" stroke-width="24" opacity="0.5"/></svg>`
  }
];
