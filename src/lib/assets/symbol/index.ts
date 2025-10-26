import type { Component } from 'svelte'

import Camping from '$lib/assets/symbol/poi/Camping.svelte'
import Estateagent from '$lib/assets/symbol/poi/Estateagent.svelte'
import Fastfood from '$lib/assets/symbol/poi/Fastfood.svelte'
import Hillclimbing from '$lib/assets/symbol/poi/Hillclimbing.svelte'
import Hospital from '$lib/assets/symbol/poi/Hospital.svelte'
import Hotel from '$lib/assets/symbol/poi/Hotel.svelte'
import Mine from '$lib/assets/symbol/poi/Mine.svelte'
import Museum from '$lib/assets/symbol/poi/Museum.svelte'
import Parking from '$lib/assets/symbol/poi/Parking.svelte'
import Photo from '$lib/assets/symbol/poi/Photo.svelte'
import Taxi from '$lib/assets/symbol/poi/Taxi.svelte'
import Toilets from '$lib/assets/symbol/poi/Toilets.svelte'
import Trainstation from '$lib/assets/symbol/poi/Trainstation.svelte'
import Wastebin from '$lib/assets/symbol/poi/Wastebin.svelte'

import GebietswegBalken from '$lib/assets/symbol/route/Gebietsweg-Balken.svelte'
import HauptwegBalken from '$lib/assets/symbol/route/Hauptweg-Balken.svelte'
import OrtswegDreieck from '$lib/assets/symbol/route/Ortsweg-Dreieck.svelte'
import RundwegDreieck from '$lib/assets/symbol/route/Rundweg-Dreieck.svelte'


export const poiSymbols: Array<{ label: string; value: string; icon: Component }> = [
	{ label: 'Camping', value: 'camping', icon: Camping },
	{ label: 'Estateagent', value: 'estateagent', icon: Estateagent },
	{ label: 'Fastfood', value: 'fastfood', icon: Fastfood },
	{ label: 'Hillclimbing', value: 'hillclimbing', icon: Hillclimbing },
	{ label: 'Hospital', value: 'hospital', icon: Hospital },
	{ label: 'Hotel', value: 'hotel', icon: Hotel },
	{ label: 'Mine', value: 'mine', icon: Mine },
	{ label: 'Museum', value: 'museum', icon: Museum },
	{ label: 'Parking', value: 'parking', icon: Parking },
	{ label: 'Photo', value: 'photo', icon: Photo },
	{ label: 'Taxi', value: 'taxi', icon: Taxi },
	{ label: 'Toilets', value: 'toilets', icon: Toilets },
	{ label: 'Trainstation', value: 'trainstation', icon: Trainstation },
	{ label: 'Wastebin', value: 'wastebin', icon: Wastebin }
]

export const routeSymbols = [
	{ label: 'Gebietsweg Balken', value: 'gebietswegBalken', icon: GebietswegBalken },
	{ label: 'Hauptweg Balken', value: 'hauptwegBalken', icon: HauptwegBalken },
	{ label: 'Ortsweg Dreieck', value: 'ortswegDreieck', icon: OrtswegDreieck },
	{ label: 'Rundweg Dreieck', value: 'rundwegDreieck', icon: RundwegDreieck }
]
