"use client";

import { useState } from "react";
import { profile, navItems } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="nav">
        <div className="navInner">
          <a href="#top" className="brand">
            <span className="brandMark">{profile.initials}</span> John A. Palaganas
          </a>
          <nav className="navLinks">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="navIcon"
            >
              <GithubIcon size={17} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="navIcon"
            >
              <LinkedinIcon size={17} />
            </a>
            <a href="#contact" className="navCta">
              Contact
            </a>
          </nav>
          <button
            className="burger"
            aria-label="Open menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      <div className={`mobileMenu ${open ? "open" : ""}`}>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}>
          Contact
        </a>
        <div className="mobileSocial">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubIcon size={19} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedinIcon size={19} />
          </a>
        </div>
      </div>
    </>
  );
}
