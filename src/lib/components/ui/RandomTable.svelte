<!-- DataGrid.svelte -->
<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { Grid, type ColDef } from "ag-grid-community";
  import "ag-grid-community/styles/ag-grid.css";
  import "ag-grid-community/styles/ag-theme-alpine.css";

  export let columnDefs: ColDef[] = [];
  export let rowData: any[] = [];

  let domNode: HTMLDivElement;
  let grid: Grid;

  onMount(() => {
    grid = new Grid(domNode, {
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        resizable: true,
        sortable: true,
      },
      columnDefs,
      rowData,
    });
  });

  onDestroy(() => {
    if (grid) {
      grid.destroy();
    }
  });
</script>

<div
  id="datagrid"
  bind:this={domNode}
  class="ag-theme-alpine-dark w-full h-full"
/>

<style>
  :global(.ag-root-wrapper) {
    border: none !important;
  }
</style>
