<script lang="ts">
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";

  export let data: PageData;
</script>

<h1>{data.data}</h1>

<form method="POST" use:enhance action="?/rename">
  <input type="text" name="name" />
  <button type="submit">Submit</button>
  <button formaction="?/capitalize" type="submit">Capitalize</button>
  <button formaction="?/inverse" type="submit">Inverse</button>
</form>
