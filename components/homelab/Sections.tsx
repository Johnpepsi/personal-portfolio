import { hosts, vlans, hardware, roadmap, SHOW_ADDRESSES } from "@/lib/homelab";

export const runningCount = hosts.flatMap((h) => h.services).filter((s) => s.status === "running").length;

export function HomelabStats() {
  const stats: [string, number][] = [
    ["VLANs", vlans.length],
    ["Servers", hosts.filter((h) => h.services.length).length],
    ["Services", runningCount],
    ["Planned", roadmap.length],
  ];
  return (
    <dl className="hlStats">
      {stats.map(([k, n]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{n}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Segments() {
  return (
    <div className="hlSegGrid">
      {vlans.map((vl) => (
        <div className="hlSeg" key={vl.id} style={{ borderTopColor: `var(${vl.color})` }}>
          <div className="hlSegId" style={{ color: `var(${vl.color})` }}>{vl.id}</div>
          <h3>{vl.name}</h3>
          {SHOW_ADDRESSES && <div className="mono">{vl.subnet}</div>}
          <p>{vl.purpose}</p>
        </div>
      ))}
    </div>
  );
}

export function Hardware() {
  return (
    <div className="hlHwGrid">
      {hardware.map((hw) => (
        <div className="hlHw" key={hw.name}>
          <div>
            <div className="hlHwType">{hw.type}</div>
            <h3>{hw.name}</h3>
            <p>{hw.use}</p>
          </div>
          <span className={`hlStatus ${hw.status === "running" ? "live" : "planned"}`}>
            {hw.status === "running" ? "live" : "planned"}
          </span>
        </div>
      ))}
    </div>
  );
}

export function Roadmap() {
  return (
    <ol className="hlRoadmap">
      {roadmap.map((r, i) => (
        <li key={r.name}>
          <span className="hlRoadNum">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3>{r.name}</h3>
            <p>on {r.on}</p>
          </div>
          <span className="chip">{r.area}</span>
        </li>
      ))}
    </ol>
  );
}
