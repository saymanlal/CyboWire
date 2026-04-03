import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";

const MeshVisualization = () => {
  const vehicleNodes = useMemo(() => [
    { x: 80, y: 60, label: "V-01" },
    { x: 220, y: 40, label: "V-02" },
    { x: 360, y: 55, label: "V-03" },
    { x: 500, y: 45, label: "V-04" },
    { x: 150, y: 140, label: "V-05" },
    { x: 300, y: 120, label: "EDGE" },
    { x: 440, y: 135, label: "V-06" },
    { x: 220, y: 200, label: "V-07" },
    { x: 380, y: 210, label: "V-08" },
  ], []);

  const meshLinks = useMemo(() => [
    [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 5],
    [3, 6], [4, 5], [5, 6], [4, 7], [5, 7], [5, 8], [6, 8], [7, 8],
  ], []);

  return (
    <svg viewBox="0 0 580 260" className="w-full">
      {meshLinks.map(([a, b], i) => (
        <g key={i}>
          <line
            x1={vehicleNodes[a].x} y1={vehicleNodes[a].y}
            x2={vehicleNodes[b].x} y2={vehicleNodes[b].y}
            stroke="hsl(172 50% 45% / 0.1)"
            strokeWidth="1"
          />
          <motion.circle
            r="2"
            fill="hsl(172 50% 45%)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              cx: [vehicleNodes[a].x, vehicleNodes[b].x],
              cy: [vehicleNodes[a].y, vehicleNodes[b].y],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear",
            }}
          />
        </g>
      ))}
      {vehicleNodes.map((node, i) => (
        <g key={i}>
          <rect
            x={node.x - 18} y={node.y - 10}
            width="36" height="20" rx="2"
            fill="hsl(220 14% 6%)"
            stroke={node.label === "EDGE" ? "hsl(172 50% 45% / 0.5)" : "hsl(220 12% 18%)"}
            strokeWidth="1"
          />
          <text
            x={node.x} y={node.y + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-muted-foreground text-[7px] font-mono"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

const features = [
  {
    title: "Vehicle-to-Vehicle Mesh",
    description: "Vehicles share diagnostic data across a self-organizing mesh network. Fleet-wide pattern recognition identifies systemic harness issues before individual vehicle systems can detect them.",
  },
  {
    title: "Tamper-Proof Maintenance Logs",
    description: "Every diagnostic event, maintenance action, and sensor reading is cryptographically signed and committed to a distributed ledger. Provides immutable audit trail for regulatory compliance.",
  },
  {
    title: "Decentralized Fleet Analytics",
    description: "Edge nodes perform local inference while contributing anonymized insights to fleet-level models. No central point of failure. Data sovereignty maintained per vehicle.",
  },
];

const MeshBlockchainSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="fleet-network" ref={ref} className="relative py-24 md:py-32 section-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-[11px] font-mono text-primary uppercase tracking-[0.15em] mb-3 block">Fleet Network</span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
            Mesh communication with blockchain-secured diagnostics
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="border border-border bg-card/40 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Fleet Mesh Topology — 8 Vehicles Active</span>
            </div>
            <MeshVisualization />
          </motion.div>

          <div className="space-y-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.12 }}
                className="border border-border bg-card/40 p-6"
              >
                <h4 className="text-sm font-semibold text-foreground mb-2">{f.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeshBlockchainSection;
