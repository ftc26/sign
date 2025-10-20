<script lang="ts">
	import type { Sign } from '$lib/states/signs.svelte'

	import Camping from '$lib/assets/symbol/pictograms/camping.svg?raw'
	import Estateagent from '$lib/assets/symbol/pictograms/estateagent.svg?raw'
	import Fastfood from '$lib/assets/symbol/pictograms/fastfood.svg?raw'
	import Hillclimbing from '$lib/assets/symbol/pictograms/hillclimbing.svg?raw'
	import Hospital from '$lib/assets/symbol/pictograms/hospital.svg?raw'
	import Hotel from '$lib/assets/symbol/pictograms/hotel.svg?raw'
	import Mine from '$lib/assets/symbol/pictograms/mine.svg?raw'
	import Museum from '$lib/assets/symbol/pictograms/museum.svg?raw'
	import Parking from '$lib/assets/symbol/pictograms/parking.svg?raw'
	import Photo from '$lib/assets/symbol/pictograms/photo.svg?raw'
	import Taxi from '$lib/assets/symbol/pictograms/taxi.svg?raw'
	import Toilets from '$lib/assets/symbol/pictograms/toilets.svg?raw'
	import Trainstation from '$lib/assets/symbol/pictograms/trainstation.svg?raw'
	import Wastebin from '$lib/assets/symbol/pictograms/wastebin.svg?raw'

	import GebietswegBalken from '$lib/assets/symbol/way/Gebietsweg-Balken.svg?raw'
	import HauptwegBalken from '$lib/assets/symbol/way/Hauptweg-Balken.svg?raw'
	import OrtswegDreieck from '$lib/assets/symbol/way/Ortsweg-Dreieck.svg?raw'
	import RundwegDreieck from '$lib/assets/symbol/way/Rundweg-Dreieck.svg?raw'

	type Props = {
		sign: Sign
		label?: string
	}

	let { label, sign }: Props = $props()

	const directionSymbols: { value: string; label: string; icon: string; disabled?: boolean }[] = [
		{ value: 'camping', label: 'Camping', icon: Camping },
		{ value: 'estateagent', label: 'Immobilien', icon: Estateagent },
		{ value: 'fastfood', label: 'Schnellimbiss', icon: Fastfood },
		{ value: 'hillclimbing', label: 'Bergsteigen', icon: Hillclimbing },
		{ value: 'hospital', label: 'Krankenhaus', icon: Hospital },
		{ value: 'hotel', label: 'Hotel', icon: Hotel },
		{ value: 'mine', label: 'Mine', icon: Mine },
		{ value: 'museum', label: 'Museum', icon: Museum },
		{ value: 'parking', label: 'Parkplatz', icon: Parking },
		{ value: 'photo', label: 'Fotopunkt', icon: Photo },
		{ value: 'taxi', label: 'Taxi', icon: Taxi },
		{ value: 'toilets', label: 'Toiletten', icon: Toilets },
		{ value: 'trainstation', label: 'Bahnhof', icon: Trainstation },
		{ value: 'wastebin', label: 'Mülleimer', icon: Wastebin }
	]

	const routeSymbols: { value: string; label: string; icon: string; disabled?: boolean }[] = [
		{ value: 'gebietswegBalken', label: 'Gebietsweg Rot', icon: GebietswegBalken },
		{ value: 'hauptwegBalken', label: 'Hauptweg Blau', icon: HauptwegBalken },
		{ value: 'ortswegDreieck', label: 'Ortsweg Grün', icon: OrtswegDreieck },
		{ value: 'rundwegDreieck', label: 'Rundweg Gelb', icon: RundwegDreieck }
	]

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
		directionSymbols.find((symbol) => symbol.value === sign.directions[0].symbols[0])
	)
	let direction1Symbol2 = $derived(
		directionSymbols.find((symbol) => symbol.value === sign.directions[0].symbols[1])
	)
	let direction2Symbol1 = $derived(
		directionSymbols.find((symbol) => symbol.value === sign.directions[1].symbols[0])
	)
	let direction2Symbol2 = $derived(
		directionSymbols.find((symbol) => symbol.value === sign.directions[1].symbols[1])
	)

	let routeDirection = $derived(sign.route.direction)
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
	<!-- Hintergrund -->
	<!-- if (routeDirection === 'right') then flip along x -->
	<g transform={routeDirection === 'right' ? 'translate(500, 0) scale(-1, 1)' : ''}>
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
			<line
				x1="382"
				y1="70"
				x2="382"
				y2="80"
				fill="none"
				stroke="#000000"
				stroke-width="0.25"
			/>
			<line
				x1="377"
				y1="75"
				x2="387"
				y2="75"
				fill="none"
				stroke="#000000"
				stroke-width="0.25"
			/>
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
			<line
				x1="-5.5"
				y1="75"
				x2="4.5"
				y2="75"
				fill="none"
				stroke="#000000"
				stroke-width="0.25"
			/>
		</g>
	</g>

	<!-- Wegsymbole -->
	<g transform={routeDirection === 'right' ? 'translate(400 ,60)' : 'translate(37, 60)'}>
		<!-- Wegsymbol 1 -->
		<g transform="translate(0, 0)">
			<!-- <rect width="30" height="30" fill="blue" /> -->
			{#if routeSymbol1}
				<svg class="w-full h-full" aria-hidden="true">
					<defs>{@html routeSymbol1.icon}</defs>
					<use href={`#${routeSymbol1.value}`} fill="white" width="30" height="30" />
				</svg>
			{/if}
		</g>
		<!-- Wegsymbol 2 -->
		<g transform="translate(35, 0)" fill="white">
			<!-- <rect width="30" height="30" fill="blue" /> -->
			{#if routeSymbol2}
				<svg class="w-full h-full" aria-hidden="true">
					<defs>{@html routeSymbol2.icon}</defs>
					<use href={`#${routeSymbol2.value}`} fill="white" width="30" height="30" />
				</svg>
			{/if}
		</g>
	</g>

	<!-- Textbereich -->
	<g transform={routeDirection === 'right' ? 'translate(22 ,0)' : 'translate(106, 0)'}>
		<!-- Wegname -->
		<g transform="translate(0, 27) translate(0,0)">
			<text
				font-family="Arial Narrow"
				font-size="14"
				fill="#F7B500"
				stroke="none"
				x="0"
				y="0"
			>
				{sign.route.name}
			</text>
		</g>

		<!-- Ziel 1 -->
		<g transform="translate(0, 62)">
			<text font-family="Arial Narrow" font-size="26" fill="white" stroke="none" x="0" y="0">
				{sign.directions[0].name}
			</text>
		</g>
		<!-- Ziel 1 Symbol 1 -->
		<g transform="translate(242, 41.5)">
			{#if direction1Symbol1}
				<svg class="w-full h-full" aria-hidden="true">
					<rect width="22" height="22" stroke="white" fill="none" />
					<defs>{@html direction1Symbol1.icon}</defs>
					<use
						href={`#${direction1Symbol1.value}`}
						fill="white"
						stroke="white"
						width="18"
						height="18"
						x="2"
						y="2"
					/>
				</svg>
			{/if}
		</g>
		<!-- Ziel 1 Symbol 2 -->
		<g transform="translate(267, 41.5)">
			{#if direction1Symbol2}
				<svg class="w-full h-full" aria-hidden="true">
					<rect width="22" height="22" stroke="white" fill="none" />
					<defs>{@html direction1Symbol2.icon}</defs>
					<use
						href={`#${direction1Symbol2.value}`}
						fill="white"
						stroke="white"
						width="18"
						height="18"
						x="2"
						y="2"
					/>
				</svg>
			{/if}
		</g>
		<!-- Ziel 1 Distanz -->
		<g transform="translate(372, 62)">
			<text
				font-family="Arial Narrow"
				text-anchor="end"
				font-size="26"
				fill="white"
				x="0"
				y="0"
			>
				{prettyPrintDistance(sign.directions[0].distance)}
			</text>
		</g>

		<!-- Ziel 2 -->
		<g transform="translate(0, 110)">
			<text font-family="Arial Narrow" font-size="26" fill="white" stroke="none">
				{sign.directions[1].name}
			</text>
		</g>
		<!-- Ziel 2 Picto 1 -->
		<g transform="translate(242, 90)">
			{#if direction2Symbol1}
				<svg class="w-full h-full" aria-hidden="true">
					<rect width="22" height="22" stroke="white" fill="none" />
					<defs>{@html direction2Symbol1.icon}</defs>
					<use
						href={`#${direction2Symbol1.value}`}
						fill="white"
						stroke="white"
						width="18"
						height="18"
						x="2"
						y="2"
					/>
				</svg>
			{/if}
		</g>
		<!-- Ziel 2 Picto 2 -->
		<g transform="translate(267, 90)">
			{#if direction2Symbol2}
				<svg class="w-full h-full" aria-hidden="true">
					<rect width="22" height="22" stroke="white" fill="none" />
					<defs>{@html direction2Symbol2.icon}</defs>
					<use
						href={`#${direction2Symbol2.value}`}
						fill="white"
						stroke="white"
						width="18"
						height="18"
						x="2"
						y="2"
					/>
				</svg>
			{/if}
		</g>
		<!-- Ziel 2 Distanz -->
		<g transform="translate(372, 110)">
			<text
				font-family="Arial Narrow"
				text-anchor="end"
				font-size="26"
				fill="white"
				stroke="none"
				x="0"
				y="0"
			>
				{prettyPrintDistance(sign.directions[1].distance)}
			</text>
		</g>
		<!-- <g transform="translate(0,134)">
			<text font-family="Arial Narrow" font-size="13" fill="white" stroke="none" x="0" y="0">
				Info: Fernziel
			</text>
		</g> -->

		<!-- Schildnummer -->
		<g transform="translate(372,134)">
			<text
				font-family="Arial Narrow"
				text-anchor="end"
				font-size="10"
				fill="white"
				stroke="none"
				x="0"
				y="0"
			>
				Schild-Nr. {sign.route.signNumber}
			</text>
		</g>
	</g>
</svg>
