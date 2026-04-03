import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const advantages = [
  { number: "01", title: "Edge-First Architecture", description: "All inference runs on-vehicle. No cloud dependency for critical diagnostics. Sub-millisecond response to fault conditions." },
  { number: "02", title: "OEM Integration Ready", description: "Standard CAN, LIN, and Ethernet interfaces. Drop-in compatibility with existing EV electrical architectures from major OEMs." },
  { number: "03", title: "Self-Calibrating Sensors", description: "Continuous baseline recalibration accounts for temperature drift, aging, and environmental factors without manual intervention." },
  { number: "04", title: "Digital Twin Modeling", description: "Real-time simulation of harness behavior under predicted operating conditions. Validates actual vs. expected performance continuously." },
  { number: "05", title: "Fleet Learning", description: "Anonymized diagnostic patterns aggregated across fleet. Models improve with every vehicle-hour, reducing false positives by 40% per quarter." },
  { number: "06", title: "Regulatory Compliance", description: "Automated documentation generation for ISO 26262, ASIL-D functional safety requirements. Blockchain-anchored audit trail." },
];

const AdvantagesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 section-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-[11px] font-mono text-primary uppercase tracking-[0.15em] mb-3 block">Engineering Advantages</span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
            Built for production environments
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border max-w-5xl">
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="bg-background p-7 group"
            >
              <span className="text-[10px] font-mono text-muted-foreground/50 block mb-3">{adv.number}</span>
              <h3 className="text-sm font-semibold text-foreground mb-2">{adv.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{adv.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
