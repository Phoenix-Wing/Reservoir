export interface VerifyError {
    property: string,
    reason?: string,
}

export interface CountryMutation {
    gold_income: number | null,
    gold_store: number | null,
    material_income: number | null,
    material_store: number | null,
    population: number | null,
}

export function verifyCountryMutation(mutation: CountryMutation): VerifyError | null {
    if (mutation.gold_store != null && mutation.gold_store < 0) {
        return {
            property: "gold_store",
            reason: "must be >= 0",
        };
    }

    if (mutation.material_store != null && mutation.material_store < 0) {
        return {
            property: "material_store",
            reason: "must be >= 0",
        };
    }

    if (mutation.population != null && mutation.population < 0) {
        return {
            property: "population",
            reason: "must be >= 0",
        };
    }

    return null;
}
