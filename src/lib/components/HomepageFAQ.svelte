<script lang="ts">
  import { createAccordion } from "@melt-ui/svelte";
  import { slide } from "svelte/transition";

  const { content, item, trigger, isSelected, root } = createAccordion({
    type: "multiple",
  });

  const items = [
    {
      id: "item-1",
      title: "Is it accessible?",
      description: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      id: "item-2",
      title: "Is it unstyled?",
      description:
        "Yes. It's unstyled by default, giving you freedom over the look and feel.",
    },
    {
      id: "item-3",
      title: "Can it be animated?",
      description:
        "Yes! You can use the transition prop to configure the animation.",
    },
  ];
</script>

<div class="max-w-7xl mx-auto px-6 md:px-12 xl:px-6" id="testimonials">
  <div class="mb-20 space-y-4 px-6 md:px-0">
    <h2
      class="text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl"
    >
      Some frequently asked questions
    </h2>
  </div>
  <div class="mx-auto w-full max-w-md rounded-md shadow-lg" {...$root}>
    {#each items as { id, title, description }, i}
      <div
        {...$item(id)}
        class="mt-px overflow-hidden transition-colors
			first:mt-0 first:rounded-t last:rounded-b focus-within:relative
			focus-within:z-10 focus-within:ring focus-within:ring-blue-400"
      >
        <h2 class="flex">
          <button
            id={i === 0 ? "trigger" : undefined}
            {...$trigger(id)}
            use:trigger
            class="flex h-12 flex-1 cursor-pointer items-center justify-between
				bg-white px-5 text-base font-medium leading-none text-blue-700
					 transition-colors hover:bg-opacity-95 focus:!ring-0"
          >
            {title}
          </button>
        </h2>
        {#if $isSelected(id)}
          <div
            class="overflow-hidden bg-neutral-100 text-sm text-neutral-900"
            {...$content(id)}
            transition:slide
          >
            <div class="px-5 py-4">{description}</div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>
