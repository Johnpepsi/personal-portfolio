"use client";

import { FormEvent, useState } from "react";
import { profile } from "@/lib/data";
import { MailIcon, LinkedinIcon, GithubIcon, MapPinIcon } from "./Icons";
import Reveal from "./Reveal";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="section" id="contact" style={{ borderBottom: "none" }}>
      <div className="wrap contactGrid">
        <Reveal className="contactInfo">
          <span className="sectionNum">04 — Contact</span>
          <h2>Let&apos;s work together</h2>
          <p>
            Have a project, an opening, or an infrastructure problem worth solving?
            I&apos;d like to hear about it.
          </p>

          <div className="infoRow">
            <span className="infoIcon">
              <MailIcon size={16} />
            </span>
            <span className="infoLabel">Email</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <div className="infoRow">
            <span className="infoIcon">
              <LinkedinIcon size={16} />
            </span>
            <span className="infoLabel">LinkedIn</span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              linkedin.com/in/jpalaganas
            </a>
          </div>
          <div className="infoRow">
            <span className="infoIcon">
              <GithubIcon size={16} />
            </span>
            <span className="infoLabel">GitHub</span>
            <a href={profile.github} target="_blank" rel="noreferrer">
              github.com/Johnpepsi
            </a>
          </div>
          <div className="infoRow">
            <span className="infoIcon">
              <MapPinIcon size={16} />
            </span>
            <span className="infoLabel">Location</span>
            <span>{profile.location}</span>
          </div>
        </Reveal>

        <Reveal>
          <form className="contactForm" onSubmit={handleSubmit}>
            <div className="formRow">
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me a bit about what you're working on..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <p className="formNote">
              Submitting opens your email client addressed to {profile.email}.
            </p>
            <button type="submit" className="btn btnPrimary" style={{ alignSelf: "flex-start" }}>
              Send message
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
