// Build the GitHub-profile SVG assets in the mosambiswas.com design language.
// Fonts are embedded as base64 woff2 so they render inside GitHub's <img> sandbox.
// Run from this folder: node generate.js
const fs = require('fs');
const path = require('path');

const OUT = __dirname;

const b64 = (f) => fs.readFileSync(path.join(__dirname, 'fonts', f)).toString('base64');
const syne = b64('syne800.woff2');
const mono = b64('spacemono.woff2');
const serif = b64('instrumentserif-italic.woff2');

const INK = '#edebe4';
const BG = '#0b0b0a';
const DIM = 'rgba(237,235,228,0.58)';
const FAINT = 'rgba(237,235,228,0.34)';
const LINE = 'rgba(237,235,228,0.16)';
const ACCENT = '#ff5227';

const fontFaces = `
  @font-face { font-family: 'Syne'; font-weight: 800; src: url(data:font/woff2;base64,${syne}) format('woff2'); }
  @font-face { font-family: 'Space Mono'; src: url(data:font/woff2;base64,${mono}) format('woff2'); }
  @font-face { font-family: 'Instrument Serif'; font-style: italic; src: url(data:font/woff2;base64,${serif}) format('woff2'); }
`;

const grain = `
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/></filter>
`;

/* ---------------- HERO ---------------- */

const W = 1200;
const H = 600;
const PAD = 44;
const TL = W - PAD * 2; // fitted display width, edge to edge

/* Measured in Chrome at font-size 100 (Syne 800): MOSAM 667.61px,
   BISWAS 654.91px, cap top -93. Sizes computed so each line naturally
   fills TL — textLength only trues up the last pixel, like fitLines(). */
const FS_MOSAM = (TL / 667.61) * 100;   // ≈ 166.6
const FS_BISWAS = (TL / 654.91) * 100;  // ≈ 169.8
const CAP = 0.93;
const RULE_TOP = 82;
const RULE_BOT = 540;
const MOSAM_BASE = Math.round(RULE_TOP + 48 + FS_MOSAM * CAP);          // ≈ 285
const BISWAS_BASE = Math.round(MOSAM_BASE + 34 + FS_BISWAS * CAP);      // ≈ 477

