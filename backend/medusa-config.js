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
  process.env.DATABASE_URL || "postgres://default:DEIkX9zF2scm@ep-dawn-dew-a29irtcr.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require";

const REDIS_URL = process.env.REDIS_URL || "redis://default:AbNjAAIncDFjNDM1NThkZmE2Yzc0ZjY2ODU3YmM3MTI1ZDE3MjdlZXAxNDU5MjM@right-coyote-45923.upstash.io:6379";

const STRIPE_API_KEY = "pk_test_51PByeqRt3Mqw8BGPJ37aQMlUeDe5xY59ZMysLXqZNCh70jmvv1w7mR9uMr8fTKL4MMHoCskJ3xaZut8CziUQlSVl00VDjpZmGX"
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
      backend_url: "https://agoma.luc-developpement.com"
    },
  },
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      utoRebuild: true,
      develop:{
        open: process.env.OPEN_BROWSER == "false",
      }
    },
  },
  {
    resolve: "medusa-payment-stripe",
    options: {
      api_keys: STRIPE_API_KEY,
      webhook_secret: "whsec_fXFBIcdJaon9tFTqAX4gIFdkZr8itlMc"
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
  eventBus: {
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
  },
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  redis_url: REDIS_URL,
  auth_cors: process.env.AUTH_CORS,
  worker_mode: process.env.MEDUSA_WORKER_MODE,
  // Uncomment the following lines to enable REDIS
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig: {
    database_url: "postgres://default:DEIkX9zF2scm@ep-dawn-dew-a29irtcr.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require",
    database_type: "postgres",
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
    auth_cors: process.env.AUTH_CORS,
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
    redis_url: REDIS_URL,
    worker_mode: "worker",
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
