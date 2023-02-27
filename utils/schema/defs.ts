export interface Query {}

export interface Mutation {
    verify(): null | MutationVerifyError;
}

export interface MutationVerifyError {
    property: string,
    reason?: string,
}
