import Link from "next/link";
import Reveal from "./Reveal";
import Topology from "./homelab/Topology";
import { HomelabStats } from "./homelab/Sections";

export default function Homelab() {
  return (
    <section className="section" id="homelab">
      <div className="wrap">
        <Reveal className="sectionHead">
          <span className="sectionNum">04 — Homelab</span>
          <h2>The lab behind the work</h2>
          <p>
            A segmented network I use to test everything first — OPNsense at the edge, a Cisco
            VLAN core, a Proxmox hypervisor and a Raspberry Pi fleet running storage, media, DNS
            filtering and monitoring.
          </p>
        </Reveal>

        <Reveal>
          <HomelabStats />
        </Reveal>

        <Reveal>
          <Topology />
        </Reveal>

        <Reveal className="hlMore">
          <Link href="/homelab" className="btn btnPrimary">
            Explore the full lab →
          </Link>
          <Link href="/homelab#roadmap" className="btn btnOutline">
            See what&apos;s next
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
