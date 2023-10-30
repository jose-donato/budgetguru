<script lang="ts">
  import { SETTINGS } from "$lib/utils/constants";
  export let size: "normal" | "small" | "large" = "normal";

  let logoSize: string;
  let textSize: string;
  $: {
    switch (size) {
      case "small":
        logoSize = "h-2 w-2";
        textSize = "text-xl";
        break;
      case "large":
        logoSize = "h-6 w-6";
        textSize = "text-3xl";
        break;
      default:
        logoSize = "h-4 w-4";
        textSize = "text-2xl";
    }
  }
</script>

<a href="/" aria-label="logo" class="flex space-x-2 items-center">
  <div aria-hidden="true" class="flex space-x-1">
    <div class="h-6 w-2 bg-primary" />
  </div>
  <span class={textSize + " font-bold text-gray-900 dark:text-white"}
    >{SETTINGS.title}</span
  >
</a>
