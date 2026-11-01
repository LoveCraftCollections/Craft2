import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // The Arena preview is served from a *.e2b.app host and connects to Next's
  // dev HMR endpoint cross-origin.
  allowedDevOrigins: ["*.e2b.app", "3000-icd8qdy5j008qmv18z477.e2b.app"],
  images: {
    // AVIF first (smaller payloads on mobile), WebP fallback, then the original.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 360, 390, 414, 430, 480, 640, 750, 828, 960, 1080, 1200, 1376],
    imageSizes: [40, 56, 64, 80, 88, 96, 128, 160, 192, 224, 256, 320, 384, 440, 512, 660, 880],
    minimumCacheTTL: 60 * 60 * 24 * 31,
  },
};

export default nextConfig;
