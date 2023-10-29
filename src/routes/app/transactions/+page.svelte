<script lang="ts">
  import Table from "$lib/components/app/table/Table.svelte";
  import { categoriesInfo } from "$lib/utils/helpers";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<div class="flex justify-center">
  <div class="_card p-0 overflow-hidden">
    <Table
      rowData={data.transactions}
      columnDefs={[
        {
          headerName: "Date",
          field: "date",
          sortable: true,
          filter: true,
          sort: "desc",
        },
        {
          headerName: "Category",
          field: "category",
          sortable: true,
          filter: true,
          cellRenderer: (params) => {
            const category = categoriesInfo[params.value];
            if (!category) return params.value;

            return `<span title=${category.name}>
                ${category.icon}
              </span>`;
          },
        },
        {
          headerName: "Description",
          field: "description",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Amount",
          field: "amount",
          sortable: true,
          filter: true,
          cellRenderer: (params) => {
            const formatter = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            });
            return formatter.format(params.value);
          },
        },
        {
          headerName: "Type",
          field: "type",
          sortable: true,
          filter: true,
          cellRenderer: (params) => {
            const type = params.value;
            if (type === "income")
              return `<span class="text-green-500">${type}</span>`;
            return `<span class="text-red-500">${type}</span>`;
          },
        },
        {
          headerName: "Actions",
          field: "actions",
          sortable: false,
          filter: false,
          headerClass: "ag-right-aligned-header",
          cellRenderer: (params) => {
            const id = params.data.id;
            return `<div class="flex items-center justify-end h-full gap-2">
                <a href="/app/transactions/${id}" class="">
                  <svg viewBox="0 0 24 24"
                    class="w-4 h-4"
                  ><path fill="currentColor" d="M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6V19ZM19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Zm-3.525-.725l-.7-.7l1.4 1.4l-.7-.7Z"></path></svg>
                </a>
              </div>`;
          },
        },
      ]}
    />
  </div>
</div>
