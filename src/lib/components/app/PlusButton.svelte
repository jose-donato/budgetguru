<script>
  import { fade } from "svelte/transition";
  import Icon from "../ui/Icon.svelte";
  import classNames from "classnames";

  let showOptions = false;
  const toggleOptions = () => (showOptions = !showOptions);
</script>

<div class="relative">
  <button
    class="rounded-full bg-primary p-2 -mt-10 h-14 w-14 flex items-center justify-center hover:bg-primaryHover transition-all duration-300 active:bg-primaryActive hover:border hover:border-primaryActive"
    on:click={toggleOptions}
  >
    <Icon
      id="ic-round-plus"
      class={classNames("w-6 h-6 transition-transform duration-300", {
        "rotate-45": showOptions,
      })}
    />
  </button>

  {#if showOptions}
    <div transition:fade class="absolute -top-24 -left-[100px] flex gap-2.5">
      <a
        href="/app/transaction?type=expense"
        class="w-20 p-2 flex flex-col items-center justify-center rounded-lg shadow-md text-red-500 border border-zinc-500/50 bg-zinc-800/40 hover:bg-zinc-800/70 transition-all duration-300"
      >
        <Icon
          id="streamline-money-graph-arrow-decrease-down-stats-graph-descend-right-arrow"
          class="w-4 h-4"
        />
        <span class="text-xs"> Expenses </span>
      </a>
      <a
        href="/app/bulk-transactions"
        class="w-20 p-2 flex flex-col items-center justify-center rounded-lg shadow-md text-blue-500 border border-zinc-500/50 bg-zinc-800/40 hover:bg-zinc-800/70 transition-all duration-300"
      >
        <Icon id="mdi-plus-box-multiple" class="w-4 h-4" />
        <span class="text-xs"> Bulk </span>
      </a>
      <a
        href="/app/transaction?type=income"
        class="w-20 p-2 flex flex-col items-center justify-center rounded-lg shadow-md text-green-500 border border-zinc-500/50 bg-zinc-800/40 hover:bg-zinc-800/70 transition-all duration-300"
      >
        <Icon
          id="streamline-money-graph-arrow-increase-ascend-growth-up-arrow-stats-graph-right-grow"
          class="w-4 h-4"
        />

        <span class="text-xs"> Income </span>
      </a>
    </div>
  {/if}
</div>
