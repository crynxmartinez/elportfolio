"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
const links = [
  ["/portfolio", "Work"],
  ["/services", "Services"],
  ["/about", "About"],
  ["/blog", "Insights"],
];
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          href="/"
          className="wordmark"
          onClick={() => setOpen(false)}
          aria-label="Raphael Martinez home"
        >
          <span className="brand-mark">
            rm<span>.</span>
          </span>
          <span>
            Raphael
            <br />
            Martinez
          </span>
        </Link>
        <button
          className="menu-toggle"
          aria-controls="site-navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? "Close −" : "Menu +"}
        </button>
        <nav
          id="site-navigation"
          aria-label="Main navigation"
          className={open ? "site-nav is-open" : "site-nav"}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              document
                .querySelector<HTMLButtonElement>(".menu-toggle")
                ?.focus();
            }
          }}
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="nav-contact"
            onClick={() => setOpen(false)}
          >
            Let’s talk ↗
          </Link>
        </nav>
      </div>
    </header>
  );
}
