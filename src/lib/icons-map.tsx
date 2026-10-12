import type { ComponentType, SVGProps } from "react";
import {
  BoltIcon,
  ChipIcon,
  CloudIcon,
  EmailIcon,
  GithubIcon,
  LayersIcon,
  LinkedInIcon,
  MonitorIcon,
  ServerIcon,
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

export function socialIcon(key: string): Icon {
  return socialIcons[key] ?? GithubIcon;
}
