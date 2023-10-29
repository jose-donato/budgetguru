<script>
  import LogoutButton from "$lib/components/LogoutButton.svelte";
  import PlusButton from "$lib/components/app/PlusButton.svelte";
  import Icon from "$lib/components/ui/Icon.svelte";
  import Logo from "$lib/components/ui/Logo.svelte";
  import { page } from "$app/stores";
  import { addToast } from "$lib/components/Toaster.svelte";
  import classNames from "classnames";

  const links = {
    left: [
      {
        link: "/app",
        icon: "ic-round-home",
        name: "Home",
      },
      {
        link: "/app/transactions",
        icon: "tabler-arrows-exchange",
        name: "Transactions",
      },
    ],
    right: [
      {
        link: "/app/profile",
        icon: "material-symbols-person",
        name: "Profile",
      },
      {
        link: "/app/settings",
        icon: "ph-gear-fill",
        name: "Settings",
      },
    ],
  };
  $: {
    // read query params from url
    const params = $page.url.searchParams;

    const toast = params.get("toast");
    const statusToast = params.get("statusToast");

    if (toast && statusToast) {
      switch (toast) {
        case "bulk":
          addToast({
            data: {
              title: "Bulk operation completed",
              description:
                statusToast === "success"
                  ? "All transactions were successfully deleted"
                  : "Some transactions could not be deleted",
              color: statusToast === "success" ? "bg-green-500" : "bg-red-500",
            },
          });
          break;
        case "update-transaction":
          addToast({
            data: {
              title: "Transaction updated",
              description:
                statusToast === "success"
                  ? "The transaction was successfully updated"
                  : "The transaction could not be updated",
              color: statusToast === "success" ? "bg-green-500" : "bg-red-500",
            },
          });
          break;
        case "delete-transaction":
          addToast({
            data: {
              title: "Transaction deleted",
              description:
                statusToast === "success"
                  ? "The transaction was successfully deleted"
                  : "The transaction could not be deleted",
              color: statusToast === "success" ? "bg-green-500" : "bg-red-500",
            },
          });
          break;
        default:
          // Default case if none of the above matches
          addToast({
            data: {
              title: "Operation completed",
              description:
                statusToast === "success"
                  ? "The operation was successfully completed"
                  : "The operation could not be completed",
              color: statusToast === "success" ? "bg-green-500" : "bg-red-500",
            },
          });
      }

      // Clear the URL parameters without causing a navigation
      params.delete("toast");
      params.delete("statusToast");
      history.replaceState(
        {},
        "",
        `${location.pathname}${params.toString() ? "?" + params : ""}`
      );
    }
  }
</script>

<main class="pb-32">
  <div class="relative -z-10" id="home">
    <div
      aria-hidden="true"
      class="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
    >
      <div
        class="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"
      />
      <div
        class="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"
      />
    </div>
  </div>
  <div class="flex justify-between p-4">
    <Logo size="small" />
    <LogoutButton />
  </div>
  <div>
    <slot />
  </div>
</main>

<nav
  class="z-10 flex justify-around items-center fixed bottom-4 border border-zinc-500/50 rounded-lg bg-zinc-800/40 backdrop-blur backdrop-filter max-w-[calc(100%-10px)] mx-auto p-2 left-1/2 -translate-x-1/2"
>
  <div class="flex gap-2.5">
    {#each links.left as link}
      <a
        href={link.link}
        class={classNames(
          "w-20 flex flex-col items-center justify-center hover:text-primary transition-all duration-300",
          {
            "text-primary hover:text-primaryHover":
              $page.url.pathname === link.link,
          }
        )}
      >
        <Icon id={link.icon} class="w-6 h-6" />
        <span class="text-xs">{link.name}</span>
      </a>
    {/each}
  </div>
  <div class="w-20 flex items-center justify-center">
    <PlusButton />
  </div>
  <div class="flex gap-2.5">
    {#each links.right as link}
      <a
        href={link.link}
        class={classNames(
          "w-20 flex flex-col items-center justify-center hover:text-primary transition-all duration-300",
          {
            "text-primary hover:text-primaryHover":
              $page.url.pathname === link.link,
          }
        )}
      >
        <Icon id={link.icon} class="w-6 h-6" />
        <span class="text-xs">{link.name}</span>
      </a>
    {/each}
  </div>
</nav>
