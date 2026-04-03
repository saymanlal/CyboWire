import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const problems = [
  {
    stat: "47%",
    context: "of EV warranty claims",
    description: "are traced to wiring harness or connector failures — the single largest category of electrical defects in modern electric vehicles.",
  },
  {
    stat: "3,200+",
    context: "connections per vehicle",
    description: "Modern EVs contain thousands of individual connections across battery, powertrain, charging, and ADAS subsystems. Manual inspection is impossible at scale.",
  },
  {
    stat: "$2.1B",
    context: "annual recall costs",
    description: "Harness-related recalls cost the global automotive industry billions annually. Early detection reduces exposure by an order of magnitude.",
  },
];

const ProblemSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="problem" ref={ref} className="relative py-24 md:py-32 section-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-[11px] font-mono text-primary uppercase tracking-[0.15em] mb-3 block">The Problem</span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
            Wiring failures are the silent threat in electric vehicles
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
          {problems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i, duration: 0.5 }}
              className="bg-background p-8 md:p-10"
            >
              <p className="text-3xl md:text-4xl font-mono font-bold text-foreground mb-1">{item.stat}</p>
              <p className="text-xs text-primary font-medium uppercase tracking-wider mb-4">{item.context}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
