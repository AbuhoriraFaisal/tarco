/** @type {import('next').NextConfig} */
module.exports = {
  redirects() {
    return [
      {
        source: "/",
        destination: "/auth/login",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  // basePath: "/auth/login",
  experimental: {
    appDir: true,
  },
};
