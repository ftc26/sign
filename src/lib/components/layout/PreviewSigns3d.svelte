<script lang="ts">
	import type { Sign } from '$lib/states/signs.svelte'
	import SignTyp1 from './SignTyp1.svelte'

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

	// computed total height based on number of signs (Svelte 5 reactive style)
	let totalHeight = $derived(() => Math.max(SPACING, (signs?.length || 0) * SPACING) + 20)

	function xFor(sign: Sign) {
		const dir = sign?.route?.direction || 'left'
		// Offset each sign away from the pole by (pole radius + gap), where gap == pole radius
		return dir === 'right'
			? CENTER_X + (POLE_RADIUS + GAP)
			: CENTER_X - (POLE_RADIUS + GAP) - SIGN_WIDTH
	}

	function yFor(index: number) {
		// place first sign at y=0, next at SPACING, etc.
		return index * SPACING + 10
	}
</script>

<div class="p-10 w-full h-full rounded bg-gradient-to-b from-slate-50 to-slate-300 items-center justify-center flex">
	3d preview is not yet implemented.
</div>
