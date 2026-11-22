import './ProjectArt.css'

/**
 * Drawn placeholders for each project. They are plain SVG, so they stay sharp and cost almost
 * nothing to load. Replace them by setting `image` (and optionally `video`) in src/data/projects.js.
 */

const Corners = () => (
  <g className="art-bone" strokeWidth="3" fill="none" strokeLinecap="round">
    <path d="M60 100V60h40M740 100V60h-40M60 400v40h40M740 400v40h-40" />
  </g>
)

function ArScene() {
  const rays = [-300, -150, 0, 150, 300, 450, 600, 750, 900, 1050, 1200]
  const rows = [310, 328, 352, 386, 432, 500]
  return (
    <>
      <defs>
        <clipPath id="art-floor">
          <rect x="0" y="300" width="800" height="200" />
        </clipPath>
      </defs>
      <g clipPath="url(#art-floor)" className="art-grid" strokeWidth="1">
        {rays.map((x) => (
          <line key={x} x1="400" y1="250" x2={x} y2="500" />
        ))}
        {rows.map((y) => (
          <line key={y} x1="0" y1={y} x2="800" y2={y} />
        ))}
      </g>

      {/* cube */}
      <g className="art-lime art-soft" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M260 200l60 30-60 30-60-30z" />
        <path d="M200 230l60 30v70l-60-30z" />
        <path d="M260 260l60-30v70l-60 30z" />
      </g>
      <g className="art-box">
        <rect x="180" y="188" width="160" height="156" rx="4" />
        <rect x="180" y="164" width="72" height="24" className="art-tag" />
        <text x="190" y="181">object</text>
      </g>

      {/* cylinder */}
      <g className="art-bone art-soft" strokeWidth="2.5" fill="none">
        <ellipse cx="520" cy="228" rx="46" ry="14" />
        <path d="M474 228v92c0 8 21 14 46 14s46-6 46-14v-92" />
      </g>
      <g className="art-box">
        <rect x="454" y="196" width="132" height="158" rx="4" />
        <rect x="454" y="172" width="72" height="24" className="art-tag" />
        <text x="464" y="189">object</text>
      </g>

      {/* sphere */}
      <g className="art-bone" strokeWidth="2.5" fill="none">
        <circle cx="670" cy="372" r="36" />
        <ellipse cx="670" cy="372" rx="36" ry="12" />
      </g>
      <g className="art-box">
        <rect x="622" y="326" width="96" height="94" rx="4" />
        <rect x="622" y="302" width="72" height="24" className="art-tag" />
        <text x="632" y="319">object</text>
      </g>
      <Corners />
    </>
  )
}

function MosquitoScene() {
  return (
    <>
      {/* boss bar */}
      <g>
        <rect x="200" y="60" width="400" height="16" rx="8" className="art-bone" fill="none" strokeWidth="2" />
        <rect x="204" y="64" width="280" height="8" rx="4" className="art-fill-lime" />
      </g>

      {/* aim ring */}
      <g className="art-dim" fill="none" strokeWidth="1.5" strokeDasharray="4 8">
        <circle cx="400" cy="270" r="170" />
      </g>
      <g className="art-dim" strokeWidth="1.5">
        <path d="M400 80v40M400 420v40M210 270h40M550 270h40" />
      </g>

      {/* flight path */}
      <path
        d="M70 430C170 440 230 380 250 340S330 290 350 300"
        className="art-dim"
        fill="none"
        strokeWidth="2"
        strokeDasharray="2 9"
        strokeLinecap="round"
      />

      <g transform="rotate(-12 400 270)">
        {/* wings */}
        <ellipse cx="385" cy="196" rx="92" ry="24" transform="rotate(-24 385 196)" className="art-bone art-soft" strokeWidth="2" />
        <ellipse cx="410" cy="204" rx="88" ry="22" transform="rotate(-48 410 204)" className="art-bone art-soft" strokeWidth="2" />
        {/* legs */}
        <g className="art-bone" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M360 292l-26 36 -24 52" />
          <path d="M395 296l-6 44 -12 56" />
          <path d="M430 294l20 42 22 52" />
        </g>
        {/* abdomen + thorax + head */}
        <ellipse cx="340" cy="272" rx="78" ry="26" className="art-lime art-soft" strokeWidth="2.5" />
        <ellipse cx="428" cy="262" rx="38" ry="28" className="art-lime art-soft" strokeWidth="2.5" />
        <circle cx="478" cy="254" r="19" className="art-lime art-soft" strokeWidth="2.5" />
        <path d="M494 252L568 226" className="art-lime" strokeWidth="3" strokeLinecap="round" />
      </g>
      <Corners />
    </>
  )
}

