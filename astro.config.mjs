import MillionLint from "@million/lint";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import playformInline from "@playform/inline";
import compressor from "astro-compressor";
import playformCompress from "@playform/compress";
import purgecss from "astro-purgecss";
import icon from "astro-icon";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
const _plugins = [MillionLint.vite()];
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    playformInline(),
    purgecss({
      fontFace: true,
      keyframes: false,
      rejected: true,
      variables: true,
      extractors: [
        {
          extractor: (content) =>
            content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
          extensions: ["astro", "html"],
        },
      ],
    }),
    playformCompress(),
    compressor({
      gzip: false,
      brotli: true,
    }),
    icon(),
  ],
  output: "hybrid",
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
});
