<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm";
  import dayjs from "dayjs";

  let canvas: HTMLCanvasElement;
  let chart: Chart;

  export let transactions: any = [];
  export let period: "week" | "month" | "year";

  let data: any;

  $: {
    data = getData(transactions, period);
    updateChart();
  }

  function getData(transactions: any, period: string) {
    const data = {
      income: [],
      expense: [],
      net: [],
      labels: [],
    };

    const subtractUnits = period === "week" ? 7 : period === "month" ? 30 : 365;

    // Get date 30 days, 7 days, or 1 year ago based on the selected period
    const startDate = dayjs().subtract(subtractUnits, "day");

    // Filter transactions from the last 30 days, 7 days, or 1 year
    const recentTransactions = transactions.filter((transaction) =>
      dayjs(transaction.date).isAfter(startDate)
    );

    const sortedTransactions = recentTransactions.sort(
      (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix()
    );

    // Initialize income and expense
    let income = 0;
    let expense = 0;

    // Create a data point for each day
    for (let i = 0; i < subtractUnits; i++) {
      const date = dayjs(startDate).add(i, "day");

      const transactionsOnThisDay = sortedTransactions.filter((transaction) =>
        dayjs(transaction.date).isSame(date, "day")
      );

      transactionsOnThisDay.forEach((transaction) => {
        if (transaction.type === "income") {
          income += transaction.amount;
        } else {
          expense += transaction.amount;
        }
      });

      data.income.push(income);
      data.expense.push(expense);
      data.net.push(income - expense);
      data.labels.push(date.format("MM/DD/YYYY"));
    }

    return data;
  }

  function updateChart() {
    if (chart) {
      chart.data.labels = data.labels;
      chart.data.datasets[0].data = data.income;
      chart.data.datasets[1].data = data.expense;
      chart.data.datasets[2].data = data.net;
      chart.update();
    }
  }

  onMount(() => {
    const subtractUnits = period === "week" ? 7 : period === "month" ? 30 : 365;

    const ctx = canvas.getContext("2d");
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Income",
            data: data.income,
            borderColor: "green",
            fill: false,
          },
          {
            label: "Expense",
            data: data.expense,
            borderColor: "red",
            fill: false,
          },
          {
            label: "Net Income",
            data: data.net,
            borderColor: "#D4AF37",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
          },
        },

        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
              min: dayjs().subtract(subtractUnits, "day").toISOString(),
              max: dayjs().toISOString(),
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value: number) {
                return "$" + Number(value).toLocaleString();
              },
            },
          },
        },
      },
    });
  });
</script>

<canvas bind:this={canvas} class="mx-auto w-full h-full" />
