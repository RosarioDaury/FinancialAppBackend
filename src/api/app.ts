import { configDotenv } from "dotenv";
import { Server } from "./server";


function Run() {
    Server.createServer();
}

Run();
