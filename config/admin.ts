export default ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
    sessions: {
      maxSessionLifespan: 24 * 60 * 60 * 1000, // 1 Tag
      maxRefreshTokenLifespan: 7 * 24 * 60 * 60 * 1000, // 7 Tage
    },
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  secrets: {
    encryptionKey: env("ENCRYPTION_KEY"),
  },
  flags: {
    nps: env.bool("FLAG_NPS", true),
    promoteEE: env.bool("FLAG_PROMOTE_EE", true),
  },
});
