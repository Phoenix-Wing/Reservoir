import { Query, Mutation, MutationVerifyError, Country, utils } from ".";

export interface Member {
    name: string,
    ig_name: string | null,
}

export class MemberQuery implements Query, Member {
    readonly id: string;

    readonly name: string;
    readonly ig_name: string | null;

    readonly countries: (Country & { id: string })[] | null;

    constructor(id: string, member: Member) {
        this.id = id;
        this.name = member.name;
        this.ig_name = member.ig_name ? member.ig_name : null;
        this.countries = null;
    }
}

export class MemberMutation implements Mutation, Member {
    name: string;
    ig_name: string | null;

    constructor(member: Member) {
        this.name = member.name;
        this.ig_name = member.ig_name ? member.ig_name : null;
    }

    verify(): MutationVerifyError | null {
        if (utils.isEmpty(this.name)) {
            return {
                property: "name",
                reason: "is empty",
            };
        }

        if (this.ig_name ? utils.isEmpty(this.ig_name) : false) {
            return {
                property: "ig_name",
                reason: "is empty",
            };
        }

        return null;
    }
}
