<script lang="ts">
	import { Tabs } from 'bits-ui'
	import CardSign from './CardSign.svelte'

	import { addSign, insertSignAfter, deleteSign, getAllSigns } from '$lib/states/signs.svelte'
</script>

<div class="p-6 bg-slate-100 w-1/3 flex overflow-hidden">
	<Tabs.Root value="signs" class="w-full flex flex-col">
		<Tabs.List
			class="bg-slate-200 rounded p-2 flex gap-x-3 *:flex-auto *:flex *:items-center *:px-2 *:h-8 *:cursor-pointer *:rounded *:font-semibold *:data-[state=active]:shadow-mini *:bg-transparent *:data-[state=active]:bg-white *:hover:bg-slate-100"
		>
			<Tabs.Trigger value="signs">Schilder</Tabs.Trigger>
			<Tabs.Trigger value="accessories">Zubehör</Tabs.Trigger>
		</Tabs.List>

		<Tabs.Content value="signs" class="select-none pt-3 flex flex-col gap-y-3 overflow-y-auto">
			{#each getAllSigns() as sign}
				<CardSign {sign} />
			{/each}
		</Tabs.Content>
		<Tabs.Content value="accessories" class="select-none pt-3">zubehör 1</Tabs.Content>
	</Tabs.Root>
</div>
