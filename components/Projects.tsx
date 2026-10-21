import { projects } from "@/lib/data";
import { ArrowUpRightIcon } from "./Icons";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="wrap">
        <Reveal className="sectionHead">
          <span className="sectionNum">03 — Projects</span>
          <h2>Selected work</h2>
          <p>
            A mix of client work and personal builds — used to learn new tools or solve a
            real, specific problem.
          </p>
        </Reveal>

        <Reveal>
          <div className="projGrid">
            {projects.map((project) => (
              <div className="projCard" key={project.title}>
                <div className="projTop">
                  <h3>{project.title}</h3>
                  <a
                    className="projLink"
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.linkLabel} <ArrowUpRightIcon size={12} />
                  </a>
                </div>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
