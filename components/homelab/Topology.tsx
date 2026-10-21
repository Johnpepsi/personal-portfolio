"use client";

import { useState } from "react";
import { edge, hosts, vlans, SHOW_ADDRESSES, type Host } from "@/lib/homelab";

const COLS = [110, 330, 550, 770, 990];
const W = 1100;
const H = 640;

const vcolor = (id: number) => `var(${vlans.find((x) => x.id === id)!.color})`;

export default function Topology() {
  const [selected, setSelected] = useState<string>("m910");
  const [hover, setHover] = useState<string | null>(null);
  const active = hover ?? selected;

  const pick = (id: string) => ({
    onClick: () => setSelected(id),
    onMouseEnter: () => setHover(id),
    onMouseLeave: () => setHover(null),
    onFocus: () => setHover(id),
    onBlur: () => setHover(null),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setSelected(id);
      }
    },
    tabIndex: 0,
    role: "button",
    className: "hlPick",
  });

  const activeVlan = hosts.find((h) => h.id === active)?.vlan;

  return (
    <div className="hlTopo">
      {/* Desktop / tablet diagram */}
      <div className="hlDiagram">
        <svg viewBox={`0 0 ${W} ${H}`} className="hlSvg" aria-label="Homelab network topology">
          {/* upstream links */}
          {[
            [62, 100],
            [142, 183],
            [227, 270],
          ].map(([y1, y2], i) => (
            <g key={i}>
              <line x1={550} y1={y1} x2={550} y2={y2} stroke="var(--hl-wire)" strokeWidth={2} />
              <line x1={550} y1={y1} x2={550} y2={y2} stroke="var(--hl-edge)" strokeWidth={2} className="hlFlow" />
            </g>
          ))}
          <text x={562} y={252} className="m" fill="var(--slate-light)" fontSize={11}>
            Gi1/0/24 · 802.1Q trunk
          </text>

          {/* switch → bus */}
          <line x1={550} y1={320} x2={550} y2={370} stroke="var(--hl-wire)" strokeWidth={2} />
          <line x1={COLS[0]} y1={370} x2={COLS[4]} y2={370} stroke="var(--hl-wire)" strokeWidth={2} />

          {/* VLAN drops + pills */}
          {vlans.map((vl, i) => {
            const on = activeVlan === vl.id;
            const c = `var(${vl.color})`;
            return (
              <g key={vl.id} opacity={activeVlan && !on ? 0.4 : 1} className="hlFade">
                <line x1={COLS[i]} y1={370} x2={COLS[i]} y2={400} stroke={c} strokeWidth={2} />
                <line x1={COLS[i]} y1={444} x2={COLS[i]} y2={470} stroke={c} strokeWidth={2} />
                <line x1={550} y1={370} x2={COLS[i]} y2={370} stroke={c} strokeWidth={2} className="hlFlow hlFlowSlow" opacity={on ? 1 : 0.55} />
                <rect x={COLS[i] - 85} y={400} width={170} height={44} rx={22} fill="var(--panel)" stroke={c} strokeWidth={on ? 2 : 1} />
                <text x={COLS[i]} y={418} textAnchor="middle" className="m" fill={c} fontSize={12} fontWeight={600}>
                  VLAN {vl.id}
                </text>
                <text x={COLS[i]} y={434} textAnchor="middle" className="m" fill="var(--slate)" fontSize={11}>
                  {vl.name}
                </text>
              </g>
            );
          })}

          <EdgeNode {...pick("internet")} x={550} y={40} w={140} label="Internet" sub="WAN" active={active === "internet"} />
          <EdgeNode {...pick("router")} x={550} y={121} w={220} label={edge.router.name} sub={SHOW_ADDRESSES ? edge.router.ip : "Upstream router"} active={active === "router"} />
          <EdgeNode {...pick("firewall")} x={550} y={205} w={240} label={edge.firewall.name} sub="Firewall · VLAN gateway" active={active === "firewall"} />
          <SwitchNode {...pick("switch")} active={active === "switch"} />

          {vlans.map((vl, i) => {
            const host = hosts.find((h) => h.vlan === vl.id)!;
            return <HostCard key={host.id} {...pick(host.id)} host={host} x={COLS[i]} active={active === host.id} dim={!!activeVlan && activeVlan !== vl.id} />;
          })}
        </svg>
        <p className="hlHint mono">Click any device to inspect it · packets animate along live links</p>
      </div>

      {/* Mobile stacked view */}
      <div className="hlMobile">
        <MobileChain onPick={setSelected} selected={selected} />
      </div>

      <Inspector id={active} />
    </div>
  );
}

