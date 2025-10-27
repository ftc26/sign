<script lang="ts">
	import { Select, Popover } from 'bits-ui'

	import type { Sign } from '$lib/states/signs.svelte'
	import SignTyp1 from './SignTyp1.svelte'

	import SelectPoiContent from '../ui/SelectPoiContent.svelte'
	import SelectRouteContent from '../ui/SelectRouteContent.svelte'

	import Input from '../ui/Input.svelte'

	type Props = {
		sign: Sign
		label?: string
	}

	type FieldConfig = {
		label: string
		type: 'popover' | 'select'
		content?: 'poi' | 'route'
		path: string[]
		inputType?: 'text' | 'number'
	}

	// Configuration for field mappings
	const FIELD_CONFIG: Record<string, FieldConfig> = {
		routeName: {
			label: 'Name der Weges',
			type: 'popover',
			path: ['route', 'name'],
			inputType: 'text'
		},
		routeSymbol1: {
			label: 'Symbol 1 Weg',
			type: 'select',
			content: 'route',
			path: ['route', 'symbols', '0']
		},
		routeSymbol2: {
			label: 'Symbol 2 Weg',
			type: 'select',
			content: 'route',
			path: ['route', 'symbols', '1']
		},
		direction1Name: {
			label: 'Name des Ziel 1',
			type: 'popover',
			path: ['directions', '0', 'name'],
			inputType: 'text'
		},
		direction1Symbol1: {
			label: 'Symbol 1 Richtung 1',
			type: 'select',
			content: 'poi',
			path: ['directions', '0', 'symbols', '0']
		},
		direction1Symbol2: {
			label: 'Symbol 2 Richtung 1',
			type: 'select',
			content: 'poi',
			path: ['directions', '0', 'symbols', '1']
		},
		direction1distance: {
			label: 'Distanz zu Ziel 1',
			type: 'popover',
			path: ['directions', '0', 'distance'],
			inputType: 'number'
		},
		direction2Name: {
			label: 'Name des Ziel 2',
			type: 'popover',
			path: ['directions', '1', 'name'],
			inputType: 'text'
		},
		direction2Symbol1: {
			label: 'Symbol 1 Richtung 2',
			type: 'select',
			content: 'poi',
			path: ['directions', '1', 'symbols', '0']
		},
		direction2Symbol2: {
			label: 'Symbol 2 Richtung 2',
			type: 'select',
			content: 'poi',
			path: ['directions', '1', 'symbols', '1']
		},
		direction2distance: {
			label: 'Distanz zu Ziel 2',
			type: 'popover',
			path: ['directions', '1', 'distance'],
			inputType: 'number'
		},
		signNumber: {
			label: 'Nummer des Schildes',
			type: 'popover',
			path: ['route', 'signNumber'],
			inputType: 'text'
		}
	} as const

	let { label, sign = $bindable<Sign>() }: Props = $props()
	let selectAnchor = $state<SVGElement>(null!)
	let targetKey = $state<string>('')
	let openSelect = $state<boolean>(false)
	let openPopover = $state<boolean>(false)

	// Computed values based on current targetKey
	const currentField = $derived(FIELD_CONFIG[targetKey])
	const selectLabel = $derived(currentField?.label ?? '')
	const selectContent = $derived(currentField?.content ?? '')
	const inputType = $derived(currentField?.inputType ?? 'text')

	function handleSelect(e: MouseEvent) {
		const element = e.currentTarget as SVGElement
		selectAnchor = element
		targetKey = element.getAttribute('data-key') || ''

		const field = FIELD_CONFIG[targetKey]
		if (!field) return

		if (field.type === 'popover') {
			openPopover = true
		} else if (field.type === 'select') {
			openSelect = true
		}
	}

	// Utility function to set nested object property by path
	function setNestedProperty(obj: any, path: string[], value: any) {
		let current = obj
		for (let i = 0; i < path.length - 1; i++) {
			const key = path[i]
			const nextKey = path[i + 1]

			// Handle array indices
			if (!isNaN(Number(nextKey))) {
				if (!current[key]) current[key] = []
			} else {
				if (!current[key]) current[key] = {}
			}
			current = current[key]
		}

		const finalKey = path[path.length - 1]
		if (!isNaN(Number(finalKey))) {
			current[Number(finalKey)] = value
		} else {
			current[finalKey] = value
		}
	}

	function handleValueChange(v: string, targetKey: string) {
		const field = FIELD_CONFIG[targetKey]
		if (!field) return

		// Convert to number for distance fields
		const value = field.inputType === 'number' ? parseFloat(v) || 0 : v
		setNestedProperty(sign, field.path, value)
	}
</script>

<Select.Root
	type="single"
	onValueChange={(v) => handleValueChange(v, targetKey)}
	allowDeselect={true}
	bind:open={openSelect}
>
	<Select.Portal>
		{#if selectContent === 'poi'}
			<SelectPoiContent customAnchor={selectAnchor} />
		{:else if selectContent === 'route'}
			<SelectRouteContent customAnchor={selectAnchor} />
		{/if}
	</Select.Portal>
</Select.Root>

<Popover.Root bind:open={openPopover}>
	<Popover.Portal>
		<Popover.Content customAnchor={selectAnchor} class="bg-slate-100 p-4 rounded-md">
			<Input
				label={selectLabel}
				type={inputType}
				oninput={(e) => handleValueChange((e.target as HTMLInputElement).value, targetKey)}
				onchange={() => (openPopover = false)}
			/>
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>

<label for="" class="block text-xs font-medium text-slate-700 mb-1">{label}</label>
<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	version="1.1"
	width="500mm"
	height="150mm"
	viewBox="0 0 500 150"
	class="w-full h-full"
>
	<SignTyp1 {sign} onSelect={handleSelect} />
</svg>
