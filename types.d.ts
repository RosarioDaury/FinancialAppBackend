import { SchemaReplyType } from "#/plugins/schemaReply";
import { RegisterErrorType } from "#/plugins/errorFileHandler";

declare module 'fastify' {
    interface FastifyReply extends FastifyReply, SchemaReplyType, RegisterErrorType {}
} 