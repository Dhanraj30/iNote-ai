import { Clerk } from "@clerk/clerk-sdk-node";

// Initialize Clerk with the secret key
const clerk = Clerk({
  apiKey: process.env.CLERK_SECRET_KEY,
});
 
export { clerk };