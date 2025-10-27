<script lang="ts">
	import { flip } from 'svelte/animate'
	import { Tabs } from 'bits-ui'
	import Icon from '@iconify/svelte'

	import CardSign from './CardSign.svelte'
	import Map from './Map.svelte'

	import { addSign, getAllSigns, signPost } from '$lib/states/signs.svelte'

	let collapsed = false
	let editMode: 'graphic' | 'form' = 'graphic'

	const flipDurationMs = 300
</script>

<div class="w-1/2 p-6 pb-0 bg-slate-100 flex overflow-hidden rounded-xl">
	<Tabs.Root value="config" class="w-full flex flex-col">
		<Tabs.List
			class="bg-slate-200 rounded p-2 flex gap-x-3 *:flex-auto *:flex *:items-center *:justify-center *:px-2 *:h-8 *:cursor-pointer *:rounded *:truncate *:font-semibold *:data-[state=active]:shadow-mini *:bg-transparent *:data-[state=active]:bg-white *:hover:bg-slate-100"
		>
			<Tabs.Trigger value="map">Standort</Tabs.Trigger>
			<Tabs.Trigger value="config">Konfigurator</Tabs.Trigger>
			<Tabs.Trigger value="accessories">Zubehör</Tabs.Trigger>
		</Tabs.List>

		<Tabs.Content value="map" class="select-none pt-3 flex flex-col gap-y-3 overflow-y-auto">
			<Map {signPost} />
		</Tabs.Content>

		<Tabs.Content value="config" class="select-none pt-2 flex flex-col flex-auto min-h-0">
			<div class="w-full flex p-2 gap-2 justify-end bg-slate-200 rounded">
				<button
					type="button"
					class="inline-flex items-center justify-center size-7 bg-slate-400 text-white rounded-full hover:bg-slate-700 transition-colors"
					onclick={() => {
						collapsed = !collapsed
					}}
					title={collapsed ? 'Karten aufklappen' : 'Karten einklappen'}
				>
					<Icon
						icon={collapsed ? 'tabler:arrows-maximize' : 'tabler:arrows-minimize'}
						class="size-4"
					/>
				</button>
				<button
					type="button"
					class="inline-flex items-center justify-center size-7 bg-slate-400 text-white rounded-full hover:bg-slate-700 transition-colors"
					onclick={() => {
						editMode = editMode === 'graphic' ? 'form' : 'graphic'
					}}
				>
					<Icon
						icon={editMode === 'graphic' ? 'tabler:forms' : 'tabler:sign-right'}
						class="size-4"
					/>
				</button>
			</div>

			<div class="flex-auto overflow-y-auto min-h-0">
				<div class="w-full flex justify-center">
					<button
						class="inline-flex gap-x-2 items-center px-4 py-1 my-2 bg-slate-400 text-sm text-white rounded hover:bg-slate-700 transition-colors"
						onclick={() => addSign()}
					>
						<Icon icon="tabler:circle-plus-filled" class="size-5" />
						Schild einfügen
					</button>
				</div>
				<div class="flex flex-col pointer-none">
					{#each getAllSigns() as sign (sign.id)}
						<div animate:flip={{ duration: flipDurationMs }}>
							<CardSign {sign} {collapsed} {editMode} />
						</div>
					{/each}
				</div>
			</div>

		</Tabs.Content>
		<Tabs.Content value="accessories" class="select-none pt-3">Hier das Zubehör</Tabs.Content>
	</Tabs.Root>
</div>
