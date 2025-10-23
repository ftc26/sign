<script lang="ts">
	import type { Sign } from '$lib/states/signs.svelte'
	import { getAllSigns } from '$lib/states/signs.svelte'

	type Props = {
		label?: string
	}

	let { label }: Props = $props()

	let signs: Sign[] = $derived(getAllSigns())

	// spacing between signs vertically (px in SVG units)
	const SPACING = 160
	const SIGN_WIDTH = 500
	const POLE_WIDTH = 16
	const POLE_RADIUS = POLE_WIDTH / 2
	// Desired gap from the pole equals the pole radius
	const GAP = POLE_RADIUS

	// Compute canvas geometry so both signs fit with the desired gap from the pole
	const CENTER_X = SIGN_WIDTH + (POLE_RADIUS + GAP)
	const SVG_WIDTH = 2 * SIGN_WIDTH + 2 * (POLE_RADIUS + GAP)

</script>

<div class="p-10 w-full h-full rounded bg-gradient-to-b from-slate-50 to-slate-300 items-center justify-center flex">
	Datasheet preview is not yet implemented.
</div>
