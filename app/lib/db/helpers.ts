type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CNY'; // Add more as needed

export function formatBigNumber(value: number, currency: Currency, isExpense: boolean) {
    let formattedNumber = Number(value).toLocaleString('en-US', {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 2,
        minimumFractionDigits: (value % 1 !== 0) ? 2 : 0 // Show decimal cases only if there are decimal cases in the value
    });

    return isExpense ? '-' + formattedNumber : formattedNumber;
}