import fastify, { FastifyInstance } from "fastify";
import 'dotenv/config';
import { config } from "./config/envConfig";
import {dbConnection} from '#database';
import registerError from "./plugins/errorFileHandler";
import schemaReply from "./plugins/schemaReply";
import responseSchemes from "./plugins/responseSchemes";
import { setDefaultResponseSchemas } from "./shared/schemes/responseSchemes";
import routes from "./services/routes";
import fastifyCors from "@fastify/cors";

interface IServer<T> {
    port: number;
    app: FastifyInstance;
    listen(): void;
    close(): void;
}

export class Server implements IServer<Server> {
    port = config.PORT;
    app = fastify({
        logger: true
    });
    static async createServer(): Promise<void> {
        const server = new Server();    
        //* CHECK DATABASE CONNECTION
        await server.testDatabaseConnection();
        //* Set Up Fastify Instance (Hooks, Decorator, Plugins)
        await server.setUpServer();
        //* Set up Routes
        await server.setRoutes();

        await server.listen()
    }


    async testDatabaseConnection(): Promise<void> {
        try {
            await dbConnection.authenticate();
            console.log('[DATABASE LOGGER] DB CONNECTED')
        } catch( error ) {
            console.log(`[ERROR] ERROR WHILE CONNECTING TO DATABASE \n\n ${error}`)
            registerError({
                title: "ERROR WHILE CONNECTION TO DATABASE",
                code: 'bd-01',
                error: String(error)
            })
        }
    }


    async listen() {
        await this.app.listen({
            port: Number(this.port),
            host: config.HOST,
            listenTextResolver: (address) => {
                return `Listening to "${config.PROJECTNAME}" on ${address}`
            }
        }, (err, address) => {
            if(err) {
                console.log(`ERROR AT RUNNING "${config.PROJECTNAME}"`);
                console.log(err);
                return;
            }
            console.log(`Listening to "${config.PROJECTNAME}" on ${address}`);
        })
    }

    async setUpServer() {
        //* Set CORS
        this.app.register(fastifyCors, {
            origin: '*',
            methods: 'GET,PUT,POST,DELETE'
        })

        // * SET RESPONSE SCHEMA DECORATOR TO USE THAT FUNCTION FROM THE ROUTE'S SCHEMA 
        this.app.decorate('ResponseSchema', responseSchemes.ResponseSchema);
        this.app.decorateReply('registerError', null);

        // * Hooks onRequest
        this.app.addHook('onRequest', async (req, res) => {
            res.registerError = registerError,
            res.res200 = schemaReply.res200,
            res.res4xx = schemaReply.res4xx,
            res.res500 = schemaReply.res500
        })

    }


    async setRoutes() {
        await setDefaultResponseSchemas(this.app);
        await this.app.register(routes, { prefix: '/api' })
    }

    async close () {
        if (this.app.server.listening) {
            await this.app.close();
        }
    }
}


