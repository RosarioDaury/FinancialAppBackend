import { FastifyInstance } from "fastify"
import { JSONSchemaType } from "ajv"

const HTTP200 = {
    $id: "HTTP200",
    type: "object",
    required: "success",
    properties: {
        success: {
            type: "boolean",
            nullable: false,
            default: true
        }
    }
}

const HTTP4xx = {
    $id: 'HTTP4xx',
    type: 'object',
    required: ['success'],
    properties: {
        success: {
            type: 'boolean',
            nullable: false,
            default: false
        },
        error: {
            type: 'string',
            nullable: true
        },
    }
}

const HTTP5xx = {
    $id: 'HTTP5xx',
    type: 'object',
    required: ['success'],
    properties: {
        success: {
            type: 'boolean',
            nullable: false,
            default: false
        },
        error: {
            type: 'string',
            nullable: true
        },
    }
}

const PAGINATION = {
    $id: 'PAGINATION',
    type: 'object',
    required: ['success', 'pagination', 'data'],
    properties: {
        success: {
            type: 'boolean',
            nullable: false,
            default: true
        },
        pagination: {
            type: 'object',
            required: ['size', 'page'],
            properties: {
                size: {
                    type: 'integer',
                    nullable: false,
                    minimum: 0
                },
                page: {
                    type: 'integer',
                    nullable: false,
                    mininum: 1
                }
            }
        },
        data: {
            type: 'array',
            nullable: false,
            items: {
                type: 'object',
                nullable: false,
                additionalProperties: true
            } as {
                type: 'object',
                nullable: false,
                additionalProperties?: boolean,
                required?: JSONSchemaType<object>['required'],
                properties?: JSONSchemaType<object>['properties']
            }
        }
    }
}


export const defaultResponseSchemes = {
    HTTP200,
    HTTP4xx,
    HTTP5xx,
    PAGINATION
}


export const setDefaultResponseSchemas = async (app: FastifyInstance) => {
    app.addSchema(HTTP200);
    app.addSchema(HTTP4xx);
    app.addSchema(HTTP5xx);
    app.addSchema(PAGINATION);
}   