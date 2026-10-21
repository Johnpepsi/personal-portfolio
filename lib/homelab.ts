// ─────────────────────────────────────────────────────────────
//  Homelab data — the single source of truth for the site.
//  NOTE: No passwords or login usernames are stored here, on purpose.
//  Set SHOW_ADDRESSES to false to hide internal IPs/ports on a public deploy.
// ─────────────────────────────────────────────────────────────

export const SHOW_ADDRESSES = true;

export type Status = "running" | "planned";

export type Service = {
  name: string;
  kind: string; // short category label
  port?: number;
  status: Status;
};

export type Host = {
  id: string;
  name: string;
  hardware: string;
  os: string;
  ip?: string;
  vlan: number;
  role: string;
  services: Service[];
};

export type Vlan = {
  id: number;
  name: string;
  subnet: string;
  gateway: string;
  purpose: string;
  switchPorts: string[];
  color: string; // CSS color var name
};

export const vlans: Vlan[] = [
  {
    id: 10,
    name: "Workstation",
    subnet: "10.0.10.0/24",
    gateway: "10.0.10.1",
    purpose: "Laptops and phones — the daily-driver devices.",
    switchPorts: ["Gi1/0/3", "Gi1/0/4", "Gi1/0/5"],
    color: "--hl-v10",
  },
  {
    id: 20,
    name: "Storage",
    subnet: "10.0.20.0/24",
    gateway: "10.0.20.1",
    purpose: "NAS, file browsers, OpenMediaVault and Plex.",
    switchPorts: ["Gi1/0/7", "Gi1/0/10"],
    color: "--hl-v20",
  },
  {
    id: 30,
    name: "Virtualization",
    subnet: "10.0.30.0/24",
    gateway: "10.0.30.1",
    purpose: "Proxmox hypervisors and Windows Server 2019 VMs.",
    switchPorts: ["Gi1/0/1", "Gi1/0/12"],
    color: "--hl-v30",
  },
  {
    id: 40,
    name: "Network Mgmt",
    subnet: "10.0.40.0/24",
    gateway: "10.0.40.1",
    purpose: "Monitoring, container management and the UniFi controller.",
    switchPorts: ["Gi1/0/9"],
    color: "--hl-v40",
  },
  {
    id: 50,
    name: "RPi Servers",
    subnet: "10.0.50.0/24",
    gateway: "10.0.50.1",
    purpose: "Raspberry Pi app servers, Docker and development.",
    switchPorts: ["Gi1/0/13"],
    color: "--hl-v50",
  },
];

export const edge = {
  router: {
    name: "GL.iNet Beryl",
    role: "Upstream router",
    ip: "192.168.1.1",
  },
  firewall: {
    name: "OPNsense",
    role: "Firewall + inter-VLAN gateway",
    ip: "192.168.8.212",
  },
  switch: {
    name: "Cisco Catalyst",
    role: "Layer-2 core switch · 802.1Q",
    notes: ["Gi1/0/24 — trunk to OPNsense", "Gi1/0/2 — Ubiquiti UniFi AP"],
  },
};

