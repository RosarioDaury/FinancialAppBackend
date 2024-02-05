import { defaultResponseSchemes } from "../shared/schemes/responseSchemes";
import { JSONSchemaType } from "ajv";

interface ResponseSchema {
    HTTP200(): this,
    HTTP4xx(): this,
    HTTP5xx(): this,
    PAGINATION(): this,
    [key: string]: any
}

class ResponseSchema {
    
    HTTP200(obj?: JSONSchemaType<object>){
        if(!obj){
            this['200'] = {$ref: defaultResponseSchemes.HTTP200.$id}
            return this
        }

        const {$id, ...response} = structuredClone(defaultResponseSchemes.HTTP200);

        response.required.concat(obj.required ?? []);
        response.properties = Object.assign(response.properties, obj.properties ?? {});

        this['200'] = response;
        return response;
    } 
    
    HTTP4XX() {
        this['4xx'] = { $ref: defaultResponseSchemes.HTTP4xx }
        return this;
    }

    HTTP5XX() {
        this['5xx'] = { $ref: defaultResponseSchemes.HTTP5xx }
        return this;
    }

    PAGINATION(obj?: JSONSchemaType<object>) {
        const {$id, ...pagination} = structuredClone(defaultResponseSchemes.PAGINATION);

        pagination.properties.data.items.additionalProperties = undefined;
        pagination.properties.data.items.required = obj?.required;
        pagination.properties.data.items.properties = obj?.properties;

        this['200'] = pagination;

        return this;
    }
}


export function FnResponsesSchema() {
    return new ResponseSchema();
}