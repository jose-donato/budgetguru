import dayjs from "dayjs";

export function filterTransactionsByPeriod(transactions: any, period: string) {
    const subtractUnits = period === "week" ? 7 : period === "month" ? 30 : 365;
    const startDate = dayjs().subtract(subtractUnits, "day");

    return transactions.filter((transaction) =>
        dayjs(transaction.date).isAfter(startDate)
    );
}

export function getTotalAmount(filteredTransactions: any) {
    const totalBalance = filteredTransactions.reduce((acc, curr) => {
        return acc + curr.amount;
    }, 0);

    const income = filteredTransactions
        .filter((transaction) => transaction.type === "income")
        .reduce((acc, curr) => {
            return acc + curr.amount;
        }, 0);

    const expenses = filteredTransactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((acc, curr) => {
            return acc + curr.amount;
        }, 0);

    return {
        totalBalance,
        income,
        expenses
    }
}