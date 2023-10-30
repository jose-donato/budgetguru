<script>
  import { SETTINGS } from "$lib/utils/constants";

  const LINKS = [
    {
      label: "Company",
      links: [
        {
          label: "About",
          href: "/",
        },
        {
          label: "Careers",
          href: "/",
        },
        {
          label: "Brand Center",
          href: "/",
        },
        {
          label: "Blog",
          href: "/",
        },
      ],
    },
    {
      label: "Help center",
      links: [
        {
          label: "Discord Server",
          href: "/",
        },
        {
          label: "Twitter",
          href: "/",
        },
        {
          label: "Facebook",
          href: "/",
        },
        {
          label: "Contact Us",
          href: "/",
        },
      ],
    },
    {
      label: "Legal",
      links: [
        {
          label: "Privacy Policy",
          href: "/",
        },
        {
          label: "Licensing",
          href: "/",
        },
        {
          label: "Terms",
          href: "/",
        },
      ],
    },
    {
      label: "Download",
      links: [
        {
          label: "iOS",
          href: "/",
        },
        {
          label: "Android",
          href: "/",
        },
        {
          label: "Windows",
          href: "/",
        },
        {
          label: "MacOS",
          href: "/",
        },
      ],
    },
  ];
</script>

<footer class="block">
  <div class="py-16 md:py-24 lg:py-32 mx-auto w-full max-w-7xl px-5 md:px-10">
    <div class="flex-col flex items-center">
      <a
        href="/"
        aria-label="logo"
        class="flex space-x-2 items-center inline-block max-w-full"
      >
        <div aria-hidden="true" class="flex space-x-1">
          <div class="h-6 w-2 bg-primary" />
        </div>
        <span class="text-2xl font-bold text-gray-900 dark:text-white"
          >{SETTINGS.title}</span
        >
      </a>
      <span class="text-gray-500 dark:text-gray-400 text-sm mt-4 mb-6">
        {SETTINGS.smallDescription}
      </span>
      <div
        class="text-center font-semibold max-[991px]:ml-0 max-[991px]:mr-0 max-[991px]:py-1"
      >
        <a
          href="/"
          class="inline-block px-6 py-2 font-normal transition hover:text-primary"
          >About</a
        >
        <a
          href="/"
          class="inline-block px-6 py-2 font-normal transition hover:text-primary"
          >Features</a
        >
        <a
          href="/"
          class="inline-block px-6 py-2 font-normal transition hover:text-primary"
          >Help</a
        >
      </div>
      <p class="text-xs text-gray-500 mt-10">
        © Copyright {new Date().getFullYear()}. All rights reserved.
      </p>
    </div>
  </div>
</footer>

<!--<footer>
  <div class="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
    <div class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
      {#each LINKS as { label, links }}
        <div>
          <h3
            class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
          >
            {label}
          </h3>
          <ul class="text-gray-500 dark:text-gray-400">
            {#each links as { label, href }}
              <li class="mb-4">
                <a {href} class="hover:underline">{label}</a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <div class="text-center">
      <a
        href="/"
        class="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          src={SETTINGS.logo}
          class="h-6 mr-3 sm:h-9"
          alt="Portafoglio Logo"
        />
        {SETTINGS.title}
      </a>
      <span class="block text-sm text-center text-gray-500 dark:text-gray-400"
        >© 2021-2022 Portafoglio. All Rights Reserved.
      </span>
      <ul class="flex justify-center mt-5 space-x-5">
        <li>
          <a
            href="/"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              ><path
                d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
              /></svg
            >
          </a>
        </li>
        <li>
          <a
            href="/"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              ><path
                fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clip-rule="evenodd"
              /></svg
            >
          </a>
        </li>
      </ul>
    </div>
  </div>
</footer>
-->
