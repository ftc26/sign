<script lang="ts">
	import maplibregl from 'maplibre-gl'
	import 'maplibre-gl/dist/maplibre-gl.css'
	import { onMount } from 'svelte'
	import Input from '../ui/Input.svelte'
	import Textarea from '../ui/Textarea.svelte'
	import Icon from '@iconify/svelte'
	import type { SignPost } from '$lib/states/signs.svelte'

	let { signPost }: { signPost: SignPost } = $props()

	// container ref for the map
	let mapContainer: string | HTMLElement

	// editable fields
	let title = $state('Mein Standort')
	let description = $state('Kurze Beschreibung des Standortes.')
	let latitude = $state(50.9795)
	let longitude = $state(11.327)

	type Img = { id: number; url: string; alt?: string }
	let images = $state<Img[]>([
		{ id: 1, url: 'https://picsum.photos/id/1015/200/120', alt: 'Ort 1' },
		{ id: 2, url: 'https://picsum.photos/id/1016/200/120', alt: 'Ort 2' },
		{ id: 3, url: 'https://picsum.photos/id/1024/200/120', alt: 'Ort 3' }
	])

	function addDummyImage() {
		const id = Math.max(0, ...images.map((i) => i.id)) + 1
		images = [
			...images,
			{ id, url: `https://picsum.photos/seed/${id}/200/120`, alt: `Ort ${id}` }
		]
	}

	// map + marker references
	let map = $state<maplibregl.Map | null>(null)
	let marker = $state<maplibregl.Marker | null>(null)

	function lngLat(): [number, number] {
		// MapLibre expects [lng, lat]
		return [Number(longitude) || 0, Number(latitude) || 0]
	}

	function bindMarkerEvents() {
		if (!marker) return
		marker.on('dragend', () => {
			const pos = marker!.getLngLat()
			longitude = Number(pos.lng)
			latitude = Number(pos.lat)
		})
	}

	function updateMarkerAndCenter() {
		if (!map) return
		const ll = lngLat()
		if (marker) {
			marker.setLngLat(ll)
		} else {
			marker = new maplibregl.Marker({ color: '#2563eb', draggable: true })
				.setLngLat(ll)
				.addTo(map)
			bindMarkerEvents()
		}
		map.setCenter(ll)
	}

	// react to coordinate changes automatically (Svelte 5 runes)
	$effect(() => {
		void latitude
		void longitude
		updateMarkerAndCenter()
	})

	// when height changes, resize the map to fit
	$effect(() => {
		if (map) {
			map.resize()
		}
	})

	onMount(() => {
		const initial = lngLat()
		map = new maplibregl.Map({
			container: mapContainer,
			style: 'https://api.maptiler.com/maps/voyager/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
			center: initial,
			zoom: 12
		})

		// Add navigation controls
		map.addControl(new maplibregl.NavigationControl(), 'top-right')

		// Add marker with popup (draggable)
		marker = new maplibregl.Marker({ color: '#2563eb', draggable: true })
			.setLngLat(initial)
			.setPopup(new maplibregl.Popup().setHTML('<b>Standort</b>'))
			.addTo(map)
		bindMarkerEvents()

		// Allow clicking on the map to move marker
		map.on('click', (e) => {
			const ll: [number, number] = [e.lngLat.lng, e.lngLat.lat]
			marker!.setLngLat(ll)
			longitude = Number(ll[0])
			latitude = Number(ll[1])
		})

		return () => {
			map?.remove()
			map = null
			marker = null
		}
	})
</script>

<div class="space-y-3">
	<!-- Block 1: Titel & Beschreibung -->
	<div class="w-full rounded bg-slate-200 p-3 grid grid-cols-3 gap-2">
		<div class="col-span-3">
			<Input
				label="Titel"
				type="text"
				bind:value={title}
			/>	
		</div>
		<div class="col-span-3">
			<Textarea
				label="Karte"
				bind:value={description}
			/>
		</div>
	</div>

	<!-- Block 2: Map & Geokoordinaten -->
	<div class="w-full rounded bg-slate-200 p-3 gap-2">
		<label for="input-field" class="block text-xs font-medium text-slate-700 mb-1"
			>Karte</label
		>
		<div bind:this={mapContainer} class="map-container rounded w-full h-48"></div>
		
		<!-- <div class="col-span-3 md:col-span-1 flex flex-col gap-2">
			<div>
				<Input
					label="Breitengrad (Lat)"
					type="number"
					bind:value={latitude}
				/>
			</div>
			<div>
				<Input
					label="Längengrad (Lng)"
					type="number"
					bind:value={longitude}
				/>
			</div>
		</div> -->
	</div>

	<!-- Block 3: Standortbilder -->
	<div class="w-full rounded bg-slate-200 p-3">
		<div class="flex items-center justify-between mb-2">
			<label for="" class="block text-xs font-medium text-slate-700 mb-1">Standortbilder</label>
		</div>
		<ul class="grid grid-cols-4 gap-3">
			<!-- Add tile -->
			<li class="group relative border border-dashed border-slate-300 rounded overflow-hidden">
				<button
					type="button"
					class="w-full h-28 flex flex-col items-center justify-center text-slate-600 bg-slate-100 hover:bg-slate-50"
					title="Bild hinzufügen"
					onclick={addDummyImage}
				>
					<Icon icon="tabler:plus" class="text-2xl leading-none" />
					<span class="text-xs">Bild hinzufügen</span>
				</button>
			</li>

			{#each images as img (img.id)}
				<li class="group relative border border-slate-200 rounded overflow-hidden">
					<img
						src={img.url}
						alt={img.alt || 'Bild'}
						class="block w-full h-28 object-cover"
						loading="lazy"
					/>
					<button
						type="button"
						class="absolute top-1 right-1 text-xs bg-white/90 hover:bg-white border border-slate-300 rounded px-1"
						title="Entfernen"
						onclick={() => (images = images.filter((i) => i.id !== img.id))}
					>
						✕
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>
