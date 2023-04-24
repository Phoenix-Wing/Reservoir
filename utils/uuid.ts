export function validateUuid(uuid: string | string[]): boolean {
    let id = "";

    if (Array.isArray(uuid)) {
        id = uuid[0];
    } else {
        id = uuid;
    }

    // https://ihateregex.io/expr/uuid/
    return /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(id);
}
