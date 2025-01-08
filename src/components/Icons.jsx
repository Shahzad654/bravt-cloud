import { RiCoreosFill } from "react-icons/ri";
import { SiOpenbsd } from "react-icons/si";
import { FaWindows, FaUbuntu, FaFreebsd } from "react-icons/fa";
import {
  SiCentos,
  SiDebian,
  SiOpensuse,
  SiFedora,
  SiArchlinux,
  SiAlpinelinux,
  SiRockylinux,
  SiAlmalinux,
} from "react-icons/si";

export const Icons = {
  windows: {
    icon: FaWindows,
    color: "#0078D4",
  },
  ubuntu: {
    icon: FaUbuntu,
    color: "#E95420",
  },
  "fedora-coreos": {
    icon: RiCoreosFill,
    color: "#0B57A4",
  },
  coreos: {
    icon: RiCoreosFill,
    color: "#0B57A4",
  },
  freebsd: {
    icon: FaFreebsd,
    color: "#AB2B28",
  },
  rockylinux: {
    icon: SiRockylinux,
    color: "#10B981",
  },
  almalinux: {
    icon: SiAlmalinux,
    color: "#1E81E7",
  },
  debian: {
    icon: SiDebian,
    color: "#A81D33",
  },
  archlinux: {
    icon: SiArchlinux,
    color: "#1793D1",
  },
  centos: {
    icon: SiCentos,
    color: "#932279",
  },
  flatcar: {
    icon: ({ size, ...props }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 550 339"
        width={size}
        height={size}
        {...props}
      >
        <path
          fill="#09BAC8"
          d="M315.538 48.938h-16.069v16.069h16.069zM275.365 186.255h-32.868v16.069h32.868zM388.579 186.255v16.069h32.138v-16.069z"
        />
        <path
          fill="#09BAC8"
          d="M533.749 193.551h-16.15v96.826H501.45V129.101h-32.401V0H80.951v129.101h-32.4v161.377H32.4v-96.826H16.15v96.826H0v31.666h32.4v16.037h48.551v-16.037h16.15v16.037h48.448v-16.037h258.8v16.037h48.55v-16.037h16.15v16.037h48.55v-16.037H550v-31.666h-16.251zM363.721 16.442h80.85v32.276H420.6v64.55h-32.299v-64.55h-24.58zm-258.799 0h64.699v23.851h-32.4V56.33h32.4V80.89h-32.4v32.276h-32.299zm73.13 185.431h-48.551v32.275h48.551v48.413h-97V153.562h97zm7.719-88.605V16.442h32.401v64.55h32.4v32.276zm137.83 72.569v96.826h-48.55V234.25H242.65v48.413H194.1V169.699h16.149v-16.036h96.999v16.036h16.15zm-8.43-72.569V80.993h-16.15v32.275H266.62V32.58h16.15V16.544h48.55V32.58h16.15v80.688zM469.15 234.25h-16.149v16.036h16.149v32.275H420.6v-32.173h-16.048v-16.037h-16.149v48.413h-48.551V153.562H469.15z"
        />
      </svg>
    ),
  },
  alpinelinux: {
    icon: SiAlpinelinux,
    color: "#0D597F",
  },
  opensuse: {
    icon: SiOpensuse,
    color: "#73BA25",
  },
  fedora: {
    icon: SiFedora,
    color: "#294172",
  },
  openbsd: {
    icon: SiOpenbsd,
    color: "#CF4229",
  },
};

export const getIcon = (val) => {
  const formattedName = val.replace(/ /g, "-").toLowerCase();

  const matchingKeys = Object.keys(Icons).filter((key) =>
    formattedName.startsWith(key)
  );

  matchingKeys.sort((a, b) => b.length - a.length);

  const matchedKey = matchingKeys[0];

  if (matchedKey) {
    const { icon: Icon, color } = Icons[matchedKey];
    return { Icon, color };
  }

  return { Icon: null, color: null };
};
