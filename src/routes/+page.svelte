<script>
  import HomepageCTA from "$lib/components/HomepageCTA.svelte";
  import HomepageTestimonials from "$lib/components/HomepageTestimonials.svelte";
  import HomepageFeatures from "$lib/components/HomepageFeatures.svelte";
  import HomepageHero from "$lib/components/HomepageHero.svelte";
  import HomepageFaq from "$lib/components/HomepageFAQ.svelte";

  import SiteFooter from "$lib/components/SiteFooter.svelte";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
</script>

<SiteHeader />
<main class="flex flex-col gap-40 mb-40">
  <div class="relative" id="home">
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
  <HomepageHero />
  <!--<HomepageFeatures />
  <HomepageTestimonials />
  <HomepageFaq />
  <HomepageCTA />-->
</main>
<SiteFooter />
