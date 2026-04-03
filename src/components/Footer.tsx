const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded border border-primary/30 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-primary" />
          </div>
          <span className="text-xs font-medium text-foreground">CyboWire</span>
        </div>
        <p className="text-[11px] text-muted-foreground">
          &copy; {new Date().getFullYear()} Cybokrafts Universal Innovations Pvt. Ltd. | All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          {["Privacy", "Terms", "Contact"].map((link) => (
            <button key={link} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors duration-200">
              {link}
            </button>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
