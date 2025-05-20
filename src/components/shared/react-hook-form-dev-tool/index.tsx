import type { DevTool as DevToolBase } from "@hookform/devtools";
import dynamic from "next/dynamic";

export const DevTool =
  process.env.NODE_ENV === "production"
    ? () => {}
    : (dynamic(
        () => import("@hookform/devtools").then((module) => module.DevTool),
        { ssr: false },
      ) as typeof DevToolBase);
