<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { register } from "@teamhanko/hanko-elements";
  import { env } from "$env/dynamic/public";

  const hankoApi = env.PUBLIC_HANKO_API_URL;

  export let redirectUrl: string;

  const redirectAfterLogin = () => {
    goto(redirectUrl);
  };

  onMount(async () => {
    register(hankoApi).catch((error) => {
      // handle error
    });
  });
</script>

<hanko-auth on:onAuthFlowCompleted={redirectAfterLogin} />
