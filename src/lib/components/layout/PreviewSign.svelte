<script lang="ts">
	import type { Sign } from '$lib/states/signs.svelte'
	import SignTyp1 from './SignTyp1.svelte'

	type Props = {
		sign: Sign
		label?: string
	}

	let { label, sign }: Props = $props()
</script>

<label for="" class="block text-xs font-medium text-slate-700 mb-1">{label}</label>
<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	version="1.1"
	width="500mm"
	height="150mm"
	viewBox="0 0 500 150"
	class="w-full h-full"
>
	<defs><SignTyp1 {sign} /></defs>
	<use href={`#${sign.id}`} />
</svg>
