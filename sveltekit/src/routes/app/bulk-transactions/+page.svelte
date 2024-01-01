<script lang="ts">
  import { createDialog, melt } from "@melt-ui/svelte";
  import { fade, fly } from "svelte/transition";
  import { goto } from "$app/navigation";
  import { enhance } from "$app/forms";

  const {
    elements: {
      trigger,
      overlay,
      content,
      title,
      description,
      portalled,
      close,
    },
    states: { open },
  } = createDialog({
    defaultOpen: true,
  });

  $: {
    if (!$open) {
      goto("/app");
    }
  }
</script>

<div use:melt={$portalled}>
  {#if $open}
    <div
      use:melt={$overlay}
      class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      transition:fade={{ duration: 150 }}
    />
    <div
      class="menu safe-area fixed bottom-0 z-50 w-full bg-zinc-900 px-4
    pt-6 shadow-lg focus:outline-none rounded-t-lg flex flex-col pb-6"
      transition:fly={{ y: 768, duration: 300, opacity: 1 }}
      use:melt={$content}
    >
      <h2 use:melt={$title} class="m-0 text-lg font-medium">
        Add transaction in bulk
      </h2>
      <p use:melt={$description} class="mb-5 mt-2 leading-normal text-zinc-600">
        Add multiple transactions to your balance.
      </p>

      <form method="post" class="flex flex-col h-full gap-2.5" use:enhance>
        <label class="flex flex-col gap-1">
          Upload CSV
          <input type="file" name="csv" accept=".csv" class="_input" />
        </label>

        <div class="mt-auto flex justify-end gap-4">
          <button
            type="button"
            use:melt={$close}
            class="inline-flex h-8 items-center justify-center rounded-sm
                px-4 font-medium leading-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="inline-flex h-8 items-center justify-center rounded-sm
                bg-primary px-4 font-medium leading-none"
          >
            Add
          </button>
        </div>
      </form>
      <button
        use:melt={$close}
        aria-label="close"
        class="absolute right-4 top-4 inline-flex h-6 w-6 appearance-none
                items-center justify-center rounded-full p-1"
      >
        X
      </button>
    </div>
  {/if}
</div>
