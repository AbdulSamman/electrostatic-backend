export default ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      sizeLimit: 200 * 1024 * 1024, // 200 MB für Videos
      allowedTypes: [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/svg+xml",
        "video/mp4",
        "video/webm",
        "video/quicktime", // .mov
      ],
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
