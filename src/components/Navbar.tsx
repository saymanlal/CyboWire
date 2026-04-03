import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Problem", id: "problem" },
  { label: "Architecture", id: "architecture" },
  { label: "AI Engine", id: "ai-engine" },
  { label: "Fleet Network", id: "fleet-network" },
  { label: "Dashboard", id: "dashboard" },
  { label: "About", id: "about" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5"
        >
          <div className="w-7 h-7 rounded border border-primary/40 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            CyboWire
          </span>
        </button>

        <ul className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 uppercase tracking-wider font-medium"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }} className="w-5 h-px bg-foreground block" />
          <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className="w-5 h-px bg-foreground block" />
          <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }} className="w-5 h-px bg-foreground block" />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border overflow-hidden"
          >
            <ul className="flex flex-col gap-4 px-6 py-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
