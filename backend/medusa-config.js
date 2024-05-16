const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || "https://test-w2f1-git-main-luclouveau615s-projects.vercel.app";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS;

const DATABASE_URL =
  process.env.DATABASE_URL || "postgresql://postgres:cTxGSLvfeVwGnfVYWBKMmeAbFIPPbYNW@monorail.proxy.rlwy.net:23159/railway";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const STRIPE_API_KEY = "sk_test_51PByeqRt3Mqw8BGPw6Bh3vz0ai40cHzC0s4KuRuO4UNgXqpy87QctvYDEA3D9FGk8IXeVEFQvmiAhLbwLefTjGzO00FQbZPIsI"
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
    },
  },
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },
  {
    resolve: "medusa-payment-stripe",
    options: {
      api_keys: STRIPE_API_KEY
    },
  },
  {
    resolve: "medusa-payment-paypal",
    options: {
      sandbox: process.env.PAYPAL_SANDBOX,
      clientId: process.env.PAYPAL_CLIENT_ID,
      clientSecret: process.env.PAYPAL_CLIENT_SECRET,
    },
  },
];

const modules = {
  /*eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },*/
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  // Uncomment the following lines to enable REDIS
  // redis_url: REDIS_URL
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig:{
    database_extra: process.env.NODE_ENV !== "development" ?
      {
        ssl: {
          rejectUnauthorized: false,
        },
      } : {},
  },
  plugins,
  modules,
};
