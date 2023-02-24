interface IncomeConfirmation {
    confirm: boolean,
}

export default defineEventHandler(async (event) => {
    const confirmation = await readBody<IncomeConfirmation>(event);

    if (!confirmation.confirm) {
        throw createError({
            statusCode: 400,
            statusMessage: "Malformed request. Please set 'confirm' to true to distribute the income.",
        });
    }

    // TODO

    return {
        status: "Ok",
    };
});
