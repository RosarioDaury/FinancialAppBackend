import type { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { SchemaReplyType } from "#/plugins/schemaReply";
import { RegisterErrorType } from "#/plugins/errorFileHandler";
import { TResponseSchemaPlugin } from "#/plugins/responseSchemes";
import { JwtPayload } from 'jsonwebtoken';

declare module 'jsonwebtoken' {
    interface UserJwtPayload extends JwtPayload {
        id: number
    }
}
declare module 'fastify' {
    interface FastifyInstance extends TResponseSchemaPlugin {}
    interface FastifyReply extends FastifyReply, SchemaReplyType, RegisterErrorType {}
} 