import { ImageResponse } from "next/og";
import { profile, site } from "@/lib/content";

export const alt = site.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded social-share card matching the Terminal Craft dark theme. */
export default function OpenGraphImage() {
  const host = site.url.replace(/^https?:\/\//, "");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0e0d",
          color: "#e7edea",
          padding: 80,
          borderLeft: "16px solid #6df0a1",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", color: "#6df0a1", fontSize: 30 }}>
          {"> qaasim:~$ ./hello"}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>
            {profile.name}
          </div>
          <div style={{ display: "flex", fontSize: 36, color: "#8c9a93", marginTop: 20 }}>
            {profile.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#8c9a93",
          }}
        >
          <span style={{ color: "#6df0a1" }}>1M+ users · Flutter · Next.js · NOSTR</span>
          <span>{host}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
