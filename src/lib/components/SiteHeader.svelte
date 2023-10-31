<script lang="ts">
  import Logo from "$lib/components/ui/Logo.svelte";
  import Icon from "./ui/Icon.svelte";
</script>

<div
  id="sticky-banner"
  tabindex="-1"
  class="fixed h-10 top-0 left-0 z-50 flex justify-between w-full p-4 border-b border-zinc-500/50 bg-zinc-800/70 backdrop-blur backdrop-filter"
>
  <div class="flex items-center mx-auto">
    <p class="flex items-center text-sm font-normal">
      <span
        class="inline-flex p-1 mr-3 rounded-full bg-gray-600 w-6 h-6 items-center justify-center"
      >
        <svg
          class="w-3 h-3 text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 19"
        >
          <path
            d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z"
          />
        </svg>
        <span class="sr-only">Light bulb</span>
      </span>
      <span
        >Budget Guru is now open source. Read more about it
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://dev.to/josedonato/my-journey-with-hankoio-how-to-build-a-financial-app-in-record-time-4ipg"
          class="inline font-medium hover:underline text-blue-500">here</a
        ></span
      >
    </p>
  </div>
  <!--
  <div class="flex items-center">
    <button
      data-dismiss-target="#sticky-banner"
      type="button"
      class="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
    >
      <svg
        class="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
      <span class="sr-only">Close banner</span>
    </button>
  </div>-->
</div>

<header
  class="mt-10 z-10 w-[90%] lg:w-full fixed border border-zinc-500/50 rounded-lg bg-zinc-800/40 backdrop-blur backdrop-filter max-w-7xl mx-auto px-6 md:px-12 xl:px-6 top-2 left-1/2 -translate-x-1/2"
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
