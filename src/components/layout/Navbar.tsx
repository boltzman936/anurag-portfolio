"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

const links = [
  { href: "#work", label: "WORK" },
  { href: "#about", label: "ABOUT" },
  { href: "#stack", label: "STACK" },
  { href: "#contact", label: "CONTACT" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-border bg-bg/85 backdrop-blur-sm" : "border-transparent"
      }`}
    >
      <Container>
        <nav
          className="flex h-16 items-center justify-between md:h-20"
          aria-label="Primary"
        >
          <a
            href="#top"
            className="font-mono text-sm tracking-[0.2em] text-fg transition-colors hover:text-hover"
          >
            {site.shortName}
          </a>

          <div className="hidden items-center gap-10 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-mono text-[11px] tracking-[0.2em] text-secondary transition-colors hover:text-hover"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-hover transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <span className="flex items-center gap-1 border border-border px-2 py-1 font-mono text-[10px] text-muted">
              <kbd>⌘</kbd>
              <kbd>K</kbd>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-[6px] md:hidden"
          >
            <span
              className={`h-px w-5 bg-fg transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-fg transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-16 z-40 flex flex-col justify-between bg-bg px-[6vw] pt-10 pb-10 md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-border py-5"
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-sans text-4xl tracking-tight text-fg"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.15em] text-muted">
              <span>{site.location}</span>
              <span>{site.education}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