/* ───────────── SVG pieces ───────────── */

type Pickable = React.SVGProps<SVGGElement>;

function EdgeNode({ x, y, w, label, sub, active, ...rest }: Pickable & { x: number; y: number; w: number; label: string; sub: string; active: boolean }) {
  return (
    <g {...rest}>
      <rect x={x - w / 2} y={y - 22} width={w} height={44} rx={4} fill="var(--panel)" stroke={active ? "var(--hl-edge)" : "var(--hl-wire)"} strokeWidth={active ? 2 : 1} className={active ? "hlShadow" : undefined} />
      <text x={x} y={y - 3} textAnchor="middle" fill="var(--navy)" fontSize={14} fontWeight={600}>
        {label}
      </text>
      <text x={x} y={y + 13} textAnchor="middle" className="m" fill="var(--slate)" fontSize={11}>
        {sub}
      </text>
    </g>
  );
}

function SwitchNode({ active, ...rest }: Pickable & { active: boolean }) {
  return (
    <g {...rest}>
      <rect x={340} y={270} width={420} height={50} rx={4} fill="var(--navy)" stroke={active ? "var(--hl-edge)" : "var(--navy)"} strokeWidth={active ? 3 : 1} className={active ? "hlShadow" : undefined} />
      <text x={358} y={292} fill="var(--paper)" fontSize={14} fontWeight={600}>
        {edge.switch.name}
      </text>
      <text x={358} y={308} className="m" fill="var(--slate-light)" fontSize={11}>
        L2 core
      </text>
      {Array.from({ length: 24 }).map((_, i) => {
        const n = i + 1;
        const vlan = vlans.find((vl) => vl.switchPorts.includes(`Gi1/0/${n}`));
        const fill = n === 24 ? "var(--hl-edge)" : n === 2 ? "var(--paper)" : vlan ? `var(${vlan.color}-port)` : "var(--navy-2)";
        return <rect key={n} x={478 + Math.floor(i / 2) * 22} y={281 + (i % 2) * 15} width={16} height={11} rx={1.5} fill={fill} />;
      })}
    </g>
  );
}

function HostCard({ host, x, active, dim, ...rest }: Pickable & { host: Host; x: number; active: boolean; dim: boolean }) {
  const c = vcolor(host.vlan);
  const running = host.services.filter((s) => s.status === "running");
  return (
    <g {...rest} opacity={dim ? 0.4 : 1} className={`${rest.className} hlFade`}>
      <rect x={x - 98} y={470} width={196} height={150} rx={4} fill="var(--panel)" stroke={active ? c : "var(--hl-wire)"} strokeWidth={active ? 2 : 1} className={active ? "hlShadow" : undefined} />
      <rect x={x - 98} y={470} width={196} height={4} fill={c} />
      <text x={x - 82} y={500} fill="var(--navy)" fontSize={15} fontWeight={600}>
        {host.name}
      </text>
      <text x={x - 82} y={518} fill="var(--slate)" fontSize={11}>
        {host.hardware.length > 26 ? host.hardware.slice(0, 25) + "…" : host.hardware}
      </text>
      {SHOW_ADDRESSES && host.ip && (
        <text x={x - 82} y={536} className="m" fill={c} fontSize={11}>
          {host.ip}
        </text>
      )}
      {running.slice(0, 4).map((s, i) => (
        <g key={s.name + i}>
          <circle cx={x - 78} cy={556 + i * 15} r={3} fill="var(--hl-live)" className="hlPulse" />
          <text x={x - 68} y={560 + i * 15} className="m" fill="var(--slate)" fontSize={11}>
            {s.name}
          </text>
        </g>
      ))}
      {running.length > 4 && (
        <text x={x + 82} y={606} textAnchor="end" className="m" fill="var(--slate-light)" fontSize={10}>
          +{running.length - 4} more
        </text>
      )}
      {host.services.length === 0 && (
        <text x={x - 82} y={560} className="m" fill="var(--slate-light)" fontSize={11}>
          client devices
        </text>
      )}
    </g>
  );
}

/* ───────────── Mobile ───────────── */

