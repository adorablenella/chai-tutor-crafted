/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "lh3.googleusercontent.com",
      "fldwljgzcktqnysdkxnn.supabase.co",
      "avatar.vercel.sh",
      "ik.imagekit.io",
      "public.blob.vercel-storage.com",
      "res.cloudinary.com",
      "abs.twimg.com",
      "pbs.twimg.com",
      "avatars.githubusercontent.com",
      "www.google.com",
      "flag.vercel.app",
      "illustrations.popsy.co",
    ],
  },
  reactStrictMode: false,
};
