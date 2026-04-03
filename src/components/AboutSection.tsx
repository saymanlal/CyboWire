import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32 section-border">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[11px] font-mono text-primary uppercase tracking-[0.15em] mb-3 block">About CyboWire</span>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Eliminating wiring failures before they happen
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-sm text-muted-foreground leading-relaxed mb-4"
          >
            CyboWire was founded by automotive electrical engineers and AI researchers who
            saw the same failure mode repeated across every EV platform: wiring harness degradation
            going undetected until it caused field failures.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-sm text-muted-foreground leading-relaxed mb-10"
          >
            Our platform combines embedded sensing hardware with on-vehicle AI inference
            to monitor every connection in real time. We serve OEMs, fleet operators,
            and Tier 1 suppliers building the next generation of electric mobility.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="grid grid-cols-3 gap-px bg-border border border-border max-w-lg"
          >
            {[
              { value: "50M+", label: "Connections Monitored" },
              { value: "99.97%", label: "System Uptime" },
              { value: "< 1ms", label: "Avg Response" },
            ].map((stat) => (
              <div key={stat.label} className="bg-background p-5">
                <p className="text-xl font-mono font-semibold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
