import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { nextCookies } from 'better-auth/next-js';

// Global Mongo singleton (for dev hot-reload)
const globalForMongo = globalThis as unknown as {
  _mongoClient?: MongoClient;
};

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI is not set');
}

// Reuse a single MongoClient instance to avoid connection storms during dev reloads.
let client: MongoClient;
if (process.env.NODE_ENV === 'production') {
  client = new MongoClient(uri);
} else {
  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(uri);
  }
  client = globalForMongo._mongoClient;
}

const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client, // For enabling database transactions.
  }),
  user: { modelName: 'users' },
  emailAndPassword: {
    enabled: true,
  },
  session: {
    // Control session lifetime and automatic refresh behavior.
    expiresIn: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    cookieCache: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      enabled: true,
      maxAge: 5 * 60, // Cache the cookie for 5 minutes.
      httpOnly: true,
    },
  },
  rateLimit: {
    // Brute-force protection enabled in production.
    enabled: process.env.NODE_ENV === 'production',
    window: 60, // 60 seconds
    max: 100, // 100 requests per window
    storage: 'database', // Persist rate limit state in MongoDB.
    modelName: 'rateLimit',
    customRules: {
      // Apply stricter limits to auth endpoints.
      '/sign-in/email': { window: 10, max: 5 },
      '/sign-up/email': { window: 10, max: 5 },
      '/sign-in': { window: 10, max: 5 },
      '/get-session': false, // Allow frequent session checks.
    },
  },
  baseURL: process.env.NEXT_PUBLIC_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'],
  plugins: [nextCookies()],
  experimental: { joins: true },
});
