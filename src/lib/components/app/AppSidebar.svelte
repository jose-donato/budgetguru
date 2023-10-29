<script lang="ts">
  const SIDEBAR_ITEMS = [
    {
      title: "Dashboard",
      icon: "home",
      route: "/app",
    },
    {
      title: "Elements",
      icon: "view-grid",
      children: [
        {
          title: "Investments",
          route: "/app/elements/investments",
          icon: "view-grid",
        },
        {
          title: "Transactions",
          route: "/app/elements/transactions",
          icon: "view-grid",
        },
        {
          title: "Debts",
          route: "/app/elements/debts",
          icon: "view-grid",
        },
      ],
    },
    {
      title: "Settings",
      icon: "settings",
      route: "/app/settings",
    },
  ];
  import { createAccordion } from "@melt-ui/svelte";
  import { slide } from "svelte/transition";
  import Icon from "../ui/Icon.svelte";
  import LogoutButton from "../LogoutButton.svelte";

  const { content, item, trigger, isSelected, root } = createAccordion();
</script>

<aside
  class="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 lg:w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width w-0"
>
  <div
    class="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto px-2">
      {#each SIDEBAR_ITEMS as { title, icon, route, children }}
        {#if route && route.startsWith("/")}
          <a
            href={route}
            class="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"
          >
            {title}
          </a>
        {:else if children}
          <div melt={$item(title)} class="">
            <button
              type="button"
              class="flex items-center justify-between w-full p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"
              melt={$trigger(title)}
            >
              {title}
              <Icon
                class={`w-4 h-4 transition-transform duration-200 ${
                  $isSelected(title) ? "rotate-90" : ""
                }`}
                id="chevron-right"
              />
            </button>
            {#if $isSelected(title)}
              <div class="flex flex-col ml-2">
                {#each children as { title, icon, route }}
                  <a
                    href={route}
                    class="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    {title}
                  </a>
                {/each}
              </div>
            {/if}
          </div>
        {/if}
      {/each}
      <LogoutButton />
    </div>
    <div
      class="absolute bottom-0 left-0 justify-center hidden w-full p-4 space-x-4 bg-white lg:flex dark:bg-gray-800"
    />
  </div>
</aside>
