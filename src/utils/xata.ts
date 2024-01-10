// This would allow you to wrap the generated client from src/xata.ts with your own credentials
import { XataClient } from "~/xata.ts";

export const xata = new XataClient({
  apiKey: import.meta.env.XATA_API_KEY,
  branch: import.meta.env.XATA_BRANCH,
});
