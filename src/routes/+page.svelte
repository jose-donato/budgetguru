<script>
  import HomepageHero from "$lib/components/HomepageHero.svelte";
  import SiteFooter from "$lib/components/SiteFooter.svelte";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
</script>

<SiteHeader />
<main class="flex flex-col gap-40 mb-40">
  <div class="relative" id="home">
    <div
      aria-hidden="true"
      class="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20"
    >
      <div
        class="blur-[106px] h-56 bg-gradient-to-br to-purple-400 from-blue-700"
      />
      <div
        class="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-indigo-600"
      />
    </div>
  </div>
  <HomepageHero />
</main>
<SiteFooter />
