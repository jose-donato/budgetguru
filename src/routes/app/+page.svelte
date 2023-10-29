<script lang="ts">
  import Grid, { GridItem } from "svelte-grid-extended";
  import TransactionsOvertime from "$lib/components/app/charts/TransactionsOvertime.svelte";
  import TransactionsList from "$lib/components/app/TransactionsList.svelte";
  import { createRadioGroup, melt } from "@melt-ui/svelte";
  import { crossfade } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import BalanceCard from "$lib/components/app/BalanceCard.svelte";
  import { onMount } from "svelte";
  import { Hanko } from "@teamhanko/hanko-elements";
  import { env } from "$env/dynamic/public";
  import PieChart from "$lib/components/app/charts/PieChart.svelte";
  import AiSummary from "$lib/components/app/AiSummary.svelte";
  import Icon from "$lib/components/ui/Icon.svelte";

  export let data: import("./$types").PageServerData;

  onMount(async () => {
    const hankoApi = env.PUBLIC_HANKO_API_URL;
    const hanko = new Hanko(hankoApi);

    const { id, email } = await hanko.user.getCurrent();

    fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, email }),
    });
  });

  const { transactions } = data;

  const {
    elements: { root, item },
    helpers: { isChecked },
    states: { value },
  } = createRadioGroup({
    defaultValue: "month",
    orientation: "horizontal",
  });

  const optionsArr = ["week", "month", "year"];

  const [send, receive] = crossfade({
    duration: 250,
    easing: cubicInOut,
  });
</script>

<div
  use:melt={$root}
  class="flex items-center justify-center w-fit mx-auto"
  aria-label="Period"
>
  {#each optionsArr as option}
    <button
      use:melt={$item(option)}
      class="trigger relative capitalize"
      id={option}
      aria-labelledby="{option}-label"
    >
      {option}
      {#if $isChecked(option)}
        <div
          in:send={{ key: "trigger" }}
          out:receive={{ key: "trigger" }}
          class="absolute bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-primary"
        />
      {/if}
    </button>
  {/each}
</div>
<Grid
  class="pr-4"
  cols={4}
  itemSize={{
    height: 40,
  }}
  collision="compress"
  gap={16}
>
  <GridItem
    previewClass="rounded bg-zinc-700/50"
    x={0}
    y={0}
    w={4}
    h={6}
    class="_card items-start gap-2 w-full h-full justify-between overflow-auto"
  >
    <div slot="moveHandle" let:moveStart class="flex gap-1">
      <button on:pointerdown={moveStart}>
        <Icon
          id="material-symbols-drag-indicator"
          class="w-4 h-4 inline-block"
        />
      </button>
      Balance
    </div>
    <BalanceCard {transactions} period={$value} />
  </GridItem>
  <GridItem
    class="_card items-start gap-2 w-full h-full justify-between overflow-auto"
    previewClass="rounded bg-zinc-700/50"
    x={0}
    y={6}
    w={4}
    h={4}
  >
    <div slot="moveHandle" let:moveStart class="flex gap-1">
      <button on:pointerdown={moveStart}>
        <Icon
          id="material-symbols-drag-indicator"
          class="w-4 h-4 inline-block"
        />
      </button>
      Transactions over time
    </div>
    <div class="w-full h-[calc(100%-35px)]">
      <TransactionsOvertime {transactions} period={$value} />
    </div>
  </GridItem>
  <GridItem
    class="_card items-start gap-2 w-full h-full justify-between overflow-auto"
    previewClass="rounded bg-zinc-700/50"
    x={0}
    y={10}
    w={4}
    h={4}
  >
    <div slot="moveHandle" let:moveStart class="flex gap-1">
      <button on:pointerdown={moveStart}>
        <Icon
          id="material-symbols-drag-indicator"
          class="w-4 h-4 inline-block"
        />
      </button>
      Transactions by category
    </div>
    <div class="w-full h-[calc(100%-35px)]">
      <PieChart {transactions} period={$value} />
    </div>
  </GridItem>
  <GridItem
    class="_card items-start gap-2 w-full h-full justify-between overflow-auto"
    previewClass="rounded bg-zinc-700/50"
    x={0}
    y={14}
    w={4}
    h={4}
  >
    <div class="flex justify-between w-full" slot="moveHandle" let:moveStart>
      <div class="flex gap-1">
        <button on:pointerdown={moveStart}>
          <Icon
            id="material-symbols-drag-indicator"
            class="w-4 h-4 inline-block"
          />
        </button>
        Transactions by category
      </div>
      <a
        href="/app/transactions"
        class="text-primary hover:text-primaryHover transition-all duration-300"
      >
        See all
      </a>
    </div>
    <TransactionsList {transactions} />
  </GridItem>
</Grid>

<style lang="postcss">
  .trigger {
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: default;
    user-select: none;

    border-radius: 0;

    font-weight: 500;
    line-height: 1;

    flex: 1;
    height: theme(spacing.12);
    padding-inline: theme(spacing.2);

    &:focus {
      position: relative;
    }

    &:focus-visible {
      @apply z-10 ring-2;
    }

    &[data-state="active"] {
      @apply focus:relative;
      background-color: white;
      color: theme("colors.primary");
    }
  }
</style>
