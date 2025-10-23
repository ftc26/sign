<script lang="ts">
	import type { Component } from 'svelte'
	import { Select } from 'bits-ui'
	import Icon from '@iconify/svelte'

	import GebietswegBalken from '$lib/assets/symbol/way/Gebietsweg-Balken.svelte'
	import HauptwegBalken from '$lib/assets/symbol/way/Hauptweg-Balken.svelte'
	import OrtswegDreieck from '$lib/assets/symbol/way/Ortsweg-Dreieck.svelte'
	import RundwegDreieck from '$lib/assets/symbol/way/Rundweg-Dreieck.svelte'
	import type { SvelteComponent } from 'svelte'

	type Props = {
		label?: string
		symbols?: { value: string; label: string; icon: SvelteComponent; disabled?: boolean }[]
		placeholder?: string
		value?: string
	}

	let { label = 'Symbol', value = $bindable() }: Props = $props()

	const symbols: { value: string; label: string; icon: Component; disabled?: boolean }[] = [
		{ value: 'gebietswegBalken', label: 'Gebietsweg Rot', icon: GebietswegBalken },
		{ value: 'hauptwegBalken', label: 'Hauptweg Blau', icon: HauptwegBalken },
		{ value: 'ortswegDreieck', label: 'Ortsweg Grün', icon: OrtswegDreieck },
		{ value: 'rundwegDreieck', label: 'Rundweg Gelb', icon: RundwegDreieck }
	]

	const selected = $derived(symbols.find((symbol) => symbol.value === value))
</script>

<div class="flex flex-col truncate">
	<label for="input-field" class="block text-xs font-medium text-slate-700 mb-1">{label}</label>

	<Select.Root
		type="single"
		onValueChange={(v) => (value = v)}
		items={symbols}
		allowDeselect={true}
		open={false}
	>
		<Select.Trigger
			class="h-8 w-full px-2 gap-x-2 rounded border-none inline-flex touch-none select-none items-center text-sm bg-white data-placeholder:text-slate-400 transition-colors"
			aria-label="Wähle ein Symbolgramm"
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
			<span class="truncate flex-auto text-left">{selected?.label || 'Wähle ein Symbol'}</span>
			<Icon icon="tabler:chevron-down" class="flex-none size-6" />
		</Select.Trigger>

		<Select.Portal>
			<Select.Content
				class="focus-none border-none select-none rounded border px-1 py-1 bg-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 outline-hidden z-50 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
				sideOffset={10}
			>
				<Select.ScrollUpButton class="flex w-full items-center justify-center">
					<Icon icon="tabler:caret-up-filled" class="size-6" />
				</Select.ScrollUpButton>

				<Select.Viewport class="px-2">
					{#each symbols as symbol, i (i + symbol.value)}
						<Select.Item
							class="rounded flex gap-x-2 h-10 w-full select-none items-center p-3 capitalize text-sm data-highlighted:bg-slate-100 outline-hidden data-disabled:opacity-50 "
							value={symbol.value}
							label={symbol.label}
							disabled={symbol.disabled}
						>
							{#snippet children({ selected })}
								<div class="size-5 flex-none">
									<svg class="w-full h-full">
										<defs><symbol.icon /></defs>
										<use href={`#${symbol.value}`} fill="currentColor" />
									</svg>
								</div>

								<span class="truncate flex-auto">{symbol.label}</span>

								<div class="ml-auto">
									{#if selected}
										<Icon icon="tabler:check" class="size-6 flex-none" />
									{:else}
										<div class="size-6 flex-none"></div>
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
