"use client";

import { useEffect, useState } from "react";

export default function FormattedDate({ dateString }: { dateString: string }) {
  const [formatted, setFormatted] = useState<string>("");

  useEffect(() => {
    try {
      const d = new Date(dateString);
      setFormatted(d.toLocaleString());
    } catch {
      setFormatted(dateString);
    }
  }, [dateString]);

  // Render a clean fallback or the client-formatted date
  return <span>{formatted || dateString.slice(0, 10)}</span>;
}
