import { useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

const HarnessVisualization = ({ mouseX, mouseY }: { mouseX: ReturnType<typeof useSpring>; mouseY: ReturnType<typeof useSpring> }) => {
  const nodes = [
    { x: 120, y: 80, label: "PDU" },
    { x: 300, y: 50, label: "BMS" },
    { x: 480, y: 90, label: "MCU" },
    { x: 200, y: 180, label: "CHG" },
    { x: 400, y: 170, label: "INV" },
    { x: 300, y: 130, label: "ECU" },
  ];

  const connections = [
    [0, 5], [1, 5], [2, 5], [3, 5], [4, 5],
    [0, 3], [1, 2], [2, 4],
  ];

  return (
    <motion.svg
      viewBox="0 0 600 260"
      className="w-full max-w-2xl mx-auto"
      style={{ x: useTransform(mouseX, v => v * 0.3), y: useTransform(mouseY, v => v * 0.3) }}
    >
      {connections.map(([a, b], i) => (
        <g key={i}>
          <line
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="hsl(172 50% 45% / 0.15)"
            strokeWidth="1"
          />
          <motion.line
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="hsl(172 50% 45%)"
            strokeWidth="1"
            strokeDasharray="4 8"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "linear" }}
          />
        </g>
      ))}
      {nodes.map((node, i) => (
        <g key={i}>
          <motion.circle
            cx={node.x} cy={node.y} r={i === 5 ? 18 : 12}
            fill="hsl(220 14% 6%)"
            stroke="hsl(172 50% 45% / 0.4)"
            strokeWidth="1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
          />
          <text
            x={node.x} y={node.y + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-[8px] font-mono font-medium"
          >
            {node.label}
          </text>
          {i === 5 && (
            <motion.circle
              cx={node.x} cy={node.y} r="22"
              fill="none"
              stroke="hsl(172 50% 45% / 0.2)"
              strokeWidth="1"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          )}
        </g>
      ))}
    </motion.svg>
  );
};

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 120 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 40);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / 40);
  }, [mouseX, mouseY]);

  return (
    <section ref={ref} onMouseMove={handleMouse} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 grid-pattern opacity-[0.4]" />

      <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/80 mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">EV Harness Intelligence Platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-5"
        >
          <span className="text-foreground">Wiring Harness</span>
          <br />
          <span className="text-gradient-primary">Monitoring System</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Embedded AI diagnostics for electric vehicle wiring infrastructure.
          Predict failures. Protect systems. Ensure uptime.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mb-16"
        >
          <HarnessVisualization mouseX={smoothX} mouseY={smoothY} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border max-w-2xl mx-auto border border-border"
        >
          {[
            { label: "Active Harnesses", value: "2,847" },
            { label: "System Uptime", value: "99.97%" },
            { label: "Faults Prevented", value: "1,204" },
            { label: "Response", value: "< 1ms" },
          ].map((stat) => (
            <div key={stat.label} className="bg-background p-4 md:p-5">
              <p className="text-lg md:text-xl font-mono font-semibold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-6 bg-gradient-to-b from-muted-foreground/40 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
