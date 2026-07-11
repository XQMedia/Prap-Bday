/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export → `npm run build` writes a self-contained site to `out/`.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,

  // Deploying to GitHub Pages as a *project* site (e.g. XQMedia.github.io/Prap-Bday)?
  // Uncomment these two lines so asset URLs resolve under the repo sub-path:
  // basePath: "/Prap-Bday",
  // assetPrefix: "/Prap-Bday/",
};

export default nextConfig;
