<script lang="ts">
  import { onMount } from "svelte";

  let gridContainer: HTMLDivElement;

  let agGrid = window.agGrid;

  export let columnDefs = [];

  export let rowData = [];

  onMount(() => {
    const gridOptions = {
      columnDefs: columnDefs,
      rowData: rowData,
      pagination: true,
      animateRows: true,
      onFirstDataRendered(params) {
        // check available width, if it's a mobile device, then autosize, otherwise autofit
        const availableWidth = gridContainer.clientWidth;
        if (availableWidth < 600) {
          params.columnApi.autoSizeAllColumns();
        } else {
          params.api.sizeColumnsToFit();
        }
      },
    };
    new agGrid.Grid(gridContainer, gridOptions);
  });
</script>

<div
  id="datagrid"
  class="ag-theme-alpine-dark w-full h-full"
  bind:this={gridContainer}
/>

<style lang="postcss">
  .ag-theme-alpine-dark {
    --ag-font-size: 12px;
    --ag-background-color: transparent;
    --ag-border-color: transparent;
    --ag-secondary-border-color: transparent;
    --ag-header-background-color: transparent;
    --ag-odd-row-background-color: rgba(63, 63, 70, 0.3);
  }
</style>