export const hosts: Host[] = [
  {
    id: "workstations",
    name: "Workstations",
    hardware: "Laptops · phone",
    os: "Mixed",
    ip: "10.0.10.x",
    vlan: 10,
    role: "Client devices",
    services: [],
  },
  {
    id: "rpi4b",
    name: "Storage Pi",
    hardware: "Raspberry Pi 4B",
    os: "Linux",
    ip: "10.0.20.100",
    vlan: 20,
    role: "NAS, media & DNS filtering",
    services: [
      { name: "Docker", kind: "Containers", status: "running" },
      { name: "OpenMediaVault", kind: "NAS", status: "running" },
      { name: "Pi-hole", kind: "DNS", port: 8005, status: "running" },
      { name: "Plex", kind: "Media", port: 32400, status: "running" },
      { name: "SMB share", kind: "Storage", status: "running" },
    ],
  },
  {
    id: "m910",
    name: "Hypervisor",
    hardware: "Lenovo ThinkCentre M910",
    os: "Proxmox VE",
    ip: "10.0.30.29",
    vlan: 30,
    role: "Primary virtualization host",
    services: [
      { name: "Proxmox VE", kind: "Hypervisor", port: 8006, status: "running" },
      { name: "TFTP", kind: "Network boot", status: "running" },
      { name: "File Browser", kind: "Files", port: 8080, status: "running" },
      { name: "Dashboard", kind: "Homepage", port: 8080, status: "running" },
      { name: "Windows Server 2019", kind: "VM", status: "planned" },
    ],
  },
  {
    id: "rpi3",
    name: "Mgmt Pi",
    hardware: "Raspberry Pi 3 · PoE HAT",
    os: "Ubuntu Server",
    ip: "10.0.40.100",
    vlan: 40,
    role: "Monitoring & network control",
    services: [
      { name: "Grafana", kind: "Monitoring", port: 3000, status: "running" },
      { name: "Portainer", kind: "Containers", port: 9000, status: "running" },
      { name: "UniFi Controller", kind: "Wi-Fi", port: 8443, status: "running" },
    ],
  },
  {
    id: "rpi4",
    name: "App Pi",
    hardware: "Raspberry Pi 4",
    os: "Ubuntu Server",
    ip: "10.0.50.100",
    vlan: 50,
    role: "App server & media streaming",
    services: [
      { name: "File Browser", kind: "Files", port: 8080, status: "running" },
      { name: "Jellyfin", kind: "Media", port: 8096, status: "running" },
    ],
  },
];

export const hardware = [
  { name: "Lenovo ThinkCentre M910", type: "Mini PC", use: "Proxmox hypervisor", status: "running" as Status },
  { name: "Lenovo ThinkCentre M920q", type: "Tiny PC", use: "Second Proxmox node", status: "planned" as Status },
  { name: "Lenovo ThinkCentre M73", type: "Mini PC", use: "Lab / backup node", status: "planned" as Status },
  { name: "Raspberry Pi 4B", type: "SBC", use: "Storage, DNS & Plex", status: "running" as Status },
  { name: "Raspberry Pi 4", type: "SBC", use: "Jellyfin & app server", status: "running" as Status },
  { name: "Raspberry Pi 3 + PoE HAT", type: "SBC", use: "Grafana, Portainer, UniFi", status: "running" as Status },
  { name: "Cisco Catalyst switch", type: "Switch", use: "VLAN core, trunk on Gi1/0/24", status: "running" as Status },
  { name: "Cisco 1941 router", type: "Router", use: "DNS + DHCP lab", status: "planned" as Status },
  { name: "Ubiquiti UniFi AP", type: "Access point", use: "Wireless, on Gi1/0/2", status: "running" as Status },
];

export const roadmap = [
  { name: "Active Directory + GPOs", on: "Windows Server 2019", area: "Identity" },
  { name: "FreeIPA", on: "Linux VM", area: "Identity" },
  { name: "SIEM — Graylog or ELK", on: "Linux VM", area: "Security" },
  { name: "Zeek network monitoring", on: "Linux VM", area: "Security" },
  { name: "TrueNAS", on: "Proxmox VM", area: "Storage" },
  { name: "Proxmox Backup Server", on: "Debian VM", area: "Backups" },
  { name: "Apache web servers", on: "Ubuntu VM", area: "Web" },
  { name: "Cisco 1941 DNS + DHCP", on: "Isolated segment", area: "Networking" },
];

export const skills = [
  {
    group: "Core Sysadmin",
    items: ["Hypervisor management", "VM lifecycle", "Backups", "Storage", "Networking & VLANs", "Identity management", "Monitoring"],
  },
  {
    group: "DevOps / Cloud",
    items: ["Containers (Docker / Kubernetes)", "CI/CD (GitLab/Gitea + runners)", "Infrastructure-as-Code", "Automation (Ansible)"],
  },
  {
    group: "Security",
    items: ["Firewalls", "IDS / IPS", "SIEM", "Logging", "Network segmentation"],
  },
];
