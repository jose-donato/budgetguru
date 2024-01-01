<script>
  import Icon from "$lib/components/ui/Icon.svelte";
  import Logo from "$lib/components/ui/Logo.svelte";
  import { SETTINGS } from "$lib/utils/constants";
</script>

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
  <div class="h-[400px] w-[500px] mx-auto -mt-5">
    <div class="gap-2 flex items-center justify-center">
      <Logo />
      <Icon id="basil-cross-solid" class="w-10" />
      <Icon id="hanko-logo-color" class="w-40 h-20 mt-8" />
    </div>
    <div class="flex justify-center items-center">
      <p class="text-center text-base text-zinc-500 -ml-6">
        {SETTINGS.smallDescription} #hacktoberfest
      </p>
    </div>
  </div>
</main>
