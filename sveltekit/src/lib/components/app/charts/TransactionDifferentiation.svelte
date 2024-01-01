<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm";
  import dayjs from "dayjs";

  let canvas: HTMLCanvasElement;
  let chart: Chart;

  export let transactions: any = [];
  export let period: "month";

  let data: any;

  $: {
    data = getData(transactions, period);
    updateChart();
  }

  function getData(transactions: any, period: string) {
    const data = {
      income: [],
      expense: [],
      labels: [],
    };

    const sortedTransactions = transactions.sort(
      (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix()
    );
    const startDate = dayjs(sortedTransactions[0].date);
    const endDate = dayjs();
    const subtractUnits = endDate.diff(startDate, "month");

    for (let i = 0; i < subtractUnits; i++) {
      const month = dayjs(startDate).add(i, "month");

      const transactionsInThisMonth = sortedTransactions.filter((transaction) =>
        dayjs(transaction.date).isSame(month, "month")
      );

      let income = 0;
      let expense = 0;

      transactionsInThisMonth.forEach((transaction) => {
        if (transaction.type === "income") {
          income += transaction.amount;
        } else {
          expense += transaction.amount;
        }
      });

      data.income.push(income);
      data.expense.push(expense);
      data.labels.push(month.format("YYYY-MM"));
    }

    return data;
  }

  function updateChart() {
    if (chart) {
      chart.data.labels = data.labels;
      chart.data.datasets[0].data = data.income;
      chart.data.datasets[1].data = data.expense;
      chart.update();
    }
  }

  onMount(() => {
    const subtractUnits = period === "month" ? 12 : 12;

    const ctx = canvas.getContext("2d");
    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Income",
            data: data.income,
            backgroundColor: "green",
          },
          {
            label: "Expense",
            data: data.expense,
            backgroundColor: "red",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: "bottom",
          },
        },

        scales: {
          x: {
            type: "time",
            time: {
              unit: "month",
              min: dayjs().subtract(subtractUnits, "month").toISOString(),
              max: dayjs().toISOString(),
            },
            ticks: {
              font: {
                size: 10,
              },
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                size: 10,
              },
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
