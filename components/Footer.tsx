import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap footerInner">
        <p>
          © {year} {profile.name}. Built &amp; maintained in-house.
        </p>
        <div className="footerLinks">
          <a href={profile.github} target="_blank" rel="noreferrer" className="iconLink">
            <GithubIcon size={16} /> GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="iconLink">
            <LinkedinIcon size={16} /> LinkedIn
          </a>
          <a href="#top" className="backTop">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
