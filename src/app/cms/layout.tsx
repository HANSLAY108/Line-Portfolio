import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS — Line Morelle",
  robots: { index: false, follow: false, nocache: true },
};

export const instant = false;

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return <div className="cms-scope">{children}</div>;
}
