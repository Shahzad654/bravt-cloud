import DottedMap from "dotted-map";
import { useRef } from "react";
import { REGIONS } from "../../data/regions";
import { BlurFade } from "./BlurFade";

export default function WorldMap({ lineColor = "#0ea5e9" }) {
  const svgRef = useRef(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const svgMap = map.getSVG({
    radius: 0.22,
    color: "#00000040",
    shape: "circle",
    backgroundColor: "white",
  });

  const projectPoint = (lat, lng) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  return (
    <BlurFade className="w-full aspect-[2/1] bg-white rounded-lg relative font-sans">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {Object.values(REGIONS).map((dot, i) => (
          <g key={`points-group-${i}`}>
            <circle
              cx={projectPoint(dot.coords.lat, dot.coords.lng).x}
              cy={projectPoint(dot.coords.lat, dot.coords.lng).y}
              r="2"
              fill={lineColor}
            />
            <circle
              cx={projectPoint(dot.coords.lat, dot.coords.lng).x}
              cy={projectPoint(dot.coords.lat, dot.coords.lng).y}
              r="2"
              fill={lineColor}
              opacity="0.5"
            >
              <animate
                attributeName="r"
                from="2"
                to="8"
                dur="1.5s"
                begin="0s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.5"
                to="0"
                dur="1.5s"
                begin="0s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>
    </BlurFade>
  );
}
