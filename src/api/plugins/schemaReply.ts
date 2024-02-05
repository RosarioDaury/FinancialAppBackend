import type { FastifyReply } from "fastify";


type Res200Options = {
    [key: string]: any
}


function res200 (res: FastifyReply, data: Res200Options) {
    return res.status(200).send({
        ...(data ?? []),
        success: true
    });
}

type ResErrorOptions =  {
    httpCode?: 400 | 401 | 403 | 404 | 406,
    error?: string | null
}

function res4xx (res: FastifyReply, data: ResErrorOptions) {
    if(!data) {
        return res.status(400).send({
            success: false,
            error: 'Bad Request'
        })
    }

    return res.status(data.httpCode ?? 400).send({
        success: false,
        error: data.error ?? "Bad Request"
    })
}



function res500 (res: FastifyReply, data: ResErrorOptions) {
    if(!data){
        return res.status(500).send({
            success: false,
            error: 'Internal Server Error'
        })
    }

    return res.status(data.httpCode ?? 500).send({
        success: false,
        error: data.error ?? "Internal Server Error"
    })
}

export type SchemaReplyType = {
    res200: typeof res200,
    res4xx: typeof res4xx,
    res500: typeof res500,
}

export default {
    res200,
    res4xx,
    res500
}