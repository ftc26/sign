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

<label for="" class="block text-xs font-medium text-slate-700 mb-1">{label}</label>

<div class="p-10 w-full h-full rounded bg-gradient-to-b from-slate-50 to-slate-300">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		version="1.1"
		width={SVG_WIDTH}
		height={totalHeight()}
		viewBox={`0 0 ${SVG_WIDTH} ${totalHeight()}`}
		class="w-full h-full "
	>
		<!-- gradient definition for the pole to achieve a plastic/3D look -->
		<defs>
			<linearGradient id="poleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" stop-color="#2b2b2b" />
				<stop offset="20%" stop-color="#4a4a4a" />
				<stop offset="50%" stop-color="#9a9a9a" />
				<stop offset="80%" stop-color="#4a4a4a" />
				<stop offset="100%" stop-color="#2b2b2b" />
			</linearGradient>
		</defs>
		<!-- symbol definitions for each sign -->
		{#each signs as sign}
			<defs><SignTyp1 {sign} /></defs>
		{/each}

		<!-- central pole -->
		<g>
			<!-- pole at computed center with gradient fill for 3D effect -->
			<rect
				x={CENTER_X - POLE_RADIUS}
				y={0}
				width={POLE_WIDTH}
				height={totalHeight()}
				fill="url(#poleGradient)"
				stroke="#2a2a2a"
				stroke-width="0.5"
			/>
		</g>

		<!-- place each sign left or right and stack vertically -->
		{#each signs as sign, i}
			<use href={`#${sign.id}`} x={xFor(sign)} y={yFor(i)} />
		{/each}
	</svg>
</div>
