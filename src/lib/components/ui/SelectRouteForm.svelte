<script lang="ts">
	import { Select } from 'bits-ui'
	import Icon from '@iconify/svelte'
	import { routeSymbols } from '$lib/assets/symbol'
	import SelectRouteContent from './SelectRouteContent.svelte';

	type Props = {
		label?: string
		value?: string
	}

	let { label = 'Symbol', value = $bindable() }: Props = $props()

	const selected = $derived(routeSymbols.find((symbol) => symbol.value === value))
</script>

<div class="flex flex-col truncate">
	<label for="input-field" class="block text-xs font-medium text-slate-700 mb-1">{label}</label>

	<Select.Root
		type="single"
		onValueChange={(v) => (value = v)}
		items={routeSymbols}
		allowDeselect={true}
		open={false}
	>
		<Select.Trigger
			class="h-8 w-full px-2 gap-x-2 rounded border-none inline-flex touch-none select-none items-center text-sm bg-white data-placeholder:text-slate-400 transition-colors"
			aria-label="Wähle ein Symbol"
		>
			<div class="size-5 flex-none border border-slate-600 flex items-center justify-center">
				{#if selected}
					<svg class="w-full h-full" aria-hidden="true">
						<defs><selected.icon /></defs>
						<use href={`#${value}`} />
					</svg>
				{:else}
					<Icon icon="tabler:help-square-filled" class="size-6 text-slate-400" />
				{/if}
			</div>
			<span class="truncate flex-auto text-left">{selected?.label || 'Wähle ein Symbol'}</span
			>
			<Icon icon="tabler:chevron-down" class="flex-none size-6" />
		</Select.Trigger>

		<Select.Portal>
			<SelectRouteContent />
		</Select.Portal>
	</Select.Root>
</div>
