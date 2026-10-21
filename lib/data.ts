export const profile = {
  name: "John Ashley Palaganas",
  initials: "JP",
  role: "Full-Stack Developer & IT Systems Specialist",
  location: "Regina, Saskatchewan, Canada",
  email: "palaganasjohnashley@gmail.com",
  github: "https://github.com/Johnpepsi",
  linkedin: "https://www.linkedin.com/in/jpalaganas/",
  lede:
    "I build web-applications and maintain systems and infrastructure behind homelab environments — from React & Flask applications to the servers, networks, and microsoft environments they run on. Based in Regina, Saskatchewan.",
  buildingSince: "2021",
};

export const navItems = [
  { label: "Expertise", href: "/#expertise" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Homelab", href: "/homelab" },
];

export type Skill = {
  icon: "code" | "container" | "server";
  title: string;
  description: string;
  stack: string[];
};

export const skills: Skill[] = [
  {
    icon: "code",
    title: "Full-Stack Web Development",
    description:
      "Developed web applications using React and Flask, following structured practices from requirement gathering through testing and deployment. Comfortable maintaining both frontend and backend in a Linux server environment.",
    stack: ["React", "JavaScript", "Python", "Flask", "PHP", "SQL", "PostgreSQL", "REST"],
  },
  {
    icon: "container",
    title: "DevOps & Automation",
    description:
      "Built and managed Docker containers on Ubuntu servers to host internal tools, configuring networking, persistent storage, and restart policies for reliability. Maintain self-hosted application environments end to end.",
    stack: ["Docker", "CI/CD", "GitHub Actions", "AWS", "Azure", "IaC", "Grafana", "Jenkins"],
  },
  {
    icon: "server",
    title: "IS/System Administration",
    description:
      "Administer Windows Server and Linux in virtualized environments (Proxmox, VMWare). Develop and maintain Group Policy Objects (GPOs) to enforce security policies, system configurations, and organizational standards.",
    stack: ["Active Directory", "Azure AD", "Proxmox", "Hyper-V", "PowerShell", "MS Exchange"],
  },
];

export type TimelineItem = {
  date: string;
  title: string;
  subtitle: string;
  tags: string[];
};

export const workExperience: TimelineItem[] = [
  {
    date: "2025 — Present",
    title: "System Support Tech L2",
    subtitle: "Regina Airport · Regina, Saskatchewan",
    tags: [
      "Azure AD / Entra ID",
      "Patching",
      "Preventive Maintenance",
      "Workstation & Device Deployment",
      "Network Cable Management",
      "Airline Application Support",
      "Server Installation",
      "Microsoft 365 Support",
    ],
  },
  {
    date: "2023 — 2025",
    title: "IT Administrator",
    subtitle: "Regina, Saskatchewan",
    tags: [
      "Active Directory",
      "Group Policy (GPO)",
      "TCP/IP Troubleshooting",
      "RBAC",
      "DHCP / IP Management",
      "Server Administration",
      "Microsoft Entra",
      "Virtualization",
      "Incident Management",
      "MDM",
    ],
  },
  {
    date: "2024 — Present",
    title: "Freelance Web Developer",
    subtitle: "Regina, Saskatchewan",
    tags: [
      "Frontend & Backend Development",
      "Wordpress",
      "React",
      "API Integration",
      "Auth (JWT / Sessions)",
      "CI/CD Basics",
      "Domain & DNS Management",
      "Cloudflare",
      "SEO",
      "MySQL",
      "NGINX",
    ],
  },
];

export const labExperience: TimelineItem[] = [
  {
    date: "Ongoing",
    title: "DevOps / Self-Hosting",
    subtitle: "Personal infrastructure lab",
    tags: [
      "RESTful API Design",
      "Database Integration",
      "Authentication Systems",
      "Linux Web Servers",
      "Apache",
      "GitLab",
      "MySQL Admin",
      "Reverse Proxy",
      "Docker",
    ],
  },
  {
    date: "Tinatamad",
    title: "System Administration",
    subtitle: "Virtualization & identity",
    tags: [
      "Proxmox",
      "OPNsense Firewall",
      "Windows Server",
      "Group Policy",
      "Identity & Access Management",
      "Cisco Gear",
    ],
  },
  {
    date: "Tinatamad",
    title: "Networking Environment",
    subtitle: "CCNA lab & network design",
    tags: [
      "VLAN Segmentation",
      "Cisco Packet Tracer",
      "Wireshark Analysis",
      "Inter-VLAN Routing",
      "LAN/WAN Configuration",
      "Switch & Router Diagnostics",
      "VPN",
      "Infrastructure Monitoring",
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  url: string;
  linkLabel: string;
};

export const projects: Project[] = [
  {
    title: "Client Web Application",
    description:
      "A static web application built for a client, including contact information, forms, and service details, with a PHP backend for communication.",
    url: "http://www.goosecreekbernese.ca/",
    linkLabel: "Visit",
  },
  {
    title: "About Me Portfolio",
    description:
      "A separate static webapp showcasing homelab infrastructure — including the hardware used for hosting and building servers.",
    url: "https://johnpepsi.github.io/portfolio-lang/",
    linkLabel: "Visit",
  },
  {
    title: "Pokémon Search API",
    description:
      "Built to practice fetching and rendering data from a public API using vanilla JavaScript and the DOM.",
    url: "https://jpal-pokemonapi.netlify.app/",
    linkLabel: "Visit",
  },
  {
    title: "War Card Game",
    description:
      "A card game built in Swift as a practice project, focused on fast, reliable, and visually clean UI.",
    url: "https://github.com/Johnpepsi/WarCardUI",
    linkLabel: "GitHub",
  },
  {
    title: "Meme Kit",
    description:
      "A DOM manipulation project built for fun, sharpening skills around working with the Document Object Model.",
    url: "https://github.com/Johnpepsi/my-memeKit",
    linkLabel: "GitHub",
  },
  {
    title: "QR GitHub Scanner",
    description:
      "First developed QR project, generating a scannable link to a GitHub profile using an NPM module and Git Bash scripting.",
    url: "https://github.com/Johnpepsi/QR-imageproject/",
    linkLabel: "GitHub",
  },
];
