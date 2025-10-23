<script lang="ts">
	import { flip } from 'svelte/animate'
	import { Tabs } from 'bits-ui'
	import Icon from '@iconify/svelte'
	
	import CardSign from './CardSign.svelte'
	import Map from './Map.svelte'

	import { addSign, getAllSigns, setAllSigns } from '$lib/states/signs.svelte'

	const flipDurationMs = 300
</script>

<div class="p-6 bg-slate-100 w-1/3 flex overflow-hidden">
	<Tabs.Root value="config" class="w-full flex flex-col">
		<Tabs.List
			class="bg-slate-200 rounded p-2 flex gap-x-3 *:flex-auto *:flex *:items-center *:px-2 *:h-8 *:cursor-pointer *:rounded *:overflow-hidden *:font-semibold *:data-[state=active]:shadow-mini *:bg-transparent *:data-[state=active]:bg-white *:hover:bg-slate-100"
		>
			<Tabs.Trigger value="map">Karte</Tabs.Trigger>
			<Tabs.Trigger value="config">Konfigurator</Tabs.Trigger>
			<Tabs.Trigger value="accessories">Zubehör</Tabs.Trigger>
			<Tabs.Trigger value="order">Bestellung</Tabs.Trigger>
		</Tabs.List>

		<Tabs.Content value="map" class="select-none pt-3 flex flex-col gap-y-3 overflow-y-auto">
			<Map />
		</Tabs.Content>
		<Tabs.Content value="config" class="select-none pt-3 flex flex-col gap-y-3 overflow-y-auto">
			<div class="w-full flex justify-center">
				<button
					class="inline-flex gap-x-2 items-center px-4 py-1 bg-slate-400 text-sm text-white rounded hover:bg-slate-700 transition-colors"
					onclick={() => addSign()}
				>
					<Icon icon="tabler:circle-plus-filled" class="size-5" />
					Schild einfügen
				</button>
			</div>
			<div class="flex flex-col pointer-none">
				{#each getAllSigns() as sign (sign.id)}
					<div animate:flip={{ duration: flipDurationMs }}>
						<CardSign {sign} />
					</div>
				{/each}
			</div>
		</Tabs.Content>
		<Tabs.Content value="accessories" class="select-none pt-3">Hier das Zubehör</Tabs.Content>
		<Tabs.Content value="order" class="select-none pt-3"
			>Hier werden die Schilder bestellt</Tabs.Content
		>
	</Tabs.Root>
</div>
