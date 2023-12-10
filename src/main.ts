import 'module-alias/register';
import "dotenv/config";
import "@/lib/state";
import { initializeBot } from "@/bot";

const main = async () => {
  console.log("Starting Cosmic Universe Bot");
  initializeBot();
};

main();
