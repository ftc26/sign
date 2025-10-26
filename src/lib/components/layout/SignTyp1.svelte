<script lang="ts">
	import type { Sign } from '$lib/states/signs.svelte'
	import { poiSymbols, routeSymbols } from '$lib/assets/symbol'

	type Props = {
		sign: Sign
		onSelect?: (event: MouseEvent, key?: string) => void
		showPlaceholders?: boolean
	}

	let { sign, onSelect = () => {}, showPlaceholders = true }: Props = $props()

	function prettyPrintDistance(distance: number) {
		if (isNaN(distance)) return ''

		if (distance >= 1000) {
			return (Math.round((distance / 1000) * 10) / 10).toFixed(1) + 'km'
		} else {
			return Math.round(distance).toString() + 'm'
		}
	}

	let routeSymbol1 = $derived(
		routeSymbols.find((symbol) => symbol.value === sign.route.symbols[0])
	)
	let routeSymbol2 = $derived(
		routeSymbols.find((symbol) => symbol.value === sign.route.symbols[1])
	)
	let direction1Symbol1 = $derived(
		poiSymbols.find((symbol) => symbol.value === sign.directions[0].symbols[0])
	)
	let direction1Symbol2 = $derived(
		poiSymbols.find((symbol) => symbol.value === sign.directions[0].symbols[1])
	)
	let direction2Symbol1 = $derived(
		poiSymbols.find((symbol) => symbol.value === sign.directions[1].symbols[0])
	)
	let direction2Symbol2 = $derived(
		poiSymbols.find((symbol) => symbol.value === sign.directions[1].symbols[1])
	)

	let allSymbols = $derived([
		routeSymbol1,
		routeSymbol2,
		direction1Symbol1,
		direction1Symbol2,
		direction2Symbol1,
		direction2Symbol2
	])

	let routeDirection = $derived(sign.route.direction)
</script>

