<script lang="ts">
	import { getAllSigns } from '$lib/states/signs.svelte'
</script>

<div class="bg-gray-100 flex-auto overflow-hidden">
	<pre class="h-full w-full p-4 overflow-auto text-xs">
        {JSON.stringify(getAllSigns(), null, 2)}
    </pre>
</div>
