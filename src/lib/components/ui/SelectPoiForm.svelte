<script lang="ts">
	import { Select } from 'bits-ui'
	import Icon from '@iconify/svelte'

	import { poiSymbols } from '$lib/assets/symbol';
	import SelectPoiContent from './SelectPoiContent.svelte';

	type Props = {
		label?: string
		poiSymbols?: { value: string; label: string; icon: string; disabled?: boolean }[]
		value?: string
	}

	let { label = 'Symbol', value = $bindable() }: Props = $props()

	const selected = $derived(poiSymbols.find((symbol) => symbol.value === value))
</script>

<div class="flex flex-col truncate">
	<label for="input-field" class="block text-xs font-medium text-slate-700 mb-1">{label}</label>

	<Select.Root
		type="single"
		onValueChange={(v) => (value = v)}
		items={poiSymbols}
		allowDeselect={true}
	>
		<Select.Trigger
			class="h-8 w-full px-2 gap-x-2 rounded border-none inline-flex touch-none select-none items-center text-sm  bg-white data-placeholder:text-slate-400 transition-colors"
			aria-label="Wähle ein Symbol"
		>
			{#if selected}
				<div
					class="size-5 flex-none p-0.5 text-white bg-slate-600 rounded-sm flex items-center justify-center"
				>
					<svg class="w-full h-full" aria-hidden="true">
						<defs><selected.icon /></defs>
						<use href={`#${value}`} fill="currentColor" />
					</svg>
				</div>
			{:else}
				<Icon icon="tabler:help-square-filled" class="size-6 text-slate-400 flex-none" />
			{/if}

			<span class="truncate flex-auto text-left">{selected?.label || 'Wähle ein Symbol'}</span>
			<Icon icon="tabler:chevron-down" class="flex-none size-6" />
		</Select.Trigger>

		<Select.Portal>
			<SelectPoiContent />
		</Select.Portal>
	</Select.Root>
</div>
