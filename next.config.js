/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // If you deploy to https://<username>.github.io/<repo-name> (NOT a custom
  // domain / not a "<username>.github.io" root repo), uncomment the two
  // lines below and set them to your repo name so asset paths resolve:
  //
  // basePath: "/personal-reactwebapp",
  // assetPrefix: "/personal-reactwebapp",
};

module.exports = nextConfig;
