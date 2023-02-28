import { Query, Mutation, MutationVerifyError, Member, utils } from ".";

export interface Country {
    name: string,

    gold_income: number,
    gold_store: number,

    material_income: number,
    material_store: number,

    population: number,
}

export class CountryQuery implements Query, Country {
    readonly id: string;

    readonly name: string;
    readonly leader: (Member & { id: string }) | null;

    readonly gold_income: number;
    readonly gold_store: number;

    readonly material_income: number;
    readonly material_store: number;

    readonly population: number;

    constructor(id: string, country: Country, leader?: (Member & { id: string })) {
        this.id = id;
        this.name = country.name;
        this.leader = leader ? leader : null;

        this.gold_income = country.gold_income;
        this.gold_store = country.gold_store;

        this.material_income = country.material_income;
        this.material_store = country.material_store;

        this.population = country.population;
    }
}

export class CountryMutation implements Mutation, Country {
    name: string;

    gold_income: number;
    gold_store: number;

    material_income: number;
    material_store: number;

    population: number;

    constructor(country: Country) {
        this.name = country.name;

        this.gold_income = country.gold_income;
        this.gold_store = country.gold_store;

        this.material_income = country.material_income;
        this.material_store = country.material_store;

        this.population = country.population;
    }

    verify(): MutationVerifyError | null {
        if (utils.isEmpty(this.name)) {
            return {
                property: "name",
                reason: "is empty",
            };
        }

        if (this.gold_store < 0) {
            return {
                property: "gold_store",
                reason: "< 0",
            };
        }

        if (this.material_store < 0) {
            return {
                property: "material_store",
                reason: "< 0",
            };
        }

        if (this.population < 0) {
            return {
                property: "population",
                reason: "< 0",
            };
        }

        return null;
    }
}