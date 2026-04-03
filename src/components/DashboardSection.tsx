import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Activity, Cpu, Thermometer, Wifi, Battery, Clock } from "lucide-react";

const metrics = [
  { icon: Cpu, label: "ECU Load", value: "34%", status: "nominal" },
  { icon: Thermometer, label: "HV Harness", value: "42°C", status: "nominal" },
  { icon: Wifi, label: "Mesh Signal", value: "Strong", status: "nominal" },
  { icon: Battery, label: "Pack Health", value: "98.2%", status: "nominal" },
  { icon: Activity, label: "Data Rate", value: "1.2Gbps", status: "nominal" },
  { icon: Clock, label: "Latency", value: "0.3ms", status: "nominal" },
];

const timeline = [72, 68, 75, 82, 78, 85, 90, 87, 92, 88, 95, 91, 89, 93, 96, 94, 92, 97, 95, 98];

const DashboardSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="dashboard" ref={ref} className="relative py-24 md:py-32 section-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-[11px] font-mono text-primary uppercase tracking-[0.15em] mb-3 block">Live Dashboard</span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
            Unified system overview
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-5xl border border-border"
        >
          <div className="bg-card/40 p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary/50" />
                <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">CyboWire Dashboard v3.2</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-[10px] text-muted-foreground font-mono uppercase">Live</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border mb-6">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  className="bg-background p-4 group"
                >
                  <m.icon className="w-3.5 h-3.5 text-muted-foreground/60 mb-2" />
                  <p className="text-base font-mono font-semibold text-foreground">{m.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{m.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-background border border-border p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Harness Health Index — 24h</span>
                <span className="text-[10px] font-mono text-primary">98.2%</span>
              </div>
              <div className="flex items-end gap-[3px] h-20">
                {timeline.map((val, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={inView ? { height: `${val}%` } : {}}
                    transition={{ delay: 0.6 + i * 0.025, duration: 0.4 }}
                    className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors duration-150"
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {["00:00", "06:00", "12:00", "18:00", "Now"].map((t) => (
                  <span key={t} className="text-[9px] text-muted-foreground font-mono">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardSection;
