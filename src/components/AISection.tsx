import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";

const NeuralNetwork = () => {
  const layers = [4, 6, 8, 6, 4, 2];
  const nodes = useMemo(() => {
    return layers.map((count, li) => {
      const x = 50 + li * 80;
      return Array.from({ length: count }, (_, ni) => {
        const y = 120 + (ni - (count - 1) / 2) * 28;
        return { x, y };
      });
    });
  }, []);

  const connections = useMemo(() => {
    const conns: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
    nodes.forEach((layer, li) => {
      if (li < nodes.length - 1) {
        layer.forEach((n1) => {
          nodes[li + 1].forEach((n2) => {
            conns.push({ x1: n1.x, y1: n1.y, x2: n2.x, y2: n2.y, delay: Math.random() * 3 });
          });
        });
      }
    });
    return conns;
  }, [nodes]);

  return (
    <svg viewBox="0 0 500 240" className="w-full opacity-50">
      {connections.map((c, i) => (
        <motion.line
          key={i}
          x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
          stroke="hsl(172 50% 45%)"
          strokeWidth="0.3"
          initial={{ opacity: 0.03 }}
          animate={{ opacity: [0.03, 0.15, 0.03] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: c.delay }}
        />
      ))}
      {nodes.flat().map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x} cy={n.y} r="2.5"
          fill="hsl(172 50% 45%)"
          initial={{ opacity: 0.15 }}
          animate={{ opacity: [0.15, 0.6, 0.15] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.08 }}
        />
      ))}
    </svg>
  );
};

const diagnostics = [
  {
    label: "Cable Degradation Prediction",
    confidence: 94,
    severity: "warning" as const,
    detail: "Harness segment B-7: Thermal cycling stress detected. Estimated 340 operating hours to resistance threshold breach.",
  },
  {
    label: "Loose Connector Detection",
    confidence: 87,
    severity: "critical" as const,
    detail: "HV port J-12: Intermittent impedance spike pattern consistent with micro-fretting. Correlates with 40Hz vibration mode.",
  },
  {
    label: "Thermal Anomaly",
    confidence: 91,
    severity: "warning" as const,
    detail: "Battery harness section C-3: Localized temperature elevation 12°C above ambient baseline. IR signature expanding.",
  },
];

const AISection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ai-engine" ref={ref} className="relative py-24 md:py-32 section-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-[11px] font-mono text-primary uppercase tracking-[0.15em] mb-3 block">AI Diagnostic Engine</span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
            Predictive failure analysis through deep learning
          </h2>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed max-w-lg">
            Custom LSTM neural networks trained on 200M+ harness data points identify degradation patterns
            invisible to conventional monitoring.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="border border-border bg-card/40 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Neural Network — Live Inference</span>
            </div>
            <NeuralNetwork />
            <div className="flex justify-between mt-3 text-[9px] text-muted-foreground font-mono uppercase tracking-wider px-2">
              <span>Sensor Input</span>
              <span>Feature Extraction</span>
              <span>Classification</span>
            </div>
          </motion.div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Active Diagnostics</span>
            </div>
            {diagnostics.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.12 }}
                className="border border-border bg-card/40 p-5 group hover:border-border/80 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-foreground">{d.label}</h4>
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border ${
                    d.severity === "critical"
                      ? "text-destructive border-destructive/30"
                      : "text-accent border-accent/30"
                  }`}>
                    {d.severity}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{d.detail}</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1 bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${d.confidence}%` } : {}}
                      transition={{ delay: 0.7 + i * 0.12, duration: 0.6 }}
                      className="h-full bg-primary"
                    />
                  </div>
                  <span className="text-xs font-mono text-primary">{d.confidence}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
