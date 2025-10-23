<script lang="ts">
	import { Tabs } from 'bits-ui'
	import PreviewSigns from './PreviewSigns2d.svelte'
	import PreviewSigns3d from './PreviewSigns3d.svelte'
	import PreviewDatasheet from './PreviewDatasheet.svelte'
</script>

<div class="p-6 bg-slate-100 flex-auto flex overflow-hidden rounded-xl">
	<Tabs.Root value="2d" class="w-full flex flex-col">
		<Tabs.List
			class="bg-slate-200 rounded p-2 flex gap-x-3 *:flex-auto *:flex *:items-center *:justify-center *:px-2 *:h-8 *:cursor-pointer *:rounded *:truncate *:font-semibold *:data-[state=active]:shadow-mini *:bg-transparent *:data-[state=active]:bg-white *:hover:bg-slate-100"
		>
			<Tabs.Trigger value="2d">2d Preview</Tabs.Trigger>
			<Tabs.Trigger value="3d">3d Preview</Tabs.Trigger>
			<Tabs.Trigger value="Datenblatt">Datenblatt</Tabs.Trigger>
		</Tabs.List>

		<Tabs.Content value="2d" class="select-none mt-3 flex flex-auto overflow-hidden">
			<PreviewSigns />
		</Tabs.Content>
		<Tabs.Content value="3d" class="select-none mt-3 flex flex-auto overflow-hidden">
			<PreviewSigns3d />
		</Tabs.Content>
		<Tabs.Content value="Datenblatt" class="select-none mt-3 flex flex-auto overflow-hidden">
			<PreviewDatasheet />
		</Tabs.Content>
	</Tabs.Root>
</div>
