import { JSONSchemaType } from "ajv";

type MinMaxNumber = {
    min?: number,
    max?: number
}

type MinMaxDate = {
    min?: string,
    max?: string
}

type GeneralOptions<T extends any = any> = {
    nullable?: boolean,
    description?: string,
    default?: T
}

type ValidatorType<
    Return extends string | number | boolean | undefined = undefined,
    Interface extends {} | undefined = undefined
> = ( options ?: (Interface extends undefined ? GeneralOptions<Return> : (GeneralOptions<Return> & Interface))) => JSONSchemaType<Return>


const getErrorMessage = ( validator: string, options: any ) => {
    return JSON.stringify({
        type: validator,
        ...options
    })
}

const isString: ValidatorType<string, MinMaxNumber> = (options) => {
    const {
        min,
        max,
        description,
        nullable = false
    } = options ?? {};


    return {
        type: 'string',
        minLength: min,
        maxLength: max,
        nullable,
        description
    }
}


const isBoolean: ValidatorType<boolean> = (options) => {
    const{
        description,
        nullable = false
    } = options ?? {}

    return {
        type: 'boolean',
        nullable,
        description,
    }
}


const isInteger: ValidatorType<number, MinMaxNumber> = (options) => {
    const {
        min,
        max,
        description, 
        nullable
    } = options ?? {}


    return {
        type: 'number',
        format: 'int64',
        minimum: min,
        maximum: max,
        nullable,
        description,
    }
}

const isDouble: ValidatorType<number, MinMaxNumber> = (opts) => {

    const {
        min,
        max,
        description,
        nullable = false
    } = opts ?? {};

    return {
        type: 'number',
        format: 'double',
        minimum: min,
        maximum: max,
        nullable,
        description,
    }

}

const isDateOnly: ValidatorType<string, MinMaxDate> = (opts) => {

    const {
        min,
        max,
        description,
        nullable = false
    } = opts ?? {};

    return {
        type: 'string',
        format: 'date',
        formatMinimum: min,
        formatMaximum: max,
        nullable,
        description,

    }

}


const isEmail: ValidatorType<string, MinMaxNumber> = (opts) => {

    const {
        min,
        max,
        description,
        nullable = false
    } = opts ?? {};

    return {
        type: 'string',
        minLength: min,
        maxLength: max,
        nullable,
        description,

    }

}


type FnIsObject = (opts: {
    required?: readonly string[],
    nullable?: boolean,
    properties: {
        [key: string]: JSONSchemaType<any> | object
    },
    examples?: any[]
}) => JSONSchemaType<object>;

const isObject: FnIsObject = function ({ required, nullable, properties, examples }) {

    return {
        type: 'object',
        nullable,
        required: required as any,
        properties,
        examples
    }

}



type FnIsObjectArray = (opts: ({
    items: JSONSchemaType<boolean> | JSONSchemaType<number> | JSONSchemaType<string> | JSONSchemaType<object>,
    uniqueItems?: true,
    examples?: any[],
    description?: string
} & MinMaxNumber)) => JSONSchemaType<object[]>;

const isArray: FnIsObjectArray = function (opts) {

    const {
        min,
        max,
        uniqueItems,
        description,
        items,
        examples
    } = opts ?? {};

    return {
        type: 'array',
        items,
        examples,
        maxItems: max,
        minItems: min,
        uniqueItems,
        description,
    }

}


export const V = {
    isArray,
    isBoolean,
    isDateOnly,
    isDouble,
    isEmail,
    isInteger,
    isObject,
    isString,
}

export default V;
