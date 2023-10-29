<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import { categoriesInfo } from "$lib/utils/helpers";
  import dayjs from "dayjs";

  let canvas: HTMLCanvasElement;
  let chart: any;
  export let period = "month";

  export let transactions: any = [];

  function getData(
    transactions: any,
    period: string,
    type: "expense" | "income" | "all" = "expense"
  ) {
    const categories = {};

    const subtractUnits = period === "week" ? 7 : period === "month" ? 30 : 365;
    const startDate = dayjs().subtract(subtractUnits, "day");

    let recentTransactions = transactions.filter((transaction) =>
      dayjs(transaction.date).isAfter(startDate)
    );

    if (type !== "all") {
      recentTransactions = recentTransactions.filter(
        (transaction: any) => transaction.type === type
      );
    }

    // Calculate total amount spent in each category

    Object.keys(categoriesInfo).forEach((category) => {
      categories[category] = recentTransactions
        .filter((transaction: any) => transaction.category === category)
        .reduce((total, transaction) => total + transaction.amount, 0);
    });

    // Convert the categories object to an array and sort it by total amount
    const sortedCategories = Object.entries(categories).sort(
      (a, b) => b[1] - a[1]
    );

    // Get the top 10 categories
    const topCategories = sortedCategories.slice(0, 8);

    // Group the remaining categories into an "Others" category
    const othersTotal = sortedCategories
      .slice(8)
      .reduce((total, category) => total + category[1], 0);

    // Convert the top categories and "Others" category back to an object
    const finalCategories = {
      ...Object.fromEntries(topCategories),
      Others: othersTotal,
    };

    return finalCategories;
  }

  onMount(() => {
    const ctx = canvas.getContext("2d");

    // Get the data for the chart
    const chartData = getData(transactions, period, "expense"); // or "income" or "all"

    // Convert the data into a format suitable for the chart
    const data = Object.values(chartData);
    const labels = Object.keys(chartData);

    chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: labels.map(
              (label) =>
                categoriesInfo[label]?.color ||
                (label === "Others" ? "green" : "gray")
            ),
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
      },
    });
  });
</script>

<canvas bind:this={canvas} class="mx-auto w-full h-full" />