function MobileChain({ onPick, selected }: { onPick: (id: string) => void; selected: string }) {
  const chain = [
    { id: "internet", label: "Internet", sub: "WAN" },
    { id: "router", label: edge.router.name, sub: edge.router.role },
    { id: "firewall", label: edge.firewall.name, sub: edge.firewall.role },
    { id: "switch", label: edge.switch.name, sub: edge.switch.role },
  ];
  return (
    <>
      <div className="hlChain">
        {chain.map((c, i) => (
          <div key={c.id}>
            <button onClick={() => onPick(c.id)} className={`hlChainBtn ${selected === c.id ? "on" : ""}`}>
              <strong>{c.label}</strong>
              <span className="mono">{c.sub}</span>
            </button>
            {i < chain.length - 1 && <div className="hlChainWire" />}
          </div>
        ))}
      </div>
      {vlans.map((vl) => {
        const host = hosts.find((h) => h.vlan === vl.id)!;
        const on = selected === host.id;
        return (
          <button key={vl.id} onClick={() => onPick(host.id)} className="hlMobileHost" style={{ borderTopColor: `var(${vl.color})`, ...(on ? { borderColor: `var(${vl.color})` } : {}) }}>
            <span className="mono" style={{ color: `var(${vl.color})`, fontSize: "0.72rem" }}>
              VLAN {vl.id} · {vl.name}
            </span>
            <strong>{host.name}</strong>
            <span>{host.hardware}</span>
          </button>
        );
      })}
    </>
  );
}

/* ───────────── Inspector ───────────── */

function Inspector({ id }: { id: string }) {
  const host = hosts.find((h) => h.id === id);
  const vlan = host ? vlans.find((vl) => vl.id === host.vlan)! : null;
  const color = vlan ? `var(${vlan.color})` : "var(--brass)";

  let title = "";
  let kicker = "";
  let rows: [string, string][] = [];
  let body: React.ReactNode = null;

  if (host && vlan) {
    kicker = `VLAN ${vlan.id} · ${vlan.name}`;
    title = host.name;
    rows = [
      ["Hardware", host.hardware],
      ["OS", host.os],
      ["Role", host.role],
      ...(SHOW_ADDRESSES ? ([["Address", host.ip ?? "—"], ["Subnet", vlan.subnet]] as [string, string][]) : []),
      ["Switch ports", vlan.switchPorts.join(", ")],
    ];
    body = host.services.length ? (
      <ul className="hlServices">
        {host.services.map((s, i) => (
          <li key={s.name + i}>
            <span>
              <i className={s.status === "running" ? "live" : "planned"} />
              {s.name}
            </span>
            <span className="mono">{s.status === "planned" ? "planned" : SHOW_ADDRESSES && s.port ? `:${s.port}` : s.kind}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p>{vlan.purpose}</p>
    );
  } else if (id === "switch") {
    kicker = "Layer 2 · core";
    title = edge.switch.name;
    rows = [["Role", edge.switch.role]];
    body = (
      <div className="hlVlanBrief">
        {edge.switch.notes.map((n) => (
          <div key={n} className="mono hlNote">{n}</div>
        ))}
        <div className="mono hlBriefHead">show vlan brief</div>
        {vlans.map((vl) => (
          <div key={vl.id} className="mono hlBriefRow">
            <span style={{ color: `var(${vl.color})` }}>
              {vl.id} {vl.name}
            </span>
            <span>{vl.switchPorts.join(" ")}</span>
          </div>
        ))}
      </div>
    );
  } else if (id === "firewall") {
    kicker = "Edge · security";
    title = edge.firewall.name;
    rows = [["Role", edge.firewall.role], ...(SHOW_ADDRESSES ? ([["WAN side", edge.firewall.ip]] as [string, string][]) : [])];
    body = <p>Routes and filters traffic between all five VLANs over a single 802.1Q trunk, so storage, management and clients stay segmented.</p>;
  } else if (id === "router") {
    kicker = "Edge · upstream";
    title = edge.router.name;
    rows = [["Role", edge.router.role], ...(SHOW_ADDRESSES ? ([["Address", edge.router.ip]] as [string, string][]) : [])];
    body = <p>Compact travel router providing the upstream connection that feeds OPNsense.</p>;
  } else {
    kicker = "Upstream";
    title = "Internet";
    body = <p>Everything enters through the Beryl and is inspected by OPNsense before reaching any lab segment.</p>;
  }

  return (
    <aside className="hlInspector" aria-live="polite" style={{ borderTopColor: color }}>
      <div className="mono hlKicker" style={{ color }}>{kicker}</div>
      <h3>{title}</h3>
      {rows.length > 0 && (
        <dl>
          {rows.map(([k, val]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd className="mono">{val}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className="hlBody">{body}</div>
    </aside>
  );
}
