"use client";

import { useEffect } from "react";
import { profile } from "@/lib/content";

/** A friendly note for the curious who pop open DevTools. Logs exactly once. */
export function ConsoleSignature() {
  useEffect(() => {
    const accent = "color:#6df0a1;font-family:monospace;font-size:12px";
    const muted = "color:#8c9a93;font-family:monospace;font-size:12px";
    console.log("%c> whoami", accent);
    console.log(`%c${profile.name} · ${profile.role}`, "font-family:monospace;font-size:12px");
    console.log(
      "%cInspecting the source? Respect. If you build delightful mobile or web things, let's talk:",
      muted,
    );
    console.log(`%c${profile.email}`, accent);
    console.log(`%c${profile.studioEmail}`, accent);
  }, []);

  return null;
}
