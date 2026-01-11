import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Turbopack uses the `web` folder as the absolute workspace root
  turbopack: {
    // `path.resolve(__dirname)` points to the `web` directory where this config lives
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
