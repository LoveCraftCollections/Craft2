import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // The Arena preview is served from this host and connects to Next's dev HMR endpoint cross-origin.
  allowedDevOrigins: ["3000-icd8qdy5j008qmv18z477.e2b.app"],
};

export default nextConfig;
