<script lang="ts">
  import Chart from "chart.js/auto";

  let ctx: HTMLCanvasElement | undefined;
  let chartObject: Chart | undefined;

  let data = [12, 19, 3, 5, 2, 3, 10, 20, 3, 9, 200, 9, 1, 2];

  $: {
    if (ctx != undefined) {
      if (chartObject != undefined) {
        chartObject.destroy();
      }

      chartObject = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Red",
            "Blue",
            "Yellow",
            "Green",
            "Purple",
            "Orange",
            "Purple2",
            "Val2",
            "Graph2",
            "Dap",
          ],
          datasets: [
            {
              label: "# of Votes",
              data: data,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }
</script>

<div class="w-full h-full">
  <canvas class="chart" bind:this={ctx} />
</div>
