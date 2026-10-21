import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Topology from "@/components/homelab/Topology";
import { HomelabStats, Segments, Hardware, Roadmap } from "@/components/homelab/Sections";

export const metadata: Metadata = {
  title: "Homelab — John Ashley Palaganas",
  description:
    "A segmented homelab: OPNsense, a Cisco VLAN core, Proxmox and a Raspberry Pi fleet running storage, media, DNS and monitoring.",
};

function Head({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal className="sectionHead">
      <span className="sectionNum">{num}</span>
      <h2>{title}</h2>
      <p>{children}</p>
    </Reveal>
  );
}

export default function HomelabPage() {
  return (
    <>
      <Nav />
      <header className="hlPageHead">
        <div id="top" />
        <div className="wrap">
          <Link href="/" className="hlBack">← Back to portfolio</Link>
          <div className="eyebrow">Infrastructure &amp; Homelab</div>
          <h1>A segmented homelab, built to learn real infrastructure.</h1>
          <p>
            OPNsense at the edge, a Cisco VLAN core, a Proxmox hypervisor and a fleet of
            Raspberry Pis — each workload on its own isolated network, with the firewall deciding
            what can talk to what.
          </p>
          <HomelabStats />
        </div>
      </header>

      <section className="section" id="topology">
        <div className="wrap">
          <Head num="01 — Topology" title="How it's wired">
            Traffic flows from the upstream router through OPNsense, down an 802.1Q trunk into the
            switch, and out to five isolated VLANs.
          </Head>
          <Reveal>
            <Topology />
          </Reveal>
        </div>
      </section>

      <section className="section" id="segments">
        <div className="wrap">
          <Head num="02 — Segments" title="Network segments">
            Each workload class lives on its own subnet, so storage, management and client traffic
            stay separated.
          </Head>
          <Reveal>
            <Segments />
          </Reveal>
        </div>
      </section>

      <section className="section" id="hardware">
        <div className="wrap">
          <Head num="03 — Hardware" title="The rack">
            Small, quiet, low-power machines — mini PCs for virtualization, Raspberry Pis for
            always-on services.
          </Head>
          <Reveal>
            <Hardware />
          </Reveal>
        </div>
      </section>

      <section className="section" id="roadmap">
        <div className="wrap">
          <Head num="04 — Roadmap" title="What's being built next">
            The next phase turns the lab into a miniature enterprise: directory services,
            centralized logging, intrusion detection and proper backups.
          </Head>
          <Reveal>
            <Roadmap />
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
