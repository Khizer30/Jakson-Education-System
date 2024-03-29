/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({ dest: "public" }) ;

const nextConfig = { reactStrictMode: true, swcMinify: true, typescript: { ignoreBuildErrors: true } } ;

module.exports = withPWA(nextConfig) ;