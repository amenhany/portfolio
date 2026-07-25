import type { NextConfig } from 'next';
import withMDX from '@next/mdx';

const nextConfig: NextConfig = {
    reactCompiler: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    experimental: {
        turbopackFileSystemCacheForDev: false,
    },
};

export default withMDX()(nextConfig);
