import type { FastifyRequest, FastifyReply, RouteGenericInterface, RouteHandler, RouteHandlerMethod } from 'fastify';
import { UserJwtPayload } from 'jsonwebtoken';


export type WithTokenRequest<RouteGeneric extends RouteGenericInterface = RouteGenericInterface> = FastifyRequest<RouteGeneric & {Headers: {token: string, user: UserJwtPayload}}>;
export type TokenRequestHandler<RouteGeneric extends RouteGenericInterface = RouteGenericInterface> = (req: WithTokenRequest<RouteGeneric>, res: FastifyReply) => Promise<any>;