const hero = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Mosam Biswas — developer, researcher, photographer — Navi Mumbai, India">
  <style>
    ${fontFaces}
    .mono { font-family: 'Space Mono', monospace; font-size: 13px; letter-spacing: 2.2px; fill: ${DIM}; }
    .display { font-family: 'Syne', sans-serif; font-weight: 800; }
    .serif { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 25px; fill: ${DIM}; }
    .serif .lit { fill: ${INK}; }
    #hairline { animation: sweep 6s linear infinite; }
    @keyframes sweep { from { transform: translateX(-280px); } to { transform: translateX(${W}px); } }
    .ember { fill: ${ACCENT}; }
    .e1 { animation: rise 7s ease-in-out infinite; }
    .e2 { animation: rise 9s ease-in-out 2.4s infinite; }
    .e3 { animation: rise 8s ease-in-out 4.8s infinite; }
    @keyframes rise {
      0% { opacity: 0; transform: translateY(0); }
      18% { opacity: 0.75; }
      100% { opacity: 0; transform: translateY(-105px); }
    }
  </style>
  <rect width="${W}" height="${H}" fill="${BG}"/>

  <!-- scroll-progress hairline -->
  <rect id="hairline" x="0" y="0" width="280" height="2" fill="${ACCENT}"/>

  <!-- top mono row -->
  <text class="mono" x="${PAD}" y="58">THE GARAGE — GITHUB</text>
  <text class="mono" x="${W / 2}" y="58" text-anchor="middle">DEVELOPER — RESEARCHER — PHOTOGRAPHER</text>
  <text class="mono" x="${W - PAD}" y="58" text-anchor="end">NAVI MUMBAI, IN</text>
  <line x1="${PAD}" y1="82" x2="${W - PAD}" y2="82" stroke="${LINE}"/>

  <!-- embers drifting behind the outlined line -->
  <circle class="ember e1" cx="315" cy="${BISWAS_BASE - 20}" r="2.6"/>
  <circle class="ember e2" cx="705" cy="${BISWAS_BASE + 10}" r="2"/>
  <circle class="ember e3" cx="1010" cy="${BISWAS_BASE - 6}" r="2.3"/>

  <!-- fitted display type: filled / outlined, like the site hero -->
  <text class="display" x="${PAD}" y="${MOSAM_BASE}" font-size="${FS_MOSAM.toFixed(1)}" fill="${INK}"
        textLength="${TL}" lengthAdjust="spacing">MOSAM</text>
  <text class="display" x="${PAD}" y="${BISWAS_BASE}" font-size="${FS_BISWAS.toFixed(1)}" fill="none"
        stroke="${INK}" stroke-width="2.5"
        textLength="${TL}" lengthAdjust="spacing">BISWAS</text>

  <line x1="${PAD}" y1="540" x2="${W - PAD}" y2="540" stroke="${LINE}"/>

  <!-- foot: serif tagline / mono credential -->
  <text class="serif" x="${PAD}" y="575">Builds things that <tspan class="lit">learn</tspan> — photographs things that <tspan class="lit">won&#8217;t hold still</tspan>.</text>
  <text class="mono" x="${W - PAD}" y="573" text-anchor="end">B.TECH AI &amp; DS — RAIT &#8217;26</text>

  <!-- film grain -->
  <defs>${grain}</defs>
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.05"/>
</svg>
`;

/* ---------------- MARQUEE ---------------- */

const MW = 1200;
const MH = 58;
const RUN = 1285.2; // measured natural run width at 19px; loop translates exactly this

const runText = (x) => `<text class="mq" x="${x}" y="38" textLength="${RUN}" lengthAdjust="spacing">AI / ML <tspan class="dot">·</tspan> FULL-STACK <tspan class="dot">·</tspan> ANDROID <tspan class="dot">·</tspan> RESEARCH <tspan class="dot">·</tspan> PHOTOGRAPHY <tspan class="dot">·</tspan> AUTOMATION <tspan class="dot">·</tspan> </text>`;

const marquee = `<svg xmlns="http://www.w3.org/2000/svg" width="${MW}" height="${MH}" viewBox="0 0 ${MW} ${MH}" role="img" aria-label="AI/ML, full-stack, Android, research, photography, automation">
  <style>
    @font-face { font-family: 'Syne'; font-weight: 800; src: url(data:font/woff2;base64,${syne}) format('woff2'); }
    .mq { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 19px; letter-spacing: 1px; fill: ${DIM}; }
    .dot { fill: ${ACCENT}; }
    #track { animation: slide 34s linear infinite; }
    @keyframes slide { from { transform: translateX(0); } to { transform: translateX(-${RUN}px); } }
  </style>
  <rect width="${MW}" height="${MH}" fill="${BG}"/>
  <line x1="0" y1="1" x2="${MW}" y2="1" stroke="${LINE}" stroke-width="1.5"/>
  <line x1="0" y1="${MH - 1}" x2="${MW}" y2="${MH - 1}" stroke="${LINE}" stroke-width="1.5"/>
  <g id="track">${runText(0)}${runText(RUN)}${runText(RUN * 2)}</g>
  <defs>${grain}</defs>
  <rect width="${MW}" height="${MH}" filter="url(#grain)" opacity="0.04"/>
</svg>
`;

fs.writeFileSync(path.join(OUT, 'hero.svg'), hero);
fs.writeFileSync(path.join(OUT, 'marquee.svg'), marquee);
console.log('hero.svg', (hero.length / 1024).toFixed(0) + 'KB', '| marquee.svg', (marquee.length / 1024).toFixed(0) + 'KB');
