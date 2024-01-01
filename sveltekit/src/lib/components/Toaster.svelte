<script lang="ts" context="module">
  export type ToastData = {
    title: string;
    description: string;
    color: string;
  };

  const {
    elements: { content, title, description, close },
    helpers,
    states: { toasts },
    actions: { portal },
  } = createToaster<ToastData>();

  export const addToast = helpers.addToast;
</script>

<script lang="ts">
  import { createToaster, melt } from "@melt-ui/svelte";
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
</script>

<div
  class="fixed bottom-0 right-0 z-50 m-4 flex flex-col items-end gap-2"
  use:portal
>
  {#each $toasts as { id, data } (id)}
    <div
      use:melt={$content(id)}
      animate:flip={{ duration: 500 }}
      in:fly={{ duration: 150, x: "100%" }}
      out:fly={{ duration: 150, x: "100%" }}
      class="rounded-lg bg-zinc-800 text-white shadow-md"
    >
      <div
        class="relative flex w-[24rem] max-w-[calc(100vw-2rem)] items-center justify-between gap-4 p-5"
      >
        <div>
          <h3
            use:melt={$title(id)}
            class="flex items-center gap-2 font-semibold"
          >
            {data.title}
            <span class="rounded-full w-1.5 h-1.5 {data.color}" />
          </h3>
          <div use:melt={$description(id)}>
            {data.description}
          </div>
        </div>
        <button
          use:melt={$close(id)}
          class="absolute right-4 top-4 grid place-items-center rounded text-primary w-6 h-6
        hover:bg-primary/20"
        >
          X
        </button>
      </div>
    </div>
  {/each}
</div>
