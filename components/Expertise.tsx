import { skills } from "@/lib/data";
import { CodeIcon, ContainerIcon, ServerIcon } from "./Icons";
import Reveal from "./Reveal";

const iconMap = {
  code: CodeIcon,
  container: ContainerIcon,
  server: ServerIcon,
};

export default function Expertise() {
  return (
    <section className="section" id="expertise">
      <div className="wrap">
        <Reveal className="sectionHead">
          <span className="sectionNum">01 — Expertise</span>
          <h2>What I work on</h2>
          <p>
            Three areas cover most of my day-to-day: shipping applications, automating how
            they&apos;re deployed, and keeping the systems underneath them healthy.
          </p>
        </Reveal>

        <Reveal>
          <div className="skillsGrid">
            {skills.map((skill) => {
              const Icon = iconMap[skill.icon];
              return (
                <div className="skillCard" key={skill.title}>
                  <div className="skillIcon">
                    <Icon size={22} />
                  </div>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                  <div className="chipRow">
                    {skill.stack.map((item) => (
                      <span className="chip" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
