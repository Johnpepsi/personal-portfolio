import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section className="hero">
      <div id="top" />
      <div className="wrap heroInner">
        <div>
          <div className="eyebrow">Available for new engagements</div>
          <h1>{profile.name}</h1>
          <p className="heroRole">
            Full-Stack Developer &amp; <strong>IT Systems Specialist</strong>
          </p>
          <p className="heroLede">{profile.lede}</p>
          <div className="heroCta">
            <a href="#contact" className="btn btnPrimary">
              Get in touch
            </a>
            <a href="#experience" className="btn btnOutline">
              View experience
            </a>
          </div>
          <div className="statusLine">
            <span>
              <span className="statusDot">●</span> <b>Location</b> {profile.location}
            </span>
            <span>
              <span className="statusDot">●</span> <b>Focus</b> Full-Stack Dev · IT
              Infrastructure
            </span>
            <span>
              <span className="statusDot">●</span> <b>Building since</b>{" "}
              {profile.buildingSince}
            </span>
          </div>
        </div>
        <div className="badgeCircle">{profile.initials}</div>
      </div>
    </section>
  );
}
