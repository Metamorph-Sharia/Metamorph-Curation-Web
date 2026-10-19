import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  output: "standalone", // the container image runs .next/standalone (Dockerfile)
  experimental: {
    // A text correction carries the whole text: the longest held is 1.8 MB, so the default 1 MB won't do.
    serverActions: { bodySizeLimit: "4mb" },
  },
  turbopack: {
    root: import.meta.dirname, // this repository, not a lockfile found further up
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
