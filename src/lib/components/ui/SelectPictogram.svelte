<script lang="ts">
	import { Select } from 'bits-ui'
	import Icon from '@iconify/svelte'

	import NoSymbol from '$lib/assets/symbol/No-Symbol.svg?raw'
	import GebietswegBalken from '$lib/assets/symbol/Gebietsweg-Balken.svg?raw'
	import HauptwegBalken from '$lib/assets/symbol/Hauptweg-Balken.svg?raw'
	import OrtswegDreieck from '$lib/assets/symbol/Ortsweg-Dreieck.svg?raw'
	import RundwegDreieck from '$lib/assets/symbol/Rundweg-Dreieck.svg?raw'

	type Props = {
		label?: string
	}

	let { label = 'Symbol' }: Props = $props()

	const symbols: { value: string; label: string; icon: string; disabled?: boolean }[] = [
		{ value: 'option1', label: 'Gebietsweg Rot', icon: GebietswegBalken },
		{ value: 'option2', label: 'Hauptweg Blau', icon: HauptwegBalken },
		{ value: 'option3', label: 'Ortsweg Grün', icon: OrtswegDreieck },
		{ value: 'option4', label: 'Rundweg Gelb', icon: RundwegDreieck }
	]

	let value = $state<string>('')
	const selectedLabel = $derived(
		value ? symbols.find((symbol) => symbol.value === value)?.label : 'Wähle ein Symbol'
	)
	const selectedIcon = $derived(
		value ? symbols.find((symbol) => symbol.value === value)?.icon : NoSymbol
	)
</script>

<div class="flex flex-col">
	<label for="input-field" class="block text-xs font-medium text-slate-700 mb-1">{label}</label>

	<Select.Root
		type="single"
		onValueChange={(v) => (value = v)}
		items={symbols}
		allowDeselect={true}
		open={false}
	>
		<Select.Trigger
			class="h-9 w-full px-2 gap-x-2 rounded border-none inline-flex touch-none select-none items-center text-sm  bg-white data-placeholder:text-slate-400 transition-colors"
			aria-label="Wähle ein Symbolgramm"
		>
			<div class="size-6 flex-none">
				{@html selectedIcon}
			</div>
			<span class="truncate flex-auto text-left">{selectedLabel}</span>
			<Icon icon="tabler:chevron-down" class="flex-none size-6" />
		</Select.Trigger>

		<Select.Portal>
			<Select.Content
				class="focus-none border-none select-none rounded border px-1 py-3 bg-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 outline-hidden z-50 h-96 max-h-[var(--bits-select-content-available-height)] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)]  data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
				sideOffset={10}
			>
				<Select.ScrollUpButton class="flex w-full items-center justify-center">
					<Icon icon="tabler:caret-up-filled" class="size-6" />
				</Select.ScrollUpButton>

				<Select.Viewport class="px-2">
					{#each symbols as theme, i (i + theme.value)}
						<Select.Item
							class="rounded flex gap-x-2 h-10 w-full select-none items-center p-3 capitalize text-sm data-highlighted:bg-slate-100 outline-hidden data-disabled:opacity-50 "
							value={theme.value}
							label={theme.label}
							disabled={theme.disabled}
						>
							{#snippet children({ selected })}
								<div class="size-6 flex-none">
									{@html theme.icon}
								</div>

								<span class="truncate flex-auto">{theme.label}</span>

								<div class="ml-auto">
									{#if selected}
										<Icon icon="tabler:check" class="size-6 flex-none" />
									{:else}
										<div class="size-6 flex-none" />
										{/if}

								</div>
							{/snippet}
						</Select.Item>
					{/each}
				</Select.Viewport>
				<Select.ScrollDownButton class="flex w-full items-center justify-center">
					<Icon icon="tabler:caret-down-filled" width="24" height="24" />
				</Select.ScrollDownButton>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
</div>