<defs>
	{#each allSymbols as symbol}
		{#if symbol}
			<symbol.icon />
		{/if}
	{/each}
</defs>

<!-- Hintergrund -->
<!-- if (routeDirection === 'right') then flip along x -->
<g transform={routeDirection === 'right' ? 'translate(500, 0) scale(-1, 1)' : ''}>
	<!-- Hintergrund Schild -->
	<g>
		<path
			fill="#F1F0EA"
			stroke="#000000"
			stroke-width="0.1"
			d="M 0,75 l 75,-75 425,0 0,150 -425,0 z "
		/>
		<path
			fill="#325928"
			stroke="none"
			d="M 14.14213562373095,75 l 65,-65 410.85786437626905,0 0,130 -410.85786437626905,0 z "
		/>
	</g>

	<!-- Markierungen -->
	<g transform="translate(106, 0)">
		<circle cx="382" cy="75" r="3.75" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" />
		<line x1="382" y1="70" x2="382" y2="80" fill="none" stroke="#000000" stroke-width="0.25" />
		<line x1="377" y1="75" x2="387" y2="75" fill="none" stroke="#000000" stroke-width="0.25" />
		<circle cx="-0.5" cy="75" r="3.75" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" />
		<line
			x1="-0.5"
			y1="70"
			x2="-0.5"
			y2="80"
			fill="none"
			stroke="#000000"
			stroke-width="0.25"
		/>
		<line x1="-5.5" y1="75" x2="4.5" y2="75" fill="none" stroke="#000000" stroke-width="0.25" />
	</g>
</g>

<!-- Wegsymbole -->
<g transform={routeDirection === 'right' ? 'translate(400 ,60)' : 'translate(37, 60)'}>
	<!-- Wegsymbol 1 -->
	<g
		transform="translate(0, 0)"
		class="form"
		onclick={(e) => onSelect(e)}
		data-key="routeSymbol1"
	>
		{#if routeSymbol1}
			<use href={`#${routeSymbol1.value}`} fill="white" width="30" height="30" />
		{:else if showPlaceholders}
			<rect width="30" height="30" class="placeholder" />
		{/if}
	</g>
	<!-- Wegsymbol 2 -->
	<g
		transform="translate(35, 0)"
		class="form"
		onclick={(e) => onSelect(e)}
		data-key="routeSymbol2"
	>
		{#if routeSymbol2}
			<use href={`#${routeSymbol2.value}`} fill="white" width="30" height="30" />
		{:else if showPlaceholders}
			<rect width="30" height="30" class="placeholder" />
		{/if}
	</g>
</g>

<!-- Textbereich -->
<g
	transform={routeDirection === 'right' ? 'translate(22 ,0)' : 'translate(106, 0)'}
	font-family="Arial Narrow"
>
	<!-- Wegname -->
	<g
		transform="translate(0, 27) translate(0,0)"
		class="form"
		onclick={(e) => onSelect(e)}
		data-key="routeName"
	>
		{#if sign.route.name}
			<text font-size="14" fill="#F7B500" stroke="none">
				{sign.route.name}
			</text>
		{:else if showPlaceholders}
			<text font-size="14" class="placeholder">Name des Wegs</text>
		{/if}
	</g>

	<!-- Ziel 1 -->
	<g
		transform="translate(0, 62)"
		font-size="26"
		class="form"
		onclick={(e) => onSelect(e)}
		data-key="direction1Name"
	>
		{#if sign.directions[0].name}
			<text fill="white" stroke="none">
				{sign.directions[0].name}
			</text>
		{:else if showPlaceholders}
			<text class="placeholder">Name des Ziels</text>
		{/if}
	</g>
	<!-- Ziel 1 Symbol 1 -->
	<g
		transform="translate(242, 41.5)"
		class="form"
		onclick={(e) => onSelect(e)}
		data-key="direction1Symbol1"
	>
		{#if direction1Symbol1}
			<rect width="22" height="22" stroke="white" fill="none" />
			<use
				href={`#${direction1Symbol1.value}`}
				fill="white"
				stroke="white"
				width="18"
				height="18"
				x="2"
				y="2"
			/>
		{:else if showPlaceholders}
			<rect width="22" height="22" class="placeholder" />
		{/if}
	</g>
	<!-- Ziel 1 Symbol 2 -->
	<g
		transform="translate(267, 41.5)"
		class="form"
		onclick={(e) => onSelect(e)}
		data-key="direction1Symbol2"
	>
		{#if direction1Symbol2}
			<rect width="22" height="22" stroke="white" fill="none" />
			<use
				href={`#${direction1Symbol2.value}`}
				fill="white"
				stroke="white"
				width="18"
				height="18"
				x="2"
				y="2"
			/>
		{:else if showPlaceholders}
			<rect width="22" height="22" class="placeholder" />
		{/if}
	</g>
	<!-- Ziel 1 Distanz -->
	<g
		transform="translate(372, 62)"
		font-size="26"
		text-anchor="end"
		class="form"
		onclick={(e) => onSelect(e)}
		data-key="direction1distance"
	>
		{#if sign.directions[0].distance}
			<text fill="white">
				{prettyPrintDistance(sign.directions[0].distance)}
			</text>
		{:else if showPlaceholders}
			<text class="placeholder">?m</text>
		{/if}
	</g>

	<!-- Ziel 2 -->
	<g
		transform="translate(0, 110)"
		font-size="26"
		class="form"
		onclick={(e) => onSelect(e)}
		data-key="direction2Name"
	>
		{#if sign.directions[1].name}
			<text fill="white" stroke="none">
				{sign.directions[1].name}
			</text>
		{:else if showPlaceholders}
			<text class="placeholder">Name des Ziels</text>
		{/if}
	</g>
	<!-- Ziel 2 Picto 1 -->
	<g
		transform="translate(242, 90)"
		class="form"
		onclick={(e) => onSelect(e)}
		data-key="direction2Symbol1"
	>
		{#if direction2Symbol1}
			<rect width="22" height="22" stroke="white" fill="none" />
			<use
				href={`#${direction2Symbol1.value}`}
				fill="white"
				stroke="white"
				width="18"
				height="18"
				x="2"
				y="2"
			/>
		{:else if showPlaceholders}
			<rect width="22" height="22" class="placeholder" />
		{/if}
	</g>
	<!-- Ziel 2 Picto 2 -->
	<g
		transform="translate(267, 90)"
		class="form"
		onclick={(e) => onSelect(e)}
		data-key="direction2Symbol2"
	>
		{#if direction2Symbol2}
			<rect width="22" height="22" stroke="white" fill="none" />
			<defs>{direction2Symbol2.icon}</defs>
			<use
				href={`#${direction2Symbol2.value}`}
				fill="white"
				stroke="white"
				width="18"
				height="18"
				x="2"
				y="2"
			/>
		{:else if showPlaceholders}
			<rect width="22" height="22" class="placeholder" />
		{/if}
	</g>
	<!-- Ziel 2 Distanz -->
	<g
		transform="translate(372, 110)"
		text-anchor="end"
		font-size="26"
		class="form"
		onclick={(e) => onSelect(e)}
		data-key="direction2distance"
	>
		{#if sign.directions[1].distance}
			<text fill="white">
				{prettyPrintDistance(sign.directions[1].distance)}
			</text>
		{:else if showPlaceholders}
			<text class="placeholder">?m</text>
		{/if}
	</g>

	<!-- Schildnummer -->
	<g
		transform="translate(372,134)"
		text-anchor="end"
		font-size="10"
		fill="white"
		class="form"
		onclick={(e) => onSelect(e)}
		data-key="signNumber"
	>
		{#if sign.route.signNumber}
			<text>
				Schild-Nr. {sign.route.signNumber}
			</text>
		{:else if showPlaceholders}
			<text class="placeholder"> Nummer des Schildes </text>
		{/if}
	</g>
</g>

<style>
	.form {
		pointer-events: all;
	}
	.form:hover {
		cursor: pointer;
	}
	.placeholder {
		fill: white;
		fill-opacity: 0.2;
		font-style: italic;
	}
	.placeholder:hover {
		fill-opacity: 0.6;
	}
</style>
