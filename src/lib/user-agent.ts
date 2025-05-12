"use server";

import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

export const isMobileDevice = async () => {
  if (typeof process === "undefined") {
    throw new Error("서버 환경에서만 사용할 수 있습니다.");
  }

  const ua = headers().get("user-agent");
  const device = new UAParser(ua || "").getDevice();

  return device.type === "mobile";
};
