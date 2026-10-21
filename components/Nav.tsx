"use client";

import { useState } from "react";
import Link from "next/link";
import { profile, navItems } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="nav">
        <div className="navInner">
          <Link href="/#top" className="brand">
            <span className="brandMark">{profile.initials}</span> John A. Palaganas
          </Link>
          <nav className="navLinks">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
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
            <Link href="/#contact" className="navCta">
              Contact
            </Link>
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
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link href="/#contact" onClick={() => setOpen(false)}>
          Contact
        </Link>
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
