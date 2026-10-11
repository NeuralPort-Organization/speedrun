import type { NextConfig } from "next";

// cacheComponents is intentionally OFF: pages read the gr_pid cookie freely without
// Suspense boundaries. Keeps main buildable while 5 people ship fast.
const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
