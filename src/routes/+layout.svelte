<script lang="ts">
  import Toaster from "$lib/components/Toaster.svelte";
  import { SETTINGS } from "$lib/utils/constants";
  import "../app.css";
</script>

<svelte:head>
  <title>{SETTINGS.title}</title>
  <meta name="description" content={SETTINGS.description} />
  <meta name="keywords" content={SETTINGS.keywords} />
</svelte:head>

<Toaster />
<slot />
