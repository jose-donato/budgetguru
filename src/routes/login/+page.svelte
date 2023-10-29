<script lang="ts">
  import { goto } from "$app/navigation";
  import HankoAuth from "$lib/components/HankoAuth.svelte";
  import SiteFooter from "$lib/components/SiteFooter.svelte";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  /*onMount(() => {
    document.addEventListener("hankoAuthSuccess", (event) => {
      goto("/app");
    });
  });*/
</script>

<SiteHeader />
<div class="flex items-center justify-center h-[60vh]">
  <HankoAuth redirectUrl={data.lastUrl} />
</div>
<SiteFooter />
