import type { ComponentType, SVGProps } from "react";
import {
  BoltIcon,
  ChipIcon,
  CloudIcon,
  CodeIcon,
  CompassIcon,
  EmailIcon,
  GithubIcon,
  GlobeIcon,
  LanguagesIcon,
  LayersIcon,
  LinkedInIcon,
  MonitorIcon,
  PaletteIcon,
  ServerIcon,
  ShieldIcon,
  SlidersIcon,
  TerminalIcon,
  TwitterIcon,
} from "@/components/icons";

type Icon = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

const skillIcons: Record<string, Icon> = {
  monitor: MonitorIcon,
  server: ServerIcon,
  cloud: CloudIcon,
  chip: ChipIcon,
  bolt: BoltIcon,
  layers: LayersIcon,
  globe: GlobeIcon,
  code: CodeIcon,
  palette: PaletteIcon,
  sliders: SlidersIcon,
  shield: ShieldIcon,
  languages: LanguagesIcon,
  compass: CompassIcon,
  terminal: TerminalIcon,
};

const socialIcons: Record<string, Icon> = {
  github: GithubIcon,
  linkedin: LinkedInIcon,
  email: EmailIcon,
  twitter: TwitterIcon,
};

export function skillIcon(key: string): Icon {
  return skillIcons[key] ?? MonitorIcon;
}

export function serviceIcon(key: string): Icon {
  return skillIcons[key] ?? GlobeIcon;
}

export function socialIcon(key: string): Icon {
  return socialIcons[key] ?? GithubIcon;
}
