import { defineConfig } from "vite"
import RubyPlugin from "vite-plugin-ruby"
import Erb from "vite-plugin-erb"
import path from "path"
import { existsSync, readFileSync } from "node:fs"

import { brotliCompressSync } from "zlib"
import gzipPlugin from "rollup-plugin-gzip"

const certPath = ".ssl/development.crt"
const keyPath = ".ssl/development.key"

const projectRootDir = path.resolve(__dirname)

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  resolve: {
    alias: {
      "plugins/i18n-js":       path.resolve(projectRootDir, "app/assets/javascripts/plugins/i18n-js/index.ts.erb"),
    },
  },
  build: {
    commonjsOptions: {
      include: [
        /node_modules/,
      ],
    },
  },
  plugins: [
    Erb(),
    RubyPlugin(),
    // GZIP compression as .gz files
    gzipPlugin(),
    // Brotil compression as .br files
    gzipPlugin({
      customCompression: content => brotliCompressSync(Buffer.from(content)),
      fileName:          ".br",
    }),
  ],
  server: {
    // HTTPS locally
    // https://mattbrictson.com/blog/rails-vite-localhost-https
    https: existsSync(certPath)
      ? { key: readFileSync(keyPath), cert: readFileSync(certPath) }
      : {},
    // Disable auto reload
    hmr: true,
  },
})
