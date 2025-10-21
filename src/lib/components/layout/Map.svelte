<script lang="ts">
	import maplibregl from 'maplibre-gl'
	import 'maplibre-gl/dist/maplibre-gl.css'
	import { onMount } from 'svelte'

	let mapContainer: string | HTMLElement
	// Weimar coordinates
	const center: [number, number] = [11.327, 50.9795] // [lng, lat]

	onMount(() => {
		const map = new maplibregl.Map({
			container: mapContainer,
			style: 'https://api.maptiler.com/maps/voyager/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
			center,
			zoom: 12
		})

		// Add navigation controls
		map.addControl(new maplibregl.NavigationControl(), 'top-right')

		// Add marker with popup
		new maplibregl.Marker({ color: '#2563eb' }) // blue marker
			.setLngLat(center)
			.setPopup(new maplibregl.Popup().setHTML('<b>Hello from Weimar!'))
			.addTo(map)

		return () => map.remove() // cleanup on unmount
	})
</script>

<div bind:this={mapContainer} class="map-container"></div>

<style>
	.map-container {
		height: 400px;
		width: 100%;
		border-radius: 12px;
		overflow: hidden;
	}

	:global(.maplibregl-popup) {
		max-width: 200px;
	}
</style>
