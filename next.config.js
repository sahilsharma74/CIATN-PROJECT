const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname, './'),
  async redirects() {
    return [
      // Legacy Wix pages redirects
      { source: '/enquiry-form', destination: '/contact', permanent: true },
      { source: '/blank', destination: '/', permanent: true },
      // Legacy Wix course URLs with encoded or legacy slug variations
      { source: '/courses/masterclass-in-mesotherapy-%26-prp', destination: '/courses/masterclass-in-mesotherapy-prp', permanent: true },
      { source: '/courses/masterclass-in-mesotherapy-&-prp', destination: '/courses/masterclass-in-mesotherapy-prp', permanent: true },
      { source: '/courses/fellowship-in-facial-aesthetics-%26-clinical-cosmetology', destination: '/courses/fellowship-in-facial-aesthetics-clinical-cosmetology', permanent: true },
      { source: '/courses/fellowship-in-facial-aesthetics-&-clinical-cosmetology', destination: '/courses/fellowship-in-facial-aesthetics-clinical-cosmetology', permanent: true },
      { source: '/courses/pg-diploma-in-trichology-(pgdt)', destination: '/courses/pg-diploma-in-trichology', permanent: true },
      { source: '/courses/pg-diploma-in-clinical-cosmetology-(pgdcc)', destination: '/courses/pg-diploma-in-clinical-cosmetology', permanent: true },
    ];
  },
};

module.exports = nextConfig;
