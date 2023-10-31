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
      <a href="/" aria-label="logo" class="flex gap-2 items-center max-w-full">
        <div aria-hidden="true" class="flex space-x-1">
          <div class="h-6 w-2 bg-primary" />
        </div>
        <span class="text-2xl font-bold text-white">{SETTINGS.title}</span>
      </a>
      <span class="text-gray-400 text-sm mt-4 mb-6">
        {SETTINGS.smallDescription}
      </span>

      <p class="text-xs text-gray-300">
        Data hosted on Turso but can be self-hosted on your own server.
      </p>
      <p class="text-xs text-gray-500 mt-10">
        © Copyright {new Date().getFullYear()}. All rights reserved.
      </p>
    </div>
  </div>
</footer>
