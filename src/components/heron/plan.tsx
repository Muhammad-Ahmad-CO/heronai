/*
 * Schematic office floor plan drawn as SVG, revealed in stages like the
 * reference site's scroll sequence: ghost outline → dark walls → furniture
 * and dimensions → red violation markers.
 */

const violations = [
  { x: 306, y: 172, n: "01" },
  { x: 428, y: 262, n: "02" },
  { x: 190, y: 322, n: "03" },
];

export const planViolations = [
  {
    code: "IBC 1015.3",
    title: "Guardrail at stair opening",
    body: "The stair opening has no guard where the drop exceeds 30 inches. Add a guardrail before this passes review.",
  },
  {
    code: "IBC 1020.2",
    title: "Corridor width violation",
    body: "Corridor width is less than 36 inches and does not meet minimum requirements for accessibility and egress.",
  },
  {
    code: "ICC A117.1 §604.3.1",
    title: "Accessible turning radius",
    body: "The accessible restroom does not provide the required 60 inch turning radius for maneuvering space.",
  },
];

export function FloorPlan({
  stage,
  onMarker,
  selected,
}: {
  stage: number;
  onMarker?: (i: number) => void;
  selected?: number | null;
}) {
  const vis = (from: number) => ({
    opacity: stage >= from ? 1 : 0,
    transition: "opacity 0.7s ease",
  });
  return (
    <svg viewBox="0 0 640 460" className="h-auto w-full" role="img" aria-label="Office floor plan">
      {/* ghost outline */}
      <g stroke="var(--ink)" strokeOpacity="0.16" strokeWidth="2" fill="none">
        <rect x="150" y="60" width="340" height="300" />
        <path d="M150 180 H300 M330 180 H490 M320 270 H380 M405 270 H490" />
        <path d="M320 60 V110 M320 135 V180 M320 180 V250 M320 275 V360 M230 270 V360" />
      </g>

      {/* dark walls */}
      <g stroke="var(--ink)" strokeWidth="7" fill="none" style={vis(2)} strokeLinecap="square">
        <path d="M150 360 V60 H490 V360" />
        <path d="M150 363 H490" strokeWidth="7" />
        <path d="M150 180 H298 M332 180 H490" />
        <path d="M322 270 H378 M408 270 H490" />
        <path d="M320 60 V108 M320 138 V178 M320 182 V248 M320 278 V360" />
        <path d="M230 272 V360 M150 270 H228" />
      </g>

      {/* door swings */}
      <g stroke="var(--ink)" strokeOpacity="0.45" strokeWidth="1.2" fill="none" style={vis(2)}>
        <path d="M300 180 A32 32 0 0 1 332 212" />
        <path d="M380 270 A28 28 0 0 0 408 242" />
        <path d="M320 110 A28 28 0 0 1 292 138" />
        <path d="M228 300 A30 30 0 0 1 258 270" />
      </g>

      {/* furniture */}
      <g stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1.4" fill="none" style={vis(3)}>
        {/* sofa + table */}
        <rect x="168" y="84" width="92" height="28" />
        <rect x="192" y="126" width="44" height="20" />
        {/* dining table + chairs */}
        <rect x="368" y="92" width="86" height="38" />
        <rect x="378" y="76" width="16" height="12" />
        <rect x="408" y="76" width="16" height="12" />
        <rect x="378" y="134" width="16" height="12" />
        <rect x="408" y="134" width="16" height="12" />
        {/* kitchen counter */}
        <rect x="332" y="192" width="146" height="24" />
        <rect x="440" y="196" width="30" height="16" />
        {/* bed + wardrobe */}
        <rect x="164" y="284" width="54" height="66" />
        <path d="M164 306 H218" />
        <rect x="238" y="330" width="66" height="20" />
        {/* desks */}
        <rect x="336" y="300" width="40" height="20" />
        <rect x="392" y="300" width="40" height="20" />
        <rect x="448" y="300" width="34" height="20" />
        {/* stairs */}
        <path d="M404 322 H486 M404 332 H486 M404 342 H486 M404 352 H486" />
        {/* wc fixtures */}
        <rect x="160" y="282" width="26" height="14" />
        <circle cx="205" cy="290" r="8" />
      </g>

      {/* dimensions */}
      <g
        stroke="var(--ink)"
        strokeOpacity="0.55"
        strokeWidth="1"
        fill="none"
        style={vis(3)}
        fontFamily="var(--font-mono)"
      >
        <path d="M150 44 V30 M320 44 V30 M490 44 V30 M150 38 H320 M320 38 H490" />
        <path d="M506 60 V360 M520 60 H534 M520 360 H534 M514 60 V360" strokeDasharray="0" />
        <path d="M150 392 V378 M490 392 V378 M150 386 H490" />
        <g fill="var(--ink)" fillOpacity="0.65" stroke="none" fontSize="10">
          <text x="222" y="34" textAnchor="middle">5598</text>
          <text x="398" y="34" textAnchor="middle">3126</text>
          <text x="524" y="214">2698</text>
          <text x="306" y="400" textAnchor="middle">6636</text>
        </g>
      </g>

      {/* violation markers */}
      <g style={{ ...vis(4), pointerEvents: onMarker ? "auto" : "none" }}>
        {violations.map((v, i) => (
          <g
            key={v.n}
            transform={`translate(${v.x} ${v.y})`}
            onClick={onMarker ? () => onMarker(i) : undefined}
            style={{ cursor: onMarker ? "pointer" : undefined }}
          >
            <rect
              x="-11"
              y="-11"
              width="22"
              height="22"
              fill={selected === i ? "var(--ink)" : "var(--signal)"}
            />
            <text
              y="3.5"
              textAnchor="middle"
              fontSize="9"
              fill="var(--paper)"
              fontFamily="var(--font-mono)"
            >
              {v.n}
            </text>
          </g>
        ))}
        <path d="M428 236 V248" stroke="var(--signal)" strokeWidth="2" />
        <path d="M423 243 L428 250 L433 243" fill="var(--signal)" />
      </g>
    </svg>
  );
}
