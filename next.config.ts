import type { NextConfig } from "next";
const config: NextConfig = {
  devIndicators: false,
  outputFileTracingIncludes: {
    "/*": ["./migrations/*.sql"],
  },
};
export default config;
