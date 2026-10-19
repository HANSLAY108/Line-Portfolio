import dns from "dns/promises";
import net from "net";

/**
 * Checks if a given IP address is private, loopback, or cloud metadata.
 */
export function isPrivateIP(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const parts = ip.split(".").map(Number);
    // 127.0.0.0/8 (Loopback)
    if (parts[0] === 127) return true;
    // 10.0.0.0/8 (Private)
    if (parts[0] === 10) return true;
    // 172.16.0.0/12 (Private)
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
    // 192.168.0.0/16 (Private)
    if (parts[0] === 192 && parts[1] === 168) return true;
    // 169.254.0.0/16 (Link-local / AWS/GCP/Azure metadata 169.254.169.254)
    if (parts[0] === 169 && parts[1] === 254) return true;
    // 0.0.0.0/8
    if (parts[0] === 0) return true;
    return false;
  }

  if (net.isIPv6(ip)) {
    const normalized = ip.toLowerCase();
    // Loopback
    if (normalized === "::1" || normalized === "0:0:0:0:0:0:0:1") return true;
    // Unique local address fc00::/7
    if (normalized.startsWith("fc") || normalized.startsWith("fd")) return true;
    // Link-local fe80::/10
    if (normalized.startsWith("fe80")) return true;
    return false;
  }

  return true;
}

/**
 * Validates a user-supplied URL against SSRF threats.
 */
export async function validateSafeUrl(rawUrl: string): Promise<{ safe: boolean; url?: URL; error?: string }> {
  let target: URL;
  try {
    let cleanUrl = rawUrl.trim();
    if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      cleanUrl = `https://${cleanUrl}`;
    }
    target = new URL(cleanUrl);
  } catch {
    return { safe: false, error: "Invalid URL format" };
  }

  // Only allow http and https
  if (target.protocol !== "http:" && target.protocol !== "https:") {
    return { safe: false, error: "Only HTTP and HTTPS protocols are allowed." };
  }

  const hostname = target.hostname.toLowerCase();

  // Block localhost and internal names
  if (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal")
  ) {
    return { safe: false, error: "Localhost and internal hosts cannot be audited." };
  }

  // If hostname is directly an IP
  if (net.isIP(hostname)) {
    if (isPrivateIP(hostname)) {
      return { safe: false, error: "Private or internal IP addresses cannot be audited." };
    }
    return { safe: true, url: target };
  }

  // Resolve DNS to verify underlying IP addresses
  try {
    const addresses = await dns.lookup(hostname, { all: true });
    for (const record of addresses) {
      if (isPrivateIP(record.address)) {
        return { safe: false, error: `Domain points to internal address (${record.address}). Request blocked.` };
      }
    }
  } catch (err: any) {
    return { safe: false, error: `DNS lookup failed for ${hostname}: ${err.message}` };
  }

  return { safe: true, url: target };
}
