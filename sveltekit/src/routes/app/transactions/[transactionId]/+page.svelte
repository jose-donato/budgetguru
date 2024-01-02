<script lang="ts">
  import { createDialog, melt } from "@melt-ui/svelte";
  import type { PageData } from "./$types";
  import { fade, fly } from "svelte/transition";
  import { goto } from "$app/navigation";
  import { superForm } from "sveltekit-superforms/client";
  import { categories } from "$lib/utils/helpers";
  import { enhance } from "$app/forms";
  import Icon from "$lib/components/ui/Icon.svelte";

  export let data: PageData;

  const { form } = superForm(data.form);

  let date = new Date($form.date ?? Date.now());
  $form.date = date.toISOString().slice(0, 16);

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
      goto("/app/transactions");
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
        Update transaction
      </h2>
      <p use:melt={$description} class="mb-5 mt-2 leading-normal text-zinc-600">
        Update your transaction details.
      </p>

      <form method="post" class="flex flex-col h-full gap-2.5" use:enhance>
        <label class="flex flex-col gap-1"
          >Transaction type
          <select name="type" bind:value={$form.type} class="_input" required>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>

        <label class="flex flex-col gap-1"
          >Amount
          <input
            step="0.01"
            type="number"
            name="amount"
            bind:value={$form.amount}
            class="_input"
            required
          />
        </label>

        <label class="flex flex-col gap-1"
          >Description
          <input
            placeholder="e.g. Groceries"
            type="text"
            name="description"
            bind:value={$form.description}
            class="_input"
            required
          />
        </label>

        <label class="flex flex-col gap-1"
          >Category
          <select
            name="category"
            bind:value={$form.category}
            class="_input"
            required
          >
            <option value="">Select a category</option>
            {#each categories as category}
              <option value={category}>{category}</option>
            {/each}
          </select>
        </label>

        <label class="flex flex-col gap-1"
          >Date
          <input
            type="datetime-local"
            name="date"
            bind:value={$form.date}
            class="_input"
            required
          />
        </label>

        <div class="mt-auto flex justify-between">
          <button
            name="action"
            value="delete"
            type="submit"
            class="inline-flex h-8 items-center justify-center rounded-sm
                  px-4 font-medium leading-none bg-red-500 hover:bg-red-600 active:bg-red-700"
          >
            Delete
          </button>
          <div class="flex justify-end gap-4">
            <button
              type="button"
              use:melt={$close}
              class="inline-flex h-8 items-center justify-center rounded-sm
                  px-4 font-medium leading-none hover:bg-zinc-700 active:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              name="action"
              value="update"
              type="submit"
              class="inline-flex h-8 items-center justify-center rounded-sm
                  bg-primary px-4 font-medium leading-none hover:bg-primaryHover active:bg-primaryActive"
            >
              Update
            </button>
          </div>
        </div>
      </form>

      <button
        use:melt={$close}
        aria-label="close"
        class="absolute right-4 top-4 inline-flex h-6 w-6 appearance-none
                  items-center justify-center rounded-full p-1"
      >
        <Icon id="material-symbols-cancel-outline" class="w-4 h-4" />
      </button>
    </div>
  {/if}
</div>