function VrScene() {
  return (
    <>
      {/* headset */}
      <g className="art-bone" fill="none" strokeWidth="3" strokeLinecap="round">
        <rect x="110" y="170" width="290" height="160" rx="56" className="art-soft" />
        <circle cx="205" cy="250" r="44" />
        <circle cx="305" cy="250" r="44" />
        <path d="M110 250H70M400 250h40" />
        <path d="M70 250c0-50 10-80 40-80M440 250c0-50-10-80-40-80" strokeDasharray="2 8" />
      </g>
      <circle cx="205" cy="250" r="14" className="art-fill-lime" />
      <circle cx="305" cy="250" r="14" className="art-fill-lime" />

      {/* line of sight */}
      <path d="M350 214L520 160M350 286L520 370" className="art-dim" strokeWidth="1.5" strokeDasharray="4 8" />

      {/* flask + condenser */}
      <g className="art-lime" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M585 150v70c-46 22-72 56-72 100a72 72 0 0 0 144 0c0-44-26-78-72-100" className="art-soft" />
        <path d="M601 160L710 108M601 184L714 132" />
        <path d="M710 108l6 24" />
      </g>
      <path d="M520 316c26 12 46-12 66 0s40 12 66 0" className="art-bone" fill="none" strokeWidth="2.5" />
      <g className="art-bone" fill="none" strokeWidth="2">
        <circle cx="570" cy="350" r="7" />
        <circle cx="600" cy="334" r="4" />
        <circle cx="618" cy="362" r="9" />
      </g>
      <Corners />
    </>
  )
}

function ThreeDScene() {
  // Wireframe sphere
  const lon = [20, 62, 100]
  const lat = [
    { dy: 0, rx: 130, ry: 24 },
    { dy: -62, rx: 114, ry: 21 },
    { dy: 62, rx: 114, ry: 21 },
    { dy: -104, rx: 78, ry: 14 },
    { dy: 104, rx: 78, ry: 14 },
  ]
  // Wireframe torus: ring of tilted cross-sections
  const ring = Array.from({ length: 14 }, (_, i) => {
    const t = (i / 14) * Math.PI * 2
    return {
      cx: 590 + 84 * Math.cos(t),
      cy: 292 + 44 * Math.sin(t),
      rot: (Math.atan2(44 * Math.sin(t), 84 * Math.cos(t)) * 180) / Math.PI,
    }
  })
  return (
    <>
      <g className="art-lime" fill="none" strokeWidth="2">
        <circle cx="270" cy="250" r="130" className="art-soft" />
        {lon.map((rx) => (
          <ellipse key={rx} cx="270" cy="250" rx={rx} ry="130" />
        ))}
        {lat.map((l) => (
          <ellipse key={l.dy} cx="270" cy={250 + l.dy} rx={l.rx} ry={l.ry} />
        ))}
      </g>

      <g className="art-bone" fill="none" strokeWidth="2">
        <ellipse cx="590" cy="292" rx="124" ry="68" />
        <ellipse cx="590" cy="292" rx="46" ry="22" />
        {ring.map((r, i) => (
          <ellipse key={i} cx={r.cx} cy={r.cy} rx="38" ry="15" transform={`rotate(${r.rot} ${r.cx} ${r.cy})`} />
        ))}
      </g>

      {/* axis gizmo */}
      <g strokeWidth="3" strokeLinecap="round">
        <path d="M90 420h54" className="art-lime" />
        <path d="M90 420v-54" className="art-bone" />
        <path d="M90 420l-30 24" className="art-dim" />
      </g>
      <Corners />
    </>
  )
}

/** Generic stacked bricks, used as the LEGO Animation placeholder. The top brick gently floats. */
function Brick({ x, y, w, studs, solid = false, className = '' }) {
  const step = w / studs
  return (
    <g className={className}>
      {Array.from({ length: studs }, (_, i) => (
        <rect
          key={i}
          x={x + step * (i + 0.5) - 12}
          y={y - 12}
          width="24"
          height="12"
          rx="3"
          className={solid ? 'art-fill-lime' : 'art-bone art-soft'}
          strokeWidth="2"
        />
      ))}
      <rect
        x={x}
        y={y}
        width={w}
        height="54"
        rx="5"
        className={solid ? 'art-fill-lime' : 'art-bone art-soft'}
        strokeWidth="2.5"
      />
    </g>
  )
}

function LegoScene() {
  return (
    <>
      <path d="M120 404H680" className="art-dim" strokeWidth="2" strokeLinecap="round" />
      <Brick x={210} y={350} w={380} studs={8} />
      <Brick x={250} y={284} w={300} studs={6} />
      <Brick x={290} y={218} w={220} studs={4} />
      <Brick x={344} y={120} w={112} studs={2} solid className="art-float" />
      <Corners />
    </>
  )
}

const scenes = {
  ar: ArScene,
  mosquito: MosquitoScene,
  vr: VrScene,
  'three-d': ThreeDScene,
  lego: LegoScene,
}

export default function ProjectArt({ type }) {
  const Scene = scenes[type] ?? ThreeDScene
  return (
    <svg
      className="art"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="800" height="500" className="art-bg" />
      <Scene />
    </svg>
  )
}
