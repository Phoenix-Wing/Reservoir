export interface Query {
    readonly id: string,
}

export interface Mutation {
    verify(): null | MutationVerifyError;
}

export interface MutationVerifyError {
    property: string,
    reason?: string,
}
