/** @type {import('next').NextConfig} */
const nextConfig = {
  // Proxy to back-end in development mode.
  async rewrites() {
    return process.env.NGINX
      ? []
      : [
          {
            source: '/',
            destination: 'http://localhost:4000',
          },
          {
            source: '/graphql',
            destination: 'http://localhost:4000/graphql',
          },
          {
            source: '/api/:path*',
            destination: 'http://localhost:4000/api/:path*',
          },
        ];
  },

  // Inject secure headers like Helmet.
  // https://nextjs.org/docs/advanced-features/security-headers.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Send app codename.
          {
            key: 'X-Attendance-Web',
            value: 'Azami',
          },

          // Send app version number.
          {
            key: 'X-Attendance-Web-Version',
            value: process.env.npm_package_version,
          },

          // Allow prefetching.
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },

  // Enable minification.
  swcMinify: true,

  // Enable React Strict Mode.
  reactStrictMode: true,
};

module.exports = nextConfig;
