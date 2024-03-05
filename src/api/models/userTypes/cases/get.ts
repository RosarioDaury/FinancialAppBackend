import { PartialUserTypesAttributes } from "#/models/userTypes/model";

const UserTypes: PartialUserTypesAttributes[] = [
    {
        id: 1,
        type: 'Person'
    },
    {
        id: 2,
        type: 'Company'
    }
] 

export const getAll = (): PartialUserTypesAttributes[] => {
    return UserTypes
}

export const getOne = ( filter: string | number ): PartialUserTypesAttributes => {
    if(typeof filter == 'number') return UserTypes.filter(type => type.id == filter)[0] || {};
    if(typeof filter == 'string') return UserTypes.filter(type => type.type == filter)[0] || {};

    return {};
}