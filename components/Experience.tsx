"use client";

import { useState } from "react";
import { workExperience, labExperience, TimelineItem } from "@/lib/data";
import Reveal from "./Reveal";

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div>
      {items.map((item) => (
        <div className="timelineItem" key={item.title}>
          <div className="timelineDate">{item.date}</div>
          <div className="timelineBody">
            <h3>{item.title}</h3>
            <h4>{item.subtitle}</h4>
            <div className="tagLine">
              {item.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Experience() {
  const [tab, setTab] = useState<"work" | "lab">("work");

  return (
    <section className="section" id="experience">
      <div className="wrap">
        <Reveal className="sectionHead">
          <span className="sectionNum">02 — Experience</span>
          <h2>Professional background</h2>
          <p>
            A mix of enterprise IT System support and independent development work, plus the
            homelab where I test everything first.
          </p>
        </Reveal>

        <Reveal className="expTabs">
          <button
            className={`expTab ${tab === "work" ? "active" : ""}`}
            onClick={() => setTab("work")}
          >
            Professional Experience
          </button>
          <button
            className={`expTab ${tab === "lab" ? "active" : ""}`}
            onClick={() => setTab("lab")}
          >
            Infrastructure &amp; Homelab
          </button>
        </Reveal>

        <Reveal>
          {tab === "work" ? <Timeline items={workExperience} /> : <Timeline items={labExperience} />}
        </Reveal>
      </div>
    </section>
  );
}
