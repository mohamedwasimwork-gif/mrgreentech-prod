/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export so Cloudflare Pages can serve the site from its edge
  // CDN with no Node runtime. Every page in this app is a client
  // component that fetches data from the FastAPI backend at runtime,
  // so SSR is not required.
  //
  // To run a real Node SSR build locally (e.g. for debugging), comment
  // this line out temporarily.
  output: 'export',
  // next/image can't optimise on a static export — disable the loader
  // since we already use plain <img> tags with external CDN URLs.
  images: { unoptimized: true },
  // Trailing slashes match Cloudflare Pages routing conventions.
  trailingSlash: true,
};

module.exports = nextConfig;
