<script lang="ts">
	import { Select } from 'bits-ui'

	import { poiSymbols } from '$lib/assets/symbol'
	import SelectPoiContent from './SelectPoiContent.svelte'
	import type { Component } from 'svelte'

	type Props = {
		label?: string
		poiSymbols?: { value: string; label: string; icon: Component; }[]
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
		<Select.Portal>
			<SelectPoiContent />
		</Select.Portal>
	</Select.Root>
</div>
