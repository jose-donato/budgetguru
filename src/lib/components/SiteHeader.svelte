<script lang="ts">
  import Logo from "$lib/components/ui/Logo.svelte";
  import Icon from "./ui/Icon.svelte";
</script>

<header
  class="z-10 w-[90%] lg:w-full fixed border border-zinc-500/50 rounded-lg bg-zinc-800/40 backdrop-blur backdrop-filter max-w-7xl mx-auto px-6 md:px-12 xl:px-6 top-2 left-1/2 -translate-x-1/2"
>
  <nav
    class="flex flex-wrap items-center justify-between py-2 gap-6 md:py-4 md:gap-0 relative"
  >
    <input
      aria-hidden="true"
      type="checkbox"
      name="toggle_nav"
      id="toggle_nav"
      class="hidden peer"
    />
    <div class="relative z-20 w-full flex justify-between lg:w-max md:px-0">
      <Logo />

      <div class="relative flex items-center lg:hidden max-h-10">
        <label
          for="toggle_nav"
          aria-label="humburger"
          id="hamburger"
          class="relative p-6 -mr-6"
        >
          <div
            aria-hidden="true"
            id="line"
            class="m-auto h-0.5 w-5 rounded bg-gray-300 transition duration-300"
          />
          <div
            aria-hidden="true"
            id="line2"
            class="m-auto mt-2 h-0.5 w-5 rounded bg-gray-300 transition duration-300"
          />
        </label>
      </div>
    </div>
    <div
      aria-hidden="true"
      class="fixed z-10 inset-0 h-screen w-screen backdrop-blur-2xl origin-bottom scale-y-0 transition duration-500 peer-checked:origin-top peer-checked:scale-y-100 lg:hidden bg-gray-900/70"
    />
    <div
      class="flex-col z-20 flex-wrap gap-6 p-8 rounded-3xl border shadow-gray-600/10 justify-end w-full invisible opacity-0 translate-y-1 absolute top-full left-0 transition-all duration-300 scale-95 origin-top
                          lg:relative lg:scale-100 lg:peer-checked:translate-y-0 lg:translate-y-0 lg:flex lg:flex-row lg:items-center lg:gap-0 lg:p-0 lg:bg-transparent lg:w-7/12 lg:visible lg:opacity-100 lg:border-none
                          peer-checked:scale-100 peer-checked:opacity-100 peer-checked:visible lg:shadow-none
                          shadow-none bg-gray-800 border-gray-700"
    >
      <div class="mt-12 lg:mt-0 flex gap-2">
        <a
          href="/login"
          class="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
        >
          <span class="relative text-sm font-semibold text-white"
            >Login with Hanko.io</span
          >
        </a>
        <a
          href="https://github.com/jose-donato/budgetguru"
          rel="noopener noreferrer"
          target="_blank"
          class="flex gap-1 items-center justify-center hover:bg-zinc-500 hover:bg-opacity-20 hover:rounded transition duration-300 px-2"
        >
          <Icon id="mdi-github" class="w-6 h-6 text-white" />
          <span class="relative text-sm font-semibold text-white"
            >Star on GitHub</span
          >
        </a>
      </div>
    </div>
  </nav>
</header>
