import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Activity, Zap, Shield, AlertTriangle } from "lucide-react";

const modules = [
  {
    icon: Activity,
    title: "Voltage Drop Analysis",
    description: "Continuous impedance profiling across harness segments. Detects resistance changes as small as 0.02Ω indicating connector degradation or wire fatigue.",
    spec: "Resolution: 0.02Ω | Sampling: 10kHz",
  },
  {
    icon: Zap,
    title: "Connector Fault Detection",
    description: "Time-domain reflectometry identifies loose, corroded, or damaged connectors. Cross-references vibration data to isolate intermittent contact failures.",
    spec: "Sensitivity: 50mΩ | Latency: < 5ms",
  },
  {
    icon: Shield,
    title: "Insulation Leakage Monitor",
    description: "High-voltage insulation resistance measurement across HV battery and powertrain harnesses. Detects micro-leakage before dielectric breakdown.",
    spec: "Range: 0–20MΩ | Accuracy: ±0.5%",
  },
  {
    icon: AlertTriangle,
    title: "Short Circuit Warning",
    description: "Overcurrent detection with sub-millisecond response. Automatic isolation of affected circuits via solid-state switches before thermal damage occurs.",
    spec: "Response: 0.8ms | Isolation: < 2ms",
  },
];

const ArchitectureSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="architecture" ref={ref} className="relative py-24 md:py-32 section-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-[11px] font-mono text-primary uppercase tracking-[0.15em] mb-3 block">Monitoring Architecture</span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
            Four integrated subsystems for complete harness coverage
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-border border border-border max-w-4xl">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="bg-background p-8 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded border border-border flex items-center justify-center group-hover:border-primary/40 transition-colors duration-300">
                  <mod.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{mod.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{mod.description}</p>
              <p className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-wider">{mod.spec}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
